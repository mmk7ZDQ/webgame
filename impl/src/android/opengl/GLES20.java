/*
 * android.opengl.GLES20 — WebGL1 实现
 *
 * 关键差异：Android 的 GL 用 int 句柄，WebGL 用 JS 对象。
 * 这里维护一张 int ↔ 对象 的映射表，让 RW 的字节码以为自己在跟 int 打交道。
 *
 * 其余方法基本是 1:1 转发：GLES2 与 WebGL1 的枚举值、参数顺序完全一致。
 */
package android.opengl;

import java.nio.Buffer;
import java.util.HashMap;
import java.util.Map;

import org.teavm.jso.JSBody;
import org.teavm.jso.JSObject;
import org.teavm.jso.typedarrays.ArrayBuffer;
import org.teavm.jso.typedarrays.ArrayBufferView;
import org.teavm.jso.typedarrays.Float32Array;
import org.teavm.jso.typedarrays.Int16Array;
import org.teavm.jso.typedarrays.Int32Array;
import org.teavm.jso.typedarrays.Uint16Array;
import org.teavm.jso.typedarrays.Uint32Array;
import org.teavm.jso.webgl.WebGLBuffer;
import org.teavm.jso.webgl.WebGLFramebuffer;
import org.teavm.jso.webgl.WebGLProgram;
import org.teavm.jso.webgl.WebGLRenderingContext;
import org.teavm.jso.webgl.WebGLShader;
import org.teavm.jso.webgl.WebGLTexture;
import org.teavm.jso.webgl.WebGLUniformLocation;

public class GLES20 {

    // ---------------------------------------------------------------- 上下文

    private static WebGLRenderingContext gl;
    private static final int GL_ARRAY_BUFFER = 0x8892;
    private static final int GL_DYNAMIC_DRAW = 0x88E8;

    private static final Map<Integer, Object> handles = new HashMap<Integer, Object>();
    private static int nextHandle = 1;

    /** 调试钩子：让宿主把 GL 调用日志打到页面。生产环境不设置即可 */
    public interface LogSink { void log(String msg); }

    public static LogSink sink;

    private static void trace(String m) {
        if (sink != null) sink.log(m);
    }

    public static void setContext(WebGLRenderingContext ctx) {
        gl = ctx;
    }

    public static WebGLRenderingContext getContext() {
        return gl;
    }

    private static int reg(Object o) {
        int id = nextHandle++;
        handles.put(id, o);
        return id;
    }

    @SuppressWarnings("unchecked")
    private static <T> T obj(int id) {
        Object o = handles.get(id);
        return o == null ? null : (T) o;
    }

    /**
     * 把 java.nio.Buffer 桥成 WebGL 能吃的 typed array。
     *
     * TeaVM 的 nio 实现（TByteBuffer 等）实现了 TArrayBufferViewProvider，
     * 能直接给出底层的 ArrayBuffer —— 零拷贝。堆缓冲没实现该接口时回退为复制。
     */
    private static ArrayBufferView toView(Buffer buf) {
        if (buf == null) return null;
        int elem = 1;
        if (buf instanceof java.nio.FloatBuffer) elem = 4;
        else if (buf instanceof java.nio.IntBuffer) elem = 4;
        else if (buf instanceof java.nio.ShortBuffer) elem = 2;
        else if (buf instanceof java.nio.ByteBuffer) elem = 1;
        else return null;

        if (buf instanceof org.teavm.classlib.java.nio.TArrayBufferViewProvider) {
            org.teavm.classlib.java.nio.TArrayBufferViewProvider p =
                    (org.teavm.classlib.java.nio.TArrayBufferViewProvider) buf;
            ArrayBufferView base = p.getArrayBufferView();
            if (base != null) {
                int unit = p.elementSize();
                int off = base.getByteOffset() + buf.position() * unit;
                int len = buf.remaining() * unit;
                ArrayBuffer ab = base.getBuffer();
                if (buf instanceof java.nio.FloatBuffer) return Float32Array.create(ab, off, len / 4);
                if (buf instanceof java.nio.IntBuffer) return Int32Array.create(ab, off, len / 4);
                if (buf instanceof java.nio.ShortBuffer) return Int16Array.create(ab, off, len / 2);
                return org.teavm.jso.typedarrays.Int8Array.create(ab, off, len);
            }
        }

        // 回退：复制到新数组
        int n = buf.remaining();
        if (buf instanceof java.nio.FloatBuffer) {
            Float32Array out = Float32Array.create(n);
            java.nio.FloatBuffer d = ((java.nio.FloatBuffer) buf).duplicate();
            for (int i = 0; i < n; i++) out.set(i, d.get());
            return out;
        }
        if (buf instanceof java.nio.IntBuffer) {
            Int32Array out = Int32Array.create(n);
            java.nio.IntBuffer d = ((java.nio.IntBuffer) buf).duplicate();
            for (int i = 0; i < n; i++) out.set(i, d.get());
            return out;
        }
        if (buf instanceof java.nio.ShortBuffer) {
            Int16Array out = Int16Array.create(n);
            java.nio.ShortBuffer d = ((java.nio.ShortBuffer) buf).duplicate();
            for (int i = 0; i < n; i++) out.set(i, d.get());
            return out;
        }
        if (buf instanceof java.nio.ByteBuffer) {
            org.teavm.jso.typedarrays.Int8Array out = org.teavm.jso.typedarrays.Int8Array.create(n);
            java.nio.ByteBuffer d = ((java.nio.ByteBuffer) buf).duplicate();
            for (int i = 0; i < n; i++) out.set(i, d.get());
            return out;
        }
        return null;
    }

    @JSBody(params = {"v"}, script = "return (v === null || v === undefined) ? 0 : (v | 0);")
    private static native int toInt(JSObject v);

    @JSBody(params = {"v"}, script = "return (v === null || v === undefined) ? 0 : v;")
    private static native JSObject asJs(Object v);

    // ---------------------------------------------------------------- 状态

    public static void glEnable(int cap) { if (gl != null) gl.enable(cap); }

    public static void glDisable(int cap) { if (gl != null) gl.disable(cap); }

    public static void glClear(int mask) { if (gl != null) gl.clear(mask); }

    public static void glClearColor(float r, float g, float b, float a) {
        if (gl != null) gl.clearColor(r, g, b, a);
    }

    public static void glClearDepthf(float depth) {
        if (gl != null) gl.clearDepth(depth);
    }

    public static void glClearStencil(int s) { if (gl != null) gl.clearStencil(s); }

    public static void glViewport(int x, int y, int w, int h) {
        if (gl != null) gl.viewport(x, y, w, h);
    }

    public static void glScissor(int x, int y, int w, int h) {
        if (gl != null) gl.scissor(x, y, w, h);
    }

    public static void glColorMask(boolean r, boolean g, boolean b, boolean a) {
        if (gl != null) gl.colorMask(r, g, b, a);
    }

    public static void glDepthMask(boolean flag) { if (gl != null) gl.depthMask(flag); }

    public static void glDepthFunc(int func) { if (gl != null) gl.depthFunc(func); }

    public static void glDepthRangef(float n, float f) { if (gl != null) gl.depthRange(n, f); }

    public static void glStencilFunc(int func, int ref, int mask) {
        if (gl != null) gl.stencilFunc(func, ref, mask);
    }

    public static void glStencilOp(int fail, int zfail, int zpass) {
        if (gl != null) gl.stencilOp(fail, zfail, zpass);
    }

    public static void glStencilMask(int mask) { if (gl != null) gl.stencilMask(mask); }

    public static void glLineWidth(float width) { if (gl != null) gl.lineWidth(width); }

    public static void glBlendFunc(int src, int dst) { if (gl != null) gl.blendFunc(src, dst); }

    public static void glBlendFuncSeparate(int srcRGB, int dstRGB, int srcA, int dstA) {
        if (gl != null) gl.blendFuncSeparate(srcRGB, dstRGB, srcA, dstA);
    }

    public static void glBlendEquation(int mode) { if (gl != null) gl.blendEquation(mode); }

    public static void glBlendEquationSeparate(int rgb, int a) {
        if (gl != null) gl.blendEquationSeparate(rgb, a);
    }

    public static void glBlendColor(float r, float g, float b, float a) {
        if (gl != null) gl.blendColor(r, g, b, a);
    }

    public static void glCullFace(int mode) { if (gl != null) gl.cullFace(mode); }

    public static void glFrontFace(int mode) { if (gl != null) gl.frontFace(mode); }

    public static void glPixelStorei(int pname, int param) {
        if (gl != null) gl.pixelStorei(pname, param);
    }

    public static void glPolygonOffset(float factor, float units) {
        if (gl != null) gl.polygonOffset(factor, units);
    }

    public static void glHint(int target, int mode) { if (gl != null) gl.hint(target, mode); }

    public static int glGetError() {
        return gl == null ? 0 : gl.getError();
    }

    public static void glFlush() { if (gl != null) gl.flush(); }

    public static void glFinish() { if (gl != null) gl.finish(); }

    public static void glGetIntegerv(int pname, int[] params, int offset) {
        if (gl == null || params == null) return;
        JSObject v = gl.getParameter(pname);
        params[offset] = toInt(v);
    }

    // ---------------------------------------------------------------- 纹理

    public static void glGenTextures(int n, int[] textures, int offset) {
        if (gl == null || textures == null) return;
        for (int i = 0; i < n; i++) {
            textures[offset + i] = reg(gl.createTexture());
        }
    }

    public static void glDeleteTextures(int n, int[] textures, int offset) {
        if (gl == null || textures == null) return;
        for (int i = 0; i < n; i++) {
            WebGLTexture t = obj(textures[offset + i]);
            if (t != null) gl.deleteTexture(t);
            handles.remove(textures[offset + i]);
        }
    }

    public static void glBindTexture(int target, int texture) {
        if (gl == null) return;
        gl.bindTexture(target, texture == 0 ? null : (WebGLTexture) obj(texture));
    }

    public static void glActiveTexture(int texture) {
        if (gl != null) gl.activeTexture(texture);
    }

    public static void glTexParameteri(int target, int pname, int param) {
        if (gl != null) gl.texParameteri(target, pname, param);
    }

    public static void glTexParameterf(int target, int pname, float param) {
        if (gl != null) gl.texParameterf(target, pname, param);
    }

    public static void glTexImage2D(int target, int level, int internalformat,
                                    int width, int height, int border,
                                    int format, int type, Buffer pixels) {
        if (gl == null) return;
        gl.texImage2D(target, level, internalformat, width, height, border,
                format, type, pixels);
    }

    public static void glTexSubImage2D(int target, int level, int xoffset, int yoffset,
                                       int width, int height, int format, int type, Buffer pixels) {
        if (gl == null) return;
        gl.texSubImage2D(target, level, xoffset, yoffset, width, height, format, type, pixels);
    }

    public static void glGenerateMipmap(int target) {
        if (gl != null) gl.generateMipmap(target);
    }

    // ---------------------------------------------------------------- 着色器

    public static int glCreateShader(int type) {
        return gl == null ? 0 : reg(gl.createShader(type));
    }

    public static void glShaderSource(int shader, String source) {
        if (gl == null) return;
        WebGLShader s = obj(shader);
        if (s != null) gl.shaderSource(s, source);
    }

    public static void glCompileShader(int shader) {
        if (gl == null) return;
        WebGLShader s = obj(shader);
        if (s != null) gl.compileShader(s);
    }

    public static void glDeleteShader(int shader) {
        if (gl == null) return;
        WebGLShader s = obj(shader);
        if (s != null) gl.deleteShader(s);
        handles.remove(shader);
    }

    public static void glGetShaderiv(int shader, int pname, int[] params, int offset) {
        if (gl == null || params == null) return;
        WebGLShader s = obj(shader);
        params[offset] = s == null ? 0 : toInt(gl.getShaderParameter(s, pname));
    }

    public static String glGetShaderInfoLog(int shader) {
        if (gl == null) return "";
        WebGLShader s = obj(shader);
        return s == null ? "" : gl.getShaderInfoLog(s);
    }

    public static int glCreateProgram() {
        return gl == null ? 0 : reg(gl.createProgram());
    }

    public static void glAttachShader(int program, int shader) {
        if (gl == null) return;
        WebGLProgram p = obj(program);
        WebGLShader s = obj(shader);
        if (p != null && s != null) gl.attachShader(p, s);
    }

    public static void glDetachShader(int program, int shader) {
        if (gl == null) return;
        WebGLProgram p = obj(program);
        WebGLShader s = obj(shader);
        if (p != null && s != null) gl.detachShader(p, s);
    }

    public static void glBindAttribLocation(int program, int index, String name) {
        if (gl == null) return;
        WebGLProgram p = obj(program);
        if (p != null) gl.bindAttribLocation(p, index, name);
    }

    public static void glLinkProgram(int program) {
        if (gl == null) return;
        WebGLProgram p = obj(program);
        if (p != null) gl.linkProgram(p);
    }

    public static void glUseProgram(int program) {
        if (gl == null) return;
        trace("glUseProgram(" + program + ")");
        gl.useProgram(program == 0 ? null : (WebGLProgram) obj(program));
        checkErr("useProgram");
    }

    public static void glDeleteProgram(int program) {
        if (gl == null) return;
        WebGLProgram p = obj(program);
        if (p != null) gl.deleteProgram(p);
        handles.remove(program);
    }

    public static void glGetProgramiv(int program, int pname, int[] params, int offset) {
        if (gl == null || params == null) return;
        WebGLProgram p = obj(program);
        params[offset] = p == null ? 0 : toInt(gl.getProgramParameter(p, pname));
    }

    public static String glGetProgramInfoLog(int program) {
        if (gl == null) return "";
        WebGLProgram p = obj(program);
        return p == null ? "" : gl.getProgramInfoLog(p);
    }

    public static int glGetAttribLocation(int program, String name) {
        if (gl == null) return -1;
        WebGLProgram p = obj(program);
        int loc = p == null ? -1 : gl.getAttribLocation(p, name);
        trace("glGetAttribLocation(\"" + name + "\")=" + loc);
        return loc;
    }

    public static int glGetUniformLocation(int program, String name) {
        // trace 在下方统一输出
        if (gl == null) return -1;
        WebGLProgram p = obj(program);
        if (p == null) return -1;
        WebGLUniformLocation loc = gl.getUniformLocation(p, name);
        return loc == null ? -1 : reg(loc);
    }

    // ---------------------------------------------------------------- uniform

    private static WebGLUniformLocation loc(int location) {
        return obj(location);
    }

    public static void glUniform1f(int location, float x) {
        if (gl != null) gl.uniform1f(loc(location), x);
    }

    public static void glUniform1i(int location, int x) {
        if (gl != null) gl.uniform1i(loc(location), x);
    }

    public static void glUniform2f(int location, float x, float y) {
        if (gl != null) gl.uniform2f(loc(location), x, y);
    }

    public static void glUniform3f(int location, float x, float y, float z) {
        if (gl != null) gl.uniform3f(loc(location), x, y, z);
    }

    public static void glUniform4f(int location, float x, float y, float z, float w) {
        if (gl != null) gl.uniform4f(loc(location), x, y, z, w);
    }

    public static void glUniform1fv(int location, int count, float[] v, int offset) {
        if (gl != null) gl.uniform1fv(loc(location), slice(v, offset, count * 1));
    }

    public static void glUniform2fv(int location, int count, float[] v, int offset) {
        if (gl != null) gl.uniform2fv(loc(location), slice(v, offset, count * 2));
    }

    public static void glUniform3fv(int location, int count, float[] v, int offset) {
        if (gl != null) gl.uniform3fv(loc(location), slice(v, offset, count * 3));
    }

    public static void glUniform4fv(int location, int count, float[] v, int offset) {
        if (gl != null) gl.uniform4fv(loc(location), slice(v, offset, count * 4));
    }

    public static void glUniformMatrix4fv(int location, int count, boolean transpose,
                                          float[] value, int offset) {
        if (gl != null) gl.uniformMatrix4fv(loc(location), transpose, slice(value, offset, count * 16));
    }

    public static void glUniformMatrix3fv(int location, int count, boolean transpose,
                                          float[] value, int offset) {
        if (gl != null) gl.uniformMatrix3fv(loc(location), transpose, slice(value, offset, count * 9));
    }

    public static void glUniformMatrix2fv(int location, int count, boolean transpose,
                                          float[] value, int offset) {
        if (gl != null) gl.uniformMatrix2fv(loc(location), transpose, slice(value, offset, count * 4));
    }

    private static Float32Array slice(float[] src, int offset, int count) {
        Float32Array out = Float32Array.create(count);
        for (int i = 0; i < count; i++) {
            int idx = offset + i;
            out.set(i, idx >= 0 && idx < src.length ? src[idx] : 0f);
        }
        return out;
    }

    // ---------------------------------------------------------------- 缓冲与顶点

    public static void glGenBuffers(int n, int[] buffers, int offset) {
        if (gl == null || buffers == null) return;
        for (int i = 0; i < n; i++) {
            buffers[offset + i] = reg(gl.createBuffer());
        }
    }

    public static void glDeleteBuffers(int n, int[] buffers, int offset) {
        if (gl == null || buffers == null) return;
        for (int i = 0; i < n; i++) {
            WebGLBuffer b = obj(buffers[offset + i]);
            if (b != null) gl.deleteBuffer(b);
            handles.remove(buffers[offset + i]);
        }
    }

    public static void glBindBuffer(int target, int buffer) {
        trace("glBindBuffer(target=" + target + ",buf=" + buffer + ")");
        if (gl == null) return;
        gl.bindBuffer(target, buffer == 0 ? null : (WebGLBuffer) obj(buffer));
    }

    public static void glBufferData(int target, int size, Buffer data, int usage) {
        if (gl == null) return;
        ArrayBufferView view = toView(data);
        trace("glBufferData(target=" + target + ",size=" + size + ",hasView=" + (view != null) + ")");
        if (view == null) {
            gl.bufferData(target, size, usage);      // 只分配
        } else {
            gl.bufferData(target, view, usage);      // 真实数据
        }
    }

    public static void glBufferData(int target, int size, java.nio.ByteBuffer data, int usage) {
        glBufferData(target, size, (Buffer) data, usage);
    }

    public static void glBufferSubData(int target, int offset, int size, Buffer data) {
        if (gl == null) return;
        ArrayBufferView view = toView(data);
        if (view != null) gl.bufferSubData(target, offset, view);
    }

    private static void checkErr(String where) {
        if (sink == null || gl == null) return;
        int e = gl.getError();
        if (e != 0) { trace("!! glError=" + e + " after " + where); }
    }

    public static void glEnableVertexAttribArray(int index) {
        trace("glEnableVertexAttribArray(" + index + ")");
        if (gl != null) gl.enableVertexAttribArray(index);
    }

    public static void glDisableVertexAttribArray(int index) {
        if (gl != null) gl.disableVertexAttribArray(index);
    }

    public static void glVertexAttribPointer(int index, int size, int type, boolean normalized,
                                             int stride, Buffer ptr) {
        if (gl == null) return;
        // 这是 Android 的 client-side vertex array 版本：不依赖已绑定的 VBO。
        // WebGL 没有 client-side array，只能把数据塞进临时 Buffer 再绑定。
        ArrayBufferView view = toView(ptr);
        if (view != null) {
            WebGLBuffer tmp = gl.createBuffer();
            gl.bindBuffer(GL_ARRAY_BUFFER, tmp);
            gl.bufferData(GL_ARRAY_BUFFER, view, GL_DYNAMIC_DRAW);
            trace("glVertexAttribPointer(client-side, idx=" + index + ",size=" + size
                    + ",stride=" + stride + ") -> temp VBO");
            gl.vertexAttribPointer(index, size, type, normalized, stride, 0);
            checkErr("vertexAttribPointer(client-side)");
        } else {
            int off = ptr == null ? 0 : ptr.position();
            trace("glVertexAttribPointer(idx=" + index + ",size=" + size + ",stride=" + stride + ",off=" + off + ")");
            gl.vertexAttribPointer(index, size, type, normalized, stride, off);
            checkErr("vertexAttribPointer(offset)");
        }
    }

    public static void glVertexAttribPointer(int index, int size, int type, boolean normalized,
                                             int stride, int offset) {
        if (gl != null) gl.vertexAttribPointer(index, size, type, normalized, stride, offset);
    }

    public static void glDrawArrays(int mode, int first, int count) {
        if (gl != null) {
            trace("glDrawArrays(mode=" + mode + ",first=" + first + ",count=" + count
                    + ",program=" + toInt(gl.getParameter(0x8B8D))          // GL_CURRENT_PROGRAM
                    + ",vbo=" + toInt(gl.getParameter(0x8894))              // GL_ARRAY_BUFFER_BINDING
                    + ",attribState=" + gl.getVertexAttrib(0, 0x8622));     // GL_VERTEX_ATTRIB_ARRAY_ENABLED
            gl.drawArrays(mode, first, count);
            checkErr("drawArrays");
        }
    }

    public static void glDrawElements(int mode, int count, int type, Buffer indices) {
        if (gl != null) gl.drawElements(mode, count, type, indices == null ? 0 : indices.position());
    }

    public static void glDrawElements(int mode, int count, int type, int offset) {
        if (gl != null) gl.drawElements(mode, count, type, offset);
    }

    // ---------------------------------------------------------------- FBO

    public static void glGenFramebuffers(int n, int[] framebuffers, int offset) {
        if (gl == null || framebuffers == null) return;
        for (int i = 0; i < n; i++) {
            framebuffers[offset + i] = reg(gl.createFramebuffer());
        }
    }

    public static void glDeleteFramebuffers(int n, int[] framebuffers, int offset) {
        if (gl == null || framebuffers == null) return;
        for (int i = 0; i < n; i++) {
            WebGLFramebuffer f = obj(framebuffers[offset + i]);
            if (f != null) gl.deleteFramebuffer(f);
            handles.remove(framebuffers[offset + i]);
        }
    }

    public static void glBindFramebuffer(int target, int framebuffer) {
        if (gl == null) return;
        gl.bindFramebuffer(target, framebuffer == 0 ? null : (WebGLFramebuffer) obj(framebuffer));
    }

    public static int glCheckFramebufferStatus(int target) {
        return gl == null ? 0 : gl.checkFramebufferStatus(target);
    }

    public static void glFramebufferTexture2D(int target, int attachment, int textarget,
                                              int texture, int level) {
        if (gl == null) return;
        gl.framebufferTexture2D(target, attachment, textarget, (WebGLTexture) obj(texture), level);
    }

    public static void glGenRenderbuffers(int n, int[] buffers, int offset) { }

    public static void glBindRenderbuffer(int target, int renderbuffer) { }

    public static void glRenderbufferStorage(int target, int internalformat, int w, int h) { }

    public static void glFramebufferRenderbuffer(int target, int attachment, int rbtarget, int rb) { }

    public static void glDeleteRenderbuffers(int n, int[] buffers, int offset) { }
}
