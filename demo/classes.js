"use strict";
(function(module) {
    if (typeof define === 'function' && define.amd) {
        define(['exports'], function(exports)  {
            module(exports);
        });
    } else if (typeof exports === 'object' && exports !== null && typeof exports.nodeName !== 'string') {
        module(exports);
    } else {
        module(typeof self !== 'undefined' ? self : this);
}
}(function($rt_exports) {
let $rt_seed = 2463534242,
$rt_nextId = () => {
    let x = $rt_seed;
    x ^= x << 13;
    x ^= x >>> 17;
    x ^= x << 5;
    $rt_seed = x;
    return x;
},
$rt_wrapFunction0 = f => function() {
    return f(this);
},
$rt_wrapFunction1 = f => function(p1) {
    return f(this, p1);
},
$rt_wrapFunction2 = f => function(p1, p2) {
    return f(this, p1, p2);
},
$rt_wrapFunction3 = f => function(p1, p2, p3) {
    return f(this, p1, p2, p3);
},
$rt_wrapFunction4 = f => function(p1, p2, p3, p4) {
    return f(this, p1, p2, p3, p4);
},
$rt_mainStarter = f => (args, callback) => {
    if (!args) {
        args = [];
    }
    let javaArgs = $rt_createArray($rt_objcls(), args.length);
    for (let i = 0;i < args.length;++i) {
        javaArgs.data[i] = $rt_str(args[i]);
    }
    $rt_startThread(() => {
        f.call(null, javaArgs);
    }, callback);
},
$rt_eraseClinit = target => target.$clinit = () => {
},
$dbg_class = obj => {
    let cls = obj.constructor;
    let arrayDegree = 0;
    while (cls[$rt_meta] && cls[$rt_meta].item) {
        ++arrayDegree;
        cls = cls[$rt_meta].item;
    }
    let clsName = "";
    if (cls[$rt_meta].primitiveKind !== 0) {
        clsName = cls[$rt_meta].name;
    } else {
        clsName = cls[$rt_meta] ? cls[$rt_meta].name || "a/" + cls.name : "@" + cls.name;
    }
    while (arrayDegree-- > 0) {
        clsName += "[]";
    }
    return clsName;
},
$rt_classWithoutFields = superclass => {
    if (superclass === 0) {
        return function() {
        };
    }
    if (superclass === void 0) {
        superclass = $rt_objcls();
    }
    return function() {
        superclass.call(this);
    };
},
$rt_meta = Symbol("teavm_meta"),
$rt_cls = cls => {
    if (cls[$rt_meta].classObject === null) {
        cls[$rt_meta].classObject = jl_Class_createClass(cls);
    }
    return cls[$rt_meta].classObject;
},
$rt_objcls = () => jl_Object,
$rt_getThread = () => {
    {
        return jl_Thread_currentThread();
    }
},
$rt_setThread = t => {
    {
        return jl_Thread_setCurrentThread(t);
    }
},
$rt_callWithReceiver = f => function() {
    return f.apply(null, [this].concat(Array.prototype.slice.call(arguments)));
},
$rt_newClassMetadata = source => {
    return Object.assign({ name : null, binaryName : null, parent : null, superinterfaces : [], modifiers : 0, primitiveKind : 0, itemType : null, arrayType : null, enclosingClass : null, declaringClass : null, simpleName : null, clinit : () => {
    }, constructor : null, enumConstants : () => null, resolvedEnumConstants : null, reflection : null, classObject : null, assignableCache : null, valueToObject : o => o, objectToValue : o => o }, source || {  });
},
$rt_createPrimitiveCls = (name, binaryName, kind, config) => {
    let cls = () => {
    };
    let meta = $rt_newClassMetadata({ name : name, binaryName : binaryName, modifiers : 1 | 1 << 4, primitiveKind : kind });
    cls[$rt_meta] = meta;
    if (typeof config === 'function') {
        config(meta);
    }
    return cls;
},
$rt_booleancls = $rt_createPrimitiveCls("boolean", "Z", 1, meta => {
}),
$rt_bytecls = $rt_createPrimitiveCls("byte", "B", 2, meta => {
    {
        meta.valueToObject = o => jl_Byte_valueOf(o);
    }
    {
        meta.objectToValue = o => jl_Byte_byteValue(o);
    }
}),
$rt_shortcls = $rt_createPrimitiveCls("short", "S", 3, meta => {
}),
$rt_charcls = $rt_createPrimitiveCls("char", "C", 4, meta => {
}),
$rt_intcls = $rt_createPrimitiveCls("int", "I", 5, meta => {
    {
        meta.valueToObject = o => jl_Integer_valueOf(o);
    }
    {
        meta.objectToValue = o => jl_Integer_intValue(o);
    }
}),
$rt_longcls = $rt_createPrimitiveCls("long", "J", 6, meta => {
}),
$rt_floatcls = $rt_createPrimitiveCls("float", "F", 7, meta => {
}),
$rt_doublecls = $rt_createPrimitiveCls("double", "D", 8, meta => {
}),
$rt_voidcls = $rt_createPrimitiveCls("void", "V", 9),
$rt_numberConversionBuffer = new ArrayBuffer(16),
$rt_numberConversionFloatArray = new Float32Array($rt_numberConversionBuffer),
$rt_numberConversionDoubleArray = new Float64Array($rt_numberConversionBuffer),
$rt_numberConversionIntArray = new Int32Array($rt_numberConversionBuffer),
$rt_numberConversionLongArray = new BigInt64Array($rt_numberConversionBuffer),
$rt_doubleToRawLongBits = n => {
    $rt_numberConversionDoubleArray[0] = n;
    return $rt_numberConversionLongArray[0];
},
$rt_floatToRawIntBits = n => {
    $rt_numberConversionFloatArray[0] = n;
    return $rt_numberConversionIntArray[0];
},
$rt_compare = (a, b) => a === b ? 0 : a < b ?  -1 : 1,
$rt_compare_less = (a, b) => a === b ? 0 : a > b ? 1 :  -1,
$rt_imul = Math.imul || function(a, b) {
    let ah = a >>> 16 & 0xFFFF;
    let al = a & 0xFFFF;
    let bh = b >>> 16 & 0xFFFF;
    let bl = b & 0xFFFF;
    return al * bl + (ah * bl + al * bh << 16 >>> 0) | 0;
},
$rt_udiv = (a, b) => (a >>> 0) / (b >>> 0) >>> 0,
$rt_umod = (a, b) => (a >>> 0) % (b >>> 0) >>> 0,
$rt_ucmp = (a, b) => {
    a >>>= 0;
    b >>>= 0;
    return a < b ?  -1 : a > b ? 1 : 0;
},
Long_ZERO = BigInt(0),
Long_create = (lo, hi) => BigInt.asIntN(64, BigInt.asUintN(64, BigInt(lo)) | BigInt.asUintN(64, BigInt(hi) << BigInt(32))),
Long_fromInt = val => BigInt.asIntN(64, BigInt(val | 0)),
Long_fromNumber = val => BigInt.asIntN(64, BigInt(val >= 0 ? Math.floor(val) : Math.ceil(val))),
Long_toNumber = val => Number(val),
Long_lo = val => Number(BigInt.asIntN(32, val)) | 0,
Long_eq = (a, b) => a === b,
Long_gt = (a, b) => a > b,
Long_ge = (a, b) => a >= b;
let Long_lt = (a, b) => a < b,
Long_le = (a, b) => a <= b,
Long_add = (a, b) => BigInt.asIntN(64, a + b),
Long_neg = a => BigInt.asIntN(64,  -a),
Long_sub = (a, b) => BigInt.asIntN(64, a - b),
Long_ucompare = (a, b) => {
    a = BigInt.asUintN(64, a);
    b = BigInt.asUintN(64, b);
    return a < b ?  -1 : a > b ? 1 : 0;
},
Long_mul = (a, b) => BigInt.asIntN(64, a * b),
Long_div = (a, b) => BigInt.asIntN(64, a / b),
Long_udiv = (a, b) => BigInt.asIntN(64, BigInt.asUintN(64, a) / BigInt.asUintN(64, b)),
Long_rem = (a, b) => BigInt.asIntN(64, a % b),
Long_urem = (a, b) => BigInt.asIntN(64, BigInt.asUintN(64, a) % BigInt.asUintN(64, b)),
Long_and = (a, b) => BigInt.asIntN(64, a & b),
Long_or = (a, b) => BigInt.asIntN(64, a | b),
Long_shl = (a, b) => BigInt.asIntN(64, a << BigInt(b & 63)),
Long_shr = (a, b) => BigInt.asIntN(64, a >> BigInt(b & 63)),
Long_shru = (a, b) => BigInt.asIntN(64, BigInt.asUintN(64, a) >> BigInt(b & 63)),
$rt_createArray = (cls, sz) => {
    let data = new Array(sz);
    data.fill(null);
    return new ($rt_arraycls(cls))(data);
},
$rt_createLongArrayFromData = data => {
    let buffer = new BigInt64Array(data.length);
    buffer.set(data);
    return new $rt_longArrayCls(buffer);
},
$rt_createCharArray = sz => new $rt_charArrayCls(new Uint16Array(sz)),
$rt_createCharArrayFromData = data => {
    let buffer = new Uint16Array(data.length);
    buffer.set(data);
    return new $rt_charArrayCls(buffer);
},
$rt_createByteArray = sz => new $rt_byteArrayCls(new Int8Array(sz)),
$rt_createShortArray = sz => new $rt_shortArrayCls(new Int16Array(sz)),
$rt_createShortArrayFromData = data => {
    let buffer = new Int16Array(data.length);
    buffer.set(data);
    return new $rt_shortArrayCls(buffer);
},
$rt_createIntArray = sz => new $rt_intArrayCls(new Int32Array(sz)),
$rt_createIntArrayFromData = data => {
    let buffer = new Int32Array(data.length);
    buffer.set(data);
    return new $rt_intArrayCls(buffer);
},
$rt_createBooleanArray = sz => new $rt_booleanArrayCls(new Int8Array(sz)),
$rt_createFloatArray = sz => new $rt_floatArrayCls(new Float32Array(sz)),
$rt_createFloatArrayFromData = data => {
    let buffer = new Float32Array(data.length);
    buffer.set(data);
    return new $rt_floatArrayCls(buffer);
},
$rt_createDoubleArray = sz => new $rt_doubleArrayCls(new Float64Array(sz)),
$rt_arraycls = cls => {
    let result = cls[$rt_meta].arrayType;
    if (result === null) {
        function JavaArray(data) {
            ($rt_objcls()).call(this);
            this.data = data;
        }
        JavaArray.prototype = Object.create(($rt_objcls()).prototype);
        JavaArray.prototype.type = cls;
        JavaArray.prototype.constructor = JavaArray;
        JavaArray.prototype.toString = function() {
            let str = "[";
            for (let i = 0;i < this.data.length;++i) {
                if (i > 0) {
                    str += ", ";
                }
                str += this.data[i].toString();
            }
            str += "]";
            return str;
        };
        JavaArray.prototype.$clone0 = function() {
            let dataCopy;
            if ('slice' in this.data) {
                dataCopy = this.data.slice();
            } else {
                dataCopy = new this.data.constructor(this.data.length);
                for (let i = 0;i < dataCopy.length;++i) {
                    dataCopy[i] = this.data[i];
                }
            }
            return new ($rt_arraycls(this.type))(dataCopy);
        };
        let name = "[" + cls[$rt_meta].binaryName;
        JavaArray[$rt_meta] = $rt_newClassMetadata({ name : name, binaryName : name, parent : $rt_objcls(), itemType : cls });
        result = JavaArray;
        cls[$rt_meta].arrayType = JavaArray;
    }
    return result;
};
function $rt_arrayLength(array) {
    return array.data.length;
}
let $rt_stringPool_instance,
$rt_stringPool = strings => {
    $rt_stringClassInit();
    $rt_stringPool_instance = new Array(strings.length);
    for (let i = 0;i < strings.length;++i) {
        $rt_stringPool_instance[i] = $rt_intern($rt_str(strings[i]));
    }
},
$rt_s = index => $rt_stringPool_instance[index],
$rt_charArrayToString = (array, offset, count) => {
    let result = "";
    let limit = offset + count;
    for (let i = offset;i < limit;i = i + 1024 | 0) {
        let next = Math.min(limit, i + 1024 | 0);
        result += String.fromCharCode.apply(null, array.subarray(i, next));
    }
    return result;
},
$rt_fullArrayToString = array => $rt_charArrayToString(array, 0, array.length),
$rt_str = str => str === null ? null : jl_String__init_3(str),
$rt_ustr = str => str === null ? null : str.$nativeString,
$rt_stringClassInit = () => jl_String_$callClinit(),
$rt_intern;
{
    $rt_intern = str => str;
}
let $rt_isInstance = (obj, cls) => obj instanceof $rt_objcls() && !!obj.constructor[$rt_meta] && $rt_isAssignable(obj.constructor, cls),
$rt_isAssignable = (from, to) => {
    if (from === to) {
        return true;
    }
    let map = from[$rt_meta].assignableCache;
    if (map === null) {
        map = new Map();
        from[$rt_meta].assignableCache = map;
    }
    let cachedResult = map.get(to);
    if (typeof cachedResult !== 'undefined') {
        return cachedResult;
    }
    if (to[$rt_meta].itemType !== null) {
        let result = from[$rt_meta].itemType !== null && $rt_isAssignable(from[$rt_meta].itemType, to[$rt_meta].itemType);
        map.set(to, result);
        return result;
    }
    let parent = from[$rt_meta].parent;
    if (parent !== null && parent !== from) {
        if ($rt_isAssignable(parent, to)) {
            map.set(to, true);
            return true;
        }
    }
    let superinterfaces = from[$rt_meta].superinterfaces;
    for (let i = 0;i < superinterfaces.length;i = i + 1 | 0) {
        if ($rt_isAssignable(superinterfaces[i], to)) {
            map.set(to, true);
            return true;
        }
    }
    map.set(to, false);
    return false;
},
$rt_throw = ex => {
    throw $rt_exception(ex);
},
$rt_javaExceptionProp = Symbol("javaException"),
$rt_exception = ex => {
    if (!ex.$jsException) {
        $rt_fillNativeException(ex);
    }
    return ex.$jsException;
},
$rt_fillNativeException = ex => {
    let javaCause = $rt_throwableCause(ex);
    let jsCause = javaCause !== null ? javaCause.$jsException : void 0;
    let cause = typeof jsCause === "object" ? { cause : jsCause } : void 0;
    let err = new JavaError("Java exception thrown", cause);
    if (typeof Error.captureStackTrace === "function") {
        Error.captureStackTrace(err);
    }
    err[$rt_javaExceptionProp] = ex;
    ex.$jsException = err;
    $rt_fillStack(err, ex);
},
$rt_fillStack = (err, ex) => {
    if (typeof $rt_decodeStack === "function" && err.stack) {
        let stack = $rt_decodeStack(err.stack);
        let javaStack = $rt_createArray($rt_stecls(), stack.length);
        let elem;
        let noStack = false;
        for (let i = 0;i < stack.length;++i) {
            let element = stack[i];
            elem = $rt_createStackElement($rt_str(element.className), $rt_str(element.methodName), $rt_str(element.fileName), element.lineNumber);
            if (elem == null) {
                noStack = true;
                break;
            }
            javaStack.data[i] = elem;
        }
        if (!noStack) {
            $rt_setStack(ex, javaStack);
        }
    }
},
JavaError;
if (typeof Reflect === 'object') {
    let defaultMessage = Symbol("defaultMessage");
    JavaError = function JavaError(message, cause) {
        let self = Reflect.construct(Error, [void 0, cause], JavaError);
        Object.setPrototypeOf(self, JavaError.prototype);
        self[defaultMessage] = message;
        return self;
    }
    ;
    JavaError.prototype = Object.create(Error.prototype, { constructor : { configurable : true, writable : true, value : JavaError }, message : { get() {
        try {
            let javaException = this[$rt_javaExceptionProp];
            if (typeof javaException === 'object') {
                let javaMessage = $rt_throwableMessage(javaException);
                if (typeof javaMessage === "object") {
                    return javaMessage !== null ? javaMessage.toString() : null;
                }
            }
            return this[defaultMessage];
        } catch (e){
            return "Exception occurred trying to extract Java exception message: " + e;
        }
    } } });
} else {
    JavaError = Error;
}
let $rt_javaException = e => e instanceof Error && typeof e[$rt_javaExceptionProp] === 'object' ? e[$rt_javaExceptionProp] : null,
$rt_wrapException = err => {
    let ex = err[$rt_javaExceptionProp];
    if (!ex) {
        ex = $rt_createException($rt_str("(JavaScript) " + err.toString()));
        err[$rt_javaExceptionProp] = ex;
        ex.$jsException = err;
        $rt_fillStack(err, ex);
    }
    return ex;
},
$rt_createException = message => jl_RuntimeException__init_1(message),
$rt_throwableMessage = t => jl_Throwable_getMessage(t),
$rt_throwableCause = t => jl_Throwable_getCause(t),
$rt_stecls = () => jl_StackTraceElement,
$rt_createStackElement = (className, methodName, fileName, lineNumber) => {
    {
        return null;
    }
},
$rt_setStack = (e, stack) => {
},
$rt_createOutputFunction = outputFunction => {
    let buffer = "";
    return msg => {
        let index = 0;
        while (true) {
            let next = msg.indexOf('\n', index);
            if (next < 0) {
                break;
            }
            outputFunction(buffer + msg.substring(index, next));
            buffer = "";
            index = next + 1;
        }
        buffer += msg.substring(index);
    };
},
$rt_putStdout = typeof $rt_putStdoutCustom === "function" ? $rt_putStdoutCustom : typeof console === "object" ? $rt_createOutputFunction(msg => console.info(msg)) : () => {
},
$rt_packageData = null,
$rt_packages = data => {
    let i = 0;
    let packages = new Array(data.length);
    for (let j = 0;j < data.length;++j) {
        let prefixIndex = data[i++];
        let prefix = prefixIndex >= 0 ? packages[prefixIndex] : "";
        packages[j] = prefix + data[i++] + ".";
    }
    $rt_packageData = packages;
},
$rt_allClasses = [],
$rt_metadata = data => {
    let packages = $rt_packageData;
    let i = 0;
    while (i < data.length) {
        let cls = data[i++];
        $rt_allClasses.push(cls);
        let m = $rt_newClassMetadata();
        cls[$rt_meta] = m;
        let className = data[i++];
        m.name = className !== 0 ? className : null;
        if (m.name !== null) {
            let packageIndex = data[i++];
            if (packageIndex >= 0) {
                m.name = packages[packageIndex] + m.name;
            }
        }
        m.binaryName = "L" + m.name + ";";
        let superclass = data[i++];
        m.parent = superclass !== 0 ? superclass : null;
        m.superinterfaces = data[i++];
        if (m.parent) {
            cls.prototype = Object.create(m.parent.prototype);
        } else {
            cls.prototype = {  };
        }
        cls.prototype.constructor = cls;
        m.modifiers = data[i++];
        m.primitiveKind = 0;
        let innerClassInfo = data[i++];
        if (innerClassInfo !== 0) {
            let enclosingClass = innerClassInfo[0];
            m.enclosingClass = enclosingClass !== 0 ? enclosingClass : null;
            let declaringClass = innerClassInfo[1];
            m.declaringClass = declaringClass !== 0 ? declaringClass : null;
            let simpleName = innerClassInfo[2];
            m.simpleName = simpleName !== 0 ? simpleName : null;
        }
        let clinit = data[i++];
        m.clinit = clinit !== 0 ? () => {
            m.clinit = () => {
            };
            clinit();
        } : () => {
        };
        let virtualMethods = data[i++];
        if (virtualMethods !== 0) {
            for (let j = 0;j < virtualMethods.length;j += 2) {
                let name = virtualMethods[j];
                let func = virtualMethods[j + 1];
                if (typeof name === 'string') {
                    name = [name];
                }
                for (let k = 0;k < name.length;++k) {
                    cls.prototype[name[k]] = func;
                }
            }
        }
    }
};
function TeaVMThread(runner) {
    this.status = 3;
    this.stack = [];
    this.suspendCallback = null;
    this.runner = runner;
    this.attribute = null;
    this.completeCallback = null;
}
TeaVMThread.prototype.push = function() {
    for (let i = 0;i < arguments.length;++i) {
        this.stack.push(arguments[i]);
    }
    return this;
};
TeaVMThread.prototype.s = TeaVMThread.prototype.push;
TeaVMThread.prototype.pop = function() {
    return this.stack.pop();
};
TeaVMThread.prototype.l = TeaVMThread.prototype.pop;
TeaVMThread.prototype.isResuming = function() {
    return this.status === 2;
};
TeaVMThread.prototype.isSuspending = function() {
    return this.status === 1;
};
TeaVMThread.prototype.suspend = function(callback) {
    this.suspendCallback = callback;
    this.status = 1;
};
TeaVMThread.prototype.start = function(callback) {
    if (this.status !== 3) {
        throw new Error("Thread already started");
    }
    if ($rt_currentNativeThread !== null) {
        throw new Error("Another thread is running");
    }
    this.status = 0;
    this.completeCallback = callback ? callback : result => {
        if (result instanceof Error) {
            throw result;
        }
    };
    this.run();
};
TeaVMThread.prototype.resume = function() {
    if ($rt_currentNativeThread !== null) {
        throw new Error("Another thread is running");
    }
    this.status = 2;
    this.run();
};
TeaVMThread.prototype.run = function() {
    $rt_currentNativeThread = this;
    let result;
    try {
        result = this.runner();
    } catch (e){
        result = e;
    } finally {
        $rt_currentNativeThread = null;
    }
    if (this.suspendCallback !== null) {
        let self = this;
        let callback = this.suspendCallback;
        this.suspendCallback = null;
        callback(() => self.resume());
    } else if (this.status === 0) {
        this.completeCallback(result);
    }
};
let $rt_suspending = () => {
    let thread = $rt_nativeThread();
    return thread != null && thread.isSuspending();
},
$rt_resuming = () => {
    let thread = $rt_nativeThread();
    return thread != null && thread.isResuming();
},
$rt_requireNativeThread = () => {
    let nativeThread = $rt_nativeThread();
    if (nativeThread === null) {
        throw new Error("Suspension point reached from non-threading context " + "(perhaps, from native JS method). See https://teavm.org/docs/runtime/coroutines.html " + "('Interaction with JavaScript' section)");
    }
    return nativeThread;
},
$rt_startThread = (runner, callback) => (new TeaVMThread(runner)).start(callback),
$rt_currentNativeThread = null,
$rt_nativeThread = () => $rt_currentNativeThread,
$rt_invalidPointer = () => {
    throw new Error("Invalid recorded state");
};
function jl_Object() {
    this.$monitor = null;
    this.$id$ = 0;
}
let jl_Object_monitorEnterSync = $o => {
    let var$2;
    if (jl_Thread_currentThread() === null)
        return;
    if ($o.$monitor === null)
        jl_Object_createMonitor($o);
    if ($o.$monitor.$owner === null)
        $o.$monitor.$owner = jl_Thread_currentThread();
    else if ($o.$monitor.$owner !== jl_Thread_currentThread())
        $rt_throw(jl_IllegalStateException__init_2($rt_s(0)));
    var$2 = $o.$monitor;
    var$2.$count = var$2.$count + 1 | 0;
},
jl_Object_monitorExitSync = $o => {
    let var$2, var$3;
    if (jl_Thread_currentThread() === null)
        return;
    if (!jl_Object_isEmptyMonitor($o) && $o.$monitor.$owner === jl_Thread_currentThread()) {
        var$2 = $o.$monitor;
        var$3 = var$2.$count - 1 | 0;
        var$2.$count = var$3;
        if (!var$3)
            $o.$monitor.$owner = null;
        jl_Object_isEmptyMonitor($o);
        return;
    }
    $rt_throw(jl_IllegalMonitorStateException__init_0());
},
jl_Object_monitorEnter0 = $o => {
    let var$2, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        let $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$2 = $thread.pop();$o = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        var$2 = 1;
        $ptr = 1;
    case 1:
        jl_Object_monitorEnter($o, var$2);
        if ($rt_suspending()) {
            break main;
        }
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($o, var$2, $ptr);
},
jl_Object_monitorEnter = ($o, $count) => {
    let var$3, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        let $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$3 = $thread.pop();$count = $thread.pop();$o = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        if ($o.$monitor === null)
            jl_Object_createMonitor($o);
        if ($o.$monitor.$owner === null)
            $o.$monitor.$owner = jl_Thread_currentThread();
        if ($o.$monitor.$owner === jl_Thread_currentThread()) {
            var$3 = $o.$monitor;
            var$3.$count = var$3.$count + $count | 0;
            return;
        }
        $ptr = 1;
    case 1:
        jl_Object_monitorEnterWait($o, $count);
        if ($rt_suspending()) {
            break main;
        }
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($o, $count, var$3, $ptr);
},
jl_Object_createMonitor = $o => {
    $o.$monitor = jl_Object$Monitor__init_0();
},
jl_Object_monitorEnterWait = (var$1, var$2) => {
    let $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        let $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$2 = $thread.pop();var$1 = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        $ptr = 1;
    case 1:
        jl_Object_monitorEnterWait$_asyncCall_$(var$1, var$2);
        if ($rt_suspending()) {
            break main;
        }
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push(var$1, var$2, $ptr);
},
jl_Object_monitorEnterWait0 = ($o, $count, $callback) => {
    let $thread_0, var$5, $monitor;
    $thread_0 = jl_Thread_currentThread();
    if ($o.$monitor === null) {
        jl_Object_createMonitor($o);
        jl_Thread_setCurrentThread($thread_0);
        var$5 = $o.$monitor;
        var$5.$count = var$5.$count + $count | 0;
        $callback.$complete(null);
        return;
    }
    if ($o.$monitor.$owner === null) {
        $o.$monitor.$owner = $thread_0;
        jl_Thread_setCurrentThread($thread_0);
        var$5 = $o.$monitor;
        var$5.$count = var$5.$count + $count | 0;
        $callback.$complete(null);
        return;
    }
    $monitor = $o.$monitor;
    if ($monitor.$enteringThreads === null)
        $monitor.$enteringThreads = ju_ArrayDeque__init_1();
    $monitor.$enteringThreads.$add(jl_Object$monitorEnterWait$lambda$_6_0__init_0($thread_0, $o, $count, $callback));
},
jl_Object_monitorExit0 = $o => {
    jl_Object_monitorExit($o, 1);
},
jl_Object_monitorExit = ($o, $count) => {
    let $monitor;
    if (!jl_Object_isEmptyMonitor($o) && $o.$monitor.$owner === jl_Thread_currentThread()) {
        $monitor = $o.$monitor;
        $monitor.$count = $monitor.$count - $count | 0;
        if ($monitor.$count > 0)
            return;
        $monitor.$owner = null;
        if ($monitor.$enteringThreads !== null && !$monitor.$enteringThreads.$isEmpty())
            otp_Platform_postpone(jl_Object$monitorExit$lambda$_8_1__init_0($o));
        else
            jl_Object_isEmptyMonitor($o);
        return;
    }
    $rt_throw(jl_IllegalMonitorStateException__init_0());
},
jl_Object_waitForOtherThreads = $o => {
    let $monitor, $enteringThreads, $r;
    if (!jl_Object_isEmptyMonitor($o) && $o.$monitor.$owner === null) {
        $monitor = $o.$monitor;
        if ($monitor.$enteringThreads !== null && !$monitor.$enteringThreads.$isEmpty()) {
            $enteringThreads = $monitor.$enteringThreads;
            $r = $enteringThreads.$remove();
            $monitor.$enteringThreads = null;
            $r.$run();
        }
        return;
    }
},
jl_Object_isEmptyMonitor = $this => {
    let $monitor, var$2;
    $monitor = $this.$monitor;
    if ($monitor === null)
        return 1;
    a: {
        b: {
            if ($monitor.$owner === null) {
                if ($monitor.$enteringThreads !== null) {
                    var$2 = $monitor.$enteringThreads;
                    if (!var$2.$isEmpty())
                        break b;
                }
                if ($monitor.$notifyListeners === null)
                    break a;
                var$2 = $monitor.$notifyListeners;
                if (var$2.$isEmpty())
                    break a;
            }
        }
        return 0;
    }
    jl_Object_deleteMonitor($this);
    return 1;
},
jl_Object_deleteMonitor = $this => {
    $this.$monitor = null;
},
jl_Object__init_ = $this => {
    return;
},
jl_Object__init_0 = () => {
    let var_0 = new jl_Object();
    jl_Object__init_(var_0);
    return var_0;
},
jl_Object_getClass = $this => {
    return $rt_cls(jl_Object_getClassInfo($this));
},
jl_Object_getClassInfo = var$0 => {
    return var$0.constructor;
},
jl_Object_hashCode = var$0 => {
    return jl_Object_identity(var$0);
},
jl_Object_equals = ($this, $other) => {
    return $this !== $other ? 0 : 1;
},
jl_Object_toString = $this => {
    let var$1, var$2, var$3;
    var$1 = jl_Class_getName(jl_Object_getClass($this));
    var$2 = jl_Integer_toHexString(jl_Object_identity($this));
    var$3 = jl_StringBuilder__init_();
    jl_StringBuilder_append(jl_StringBuilder_append1(jl_StringBuilder_append(var$3, var$1), 64), var$2);
    return jl_StringBuilder_toString(var$3);
},
jl_Object_identity = $this => {
    let $platformThis;
    $platformThis = $this;
    if (!$platformThis.$id$)
        $platformThis.$id$ = $rt_nextId();
    return $this.$id$;
},
jl_Object_clone = $this => {
    let $cls, $result, var$3, var$4;
    $cls = jl_Class_getClassInfo(jl_Object_getClass($this));
    if (!$rt_isInstance($this, jl_Cloneable) && $cls[$rt_meta].itemType === null)
        $rt_throw(jl_CloneNotSupportedException__init_0());
    $result = otp_Platform_clone($this);
    var$3 = $result;
    var$4 = $rt_nextId();
    var$3.$id$ = var$4;
    return $result;
},
jl_Object_lambda$monitorExit$2 = $o => {
    jl_Object_waitForOtherThreads($o);
},
jl_Object_lambda$monitorEnterWait$0 = ($thread_0, $o, $count, $callback) => {
    let var$5;
    jl_Thread_setCurrentThread($thread_0);
    $o.$monitor.$owner = $thread_0;
    var$5 = $o.$monitor;
    var$5.$count = var$5.$count + $count | 0;
    $callback.$complete(null);
},
jl_Object_monitorEnterWait$_asyncCall_$ = (var$1, var$2) => {
    let thread = $rt_requireNativeThread();
    let javaThread = $rt_getThread();
    if (thread.isResuming()) {
        thread.status = 0;
        let result = thread.attribute;
        if (result instanceof Error) {
            throw result;
        }
        return result;
    }
    let callback = function() {
    };
    callback.$complete = val => {
        thread.attribute = val;
        $rt_setThread(javaThread);
        thread.resume();
    };
    callback.$error = e => {
        thread.attribute = $rt_exception(e);
        $rt_setThread(javaThread);
        thread.resume();
    };
    callback = otpp_AsyncCallbackWrapper_create(callback);
    thread.suspend(() => {
        try {
            jl_Object_monitorEnterWait0(var$1, var$2, callback);
            ;
        } catch ($e){
            callback.$error($e);
        }
    });
    return null;
};
function jur_AbstractCharClass$LazyCharClass() {
    let a = this; jl_Object.call(a);
    a.$posValue = null;
    a.$negValue = null;
}
let jur_AbstractCharClass$LazyCharClass__init_ = $this => {
    jl_Object__init_($this);
},
jur_AbstractCharClass$LazyCharClass_getValue = ($this, $negative) => {
    if (!$negative && $this.$posValue === null)
        $this.$posValue = $this.$computeValue();
    else if ($negative && $this.$negValue === null)
        $this.$negValue = ($this.$computeValue()).$setNegative(1);
    if ($negative)
        return $this.$negValue;
    return $this.$posValue;
},
jur_AbstractCharClass$LazyBlank = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyBlank__init_ = $this => {
    jur_AbstractCharClass$LazyCharClass__init_($this);
},
jur_AbstractCharClass$LazyBlank__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazyBlank();
    jur_AbstractCharClass$LazyBlank__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyBlank_computeValue = $this => {
    return ((jur_CharClass__init_()).$add0(32)).$add0(9);
},
jur_AbstractCharClass$LazyCntrl = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyCntrl__init_ = $this => {
    jur_AbstractCharClass$LazyCharClass__init_($this);
},
jur_AbstractCharClass$LazyCntrl__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazyCntrl();
    jur_AbstractCharClass$LazyCntrl__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyCntrl_computeValue = $this => {
    return ((jur_CharClass__init_()).$add1(0, 31)).$add0(127);
},
ju_Enumeration = $rt_classWithoutFields(0),
ji_Serializable = $rt_classWithoutFields(0),
jl_Number = $rt_classWithoutFields(),
jl_Number__init_ = $this => {
    jl_Object__init_($this);
},
jl_Comparable = $rt_classWithoutFields(0);
function jl_Integer() {
    jl_Number.call(this);
    this.$value0 = 0;
}
let jl_Integer_TYPE = null,
jl_Integer_integerCache = null,
jl_Integer_$callClinit = () => {
    jl_Integer_$callClinit = $rt_eraseClinit(jl_Integer);
    jl_Integer__clinit_();
},
jl_Integer__init_ = ($this, $value) => {
    jl_Integer_$callClinit();
    jl_Number__init_($this);
    $this.$value0 = $value;
},
jl_Integer__init_0 = var_0 => {
    let var_1 = new jl_Integer();
    jl_Integer__init_(var_1, var_0);
    return var_1;
},
jl_Integer_toString0 = ($i, $radix) => {
    jl_Integer_$callClinit();
    if (!($radix >= 2 && $radix <= 36))
        $radix = 10;
    return ((jl_AbstractStringBuilder__init_3(20)).$append1($i, $radix)).$toString();
},
jl_Integer_hashCode0 = $value => {
    jl_Integer_$callClinit();
    return $value;
},
jl_Integer_toHexString = $i => {
    jl_Integer_$callClinit();
    return otci_IntegerUtil_toUnsignedLogRadixString($i, 4);
},
jl_Integer_toString = $i => {
    jl_Integer_$callClinit();
    return jl_Integer_toString0($i, 10);
},
jl_Integer_parseInt = ($s, $radix) => {
    jl_Integer_$callClinit();
    if ($s !== null)
        return jl_Integer_parseIntImpl($s, 0, $s.$length(), $radix);
    $rt_throw(jl_NumberFormatException__init_0($rt_s(1)));
},
jl_Integer_parseIntImpl = ($s, $beginIndex, $endIndex, $radix) => {
    let $negative, var$6, $value, $maxValue, var$9, $digit, var$11, var$12, var$13, var$14;
    jl_Integer_$callClinit();
    if ($beginIndex == $endIndex)
        $rt_throw(jl_NumberFormatException__init_0($rt_s(2)));
    if ($radix >= 2 && $radix <= 36) {
        a: {
            $negative = 0;
            switch ($s.$charAt($beginIndex)) {
                case 43:
                    var$6 = $beginIndex + 1 | 0;
                    break a;
                case 45:
                    $negative = 1;
                    var$6 = $beginIndex + 1 | 0;
                    break a;
                default:
            }
            var$6 = $beginIndex;
        }
        $value = 0;
        $maxValue = 1 + (2147483647 / $radix | 0) | 0;
        if (var$6 == $endIndex)
            $rt_throw(jl_NumberFormatException__init_2());
        while (true) {
            if (var$6 >= $endIndex) {
                if ($negative)
                    $value =  -$value | 0;
                return $value;
            }
            var$9 = var$6 + 1 | 0;
            $digit = jl_Integer_decodeDigit($s.$charAt(var$6));
            if ($digit < 0) {
                var$11 = new jl_NumberFormatException;
                var$12 = jl_String_valueOf($s.$subSequence($beginIndex, $endIndex));
                var$13 = jl_StringBuilder__init_();
                jl_StringBuilder_append(jl_StringBuilder_append(var$13, $rt_s(3)), var$12);
                jl_NumberFormatException__init_(var$11, jl_StringBuilder_toString(var$13));
                $rt_throw(var$11);
            }
            if ($digit >= $radix) {
                var$12 = new jl_NumberFormatException;
                var$13 = jl_String_valueOf($s.$subSequence($beginIndex, $endIndex));
                var$14 = jl_StringBuilder__init_();
                jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append0(jl_StringBuilder_append(var$14, $rt_s(4)), $radix), $rt_s(5)), var$13);
                jl_NumberFormatException__init_(var$12, jl_StringBuilder_toString(var$14));
                $rt_throw(var$12);
            }
            if ($value > $maxValue)
                break;
            $value = $rt_imul($radix, $value) + $digit | 0;
            if ($value < 0) {
                if (var$9 == $endIndex && $value == (-2147483648) && $negative)
                    return (-2147483648);
                var$11 = new jl_NumberFormatException;
                var$12 = jl_String_valueOf($s.$subSequence($beginIndex, $endIndex));
                var$13 = jl_StringBuilder__init_();
                jl_StringBuilder_append(jl_StringBuilder_append(var$13, $rt_s(6)), var$12);
                jl_NumberFormatException__init_(var$11, jl_StringBuilder_toString(var$13));
                $rt_throw(var$11);
            }
            var$6 = var$9;
        }
        $rt_throw(jl_NumberFormatException__init_0($rt_s(7)));
    }
    var$11 = new jl_NumberFormatException;
    var$12 = jl_StringBuilder__init_();
    jl_StringBuilder_append0(jl_StringBuilder_append(var$12, $rt_s(8)), $radix);
    jl_NumberFormatException__init_(var$11, jl_StringBuilder_toString(var$12));
    $rt_throw(var$11);
},
jl_Integer_valueOf = $i => {
    jl_Integer_$callClinit();
    if ($i >= (-128) && $i <= 127) {
        jl_Integer_ensureIntegerCache();
        return jl_Integer_integerCache.data[$i + 128 | 0];
    }
    return jl_Integer__init_0($i);
},
jl_Integer_ensureIntegerCache = () => {
    let $j;
    jl_Integer_$callClinit();
    a: {
        if (jl_Integer_integerCache === null) {
            jl_Integer_integerCache = $rt_createArray(jl_Integer, 256);
            $j = 0;
            while (true) {
                if ($j >= jl_Integer_integerCache.data.length)
                    break a;
                jl_Integer_integerCache.data[$j] = jl_Integer__init_0($j - 128 | 0);
                $j = $j + 1 | 0;
            }
        }
    }
},
jl_Integer_intValue = $this => {
    return $this.$value0;
},
jl_Integer_toString1 = $this => {
    return jl_Integer_toString($this.$value0);
},
jl_Integer_hashCode = $this => {
    return jl_Integer_hashCode0($this.$value0);
},
jl_Integer_equals = ($this, $other) => {
    if ($this === $other)
        return 1;
    return $other instanceof jl_Integer && $other.$value0 == $this.$value0 ? 1 : 0;
},
jl_Integer_decodeDigit = $c => {
    jl_Integer_$callClinit();
    if ($c >= 48 && $c <= 57)
        return $c - 48 | 0;
    if ($c >= 97 && $c <= 122)
        return ($c - 97 | 0) + 10 | 0;
    if ($c >= 65 && $c <= 90)
        return ($c - 65 | 0) + 10 | 0;
    return (-1);
},
jl_Integer_numberOfLeadingZeros = $i => {
    let $n, var$3, var$4;
    jl_Integer_$callClinit();
    if (!$i)
        return 32;
    $n = 0;
    var$3 = $i >>> 16 | 0;
    if (var$3)
        $n = 16;
    else
        var$3 = $i;
    var$4 = var$3 >>> 8 | 0;
    if (!var$4)
        var$4 = var$3;
    else
        $n = $n | 8;
    var$3 = var$4 >>> 4 | 0;
    if (!var$3)
        var$3 = var$4;
    else
        $n = $n | 4;
    var$4 = var$3 >>> 2 | 0;
    if (!var$4)
        var$4 = var$3;
    else
        $n = $n | 2;
    if (var$4 >>> 1 | 0)
        $n = $n | 1;
    return (32 - $n | 0) - 1 | 0;
},
jl_Integer_numberOfTrailingZeros = $i => {
    let $n, var$3, var$4;
    jl_Integer_$callClinit();
    if (!$i)
        return 32;
    $n = 0;
    var$3 = $i << 16;
    if (var$3)
        $n = 16;
    else
        var$3 = $i;
    var$4 = var$3 << 8;
    if (!var$4)
        var$4 = var$3;
    else
        $n = $n | 8;
    var$3 = var$4 << 4;
    if (!var$3)
        var$3 = var$4;
    else
        $n = $n | 4;
    var$4 = var$3 << 2;
    if (!var$4)
        var$4 = var$3;
    else
        $n = $n | 2;
    if (var$4 << 1)
        $n = $n | 1;
    return (32 - $n | 0) - 1 | 0;
},
jl_Integer_rotateLeft = ($i, $distance) => {
    let var$3;
    jl_Integer_$callClinit();
    var$3 = $distance & 31;
    return $i << var$3 | ($i >>> (32 - var$3 | 0) | 0);
},
jl_Integer__clinit_ = () => {
    jl_Integer_TYPE = $rt_cls($rt_intcls);
};
function jl_Enum() {
    let a = this; jl_Object.call(a);
    a.$name1 = null;
    a.$ordinal0 = 0;
}
let jl_Enum__init_ = ($this, $name, $ordinal) => {
    jl_Object__init_($this);
    $this.$name1 = $name;
    $this.$ordinal0 = $ordinal;
},
jl_Enum_ordinal = $this => {
    return $this.$ordinal0;
},
ag_Bitmap$Config = $rt_classWithoutFields(jl_Enum),
ag_Bitmap$Config_ALPHA_8 = null,
ag_Bitmap$Config_RGB_565 = null,
ag_Bitmap$Config_ARGB_4444 = null,
ag_Bitmap$Config_ARGB_8888 = null,
ag_Bitmap$Config_$VALUES = null,
ag_Bitmap$Config_$callClinit = () => {
    ag_Bitmap$Config_$callClinit = $rt_eraseClinit(ag_Bitmap$Config);
    ag_Bitmap$Config__clinit_();
},
ag_Bitmap$Config__init_0 = (var$0, var$1, var$2) => {
    ag_Bitmap$Config_$callClinit();
    jl_Enum__init_(var$0, var$1, var$2);
},
ag_Bitmap$Config__init_ = (var_0, var_1) => {
    let var_2 = new ag_Bitmap$Config();
    ag_Bitmap$Config__init_0(var_2, var_0, var_1);
    return var_2;
},
ag_Bitmap$Config_$values = () => {
    let var$1, var$2;
    ag_Bitmap$Config_$callClinit();
    var$1 = $rt_createArray(ag_Bitmap$Config, 4);
    var$2 = var$1.data;
    var$2[0] = ag_Bitmap$Config_ALPHA_8;
    var$2[1] = ag_Bitmap$Config_RGB_565;
    var$2[2] = ag_Bitmap$Config_ARGB_4444;
    var$2[3] = ag_Bitmap$Config_ARGB_8888;
    return var$1;
},
ag_Bitmap$Config__clinit_ = () => {
    ag_Bitmap$Config_ALPHA_8 = ag_Bitmap$Config__init_($rt_s(9), 0);
    ag_Bitmap$Config_RGB_565 = ag_Bitmap$Config__init_($rt_s(10), 1);
    ag_Bitmap$Config_ARGB_4444 = ag_Bitmap$Config__init_($rt_s(11), 2);
    ag_Bitmap$Config_ARGB_8888 = ag_Bitmap$Config__init_($rt_s(12), 3);
    ag_Bitmap$Config_$VALUES = ag_Bitmap$Config_$values();
},
ao_GLES20 = $rt_classWithoutFields(),
ao_GLES20_gl = null,
ao_GLES20_handles = null,
ao_GLES20_nextHandle = 0,
ao_GLES20_sink = null,
ao_GLES20_$callClinit = () => {
    ao_GLES20_$callClinit = $rt_eraseClinit(ao_GLES20);
    ao_GLES20__clinit_();
},
ao_GLES20_trace = var$1 => {
    ao_GLES20_$callClinit();
    if (ao_GLES20_sink !== null)
        ao_GLES20_sink.$log(var$1);
},
ao_GLES20_setContext = var$1 => {
    ao_GLES20_$callClinit();
    ao_GLES20_gl = var$1;
},
ao_GLES20_getContext = () => {
    ao_GLES20_$callClinit();
    return ao_GLES20_gl;
},
ao_GLES20_reg = var$1 => {
    let var$2;
    ao_GLES20_$callClinit();
    var$2 = ao_GLES20_nextHandle;
    ao_GLES20_nextHandle = var$2 + 1 | 0;
    ao_GLES20_handles.$put(jl_Integer_valueOf(var$2), var$1);
    return var$2;
},
ao_GLES20_obj = var$1 => {
    let var$2;
    ao_GLES20_$callClinit();
    var$2 = ao_GLES20_handles.$get(jl_Integer_valueOf(var$1));
    if (var$2 === null)
        var$2 = null;
    return var$2;
},
ao_GLES20_toView = var$1 => {
    let var$2, var$3, var$4, var$5, var$6;
    ao_GLES20_$callClinit();
    if (var$1 === null)
        return null;
    var$2 = var$1 instanceof jn_FloatBuffer;
    if (!var$2 && !(var$1 instanceof jn_IntBuffer) && !(var$1 instanceof jn_ShortBuffer) && !(var$1 instanceof jn_ByteBuffer))
        return null;
    if ($rt_isInstance(var$1, otcjn_TArrayBufferViewProvider)) {
        var$3 = var$1;
        var$4 = var$3.$getArrayBufferView();
        if (var$4 !== null) {
            var$5 = var$3.$elementSize();
            var$6 = var$4.byteOffset + $rt_imul(jn_Buffer_position(var$1), var$5) | 0;
            var$5 = $rt_imul(jn_Buffer_remaining(var$1), var$5);
            var$3 = var$4.buffer;
            if (var$2)
                return new Float32Array(var$3, var$6, var$5 / 4 | 0);
            if (var$1 instanceof jn_IntBuffer)
                return new Int32Array(var$3, var$6, var$5 / 4 | 0);
            if (!(var$1 instanceof jn_ShortBuffer))
                return new Int8Array(var$3, var$6, var$5);
            return new Int16Array(var$3, var$6, var$5 / 2 | 0);
        }
    }
    var$5 = jn_Buffer_remaining(var$1);
    if (var$2) {
        var$3 = new Float32Array(var$5);
        var$1 = var$1.$duplicate();
        var$2 = 0;
        while (var$2 < var$5) {
            var$3[var$2] = var$1.$get0();
            var$2 = var$2 + 1 | 0;
        }
        return var$3;
    }
    if (var$1 instanceof jn_IntBuffer) {
        var$3 = new Int32Array(var$5);
        var$1 = var$1.$duplicate0();
        var$2 = 0;
        while (var$2 < var$5) {
            var$3[var$2] = var$1.$get1();
            var$2 = var$2 + 1 | 0;
        }
        return var$3;
    }
    if (var$1 instanceof jn_ShortBuffer) {
        var$3 = new Int16Array(var$5);
        var$1 = var$1.$duplicate1();
        var$2 = 0;
        while (var$2 < var$5) {
            var$3[var$2] = var$1.$get2();
            var$2 = var$2 + 1 | 0;
        }
        return var$3;
    }
    if (!(var$1 instanceof jn_ByteBuffer))
        return null;
    var$3 = new Int8Array(var$5);
    var$1 = var$1.$duplicate2();
    var$2 = 0;
    while (var$2 < var$5) {
        var$6 = var$1.$get3();
        var$3[var$2] = var$6;
        var$2 = var$2 + 1 | 0;
    }
    return var$3;
},
ao_GLES20_glEnable = var$1 => {
    ao_GLES20_$callClinit();
    if (ao_GLES20_gl !== null)
        ao_GLES20_gl.enable(var$1);
},
ao_GLES20_glClear = var$1 => {
    ao_GLES20_$callClinit();
    if (ao_GLES20_gl !== null)
        ao_GLES20_gl.clear(var$1);
},
ao_GLES20_glClearColor = (var$1, var$2, var$3, var$4) => {
    ao_GLES20_$callClinit();
    if (ao_GLES20_gl !== null)
        ao_GLES20_gl.clearColor(var$1, var$2, var$3, var$4);
},
ao_GLES20_glViewport = (var$1, var$2, var$3, var$4) => {
    ao_GLES20_$callClinit();
    if (ao_GLES20_gl !== null)
        ao_GLES20_gl.viewport(var$1, var$2, var$3, var$4);
},
ao_GLES20_glLineWidth = var$1 => {
    ao_GLES20_$callClinit();
    if (ao_GLES20_gl !== null)
        ao_GLES20_gl.lineWidth(var$1);
},
ao_GLES20_glBlendFunc = (var$1, var$2) => {
    ao_GLES20_$callClinit();
    if (ao_GLES20_gl !== null)
        ao_GLES20_gl.blendFunc(var$1, var$2);
},
ao_GLES20_glBlendColor = (var$1, var$2, var$3, var$4) => {
    ao_GLES20_$callClinit();
    if (ao_GLES20_gl !== null)
        ao_GLES20_gl.blendColor(var$1, var$2, var$3, var$4);
},
ao_GLES20_glGetError = () => {
    ao_GLES20_$callClinit();
    return ao_GLES20_gl === null ? 0 : ao_GLES20_gl.getError();
},
ao_GLES20_glFinish = () => {
    ao_GLES20_$callClinit();
    if (ao_GLES20_gl !== null)
        ao_GLES20_gl.finish();
},
ao_GLES20_glCreateShader = var$1 => {
    ao_GLES20_$callClinit();
    return ao_GLES20_gl === null ? 0 : ao_GLES20_reg(otji_JSWrapper_wrap(ao_GLES20_gl.createShader(var$1)));
},
ao_GLES20_glShaderSource = (var$1, var$2) => {
    let var$3;
    ao_GLES20_$callClinit();
    if (ao_GLES20_gl === null)
        return;
    var$3 = otji_JSWrapper_unwrap(ao_GLES20_obj(var$1));
    if (var$3 !== null)
        ao_GLES20_gl.shaderSource(var$3, $rt_ustr(var$2));
},
ao_GLES20_glCompileShader = var$1 => {
    let var$2;
    ao_GLES20_$callClinit();
    if (ao_GLES20_gl === null)
        return;
    var$2 = otji_JSWrapper_unwrap(ao_GLES20_obj(var$1));
    if (var$2 !== null)
        ao_GLES20_gl.compileShader(var$2);
},
ao_GLES20_glGetShaderiv = (var$1, var$2, var$3, var$4) => {
    let var$5;
    ao_GLES20_$callClinit();
    if (ao_GLES20_gl !== null && var$3 !== null) {
        var$5 = otji_JSWrapper_unwrap(ao_GLES20_obj(var$1));
        var$3.data[var$4] = var$5 === null ? 0 : ao_GLES20_toInt$js_body$_7(ao_GLES20_gl.getShaderParameter(var$5, var$2));
        return;
    }
},
ao_GLES20_glGetShaderInfoLog = var$1 => {
    let var$2;
    ao_GLES20_$callClinit();
    if (ao_GLES20_gl === null)
        return $rt_s(13);
    var$2 = otji_JSWrapper_unwrap(ao_GLES20_obj(var$1));
    return var$2 === null ? $rt_s(13) : $rt_str(ao_GLES20_gl.getShaderInfoLog(var$2));
},
ao_GLES20_glCreateProgram = () => {
    ao_GLES20_$callClinit();
    return ao_GLES20_gl === null ? 0 : ao_GLES20_reg(otji_JSWrapper_wrap(ao_GLES20_gl.createProgram()));
},
ao_GLES20_glAttachShader = (var$1, var$2) => {
    let var$3, var$4;
    ao_GLES20_$callClinit();
    if (ao_GLES20_gl === null)
        return;
    var$3 = otji_JSWrapper_unwrap(ao_GLES20_obj(var$1));
    var$4 = otji_JSWrapper_unwrap(ao_GLES20_obj(var$2));
    if (var$3 !== null && var$4 !== null)
        ao_GLES20_gl.attachShader(var$3, var$4);
},
ao_GLES20_glLinkProgram = var$1 => {
    let var$2;
    ao_GLES20_$callClinit();
    if (ao_GLES20_gl === null)
        return;
    var$2 = otji_JSWrapper_unwrap(ao_GLES20_obj(var$1));
    if (var$2 !== null)
        ao_GLES20_gl.linkProgram(var$2);
},
ao_GLES20_glUseProgram = var$1 => {
    let var$2, var$3;
    ao_GLES20_$callClinit();
    if (ao_GLES20_gl === null)
        return;
    var$2 = jl_StringBuilder__init_();
    jl_StringBuilder_append1(jl_StringBuilder_append0(jl_StringBuilder_append(var$2, $rt_s(14)), var$1), 41);
    ao_GLES20_trace(jl_StringBuilder_toString(var$2));
    var$2 = ao_GLES20_gl;
    var$3 = !var$1 ? null : otji_JSWrapper_unwrap(ao_GLES20_obj(var$1));
    var$2.useProgram(var$3);
    ao_GLES20_checkErr($rt_s(15));
},
ao_GLES20_glDeleteProgram = var$1 => {
    let var$2;
    ao_GLES20_$callClinit();
    if (ao_GLES20_gl === null)
        return;
    var$2 = otji_JSWrapper_unwrap(ao_GLES20_obj(var$1));
    if (var$2 !== null)
        ao_GLES20_gl.deleteProgram(var$2);
    ao_GLES20_handles.$remove0(jl_Integer_valueOf(var$1));
},
ao_GLES20_glGetProgramiv = (var$1, var$2, var$3, var$4) => {
    let var$5;
    ao_GLES20_$callClinit();
    if (ao_GLES20_gl !== null && var$3 !== null) {
        var$5 = otji_JSWrapper_unwrap(ao_GLES20_obj(var$1));
        var$3.data[var$4] = var$5 === null ? 0 : ao_GLES20_toInt$js_body$_7(ao_GLES20_gl.getProgramParameter(var$5, var$2));
        return;
    }
},
ao_GLES20_glGetProgramInfoLog = var$1 => {
    let var$2;
    ao_GLES20_$callClinit();
    if (ao_GLES20_gl === null)
        return $rt_s(13);
    var$2 = otji_JSWrapper_unwrap(ao_GLES20_obj(var$1));
    return var$2 === null ? $rt_s(13) : $rt_str(ao_GLES20_gl.getProgramInfoLog(var$2));
},
ao_GLES20_glGetAttribLocation = (var$1, var$2) => {
    let var$3, var$4;
    ao_GLES20_$callClinit();
    if (ao_GLES20_gl === null)
        return (-1);
    var$3 = otji_JSWrapper_unwrap(ao_GLES20_obj(var$1));
    var$1 = var$3 === null ? (-1) : ao_GLES20_gl.getAttribLocation(var$3, $rt_ustr(var$2));
    var$4 = jl_StringBuilder__init_();
    jl_StringBuilder_append0(jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append(var$4, $rt_s(16)), var$2), $rt_s(17)), var$1);
    ao_GLES20_trace(jl_StringBuilder_toString(var$4));
    return var$1;
},
ao_GLES20_glGetUniformLocation = (var$1, var$2) => {
    let var$3;
    ao_GLES20_$callClinit();
    if (ao_GLES20_gl === null)
        return (-1);
    var$3 = otji_JSWrapper_unwrap(ao_GLES20_obj(var$1));
    if (var$3 === null)
        return (-1);
    var$2 = ao_GLES20_gl.getUniformLocation(var$3, $rt_ustr(var$2));
    return var$2 === null ? (-1) : ao_GLES20_reg(otji_JSWrapper_wrap(var$2));
},
ao_GLES20_loc = var$1 => {
    ao_GLES20_$callClinit();
    return otji_JSWrapper_unwrap(ao_GLES20_obj(var$1));
},
ao_GLES20_glUniform4fv = (var$1, var$2, var$3, var$4) => {
    ao_GLES20_$callClinit();
    if (ao_GLES20_gl !== null)
        ao_GLES20_gl.uniform4fv(ao_GLES20_loc(var$1), ao_GLES20_slice(var$3, var$4, var$2 * 4 | 0));
};
let ao_GLES20_glUniformMatrix4fv = (var$1, var$2, var$3, var$4, var$5) => {
    ao_GLES20_$callClinit();
    if (ao_GLES20_gl !== null)
        ao_GLES20_gl.uniformMatrix4fv(ao_GLES20_loc(var$1), !!var$3, ao_GLES20_slice(var$4, var$5, var$2 * 16 | 0));
},
ao_GLES20_slice = (var$1, var$2, var$3) => {
    let var$4, var$5, var$6, var$7, var$8;
    ao_GLES20_$callClinit();
    var$4 = new Float32Array(var$3);
    var$5 = 0;
    while (var$5 < var$3) {
        a: {
            var$6 = var$2 + var$5 | 0;
            if (var$6 >= 0) {
                var$7 = var$1.data;
                if (var$6 < var$7.length) {
                    var$8 = var$7[var$6];
                    break a;
                }
            }
            var$8 = 0.0;
        }
        var$4[var$5] = var$8;
        var$5 = var$5 + 1 | 0;
    }
    return var$4;
},
ao_GLES20_glGenBuffers = (var$1, var$2, var$3) => {
    let var$4;
    ao_GLES20_$callClinit();
    if (ao_GLES20_gl !== null && var$2 !== null) {
        var$4 = 0;
        while (var$4 < var$1) {
            var$2.data[var$3 + var$4 | 0] = ao_GLES20_reg(otji_JSWrapper_wrap(ao_GLES20_gl.createBuffer()));
            var$4 = var$4 + 1 | 0;
        }
        return;
    }
},
ao_GLES20_glBindBuffer = (var$1, var$2) => {
    let var$3, var$4;
    ao_GLES20_$callClinit();
    var$3 = jl_StringBuilder__init_();
    jl_StringBuilder_append1(jl_StringBuilder_append0(jl_StringBuilder_append(jl_StringBuilder_append0(jl_StringBuilder_append(var$3, $rt_s(18)), var$1), $rt_s(19)), var$2), 41);
    ao_GLES20_trace(jl_StringBuilder_toString(var$3));
    if (ao_GLES20_gl === null)
        return;
    var$3 = ao_GLES20_gl;
    var$4 = !var$2 ? null : otji_JSWrapper_unwrap(ao_GLES20_obj(var$2));
    var$3.bindBuffer(var$1, var$4);
},
ao_GLES20_glBufferData = (var$1, var$2, var$3, var$4) => {
    let var$5, var$6;
    ao_GLES20_$callClinit();
    if (ao_GLES20_gl === null)
        return;
    var$5 = ao_GLES20_toView(var$3);
    var$6 = var$5 === null ? 0 : 1;
    var$3 = jl_StringBuilder__init_();
    jl_StringBuilder_append1(jl_StringBuilder_append3(jl_StringBuilder_append(jl_StringBuilder_append0(jl_StringBuilder_append(jl_StringBuilder_append0(jl_StringBuilder_append(var$3, $rt_s(20)), var$1), $rt_s(21)), var$2), $rt_s(22)), var$6), 41);
    ao_GLES20_trace(jl_StringBuilder_toString(var$3));
    if (var$5 !== null)
        ao_GLES20_gl.bufferData(var$1, var$5, var$4);
    else
        ao_GLES20_gl.bufferData(var$1, var$2, var$4);
},
ao_GLES20_checkErr = var$1 => {
    let var$2, var$3;
    ao_GLES20_$callClinit();
    if (ao_GLES20_sink !== null && ao_GLES20_gl !== null) {
        var$2 = ao_GLES20_gl.getError();
        if (var$2) {
            var$3 = jl_StringBuilder__init_();
            jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append0(jl_StringBuilder_append(var$3, $rt_s(23)), var$2), $rt_s(24)), var$1);
            ao_GLES20_trace(jl_StringBuilder_toString(var$3));
        }
        return;
    }
},
ao_GLES20_glEnableVertexAttribArray = var$1 => {
    let var$2;
    ao_GLES20_$callClinit();
    var$2 = jl_StringBuilder__init_();
    jl_StringBuilder_append1(jl_StringBuilder_append0(jl_StringBuilder_append(var$2, $rt_s(25)), var$1), 41);
    ao_GLES20_trace(jl_StringBuilder_toString(var$2));
    if (ao_GLES20_gl !== null)
        ao_GLES20_gl.enableVertexAttribArray(var$1);
},
ao_GLES20_glDisableVertexAttribArray = var$1 => {
    ao_GLES20_$callClinit();
    if (ao_GLES20_gl !== null)
        ao_GLES20_gl.disableVertexAttribArray(var$1);
},
ao_GLES20_glVertexAttribPointer0 = (var$1, var$2, var$3, var$4, var$5, var$6) => {
    let var$7, var$8, var$9;
    ao_GLES20_$callClinit();
    if (ao_GLES20_gl === null)
        return;
    var$7 = ao_GLES20_toView(var$6);
    if (var$7 !== null) {
        var$6 = ao_GLES20_gl.createBuffer();
        ao_GLES20_gl.bindBuffer(34962, var$6);
        ao_GLES20_gl.bufferData(34962, var$7, 35048);
        var$6 = jl_StringBuilder__init_();
        jl_StringBuilder_append(jl_StringBuilder_append0(jl_StringBuilder_append(jl_StringBuilder_append0(jl_StringBuilder_append(jl_StringBuilder_append0(jl_StringBuilder_append(var$6, $rt_s(26)), var$1), $rt_s(21)), var$2), $rt_s(27)), var$5), $rt_s(28));
        ao_GLES20_trace(jl_StringBuilder_toString(var$6));
        ao_GLES20_gl.vertexAttribPointer(var$1, var$2, var$3, !!var$4, var$5, 0);
        ao_GLES20_checkErr($rt_s(29));
    } else {
        var$8 = var$6 !== null ? jn_Buffer_position(var$6) : 0;
        var$9 = jl_StringBuilder__init_();
        jl_StringBuilder_append1(jl_StringBuilder_append0(jl_StringBuilder_append(jl_StringBuilder_append0(jl_StringBuilder_append(jl_StringBuilder_append0(jl_StringBuilder_append(jl_StringBuilder_append0(jl_StringBuilder_append(var$9, $rt_s(30)), var$1), $rt_s(21)), var$2), $rt_s(27)), var$5), $rt_s(31)), var$8), 41);
        ao_GLES20_trace(jl_StringBuilder_toString(var$9));
        ao_GLES20_gl.vertexAttribPointer(var$1, var$2, var$3, !!var$4, var$5, var$8);
        ao_GLES20_checkErr($rt_s(32));
    }
},
ao_GLES20_glVertexAttribPointer = (var$1, var$2, var$3, var$4, var$5, var$6) => {
    ao_GLES20_$callClinit();
    if (ao_GLES20_gl !== null)
        ao_GLES20_gl.vertexAttribPointer(var$1, var$2, var$3, !!var$4, var$5, var$6);
},
ao_GLES20_glDrawArrays = (var$1, var$2, var$3) => {
    let var$4, var$5, var$6, var$7, var$8, var$9;
    ao_GLES20_$callClinit();
    if (ao_GLES20_gl !== null) {
        var$4 = ao_GLES20_gl;
        var$5 = ao_GLES20_toInt$js_body$_7(var$4.getParameter(35725));
        var$4 = ao_GLES20_gl;
        var$6 = ao_GLES20_toInt$js_body$_7(var$4.getParameter(34964));
        var$7 = ao_GLES20_gl;
        var$4 = jl_String_valueOf(otji_JSWrapper_wrap(var$7.getVertexAttrib(0, 34338)));
        var$8 = jl_StringBuilder__init_();
        jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append0(jl_StringBuilder_append(jl_StringBuilder_append0(jl_StringBuilder_append(jl_StringBuilder_append0(jl_StringBuilder_append(jl_StringBuilder_append0(jl_StringBuilder_append(jl_StringBuilder_append0(jl_StringBuilder_append(var$8, $rt_s(33)), var$1), $rt_s(34)), var$2), $rt_s(35)), var$3), $rt_s(36)), var$5), $rt_s(37)), var$6), $rt_s(38)), var$4);
        var$9 = jl_StringBuilder_toString(var$8);
        ao_GLES20_trace(var$9);
        ao_GLES20_gl.drawArrays(var$1, var$2, var$3);
        ao_GLES20_checkErr($rt_s(39));
    }
},
ao_GLES20_glDrawElements0 = (var$1, var$2, var$3, var$4) => {
    ao_GLES20_$callClinit();
    if (ao_GLES20_gl !== null)
        ao_GLES20_gl.drawElements(var$1, var$2, var$3, var$4 !== null ? jn_Buffer_position(var$4) : 0);
},
ao_GLES20_glDrawElements = (var$1, var$2, var$3, var$4) => {
    ao_GLES20_$callClinit();
    if (ao_GLES20_gl !== null)
        ao_GLES20_gl.drawElements(var$1, var$2, var$3, var$4);
},
ao_GLES20__clinit_ = () => {
    ao_GLES20_handles = ju_HashMap__init_();
    ao_GLES20_nextHandle = 1;
},
ao_GLES20_toInt$js_body$_7 = var$1 => {
    return var$1 === null || var$1 === undefined ? 0 : var$1 | 0;
},
jl_AbstractStringBuilder$Constants = $rt_classWithoutFields(),
jl_AbstractStringBuilder$Constants_longLogPowersOfTen = null,
jl_AbstractStringBuilder$Constants_doubleAnalysisResult = null,
jl_AbstractStringBuilder$Constants_floatAnalysisResult = null,
jl_AbstractStringBuilder$Constants_$callClinit = () => {
    jl_AbstractStringBuilder$Constants_$callClinit = $rt_eraseClinit(jl_AbstractStringBuilder$Constants);
    jl_AbstractStringBuilder$Constants__clinit_();
},
jl_AbstractStringBuilder$Constants__clinit_ = () => {
    jl_AbstractStringBuilder$Constants_longLogPowersOfTen = $rt_createLongArrayFromData([Long_fromInt(1), Long_fromInt(10), Long_fromInt(100), Long_fromInt(10000), Long_fromInt(100000000), Long_create(1874919424, 2328306)]);
    jl_AbstractStringBuilder$Constants_doubleAnalysisResult = otcit_DoubleAnalyzer$Result__init_();
    jl_AbstractStringBuilder$Constants_floatAnalysisResult = otcit_FloatAnalyzer$Result__init_0();
};
function jur_AbstractSet() {
    let a = this; jl_Object.call(a);
    a.$next1 = null;
    a.$isSecondPassVisited = 0;
    a.$index3 = null;
    a.$type = 0;
}
let jur_AbstractSet_counter = 0,
jur_AbstractSet_$callClinit = () => {
    jur_AbstractSet_$callClinit = $rt_eraseClinit(jur_AbstractSet);
    jur_AbstractSet__clinit_();
},
jur_AbstractSet__init_ = $this => {
    let var$1;
    jur_AbstractSet_$callClinit();
    jl_Object__init_($this);
    var$1 = jur_AbstractSet_counter;
    jur_AbstractSet_counter = var$1 + 1 | 0;
    $this.$index3 = jl_Integer_toString(var$1);
},
jur_AbstractSet__init_0 = ($this, $n) => {
    let var$2;
    jur_AbstractSet_$callClinit();
    jl_Object__init_($this);
    var$2 = jur_AbstractSet_counter;
    jur_AbstractSet_counter = var$2 + 1 | 0;
    $this.$index3 = jl_Integer_toString(var$2);
    $this.$next1 = $n;
},
jur_AbstractSet_find = ($this, $stringIndex, $testString, $matchResult) => {
    let $length;
    $length = $matchResult.$getRightBound();
    while (true) {
        if ($stringIndex > $length)
            return (-1);
        if ($this.$matches($stringIndex, $testString, $matchResult) >= 0)
            break;
        $stringIndex = $stringIndex + 1 | 0;
    }
    return $stringIndex;
},
jur_AbstractSet_findBack = ($this, $stringIndex, $startSearch, $testString, $matchResult) => {
    while (true) {
        if ($startSearch < $stringIndex)
            return (-1);
        if ($this.$matches($startSearch, $testString, $matchResult) >= 0)
            break;
        $startSearch = $startSearch + (-1) | 0;
    }
    return $startSearch;
},
jur_AbstractSet_setType = ($this, $type) => {
    $this.$type = $type;
},
jur_AbstractSet_getType = $this => {
    return $this.$type;
},
jur_AbstractSet_getNext = $this => {
    return $this.$next1;
},
jur_AbstractSet_setNext = ($this, $next) => {
    $this.$next1 = $next;
},
jur_AbstractSet_first = ($this, $set) => {
    return 1;
},
jur_AbstractSet_processBackRefReplacement = $this => {
    return null;
},
jur_AbstractSet_processSecondPass = $this => {
    let $set;
    $this.$isSecondPassVisited = 1;
    if ($this.$next1 !== null) {
        if (!$this.$next1.$isSecondPassVisited) {
            $set = $this.$next1.$processBackRefReplacement();
            if ($set !== null) {
                $this.$next1.$isSecondPassVisited = 1;
                $this.$next1 = $set;
            }
            $this.$next1.$processSecondPass();
        } else if ($this.$next1 instanceof jur_SingleSet && $this.$next1.$fSet.$isBackReferenced)
            $this.$next1 = $this.$next1.$next1;
    }
},
jur_AbstractSet__clinit_ = () => {
    jur_AbstractSet_counter = 1;
};
function jur_JointSet() {
    let a = this; jur_AbstractSet.call(a);
    a.$children = null;
    a.$fSet = null;
    a.$groupIndex = 0;
}
let jur_JointSet__init_ = $this => {
    jur_AbstractSet__init_($this);
},
jur_JointSet__init_2 = () => {
    let var_0 = new jur_JointSet();
    jur_JointSet__init_(var_0);
    return var_0;
},
jur_JointSet__init_0 = ($this, $children, $fSet) => {
    jur_AbstractSet__init_($this);
    $this.$children = $children;
    $this.$fSet = $fSet;
    $this.$groupIndex = $fSet.$getGroupIndex();
},
jur_JointSet__init_1 = (var_0, var_1) => {
    let var_2 = new jur_JointSet();
    jur_JointSet__init_0(var_2, var_0, var_1);
    return var_2;
},
jur_JointSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $start, $size, $i, $e, $shift;
    if ($this.$children === null)
        return (-1);
    $start = $matchResult.$getStart($this.$groupIndex);
    $matchResult.$setStart($this.$groupIndex, $stringIndex);
    $size = $this.$children.$size();
    $i = 0;
    while (true) {
        if ($i >= $size) {
            $matchResult.$setStart($this.$groupIndex, $start);
            return (-1);
        }
        $e = $this.$children.$get4($i);
        $shift = $e.$matches($stringIndex, $testString, $matchResult);
        if ($shift >= 0)
            break;
        $i = $i + 1 | 0;
    }
    return $shift;
},
jur_JointSet_setNext = ($this, $next) => {
    $this.$fSet.$setNext($next);
},
jur_JointSet_first = ($this, $set) => {
    let $i;
    a: {
        if ($this.$children !== null) {
            $i = $this.$children.$iterator();
            while (true) {
                if (!$i.$hasNext())
                    break a;
                if (!($i.$next()).$first($set))
                    continue;
                else
                    return 1;
            }
        }
    }
    return 0;
},
jur_JointSet_hasConsumed = ($this, $matchResult) => {
    let var$2, var$3;
    a: {
        if ($matchResult.$getEnd($this.$groupIndex) >= 0) {
            var$2 = $matchResult.$getStart($this.$groupIndex);
            var$3 = $this.$groupIndex;
            if (var$2 == $matchResult.$getEnd(var$3)) {
                var$2 = 0;
                break a;
            }
        }
        var$2 = 1;
    }
    return var$2;
},
jur_JointSet_processSecondPass = $this => {
    let $childrenSize, $i, $child, $set;
    $this.$isSecondPassVisited = 1;
    if ($this.$fSet !== null && !$this.$fSet.$isSecondPassVisited)
        $this.$fSet.$processSecondPass();
    a: {
        if ($this.$children !== null) {
            $childrenSize = $this.$children.$size();
            $i = 0;
            while (true) {
                if ($i >= $childrenSize)
                    break a;
                $child = $this.$children.$get4($i);
                $set = $child.$processBackRefReplacement();
                if ($set === null)
                    $set = $child;
                else {
                    $child.$isSecondPassVisited = 1;
                    $this.$children.$remove1($i);
                    $this.$children.$add2($i, $set);
                }
                if (!$set.$isSecondPassVisited)
                    $set.$processSecondPass();
                $i = $i + 1 | 0;
            }
        }
    }
    if ($this.$next1 !== null)
        jur_AbstractSet_processSecondPass($this);
};
function jur_SingleSet() {
    jur_JointSet.call(this);
    this.$kid = null;
}
let jur_SingleSet__init_ = ($this, $child, $fSet) => {
    jur_JointSet__init_($this);
    $this.$kid = $child;
    $this.$fSet = $fSet;
    $this.$groupIndex = $fSet.$getGroupIndex();
},
jur_SingleSet__init_0 = (var_0, var_1) => {
    let var_2 = new jur_SingleSet();
    jur_SingleSet__init_(var_2, var_0, var_1);
    return var_2;
},
jur_SingleSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $start, $shift;
    $start = $matchResult.$getStart($this.$groupIndex);
    $matchResult.$setStart($this.$groupIndex, $stringIndex);
    $shift = $this.$kid.$matches($stringIndex, $testString, $matchResult);
    if ($shift >= 0)
        return $shift;
    $matchResult.$setStart($this.$groupIndex, $start);
    return (-1);
},
jur_SingleSet_find = ($this, $stringIndex, $testString, $matchResult) => {
    let $res;
    $res = $this.$kid.$find($stringIndex, $testString, $matchResult);
    if ($res >= 0)
        $matchResult.$setStart($this.$groupIndex, $res);
    return $res;
},
jur_SingleSet_findBack = ($this, $stringIndex, $lastIndex, $testString, $matchResult) => {
    let $res;
    $res = $this.$kid.$findBack($stringIndex, $lastIndex, $testString, $matchResult);
    if ($res >= 0)
        $matchResult.$setStart($this.$groupIndex, $res);
    return $res;
},
jur_SingleSet_first = ($this, $set) => {
    return $this.$kid.$first($set);
},
jur_SingleSet_processBackRefReplacement = $this => {
    let $set;
    $set = jur_BackReferencedSingleSet__init_0($this);
    $this.$next1 = $set;
    return $set;
},
jur_SingleSet_processSecondPass = $this => {
    let $set;
    $this.$isSecondPassVisited = 1;
    if ($this.$fSet !== null && !$this.$fSet.$isSecondPassVisited)
        $this.$fSet.$processSecondPass();
    if ($this.$kid !== null && !$this.$kid.$isSecondPassVisited) {
        $set = $this.$kid.$processBackRefReplacement();
        if ($set !== null) {
            $this.$kid.$isSecondPassVisited = 1;
            $this.$kid = $set;
        }
        $this.$kid.$processSecondPass();
    }
},
jl_Runnable = $rt_classWithoutFields(0);
function jl_Thread() {
    let a = this; jl_Object.call(a);
    a.$uncaughtExceptionHandler = null;
    a.$id = Long_ZERO;
    a.$timeSliceStart = Long_ZERO;
    a.$finishedLock = null;
    a.$interruptHandler = null;
    a.$name3 = null;
    a.$alive = 0;
    a.$target = null;
}
let jl_Thread_mainThread = null,
jl_Thread_currentThread0 = null,
jl_Thread_nextId = 0,
jl_Thread_activeCount = 0,
jl_Thread_defaultUncaughtExceptionHandler = null,
jl_Thread_$callClinit = () => {
    jl_Thread_$callClinit = $rt_eraseClinit(jl_Thread);
    jl_Thread__clinit_();
},
jl_Thread__init_ = ($this, $name) => {
    jl_Thread_$callClinit();
    jl_Thread__init_0($this, null, $name);
},
jl_Thread__init_1 = var_0 => {
    let var_1 = new jl_Thread();
    jl_Thread__init_(var_1, var_0);
    return var_1;
},
jl_Thread__init_0 = ($this, $target, $name) => {
    let var$3;
    jl_Thread_$callClinit();
    jl_Object__init_($this);
    $this.$finishedLock = jl_Object__init_0();
    $this.$alive = 1;
    $this.$name3 = $name;
    $this.$target = $target;
    var$3 = jl_Thread_nextId;
    jl_Thread_nextId = var$3 + 1 | 0;
    $this.$id = Long_fromInt(var$3);
},
jl_Thread__init_2 = (var_0, var_1) => {
    let var_2 = new jl_Thread();
    jl_Thread__init_0(var_2, var_0, var_1);
    return var_2;
},
jl_Thread_setCurrentThread = $thread_0 => {
    jl_Thread_$callClinit();
    if (jl_Thread_currentThread0 !== $thread_0)
        jl_Thread_currentThread0 = $thread_0;
    jl_Thread_currentThread0.$timeSliceStart = jl_System_currentTimeMillis();
},
jl_Thread_currentThread = () => {
    jl_Thread_$callClinit();
    return jl_Thread_currentThread0;
},
jl_Thread_sleep = var$1 => {
    let $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        let $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$1 = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        jl_Thread_$callClinit();
        $ptr = 1;
    case 1:
        jl_Thread_sleep$_asyncCall_$(var$1);
        if ($rt_suspending()) {
            break main;
        }
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push(var$1, $ptr);
},
jl_Thread_sleep0 = ($millis, $callback) => {
    let $current, $handler, $intMillis;
    jl_Thread_$callClinit();
    $current = jl_Thread_currentThread();
    $handler = jl_Thread$SleepHandler__init_0($current, $callback);
    $intMillis = Long_ge($millis, Long_fromInt(2147483647)) ? 2147483647 : Long_lo($millis);
    $handler.$scheduleId = otp_Platform_schedule($handler, $intMillis);
    $current.$interruptHandler = $handler;
},
jl_Thread_getUncaughtExceptionHandler = $this => {
    if ($this.$uncaughtExceptionHandler !== null)
        return $this.$uncaughtExceptionHandler;
    jl_Thread_$callClinit();
    return jl_Thread_defaultUncaughtExceptionHandler;
},
jl_Thread_setUncaughtExceptionHandler = ($this, $uncaughtExceptionHandler) => {
    $this.$uncaughtExceptionHandler = $uncaughtExceptionHandler;
},
jl_Thread_getDefaultUncaughtExceptionHandler = () => {
    jl_Thread_$callClinit();
    return jl_Thread_defaultUncaughtExceptionHandler;
},
jl_Thread_setDefaultUncaughtExceptionHandler = $handler => {
    jl_Thread_$callClinit();
    jl_Thread_defaultUncaughtExceptionHandler = $handler;
},
jl_Thread__clinit_ = () => {
    jl_Thread_mainThread = jl_Thread__init_1($rt_s(40));
    jl_Thread_currentThread0 = jl_Thread_mainThread;
    jl_Thread_nextId = 1;
    jl_Thread_activeCount = 1;
    jl_Thread_defaultUncaughtExceptionHandler = jl_DefaultUncaughtExceptionHandler__init_0();
},
jl_Thread_sleep$_asyncCall_$ = var$1 => {
    let thread = $rt_requireNativeThread();
    let javaThread = $rt_getThread();
    if (thread.isResuming()) {
        thread.status = 0;
        let result = thread.attribute;
        if (result instanceof Error) {
            throw result;
        }
        return result;
    }
    let callback = function() {
    };
    callback.$complete = val => {
        thread.attribute = val;
        $rt_setThread(javaThread);
        thread.resume();
    };
    callback.$error = e => {
        thread.attribute = $rt_exception(e);
        $rt_setThread(javaThread);
        thread.resume();
    };
    callback = otpp_AsyncCallbackWrapper_create(callback);
    thread.suspend(() => {
        try {
            jl_Thread_sleep0(var$1, callback);
            ;
        } catch ($e){
            callback.$error($e);
        }
    });
    return null;
},
jur_AbstractCharClass$LazyAlpha = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyAlpha__init_ = $this => {
    jur_AbstractCharClass$LazyCharClass__init_($this);
},
jur_AbstractCharClass$LazyAlpha__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazyAlpha();
    jur_AbstractCharClass$LazyAlpha__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyAlpha_computeValue = $this => {
    return ((jur_CharClass__init_()).$add1(97, 122)).$add1(65, 90);
},
jur_BackReferencedSingleSet = $rt_classWithoutFields(jur_SingleSet),
jur_BackReferencedSingleSet__init_ = ($this, $node) => {
    jur_SingleSet__init_($this, $node.$kid, $node.$fSet);
},
jur_BackReferencedSingleSet__init_0 = var_0 => {
    let var_1 = new jur_BackReferencedSingleSet();
    jur_BackReferencedSingleSet__init_(var_1, var_0);
    return var_1;
},
jur_BackReferencedSingleSet_find = ($this, $startSearch, $testString, $matchResult) => {
    let $res, $lastIndex, $saveStart;
    $res = 0;
    $lastIndex = $matchResult.$getRightBound();
    a: {
        while (true) {
            if ($startSearch > $lastIndex) {
                $startSearch = $res;
                break a;
            }
            $saveStart = $matchResult.$getStart($this.$groupIndex);
            $matchResult.$setStart($this.$groupIndex, $startSearch);
            $res = $this.$kid.$matches($startSearch, $testString, $matchResult);
            if ($res >= 0)
                break;
            $matchResult.$setStart($this.$groupIndex, $saveStart);
            $startSearch = $startSearch + 1 | 0;
        }
    }
    return $startSearch;
},
jur_BackReferencedSingleSet_findBack = ($this, $stringIndex, $startSearch, $testString, $matchResult) => {
    let $res, $saveStart;
    $res = 0;
    a: {
        while (true) {
            if ($startSearch < $stringIndex) {
                $startSearch = $res;
                break a;
            }
            $saveStart = $matchResult.$getStart($this.$groupIndex);
            $matchResult.$setStart($this.$groupIndex, $startSearch);
            $res = $this.$kid.$matches($startSearch, $testString, $matchResult);
            if ($res >= 0)
                break;
            $matchResult.$setStart($this.$groupIndex, $saveStart);
            $startSearch = $startSearch + (-1) | 0;
        }
    }
    return $startSearch;
},
jur_BackReferencedSingleSet_processBackRefReplacement = $this => {
    return null;
},
ag_Paint$1 = $rt_classWithoutFields(),
ag_Paint$1_$SwitchMap$android$graphics$Paint$Cap = null,
ag_Paint$1_$SwitchMap$android$graphics$Paint$Join = null,
ag_Paint$1_$SwitchMap$android$graphics$Paint$Align = null,
ag_Paint$1_$callClinit = () => {
    ag_Paint$1_$callClinit = $rt_eraseClinit(ag_Paint$1);
    ag_Paint$1__clinit_();
},
ag_Paint$1__clinit_ = () => {
    ag_Paint$1_$SwitchMap$android$graphics$Paint$Align = $rt_createIntArray((ag_Paint$Align_values()).data.length);
    ag_Paint$1_$SwitchMap$android$graphics$Paint$Align.data[jl_Enum_ordinal(ag_Paint$Align_CENTER)] = 1;
    ag_Paint$1_$SwitchMap$android$graphics$Paint$Align.data[jl_Enum_ordinal(ag_Paint$Align_RIGHT)] = 2;
    ag_Paint$1_$SwitchMap$android$graphics$Paint$Join = $rt_createIntArray((ag_Paint$Join_values()).data.length);
    ag_Paint$1_$SwitchMap$android$graphics$Paint$Join.data[jl_Enum_ordinal(ag_Paint$Join_ROUND)] = 1;
    ag_Paint$1_$SwitchMap$android$graphics$Paint$Join.data[jl_Enum_ordinal(ag_Paint$Join_BEVEL)] = 2;
    ag_Paint$1_$SwitchMap$android$graphics$Paint$Cap = $rt_createIntArray((ag_Paint$Cap_values()).data.length);
    ag_Paint$1_$SwitchMap$android$graphics$Paint$Cap.data[jl_Enum_ordinal(ag_Paint$Cap_ROUND)] = 1;
    ag_Paint$1_$SwitchMap$android$graphics$Paint$Cap.data[jl_Enum_ordinal(ag_Paint$Cap_SQUARE)] = 2;
},
jur_AbstractCharClass$LazyWord = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyWord__init_ = $this => {
    jur_AbstractCharClass$LazyCharClass__init_($this);
},
jur_AbstractCharClass$LazyWord__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazyWord();
    jur_AbstractCharClass$LazyWord__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyWord_computeValue = $this => {
    return ((((jur_CharClass__init_()).$add1(97, 122)).$add1(65, 90)).$add1(48, 57)).$add0(95);
},
jur_AbstractCharClass$LazyNonWord = $rt_classWithoutFields(jur_AbstractCharClass$LazyWord),
jur_AbstractCharClass$LazyNonWord__init_ = $this => {
    jur_AbstractCharClass$LazyWord__init_($this);
},
jur_AbstractCharClass$LazyNonWord__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazyNonWord();
    jur_AbstractCharClass$LazyNonWord__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyNonWord_computeValue = $this => {
    let $chCl;
    $chCl = (jur_AbstractCharClass$LazyWord_computeValue($this)).$setNegative(1);
    $chCl.$mayContainSupplCodepoints0 = 1;
    return $chCl;
};
function jur_LeafSet() {
    jur_AbstractSet.call(this);
    this.$charCount0 = 0;
}
let jur_LeafSet__init_0 = ($this, $next) => {
    jur_AbstractSet__init_0($this, $next);
    $this.$charCount0 = 1;
    $this.$setType(1);
},
jur_LeafSet__init_ = $this => {
    jur_AbstractSet__init_($this);
    $this.$charCount0 = 1;
},
jur_LeafSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $shift;
    if (($stringIndex + $this.$charCount() | 0) > $matchResult.$getRightBound()) {
        $matchResult.$hitEnd = 1;
        return (-1);
    }
    $shift = $this.$accepts($stringIndex, $testString);
    if ($shift < 0)
        return (-1);
    return $this.$next1.$matches($stringIndex + $shift | 0, $testString, $matchResult);
},
jur_LeafSet_charCount = $this => {
    return $this.$charCount0;
},
jur_LeafSet_hasConsumed = ($this, $mr) => {
    return 1;
};
function jur_CISequenceSet() {
    jur_LeafSet.call(this);
    this.$string1 = null;
}
let jur_CISequenceSet__init_ = ($this, $substring) => {
    jur_LeafSet__init_($this);
    $this.$string1 = $substring.$toString();
    $this.$charCount0 = $substring.$length();
},
jur_CISequenceSet__init_0 = var_0 => {
    let var_1 = new jur_CISequenceSet();
    jur_CISequenceSet__init_(var_1, var_0);
    return var_1;
},
jur_CISequenceSet_accepts = ($this, $strIndex, $testString) => {
    let $i, var$4, var$5, var$6;
    $i = 0;
    while (true) {
        if ($i >= $this.$string1.$length())
            return $this.$string1.$length();
        var$4 = $this.$string1.$charAt($i);
        var$5 = $strIndex + $i | 0;
        if (var$4 != $testString.$charAt(var$5)) {
            var$6 = $this.$string1;
            if (jur_Pattern_getSupplement(var$6.$charAt($i)) != $testString.$charAt(var$5))
                break;
        }
        $i = $i + 1 | 0;
    }
    return (-1);
},
jl_CharSequence = $rt_classWithoutFields(0),
ju_Map = $rt_classWithoutFields(0),
ju_SequencedMap = $rt_classWithoutFields(0);
function jl_Throwable() {
    let a = this; jl_Object.call(a);
    a.$message = null;
    a.$cause = null;
    a.$suppressionEnabled = 0;
    a.$writableStackTrace = 0;
}
let jl_Throwable__init_0 = $this => {
    jl_Throwable_initNativeException($this);
    $this.$suppressionEnabled = 1;
    $this.$writableStackTrace = 1;
    $this.$fillInStackTrace();
},
jl_Throwable__init_ = () => {
    let var_0 = new jl_Throwable();
    jl_Throwable__init_0(var_0);
    return var_0;
},
jl_Throwable__init_1 = ($this, $message) => {
    jl_Throwable_initNativeException($this);
    $this.$suppressionEnabled = 1;
    $this.$writableStackTrace = 1;
    $this.$fillInStackTrace();
    $this.$message = $message;
},
jl_Throwable__init_2 = var_0 => {
    let var_1 = new jl_Throwable();
    jl_Throwable__init_1(var_1, var_0);
    return var_1;
},
jl_Throwable_fillInStackTrace = $this => {
    return $this;
},
jl_Throwable_initNativeException = $this => {
    $rt_fillNativeException($this);
},
jl_Throwable_getMessage = $this => {
    return $this.$message;
},
jl_Throwable_getLocalizedMessage = $this => {
    return $this.$getMessage();
},
jl_Throwable_getCause = $this => {
    return $this.$cause === $this ? null : $this.$cause;
},
jl_Throwable_toString = $this => {
    let $message, var$2, var$3, var$4;
    $message = $this.$getLocalizedMessage();
    var$2 = jl_Class_getName(jl_Object_getClass($this));
    if ($message === null)
        var$3 = $rt_s(13);
    else {
        var$3 = jl_StringBuilder__init_();
        jl_StringBuilder_append(jl_StringBuilder_append(var$3, $rt_s(5)), $message);
        var$3 = jl_StringBuilder_toString(var$3);
    }
    var$4 = jl_StringBuilder__init_();
    jl_StringBuilder_append(jl_StringBuilder_append(var$4, var$2), var$3);
    return jl_StringBuilder_toString(var$4);
},
jl_Exception = $rt_classWithoutFields(jl_Throwable),
jl_Exception__init_ = $this => {
    jl_Throwable__init_0($this);
},
jl_Exception__init_1 = () => {
    let var_0 = new jl_Exception();
    jl_Exception__init_(var_0);
    return var_0;
},
jl_Exception__init_0 = ($this, $message) => {
    jl_Throwable__init_1($this, $message);
},
jl_Exception__init_2 = var_0 => {
    let var_1 = new jl_Exception();
    jl_Exception__init_0(var_1, var_0);
    return var_1;
},
jl_RuntimeException = $rt_classWithoutFields(jl_Exception),
jl_RuntimeException__init_ = $this => {
    jl_Exception__init_($this);
},
jl_RuntimeException__init_2 = () => {
    let var_0 = new jl_RuntimeException();
    jl_RuntimeException__init_(var_0);
    return var_0;
},
jl_RuntimeException__init_0 = ($this, $message) => {
    jl_Exception__init_0($this, $message);
},
jl_RuntimeException__init_1 = var_0 => {
    let var_1 = new jl_RuntimeException();
    jl_RuntimeException__init_0(var_1, var_0);
    return var_1;
},
jl_IndexOutOfBoundsException = $rt_classWithoutFields(jl_RuntimeException),
jl_IndexOutOfBoundsException__init_0 = $this => {
    jl_RuntimeException__init_($this);
},
jl_IndexOutOfBoundsException__init_ = () => {
    let var_0 = new jl_IndexOutOfBoundsException();
    jl_IndexOutOfBoundsException__init_0(var_0);
    return var_0;
},
jl_IndexOutOfBoundsException__init_2 = ($this, $message) => {
    jl_RuntimeException__init_0($this, $message);
},
jl_IndexOutOfBoundsException__init_1 = var_0 => {
    let var_1 = new jl_IndexOutOfBoundsException();
    jl_IndexOutOfBoundsException__init_2(var_1, var_0);
    return var_1;
},
jl_StringIndexOutOfBoundsException = $rt_classWithoutFields(jl_IndexOutOfBoundsException),
jl_StringIndexOutOfBoundsException__init_0 = $this => {
    jl_IndexOutOfBoundsException__init_0($this);
},
jl_StringIndexOutOfBoundsException__init_ = () => {
    let var_0 = new jl_StringIndexOutOfBoundsException();
    jl_StringIndexOutOfBoundsException__init_0(var_0);
    return var_0;
};
function ju_MissingResourceException() {
    let a = this; jl_RuntimeException.call(a);
    a.$className = null;
    a.$key0 = null;
}
let ju_MissingResourceException__init_ = ($this, $s, $className, $key) => {
    jl_RuntimeException__init_0($this, $s);
    $this.$className = $className;
    $this.$key0 = $key;
},
ju_MissingResourceException__init_0 = (var_0, var_1, var_2) => {
    let var_3 = new ju_MissingResourceException();
    ju_MissingResourceException__init_(var_3, var_0, var_1, var_2);
    return var_3;
};
function jur_CIBackReferenceSet() {
    let a = this; jur_JointSet.call(a);
    a.$referencedGroup = 0;
    a.$consCounter1 = 0;
}
let jur_CIBackReferenceSet__init_ = ($this, $groupIndex, $consCounter) => {
    jur_JointSet__init_($this);
    $this.$referencedGroup = $groupIndex;
    $this.$consCounter1 = $consCounter;
},
jur_CIBackReferenceSet__init_0 = (var_0, var_1) => {
    let var_2 = new jur_CIBackReferenceSet();
    jur_CIBackReferenceSet__init_(var_2, var_0, var_1);
    return var_2;
},
jur_CIBackReferenceSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $group, $i, var$6, var$7;
    $group = $this.$getString($matchResult);
    if ($group !== null && ($stringIndex + $group.$length() | 0) <= $matchResult.$getRightBound()) {
        $i = 0;
        while (true) {
            if ($i >= $group.$length()) {
                $matchResult.$setConsumed($this.$consCounter1, $group.$length());
                return $this.$next1.$matches($stringIndex + $group.$length() | 0, $testString, $matchResult);
            }
            var$6 = $group.$charAt($i);
            var$7 = $stringIndex + $i | 0;
            if (var$6 != $testString.$charAt(var$7) && jur_Pattern_getSupplement($group.$charAt($i)) != $testString.$charAt(var$7))
                break;
            $i = $i + 1 | 0;
        }
        return (-1);
    }
    return (-1);
},
jur_CIBackReferenceSet_setNext = ($this, $next) => {
    $this.$next1 = $next;
},
jur_CIBackReferenceSet_getString = ($this, $matchResult) => {
    let $res;
    $res = $matchResult.$getGroupNoCheck($this.$referencedGroup);
    return $res;
},
jur_CIBackReferenceSet_hasConsumed = ($this, $matchResult) => {
    let $res;
    $res = !$matchResult.$getConsumed($this.$consCounter1) ? 0 : 1;
    $matchResult.$setConsumed($this.$consCounter1, (-1));
    return $res;
},
jur_UCIBackReferenceSet = $rt_classWithoutFields(jur_CIBackReferenceSet),
jur_UCIBackReferenceSet__init_ = ($this, $groupIndex, $consCounter) => {
    jur_CIBackReferenceSet__init_($this, $groupIndex, $consCounter);
},
jur_UCIBackReferenceSet__init_0 = (var_0, var_1) => {
    let var_2 = new jur_UCIBackReferenceSet();
    jur_UCIBackReferenceSet__init_(var_2, var_0, var_1);
    return var_2;
},
jur_UCIBackReferenceSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $group, $i, var$6, var$7;
    $group = $this.$getString($matchResult);
    if ($group !== null && ($stringIndex + $group.$length() | 0) <= $matchResult.$getRightBound()) {
        $i = 0;
        while (true) {
            if ($i >= $group.$length()) {
                $matchResult.$setConsumed($this.$consCounter1, $group.$length());
                return $this.$next1.$matches($stringIndex + $group.$length() | 0, $testString, $matchResult);
            }
            var$6 = jl_Character_toLowerCase(jl_Character_toUpperCase($group.$charAt($i)));
            var$7 = $stringIndex + $i | 0;
            var$7 = jl_Character_toUpperCase($testString.$charAt(var$7));
            if (var$6 != jl_Character_toLowerCase(var$7))
                break;
            $i = $i + 1 | 0;
        }
        return (-1);
    }
    return (-1);
};
function jn_ByteOrder() {
    jl_Object.call(this);
    this.$name2 = null;
}
let jn_ByteOrder_BIG_ENDIAN = null,
jn_ByteOrder_LITTLE_ENDIAN = null,
jn_ByteOrder_nativeOrder0 = null,
jn_ByteOrder_$callClinit = () => {
    jn_ByteOrder_$callClinit = $rt_eraseClinit(jn_ByteOrder);
    jn_ByteOrder__clinit_();
},
jn_ByteOrder__init_0 = ($this, $name) => {
    jn_ByteOrder_$callClinit();
    jl_Object__init_($this);
    $this.$name2 = $name;
},
jn_ByteOrder__init_ = var_0 => {
    let var_1 = new jn_ByteOrder();
    jn_ByteOrder__init_0(var_1, var_0);
    return var_1;
},
jn_ByteOrder_nativeOrder = () => {
    let $buffer, $shortArray, $byteArray;
    jn_ByteOrder_$callClinit();
    if (jn_ByteOrder_nativeOrder0 === null) {
        $buffer = new ArrayBuffer(2);
        $shortArray = new Int16Array($buffer);
        $shortArray[0] = 1;
        $byteArray = new Int8Array($buffer);
        jn_ByteOrder_nativeOrder0 = $byteArray[0] ? jn_ByteOrder_LITTLE_ENDIAN : jn_ByteOrder_BIG_ENDIAN;
    }
    return jn_ByteOrder_nativeOrder0;
},
jn_ByteOrder__clinit_ = () => {
    jn_ByteOrder_BIG_ENDIAN = jn_ByteOrder__init_($rt_s(41));
    jn_ByteOrder_LITTLE_ENDIAN = jn_ByteOrder__init_($rt_s(42));
};
function jur_AbstractCharClass$LazyCategory() {
    let a = this; jur_AbstractCharClass$LazyCharClass.call(a);
    a.$category1 = 0;
    a.$mayContainSupplCodepoints1 = 0;
    a.$containsAllSurrogates0 = 0;
}
let jur_AbstractCharClass$LazyCategory__init_0 = ($this, $cat, $mayContainSupplCodepoints) => {
    jur_AbstractCharClass$LazyCharClass__init_($this);
    $this.$mayContainSupplCodepoints1 = $mayContainSupplCodepoints;
    $this.$category1 = $cat;
},
jur_AbstractCharClass$LazyCategory__init_ = (var_0, var_1) => {
    let var_2 = new jur_AbstractCharClass$LazyCategory();
    jur_AbstractCharClass$LazyCategory__init_0(var_2, var_0, var_1);
    return var_2;
},
jur_AbstractCharClass$LazyCategory__init_1 = ($this, $cat, $mayContainSupplCodepoints, $containsAllSurrogates) => {
    jur_AbstractCharClass$LazyCharClass__init_($this);
    $this.$containsAllSurrogates0 = $containsAllSurrogates;
    $this.$mayContainSupplCodepoints1 = $mayContainSupplCodepoints;
    $this.$category1 = $cat;
},
jur_AbstractCharClass$LazyCategory__init_2 = (var_0, var_1, var_2) => {
    let var_3 = new jur_AbstractCharClass$LazyCategory();
    jur_AbstractCharClass$LazyCategory__init_1(var_3, var_0, var_1, var_2);
    return var_3;
},
jur_AbstractCharClass$LazyCategory_computeValue = $this => {
    let $chCl;
    $chCl = jur_UnicodeCategory__init_0($this.$category1);
    if ($this.$containsAllSurrogates0)
        $chCl.$lowHighSurrogates.$set(0, 2048);
    $chCl.$mayContainSupplCodepoints0 = $this.$mayContainSupplCodepoints1;
    return $chCl;
};
function jur_QuantifierSet() {
    jur_AbstractSet.call(this);
    this.$innerSet = null;
}
let jur_QuantifierSet__init_ = ($this, $innerSet, $next, $type) => {
    jur_AbstractSet__init_0($this, $next);
    $this.$innerSet = $innerSet;
    $this.$setType($type);
},
jur_QuantifierSet_getInnerSet = $this => {
    return $this.$innerSet;
},
jur_QuantifierSet_first = ($this, $set) => {
    return !$this.$innerSet.$first($set) && !$this.$next1.$first($set) ? 0 : 1;
},
jur_QuantifierSet_hasConsumed = ($this, $mr) => {
    return 1;
},
jur_QuantifierSet_processSecondPass = $this => {
    let $set;
    $this.$isSecondPassVisited = 1;
    if ($this.$next1 !== null && !$this.$next1.$isSecondPassVisited) {
        $set = $this.$next1.$processBackRefReplacement();
        if ($set !== null) {
            $this.$next1.$isSecondPassVisited = 1;
            $this.$next1 = $set;
        }
        $this.$next1.$processSecondPass();
    }
    if ($this.$innerSet !== null) {
        if (!$this.$innerSet.$isSecondPassVisited) {
            $set = $this.$innerSet.$processBackRefReplacement();
            if ($set !== null) {
                $this.$innerSet.$isSecondPassVisited = 1;
                $this.$innerSet = $set;
            }
            $this.$innerSet.$processSecondPass();
        } else if ($this.$innerSet instanceof jur_SingleSet && $this.$innerSet.$fSet.$isBackReferenced)
            $this.$innerSet = $this.$innerSet.$next1;
    }
},
jur_DotAllQuantifierSet = $rt_classWithoutFields(jur_QuantifierSet),
jur_DotAllQuantifierSet__init_ = ($this, $innerSet, $next, $type) => {
    jur_QuantifierSet__init_($this, $innerSet, $next, $type);
},
jur_DotAllQuantifierSet__init_0 = (var_0, var_1, var_2) => {
    let var_3 = new jur_DotAllQuantifierSet();
    jur_DotAllQuantifierSet__init_(var_3, var_0, var_1, var_2);
    return var_3;
},
jur_DotAllQuantifierSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $strLength;
    $strLength = $matchResult.$getRightBound();
    if ($strLength > $stringIndex)
        return $this.$next1.$findBack($stringIndex, $strLength, $testString, $matchResult);
    return $this.$next1.$matches($stringIndex, $testString, $matchResult);
},
jur_DotAllQuantifierSet_find = ($this, $stringIndex, $testString, $matchResult) => {
    let $strLength;
    $strLength = $matchResult.$getRightBound();
    if ($this.$next1.$findBack($stringIndex, $strLength, $testString, $matchResult) >= 0)
        return $stringIndex;
    return (-1);
},
otji_JSWrapper$Helper = $rt_classWithoutFields(),
otji_JSWrapper$Helper_hashCodes = null,
otji_JSWrapper$Helper_wrappers = null,
otji_JSWrapper$Helper_stringWrappers = null,
otji_JSWrapper$Helper_numberWrappers = null,
otji_JSWrapper$Helper_undefinedWrapper = null,
otji_JSWrapper$Helper_stringFinalizationRegistry = null,
otji_JSWrapper$Helper_numberFinalizationRegistry = null,
otji_JSWrapper$Helper_$callClinit = () => {
    otji_JSWrapper$Helper_$callClinit = $rt_eraseClinit(otji_JSWrapper$Helper);
    otji_JSWrapper$Helper__clinit_();
},
otji_JSWrapper$Helper_lambda$static$1 = $token => {
    otji_JSWrapper$Helper_$callClinit();
    otji_JSWrapper$Helper_numberWrappers.delete($token);
},
otji_JSWrapper$Helper_lambda$static$0 = $token => {
    otji_JSWrapper$Helper_$callClinit();
    otji_JSWrapper$Helper_stringWrappers.delete($token);
},
otji_JSWrapper$Helper__clinit_ = () => {
    let var$1;
    otji_JSWrapper$Helper_hashCodes = new WeakMap();
    var$1 = !(typeof WeakRef !== 'undefined' ? 1 : 0) ? null : new WeakMap();
    otji_JSWrapper$Helper_wrappers = var$1;
    var$1 = !(typeof WeakRef !== 'undefined' ? 1 : 0) ? null : new Map();
    otji_JSWrapper$Helper_stringWrappers = var$1;
    var$1 = !(typeof WeakRef !== 'undefined' ? 1 : 0) ? null : new Map();
    otji_JSWrapper$Helper_numberWrappers = var$1;
    if (otji_JSWrapper$Helper_stringWrappers === null)
        var$1 = null;
    else {
        var$1 = otji_JSWrapper$Helper$_clinit_$lambda$_3_0__init_0();
        var$1 = new FinalizationRegistry(otji_JS_function(otji_JSWrapper_unwrap(var$1), "accept"));
    }
    otji_JSWrapper$Helper_stringFinalizationRegistry = var$1;
    if (otji_JSWrapper$Helper_numberWrappers === null)
        var$1 = null;
    else {
        var$1 = otji_JSWrapper$Helper$_clinit_$lambda$_3_1__init_0();
        var$1 = new FinalizationRegistry(otji_JS_function(otji_JSWrapper_unwrap(var$1), "accept"));
    }
    otji_JSWrapper$Helper_numberFinalizationRegistry = var$1;
},
ju_Comparator = $rt_classWithoutFields(0),
jl_String$_clinit_$lambda$_118_0 = $rt_classWithoutFields(),
jl_String$_clinit_$lambda$_118_0__init_ = var$0 => {
    jl_Object__init_(var$0);
},
jl_String$_clinit_$lambda$_118_0__init_0 = () => {
    let var_0 = new jl_String$_clinit_$lambda$_118_0();
    jl_String$_clinit_$lambda$_118_0__init_(var_0);
    return var_0;
};
function jur_FSet() {
    let a = this; jur_AbstractSet.call(a);
    a.$isBackReferenced = 0;
    a.$groupIndex0 = 0;
}
let jur_FSet_posFSet = null,
jur_FSet_$callClinit = () => {
    jur_FSet_$callClinit = $rt_eraseClinit(jur_FSet);
    jur_FSet__clinit_();
},
jur_FSet__init_ = ($this, $groupIndex) => {
    jur_FSet_$callClinit();
    jur_AbstractSet__init_($this);
    $this.$groupIndex0 = $groupIndex;
},
jur_FSet__init_0 = var_0 => {
    let var_1 = new jur_FSet();
    jur_FSet__init_(var_1, var_0);
    return var_1;
},
jur_FSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $end, $shift;
    $end = $matchResult.$getEnd($this.$groupIndex0);
    $matchResult.$setEnd($this.$groupIndex0, $stringIndex);
    $shift = $this.$next1.$matches($stringIndex, $testString, $matchResult);
    if ($shift < 0)
        $matchResult.$setEnd($this.$groupIndex0, $end);
    return $shift;
},
jur_FSet_getGroupIndex = $this => {
    return $this.$groupIndex0;
},
jur_FSet_hasConsumed = ($this, $mr) => {
    return 0;
},
jur_FSet__clinit_ = () => {
    jur_FSet_posFSet = jur_FSet$PossessiveFSet__init_0();
},
jur_BehindFSet = $rt_classWithoutFields(jur_FSet),
jur_BehindFSet__init_ = ($this, $groupIndex) => {
    jur_FSet__init_($this, $groupIndex);
},
jur_BehindFSet__init_0 = var_0 => {
    let var_1 = new jur_BehindFSet();
    jur_BehindFSet__init_(var_1, var_0);
    return var_1;
},
jur_BehindFSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $gr, $rightBound;
    $gr = $this.$getGroupIndex();
    $rightBound = $matchResult.$getConsumed($gr);
    if ($rightBound != $stringIndex)
        $stringIndex = (-1);
    return $stringIndex;
};
function ag_Paint() {
    let a = this; jl_Object.call(a);
    a.$color = 0;
    a.$alpha = 0;
    a.$style = null;
    a.$strokeWidth = 0.0;
    a.$textSize = 0.0;
    a.$align = null;
    a.$cap = null;
    a.$join = null;
    a.$antiAlias = 0;
    a.$typeface = null;
}
let ag_Paint__init_0 = var$0 => {
    jl_Object__init_(var$0);
    var$0.$color = (-16777216);
    var$0.$alpha = 255;
    ag_Paint$Style_$callClinit();
    var$0.$style = ag_Paint$Style_FILL;
    var$0.$strokeWidth = 1.0;
    var$0.$textSize = 12.0;
    ag_Paint$Align_$callClinit();
    var$0.$align = ag_Paint$Align_LEFT;
    ag_Paint$Cap_$callClinit();
    var$0.$cap = ag_Paint$Cap_BUTT;
    ag_Paint$Join_$callClinit();
    var$0.$join = ag_Paint$Join_MITER;
    var$0.$antiAlias = 1;
},
ag_Paint__init_ = () => {
    let var_0 = new ag_Paint();
    ag_Paint__init_0(var_0);
    return var_0;
},
ag_Paint_applyTo = (var$0, var$1) => {
    let var$2, var$3;
    var$2 = ag_Paint_alphaForPaint(var$0);
    var$1.globalAlpha = var$2;
    var$2 = ag_Canvas_cssColor(var$0.$color & 16777215 | (-16777216));
    var$3 = $rt_ustr(var$2);
    var$1.fillStyle = var$3;
    var$2 = $rt_ustr(var$2);
    var$1.strokeStyle = var$2;
    var$2 = jl_Math_max0(0.009999999776482582, var$0.$strokeWidth);
    var$1.lineWidth = var$2;
    var$2 = $rt_ustr(ag_Paint_capOf(var$0.$cap));
    var$1.lineCap = var$2;
    var$2 = $rt_ustr(ag_Paint_joinOf(var$0.$join));
    var$1.lineJoin = var$2;
    var$2 = $rt_ustr(ag_Paint_fontSpec(var$0));
    var$1.font = var$2;
    var$2 = $rt_ustr(ag_Paint_alignOf(var$0.$align));
    var$1.textAlign = var$2;
    var$2 = "alphabetic";
    var$1.textBaseline = var$2;
},
ag_Paint_alphaForPaint = var$0 => {
    let var$1;
    var$1 = (var$0.$color >>> 24 | 0) & 255;
    return var$1 / 255.0 * var$0.$alpha / 255.0;
},
ag_Paint_fontSpec = var$0 => {
    let var$1, var$2;
    if (!(var$0.$typeface !== null && var$0.$typeface.$isBold() ? 1 : 0)) {
        var$1 = var$0.$textSize;
        var$2 = jl_StringBuilder__init_();
        jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append2(var$2, var$1), $rt_s(43)), $rt_s(44));
        return jl_StringBuilder_toString(var$2);
    }
    var$1 = var$0.$textSize;
    var$2 = jl_StringBuilder__init_();
    jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append2(jl_StringBuilder_append(var$2, $rt_s(45)), var$1), $rt_s(43)), $rt_s(44));
    return jl_StringBuilder_toString(var$2);
},
ag_Paint_capOf = var$1 => {
    ag_Paint$1_$callClinit();
    switch (ag_Paint$1_$SwitchMap$android$graphics$Paint$Cap.data[jl_Enum_ordinal(var$1)]) {
        case 1:
            break;
        case 2:
            return $rt_s(46);
        default:
            return $rt_s(47);
    }
    return $rt_s(48);
},
ag_Paint_joinOf = var$1 => {
    ag_Paint$1_$callClinit();
    switch (ag_Paint$1_$SwitchMap$android$graphics$Paint$Join.data[jl_Enum_ordinal(var$1)]) {
        case 1:
            break;
        case 2:
            return $rt_s(49);
        default:
            return $rt_s(50);
    }
    return $rt_s(48);
},
ag_Paint_alignOf = var$1 => {
    ag_Paint$1_$callClinit();
    switch (ag_Paint$1_$SwitchMap$android$graphics$Paint$Align.data[jl_Enum_ordinal(var$1)]) {
        case 1:
            break;
        case 2:
            return $rt_s(51);
        default:
            return $rt_s(52);
    }
    return $rt_s(53);
},
ag_Paint_setColor = (var$0, var$1) => {
    var$0.$color = var$1;
    var$0.$alpha = 255;
},
ag_Paint_getStyle = var$0 => {
    return var$0.$style;
},
ag_Paint_setStyle = (var$0, var$1) => {
    var$0.$style = var$1;
},
ag_Paint_setStrokeWidth = (var$0, var$1) => {
    var$0.$strokeWidth = var$1;
},
ag_Paint_setTextSize = (var$0, var$1) => {
    var$0.$textSize = var$1;
},
ccrgu_aa = $rt_classWithoutFields(),
ccrgu_aa_a = null,
ccrgu_aa_b = null,
ccrgu_aa_c = null,
ccrgu_aa_d = null,
ccrgu_aa_e = null,
ccrgu_aa_f = null,
ccrgu_aa_g = null,
ccrgu_aa_h = null,
ccrgu_aa_i = null,
ccrgu_aa_j = null,
ccrgu_aa_$callClinit = () => {
    ccrgu_aa_$callClinit = $rt_eraseClinit(ccrgu_aa);
    ccrgu_aa__clinit_();
},
ccrgu_aa__clinit_ = () => {
    ccrgu_aa_a = $rt_createBooleanArray(0);
    ccrgu_aa_b = $rt_createByteArray(0);
    ccrgu_aa_c = $rt_createCharArray(0);
    ccrgu_aa_d = $rt_createDoubleArray(0);
    ccrgu_aa_e = $rt_createIntArray(0);
    ccrgu_aa_f = $rt_createArray(jl_Class, 0);
    ccrgu_aa_g = $rt_createArray(jl_Object, 0);
    ccrgu_aa_h = $rt_createArray(jl_String, 0);
    ccrgu_aa_i = $rt_createArray(jl_Throwable, 0);
    ccrgu_aa_j = $rt_createArray(jl_StackTraceElement, 0);
};
function ag_Path() {
    let a = this; jl_Object.call(a);
    a.$ops = null;
    a.$kinds = null;
    a.$fillType = null;
}
let ag_Path__init_ = var$0 => {
    jl_Object__init_(var$0);
    var$0.$ops = ju_ArrayList__init_();
    var$0.$kinds = ju_ArrayList__init_();
    ag_Path$FillType_$callClinit();
    var$0.$fillType = ag_Path$FillType_WINDING;
},
ag_Path__init_0 = () => {
    let var_0 = new ag_Path();
    ag_Path__init_(var_0);
    return var_0;
},
ag_Path_moveTo = (var$0, var$1, var$2) => {
    ag_Path_add(var$0, 0, var$1, var$2);
},
ag_Path_lineTo = (var$0, var$1, var$2) => {
    ag_Path_add(var$0, 1, var$1, var$2);
},
ag_Path_close = var$0 => {
    var$0.$kinds.$add(jl_Byte_valueOf(4));
    var$0.$ops.$add($rt_createFloatArray(0));
},
ag_Path_emit = (var$0, var$1) => {
    let var$2, var$3;
    var$1.beginPath();
    var$2 = 0;
    while (var$2 < var$0.$kinds.$size()) {
        a: {
            var$3 = var$0.$ops.$get4(var$2);
            switch ((var$0.$kinds.$get4(var$2)).$byteValue()) {
                case 0:
                    var$3 = var$3.data;
                    var$1.moveTo(var$3[0], var$3[1]);
                    break a;
                case 1:
                    var$3 = var$3.data;
                    var$1.lineTo(var$3[0], var$3[1]);
                    break a;
                case 2:
                    var$3 = var$3.data;
                    var$1.quadraticCurveTo(var$3[0], var$3[1], var$3[2], var$3[3]);
                    break a;
                case 3:
                    var$3 = var$3.data;
                    var$1.bezierCurveTo(var$3[0], var$3[1], var$3[2], var$3[3], var$3[4], var$3[5]);
                    break a;
                case 4:
                    break;
                default:
                    break a;
            }
            var$1.closePath();
        }
        var$2 = var$2 + 1 | 0;
    }
},
ag_Path_add = (var$0, var$1, var$2, var$3) => {
    var$0.$kinds.$add(jl_Byte_valueOf(var$1));
    var$0.$ops.$add($rt_createFloatArrayFromData([var$2, var$3]));
};
function otrfm_AbstractInMemoryVirtualFile() {
    let a = this; jl_Object.call(a);
    a.$name0 = null;
    a.$lastModified = Long_ZERO;
}
let otrfm_AbstractInMemoryVirtualFile__init_ = ($this, $name) => {
    jl_Object__init_($this);
    $this.$lastModified = jl_System_currentTimeMillis();
    $this.$name0 = $name;
};
function jur_LowHighSurrogateRangeSet() {
    let a = this; jur_JointSet.call(a);
    a.$surrChars = null;
    a.$alt0 = 0;
}
let jur_LowHighSurrogateRangeSet__init_ = ($this, $surrChars) => {
    jur_JointSet__init_($this);
    $this.$surrChars = $surrChars.$getInstance();
    $this.$alt0 = $surrChars.$alt;
},
jur_LowHighSurrogateRangeSet__init_0 = var_0 => {
    let var_1 = new jur_LowHighSurrogateRangeSet();
    jur_LowHighSurrogateRangeSet__init_(var_1, var_0);
    return var_1;
},
jur_LowHighSurrogateRangeSet_setNext = ($this, $next) => {
    $this.$next1 = $next;
},
jur_LowHighSurrogateRangeSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $startStr, $strLength, var$6, var$7, $ch, $low, $high;
    $startStr = $matchResult.$getLeftBound();
    $strLength = $matchResult.$getRightBound();
    var$6 = $stringIndex + 1 | 0;
    var$7 = $rt_compare(var$6, $strLength);
    if (var$7 > 0) {
        $matchResult.$hitEnd = 1;
        return (-1);
    }
    $ch = $testString.$charAt($stringIndex);
    if (!$this.$surrChars.$contains($ch))
        return (-1);
    if (jl_Character_isHighSurrogate($ch)) {
        if (var$7 < 0) {
            $low = $testString.$charAt(var$6);
            if (jl_Character_isLowSurrogate($low))
                return (-1);
        }
    } else if (jl_Character_isLowSurrogate($ch) && $stringIndex > $startStr) {
        $high = $testString.$charAt($stringIndex - 1 | 0);
        if (jl_Character_isHighSurrogate($high))
            return (-1);
    }
    return $this.$next1.$matches(var$6, $testString, $matchResult);
},
jur_GroupQuantifierSet = $rt_classWithoutFields(jur_QuantifierSet),
jur_GroupQuantifierSet__init_ = ($this, $innerSet, $next, $type) => {
    jur_QuantifierSet__init_($this, $innerSet, $next, $type);
},
jur_GroupQuantifierSet__init_0 = (var_0, var_1, var_2) => {
    let var_3 = new jur_GroupQuantifierSet();
    jur_GroupQuantifierSet__init_(var_3, var_0, var_1, var_2);
    return var_3;
},
jur_GroupQuantifierSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $nextIndex;
    if (!$this.$innerSet.$hasConsumed($matchResult))
        return $this.$next1.$matches($stringIndex, $testString, $matchResult);
    $nextIndex = $this.$innerSet.$matches($stringIndex, $testString, $matchResult);
    if ($nextIndex >= 0)
        return $nextIndex;
    return $this.$next1.$matches($stringIndex, $testString, $matchResult);
},
jur_ReluctantGroupQuantifierSet = $rt_classWithoutFields(jur_GroupQuantifierSet),
jur_ReluctantGroupQuantifierSet__init_ = ($this, $innerSet, $next, $type) => {
    jur_GroupQuantifierSet__init_($this, $innerSet, $next, $type);
},
jur_ReluctantGroupQuantifierSet__init_0 = (var_0, var_1, var_2) => {
    let var_3 = new jur_ReluctantGroupQuantifierSet();
    jur_ReluctantGroupQuantifierSet__init_(var_3, var_0, var_1, var_2);
    return var_3;
},
jur_ReluctantGroupQuantifierSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $res;
    if (!$this.$innerSet.$hasConsumed($matchResult))
        return $this.$next1.$matches($stringIndex, $testString, $matchResult);
    $res = $this.$next1.$matches($stringIndex, $testString, $matchResult);
    if ($res >= 0)
        return $res;
    return $this.$innerSet.$matches($stringIndex, $testString, $matchResult);
},
jl_ClassCastException = $rt_classWithoutFields(jl_RuntimeException),
ju_AbstractMap = $rt_classWithoutFields(),
ju_AbstractMap__init_ = $this => {
    jl_Object__init_($this);
},
ju_AbstractMap_put = ($this, $key, $value) => {
    $rt_throw(jl_UnsupportedOperationException__init_0());
},
jl_Cloneable = $rt_classWithoutFields(0);
function ju_HashMap() {
    let a = this; ju_AbstractMap.call(a);
    a.$elementCount = 0;
    a.$elementData = null;
    a.$modCount0 = 0;
    a.$loadFactor1 = 0.0;
    a.$threshold = 0;
}
let ju_HashMap_newElementArray = ($this, $s) => {
    return $rt_createArray(ju_HashMap$HashEntry, $s);
},
ju_HashMap__init_1 = $this => {
    ju_HashMap__init_0($this, 16);
},
ju_HashMap__init_ = () => {
    let var_0 = new ju_HashMap();
    ju_HashMap__init_1(var_0);
    return var_0;
},
ju_HashMap__init_0 = ($this, $capacity) => {
    ju_HashMap__init_2($this, $capacity, 0.75);
},
ju_HashMap__init_3 = var_0 => {
    let var_1 = new ju_HashMap();
    ju_HashMap__init_0(var_1, var_0);
    return var_1;
},
ju_HashMap_calculateCapacity = $x => {
    let var$2, var$3;
    if ($x >= 1073741824)
        return 1073741824;
    if (!$x)
        return 16;
    var$2 = $x - 1 | 0;
    var$3 = var$2 | var$2 >> 1;
    var$3 = var$3 | var$3 >> 2;
    var$3 = var$3 | var$3 >> 4;
    var$3 = var$3 | var$3 >> 8;
    var$3 = var$3 | var$3 >> 16;
    return var$3 + 1 | 0;
},
ju_HashMap__init_2 = ($this, $capacity, $loadFactor) => {
    let var$3;
    ju_AbstractMap__init_($this);
    if ($capacity >= 0 && $loadFactor > 0.0) {
        var$3 = ju_HashMap_calculateCapacity($capacity);
        $this.$elementCount = 0;
        $this.$elementData = $this.$newElementArray(var$3);
        $this.$loadFactor1 = $loadFactor;
        ju_HashMap_computeThreshold($this);
        return;
    }
    $rt_throw(jl_IllegalArgumentException__init_());
},
ju_HashMap__init_4 = (var_0, var_1) => {
    let var_2 = new ju_HashMap();
    ju_HashMap__init_2(var_2, var_0, var_1);
    return var_2;
},
ju_HashMap_computeThreshold = $this => {
    $this.$threshold = $this.$elementData.data.length * $this.$loadFactor1 | 0;
},
ju_HashMap_containsKey = ($this, $key) => {
    let $m;
    $m = ju_HashMap_entryByKey($this, $key);
    return $m === null ? 0 : 1;
},
ju_HashMap_get = ($this, $key) => {
    let $m;
    $m = ju_HashMap_entryByKey($this, $key);
    if ($m === null)
        return null;
    return $m.$value;
},
ju_HashMap_entryByKey = ($this, $key) => {
    let $m, $hash, $index;
    if ($key === null)
        $m = ju_HashMap_findNullKeyEntry($this);
    else {
        $hash = $key.$hashCode0();
        $index = $hash & ($this.$elementData.data.length - 1 | 0);
        $m = ju_HashMap_findNonNullKeyEntry($this, $key, $index, $hash);
    }
    return $m;
},
ju_HashMap_findNonNullKeyEntry = ($this, $key, $index, $keyHash) => {
    let $m;
    $m = $this.$elementData.data[$index];
    while ($m !== null && !($m.$origKeyHash == $keyHash && ju_HashMap_areEqualKeys($key, $m.$key))) {
        $m = $m.$next2;
    }
    return $m;
},
ju_HashMap_findNullKeyEntry = $this => {
    let $m;
    $m = $this.$elementData.data[0];
    while ($m !== null && $m.$key !== null) {
        $m = $m.$next2;
    }
    return $m;
},
ju_HashMap_put = ($this, $key, $value) => {
    return ju_HashMap_putImpl($this, $key, $value);
},
ju_HashMap_putImpl = ($this, $key, $value) => {
    let $entry, var$4, $hash, $index, $result;
    if ($key === null) {
        $entry = ju_HashMap_findNullKeyEntry($this);
        if ($entry === null) {
            $this.$modCount0 = $this.$modCount0 + 1 | 0;
            $entry = ju_HashMap_createHashedEntry($this, null, 0, 0);
            var$4 = $this.$elementCount + 1 | 0;
            $this.$elementCount = var$4;
            if (var$4 > $this.$threshold)
                $this.$rehash();
        }
    } else {
        $hash = $key.$hashCode0();
        $index = $hash & ($this.$elementData.data.length - 1 | 0);
        $entry = ju_HashMap_findNonNullKeyEntry($this, $key, $index, $hash);
        if ($entry === null) {
            $this.$modCount0 = $this.$modCount0 + 1 | 0;
            $entry = ju_HashMap_createHashedEntry($this, $key, $index, $hash);
            var$4 = $this.$elementCount + 1 | 0;
            $this.$elementCount = var$4;
            if (var$4 > $this.$threshold)
                $this.$rehash();
        }
    }
    $result = $entry.$value;
    $entry.$value = $value;
    return $result;
},
ju_HashMap_createHashedEntry = ($this, $key, $index, $hash) => {
    let $entry;
    $entry = ju_HashMap$HashEntry__init_0($key, $hash);
    $entry.$next2 = $this.$elementData.data[$index];
    $this.$elementData.data[$index] = $entry;
    return $entry;
},
ju_HashMap_rehash0 = ($this, $capacity) => {
    let $length, $newData, $i, $entry, var$6, $index, $next;
    $length = ju_HashMap_calculateCapacity(!$capacity ? 1 : $capacity << 1);
    $newData = $this.$newElementArray($length);
    $i = 0;
    while ($i < $this.$elementData.data.length) {
        $entry = $this.$elementData.data[$i];
        $this.$elementData.data[$i] = null;
        while ($entry !== null) {
            var$6 = $newData.data;
            $index = $entry.$origKeyHash & ($length - 1 | 0);
            $next = $entry.$next2;
            $entry.$next2 = var$6[$index];
            var$6[$index] = $entry;
            $entry = $next;
        }
        $i = $i + 1 | 0;
    }
    $this.$elementData = $newData;
    ju_HashMap_computeThreshold($this);
},
ju_HashMap_rehash = $this => {
    $this.$rehash0($this.$elementData.data.length);
},
ju_HashMap_remove = ($this, $key) => {
    let $entry;
    $entry = ju_HashMap_removeByKey($this, $key);
    if ($entry === null)
        return null;
    return $entry.$value;
},
ju_HashMap_removeEntry = ($this, $entry) => {
    let $index, $m;
    $index = $entry.$origKeyHash & ($this.$elementData.data.length - 1 | 0);
    $m = $this.$elementData.data[$index];
    if ($m === $entry)
        $this.$elementData.data[$index] = $entry.$next2;
    else {
        while ($m.$next2 !== $entry) {
            $m = $m.$next2;
        }
        $m.$next2 = $entry.$next2;
    }
    $this.$modCount0 = $this.$modCount0 + 1 | 0;
    $this.$elementCount = $this.$elementCount - 1 | 0;
},
ju_HashMap_removeByKey = ($this, $key) => {
    let $index, $last, $entry, $entry_0, $hash;
    a: {
        $index = 0;
        $last = null;
        if ($key === null) {
            $entry = $this.$elementData.data[0];
            while ($entry !== null) {
                if ($entry.$key === null)
                    break a;
                $entry_0 = $entry.$next2;
                $last = $entry;
                $entry = $entry_0;
            }
        } else {
            $hash = $key.$hashCode0();
            $index = $hash & ($this.$elementData.data.length - 1 | 0);
            $entry = $this.$elementData.data[$index];
            while ($entry !== null && !($entry.$origKeyHash == $hash && ju_HashMap_areEqualKeys($key, $entry.$key))) {
                $entry_0 = $entry.$next2;
                $last = $entry;
                $entry = $entry_0;
            }
        }
    }
    if ($entry === null)
        return null;
    if ($last !== null)
        $last.$next2 = $entry.$next2;
    else
        $this.$elementData.data[$index] = $entry.$next2;
    $this.$modCount0 = $this.$modCount0 + 1 | 0;
    $this.$elementCount = $this.$elementCount - 1 | 0;
    return $entry;
},
ju_HashMap_size = $this => {
    return $this.$elementCount;
},
ju_HashMap_areEqualKeys = ($key1, $key2) => {
    return $key1 !== $key2 && !$key1.$equals($key2) ? 0 : 1;
};
function ju_LinkedHashMap() {
    let a = this; ju_HashMap.call(a);
    a.$accessOrder = 0;
    a.$head = null;
    a.$tail = null;
}
let ju_LinkedHashMap__init_ = $this => {
    ju_HashMap__init_1($this);
    $this.$accessOrder = 0;
    $this.$head = null;
},
ju_LinkedHashMap__init_0 = () => {
    let var_0 = new ju_LinkedHashMap();
    ju_LinkedHashMap__init_(var_0);
    return var_0;
},
ju_LinkedHashMap_newElementArray = ($this, $s) => {
    return $rt_createArray(ju_LinkedHashMap$LinkedHashMapEntry, $s);
},
ju_LinkedHashMap_createHashedEntry = ($this, $key, $index, $hash, $first) => {
    let $entry;
    $entry = ju_LinkedHashMap$LinkedHashMapEntry__init_0($key, $hash);
    $entry.$next2 = $this.$elementData.data[$index];
    $this.$elementData.data[$index] = $entry;
    if (!$first) {
        if ($this.$tail === null)
            $this.$head = $entry;
        else
            $this.$tail.$chainForward = $entry;
        $entry.$chainBackward = $this.$tail;
        $this.$tail = $entry;
    } else {
        if ($this.$head === null)
            $this.$tail = $entry;
        else
            $this.$head.$chainBackward = $entry;
        $entry.$chainForward = $this.$head;
        $this.$head = $entry;
    }
    return $entry;
},
ju_LinkedHashMap_put = ($this, $key, $value) => {
    let $oldSize, $existing;
    $oldSize = $this.$size();
    $existing = $this.$putImpl0($key, $value, 0, $this.$accessOrder);
    if ($this.$size() != $oldSize && $this.$removeEldestEntry($this.$head))
        $this.$removeLinkedEntry($this.$head);
    return $existing;
},
ju_LinkedHashMap_putImpl = ($this, $key, $value, $first, $forceMotion) => {
    let $hash, var$6, $index, $entry, var$9, $existing;
    if (!$this.$elementCount) {
        $this.$head = null;
        $this.$tail = null;
    }
    $hash = ju_Objects_hashCode($key);
    var$6 = $hash & 2147483647;
    $index = var$6 % $this.$elementData.data.length | 0;
    $entry = $key === null ? ju_HashMap_findNullKeyEntry($this) : ju_HashMap_findNonNullKeyEntry($this, $key, $index, $hash);
    if ($entry === null) {
        $this.$modCount0 = $this.$modCount0 + 1 | 0;
        var$9 = $this.$elementCount + 1 | 0;
        $this.$elementCount = var$9;
        if (var$9 > $this.$threshold) {
            $this.$rehash();
            $index = var$6 % $this.$elementData.data.length | 0;
        }
        $entry = ju_LinkedHashMap_createHashedEntry($this, $key, $index, $hash, $first);
    } else if ($forceMotion)
        ju_LinkedHashMap_linkEntry($this, $entry, $first);
    $existing = $entry.$value;
    $entry.$value = $value;
    return $existing;
},
ju_LinkedHashMap_linkEntry = ($this, $entry, $first) => {
    let $n, $p;
    if (!$first) {
        $n = $entry.$chainForward;
        if ($n === null)
            return;
        $p = $entry.$chainBackward;
        if ($p === null)
            $this.$head = $n;
        else
            $p.$chainForward = $n;
        $n.$chainBackward = $p;
        if ($this.$tail !== null)
            $this.$tail.$chainForward = $entry;
        $entry.$chainBackward = $this.$tail;
        $entry.$chainForward = null;
        $this.$tail = $entry;
    } else {
        $p = $entry.$chainBackward;
        if ($p === null)
            return;
        $n = $entry.$chainForward;
        if ($n === null)
            $this.$tail = $p;
        else
            $n.$chainBackward = $p;
        $p.$chainForward = $n;
        if ($this.$head !== null)
            $this.$head.$chainBackward = $entry;
        $entry.$chainForward = $this.$head;
        $entry.$chainBackward = null;
        $this.$head = $entry;
    }
},
ju_LinkedHashMap_removeLinkedEntry = ($this, $entry) => {
    ju_HashMap_removeEntry($this, $entry);
    ju_LinkedHashMap_unlinkEntry($this, $entry);
},
ju_LinkedHashMap_unlinkEntry = ($this, $entry) => {
    let $p, $n;
    $p = $entry.$chainBackward;
    $n = $entry.$chainForward;
    if ($p !== null) {
        $p.$chainForward = $n;
        if ($n === null)
            $this.$tail = $p;
        else
            $n.$chainBackward = $p;
    } else {
        $this.$head = $n;
        if ($n === null)
            $this.$tail = null;
        else
            $n.$chainBackward = null;
    }
},
ju_LinkedHashMap_removeEldestEntry = ($this, $eldest) => {
    return 0;
},
jur_PosPlusGroupQuantifierSet = $rt_classWithoutFields(jur_GroupQuantifierSet),
jur_PosPlusGroupQuantifierSet__init_ = ($this, $innerSet, $next, $type) => {
    jur_GroupQuantifierSet__init_($this, $innerSet, $next, $type);
    jur_FSet_$callClinit();
    $innerSet.$setNext(jur_FSet_posFSet);
},
jur_PosPlusGroupQuantifierSet__init_0 = (var_0, var_1, var_2) => {
    let var_3 = new jur_PosPlusGroupQuantifierSet();
    jur_PosPlusGroupQuantifierSet__init_(var_3, var_0, var_1, var_2);
    return var_3;
},
jur_PosPlusGroupQuantifierSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $nextIndex, var$5;
    $nextIndex = $this.$innerSet.$matches($stringIndex, $testString, $matchResult);
    if ($nextIndex < 0)
        return (-1);
    if ($nextIndex > $stringIndex) {
        while (true) {
            var$5 = $this.$innerSet.$matches($nextIndex, $testString, $matchResult);
            if (var$5 <= $nextIndex)
                break;
            $nextIndex = var$5;
        }
        $stringIndex = $nextIndex;
    }
    return $this.$next1.$matches($stringIndex, $testString, $matchResult);
};
function jl_AbstractStringBuilder() {
    let a = this; jl_Object.call(a);
    a.$buffer = null;
    a.$length0 = 0;
}
let jl_AbstractStringBuilder__init_0 = $this => {
    jl_AbstractStringBuilder__init_($this, 16);
},
jl_AbstractStringBuilder__init_6 = () => {
    let var_0 = new jl_AbstractStringBuilder();
    jl_AbstractStringBuilder__init_0(var_0);
    return var_0;
},
jl_AbstractStringBuilder__init_ = ($this, $capacity) => {
    jl_Object__init_($this);
    $this.$buffer = $rt_createCharArray($capacity);
},
jl_AbstractStringBuilder__init_3 = var_0 => {
    let var_1 = new jl_AbstractStringBuilder();
    jl_AbstractStringBuilder__init_(var_1, var_0);
    return var_1;
},
jl_AbstractStringBuilder__init_2 = ($this, $value) => {
    jl_AbstractStringBuilder__init_1($this, $value);
},
jl_AbstractStringBuilder__init_5 = var_0 => {
    let var_1 = new jl_AbstractStringBuilder();
    jl_AbstractStringBuilder__init_2(var_1, var_0);
    return var_1;
},
jl_AbstractStringBuilder__init_1 = ($this, $value) => {
    let $i;
    jl_Object__init_($this);
    $this.$buffer = $rt_createCharArray($value.$length());
    $i = 0;
    while ($i < $this.$buffer.data.length) {
        $this.$buffer.data[$i] = $value.$charAt($i);
        $i = $i + 1 | 0;
    }
    $this.$length0 = $value.$length();
},
jl_AbstractStringBuilder__init_4 = var_0 => {
    let var_1 = new jl_AbstractStringBuilder();
    jl_AbstractStringBuilder__init_1(var_1, var_0);
    return var_1;
},
jl_AbstractStringBuilder_append8 = ($this, $obj) => {
    return $this.$insert($this.$length0, $obj);
},
jl_AbstractStringBuilder_append = ($this, $string) => {
    return $this.$insert0($this.$length0, $string);
},
jl_AbstractStringBuilder_insert0 = ($this, $index, $string) => {
    let $i, var$4, var$5;
    if ($index >= 0 && $index <= $this.$length0) {
        if ($string === null)
            $string = $rt_s(54);
        else if ($string.$isEmpty())
            return $this;
        $this.$ensureCapacity($this.$length0 + $string.$length() | 0);
        $i = $this.$length0 - 1 | 0;
        while ($i >= $index) {
            $this.$buffer.data[$i + $string.$length() | 0] = $this.$buffer.data[$i];
            $i = $i + (-1) | 0;
        }
        $this.$length0 = $this.$length0 + $string.$length() | 0;
        $i = 0;
        while ($i < $string.$length()) {
            var$4 = $this.$buffer.data;
            var$5 = $index + 1 | 0;
            var$4[$index] = $string.$charAt($i);
            $i = $i + 1 | 0;
            $index = var$5;
        }
        return $this;
    }
    $rt_throw(jl_StringIndexOutOfBoundsException__init_());
},
jl_AbstractStringBuilder_append3 = ($this, $value) => {
    return $this.$append1($value, 10);
},
jl_AbstractStringBuilder_append9 = ($this, $value, $radix) => {
    return $this.$insert1($this.$length0, $value, $radix);
},
jl_AbstractStringBuilder_insert8 = ($this, $target, $value, $radix) => {
    let $positive, var$5, var$6, $pos, $sz, $posLimit, var$10, var$11;
    $positive = 1;
    if ($value < 0) {
        $positive = 0;
        $value =  -$value | 0;
    }
    a: {
        if ($rt_ucmp($value, $radix) < 0) {
            if ($positive)
                jl_AbstractStringBuilder_insertSpace($this, $target, $target + 1 | 0);
            else {
                jl_AbstractStringBuilder_insertSpace($this, $target, $target + 2 | 0);
                var$5 = $this.$buffer.data;
                var$6 = $target + 1 | 0;
                var$5[$target] = 45;
                $target = var$6;
            }
            $this.$buffer.data[$target] = jl_Character_forDigit($value, $radix);
        } else {
            $pos = 1;
            $sz = 1;
            $posLimit = $rt_udiv((-1), $radix);
            b: {
                while (true) {
                    var$10 = $rt_imul($pos, $radix);
                    if ($rt_ucmp(var$10, $value) > 0) {
                        var$10 = $pos;
                        break b;
                    }
                    $sz = $sz + 1 | 0;
                    if ($rt_ucmp(var$10, $posLimit) > 0)
                        break;
                    $pos = var$10;
                }
            }
            if (!$positive)
                $sz = $sz + 1 | 0;
            jl_AbstractStringBuilder_insertSpace($this, $target, $target + $sz | 0);
            if ($positive)
                var$11 = $target;
            else {
                var$5 = $this.$buffer.data;
                var$11 = $target + 1 | 0;
                var$5[$target] = 45;
            }
            while (true) {
                if (!var$10)
                    break a;
                var$5 = $this.$buffer.data;
                var$6 = var$11 + 1 | 0;
                var$5[var$11] = jl_Character_forDigit($rt_udiv($value, var$10), $radix);
                $value = $rt_umod($value, var$10);
                var$10 = $rt_udiv(var$10, $radix);
                var$11 = var$6;
            }
        }
    }
    return $this;
},
jl_AbstractStringBuilder_append7 = ($this, $value) => {
    return $this.$insert2($this.$length0, $value);
},
jl_AbstractStringBuilder_insert6 = ($this, $target, $value) => {
    return $this.$insert3($target, $value, 10);
},
jl_AbstractStringBuilder_insert7 = ($this, $target, $value, $radix) => {
    let $positive, var$5, var$6, var$7, $sz, $pos, $posLimit, var$11, var$12;
    $positive = 1;
    if (Long_lt($value, Long_ZERO)) {
        $positive = 0;
        $value = Long_neg($value);
    }
    a: {
        var$5 = Long_fromInt($radix);
        if (jl_Long_compareUnsigned($value, var$5) < 0) {
            if ($positive)
                jl_AbstractStringBuilder_insertSpace($this, $target, $target + 1 | 0);
            else {
                jl_AbstractStringBuilder_insertSpace($this, $target, $target + 2 | 0);
                var$6 = $this.$buffer.data;
                var$7 = $target + 1 | 0;
                var$6[$target] = 45;
                $target = var$7;
            }
            $this.$buffer.data[$target] = jl_Character_forDigit(Long_lo($value), $radix);
        } else {
            $sz = 1;
            $pos = Long_fromInt(1);
            $posLimit = jl_Long_divideUnsigned(Long_fromInt(-1), var$5);
            b: {
                while (true) {
                    var$11 = Long_mul($pos, var$5);
                    if (jl_Long_compareUnsigned(var$11, $value) > 0) {
                        var$11 = $pos;
                        break b;
                    }
                    $sz = $sz + 1 | 0;
                    if (jl_Long_compareUnsigned(var$11, $posLimit) > 0)
                        break;
                    $pos = var$11;
                }
            }
            if (!$positive)
                $sz = $sz + 1 | 0;
            jl_AbstractStringBuilder_insertSpace($this, $target, $target + $sz | 0);
            if ($positive)
                var$12 = $target;
            else {
                var$6 = $this.$buffer.data;
                var$12 = $target + 1 | 0;
                var$6[$target] = 45;
            }
            while (true) {
                if (Long_eq(var$11, Long_ZERO))
                    break a;
                var$6 = $this.$buffer.data;
                var$7 = var$12 + 1 | 0;
                var$6[var$12] = jl_Character_forDigit(Long_lo((jl_Long_divideUnsigned($value, var$11))), $radix);
                $value = jl_Long_remainderUnsigned($value, var$11);
                var$11 = jl_Long_divideUnsigned(var$11, var$5);
                var$12 = var$7;
            }
        }
    }
    return $this;
},
jl_AbstractStringBuilder_append5 = ($this, $value) => {
    return $this.$insert4($this.$length0, $value);
},
jl_AbstractStringBuilder_insert3 = ($this, $target, $value) => {
    let var$3, var$4, var$5, $number, $mantissa, $exp, $negative, $intPart, $sz, $digits, $zeros, $leadingZeros, $leadingZero, var$16, $pos, $i, $intDigit, var$20;
    var$3 = $rt_compare_less($value, 0.0);
    if (!var$3) {
        if (1.0 / $value === Infinity) {
            jl_AbstractStringBuilder_insertSpace($this, $target, $target + 3 | 0);
            var$4 = $this.$buffer.data;
            var$3 = $target + 1 | 0;
            var$4[$target] = 48;
            var$4 = $this.$buffer.data;
            var$5 = var$3 + 1 | 0;
            var$4[var$3] = 46;
            $this.$buffer.data[var$5] = 48;
            return $this;
        }
        jl_AbstractStringBuilder_insertSpace($this, $target, $target + 4 | 0);
        var$4 = $this.$buffer.data;
        var$3 = $target + 1 | 0;
        var$4[$target] = 45;
        var$4 = $this.$buffer.data;
        var$5 = var$3 + 1 | 0;
        var$4[var$3] = 48;
        var$4 = $this.$buffer.data;
        var$3 = var$5 + 1 | 0;
        var$4[var$5] = 46;
        $this.$buffer.data[var$3] = 48;
        return $this;
    }
    if (isNaN($value) ? 1 : 0) {
        jl_AbstractStringBuilder_insertSpace($this, $target, $target + 3 | 0);
        var$4 = $this.$buffer.data;
        var$3 = $target + 1 | 0;
        var$4[$target] = 78;
        var$4 = $this.$buffer.data;
        var$5 = var$3 + 1 | 0;
        var$4[var$3] = 97;
        $this.$buffer.data[var$5] = 78;
        return $this;
    }
    if (jl_Float_isInfinite($value)) {
        if (var$3 > 0) {
            jl_AbstractStringBuilder_insertSpace($this, $target, $target + 8 | 0);
            var$3 = $target;
        } else {
            jl_AbstractStringBuilder_insertSpace($this, $target, $target + 9 | 0);
            var$4 = $this.$buffer.data;
            var$3 = $target + 1 | 0;
            var$4[$target] = 45;
        }
        var$4 = $this.$buffer.data;
        var$5 = var$3 + 1 | 0;
        var$4[var$3] = 73;
        var$4 = $this.$buffer.data;
        var$3 = var$5 + 1 | 0;
        var$4[var$5] = 110;
        var$4 = $this.$buffer.data;
        var$5 = var$3 + 1 | 0;
        var$4[var$3] = 102;
        var$4 = $this.$buffer.data;
        var$3 = var$5 + 1 | 0;
        var$4[var$5] = 105;
        var$4 = $this.$buffer.data;
        var$5 = var$3 + 1 | 0;
        var$4[var$3] = 110;
        var$4 = $this.$buffer.data;
        var$3 = var$5 + 1 | 0;
        var$4[var$5] = 105;
        var$4 = $this.$buffer.data;
        var$5 = var$3 + 1 | 0;
        var$4[var$3] = 116;
        $this.$buffer.data[var$5] = 121;
        return $this;
    }
    jl_AbstractStringBuilder$Constants_$callClinit();
    $number = jl_AbstractStringBuilder$Constants_floatAnalysisResult;
    otcit_FloatAnalyzer_analyze($value, $number);
    $mantissa = $number.$mantissa0;
    $exp = $number.$exponent0;
    $negative = $number.$sign1;
    $intPart = 1;
    $sz = 1;
    if ($negative)
        $sz = 2;
    $digits = 9;
    $zeros = jl_AbstractStringBuilder_trailingDecimalZeros0($mantissa);
    if ($zeros > 0)
        $digits = $digits - $zeros | 0;
    $leadingZeros = 0;
    $leadingZero = 0;
    if ($exp < 7 && $exp >= (-3)) {
        if ($exp >= 0) {
            $intPart = $exp + 1 | 0;
            $digits = jl_Math_max($digits, $intPart + 1 | 0);
            $exp = 0;
        } else {
            $intPart = 0;
            $leadingZeros = ( -$exp | 0) - 1 | 0;
            $leadingZero = 1;
            $sz = $sz + 1 | 0;
            $exp = 0;
        }
    }
    if ($exp) {
        $sz = $sz + 2 | 0;
        if (!($exp > (-10) && $exp < 10))
            $sz = $sz + 1 | 0;
        if ($exp < 0)
            $sz = $sz + 1 | 0;
    }
    if ($exp && $digits == $intPart)
        $digits = $digits + 1 | 0;
    var$3 = $sz + ($digits + $leadingZeros | 0) | 0;
    jl_AbstractStringBuilder_insertSpace($this, $target, $target + var$3 | 0);
    if (!$negative)
        var$16 = $target;
    else {
        var$4 = $this.$buffer.data;
        var$16 = $target + 1 | 0;
        var$4[$target] = 45;
    }
    $pos = 100000000;
    if ($leadingZero) {
        var$4 = $this.$buffer.data;
        var$3 = var$16 + 1 | 0;
        var$4[var$16] = 48;
        var$4 = $this.$buffer.data;
        var$16 = var$3 + 1 | 0;
        var$4[var$3] = 46;
        while (true) {
            var$3 = $leadingZeros + (-1) | 0;
            if ($leadingZeros <= 0)
                break;
            var$4 = $this.$buffer.data;
            var$5 = var$16 + 1 | 0;
            var$4[var$16] = 48;
            $leadingZeros = var$3;
            var$16 = var$5;
        }
    }
    $i = 0;
    while ($i < $digits) {
        if ($pos <= 0)
            $intDigit = 0;
        else {
            $intDigit = $mantissa / $pos | 0;
            $mantissa = $mantissa % $pos | 0;
        }
        var$4 = $this.$buffer.data;
        var$3 = var$16 + 1 | 0;
        var$4[var$16] = (48 + $intDigit | 0) & 65535;
        $intPart = $intPart + (-1) | 0;
        if ($intPart)
            var$16 = var$3;
        else {
            var$4 = $this.$buffer.data;
            var$16 = var$3 + 1 | 0;
            var$4[var$3] = 46;
        }
        $pos = $pos / 10 | 0;
        $i = $i + 1 | 0;
    }
    if ($exp) {
        var$4 = $this.$buffer.data;
        var$3 = var$16 + 1 | 0;
        var$4[var$16] = 69;
        if ($exp >= 0)
            var$5 = var$3;
        else {
            $exp =  -$exp | 0;
            var$4 = $this.$buffer.data;
            var$5 = var$3 + 1 | 0;
            var$4[var$3] = 45;
        }
        if ($exp < 10)
            var$20 = var$5;
        else {
            var$4 = $this.$buffer.data;
            var$20 = var$5 + 1 | 0;
            var$4[var$5] = (48 + ($exp / 10 | 0) | 0) & 65535;
        }
        $this.$buffer.data[var$20] = (48 + ($exp % 10 | 0) | 0) & 65535;
    }
    return $this;
},
jl_AbstractStringBuilder_append6 = ($this, $value) => {
    return $this.$insert5($this.$length0, $value);
},
jl_AbstractStringBuilder_insert4 = ($this, $target, $value) => {
    let var$3, var$4, var$5, $number, $mantissa, $exp, $negative, $intPart, $sz, $digits, $zeros, $leadingZeros, $leadingZero, var$16, $pos, $i, $intDigit, var$20;
    var$3 = $rt_compare_less($value, 0.0);
    if (!var$3) {
        if (1.0 / $value === Infinity) {
            jl_AbstractStringBuilder_insertSpace($this, $target, $target + 3 | 0);
            var$4 = $this.$buffer.data;
            var$3 = $target + 1 | 0;
            var$4[$target] = 48;
            var$4 = $this.$buffer.data;
            var$5 = var$3 + 1 | 0;
            var$4[var$3] = 46;
            $this.$buffer.data[var$5] = 48;
            return $this;
        }
        jl_AbstractStringBuilder_insertSpace($this, $target, $target + 4 | 0);
        var$4 = $this.$buffer.data;
        var$3 = $target + 1 | 0;
        var$4[$target] = 45;
        var$4 = $this.$buffer.data;
        var$5 = var$3 + 1 | 0;
        var$4[var$3] = 48;
        var$4 = $this.$buffer.data;
        var$3 = var$5 + 1 | 0;
        var$4[var$5] = 46;
        $this.$buffer.data[var$3] = 48;
        return $this;
    }
    if (isNaN($value) ? 1 : 0) {
        jl_AbstractStringBuilder_insertSpace($this, $target, $target + 3 | 0);
        var$4 = $this.$buffer.data;
        var$3 = $target + 1 | 0;
        var$4[$target] = 78;
        var$4 = $this.$buffer.data;
        var$5 = var$3 + 1 | 0;
        var$4[var$3] = 97;
        $this.$buffer.data[var$5] = 78;
        return $this;
    }
    if (jl_Double_isInfinite($value)) {
        if (var$3 > 0) {
            jl_AbstractStringBuilder_insertSpace($this, $target, $target + 8 | 0);
            var$3 = $target;
        } else {
            jl_AbstractStringBuilder_insertSpace($this, $target, $target + 9 | 0);
            var$4 = $this.$buffer.data;
            var$3 = $target + 1 | 0;
            var$4[$target] = 45;
        }
        var$4 = $this.$buffer.data;
        var$5 = var$3 + 1 | 0;
        var$4[var$3] = 73;
        var$4 = $this.$buffer.data;
        var$3 = var$5 + 1 | 0;
        var$4[var$5] = 110;
        var$4 = $this.$buffer.data;
        var$5 = var$3 + 1 | 0;
        var$4[var$3] = 102;
        var$4 = $this.$buffer.data;
        var$3 = var$5 + 1 | 0;
        var$4[var$5] = 105;
        var$4 = $this.$buffer.data;
        var$5 = var$3 + 1 | 0;
        var$4[var$3] = 110;
        var$4 = $this.$buffer.data;
        var$3 = var$5 + 1 | 0;
        var$4[var$5] = 105;
        var$4 = $this.$buffer.data;
        var$5 = var$3 + 1 | 0;
        var$4[var$3] = 116;
        $this.$buffer.data[var$5] = 121;
        return $this;
    }
    jl_AbstractStringBuilder$Constants_$callClinit();
    $number = jl_AbstractStringBuilder$Constants_doubleAnalysisResult;
    otcit_DoubleAnalyzer_analyze($value, $number);
    $mantissa = $number.$mantissa;
    $exp = $number.$exponent;
    $negative = $number.$sign0;
    $intPart = 1;
    $sz = 1;
    if ($negative)
        $sz = 2;
    $digits = 18;
    $zeros = jl_AbstractStringBuilder_trailingDecimalZeros($mantissa);
    if ($zeros > 0)
        $digits = $digits - $zeros | 0;
    $leadingZeros = 0;
    $leadingZero = 0;
    if ($exp < 7 && $exp >= (-3)) {
        if ($exp >= 0) {
            $intPart = $exp + 1 | 0;
            $digits = jl_Math_max($digits, $intPart + 1 | 0);
            $exp = 0;
        } else {
            $intPart = 0;
            $leadingZeros = ( -$exp | 0) - 1 | 0;
            $leadingZero = 1;
            $sz = $sz + 1 | 0;
            $exp = 0;
        }
    }
    if ($exp) {
        $sz = $sz + 2 | 0;
        if (!($exp > (-10) && $exp < 10))
            $sz = $sz + 1 | 0;
        if (!($exp > (-100) && $exp < 100))
            $sz = $sz + 1 | 0;
        if ($exp < 0)
            $sz = $sz + 1 | 0;
    }
    if ($exp && $digits == $intPart)
        $digits = $digits + 1 | 0;
    var$3 = $sz + ($digits + $leadingZeros | 0) | 0;
    jl_AbstractStringBuilder_insertSpace($this, $target, $target + var$3 | 0);
    if (!$negative)
        var$16 = $target;
    else {
        var$4 = $this.$buffer.data;
        var$16 = $target + 1 | 0;
        var$4[$target] = 45;
    }
    $pos = Long_create(1569325056, 23283064);
    if ($leadingZero) {
        var$4 = $this.$buffer.data;
        var$3 = var$16 + 1 | 0;
        var$4[var$16] = 48;
        var$4 = $this.$buffer.data;
        var$16 = var$3 + 1 | 0;
        var$4[var$3] = 46;
        while (true) {
            var$3 = $leadingZeros + (-1) | 0;
            if ($leadingZeros <= 0)
                break;
            var$4 = $this.$buffer.data;
            var$5 = var$16 + 1 | 0;
            var$4[var$16] = 48;
            $leadingZeros = var$3;
            var$16 = var$5;
        }
    }
    $i = 0;
    while ($i < $digits) {
        if (Long_le($pos, Long_ZERO))
            $intDigit = 0;
        else {
            $intDigit = Long_lo(Long_div($mantissa, $pos));
            $mantissa = Long_rem($mantissa, $pos);
        }
        var$4 = $this.$buffer.data;
        var$3 = var$16 + 1 | 0;
        var$4[var$16] = (48 + $intDigit | 0) & 65535;
        $intPart = $intPart + (-1) | 0;
        if ($intPart)
            var$16 = var$3;
        else {
            var$4 = $this.$buffer.data;
            var$16 = var$3 + 1 | 0;
            var$4[var$3] = 46;
        }
        $pos = Long_div($pos, Long_fromInt(10));
        $i = $i + 1 | 0;
    }
    if ($exp) {
        var$4 = $this.$buffer.data;
        var$3 = var$16 + 1 | 0;
        var$4[var$16] = 69;
        if ($exp >= 0)
            var$5 = var$3;
        else {
            $exp =  -$exp | 0;
            var$4 = $this.$buffer.data;
            var$5 = var$3 + 1 | 0;
            var$4[var$3] = 45;
        }
        if ($exp >= 100) {
            var$4 = $this.$buffer.data;
            var$3 = var$5 + 1 | 0;
            var$4[var$5] = (48 + ($exp / 100 | 0) | 0) & 65535;
            $exp = $exp % 100 | 0;
            var$4 = $this.$buffer.data;
            var$20 = var$3 + 1 | 0;
            var$4[var$3] = (48 + ($exp / 10 | 0) | 0) & 65535;
        } else if ($exp < 10)
            var$20 = var$5;
        else {
            var$4 = $this.$buffer.data;
            var$20 = var$5 + 1 | 0;
            var$4[var$5] = (48 + ($exp / 10 | 0) | 0) & 65535;
        }
        $this.$buffer.data[var$20] = (48 + ($exp % 10 | 0) | 0) & 65535;
    }
    return $this;
},
jl_AbstractStringBuilder_trailingDecimalZeros0 = $n => {
    let $result, $zeros, var$4, var$5;
    if (!($n % 1000000000 | 0))
        return 9;
    $result = 0;
    $zeros = 1;
    if (!($n % 100000000 | 0)) {
        $result = 8;
        $zeros = 100000000;
    }
    var$4 = $zeros * 10000 | 0;
    if ($n % var$4 | 0)
        var$4 = $zeros;
    else
        $result = $result | 4;
    var$5 = var$4 * 100 | 0;
    if ($n % var$5 | 0)
        var$5 = var$4;
    else
        $result = $result | 2;
    if (!($n % (var$5 * 10 | 0) | 0))
        $result = $result | 1;
    return $result;
},
jl_AbstractStringBuilder_trailingDecimalZeros = $n => {
    let $zeros, $result, $bit, $i;
    $zeros = Long_fromInt(1);
    $result = 0;
    $bit = 16;
    jl_AbstractStringBuilder$Constants_$callClinit();
    $i = jl_AbstractStringBuilder$Constants_longLogPowersOfTen.data.length - 1 | 0;
    while ($i >= 0) {
        if (Long_eq(Long_rem($n, Long_mul($zeros, jl_AbstractStringBuilder$Constants_longLogPowersOfTen.data[$i])), Long_ZERO)) {
            $result = $result | $bit;
            $zeros = Long_mul($zeros, jl_AbstractStringBuilder$Constants_longLogPowersOfTen.data[$i]);
        }
        $bit = $bit >>> 1 | 0;
        $i = $i + (-1) | 0;
    }
    return $result;
},
jl_AbstractStringBuilder_append2 = ($this, $c) => {
    return $this.$insert6($this.$length0, $c);
},
jl_AbstractStringBuilder_insert1 = ($this, $index, $c) => {
    jl_AbstractStringBuilder_insertSpace($this, $index, $index + 1 | 0);
    $this.$buffer.data[$index] = $c;
    return $this;
},
jl_AbstractStringBuilder_insert5 = ($this, $index, $obj) => {
    return $this.$insert0($index, $obj === null ? $rt_s(54) : $obj.$toString());
},
jl_AbstractStringBuilder_append4 = ($this, $b) => {
    return $this.$insert7($this.$length0, $b);
},
jl_AbstractStringBuilder_insert2 = ($this, $index, $b) => {
    return $this.$insert0($index, !$b ? $rt_s(55) : $rt_s(56));
},
jl_AbstractStringBuilder_ensureCapacity = ($this, $capacity) => {
    let $newLength;
    if ($this.$buffer.data.length >= $capacity)
        return;
    $newLength = $this.$buffer.data.length >= 1073741823 ? 2147483647 : jl_Math_max($capacity, jl_Math_max($this.$buffer.data.length * 2 | 0, 5));
    $this.$buffer = ju_Arrays_copyOf1($this.$buffer, $newLength);
},
jl_AbstractStringBuilder_toString = $this => {
    return jl_String__init_1($this.$buffer, 0, $this.$length0);
},
jl_AbstractStringBuilder_length = $this => {
    return $this.$length0;
},
jl_AbstractStringBuilder_charAt = ($this, $index) => {
    if ($index >= 0 && $index < $this.$length0)
        return $this.$buffer.data[$index];
    $rt_throw(jl_IndexOutOfBoundsException__init_());
},
jl_AbstractStringBuilder_append1 = ($this, $chars, $offset, $len) => {
    return $this.$insert8($this.$length0, $chars, $offset, $len);
},
jl_AbstractStringBuilder_insert = ($this, $index, $chars, $offset, $len) => {
    let var$5, var$6, var$7, var$8, var$9;
    jl_AbstractStringBuilder_insertSpace($this, $index, $index + $len | 0);
    var$5 = $len + $offset | 0;
    while ($offset < var$5) {
        var$6 = $chars.data;
        var$7 = $this.$buffer.data;
        var$8 = $index + 1 | 0;
        var$9 = $offset + 1 | 0;
        var$7[$index] = var$6[$offset];
        $index = var$8;
        $offset = var$9;
    }
    return $this;
},
jl_AbstractStringBuilder_append0 = ($this, $chars) => {
    return $this.$append5($chars, 0, $chars.data.length);
},
jl_AbstractStringBuilder_deleteCharAt = ($this, $i) => {
    let var$2, var$3, $i_0;
    if ($i >= 0 && $i < $this.$length0) {
        $this.$length0 = $this.$length0 - 1 | 0;
        while ($i < $this.$length0) {
            var$2 = $this.$buffer.data;
            var$3 = $this.$buffer.data;
            $i_0 = $i + 1 | 0;
            var$2[$i] = var$3[$i_0];
            $i = $i_0;
        }
        return $this;
    }
    $rt_throw(jl_StringIndexOutOfBoundsException__init_());
},
jl_AbstractStringBuilder_delete = ($this, $start, $end) => {
    let var$3, $sz, $i, var$6, var$7, var$8;
    if ($start >= 0) {
        var$3 = $rt_compare($start, $end);
        if (var$3 <= 0 && $start <= $this.$length0) {
            if (!var$3)
                return $this;
            if ($end > $this.$length0)
                $end = $this.$length0;
            $sz = $this.$length0 - $end | 0;
            $this.$length0 = $this.$length0 - ($end - $start | 0) | 0;
            $i = 0;
            while ($i < $sz) {
                var$6 = $this.$buffer.data;
                var$3 = $start + 1 | 0;
                var$7 = $this.$buffer.data;
                var$8 = $end + 1 | 0;
                var$6[$start] = var$7[$end];
                $i = $i + 1 | 0;
                $start = var$3;
                $end = var$8;
            }
            return $this;
        }
    }
    $rt_throw(jl_StringIndexOutOfBoundsException__init_());
},
jl_AbstractStringBuilder_insertSpace = ($this, $start, $end) => {
    let $sz, $i;
    $sz = $this.$length0 - $start | 0;
    $this.$ensureCapacity(($this.$length0 + $end | 0) - $start | 0);
    $i = $sz - 1 | 0;
    while ($i >= 0) {
        $this.$buffer.data[$end + $i | 0] = $this.$buffer.data[$start + $i | 0];
        $i = $i + (-1) | 0;
    }
    $this.$length0 = $this.$length0 + ($end - $start | 0) | 0;
},
jl_Appendable = $rt_classWithoutFields(0),
jl_StringBuffer = $rt_classWithoutFields(jl_AbstractStringBuilder),
jl_StringBuffer__init_0 = $this => {
    jl_AbstractStringBuilder__init_0($this);
},
jl_StringBuffer__init_ = () => {
    let var_0 = new jl_StringBuffer();
    jl_StringBuffer__init_0(var_0);
    return var_0;
},
jl_StringBuffer_append0 = ($this, $string) => {
    jl_AbstractStringBuilder_append($this, $string);
    return $this;
},
jl_StringBuffer_append2 = ($this, $c) => {
    jl_AbstractStringBuilder_append2($this, $c);
    return $this;
},
jl_StringBuffer_append3 = ($this, $chars, $offset, $len) => {
    jl_AbstractStringBuilder_append1($this, $chars, $offset, $len);
    return $this;
},
jl_StringBuffer_append1 = ($this, $chars) => {
    jl_AbstractStringBuilder_append0($this, $chars);
    return $this;
},
jl_StringBuffer_insert0 = ($this, $index, $chars, $offset, $len) => {
    jl_AbstractStringBuilder_insert($this, $index, $chars, $offset, $len);
    return $this;
},
jl_StringBuffer_insert4 = ($this, $index, $c) => {
    jl_AbstractStringBuilder_insert1($this, $index, $c);
    return $this;
},
jl_StringBuffer_insert1 = ($this, $index, $string) => {
    jl_AbstractStringBuilder_insert0($this, $index, $string);
    return $this;
},
jl_StringBuffer_insert3 = ($this, var$1, var$2, var$3, var$4) => {
    return $this.$insert9(var$1, var$2, var$3, var$4);
};
let jl_StringBuffer_append = ($this, var$1, var$2, var$3) => {
    return $this.$append9(var$1, var$2, var$3);
},
jl_StringBuffer_charAt = ($this, var$1) => {
    return jl_AbstractStringBuilder_charAt($this, var$1);
},
jl_StringBuffer_length = $this => {
    return jl_AbstractStringBuilder_length($this);
},
jl_StringBuffer_toString = $this => {
    return jl_AbstractStringBuilder_toString($this);
},
jl_StringBuffer_ensureCapacity = ($this, var$1) => {
    jl_AbstractStringBuilder_ensureCapacity($this, var$1);
},
jl_StringBuffer_insert2 = ($this, var$1, var$2) => {
    return $this.$insert10(var$1, var$2);
},
jl_StringBuffer_insert = ($this, var$1, var$2) => {
    return $this.$insert11(var$1, var$2);
};
function jn_Buffer() {
    let a = this; jl_Object.call(a);
    a.$position3 = 0;
    a.$limit = 0;
    a.$mark = 0;
}
let jn_Buffer__init_ = $this => {
    jl_Object__init_($this);
    $this.$mark = (-1);
},
jn_Buffer_capacity = $this => {
    return $this.$capacityImpl();
},
jn_Buffer_position = $this => {
    return $this.$position3;
},
jn_Buffer_position0 = ($this, $newPosition) => {
    let var$2, var$3, var$4;
    if ($newPosition >= 0 && $newPosition <= $this.$limit) {
        $this.$position3 = $newPosition;
        if ($newPosition < $this.$mark)
            $this.$mark = 0;
        return $this;
    }
    var$2 = new jl_IllegalArgumentException;
    var$3 = $this.$limit;
    var$4 = jl_StringBuilder__init_();
    jl_StringBuilder_append1(jl_StringBuilder_append0(jl_StringBuilder_append(jl_StringBuilder_append0(jl_StringBuilder_append(var$4, $rt_s(57)), $newPosition), $rt_s(58)), var$3), 93);
    jl_IllegalArgumentException__init_0(var$2, jl_StringBuilder_toString(var$4));
    $rt_throw(var$2);
},
jn_Buffer_clear = $this => {
    $this.$position3 = 0;
    $this.$limit = jn_Buffer_capacity($this);
    $this.$mark = (-1);
    return $this;
},
jn_Buffer_flip = $this => {
    $this.$limit = $this.$position3;
    $this.$position3 = 0;
    $this.$mark = (-1);
    return $this;
},
jn_Buffer_remaining = $this => {
    return $this.$limit - $this.$position3 | 0;
},
jur_SpecialToken = $rt_classWithoutFields(),
jur_SpecialToken__init_ = $this => {
    jl_Object__init_($this);
};
function jur_AbstractCharClass() {
    let a = this; jur_SpecialToken.call(a);
    a.$alt = 0;
    a.$altSurrogates = 0;
    a.$lowHighSurrogates = null;
    a.$charClassWithoutSurrogates = null;
    a.$charClassWithSurrogates = null;
    a.$mayContainSupplCodepoints0 = 0;
}
let jur_AbstractCharClass_charClasses = null,
jur_AbstractCharClass_$callClinit = () => {
    jur_AbstractCharClass_$callClinit = $rt_eraseClinit(jur_AbstractCharClass);
    jur_AbstractCharClass__clinit_();
},
jur_AbstractCharClass__init_ = $this => {
    jur_AbstractCharClass_$callClinit();
    jur_SpecialToken__init_($this);
    $this.$lowHighSurrogates = ju_BitSet__init_2(2048);
},
jur_AbstractCharClass_getBits = $this => {
    return null;
},
jur_AbstractCharClass_getLowHighSurrogates = $this => {
    return $this.$lowHighSurrogates;
},
jur_AbstractCharClass_hasLowHighSurrogates = $this => {
    return !$this.$altSurrogates ? ($this.$lowHighSurrogates.$nextSetBit(0) >= 2048 ? 0 : 1) : $this.$lowHighSurrogates.$nextClearBit(0) >= 2048 ? 0 : 1;
},
jur_AbstractCharClass_mayContainSupplCodepoints = $this => {
    return $this.$mayContainSupplCodepoints0;
},
jur_AbstractCharClass_getInstance = $this => {
    return $this;
},
jur_AbstractCharClass_getSurrogates = $this => {
    let $lHS;
    if ($this.$charClassWithSurrogates === null) {
        $lHS = $this.$getLowHighSurrogates();
        $this.$charClassWithSurrogates = jur_AbstractCharClass$1__init_0($this, $lHS);
        $this.$charClassWithSurrogates.$setNegative($this.$altSurrogates);
    }
    return $this.$charClassWithSurrogates;
},
jur_AbstractCharClass_getWithoutSurrogates = $this => {
    let $lHS;
    if ($this.$charClassWithoutSurrogates === null) {
        $lHS = $this.$getLowHighSurrogates();
        $this.$charClassWithoutSurrogates = jur_AbstractCharClass$2__init_0($this, $lHS, $this);
        $this.$charClassWithoutSurrogates.$setNegative($this.$isNegative());
        $this.$charClassWithoutSurrogates.$mayContainSupplCodepoints0 = $this.$mayContainSupplCodepoints0;
    }
    return $this.$charClassWithoutSurrogates;
},
jur_AbstractCharClass_hasUCI = $this => {
    return 0;
},
jur_AbstractCharClass_setNegative = ($this, $value) => {
    if ($this.$alt ^ $value) {
        $this.$alt = $this.$alt ? 0 : 1;
        $this.$altSurrogates = $this.$altSurrogates ? 0 : 1;
    }
    if (!$this.$mayContainSupplCodepoints0)
        $this.$mayContainSupplCodepoints0 = 1;
    return $this;
},
jur_AbstractCharClass_isNegative = $this => {
    return $this.$alt;
},
jur_AbstractCharClass_intersects0 = ($cc, $ch) => {
    jur_AbstractCharClass_$callClinit();
    return $cc.$contains($ch);
},
jur_AbstractCharClass_intersects = ($cc1, $cc2) => {
    jur_AbstractCharClass_$callClinit();
    if ($cc1.$getBits() !== null && $cc2.$getBits() !== null)
        return ($cc1.$getBits()).$intersects($cc2.$getBits());
    return 1;
},
jur_AbstractCharClass_getPredefinedClass = ($name, $negative) => {
    jur_AbstractCharClass_$callClinit();
    return (jur_AbstractCharClass$PredefinedCharacterClasses_getObject(jur_AbstractCharClass_charClasses, $name)).$getValue($negative);
},
jur_AbstractCharClass__clinit_ = () => {
    jur_AbstractCharClass_charClasses = jur_AbstractCharClass$PredefinedCharacterClasses__init_0();
};
function jur_AbstractCharClass$LazyJavaUnicodeIdentifierPart$1() {
    jur_AbstractCharClass.call(this);
    this.$this$08 = null;
}
let jur_AbstractCharClass$LazyJavaUnicodeIdentifierPart$1__init_ = ($this, $this$0) => {
    $this.$this$08 = $this$0;
    jur_AbstractCharClass__init_($this);
},
jur_AbstractCharClass$LazyJavaUnicodeIdentifierPart$1__init_0 = var_0 => {
    let var_1 = new jur_AbstractCharClass$LazyJavaUnicodeIdentifierPart$1();
    jur_AbstractCharClass$LazyJavaUnicodeIdentifierPart$1__init_(var_1, var_0);
    return var_1;
},
jur_AbstractCharClass$LazyJavaUnicodeIdentifierPart$1_contains = ($this, $ch) => {
    return jl_Character_isUnicodeIdentifierPart($ch);
},
jur_AbstractCharClass$PredefinedCharacterClasses = $rt_classWithoutFields(),
jur_AbstractCharClass$PredefinedCharacterClasses_space = null,
jur_AbstractCharClass$PredefinedCharacterClasses_digit = null,
jur_AbstractCharClass$PredefinedCharacterClasses_contents = null,
jur_AbstractCharClass$PredefinedCharacterClasses_$callClinit = () => {
    jur_AbstractCharClass$PredefinedCharacterClasses_$callClinit = $rt_eraseClinit(jur_AbstractCharClass$PredefinedCharacterClasses);
    jur_AbstractCharClass$PredefinedCharacterClasses__clinit_();
},
jur_AbstractCharClass$PredefinedCharacterClasses__init_ = $this => {
    jur_AbstractCharClass$PredefinedCharacterClasses_$callClinit();
    jl_Object__init_($this);
},
jur_AbstractCharClass$PredefinedCharacterClasses__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$PredefinedCharacterClasses();
    jur_AbstractCharClass$PredefinedCharacterClasses__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$PredefinedCharacterClasses_getObject = ($this, $name) => {
    let $i, $row, var$4;
    $i = 0;
    while (true) {
        jur_AbstractCharClass$PredefinedCharacterClasses_$callClinit();
        if ($i >= jur_AbstractCharClass$PredefinedCharacterClasses_contents.data.length)
            $rt_throw(ju_MissingResourceException__init_0($rt_s(13), $rt_s(13), $name));
        $row = jur_AbstractCharClass$PredefinedCharacterClasses_contents.data[$i];
        var$4 = $row.data;
        if ($name.$equals(var$4[0]))
            break;
        $i = $i + 1 | 0;
    }
    return var$4[1];
},
jur_AbstractCharClass$PredefinedCharacterClasses__clinit_ = () => {
    let var$1, var$2, var$3, var$4;
    jur_AbstractCharClass$PredefinedCharacterClasses_space = jur_AbstractCharClass$LazySpace__init_0();
    jur_AbstractCharClass$PredefinedCharacterClasses_digit = jur_AbstractCharClass$LazyDigit__init_0();
    var$1 = $rt_createArray($rt_arraycls(jl_Object), 194);
    var$2 = var$1.data;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(59);
    var$4[1] = jur_AbstractCharClass$LazyLower__init_0();
    var$2[0] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(60);
    var$4[1] = jur_AbstractCharClass$LazyUpper__init_0();
    var$2[1] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(61);
    var$4[1] = jur_AbstractCharClass$LazyASCII__init_0();
    var$2[2] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(62);
    var$4[1] = jur_AbstractCharClass$LazyAlpha__init_0();
    var$2[3] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(63);
    var$4[1] = jur_AbstractCharClass$PredefinedCharacterClasses_digit;
    var$2[4] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(64);
    var$4[1] = jur_AbstractCharClass$LazyAlnum__init_0();
    var$2[5] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(65);
    var$4[1] = jur_AbstractCharClass$LazyPunct__init_0();
    var$2[6] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(66);
    var$4[1] = jur_AbstractCharClass$LazyGraph__init_0();
    var$2[7] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(67);
    var$4[1] = jur_AbstractCharClass$LazyPrint__init_0();
    var$2[8] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(68);
    var$4[1] = jur_AbstractCharClass$LazyBlank__init_0();
    var$2[9] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(69);
    var$4[1] = jur_AbstractCharClass$LazyCntrl__init_0();
    var$2[10] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(70);
    var$4[1] = jur_AbstractCharClass$LazyXDigit__init_0();
    var$2[11] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(71);
    var$4[1] = jur_AbstractCharClass$LazyJavaLowerCase__init_0();
    var$2[12] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(72);
    var$4[1] = jur_AbstractCharClass$LazyJavaUpperCase__init_0();
    var$2[13] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(73);
    var$4[1] = jur_AbstractCharClass$LazyJavaWhitespace__init_0();
    var$2[14] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(74);
    var$4[1] = jur_AbstractCharClass$LazyJavaMirrored__init_0();
    var$2[15] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(75);
    var$4[1] = jur_AbstractCharClass$LazyJavaDefined__init_0();
    var$2[16] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(76);
    var$4[1] = jur_AbstractCharClass$LazyJavaDigit__init_0();
    var$2[17] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(77);
    var$4[1] = jur_AbstractCharClass$LazyJavaIdentifierIgnorable__init_0();
    var$2[18] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(78);
    var$4[1] = jur_AbstractCharClass$LazyJavaISOControl__init_0();
    var$2[19] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(79);
    var$4[1] = jur_AbstractCharClass$LazyJavaJavaIdentifierPart__init_0();
    var$2[20] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(80);
    var$4[1] = jur_AbstractCharClass$LazyJavaJavaIdentifierStart__init_0();
    var$2[21] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(81);
    var$4[1] = jur_AbstractCharClass$LazyJavaLetter__init_0();
    var$2[22] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(82);
    var$4[1] = jur_AbstractCharClass$LazyJavaLetterOrDigit__init_0();
    var$2[23] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(83);
    var$4[1] = jur_AbstractCharClass$LazyJavaSpaceChar__init_0();
    var$2[24] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(84);
    var$4[1] = jur_AbstractCharClass$LazyJavaTitleCase__init_0();
    var$2[25] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(85);
    var$4[1] = jur_AbstractCharClass$LazyJavaUnicodeIdentifierPart__init_0();
    var$2[26] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(86);
    var$4[1] = jur_AbstractCharClass$LazyJavaUnicodeIdentifierStart__init_0();
    var$2[27] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(87);
    var$4[1] = jur_AbstractCharClass$PredefinedCharacterClasses_space;
    var$2[28] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(88);
    var$4[1] = jur_AbstractCharClass$LazyWord__init_0();
    var$2[29] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(89);
    var$4[1] = jur_AbstractCharClass$LazyNonWord__init_0();
    var$2[30] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(90);
    var$4[1] = jur_AbstractCharClass$PredefinedCharacterClasses_space;
    var$2[31] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(91);
    var$4[1] = jur_AbstractCharClass$LazyNonSpace__init_0();
    var$2[32] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(92);
    var$4[1] = jur_AbstractCharClass$PredefinedCharacterClasses_digit;
    var$2[33] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(93);
    var$4[1] = jur_AbstractCharClass$LazyNonDigit__init_0();
    var$2[34] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(94);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(0, 127);
    var$2[35] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(95);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(128, 255);
    var$2[36] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(96);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(256, 383);
    var$2[37] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(97);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(384, 591);
    var$2[38] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(98);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(592, 687);
    var$2[39] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(99);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(688, 767);
    var$2[40] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(100);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(768, 879);
    var$2[41] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(101);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(880, 1023);
    var$2[42] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(102);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(1024, 1279);
    var$2[43] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(103);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(1280, 1327);
    var$2[44] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(104);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(1328, 1423);
    var$2[45] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(105);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(1424, 1535);
    var$2[46] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(106);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(1536, 1791);
    var$2[47] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(107);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(1792, 1871);
    var$2[48] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(108);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(1872, 1919);
    var$2[49] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(109);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(1920, 1983);
    var$2[50] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(110);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(2304, 2431);
    var$2[51] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(111);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(2432, 2559);
    var$2[52] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(112);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(2560, 2687);
    var$2[53] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(113);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(2688, 2815);
    var$2[54] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(114);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(2816, 2943);
    var$2[55] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(115);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(2944, 3071);
    var$2[56] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(116);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(3072, 3199);
    var$2[57] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(117);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(3200, 3327);
    var$2[58] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(118);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(3328, 3455);
    var$2[59] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(119);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(3456, 3583);
    var$2[60] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(120);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(3584, 3711);
    var$2[61] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(121);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(3712, 3839);
    var$2[62] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(122);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(3840, 4095);
    var$2[63] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(123);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(4096, 4255);
    var$2[64] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(124);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(4256, 4351);
    var$2[65] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(125);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(4352, 4607);
    var$2[66] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(126);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(4608, 4991);
    var$2[67] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(127);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(4992, 5023);
    var$2[68] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(128);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(5024, 5119);
    var$2[69] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(129);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(5120, 5759);
    var$2[70] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(130);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(5760, 5791);
    var$2[71] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(131);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(5792, 5887);
    var$2[72] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(132);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(5888, 5919);
    var$2[73] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(133);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(5920, 5951);
    var$2[74] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(134);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(5952, 5983);
    var$2[75] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(135);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(5984, 6015);
    var$2[76] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(136);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(6016, 6143);
    var$2[77] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(137);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(6144, 6319);
    var$2[78] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(138);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(6400, 6479);
    var$2[79] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(139);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(6480, 6527);
    var$2[80] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(140);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(6528, 6623);
    var$2[81] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(141);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(6624, 6655);
    var$2[82] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(142);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(6656, 6687);
    var$2[83] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(143);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(7424, 7551);
    var$2[84] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(144);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(7552, 7615);
    var$2[85] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(145);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(7616, 7679);
    var$2[86] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(146);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(7680, 7935);
    var$2[87] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(147);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(7936, 8191);
    var$2[88] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(148);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(8192, 8303);
    var$2[89] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(149);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(8304, 8351);
    var$2[90] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(150);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(8352, 8399);
    var$2[91] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(151);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(8400, 8447);
    var$2[92] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(152);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(8448, 8527);
    var$2[93] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(153);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(8528, 8591);
    var$2[94] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(154);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(8592, 8703);
    var$2[95] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(155);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(8704, 8959);
    var$2[96] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(156);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(8960, 9215);
    var$2[97] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(157);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(9216, 9279);
    var$2[98] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(158);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(9280, 9311);
    var$2[99] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(159);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(9312, 9471);
    var$2[100] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(160);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(9472, 9599);
    var$2[101] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(161);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(9600, 9631);
    var$2[102] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(162);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(9632, 9727);
    var$2[103] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(163);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(9728, 9983);
    var$2[104] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(164);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(9984, 10175);
    var$2[105] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(165);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(10176, 10223);
    var$2[106] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(166);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(10224, 10239);
    var$2[107] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(167);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(10240, 10495);
    var$2[108] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(168);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(10496, 10623);
    var$2[109] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(169);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(10624, 10751);
    var$2[110] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(170);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(10752, 11007);
    var$2[111] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(171);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(11008, 11263);
    var$2[112] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(172);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(11264, 11359);
    var$2[113] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(173);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(11392, 11519);
    var$2[114] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(174);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(11520, 11567);
    var$2[115] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(175);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(11568, 11647);
    var$2[116] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(176);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(11648, 11743);
    var$2[117] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(177);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(11776, 11903);
    var$2[118] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(178);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(11904, 12031);
    var$2[119] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(179);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(12032, 12255);
    var$2[120] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(180);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(12272, 12287);
    var$2[121] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(181);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(12288, 12351);
    var$2[122] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(182);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(12352, 12447);
    var$2[123] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(183);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(12448, 12543);
    var$2[124] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(184);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(12544, 12591);
    var$2[125] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(185);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(12592, 12687);
    var$2[126] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(186);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(12688, 12703);
    var$2[127] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(187);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(12704, 12735);
    var$2[128] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(188);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(12736, 12783);
    var$2[129] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(189);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(12784, 12799);
    var$2[130] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(190);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(12800, 13055);
    var$2[131] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(191);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(13056, 13311);
    var$2[132] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(192);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(13312, 19893);
    var$2[133] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(193);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(19904, 19967);
    var$2[134] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(194);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(19968, 40959);
    var$2[135] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(195);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(40960, 42127);
    var$2[136] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(196);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(42128, 42191);
    var$2[137] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(197);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(42752, 42783);
    var$2[138] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(198);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(43008, 43055);
    var$2[139] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(199);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(44032, 55203);
    var$2[140] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(200);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(55296, 56191);
    var$2[141] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(201);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(56192, 56319);
    var$2[142] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(202);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(56320, 57343);
    var$2[143] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(203);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(57344, 63743);
    var$2[144] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(204);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(63744, 64255);
    var$2[145] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(205);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(64256, 64335);
    var$2[146] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(206);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(64336, 65023);
    var$2[147] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(207);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(65024, 65039);
    var$2[148] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(208);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(65040, 65055);
    var$2[149] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(209);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(65056, 65071);
    var$2[150] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(210);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(65072, 65103);
    var$2[151] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(211);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(65104, 65135);
    var$2[152] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(212);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(65136, 65279);
    var$2[153] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(213);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(65280, 65519);
    var$2[154] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(214);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(0, 1114111);
    var$2[155] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(215);
    var$4[1] = jur_AbstractCharClass$LazySpecialsBlock__init_0();
    var$2[156] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(216);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(0, 1);
    var$2[157] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(217);
    var$4[1] = jur_AbstractCharClass$LazyCategoryScope__init_(62, 1);
    var$2[158] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(218);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(1, 1);
    var$2[159] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(219);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(2, 1);
    var$2[160] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(220);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(3, 0);
    var$2[161] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(221);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(4, 0);
    var$2[162] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(222);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(5, 1);
    var$2[163] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(223);
    var$4[1] = jur_AbstractCharClass$LazyCategoryScope__init_(448, 1);
    var$2[164] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(224);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(6, 1);
    var$2[165] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(225);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(7, 0);
    var$2[166] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(226);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(8, 1);
    var$2[167] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(227);
    var$4[1] = jur_AbstractCharClass$LazyCategoryScope__init_(3584, 1);
    var$2[168] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(228);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(9, 1);
    var$2[169] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(229);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(10, 1);
    var$2[170] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(230);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(11, 1);
    var$2[171] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(231);
    var$4[1] = jur_AbstractCharClass$LazyCategoryScope__init_(28672, 0);
    var$2[172] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(232);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(12, 0);
    var$2[173] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(233);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(13, 0);
    var$2[174] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(234);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(14, 0);
    var$2[175] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(235);
    var$4[1] = jur_AbstractCharClass$LazyCategoryScope__init_2(983040, 1, 1);
    var$2[176] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(236);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(15, 0);
    var$2[177] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(237);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(16, 1);
    var$2[178] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(238);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(18, 1);
    var$2[179] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(239);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_2(19, 0, 1);
    var$2[180] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(240);
    var$4[1] = jur_AbstractCharClass$LazyCategoryScope__init_(1643118592, 1);
    var$2[181] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(241);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(20, 0);
    var$2[182] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(242);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(21, 0);
    var$2[183] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(243);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(22, 0);
    var$2[184] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(244);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(23, 0);
    var$2[185] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(245);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(24, 1);
    var$2[186] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(246);
    var$4[1] = jur_AbstractCharClass$LazyCategoryScope__init_(2113929216, 1);
    var$2[187] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(247);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(25, 1);
    var$2[188] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(248);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(26, 0);
    var$2[189] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(249);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(27, 0);
    var$2[190] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(250);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(28, 1);
    var$2[191] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(251);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(29, 0);
    var$2[192] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(252);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(30, 0);
    var$2[193] = var$3;
    jur_AbstractCharClass$PredefinedCharacterClasses_contents = var$1;
},
aa_Activity = $rt_classWithoutFields(),
ccra_a = $rt_classWithoutFields(aa_Activity),
jur_AbstractCharClass$LazyDigit = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyDigit__init_ = $this => {
    jur_AbstractCharClass$LazyCharClass__init_($this);
},
jur_AbstractCharClass$LazyDigit__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazyDigit();
    jur_AbstractCharClass$LazyDigit__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyDigit_computeValue = $this => {
    return (jur_CharClass__init_()).$add1(48, 57);
},
jur_AbstractCharClass$LazyJavaLetter = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyJavaLetter__init_ = $this => {
    jur_AbstractCharClass$LazyCharClass__init_($this);
},
jur_AbstractCharClass$LazyJavaLetter__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazyJavaLetter();
    jur_AbstractCharClass$LazyJavaLetter__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyJavaLetter_computeValue = $this => {
    let $chCl;
    $chCl = jur_AbstractCharClass$LazyJavaLetter$1__init_0($this);
    $chCl.$mayContainSupplCodepoints0 = 1;
    return $chCl;
},
ji_Flushable = $rt_classWithoutFields(0);
function jur_DecomposedCharSet() {
    let a = this; jur_JointSet.call(a);
    a.$readCharsForCodePoint = 0;
    a.$decomposedCharUTF160 = null;
    a.$decomposedChar0 = null;
    a.$decomposedCharLength0 = 0;
}
let jur_DecomposedCharSet__init_ = ($this, $decomposedChar, $decomposedCharLength) => {
    jur_JointSet__init_($this);
    $this.$readCharsForCodePoint = 1;
    $this.$decomposedChar0 = $decomposedChar;
    $this.$decomposedCharLength0 = $decomposedCharLength;
},
jur_DecomposedCharSet__init_0 = (var_0, var_1) => {
    let var_2 = new jur_DecomposedCharSet();
    jur_DecomposedCharSet__init_(var_2, var_0, var_1);
    return var_2;
},
jur_DecomposedCharSet_setNext = ($this, $next) => {
    $this.$next1 = $next;
},
jur_DecomposedCharSet_matches = ($this, $strIndex, $testString, $matchResult) => {
    let $decCodePoint, $readCodePoints, $rightBound, $curChar, var$8, $decCurCodePoint, var$10, var$11, var$12, var$13, var$14, var$15;
    $decCodePoint = $rt_createIntArray(4);
    $readCodePoints = 0;
    $rightBound = $matchResult.$getRightBound();
    if ($strIndex >= $rightBound)
        return (-1);
    $curChar = $this.$codePointAt($strIndex, $testString, $rightBound);
    var$8 = $strIndex + $this.$readCharsForCodePoint | 0;
    $decCurCodePoint = jur_Lexer_getDecomposition($curChar);
    if ($decCurCodePoint === null) {
        var$10 = $decCodePoint.data;
        var$11 = 1;
        var$10[$readCodePoints] = $curChar;
    } else {
        var$11 = $decCurCodePoint.data.length;
        jl_System_fastArraycopy($decCurCodePoint, 0, $decCodePoint, 0, var$11);
        var$11 = $readCodePoints + var$11 | 0;
    }
    a: {
        if (var$8 < $rightBound) {
            var$12 = $this.$codePointAt(var$8, $testString, $rightBound);
            while (var$11 < 4) {
                if (!jur_Lexer_hasDecompositionNonNullCanClass(var$12)) {
                    var$10 = $decCodePoint.data;
                    var$13 = var$11 + 1 | 0;
                    var$10[var$11] = var$12;
                } else {
                    var$10 = (jur_Lexer_getDecomposition(var$12)).data;
                    if (var$10.length != 2) {
                        var$14 = $decCodePoint.data;
                        var$13 = var$11 + 1 | 0;
                        var$14[var$11] = var$10[0];
                    } else {
                        var$14 = $decCodePoint.data;
                        var$12 = var$11 + 1 | 0;
                        var$14[var$11] = var$10[0];
                        var$13 = var$12 + 1 | 0;
                        var$14[var$12] = var$10[1];
                    }
                }
                var$8 = var$8 + $this.$readCharsForCodePoint | 0;
                if (var$8 >= $rightBound) {
                    var$11 = var$13;
                    break a;
                }
                var$12 = $this.$codePointAt(var$8, $testString, $rightBound);
                var$11 = var$13;
            }
        }
    }
    if (var$11 != $this.$decomposedCharLength0)
        return (-1);
    var$15 = 0;
    while (true) {
        if (var$15 >= var$11)
            return $this.$next1.$matches(var$8, $testString, $matchResult);
        if ($decCodePoint.data[var$15] != $this.$decomposedChar0.data[var$15])
            break;
        var$15 = var$15 + 1 | 0;
    }
    return (-1);
},
jur_DecomposedCharSet_getDecomposedChar = $this => {
    let $strBuff, $i;
    if ($this.$decomposedCharUTF160 === null) {
        $strBuff = jl_StringBuilder__init_();
        $i = 0;
        while ($i < $this.$decomposedCharLength0) {
            $strBuff.$append10(jl_Character_toChars($this.$decomposedChar0.data[$i]));
            $i = $i + 1 | 0;
        }
        $this.$decomposedCharUTF160 = $strBuff.$toString();
    }
    return $this.$decomposedCharUTF160;
},
jur_DecomposedCharSet_codePointAt = ($this, $strIndex, $testString, $rightBound) => {
    let $curChar, var$5, $low, $curCodePointUTF16;
    $this.$readCharsForCodePoint = 1;
    if ($strIndex >= ($rightBound - 1 | 0))
        $curChar = $testString.$charAt($strIndex);
    else {
        var$5 = $strIndex + 1 | 0;
        $curChar = $testString.$charAt($strIndex);
        $low = $testString.$charAt(var$5);
        if (jl_Character_isSurrogatePair($curChar, $low)) {
            $curCodePointUTF16 = $rt_createCharArrayFromData([$curChar, $low]);
            $curChar = jl_Character_codePointAt($curCodePointUTF16, 0);
            $this.$readCharsForCodePoint = 2;
        }
    }
    return $curChar;
},
jur_DecomposedCharSet_first = ($this, $set) => {
    let var$2, var$3;
    a: {
        if ($set instanceof jur_DecomposedCharSet) {
            var$2 = $set;
            if (!(jur_DecomposedCharSet_getDecomposedChar(var$2)).$equals(jur_DecomposedCharSet_getDecomposedChar($this))) {
                var$3 = 0;
                break a;
            }
        }
        var$3 = 1;
    }
    return var$3;
},
jur_DecomposedCharSet_hasConsumed = ($this, $matchResult) => {
    return 1;
},
jur_CIDecomposedCharSet = $rt_classWithoutFields(jur_DecomposedCharSet),
jur_CIDecomposedCharSet__init_ = ($this, $decomp, $decomposedCharLength) => {
    jur_DecomposedCharSet__init_($this, $decomp, $decomposedCharLength);
},
jur_CIDecomposedCharSet__init_0 = (var_0, var_1) => {
    let var_2 = new jur_CIDecomposedCharSet();
    jur_CIDecomposedCharSet__init_(var_2, var_0, var_1);
    return var_2;
},
ag_Path$FillType = $rt_classWithoutFields(jl_Enum),
ag_Path$FillType_WINDING = null,
ag_Path$FillType_EVEN_ODD = null,
ag_Path$FillType_INVERSE_WINDING = null,
ag_Path$FillType_INVERSE_EVEN_ODD = null,
ag_Path$FillType_$VALUES = null,
ag_Path$FillType_$callClinit = () => {
    ag_Path$FillType_$callClinit = $rt_eraseClinit(ag_Path$FillType);
    ag_Path$FillType__clinit_();
},
ag_Path$FillType__init_0 = (var$0, var$1, var$2) => {
    ag_Path$FillType_$callClinit();
    jl_Enum__init_(var$0, var$1, var$2);
},
ag_Path$FillType__init_ = (var_0, var_1) => {
    let var_2 = new ag_Path$FillType();
    ag_Path$FillType__init_0(var_2, var_0, var_1);
    return var_2;
},
ag_Path$FillType_$values = () => {
    let var$1, var$2;
    ag_Path$FillType_$callClinit();
    var$1 = $rt_createArray(ag_Path$FillType, 4);
    var$2 = var$1.data;
    var$2[0] = ag_Path$FillType_WINDING;
    var$2[1] = ag_Path$FillType_EVEN_ODD;
    var$2[2] = ag_Path$FillType_INVERSE_WINDING;
    var$2[3] = ag_Path$FillType_INVERSE_EVEN_ODD;
    return var$1;
},
ag_Path$FillType__clinit_ = () => {
    ag_Path$FillType_WINDING = ag_Path$FillType__init_($rt_s(253), 0);
    ag_Path$FillType_EVEN_ODD = ag_Path$FillType__init_($rt_s(254), 1);
    ag_Path$FillType_INVERSE_WINDING = ag_Path$FillType__init_($rt_s(255), 2);
    ag_Path$FillType_INVERSE_EVEN_ODD = ag_Path$FillType__init_($rt_s(256), 3);
    ag_Path$FillType_$VALUES = ag_Path$FillType_$values();
},
jur_AheadFSet = $rt_classWithoutFields(jur_FSet),
jur_AheadFSet__init_ = $this => {
    jur_FSet__init_($this, (-1));
},
jur_AheadFSet__init_0 = () => {
    let var_0 = new jur_AheadFSet();
    jur_AheadFSet__init_(var_0);
    return var_0;
},
jur_AheadFSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    return $stringIndex;
},
jur_NonCapJointSet = $rt_classWithoutFields(jur_JointSet),
jur_NonCapJointSet__init_ = ($this, $children, $fSet) => {
    jur_JointSet__init_0($this, $children, $fSet);
},
jur_NonCapJointSet__init_0 = (var_0, var_1) => {
    let var_2 = new jur_NonCapJointSet();
    jur_NonCapJointSet__init_(var_2, var_0, var_1);
    return var_2;
},
jur_NonCapJointSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $start, $size, $i, $e, $shift;
    $start = $matchResult.$getConsumed($this.$groupIndex);
    $matchResult.$setConsumed($this.$groupIndex, $stringIndex);
    $size = $this.$children.$size();
    $i = 0;
    while (true) {
        if ($i >= $size) {
            $matchResult.$setConsumed($this.$groupIndex, $start);
            return (-1);
        }
        $e = $this.$children.$get4($i);
        $shift = $e.$matches($stringIndex, $testString, $matchResult);
        if ($shift >= 0)
            break;
        $i = $i + 1 | 0;
    }
    return $shift;
},
jur_NonCapJointSet_hasConsumed = ($this, $matchResult) => {
    let $cons;
    $cons = $matchResult.$getConsumed($this.$groupIndex);
    return !$cons ? 0 : 1;
},
jur_AtomicJointSet = $rt_classWithoutFields(jur_NonCapJointSet),
jur_AtomicJointSet__init_ = ($this, $children, $fSet) => {
    jur_NonCapJointSet__init_($this, $children, $fSet);
},
jur_AtomicJointSet__init_0 = (var_0, var_1) => {
    let var_2 = new jur_AtomicJointSet();
    jur_AtomicJointSet__init_(var_2, var_0, var_1);
    return var_2;
},
jur_AtomicJointSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $start, $size, $i, $e, $shift;
    $start = $matchResult.$getConsumed($this.$groupIndex);
    $matchResult.$setConsumed($this.$groupIndex, $stringIndex);
    $size = $this.$children.$size();
    $i = 0;
    while ($i < $size) {
        $e = $this.$children.$get4($i);
        $shift = $e.$matches($stringIndex, $testString, $matchResult);
        if ($shift >= 0)
            return $this.$next1.$matches($this.$fSet.$getIndex(), $testString, $matchResult);
        $i = $i + 1 | 0;
    }
    $matchResult.$setConsumed($this.$groupIndex, $start);
    return (-1);
},
jur_AtomicJointSet_setNext = ($this, $next) => {
    $this.$next1 = $next;
},
jur_PositiveLookAhead = $rt_classWithoutFields(jur_AtomicJointSet),
jur_PositiveLookAhead__init_ = ($this, $children, $fSet) => {
    jur_AtomicJointSet__init_($this, $children, $fSet);
},
jur_PositiveLookAhead__init_0 = (var_0, var_1) => {
    let var_2 = new jur_PositiveLookAhead();
    jur_PositiveLookAhead__init_(var_2, var_0, var_1);
    return var_2;
},
jur_PositiveLookAhead_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $size, $i, $e, $shift;
    $size = $this.$children.$size();
    $i = 0;
    while ($i < $size) {
        $e = $this.$children.$get4($i);
        $shift = $e.$matches($stringIndex, $testString, $matchResult);
        if ($shift >= 0)
            return $this.$next1.$matches($stringIndex, $testString, $matchResult);
        $i = $i + 1 | 0;
    }
    return (-1);
},
jur_PositiveLookAhead_hasConsumed = ($this, $matchResult) => {
    return 0;
},
jur_NegativeLookAhead = $rt_classWithoutFields(jur_AtomicJointSet),
jur_NegativeLookAhead__init_ = ($this, $children, $fSet) => {
    jur_AtomicJointSet__init_($this, $children, $fSet);
},
jur_NegativeLookAhead__init_0 = (var_0, var_1) => {
    let var_2 = new jur_NegativeLookAhead();
    jur_NegativeLookAhead__init_(var_2, var_0, var_1);
    return var_2;
},
jur_NegativeLookAhead_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $size, $i, $e;
    $size = $this.$children.$size();
    $i = 0;
    while (true) {
        if ($i >= $size)
            return $this.$next1.$matches($stringIndex, $testString, $matchResult);
        $e = $this.$children.$get4($i);
        if ($e.$matches($stringIndex, $testString, $matchResult) >= 0)
            break;
        $i = $i + 1 | 0;
    }
    return (-1);
},
jur_NegativeLookAhead_hasConsumed = ($this, $matchResult) => {
    return 0;
},
ccra_z = $rt_classWithoutFields(0),
otj_JSObject = $rt_classWithoutFields(0),
otjt_ArrayBufferView = $rt_classWithoutFields(),
otjt_TypedArray = $rt_classWithoutFields(otjt_ArrayBufferView);
let jl_UnsupportedOperationException = $rt_classWithoutFields(jl_RuntimeException),
jl_UnsupportedOperationException__init_ = $this => {
    jl_RuntimeException__init_($this);
},
jl_UnsupportedOperationException__init_0 = () => {
    let var_0 = new jl_UnsupportedOperationException();
    jl_UnsupportedOperationException__init_(var_0);
    return var_0;
},
jn_ReadOnlyBufferException = $rt_classWithoutFields(jl_UnsupportedOperationException),
jn_ReadOnlyBufferException__init_0 = $this => {
    jl_UnsupportedOperationException__init_($this);
},
jn_ReadOnlyBufferException__init_ = () => {
    let var_0 = new jn_ReadOnlyBufferException();
    jn_ReadOnlyBufferException__init_0(var_0);
    return var_0;
};
function ccrgb_ai() {
    let a = this; jl_Object.call(a);
    a.$a33 = null;
    a.$b3 = null;
    a.$c6 = 0;
    a.$d4 = 0;
    a.$e5 = 0;
    a.$f0 = null;
    a.$g1 = 0;
    a.$h = null;
}
let ccrgb_ai__init_ = (var$0, var$1, var$2, var$3) => {
    var$0.$h = var$1;
    jl_Object__init_(var$0);
    var$1 = jn_ByteBuffer_allocateDirect(var$2 * 32 | 0);
    jn_ByteBuffer_order(var$1, jn_ByteOrder_nativeOrder());
    var$0.$a33 = var$1.$asFloatBuffer();
    if (var$3 <= 0)
        var$0.$b3 = null;
    else {
        var$1 = jn_ByteBuffer_allocateDirect(var$3 * 2 | 0);
        jn_ByteBuffer_order(var$1, jn_ByteOrder_nativeOrder());
        var$0.$b3 = var$1.$asShortBuffer();
    }
    var$0.$d4 = 0;
},
ccrgb_ai__init_0 = (var_0, var_1, var_2) => {
    let var_3 = new ccrgb_ai();
    ccrgb_ai__init_(var_3, var_0, var_1, var_2);
    return var_3;
},
ccrgb_ai_a0 = var$0 => {
    ccrgb_t_j();
    if (var$0.$f0 === null) {
        var$0.$f0 = $rt_createIntArray(1);
        ao_GLES20_glGenBuffers(1, var$0.$f0, 0);
        ccrgb_t_k();
    }
    var$0.$g1 = var$0.$g1 + 1 | 0;
    if (var$0.$g1 > 0)
        var$0.$g1 = 0;
    ao_GLES20_glBindBuffer(34962, var$0.$f0.data[var$0.$g1]);
    ao_GLES20_glBufferData(34962, var$0.$e5 * 4 | 0, var$0.$a33, 35040);
    ao_GLES20_glVertexAttribPointer(var$0.$h.$j0.$a35.$a29, 2, 5126, 0, 32, 0);
    ccrgb_t_j();
    ao_GLES20_glVertexAttribPointer(var$0.$h.$j0.$b6.$a29, 2, 5126, 0, 32, 8);
    ccrgb_t_j();
    ao_GLES20_glVertexAttribPointer(var$0.$h.$j0.$c4.$a29, 4, 5126, 0, 32, 16);
    ccrgb_t_j();
},
ccrgb_ai_a1 = (var$0, var$1) => {
    if (var$0.$b3 === null)
        ao_GLES20_glDrawArrays(4, 0, var$1);
    else
        ao_GLES20_glDrawElements(4, var$1, 5123, 0);
},
ccrgb_ai_a = (var$0, var$1, var$2) => {
    var$0.$a33.$clear();
    var$0.$a33.$put0(var$1, 0, var$2);
    var$0.$a33.$flip();
    var$0.$e5 = var$2;
},
ccrgb_ai_c = var$0 => {
    ao_GLES20_glDisableVertexAttribArray(var$0.$h.$j0.$b6.$a29);
    ao_GLES20_glDisableVertexAttribArray(var$0.$h.$j0.$c4.$a29);
    ao_GLES20_glBindBuffer(34963, 0);
},
jlr_Array = $rt_classWithoutFields(),
jlr_Array_getLength = $array => {
    let $cls;
    $cls = jl_Class_getClassInfo(jl_Object_getClass($array));
    if ($cls[$rt_meta].itemType !== null)
        return $rt_arrayLength($array);
    $rt_throw(jl_IllegalArgumentException__init_());
},
jlr_Array_newInstance = ($componentType, $length) => {
    let $cls;
    if ($componentType === null)
        $rt_throw(jl_NullPointerException__init_0());
    if ($componentType === $rt_cls($rt_voidcls))
        $rt_throw(jl_IllegalArgumentException__init_());
    if ($length < 0)
        $rt_throw(jl_NegativeArraySizeException__init_0());
    $cls = jl_Class_getClassInfo($componentType);
    return otrr_ClassInfo_newArrayInstance($cls, $length);
};
function ccrgb_ag() {
    let a = this; jl_Object.call(a);
    a.$a31 = null;
    a.$b11 = null;
    a.$c5 = 0;
    a.$d1 = 0;
    a.$e2 = 0;
    a.$f2 = null;
    a.$g3 = 0;
    a.$h1 = null;
    a.$i = null;
    a.$j0 = null;
    a.$k2 = null;
    a.$m = 0;
    a.$n0 = 0;
    a.$o1 = 0.0;
    a.$p1 = 0.0;
    a.$q1 = 0.0;
    a.$r = 0.0;
}
let ccrgb_ag__init_ = (var$0, var$1) => {
    let var$2, var$3, var$4, var$5, var$6, var$7, var$8, var$9, var$10;
    jl_Object__init_(var$0);
    var$0.$h1 = ccrgb_f__init_0();
    var$0.$i = ccrgb_ah__init_0();
    var$0.$j0 = var$0.$i;
    var$0.$m = 1;
    var$0.$n0 = (-1);
    var$0.$o1 = 1.0;
    var$0.$p1 = 1.0;
    var$0.$q1 = 1.0;
    var$0.$r = 1.0;
    var$0.$f2 = var$1;
    var$0.$d1 = 80;
    var$0.$e2 = 0;
    var$0.$b11 = $rt_createFloatArray((var$0.$d1 * 4 | 0) * 8 | 0);
    var$0.$a31 = ccrgb_ai__init_0(var$0, var$0.$d1 * 4 | 0, var$0.$d1 * 6 | 0);
    var$0.$c5 = 0;
    var$2 = $rt_createShortArray(var$0.$d1 * 6 | 0);
    var$3 = var$2.data;
    var$4 = var$3.length;
    var$5 = 0;
    var$6 = 0;
    while (var$5 < var$4) {
        var$7 = var$5 + 0 | 0;
        var$8 = (var$6 + 0 | 0) << 16 >> 16;
        var$3[var$7] = var$8;
        var$3[var$5 + 1 | 0] = (var$6 + 1 | 0) << 16 >> 16;
        var$7 = var$5 + 2 | 0;
        var$9 = (var$6 + 2 | 0) << 16 >> 16;
        var$3[var$7] = var$9;
        var$3[var$5 + 3 | 0] = var$9;
        var$3[var$5 + 4 | 0] = (var$6 + 3 | 0) << 16 >> 16;
        var$3[var$5 + 5 | 0] = var$8;
        var$5 = var$5 + 6 | 0;
        var$6 = (var$6 + 4 | 0) << 16 >> 16;
    }
    var$10 = var$0.$a31;
    var$10.$b3.$clear();
    var$10.$b3.$put1(var$2, 0, var$4);
    var$10.$b3.$flip();
    var$10.$d4 = var$4;
    var$2 = $rt_createIntArray(1);
    var$3 = var$2.data;
    ao_GLES20_glGenBuffers(1, var$2, 0);
    var$10.$c6 = var$3[0];
    ccrgb_t_k();
    var$10.$b3.$position0(0);
    ao_GLES20_glBindBuffer(34963, var$10.$c6);
    ao_GLES20_glBufferData(34963, var$4 * 2 | 0, var$10.$b3, 35044);
    ao_GLES20_glBindBuffer(34963, 0);
    ccrgb_t_j();
    var$0.$g3 = ccrgb_t_a0(var$1, var$0.$j0.$f1, $rt_s(257), $rt_s(258));
    ccrgb_t_k();
},
ccrgb_ag__init_0 = var_0 => {
    let var_1 = new ccrgb_ag();
    ccrgb_ag__init_(var_1, var_0);
    return var_1;
},
ccrgb_ag_a = var$0 => {
    if (var$0.$e2 > 0) {
        ccrgb_t_j();
        ccrgb_ai_a(var$0.$a31, var$0.$b11, var$0.$c5);
        ccrgb_ai_a0(var$0.$a31);
        ccrgb_t_j();
        ccrgb_ai_a1(var$0.$a31, var$0.$e2 * 6 | 0);
        ao_GLES20_glBindBuffer(34962, 0);
        ccrgb_t_j();
        var$0.$e2 = 0;
        var$0.$c5 = 0;
    }
},
ccrgb_ag_b = var$0 => {
    ccrgb_ag_a(var$0);
    var$0.$k2 = null;
    ccrgb_ai_c(var$0.$a31);
};
function ccrgb_ah() {
    let a = this; jl_Object.call(a);
    a.$a35 = null;
    a.$b6 = null;
    a.$c4 = null;
    a.$d3 = null;
    a.$e4 = null;
    a.$f1 = null;
}
let ccrgb_ah__init_ = var$0 => {
    let var$1, var$2;
    jl_Object__init_(var$0);
    var$0.$a35 = ccrgb_u__init_($rt_s(259));
    var$0.$b6 = ccrgb_u__init_($rt_s(260));
    var$0.$c4 = ccrgb_u__init_($rt_s(261));
    var$0.$d3 = ccrgb_z__init_($rt_s(262));
    var$0.$e4 = ccrgb_z__init_($rt_s(263));
    var$1 = $rt_createArray(ccrgb_x, 5);
    var$2 = var$1.data;
    var$2[0] = var$0.$a35;
    var$2[1] = var$0.$b6;
    var$2[2] = var$0.$c4;
    var$2[3] = var$0.$d3;
    var$2[4] = var$0.$e4;
    var$0.$f1 = var$1;
},
ccrgb_ah__init_0 = () => {
    let var_0 = new ccrgb_ah();
    ccrgb_ah__init_(var_0);
    return var_0;
};
function ccrgb_ae() {
    let a = this; jl_Object.call(a);
    a.$a43 = null;
    a.$b15 = 0;
}
let ccrgb_ae__init_ = var$0 => {
    jl_Object__init_(var$0);
    var$0.$a43 = $rt_createIntArray(8);
    var$0.$b15 = 0;
},
ccrgb_ae__init_0 = () => {
    let var_0 = new ccrgb_ae();
    ccrgb_ae__init_(var_0);
    return var_0;
},
ao_GLES20$LogSink = $rt_classWithoutFields(0),
r_Bootstrap$1 = $rt_classWithoutFields(),
r_Bootstrap$1__init_ = var$0 => {
    jl_Object__init_(var$0);
},
r_Bootstrap$1__init_0 = () => {
    let var_0 = new r_Bootstrap$1();
    r_Bootstrap$1__init_(var_0);
    return var_0;
},
r_Bootstrap$1_log = (var$0, var$1) => {
    let var$2;
    var$2 = jl_StringBuilder__init_();
    jl_StringBuilder_append(jl_StringBuilder_append(var$2, $rt_s(264)), var$1);
    r_Bootstrap_domLog$js_body$_3($rt_ustr(jl_StringBuilder_toString(var$2)));
};
function ccrgb_as() {
    let a = this; jl_Object.call(a);
    a.$a32 = null;
    a.$b5 = null;
    a.$c8 = 0;
    a.$d2 = 0;
    a.$e1 = null;
    a.$f = 0;
    a.$g2 = null;
}
let ccrgb_as__init_ = (var$0, var$1, var$2) => {
    var$0.$g2 = var$1;
    jl_Object__init_(var$0);
    var$1 = jn_ByteBuffer_allocateDirect(var$2 * 32 | 0);
    jn_ByteBuffer_order(var$1, jn_ByteOrder_nativeOrder());
    var$0.$a32 = var$1.$asFloatBuffer();
    var$0.$b5 = null;
    var$0.$c8 = 0;
},
ccrgb_as__init_0 = (var_0, var_1) => {
    let var_2 = new ccrgb_as();
    ccrgb_as__init_(var_2, var_0, var_1);
    return var_2;
},
ccrgb_as_a1 = var$0 => {
    ccrgb_t_j();
    if (var$0.$e1 === null) {
        var$0.$e1 = $rt_createIntArray(1);
        ao_GLES20_glGenBuffers(1, var$0.$e1, 0);
        ccrgb_t_k();
    }
    var$0.$f = var$0.$f + 1 | 0;
    if (var$0.$f > 0)
        var$0.$f = 0;
    ao_GLES20_glBindBuffer(34962, var$0.$e1.data[var$0.$f]);
    ao_GLES20_glBufferData(34962, var$0.$d2 * 4 | 0, var$0.$a32, 35040);
    ao_GLES20_glVertexAttribPointer(var$0.$g2.$k0.$a38.$a29, 2, 5126, 0, 32, 0);
    ccrgb_t_j();
    ccrgb_t_j();
    ao_GLES20_glVertexAttribPointer(var$0.$g2.$k0.$b7.$a29, 4, 5126, 0, 32, 16);
    ccrgb_t_j();
},
ccrgb_as_a0 = (var$0, var$1, var$2) => {
    if (var$0.$b5 === null)
        ao_GLES20_glDrawArrays(var$1, 0, var$2);
    else {
        var$0.$b5.$position0(0);
        ao_GLES20_glDrawElements0(var$1, var$2, 5123, var$0.$b5);
    }
},
ccrgb_as_a = (var$0, var$1, var$2) => {
    var$0.$a32.$clear();
    var$0.$a32.$put0(var$1, 0, var$2);
    var$0.$a32.$flip();
    var$0.$d2 = var$2;
},
ccrgb_as_b = var$0 => {
    ao_GLES20_glDisableVertexAttribArray(var$0.$g2.$k0.$b7.$a29);
};
function otcit_DoubleAnalyzer$Result() {
    let a = this; jl_Object.call(a);
    a.$mantissa = Long_ZERO;
    a.$exponent = 0;
    a.$sign0 = 0;
}
let otcit_DoubleAnalyzer$Result__init_0 = $this => {
    jl_Object__init_($this);
},
otcit_DoubleAnalyzer$Result__init_ = () => {
    let var_0 = new otcit_DoubleAnalyzer$Result();
    otcit_DoubleAnalyzer$Result__init_0(var_0);
    return var_0;
};
function ccrgb_aq() {
    let a = this; jl_Object.call(a);
    a.$a34 = null;
    a.$b12 = null;
    a.$c2 = 0;
    a.$d6 = 0;
    a.$e3 = 0;
    a.$f3 = 0;
    a.$g4 = null;
    a.$h3 = 0;
    a.$i2 = null;
    a.$j2 = null;
    a.$k0 = null;
    a.$l1 = null;
    a.$n1 = 0;
    a.$o2 = 0;
    a.$p2 = 0;
    a.$q2 = 0.0;
    a.$r1 = 0.0;
    a.$s0 = 0.0;
    a.$t2 = 0.0;
    a.$u0 = 0.0;
    a.$v0 = 0.0;
    a.$w0 = 0.0;
}
let ccrgb_aq__init_ = (var$0, var$1) => {
    jl_Object__init_(var$0);
    var$0.$f3 = 0;
    var$0.$i2 = ccrgb_e__init_0();
    var$0.$j2 = ccrgb_ar__init_0();
    var$0.$k0 = var$0.$j2;
    var$0.$n1 = 1;
    var$0.$p2 = (-1);
    var$0.$q2 = 1.0;
    var$0.$r1 = 1.0;
    var$0.$s0 = 1.0;
    var$0.$t2 = 1.0;
    var$0.$u0 = 0.0;
    var$0.$v0 = 0.0;
    var$0.$w0 = 1.0;
    var$0.$g4 = var$1;
    var$0.$e3 = 1280;
    var$0.$b12 = $rt_createFloatArray(var$0.$e3 + 20 | 0);
    var$0.$a34 = ccrgb_as__init_0(var$0, var$0.$e3 + 20 | 0);
    var$0.$c2 = 0;
    var$0.$d6 = 0;
    var$0.$h3 = ccrgb_t_a0(var$1, var$0.$k0.$e6, $rt_s(265), $rt_s(266));
    ccrgb_t_k();
},
ccrgb_aq__init_0 = var_0 => {
    let var_1 = new ccrgb_aq();
    ccrgb_aq__init_(var_1, var_0);
    return var_1;
},
ccrgb_aq_a = var$0 => {
    if (var$0.$c2 > 0) {
        ccrgb_t_j();
        ccrgb_as_a(var$0.$a34, var$0.$b12, var$0.$c2);
        ccrgb_as_a1(var$0.$a34);
        ccrgb_t_j();
        ccrgb_as_a0(var$0.$a34, var$0.$o2, var$0.$c2);
        ao_GLES20_glBindBuffer(34962, 0);
        ccrgb_t_j();
        var$0.$c2 = 0;
        var$0.$d6 = 0;
    }
},
ccrgb_aq_b = var$0 => {
    ccrgb_aq_a(var$0);
    var$0.$l1 = null;
    ccrgb_as_b(var$0.$a34);
    ccrgb_t_j();
};
function ccrgb_ar() {
    let a = this; jl_Object.call(a);
    a.$a38 = null;
    a.$b7 = null;
    a.$c7 = null;
    a.$d7 = null;
    a.$e6 = null;
}
let ccrgb_ar__init_ = var$0 => {
    let var$1, var$2;
    jl_Object__init_(var$0);
    var$0.$a38 = ccrgb_u__init_($rt_s(259));
    var$0.$b7 = ccrgb_u__init_($rt_s(261));
    var$0.$c7 = ccrgb_z__init_($rt_s(262));
    var$0.$d7 = ccrgb_z__init_($rt_s(263));
    var$1 = $rt_createArray(ccrgb_x, 4);
    var$2 = var$1.data;
    var$2[0] = var$0.$a38;
    var$2[1] = var$0.$b7;
    var$2[2] = var$0.$c7;
    var$2[3] = var$0.$d7;
    var$0.$e6 = var$1;
},
ccrgb_ar__init_0 = () => {
    let var_0 = new ccrgb_ar();
    ccrgb_ar__init_(var_0);
    return var_0;
},
ccrgb_an = $rt_classWithoutFields(0),
jur_AbstractCharClass$LazyJavaDigit = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyJavaDigit__init_ = $this => {
    jur_AbstractCharClass$LazyCharClass__init_($this);
},
jur_AbstractCharClass$LazyJavaDigit__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazyJavaDigit();
    jur_AbstractCharClass$LazyJavaDigit__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyJavaDigit_computeValue = $this => {
    let $chCl;
    $chCl = jur_AbstractCharClass$LazyJavaDigit$1__init_0($this);
    $chCl.$mayContainSupplCodepoints0 = 1;
    return $chCl;
},
jl_Iterable = $rt_classWithoutFields(0),
ju_Collection = $rt_classWithoutFields(0),
ju_AbstractCollection = $rt_classWithoutFields(),
ju_AbstractCollection__init_ = $this => {
    jl_Object__init_($this);
},
ju_AbstractCollection_toArray = ($this, $a) => {
    let var$2, $i, var$4, $iter;
    var$2 = $a.data;
    $i = $this.$size();
    var$4 = var$2.length;
    if (var$4 < $i)
        $a = jlr_Array_newInstance(jl_Class_getComponentType(jl_Object_getClass($a)), $i);
    else
        while ($i < var$4) {
            var$2[$i] = null;
            $i = $i + 1 | 0;
        }
    $i = 0;
    $iter = $this.$iterator();
    while ($iter.$hasNext()) {
        var$2 = $a.data;
        var$4 = $i + 1 | 0;
        var$2[$i] = $iter.$next();
        $i = var$4;
    }
    return $a;
},
otci_IntegerUtil = $rt_classWithoutFields(),
otci_IntegerUtil_toUnsignedLogRadixString = ($value, $radixLog2) => {
    let $radix, $mask, $sz, $chars, $pos, $target, var$9, $target_0;
    if (!$value)
        return $rt_s(267);
    $radix = 1 << $radixLog2;
    $mask = $radix - 1 | 0;
    $sz = (((32 - jl_Integer_numberOfLeadingZeros($value) | 0) + $radixLog2 | 0) - 1 | 0) / $radixLog2 | 0;
    $chars = $rt_createCharArray($sz);
    $pos = $rt_imul($sz - 1 | 0, $radixLog2);
    $target = 0;
    while ($pos >= 0) {
        var$9 = $chars.data;
        $target_0 = $target + 1 | 0;
        var$9[$target] = jl_Character_forDigit(($value >>> $pos | 0) & $mask, $radix);
        $pos = $pos - $radixLog2 | 0;
        $target = $target_0;
    }
    return jl_String__init_($chars);
},
jn_IntBuffer = $rt_classWithoutFields(jn_Buffer);
function jur_LeafQuantifierSet() {
    jur_QuantifierSet.call(this);
    this.$leaf = null;
}
let jur_LeafQuantifierSet__init_ = ($this, $innerSet, $next, $type) => {
    jur_QuantifierSet__init_($this, $innerSet, $next, $type);
    $this.$leaf = $innerSet;
},
jur_LeafQuantifierSet__init_0 = (var_0, var_1, var_2) => {
    let var_3 = new jur_LeafQuantifierSet();
    jur_LeafQuantifierSet__init_(var_3, var_0, var_1, var_2);
    return var_3;
},
jur_LeafQuantifierSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $i, var$5;
    $i = 0;
    a: {
        while (($stringIndex + $this.$leaf.$charCount() | 0) <= $matchResult.$getRightBound()) {
            var$5 = $this.$leaf.$accepts($stringIndex, $testString);
            if (var$5 <= 0)
                break a;
            $stringIndex = $stringIndex + var$5 | 0;
            $i = $i + 1 | 0;
        }
    }
    while (true) {
        if ($i < 0)
            return (-1);
        var$5 = $this.$next1.$matches($stringIndex, $testString, $matchResult);
        if (var$5 >= 0)
            break;
        $stringIndex = $stringIndex - $this.$leaf.$charCount() | 0;
        $i = $i + (-1) | 0;
    }
    return var$5;
},
jur_AltQuantifierSet = $rt_classWithoutFields(jur_LeafQuantifierSet),
jur_AltQuantifierSet__init_ = ($this, $innerSet, $next, $type) => {
    jur_LeafQuantifierSet__init_($this, $innerSet, $next, $type);
},
jur_AltQuantifierSet__init_0 = (var_0, var_1, var_2) => {
    let var_3 = new jur_AltQuantifierSet();
    jur_AltQuantifierSet__init_(var_3, var_0, var_1, var_2);
    return var_3;
},
jur_AltQuantifierSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $shift;
    $shift = $this.$innerSet.$matches($stringIndex, $testString, $matchResult);
    if ($shift < 0)
        $shift = $this.$next1.$matches($stringIndex, $testString, $matchResult);
    return $shift;
},
jur_AltQuantifierSet_setNext = ($this, $next) => {
    jur_AbstractSet_setNext($this, $next);
    $this.$innerSet.$setNext($next);
},
jur_PossessiveAltQuantifierSet = $rt_classWithoutFields(jur_AltQuantifierSet),
jur_PossessiveAltQuantifierSet__init_ = ($this, $innerSet, $next, $type) => {
    jur_AltQuantifierSet__init_($this, $innerSet, $next, $type);
},
jur_PossessiveAltQuantifierSet__init_0 = (var_0, var_1, var_2) => {
    let var_3 = new jur_PossessiveAltQuantifierSet();
    jur_PossessiveAltQuantifierSet__init_(var_3, var_0, var_1, var_2);
    return var_3;
},
jur_PossessiveAltQuantifierSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let var$4;
    if (($stringIndex + $this.$leaf.$charCount() | 0) <= $matchResult.$getRightBound()) {
        var$4 = $this.$leaf.$accepts($stringIndex, $testString);
        if (var$4 >= 1)
            $stringIndex = $stringIndex + var$4 | 0;
    }
    return $this.$next1.$matches($stringIndex, $testString, $matchResult);
};
function ccrgb_ac() {
    let a = this; jl_Object.call(a);
    a.$a36 = 0.0;
    a.$b9 = 0;
    a.$c9 = null;
}
let ccrgb_ac__init_ = var$0 => {
    jl_Object__init_(var$0);
    var$0.$a36 = 1.0;
    var$0.$b9 = (-1);
    ag_Paint$Style_$callClinit();
    var$0.$c9 = ag_Paint$Style_FILL;
},
ccrgb_ac__init_0 = () => {
    let var_0 = new ccrgb_ac();
    ccrgb_ac__init_(var_0);
    return var_0;
},
ccrgb_ad = $rt_classWithoutFields(0),
ccrgb_ab = $rt_classWithoutFields(0);
function ccrgb_aa() {
    jl_Object.call(this);
    this.$a42 = null;
}
let ccrgb_aa__init_ = var$0 => {
    jl_Object__init_(var$0);
    var$0.$a42 = $rt_createIntArray(1);
},
ccrgb_aa__init_0 = () => {
    let var_0 = new ccrgb_aa();
    ccrgb_aa__init_(var_0);
    return var_0;
},
ccrgb_aa_a = (var$0, var$1) => {
    ao_GLES20_glGenBuffers(1, var$1, 0);
    ccrgb_t_j();
},
otjc_JSObjects = $rt_classWithoutFields(),
otji_JS = $rt_classWithoutFields(),
otji_JS_function = (var$1, var$2) => {
    if (var$1 === null || var$1 === undefined) {
        return null;
    }
    let name = 'jso$functor$' + var$2;
    let result = var$1[name];
    if (typeof result !== 'function') {
        let fn = function() {
            return var$1[var$2].apply(var$1, arguments);
        };
        result = () => fn;
        var$1[name] = result;
    }
    return result();
};
function jur_AbstractCharClass$LazyJavaUnicodeIdentifierStart$1() {
    jur_AbstractCharClass.call(this);
    this.$this$033 = null;
}
let jur_AbstractCharClass$LazyJavaUnicodeIdentifierStart$1__init_ = ($this, var$1) => {
    $this.$this$033 = var$1;
    jur_AbstractCharClass__init_($this);
},
jur_AbstractCharClass$LazyJavaUnicodeIdentifierStart$1__init_0 = var_0 => {
    let var_1 = new jur_AbstractCharClass$LazyJavaUnicodeIdentifierStart$1();
    jur_AbstractCharClass$LazyJavaUnicodeIdentifierStart$1__init_(var_1, var_0);
    return var_1;
},
jur_AbstractCharClass$LazyJavaUnicodeIdentifierStart$1_contains = ($this, $ch) => {
    return jl_Character_isUnicodeIdentifierStart($ch);
},
otciu_UnicodeHelper = $rt_classWithoutFields(),
otciu_UnicodeHelper_decodeIntPairsDiff = $text => {
    let $flow, $sz, $data, $j, $lastKey, $lastValue, $i, var$9, var$10;
    $flow = otci_CharFlow__init_0($text.$toCharArray());
    $sz = otci_Base46_decodeUnsigned($flow);
    $data = $rt_createIntArray($sz * 2 | 0);
    $j = 0;
    $lastKey = 0;
    $lastValue = 0;
    $i = 0;
    while ($i < $sz) {
        var$9 = $data.data;
        $lastKey = $lastKey + otci_Base46_decode($flow) | 0;
        $lastValue = $lastValue + otci_Base46_decode($flow) | 0;
        var$10 = $j + 1 | 0;
        var$9[$j] = $lastKey;
        $j = var$10 + 1 | 0;
        var$9[var$10] = $lastValue;
        $i = $i + 1 | 0;
    }
    return $data;
},
otciu_UnicodeHelper_decodeCaseMapping = $text => {
    let $flow, $sz, $data, $last, $i, var$7, var$8;
    $flow = otci_CharFlow__init_0($text.$toCharArray());
    $sz = otci_Base46_decodeUnsigned($flow);
    $data = $rt_createIntArray($sz * 2 | 0);
    $last = 0;
    $i = 0;
    while ($i < $sz) {
        var$7 = $data.data;
        $last = $last + otci_Base46_decodeUnsigned($flow) | 0;
        var$8 = $i * 2 | 0;
        var$7[var$8] = $last;
        var$7[var$8 + 1 | 0] = otci_Base46_decode($flow);
        $i = $i + 1 | 0;
    }
    return $data;
},
otciu_UnicodeHelper_createCharMapping = $data => {
    let $result, $last, $lastValue, $i, var$6, var$7, $key, $value, var$10;
    $result = $rt_createIntArray(65536);
    $last = 0;
    $lastValue = 0;
    $i = 0;
    a: {
        while (true) {
            var$6 = $data.data;
            if ($i >= var$6.length)
                break a;
            var$7 = $result.data;
            $key = var$6[$i];
            $value = var$6[$i + 1 | 0];
            var$10 = var$7.length;
            if ($key < var$10)
                var$10 = $key;
            else if ($key == $last)
                break;
            ju_Arrays_fill0($result, $last, var$10, $lastValue);
            $i = $i + 2 | 0;
            $last = var$10;
            $lastValue = $value;
        }
    }
    return otciu_CharMapping__init_0($data, $result);
},
otciu_UnicodeHelper_decodeByte = $c => {
    if ($c > 92)
        return (($c - 32 | 0) - 2 | 0) << 24 >> 24;
    if ($c <= 34)
        return ($c - 32 | 0) << 24 >> 24;
    return (($c - 32 | 0) - 1 | 0) << 24 >> 24;
},
otciu_UnicodeHelper_extractRle = $encoded => {
    let $ranges, $buffer, $index, $rangeIndex, $codePoint, $i, $b, $count, $pos, $j, $digit, var$13, var$14, var$15, var$16, var$17, var$18, $chunk;
    $ranges = $rt_createArray(otciu_UnicodeHelper$Range, 16384);
    $buffer = $rt_createByteArray(16384);
    $index = 0;
    $rangeIndex = 0;
    $codePoint = 0;
    $i = 0;
    while ($i < $encoded.$length()) {
        $b = otciu_UnicodeHelper_decodeByte($encoded.$charAt($i));
        if ($b == 64) {
            $i = $i + 1 | 0;
            $b = otciu_UnicodeHelper_decodeByte($encoded.$charAt($i));
            $count = 0;
            $pos = 1;
            $j = 0;
            while ($j < 3) {
                $i = $i + 1 | 0;
                $digit = otciu_UnicodeHelper_decodeByte($encoded.$charAt($i));
                $count = $count | $rt_imul($pos, $digit);
                $pos = $pos * 64 | 0;
                $j = $j + 1 | 0;
            }
        } else if ($b < 32)
            $count = 1;
        else {
            $b = ($b - 32 | 0) << 24 >> 24;
            $i = $i + 1 | 0;
            $count = otciu_UnicodeHelper_decodeByte($encoded.$charAt($i));
        }
        if (!$b && $count >= 128) {
            if ($index > 0) {
                var$13 = $ranges.data;
                var$14 = $rangeIndex + 1 | 0;
                var$13[$rangeIndex] = otciu_UnicodeHelper$Range__init_0($codePoint, $codePoint + $index | 0, ju_Arrays_copyOf($buffer, $index));
                $rangeIndex = var$14;
            }
            $codePoint = $codePoint + ($index + $count | 0) | 0;
            $index = 0;
        } else
            while ($count > 0) {
                var$14 = $buffer.data.length;
                if ($index != var$14)
                    var$15 = $index;
                else {
                    var$13 = $ranges.data;
                    var$16 = $rangeIndex + 1 | 0;
                    var$17 = new otciu_UnicodeHelper$Range;
                    var$18 = $codePoint + $index | 0;
                    otciu_UnicodeHelper$Range__init_(var$17, $codePoint, var$18, ju_Arrays_copyOf($buffer, $index));
                    var$13[$rangeIndex] = var$17;
                    var$15 = 0;
                    $rangeIndex = var$16;
                    $codePoint = var$18;
                }
                $chunk = jl_Math_min($count, var$14 - var$15 | 0);
                $index = var$15 + $chunk | 0;
                ju_Arrays_fill1($buffer, var$15, $index, $b);
                $count = $count - $chunk | 0;
            }
        $i = $i + 1 | 0;
    }
    if ($index <= 0)
        var$14 = $rangeIndex;
    else {
        var$13 = $ranges.data;
        var$14 = $rangeIndex + 1 | 0;
        var$13[$rangeIndex] = otciu_UnicodeHelper$Range__init_0($codePoint, $codePoint + $index | 0, ju_Arrays_copyOf($buffer, $index));
    }
    return ju_Arrays_copyOf0($ranges, var$14);
},
otp_PlatformRunnable = $rt_classWithoutFields(0);
function jl_Object$monitorEnterWait$lambda$_6_0() {
    let a = this; jl_Object.call(a);
    a.$_00 = null;
    a.$_1 = null;
    a.$_2 = 0;
    a.$_3 = null;
}
let jl_Object$monitorEnterWait$lambda$_6_0__init_ = (var$0, var$1, var$2, var$3, var$4) => {
    jl_Object__init_(var$0);
    var$0.$_00 = var$1;
    var$0.$_1 = var$2;
    var$0.$_2 = var$3;
    var$0.$_3 = var$4;
},
jl_Object$monitorEnterWait$lambda$_6_0__init_0 = (var_0, var_1, var_2, var_3) => {
    let var_4 = new jl_Object$monitorEnterWait$lambda$_6_0();
    jl_Object$monitorEnterWait$lambda$_6_0__init_(var_4, var_0, var_1, var_2, var_3);
    return var_4;
},
jl_Object$monitorEnterWait$lambda$_6_0_run = var$0 => {
    jl_Object_lambda$monitorEnterWait$0(var$0.$_00, var$0.$_1, var$0.$_2, var$0.$_3);
},
ju_Objects = $rt_classWithoutFields(),
ju_Objects_hashCode = $o => {
    return $o !== null ? $o.$hashCode0() : 0;
},
ju_Objects_requireNonNull = $obj => {
    return ju_Objects_requireNonNull0($obj, $rt_s(13));
},
ju_Objects_requireNonNull0 = ($obj, $message) => {
    if ($obj !== null)
        return $obj;
    $rt_throw(jl_NullPointerException__init_($message));
},
ju_Objects_checkFromIndexSize = ($fromIndex, $size, $length) => {
    if ($fromIndex >= 0 && $size >= 0 && $size <= ($length - $fromIndex | 0))
        return $fromIndex;
    $rt_throw(jl_IndexOutOfBoundsException__init_());
},
otjc_JSUndefined = $rt_classWithoutFields(),
jur_AbstractCharClass$LazyAlnum = $rt_classWithoutFields(jur_AbstractCharClass$LazyAlpha),
jur_AbstractCharClass$LazyAlnum__init_ = $this => {
    jur_AbstractCharClass$LazyAlpha__init_($this);
},
jur_AbstractCharClass$LazyAlnum__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazyAlnum();
    jur_AbstractCharClass$LazyAlnum__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyAlnum_computeValue = $this => {
    return (jur_AbstractCharClass$LazyAlpha_computeValue($this)).$add1(48, 57);
},
jur_AbstractCharClass$LazyGraph = $rt_classWithoutFields(jur_AbstractCharClass$LazyAlnum),
jur_AbstractCharClass$LazyGraph__init_ = $this => {
    jur_AbstractCharClass$LazyAlnum__init_($this);
},
jur_AbstractCharClass$LazyGraph__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazyGraph();
    jur_AbstractCharClass$LazyGraph__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyGraph_computeValue = $this => {
    return (((jur_AbstractCharClass$LazyAlnum_computeValue($this)).$add1(33, 64)).$add1(91, 96)).$add1(123, 126);
},
jur_AbstractCharClass$LazyPrint = $rt_classWithoutFields(jur_AbstractCharClass$LazyGraph),
jur_AbstractCharClass$LazyPrint__init_ = $this => {
    jur_AbstractCharClass$LazyGraph__init_($this);
},
jur_AbstractCharClass$LazyPrint__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazyPrint();
    jur_AbstractCharClass$LazyPrint__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyPrint_computeValue = $this => {
    return (jur_AbstractCharClass$LazyGraph_computeValue($this)).$add0(32);
},
jur_AbstractCharClass$LazyJavaSpaceChar = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyJavaSpaceChar__init_ = $this => {
    jur_AbstractCharClass$LazyCharClass__init_($this);
},
jur_AbstractCharClass$LazyJavaSpaceChar__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazyJavaSpaceChar();
    jur_AbstractCharClass$LazyJavaSpaceChar__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyJavaSpaceChar_computeValue = $this => {
    return jur_AbstractCharClass$LazyJavaSpaceChar$1__init_0($this);
},
jur_PositiveLookBehind = $rt_classWithoutFields(jur_AtomicJointSet),
jur_PositiveLookBehind__init_ = ($this, $children, $fSet) => {
    jur_AtomicJointSet__init_($this, $children, $fSet);
},
jur_PositiveLookBehind__init_0 = (var_0, var_1) => {
    let var_2 = new jur_PositiveLookBehind();
    jur_PositiveLookBehind__init_(var_2, var_0, var_1);
    return var_2;
},
jur_PositiveLookBehind_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $size, $leftBound, $shift, $i, $e;
    $size = $this.$children.$size();
    $leftBound = !$matchResult.$hasTransparentBounds() ? $matchResult.$getLeftBound() : 0;
    a: {
        $shift = $this.$next1.$matches($stringIndex, $testString, $matchResult);
        if ($shift >= 0) {
            $matchResult.$setConsumed($this.$groupIndex, $stringIndex);
            $i = 0;
            while (true) {
                if ($i >= $size)
                    break a;
                $e = $this.$children.$get4($i);
                if ($e.$findBack($leftBound, $stringIndex, $testString, $matchResult) >= 0) {
                    $matchResult.$setConsumed($this.$groupIndex, (-1));
                    return $shift;
                }
                $i = $i + 1 | 0;
            }
        }
    }
    return (-1);
},
jur_PositiveLookBehind_hasConsumed = ($this, $matchResult) => {
    return 0;
},
aa_Application = $rt_classWithoutFields();
function jur_SequenceSet() {
    let a = this; jur_LeafSet.call(a);
    a.$string = null;
    a.$leftToRight = null;
    a.$rightToLeft = null;
}
let jur_SequenceSet__init_ = ($this, $substring) => {
    let $j;
    jur_LeafSet__init_($this);
    $this.$string = $substring.$toString();
    $this.$charCount0 = $substring.$length();
    $this.$leftToRight = jur_SequenceSet$IntHash__init_($this.$charCount0);
    $this.$rightToLeft = jur_SequenceSet$IntHash__init_($this.$charCount0);
    $j = 0;
    while ($j < ($this.$charCount0 - 1 | 0)) {
        $this.$leftToRight.$put2($this.$string.$charAt($j), ($this.$charCount0 - $j | 0) - 1 | 0);
        $this.$rightToLeft.$put2($this.$string.$charAt(($this.$charCount0 - $j | 0) - 1 | 0), ($this.$charCount0 - $j | 0) - 1 | 0);
        $j = $j + 1 | 0;
    }
},
jur_SequenceSet__init_0 = var_0 => {
    let var_1 = new jur_SequenceSet();
    jur_SequenceSet__init_(var_1, var_0);
    return var_1;
},
jur_SequenceSet_accepts = ($this, $strIndex, $testString) => {
    return !$this.$startsWith($testString, $strIndex) ? (-1) : $this.$charCount0;
},
jur_SequenceSet_find = ($this, $strIndex, $testString, $matchResult) => {
    let $strLength, var$5;
    $strLength = $matchResult.$getRightBound();
    while (true) {
        if ($strIndex > $strLength)
            return (-1);
        var$5 = $this.$indexOf($testString, $strIndex, $strLength);
        if (var$5 < 0)
            return (-1);
        if ($this.$next1.$matches(var$5 + $this.$charCount0 | 0, $testString, $matchResult) >= 0)
            break;
        $strIndex = var$5 + 1 | 0;
    }
    return var$5;
},
jur_SequenceSet_findBack = ($this, $strIndex, $lastIndex, $testString, $matchResult) => {
    let var$5;
    while (true) {
        if ($lastIndex < $strIndex)
            return (-1);
        var$5 = $this.$lastIndexOf($testString, $strIndex, $lastIndex);
        if (var$5 < 0)
            return (-1);
        if ($this.$next1.$matches(var$5 + $this.$charCount0 | 0, $testString, $matchResult) >= 0)
            break;
        $lastIndex = var$5 + (-1) | 0;
    }
    return var$5;
},
jur_SequenceSet_first = ($this, $set) => {
    let var$2, var$3, var$4, var$5, var$6;
    if ($set instanceof jur_CharSet)
        return $set.$getChar() != $this.$string.$charAt(0) ? 0 : 1;
    if ($set instanceof jur_RangeSet)
        return $set.$accepts(0, $this.$string.$substring(0, 1)) <= 0 ? 0 : 1;
    if (!($set instanceof jur_SupplRangeSet)) {
        if (!($set instanceof jur_SupplCharSet))
            return 1;
        a: {
            if ($this.$string.$length() > 1) {
                var$2 = $set;
                var$3 = var$2.$getCodePoint();
                var$4 = $this.$string.$charAt(0);
                var$2 = $this.$string;
                var$5 = var$2.$charAt(1);
                if (var$3 == jl_Character_toCodePoint(var$4, var$5)) {
                    var$4 = 1;
                    break a;
                }
            }
            var$4 = 0;
        }
        return var$4;
    }
    b: {
        c: {
            var$2 = $set;
            if (!var$2.$contains($this.$string.$charAt(0))) {
                var$6 = $this.$string;
                if (var$6.$length() <= 1)
                    break c;
                var$6 = $this.$string;
                var$4 = jl_Character_toCodePoint(var$6.$charAt(0), $this.$string.$charAt(1));
                if (!var$2.$contains(var$4))
                    break c;
            }
            var$4 = 1;
            break b;
        }
        var$4 = 0;
    }
    return var$4;
},
jur_SequenceSet_indexOf = ($this, $str, $i, $to) => {
    let $last, $ch;
    $last = $this.$string.$charAt($this.$charCount0 - 1 | 0);
    while (true) {
        if ($i > ($to - $this.$charCount0 | 0))
            return (-1);
        $ch = $str.$charAt(($i + $this.$charCount0 | 0) - 1 | 0);
        if ($ch == $last && $this.$startsWith($str, $i))
            break;
        $i = $i + $this.$leftToRight.$get5($ch) | 0;
    }
    return $i;
},
jur_SequenceSet_lastIndexOf = ($this, $str, $to, $i) => {
    let $first, $size, $delta, $ch;
    $first = $this.$string.$charAt(0);
    $size = $str.$length();
    $delta = ($size - $i | 0) - $this.$charCount0 | 0;
    if ($delta <= 0)
        $i = $i + $delta | 0;
    while (true) {
        if ($i < $to)
            return (-1);
        $ch = $str.$charAt($i);
        if ($ch == $first && $this.$startsWith($str, $i))
            break;
        $i = $i - $this.$rightToLeft.$get5($ch) | 0;
    }
    return $i;
},
jur_SequenceSet_startsWith = ($this, $str, $from) => {
    let $i;
    $i = 0;
    while ($i < $this.$charCount0) {
        if ($str.$charAt($i + $from | 0) != $this.$string.$charAt($i))
            return 0;
        $i = $i + 1 | 0;
    }
    return 1;
},
jl_ArrayStoreException = $rt_classWithoutFields(jl_RuntimeException),
jl_ArrayStoreException__init_0 = $this => {
    jl_RuntimeException__init_($this);
},
jl_ArrayStoreException__init_ = () => {
    let var_0 = new jl_ArrayStoreException();
    jl_ArrayStoreException__init_0(var_0);
    return var_0;
},
ju_SequencedCollection = $rt_classWithoutFields(0),
jur_AltGroupQuantifierSet = $rt_classWithoutFields(jur_GroupQuantifierSet),
jur_AltGroupQuantifierSet__init_ = ($this, $innerSet, $next, $type) => {
    jur_GroupQuantifierSet__init_($this, $innerSet, $next, $type);
},
jur_AltGroupQuantifierSet__init_0 = (var_0, var_1, var_2) => {
    let var_3 = new jur_AltGroupQuantifierSet();
    jur_AltGroupQuantifierSet__init_(var_3, var_0, var_1, var_2);
    return var_3;
},
jur_AltGroupQuantifierSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $nextIndex;
    if (!$this.$innerSet.$hasConsumed($matchResult))
        return $this.$next1.$matches($stringIndex, $testString, $matchResult);
    $nextIndex = $this.$innerSet.$matches($stringIndex, $testString, $matchResult);
    if ($nextIndex >= 0)
        return $nextIndex;
    return $this.$next1.$matches($stringIndex, $testString, $matchResult);
},
jur_AltGroupQuantifierSet_setNext = ($this, $next) => {
    jur_AbstractSet_setNext($this, $next);
    $this.$innerSet.$setNext($next);
},
jur_MatchResult = $rt_classWithoutFields(0);
function jur_MatchResultImpl() {
    let a = this; jl_Object.call(a);
    a.$groupBounds = null;
    a.$consumers = null;
    a.$compQuantCounters = null;
    a.$string3 = null;
    a.$groupCount0 = 0;
    a.$valid = 0;
    a.$leftBound0 = 0;
    a.$rightBound0 = 0;
    a.$startIndex = 0;
    a.$transparentBounds = 0;
    a.$anchoringBounds = 0;
    a.$hitEnd = 0;
    a.$requireEnd = 0;
    a.$previousMatch = 0;
    a.$mode1 = 0;
    a.$namedGroups1 = null;
}
let jur_MatchResultImpl__init_ = ($this, $string, $leftBound, $rightBound, $groupCount, $compQuantCount, $consumersCount, $namedGroups) => {
    let var$8;
    jl_Object__init_($this);
    $this.$previousMatch = (-1);
    var$8 = $groupCount + 1 | 0;
    $this.$groupCount0 = var$8;
    $this.$groupBounds = $rt_createIntArray(var$8 * 2 | 0);
    $this.$namedGroups1 = $namedGroups;
    $this.$consumers = $rt_createIntArray($consumersCount);
    ju_Arrays_fill($this.$consumers, (-1));
    if ($compQuantCount > 0)
        $this.$compQuantCounters = $rt_createIntArray($compQuantCount);
    ju_Arrays_fill($this.$groupBounds, (-1));
    $this.$reset($string, $leftBound, $rightBound);
},
jur_MatchResultImpl__init_0 = (var_0, var_1, var_2, var_3, var_4, var_5, var_6) => {
    let var_7 = new jur_MatchResultImpl();
    jur_MatchResultImpl__init_(var_7, var_0, var_1, var_2, var_3, var_4, var_5, var_6);
    return var_7;
},
jur_MatchResultImpl_setConsumed = ($this, $counter, $value) => {
    $this.$consumers.data[$counter] = $value;
},
jur_MatchResultImpl_getConsumed = ($this, $counter) => {
    return $this.$consumers.data[$counter];
},
jur_MatchResultImpl_end = $this => {
    return $this.$end(0);
},
jur_MatchResultImpl_end0 = ($this, $group) => {
    jur_MatchResultImpl_checkGroup($this, $group);
    return $this.$groupBounds.data[($group * 2 | 0) + 1 | 0];
},
jur_MatchResultImpl_setStart = ($this, $group, $offset) => {
    $this.$groupBounds.data[$group * 2 | 0] = $offset;
},
jur_MatchResultImpl_setEnd = ($this, $group, $offset) => {
    $this.$groupBounds.data[($group * 2 | 0) + 1 | 0] = $offset;
},
jur_MatchResultImpl_getStart = ($this, $group) => {
    return $this.$groupBounds.data[$group * 2 | 0];
},
jur_MatchResultImpl_getEnd = ($this, $group) => {
    return $this.$groupBounds.data[($group * 2 | 0) + 1 | 0];
},
jur_MatchResultImpl_getGroupNoCheck = ($this, $group) => {
    let $st, $end;
    $st = $this.$getStart($group);
    $end = $this.$getEnd($group);
    if (($end | $st | ($end - $st | 0)) >= 0 && $end <= $this.$string3.$length())
        return ($this.$string3.$subSequence($st, $end)).$toString();
    return null;
},
jur_MatchResultImpl_start = $this => {
    return $this.$start(0);
},
jur_MatchResultImpl_start0 = ($this, $group) => {
    jur_MatchResultImpl_checkGroup($this, $group);
    return $this.$groupBounds.data[$group * 2 | 0];
},
jur_MatchResultImpl_finalizeMatch = $this => {
    if ($this.$groupBounds.data[0] == (-1)) {
        $this.$groupBounds.data[0] = $this.$startIndex;
        $this.$groupBounds.data[1] = $this.$startIndex;
    }
    $this.$previousMatch = $this.$end0();
},
jur_MatchResultImpl_getEnterCounter = ($this, $setCounter) => {
    return $this.$compQuantCounters.data[$setCounter];
},
jur_MatchResultImpl_setEnterCounter = ($this, $setCounter, $value) => {
    $this.$compQuantCounters.data[$setCounter] = $value;
},
jur_MatchResultImpl_checkGroup = ($this, $group) => {
    if (!$this.$valid)
        $rt_throw(jl_IllegalStateException__init_0());
    if ($group >= 0 && $group < $this.$groupCount0)
        return;
    $rt_throw(jl_IndexOutOfBoundsException__init_1(jl_String_valueOf0($group)));
},
jur_MatchResultImpl_setValid = $this => {
    $this.$valid = 1;
},
jur_MatchResultImpl_isValid = $this => {
    return $this.$valid;
},
jur_MatchResultImpl_reset0 = ($this, $newSequence, $leftBound, $rightBound) => {
    $this.$valid = 0;
    $this.$mode1 = 2;
    ju_Arrays_fill($this.$groupBounds, (-1));
    ju_Arrays_fill($this.$consumers, (-1));
    if ($newSequence !== null)
        $this.$string3 = $newSequence;
    if ($leftBound >= 0)
        jur_MatchResultImpl_setBounds($this, $leftBound, $rightBound);
    $this.$startIndex = $this.$leftBound0;
},
jur_MatchResultImpl_reset = $this => {
    $this.$reset(null, (-1), (-1));
},
jur_MatchResultImpl_setBounds = ($this, $leftBound, $rightBound) => {
    $this.$leftBound0 = $leftBound;
    $this.$rightBound0 = $rightBound;
},
jur_MatchResultImpl_setStartIndex = ($this, $startIndex) => {
    $this.$startIndex = $startIndex;
    if ($this.$previousMatch >= 0)
        $startIndex = $this.$previousMatch;
    $this.$previousMatch = $startIndex;
},
jur_MatchResultImpl_getLeftBound = $this => {
    return $this.$leftBound0;
},
jur_MatchResultImpl_getRightBound = $this => {
    return $this.$rightBound0;
},
jur_MatchResultImpl_setMode = ($this, $mode) => {
    $this.$mode1 = $mode;
},
jur_MatchResultImpl_mode = $this => {
    return $this.$mode1;
},
jur_MatchResultImpl_useAnchoringBounds = ($this, $value) => {
    $this.$anchoringBounds = $value;
},
jur_MatchResultImpl_hasAnchoringBounds = $this => {
    return $this.$anchoringBounds;
},
jur_MatchResultImpl_hasTransparentBounds = $this => {
    return $this.$transparentBounds;
},
jur_MatchResultImpl_getPreviousMatchEnd = $this => {
    return $this.$previousMatch;
};
function jur_UCIRangeSet() {
    let a = this; jur_LeafSet.call(a);
    a.$chars1 = null;
    a.$alt2 = 0;
}
let jur_UCIRangeSet__init_ = ($this, $cc) => {
    jur_LeafSet__init_($this);
    $this.$chars1 = $cc.$getInstance();
    $this.$alt2 = $cc.$alt;
},
jur_UCIRangeSet__init_0 = var_0 => {
    let var_1 = new jur_UCIRangeSet();
    jur_UCIRangeSet__init_(var_1, var_0);
    return var_1;
},
jur_UCIRangeSet_accepts = ($this, $strIndex, $testString) => {
    let var$3, var$4;
    var$3 = $this.$chars1;
    var$4 = jl_Character_toUpperCase($testString.$charAt($strIndex));
    return !var$3.$contains(jl_Character_toLowerCase(var$4)) ? (-1) : 1;
},
jl_AutoCloseable = $rt_classWithoutFields(0),
ji_Closeable = $rt_classWithoutFields(0),
ji_OutputStream = $rt_classWithoutFields(),
ji_OutputStream__init_ = $this => {
    jl_Object__init_($this);
};
function ji_FilterOutputStream() {
    ji_OutputStream.call(this);
    this.$out0 = null;
}
let ji_FilterOutputStream__init_ = ($this, $out) => {
    ji_OutputStream__init_($this);
    $this.$out0 = $out;
},
ji_FilterOutputStream__init_0 = var_0 => {
    let var_1 = new ji_FilterOutputStream();
    ji_FilterOutputStream__init_(var_1, var_0);
    return var_1;
};
function ji_PrintStream() {
    let a = this; ji_FilterOutputStream.call(a);
    a.$autoFlush = 0;
    a.$sb = null;
    a.$buffer0 = null;
    a.$charset = null;
}
let ji_PrintStream__init_ = ($this, $out, $autoFlush, $charset) => {
    ji_FilterOutputStream__init_($this, $out);
    $this.$sb = jl_StringBuilder__init_();
    $this.$buffer0 = $rt_createCharArray(32);
    $this.$autoFlush = $autoFlush;
    $this.$charset = $charset;
},
ji_PrintStream__init_0 = (var_0, var_1, var_2) => {
    let var_3 = new ji_PrintStream();
    ji_PrintStream__init_(var_3, var_0, var_1, var_2);
    return var_3;
},
otcic_JsConsolePrintStream = $rt_classWithoutFields(ji_PrintStream),
otcic_JsConsolePrintStream__init_ = $this => {
    ji_PrintStream__init_($this, null, 0, null);
},
otcic_JsConsolePrintStream_println = ($this, $s) => {
    $this.$print($s);
    $this.$print($rt_s(268));
},
otcic_JSStdoutPrintStream = $rt_classWithoutFields(otcic_JsConsolePrintStream),
otcic_JSStdoutPrintStream__init_ = $this => {
    otcic_JsConsolePrintStream__init_($this);
},
otcic_JSStdoutPrintStream__init_0 = () => {
    let var_0 = new otcic_JSStdoutPrintStream();
    otcic_JSStdoutPrintStream__init_(var_0);
    return var_0;
},
otcic_JSStdoutPrintStream_print = ($this, $s) => {
    if ($s === null)
        $s = $rt_s(54);
    $rt_putStdout($rt_ustr($s));
};
function jur_AbstractCharClass$LazyJavaJavaIdentifierPart$1() {
    jur_AbstractCharClass.call(this);
    this.$this$06 = null;
}
let jur_AbstractCharClass$LazyJavaJavaIdentifierPart$1__init_ = ($this, $this$0) => {
    $this.$this$06 = $this$0;
    jur_AbstractCharClass__init_($this);
},
jur_AbstractCharClass$LazyJavaJavaIdentifierPart$1__init_0 = var_0 => {
    let var_1 = new jur_AbstractCharClass$LazyJavaJavaIdentifierPart$1();
    jur_AbstractCharClass$LazyJavaJavaIdentifierPart$1__init_(var_1, var_0);
    return var_1;
},
jur_AbstractCharClass$LazyJavaJavaIdentifierPart$1_contains = ($this, $ch) => {
    return jl_Character_isJavaIdentifierPart($ch);
},
otp_Platform = $rt_classWithoutFields(),
otp_Platform_clone = var$1 => {
    let copy = new var$1.constructor();
    for (let field in var$1) {
        if (var$1.hasOwnProperty(field)) {
            copy[field] = var$1[field];
        }
    }
    return copy;
},
otp_Platform_launchThread = var$1 => {
    var$1.$run();
},
otp_Platform_postpone = $runnable => {
    otp_Platform_schedule($runnable, 0);
},
otp_Platform_schedule = (var$1, var$2) => {
    setTimeout(() => {
        otp_Platform_launchThread(var$1);
    }, var$2);
},
jnc_Charset = $rt_classWithoutFields(),
jlr_Reference = $rt_classWithoutFields(),
jlr_WeakReference = $rt_classWithoutFields(jlr_Reference),
ju_NoSuchElementException = $rt_classWithoutFields(jl_RuntimeException),
ju_NoSuchElementException__init_ = $this => {
    jl_RuntimeException__init_($this);
},
ju_NoSuchElementException__init_0 = () => {
    let var_0 = new ju_NoSuchElementException();
    ju_NoSuchElementException__init_(var_0);
    return var_0;
},
jlr_AnnotatedElement = $rt_classWithoutFields(0),
jlr_GenericDeclaration = $rt_classWithoutFields(0),
jur_NegativeLookBehind = $rt_classWithoutFields(jur_AtomicJointSet),
jur_NegativeLookBehind__init_ = ($this, $children, $fSet) => {
    jur_AtomicJointSet__init_($this, $children, $fSet);
},
jur_NegativeLookBehind__init_0 = (var_0, var_1) => {
    let var_2 = new jur_NegativeLookBehind();
    jur_NegativeLookBehind__init_(var_2, var_0, var_1);
    return var_2;
},
jur_NegativeLookBehind_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $size, $i, $e, $shift;
    $size = $this.$children.$size();
    $matchResult.$setConsumed($this.$groupIndex, $stringIndex);
    $i = 0;
    while (true) {
        if ($i >= $size)
            return $this.$next1.$matches($stringIndex, $testString, $matchResult);
        $e = $this.$children.$get4($i);
        $shift = $e.$findBack(0, $stringIndex, $testString, $matchResult);
        if ($shift >= 0)
            break;
        $i = $i + 1 | 0;
    }
    return (-1);
},
jur_NegativeLookBehind_hasConsumed = ($this, $matchResult) => {
    return 0;
},
ccra_ab = $rt_classWithoutFields(0),
jur_BackReferenceSet = $rt_classWithoutFields(jur_CIBackReferenceSet),
jur_BackReferenceSet__init_ = ($this, $groupIndex, $consCounter) => {
    jur_CIBackReferenceSet__init_($this, $groupIndex, $consCounter);
},
jur_BackReferenceSet__init_0 = (var_0, var_1) => {
    let var_2 = new jur_BackReferenceSet();
    jur_BackReferenceSet__init_(var_2, var_0, var_1);
    return var_2;
},
jur_BackReferenceSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $group, $shift;
    $group = $this.$getString($matchResult);
    if ($group !== null && ($stringIndex + $group.$length() | 0) <= $matchResult.$getRightBound()) {
        $shift = !($testString.$toString()).$startsWith0($group, $stringIndex) ? (-1) : $group.$length();
        if ($shift < 0)
            return (-1);
        $matchResult.$setConsumed($this.$consCounter1, $shift);
        return $this.$next1.$matches($stringIndex + $shift | 0, $testString, $matchResult);
    }
    return (-1);
},
jur_BackReferenceSet_find = ($this, $strIndex, $testString, $matchResult) => {
    let $group, $strLength, $testStr, var$7;
    $group = $this.$getString($matchResult);
    $strLength = $matchResult.$getLeftBound();
    if ($group !== null && ($strIndex + $group.$length() | 0) <= $strLength) {
        $testStr = $testString.$toString();
        while (true) {
            if ($strIndex > $strLength)
                return (-1);
            var$7 = $testStr.$indexOf0($group, $strIndex);
            if (var$7 < 0)
                return (-1);
            if ($this.$next1.$matches(var$7 + $group.$length() | 0, $testString, $matchResult) >= 0)
                break;
            $strIndex = var$7 + 1 | 0;
        }
        return var$7;
    }
    return (-1);
},
jur_BackReferenceSet_findBack = ($this, $strIndex, $lastIndex, $testString, $matchResult) => {
    let $group, $testStr, var$7;
    $group = $this.$getString($matchResult);
    if ($group === null)
        return (-1);
    $testStr = $testString.$toString();
    a: {
        while (true) {
            if ($lastIndex < $strIndex)
                return (-1);
            var$7 = $testStr.$lastIndexOf0($group, $lastIndex);
            if (var$7 < 0)
                break a;
            if (var$7 < $strIndex)
                break a;
            if ($this.$next1.$matches(var$7 + $group.$length() | 0, $testString, $matchResult) >= 0)
                break;
            $lastIndex = var$7 + (-1) | 0;
        }
        return var$7;
    }
    return (-1);
},
jur_BackReferenceSet_first = ($this, $set) => {
    return 1;
};
function jur_DotQuantifierSet() {
    jur_QuantifierSet.call(this);
    this.$lt = null;
}
let jur_DotQuantifierSet__init_ = ($this, $innerSet, $next, $type, $lt) => {
    jur_QuantifierSet__init_($this, $innerSet, $next, $type);
    $this.$lt = $lt;
},
jur_DotQuantifierSet__init_0 = (var_0, var_1, var_2, var_3) => {
    let var_4 = new jur_DotQuantifierSet();
    jur_DotQuantifierSet__init_(var_4, var_0, var_1, var_2, var_3);
    return var_4;
},
jur_DotQuantifierSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $strLength, $startSearch;
    $strLength = $matchResult.$getRightBound();
    $startSearch = jur_DotQuantifierSet_findLineTerminator($this, $stringIndex, $strLength, $testString);
    if ($startSearch >= 0)
        $strLength = $startSearch;
    if ($strLength > $stringIndex)
        return $this.$next1.$findBack($stringIndex, $strLength, $testString, $matchResult);
    return $this.$next1.$matches($stringIndex, $testString, $matchResult);
},
jur_DotQuantifierSet_find = ($this, $stringIndex, $testString, $matchResult) => {
    let $strLength, $res, $nextSearch, var$7, $leftBound;
    $strLength = $matchResult.$getRightBound();
    $res = $this.$next1.$find($stringIndex, $testString, $matchResult);
    if ($res < 0)
        return (-1);
    $nextSearch = jur_DotQuantifierSet_findLineTerminator($this, $res, $strLength, $testString);
    if ($nextSearch >= 0)
        $strLength = $nextSearch;
    var$7 = $this.$next1.$findBack($res, $strLength, $testString, $matchResult);
    var$7 = jl_Math_max($res, var$7);
    $leftBound = var$7 > 0 ? jur_DotQuantifierSet_findBackLineTerminator($this, $stringIndex, var$7 - 1 | 0, $testString) : var$7 ? (-1) : 0;
    if ($leftBound >= $stringIndex)
        $stringIndex = $leftBound >= var$7 ? $leftBound : $leftBound + 1 | 0;
    return $stringIndex;
},
jur_DotQuantifierSet_findLineTerminator = ($this, $i, $to, $testString) => {
    while (true) {
        if ($i >= $to)
            return (-1);
        if ($this.$lt.$isLineTerminator($testString.$charAt($i)))
            break;
        $i = $i + 1 | 0;
    }
    return $i;
},
jur_DotQuantifierSet_findBackLineTerminator = ($this, $from, $i, $testString) => {
    while (true) {
        if ($i < $from)
            return (-1);
        if ($this.$lt.$isLineTerminator($testString.$charAt($i)))
            break;
        $i = $i + (-1) | 0;
    }
    return $i;
},
jur_AbstractCharClass$LazyJavaJavaIdentifierPart = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyJavaJavaIdentifierPart__init_ = $this => {
    jur_AbstractCharClass$LazyCharClass__init_($this);
},
jur_AbstractCharClass$LazyJavaJavaIdentifierPart__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazyJavaJavaIdentifierPart();
    jur_AbstractCharClass$LazyJavaJavaIdentifierPart__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyJavaJavaIdentifierPart_computeValue = $this => {
    let $chCl;
    $chCl = jur_AbstractCharClass$LazyJavaJavaIdentifierPart$1__init_0($this);
    $chCl.$mayContainSupplCodepoints0 = 1;
    return $chCl;
},
otcit_FloatAnalyzer = $rt_classWithoutFields(),
otcit_FloatAnalyzer_MAX_MANTISSA = 0,
otcit_FloatAnalyzer_mantissa10Table = null,
otcit_FloatAnalyzer_exp10Table = null,
otcit_FloatAnalyzer_$callClinit = () => {
    otcit_FloatAnalyzer_$callClinit = $rt_eraseClinit(otcit_FloatAnalyzer);
    otcit_FloatAnalyzer__clinit_();
},
otcit_FloatAnalyzer_analyze = ($d, $result) => {
    let $bits, $mantissa, $exponent, var$6, $decExponent, var$8, var$9, $binExponentCorrection, $mantissaShift, $decMantissa, var$13, var$14, var$15, $decMantissaHi, $decMantissaLow, $lowerPos, $upperPos, $posCmp;
    otcit_FloatAnalyzer_$callClinit();
    $bits = jl_Float_floatToIntBits($d);
    $result.$sign1 = !($bits & (-2147483648)) ? 0 : 1;
    $mantissa = $bits & 8388607;
    $exponent = $bits >> 23 & 255;
    if (!$mantissa && !$exponent) {
        $result.$mantissa0 = 0;
        $result.$exponent0 = 0;
        return;
    }
    if ($exponent)
        var$6 = $mantissa | 8388608;
    else {
        var$6 = $mantissa << 1;
        while (Long_eq(Long_and(Long_fromInt(var$6), Long_fromInt(8388608)), Long_ZERO)) {
            var$6 = var$6 << 1;
            $exponent = $exponent + (-1) | 0;
        }
    }
    $decExponent = ju_Arrays_binarySearch(otcit_FloatAnalyzer_exp10Table, $exponent);
    if ($decExponent < 0)
        $decExponent =  -$decExponent | 0;
    var$8 = otcit_FloatAnalyzer_exp10Table.data;
    var$9 = $decExponent + 1 | 0;
    $binExponentCorrection = $exponent - var$8[var$9] | 0;
    $mantissaShift = 9 + $binExponentCorrection | 0;
    $decMantissa = otcit_FloatAnalyzer_mulAndShiftRight(var$6, otcit_FloatAnalyzer_mantissa10Table.data[var$9], $mantissaShift);
    if ($decMantissa < otcit_FloatAnalyzer_MAX_MANTISSA) {
        while ($rt_ucmp($decMantissa, otcit_FloatAnalyzer_MAX_MANTISSA) <= 0) {
            $decExponent = $decExponent + (-1) | 0;
            $decMantissa = ($decMantissa * 10 | 0) + 9 | 0;
        }
        var$8 = otcit_FloatAnalyzer_exp10Table.data;
        var$9 = $decExponent + 1 | 0;
        var$13 = $exponent - var$8[var$9] | 0;
        $mantissaShift = 9 + var$13 | 0;
        $decMantissa = otcit_FloatAnalyzer_mulAndShiftRight(var$6, otcit_FloatAnalyzer_mantissa10Table.data[var$9], $mantissaShift);
    }
    var$9 = var$6 << 1;
    var$6 = var$9 + 1 | 0;
    var$8 = otcit_FloatAnalyzer_mantissa10Table.data;
    var$13 = $decExponent + 1 | 0;
    var$14 = var$8[var$13];
    var$15 = $mantissaShift - 1 | 0;
    $decMantissaHi = otcit_FloatAnalyzer_mulAndShiftRight(var$6, var$14, var$15);
    $decMantissaLow = otcit_FloatAnalyzer_mulAndShiftRight(var$9 - 1 | 0, otcit_FloatAnalyzer_mantissa10Table.data[var$13], var$15);
    $lowerPos = otcit_FloatAnalyzer_findLowerDistance($decMantissa, $decMantissaLow);
    $upperPos = otcit_FloatAnalyzer_findUpperDistance($decMantissa, $decMantissaHi);
    $posCmp = $rt_ucmp($lowerPos, $upperPos);
    var$9 = $posCmp > 0 ? $rt_imul($rt_udiv($decMantissa, $lowerPos), $lowerPos) : $posCmp < 0 ? $rt_imul($rt_udiv($decMantissa, $upperPos), $upperPos) + $upperPos | 0 : $rt_imul($rt_udiv(($decMantissa + ($upperPos / 2 | 0) | 0), $upperPos), $upperPos);
    if (jl_Long_compareUnsigned(Long_fromInt(var$9), Long_fromInt(1000000000)) >= 0)
        while (true) {
            $decExponent = $decExponent + 1 | 0;
            var$9 = $rt_udiv(var$9, 10);
            if ($rt_ucmp(var$9, 1000000000) < 0)
                break;
        }
    else if ($rt_ucmp(var$9, 100000000) < 0) {
        $decExponent = $decExponent + (-1) | 0;
        var$9 = var$9 * 10 | 0;
    }
    $result.$mantissa0 = var$9;
    $result.$exponent0 = $decExponent - 50 | 0;
},
otcit_FloatAnalyzer_findLowerDistance = ($mantissa, $lower) => {
    let $pos, $pos_0, var$5, var$6;
    otcit_FloatAnalyzer_$callClinit();
    $pos = 1;
    while (true) {
        $pos_0 = $pos * 10 | 0;
        var$5 = $rt_udiv($mantissa, $pos_0);
        var$6 = $rt_udiv($lower, $pos_0);
        if ($rt_ucmp(var$5, var$6) <= 0)
            break;
        $pos = $pos_0;
    }
    return $pos;
},
otcit_FloatAnalyzer_findUpperDistance = ($mantissa, $upper) => {
    let $pos, $pos_0, var$5, var$6;
    otcit_FloatAnalyzer_$callClinit();
    $pos = 1;
    while (true) {
        $pos_0 = $pos * 10 | 0;
        var$5 = $rt_udiv($mantissa, $pos_0);
        var$6 = $rt_udiv($upper, $pos_0);
        if ($rt_ucmp(var$5, var$6) >= 0)
            break;
        $pos = $pos_0;
    }
    return $pos;
},
otcit_FloatAnalyzer_mulAndShiftRight = ($a, $b, $shift) => {
    let $result;
    otcit_FloatAnalyzer_$callClinit();
    $result = Long_mul(Long_and(Long_fromInt($a), Long_create(4294967295, 0)), Long_and(Long_fromInt($b), Long_create(4294967295, 0)));
    return Long_lo(Long_shru($result, 32 - $shift | 0));
},
otcit_FloatAnalyzer__clinit_ = () => {
    otcit_FloatAnalyzer_MAX_MANTISSA = $rt_udiv((-1), 10);
    otcit_FloatAnalyzer_mantissa10Table = $rt_createIntArrayFromData([(-18543760), (-873828468), (-1558056233), (-2105438446), (-791721136), (-1492370368), (-2052889754), (-707643228), (-1425108042), (-1999079893), (-621547450), (-1356231419), (-1943978595), (-533385374), (-1285701758), (-1887554866), (-443107408), (-1213479385), (-1829776968), (-350662770), (-1139523676), (-1770612400), (-255999462), (-1063793029), (-1710027882), (-159064234), (-986244846), (-1647989336), (-59802560), (-906835507), (-1584461865),
    (-2126562952), (-825520345), (-1519409735), (-2074521247), (-742253618), (-1452796353), (-2021230542), (-656988489), (-1384584251), (-1966660860), (-569676998), (-1314735058), (-1910781505), (-480270031), (-1243209484), (-1853561046), (-388717296), (-1169967296), (-1794967296), (-294967296), (-1094967296), (-1734967296), (-198967296), (-1018167296), (-1673527296), (-100663296), (-939524096), (-1610612736), (-2147483648), (-858993460), (-1546188227), (-2095944041), (-776530088), (-1480217529), (-2043167483),
    (-692087595), (-1412663535), (-1989124287), (-605618482), (-1343488245), (-1933784055), (-517074110), (-1272652747), (-1877115657), (-426404674), (-1200117198), (-1819087218), (-333559171), (-1125840796), (-1759666096), (-238485376), (-1049781760), (-1698818867), (-141129810), (-971897307), (-1636511305), (-41437710), (-892143627), (-1572708361), (-2117160148), (-810475859), (-1507374147), (-2064892777), (-726848065), (-1440471911), (-2011370988), (-641213203), (-1371964022), (-1956564688)]);
    otcit_FloatAnalyzer_exp10Table = $rt_createIntArrayFromData([(-37), (-34), (-31), (-28), (-24), (-21), (-18), (-14), (-11), (-8), (-4), (-1), 2, 6, 9, 12, 16, 19, 22, 26, 29, 32, 36, 39, 42, 46, 49, 52, 56, 59, 62, 65, 69, 72, 75, 79, 82, 85, 89, 92, 95, 99, 102, 105, 109, 112, 115, 119, 122, 125, 129, 132, 135, 139, 142, 145, 149, 152, 155, 158, 162, 165, 168, 172, 175, 178, 182, 185, 188, 192, 195, 198, 202, 205, 208, 212, 215, 218, 222, 225, 228, 232, 235, 238, 242, 245, 248, 252, 255, 258, 261, 265,
    268, 271, 275, 278, 281, 285, 288, 291]);
},
ag_Color = $rt_classWithoutFields(),
ag_Color_rgb = (var$1, var$2, var$3) => {
    return (-16777216) | (var$1 & 255) << 16 | (var$2 & 255) << 8 | var$3 & 255;
};
function ag_Bitmap() {
    let a = this; jl_Object.call(a);
    a.$source = null;
    a.$element = null;
    a.$context = null;
    a.$width = 0;
    a.$height = 0;
}
let ag_Bitmap__init_0 = (var$0, var$1) => {
    jl_Object__init_(var$0);
    var$0.$element = var$1;
    if (var$1 !== null) {
        var$0.$source = var$1;
        var$0.$width = var$1.width;
        var$0.$height = var$1.height;
    }
},
ag_Bitmap__init_ = var_0 => {
    let var_1 = new ag_Bitmap();
    ag_Bitmap__init_0(var_1, var_0);
    return var_1;
},
ag_Bitmap_fromElement = var$1 => {
    return var$1 === null ? null : ag_Bitmap__init_(var$1);
},
ag_Bitmap_getElement = var$0 => {
    return var$0.$element;
},
ag_Bitmap_getSource = var$0 => {
    return var$0.$source;
},
ag_Bitmap_getContext = var$0 => {
    if (var$0.$context === null && var$0.$element !== null)
        var$0.$context = var$0.$element.getContext("2d");
    return var$0.$context;
},
ag_Bitmap_createCanvasElement = (var$1, var$2) => {
    let var$3, var$4;
    var$3 = window.document;
    var$4 = var$3.createElement("canvas");
    var$3 = jl_Math_max(1, var$1);
    var$4.width = var$3;
    var$3 = jl_Math_max(1, var$2);
    var$4.height = var$3;
    return var$4;
},
ag_Bitmap_createBitmap = (var$1, var$2, var$3) => {
    return ag_Bitmap__init_(ag_Bitmap_createCanvasElement(var$1, var$2));
},
ag_Bitmap_getWidth = var$0 => {
    return var$0.$width;
},
ag_Bitmap_getHeight = var$0 => {
    return var$0.$height;
},
ag_Bitmap_getPixel = (var$0, var$1, var$2) => {
    let var$3, var$4, var$5, var$6;
    if (var$1 >= 0 && var$2 >= 0 && var$1 < var$0.$getWidth() && var$2 < var$0.$getHeight()) {
        var$3 = (var$0.$getContext()).getImageData(var$1, var$2, 1.0, 1.0);
        var$3 = var$3.data;
        var$4 = var$3[0];
        var$5 = var$3[1];
        var$6 = var$3[2];
        var$2 = var$3[3];
        return var$2 << 24 | var$4 << 16 | var$5 << 8 | var$6;
    }
    return 0;
},
jur_UnifiedQuantifierSet = $rt_classWithoutFields(jur_LeafQuantifierSet),
jur_UnifiedQuantifierSet__init_ = ($this, $quant) => {
    jur_LeafQuantifierSet__init_($this, $quant.$getInnerSet(), $quant.$getNext(), $quant.$getType());
    $this.$innerSet.$setNext($this);
},
jur_UnifiedQuantifierSet__init_0 = var_0 => {
    let var_1 = new jur_UnifiedQuantifierSet();
    jur_UnifiedQuantifierSet__init_(var_1, var_0);
    return var_1;
},
jur_UnifiedQuantifierSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let var$4;
    while (($stringIndex + $this.$leaf.$charCount() | 0) <= $matchResult.$getRightBound()) {
        var$4 = $this.$leaf;
        if (var$4.$accepts($stringIndex, $testString) <= 0)
            break;
        $stringIndex = $stringIndex + $this.$leaf.$charCount() | 0;
    }
    return $this.$next1.$matches($stringIndex, $testString, $matchResult);
},
jur_UnifiedQuantifierSet_find = ($this, $stringIndex, $testString, $matchResult) => {
    let $startSearch, $newSearch, $newSearch_0;
    $startSearch = $this.$next1.$find($stringIndex, $testString, $matchResult);
    if ($startSearch < 0)
        return (-1);
    $newSearch = $startSearch - $this.$leaf.$charCount() | 0;
    while ($newSearch >= $stringIndex && $this.$leaf.$accepts($newSearch, $testString) > 0) {
        $newSearch_0 = $newSearch - $this.$leaf.$charCount() | 0;
        $startSearch = $newSearch;
        $newSearch = $newSearch_0;
    }
    return $startSearch;
},
jlr_Type = $rt_classWithoutFields(0);
function jl_Class() {
    let a = this; jl_Object.call(a);
    a.$flags1 = 0;
    a.$classInfo = null;
    a.$name = null;
    a.$simpleName = null;
}
let jl_Class__init_0 = ($this, $classInfo) => {
    jl_Object__init_($this);
    $this.$classInfo = $classInfo;
},
jl_Class__init_ = var_0 => {
    let var_1 = new jl_Class();
    jl_Class__init_0(var_1, var_0);
    return var_1;
},
jl_Class_createClass = $classInfo => {
    return jl_Class__init_($classInfo);
},
jl_Class_getClassInfo = $this => {
    return $this.$classInfo;
},
jl_Class_isInstance = ($this, $obj) => {
    return $obj !== null && jl_Class_isAssignableFrom($this, jl_Object_getClass($obj)) ? 1 : 0;
},
jl_Class_isAssignableFrom = ($this, $obj) => {
    return $rt_isAssignable($obj.$classInfo, $this.$classInfo);
},
jl_Class_getName = $this => {
    let $metadataName, $result, $itemType, $itemName, var$5;
    if (!($this.$flags1 & 1)) {
        $this.$flags1 = $this.$flags1 | 1;
        $metadataName = $this.$classInfo[$rt_meta].name;
        $result = $metadataName === null ? null : $rt_str($metadataName);
        if ($result === null) {
            $itemType = $this.$classInfo[$rt_meta].itemType;
            if ($itemType !== null) {
                $itemName = jl_Class_getName($rt_cls($itemType));
                if ($itemName !== null) {
                    if ($itemType[$rt_meta].itemType !== null) {
                        var$5 = jl_StringBuilder__init_();
                        jl_StringBuilder_append(jl_StringBuilder_append1(var$5, 91), $itemName);
                        $result = jl_StringBuilder_toString(var$5);
                    } else {
                        var$5 = jl_StringBuilder__init_();
                        jl_StringBuilder_append1(jl_StringBuilder_append(jl_StringBuilder_append(var$5, $rt_s(269)), $itemName), 59);
                        $result = jl_StringBuilder_toString(var$5);
                    }
                }
            }
        }
        $this.$name = $result;
    }
    return $this.$name;
},
jl_Class_getSimpleName = $this => {
    let $metadataName, $result, var$3, var$4, $lastDollar, $lastDot;
    if (!($this.$flags1 & 2)) {
        $this.$flags1 = $this.$flags1 | 2;
        $metadataName = $this.$classInfo[$rt_meta].simpleName;
        $result = $metadataName === null ? null : $rt_str($metadataName);
        if ($result === null) {
            if ($this.$classInfo[$rt_meta].itemType !== null) {
                var$3 = jl_Class_getSimpleName($rt_cls($this.$classInfo[$rt_meta].itemType));
                var$4 = jl_StringBuilder__init_();
                jl_StringBuilder_append(jl_StringBuilder_append(var$4, var$3), $rt_s(270));
                $result = jl_StringBuilder_toString(var$4);
            } else if (jl_Class_getEnclosingClass($this) === null) {
                $result = jl_Class_getName($this);
                $lastDollar = $result.$lastIndexOf1(36);
                if ($lastDollar == (-1)) {
                    $lastDot = $result.$lastIndexOf1(46);
                    if ($lastDot != (-1))
                        $result = $result.$substring0($lastDot + 1 | 0);
                } else {
                    $result = $result.$substring0($lastDollar + 1 | 0);
                    if ($result.$charAt(0) >= 48 && $result.$charAt(0) <= 57)
                        $result = $rt_s(13);
                }
            } else if ($result === null)
                $result = $rt_s(13);
        }
        $this.$simpleName = $result;
    }
    return $this.$simpleName;
},
jl_Class_isPrimitive = $this => {
    return !$this.$classInfo[$rt_meta].primitiveKind ? 0 : 1;
},
jl_Class_getComponentType = $this => {
    let $itemTypeInfo;
    $itemTypeInfo = $this.$classInfo[$rt_meta].itemType;
    return $itemTypeInfo === null ? null : $rt_cls($itemTypeInfo);
},
jl_Class_getEnclosingClass = $this => {
    let $enclosingClass;
    $enclosingClass = $this.$classInfo[$rt_meta].enclosingClass;
    return $enclosingClass === null ? null : $rt_cls($enclosingClass);
},
otjt_Int16Array = $rt_classWithoutFields(otjt_TypedArray);
function ju_BitSet() {
    let a = this; jl_Object.call(a);
    a.$data = null;
    a.$length1 = 0;
}
let ju_BitSet__init_0 = $this => {
    jl_Object__init_($this);
    $this.$data = $rt_createIntArray(2);
},
ju_BitSet__init_1 = () => {
    let var_0 = new ju_BitSet();
    ju_BitSet__init_0(var_0);
    return var_0;
},
ju_BitSet__init_ = ($this, $nbits) => {
    jl_Object__init_($this);
    if ($nbits < 0)
        $rt_throw(jl_NegativeArraySizeException__init_0());
    $this.$data = $rt_createIntArray((($nbits + 32 | 0) - 1 | 0) / 32 | 0);
},
ju_BitSet__init_2 = var_0 => {
    let var_1 = new ju_BitSet();
    ju_BitSet__init_(var_1, var_0);
    return var_1;
},
ju_BitSet_set = ($this, $bitIndex) => {
    let $index, var$3;
    if ($bitIndex < 0)
        $rt_throw(jl_IndexOutOfBoundsException__init_());
    $index = $bitIndex / 32 | 0;
    if ($bitIndex >= $this.$length1) {
        ju_BitSet_ensureCapacity($this, $index + 1 | 0);
        $this.$length1 = $bitIndex + 1 | 0;
    }
    var$3 = $this.$data.data;
    var$3[$index] = var$3[$index] | 1 << ($bitIndex % 32 | 0);
},
ju_BitSet_set0 = ($this, $fromIndex, $toIndex) => {
    let var$3, $fromDataIndex, $toDataIndex, var$6, $i;
    if ($fromIndex >= 0) {
        var$3 = $rt_compare($fromIndex, $toIndex);
        if (var$3 <= 0) {
            if (!var$3)
                return;
            $fromDataIndex = $fromIndex / 32 | 0;
            $toDataIndex = $toIndex / 32 | 0;
            if ($toIndex > $this.$length1) {
                ju_BitSet_ensureCapacity($this, $toDataIndex + 1 | 0);
                $this.$length1 = $toIndex;
            }
            if ($fromDataIndex == $toDataIndex) {
                var$6 = $this.$data.data;
                var$6[$fromDataIndex] = var$6[$fromDataIndex] | ju_BitSet_trailingZeroBits($this, $fromIndex) & ju_BitSet_trailingOneBits($this, $toIndex);
            } else {
                var$6 = $this.$data.data;
                var$6[$fromDataIndex] = var$6[$fromDataIndex] | ju_BitSet_trailingZeroBits($this, $fromIndex);
                $i = $fromDataIndex + 1 | 0;
                while ($i < $toDataIndex) {
                    $this.$data.data[$i] = (-1);
                    $i = $i + 1 | 0;
                }
                if ($toIndex & 31) {
                    var$6 = $this.$data.data;
                    var$6[$toDataIndex] = var$6[$toDataIndex] | ju_BitSet_trailingOneBits($this, $toIndex);
                }
            }
            return;
        }
    }
    $rt_throw(jl_IndexOutOfBoundsException__init_());
},
ju_BitSet_trailingZeroBits = ($this, $num) => {
    let var$2;
    var$2 = $num % 32 | 0;
    return (-1) << var$2;
},
ju_BitSet_trailingOneBits = ($this, $num) => {
    let var$2;
    var$2 = $num % 32 | 0;
    return !var$2 ? 0 : (-1) >>> (32 - var$2 | 0) | 0;
},
ju_BitSet_clear0 = ($this, $bitIndex) => {
    let $index, var$3;
    if ($bitIndex < 0)
        $rt_throw(jl_IndexOutOfBoundsException__init_());
    $index = $bitIndex / 32 | 0;
    if ($index < $this.$data.data.length) {
        var$3 = $this.$data.data;
        var$3[$index] = var$3[$index] & jl_Integer_rotateLeft((-2), $bitIndex % 32 | 0);
        if ($bitIndex == ($this.$length1 - 1 | 0))
            ju_BitSet_recalculateLength($this);
    }
},
ju_BitSet_clear = ($this, $fromIndex, $toIndex) => {
    let var$3, $fromDataIndex, $toDataIndex, var$6, $i;
    if ($fromIndex >= 0 && $fromIndex <= $toIndex) {
        if ($fromIndex >= $this.$length1)
            return;
        var$3 = jl_Math_min($this.$length1, $toIndex);
        if ($fromIndex == var$3)
            return;
        $fromDataIndex = $fromIndex / 32 | 0;
        $toDataIndex = var$3 / 32 | 0;
        if ($fromDataIndex == $toDataIndex) {
            var$6 = $this.$data.data;
            var$6[$fromDataIndex] = var$6[$fromDataIndex] & (ju_BitSet_trailingOneBits($this, $fromIndex) | ju_BitSet_trailingZeroBits($this, var$3));
        } else {
            var$6 = $this.$data.data;
            var$6[$fromDataIndex] = var$6[$fromDataIndex] & ju_BitSet_trailingOneBits($this, $fromIndex);
            $i = $fromDataIndex + 1 | 0;
            while ($i < $toDataIndex) {
                $this.$data.data[$i] = 0;
                $i = $i + 1 | 0;
            }
            if (var$3 & 31) {
                var$6 = $this.$data.data;
                var$6[$toDataIndex] = var$6[$toDataIndex] & ju_BitSet_trailingZeroBits($this, var$3);
            }
        }
        ju_BitSet_recalculateLength($this);
        return;
    }
    $rt_throw(jl_IndexOutOfBoundsException__init_());
},
ju_BitSet_get = ($this, $bitIndex) => {
    let $index;
    if ($bitIndex < 0)
        $rt_throw(jl_IndexOutOfBoundsException__init_());
    $index = $bitIndex / 32 | 0;
    return $index < $this.$data.data.length && $this.$data.data[$index] & 1 << ($bitIndex % 32 | 0) ? 1 : 0;
},
ju_BitSet_nextSetBit = ($this, $fromIndex) => {
    let $index, $val, var$4, $top, $i;
    if ($fromIndex < 0)
        $rt_throw(jl_IndexOutOfBoundsException__init_());
    if ($fromIndex >= $this.$length1)
        return (-1);
    $index = $fromIndex / 32 | 0;
    $val = $this.$data.data[$index];
    var$4 = $val >>> ($fromIndex % 32 | 0) | 0;
    if (var$4)
        return jl_Integer_numberOfTrailingZeros(var$4) + $fromIndex | 0;
    $top = ($this.$length1 + 31 | 0) / 32 | 0;
    $i = $index + 1 | 0;
    while ($i < $top) {
        if ($this.$data.data[$i])
            return ($i * 32 | 0) + jl_Integer_numberOfTrailingZeros($this.$data.data[$i]) | 0;
        $i = $i + 1 | 0;
    }
    return (-1);
},
ju_BitSet_nextClearBit = ($this, $fromIndex) => {
    let $index, $val, var$4, $top, $i;
    if ($fromIndex < 0)
        $rt_throw(jl_IndexOutOfBoundsException__init_());
    if ($fromIndex >= $this.$length1)
        return $fromIndex;
    $index = $fromIndex / 32 | 0;
    $val = $this.$data.data[$index] ^ (-1);
    var$4 = $val >>> ($fromIndex % 32 | 0) | 0;
    if (var$4)
        return jl_Integer_numberOfTrailingZeros(var$4) + $fromIndex | 0;
    $top = ($this.$length1 + 31 | 0) / 32 | 0;
    $i = $index + 1 | 0;
    while ($i < $top) {
        if ($this.$data.data[$i] != (-1))
            return ($i * 32 | 0) + jl_Integer_numberOfTrailingZeros($this.$data.data[$i] ^ (-1)) | 0;
        $i = $i + 1 | 0;
    }
    return $this.$length1;
},
ju_BitSet_ensureCapacity = ($this, $capacity) => {
    let $newArrayLength;
    if ($this.$data.data.length >= $capacity)
        return;
    $newArrayLength = jl_Math_max(($capacity * 3 | 0) / 2 | 0, ($this.$data.data.length * 2 | 0) + 1 | 0);
    $this.$data = ju_Arrays_copyOf2($this.$data, $newArrayLength);
},
ju_BitSet_recalculateLength = $this => {
    let $top, $i, $sz;
    $top = ($this.$length1 + 31 | 0) / 32 | 0;
    $this.$length1 = $top * 32 | 0;
    $i = $top - 1 | 0;
    a: {
        while (true) {
            if ($i < 0)
                break a;
            $sz = jl_Integer_numberOfLeadingZeros($this.$data.data[$i]);
            if ($sz < 32)
                break;
            $i = $i + (-1) | 0;
            $this.$length1 = $this.$length1 - 32 | 0;
        }
        $this.$length1 = $this.$length1 - $sz | 0;
    }
},
ju_BitSet_intersects = ($this, $set) => {
    let $sz, $i;
    $sz = jl_Math_min($this.$data.data.length, $set.$data.data.length);
    $i = 0;
    while ($i < $sz) {
        if ($this.$data.data[$i] & $set.$data.data[$i])
            return 1;
        $i = $i + 1 | 0;
    }
    return 0;
},
ju_BitSet_and = ($this, $set) => {
    let $i, $i_0, var$4;
    $i = jl_Math_min($this.$data.data.length, $set.$data.data.length);
    $i_0 = 0;
    while ($i_0 < $i) {
        var$4 = $this.$data.data;
        var$4[$i_0] = var$4[$i_0] & $set.$data.data[$i_0];
        $i_0 = $i_0 + 1 | 0;
    }
    while ($i < $this.$data.data.length) {
        $this.$data.data[$i] = 0;
        $i = $i + 1 | 0;
    }
    $this.$length1 = jl_Math_min($this.$length1, $set.$length1);
    ju_BitSet_recalculateLength($this);
},
ju_BitSet_andNot = ($this, $set) => {
    let $sz, $i, var$4;
    $sz = jl_Math_min($this.$data.data.length, $set.$data.data.length);
    $i = 0;
    while ($i < $sz) {
        var$4 = $this.$data.data;
        var$4[$i] = var$4[$i] & ($set.$data.data[$i] ^ (-1));
        $i = $i + 1 | 0;
    }
    ju_BitSet_recalculateLength($this);
},
ju_BitSet_or = ($this, $set) => {
    let $sz, $i, var$4;
    $this.$length1 = jl_Math_max($this.$length1, $set.$length1);
    ju_BitSet_ensureCapacity($this, ($this.$length1 + 31 | 0) / 32 | 0);
    $sz = jl_Math_min($this.$data.data.length, $set.$data.data.length);
    $i = 0;
    while ($i < $sz) {
        var$4 = $this.$data.data;
        var$4[$i] = var$4[$i] | $set.$data.data[$i];
        $i = $i + 1 | 0;
    }
},
ju_BitSet_xor = ($this, $set) => {
    let $sz, $i, var$4;
    $this.$length1 = jl_Math_max($this.$length1, $set.$length1);
    ju_BitSet_ensureCapacity($this, ($this.$length1 + 31 | 0) / 32 | 0);
    $sz = jl_Math_min($this.$data.data.length, $set.$data.data.length);
    $i = 0;
    while ($i < $sz) {
        var$4 = $this.$data.data;
        var$4[$i] = var$4[$i] ^ $set.$data.data[$i];
        $i = $i + 1 | 0;
    }
    ju_BitSet_recalculateLength($this);
},
ju_BitSet_isEmpty = $this => {
    return $this.$length1 ? 0 : 1;
};
function jur_AbstractCharClass$LazyJavaJavaIdentifierStart$1() {
    jur_AbstractCharClass.call(this);
    this.$this$013 = null;
}
let jur_AbstractCharClass$LazyJavaJavaIdentifierStart$1__init_ = ($this, $this$0) => {
    $this.$this$013 = $this$0;
    jur_AbstractCharClass__init_($this);
},
jur_AbstractCharClass$LazyJavaJavaIdentifierStart$1__init_0 = var_0 => {
    let var_1 = new jur_AbstractCharClass$LazyJavaJavaIdentifierStart$1();
    jur_AbstractCharClass$LazyJavaJavaIdentifierStart$1__init_(var_1, var_0);
    return var_1;
},
jur_AbstractCharClass$LazyJavaJavaIdentifierStart$1_contains = ($this, $ch) => {
    return jl_Character_isJavaIdentifierStart($ch);
},
jl_Float = $rt_classWithoutFields(jl_Number),
jl_Float_TYPE = null,
jl_Float_$callClinit = () => {
    jl_Float_$callClinit = $rt_eraseClinit(jl_Float);
    jl_Float__clinit_();
},
jl_Float_isInfinite = $v => {
    jl_Float_$callClinit();
    return !(isFinite($v) ? 1 : 0) && !(isNaN($v) ? 1 : 0) ? 1 : 0;
},
jl_Float_floatToIntBits = $value => {
    jl_Float_$callClinit();
    if (isNaN($value) ? 1 : 0)
        return 2143289344;
    return $rt_floatToRawIntBits($value);
},
jl_Float__clinit_ = () => {
    jl_Float_TYPE = $rt_cls($rt_floatcls);
},
ju_Arrays = $rt_classWithoutFields(),
ju_Arrays_copyOf1 = ($array, $length) => {
    let var$3, $result, $sz, $i;
    var$3 = $array.data;
    $result = $rt_createCharArray($length);
    $sz = jl_Math_min($length, var$3.length);
    $i = 0;
    while ($i < $sz) {
        $result.data[$i] = var$3[$i];
        $i = $i + 1 | 0;
    }
    return $result;
},
ju_Arrays_copyOf = ($array, $length) => {
    let var$3, $result, $sz, $i;
    var$3 = $array.data;
    $result = $rt_createByteArray($length);
    $sz = jl_Math_min($length, var$3.length);
    $i = 0;
    while ($i < $sz) {
        $result.data[$i] = var$3[$i];
        $i = $i + 1 | 0;
    }
    return $result;
},
ju_Arrays_copyOf2 = ($array, $length) => {
    let var$3, $result, $sz, $i;
    var$3 = $array.data;
    $result = $rt_createIntArray($length);
    $sz = jl_Math_min($length, var$3.length);
    $i = 0;
    while ($i < $sz) {
        $result.data[$i] = var$3[$i];
        $i = $i + 1 | 0;
    }
    return $result;
},
ju_Arrays_copyOf0 = ($original, $newLength) => {
    let var$3, $result, $sz, $i;
    var$3 = $original.data;
    $result = jlr_Array_newInstance(jl_Class_getComponentType(jl_Object_getClass($original)), $newLength);
    $sz = jl_Math_min($newLength, var$3.length);
    $i = 0;
    while ($i < $sz) {
        $result.data[$i] = var$3[$i];
        $i = $i + 1 | 0;
    }
    return $result;
},
ju_Arrays_fill0 = ($a, $fromIndex, $toIndex, $val) => {
    let var$5, var$6;
    if ($fromIndex > $toIndex)
        $rt_throw(jl_IllegalArgumentException__init_());
    while ($fromIndex < $toIndex) {
        var$5 = $a.data;
        var$6 = $fromIndex + 1 | 0;
        var$5[$fromIndex] = $val;
        $fromIndex = var$6;
    }
},
ju_Arrays_fill = ($a, $val) => {
    ju_Arrays_fill0($a, 0, $a.data.length, $val);
},
ju_Arrays_fill3 = ($a, $fromIndex, $toIndex, $val) => {
    let var$5, var$6;
    if ($fromIndex > $toIndex)
        $rt_throw(jl_IllegalArgumentException__init_());
    while ($fromIndex < $toIndex) {
        var$5 = $a.data;
        var$6 = $fromIndex + 1 | 0;
        var$5[$fromIndex] = $val;
        $fromIndex = var$6;
    }
},
ju_Arrays_fill2 = ($a, $val) => {
    ju_Arrays_fill3($a, 0, $a.data.length, $val);
},
ju_Arrays_fill1 = ($a, $fromIndex, $toIndex, $val) => {
    let var$5, var$6;
    if ($fromIndex > $toIndex)
        $rt_throw(jl_IllegalArgumentException__init_());
    while ($fromIndex < $toIndex) {
        var$5 = $a.data;
        var$6 = $fromIndex + 1 | 0;
        var$5[$fromIndex] = $val;
        $fromIndex = var$6;
    }
},
ju_Arrays_binarySearch = ($a, $key) => {
    return ju_Arrays_binarySearch1($a, 0, $a.data.length, $key);
},
ju_Arrays_binarySearch1 = ($a, $fromIndex, $toIndex, $key) => {
    let $u, var$6, $i, $e;
    if ($fromIndex > $toIndex)
        $rt_throw(jl_IllegalArgumentException__init_());
    $u = $toIndex - 1 | 0;
    while (true) {
        if ($fromIndex > $u)
            return ( -$fromIndex | 0) - 1 | 0;
        var$6 = $a.data;
        $i = ($fromIndex + $u | 0) / 2 | 0;
        $e = var$6[$i];
        if ($e == $key)
            break;
        if ($key >= $e)
            $fromIndex = $i + 1 | 0;
        else
            $u = $i - 1 | 0;
    }
    return $i;
},
ju_Arrays_binarySearch0 = ($a, $key) => {
    return ju_Arrays_binarySearch2($a, 0, $a.data.length, $key);
},
ju_Arrays_binarySearch2 = ($a, $fromIndex, $toIndex, $key) => {
    let $u, var$6, $i, $e, var$9;
    if ($fromIndex > $toIndex)
        $rt_throw(jl_IllegalArgumentException__init_());
    $u = $toIndex - 1 | 0;
    while (true) {
        if ($fromIndex > $u)
            return ( -$fromIndex | 0) - 1 | 0;
        var$6 = $a.data;
        $i = ($fromIndex + $u | 0) / 2 | 0;
        $e = var$6[$i];
        var$9 = $rt_compare($e, $key);
        if (!var$9)
            break;
        if (var$9 <= 0)
            $fromIndex = $i + 1 | 0;
        else
            $u = $i - 1 | 0;
    }
    return $i;
};
function jur_CharSet() {
    jur_LeafSet.call(this);
    this.$ch0 = 0;
}
let jur_CharSet__init_0 = ($this, $ch) => {
    jur_LeafSet__init_($this);
    $this.$ch0 = $ch;
},
jur_CharSet__init_ = var_0 => {
    let var_1 = new jur_CharSet();
    jur_CharSet__init_0(var_1, var_0);
    return var_1;
},
jur_CharSet_charCount = $this => {
    return 1;
},
jur_CharSet_accepts = ($this, $strIndex, $testString) => {
    return $this.$ch0 != $testString.$charAt($strIndex) ? (-1) : 1;
},
jur_CharSet_find = ($this, $strIndex, $testString, $matchResult) => {
    let $testStr, $strLength, var$6, var$7;
    if (!($testString instanceof jl_String))
        return jur_AbstractSet_find($this, $strIndex, $testString, $matchResult);
    $testStr = $testString;
    $strLength = $matchResult.$getRightBound();
    while (true) {
        if ($strIndex >= $strLength)
            return (-1);
        var$6 = $testStr.$indexOf1($this.$ch0, $strIndex);
        if (var$6 < 0)
            return (-1);
        var$7 = $this.$next1;
        $strIndex = var$6 + 1 | 0;
        if (var$7.$matches($strIndex, $testString, $matchResult) >= 0)
            break;
    }
    return var$6;
},
jur_CharSet_findBack = ($this, $strIndex, $lastIndex, $testString, $matchResult) => {
    let $testStr, var$6;
    if (!($testString instanceof jl_String))
        return jur_AbstractSet_findBack($this, $strIndex, $lastIndex, $testString, $matchResult);
    $testStr = $testString;
    a: {
        while (true) {
            if ($lastIndex < $strIndex)
                return (-1);
            var$6 = $testStr.$lastIndexOf2($this.$ch0, $lastIndex);
            if (var$6 < 0)
                break a;
            if (var$6 < $strIndex)
                break a;
            if ($this.$next1.$matches(var$6 + 1 | 0, $testString, $matchResult) >= 0)
                break;
            $lastIndex = var$6 + (-1) | 0;
        }
        return var$6;
    }
    return (-1);
},
jur_CharSet_getChar = $this => {
    return $this.$ch0;
},
jur_CharSet_first = ($this, $set) => {
    if ($set instanceof jur_CharSet)
        return $set.$getChar() != $this.$ch0 ? 0 : 1;
    if (!($set instanceof jur_RangeSet)) {
        if ($set instanceof jur_SupplRangeSet)
            return $set.$contains($this.$ch0);
        if (!($set instanceof jur_SupplCharSet))
            return 1;
        return 0;
    }
    return $set.$accepts(0, jl_Character_toString($this.$ch0)) <= 0 ? 0 : 1;
},
jn_ShortBuffer = $rt_classWithoutFields(jn_Buffer),
jn_ShortBuffer__init_ = ($this, $position, $limit) => {
    jn_Buffer__init_($this);
    $this.$position3 = $position;
    $this.$limit = $limit;
},
jn_ShortBuffer_put = ($this, $src, $offset, $length) => {
    if ($this.$isReadOnly())
        $rt_throw(jn_ReadOnlyBufferException__init_());
    if (jn_Buffer_remaining($this) < $length)
        $rt_throw(jn_BufferOverflowException__init_());
    if ($length >= 0 && $offset >= 0 && ($offset + $length | 0) <= $src.data.length) {
        $this.$putImpl1($this.$position3, $src, $offset, $length);
        $this.$position3 = $this.$position3 + $length | 0;
        return $this;
    }
    $rt_throw(jl_IndexOutOfBoundsException__init_());
},
jn_ShortBuffer_clear = $this => {
    jn_Buffer_clear($this);
    return $this;
},
jn_ShortBuffer_flip = $this => {
    jn_Buffer_flip($this);
    return $this;
},
jn_ShortBuffer_position0 = ($this, $newPosition) => {
    jn_Buffer_position0($this, $newPosition);
    return $this;
},
jn_ShortBuffer_flip0 = $this => {
    return jn_ShortBuffer_flip($this);
},
jn_ShortBuffer_clear0 = $this => {
    return jn_ShortBuffer_clear($this);
},
jn_ShortBuffer_position = ($this, var$1) => {
    return $this.$position1(var$1);
},
jn_ShortBufferImpl = $rt_classWithoutFields(jn_ShortBuffer),
jn_ShortBufferImpl__init_ = ($this, $position, $limit) => {
    jn_ShortBuffer__init_($this, $position, $limit);
},
jn_ShortBufferImpl_duplicate = $this => {
    return $this.$duplicate3(0, jn_Buffer_capacity($this), $this.$position3, $this.$limit, $this.$isReadOnly());
},
jn_ShortBufferImpl_get = $this => {
    let var$1;
    if ($this.$position3 >= $this.$limit)
        $rt_throw(jn_BufferUnderflowException__init_0());
    var$1 = $this.$position3;
    $this.$position3 = var$1 + 1 | 0;
    return $this.$getElement(var$1);
},
jn_ShortBufferImpl_isReadOnly = $this => {
    return $this.$readOnly();
},
jn_ArrayBufferViewProvider = $rt_classWithoutFields(0);
function jn_ShortBufferOverDataView() {
    let a = this; jn_ShortBufferImpl.call(a);
    a.$readOnly2 = 0;
    a.$data2 = null;
    a.$littleEndian = 0;
}
let jn_ShortBufferOverDataView__init_ = ($this, $position, $limit, $readOnly, $data, $littleEndian) => {
    jn_ShortBufferImpl__init_($this, $position, $limit);
    $this.$readOnly2 = $readOnly;
    $this.$data2 = $data;
    $this.$littleEndian = $littleEndian;
},
jn_ShortBufferOverDataView__init_0 = (var_0, var_1, var_2, var_3, var_4) => {
    let var_5 = new jn_ShortBufferOverDataView();
    jn_ShortBufferOverDataView__init_(var_5, var_0, var_1, var_2, var_3, var_4);
    return var_5;
},
jn_ShortBufferOverDataView_duplicate = ($this, $start, $capacity, $position, $limit, $readOnly) => {
    let var$6, var$7, var$8, $slice;
    var$6 = $this.$data2.buffer;
    var$7 = $this.$data2.byteOffset + ($start * 2 | 0) | 0;
    var$8 = $capacity * 2 | 0;
    $slice = new DataView(var$6, var$7, var$8);
    return jn_ShortBufferOverDataView__init_0($position, $limit, $readOnly, $slice, $this.$littleEndian);
},
jn_ShortBufferOverDataView_readOnly = $this => {
    return $this.$readOnly2;
},
jn_ShortBufferOverDataView_getElement = ($this, $index) => {
    return $this.$data2.getInt16($index * 2 | 0, !!$this.$littleEndian);
},
jn_ShortBufferOverDataView_putImpl = ($this, $index, $src, $offset, $length) => {
    let var$5, var$6, var$7, var$8, var$9, var$10, var$11;
    var$5 = $index * 2 | 0;
    while (true) {
        var$6 = $length + (-1) | 0;
        if ($length <= 0)
            break;
        var$7 = $src.data;
        var$8 = $this.$data2;
        var$9 = $offset + 1 | 0;
        var$10 = var$7[$offset];
        var$11 = $this.$littleEndian;
        var$8.setInt16(var$5, var$10, !!var$11);
        var$5 = var$5 + 2 | 0;
        $length = var$6;
        $offset = var$9;
    }
},
jn_ShortBufferOverDataView_capacityImpl = $this => {
    return $this.$data2.byteLength / 2 | 0;
};
function jur_CharClass$3() {
    let a = this; jur_AbstractCharClass.call(a);
    a.$val$curAlt = 0;
    a.$val$cc = null;
    a.$this$01 = null;
}
let jur_CharClass$3__init_ = ($this, $this$0, var$2, var$3) => {
    $this.$this$01 = $this$0;
    $this.$val$curAlt = var$2;
    $this.$val$cc = var$3;
    jur_AbstractCharClass__init_($this);
},
jur_CharClass$3__init_0 = (var_0, var_1, var_2) => {
    let var_3 = new jur_CharClass$3();
    jur_CharClass$3__init_(var_3, var_0, var_1, var_2);
    return var_3;
},
jur_CharClass$3_contains = ($this, $ch) => {
    return !($this.$val$curAlt ^ $this.$this$01.$bits.$get6($ch)) && !($this.$val$curAlt ^ $this.$this$01.$inverted ^ $this.$val$cc.$contains($ch)) ? 0 : 1;
};
function jur_CharClass$4() {
    let a = this; jur_AbstractCharClass.call(a);
    a.$val$curAlt9 = 0;
    a.$val$nb4 = null;
    a.$val$cc2 = null;
    a.$this$031 = null;
}
let jur_CharClass$4__init_ = ($this, $this$0, var$2, var$3, var$4) => {
    $this.$this$031 = $this$0;
    $this.$val$curAlt9 = var$2;
    $this.$val$nb4 = var$3;
    $this.$val$cc2 = var$4;
    jur_AbstractCharClass__init_($this);
},
jur_CharClass$4__init_0 = (var_0, var_1, var_2, var_3) => {
    let var_4 = new jur_CharClass$4();
    jur_CharClass$4__init_(var_4, var_0, var_1, var_2, var_3);
    return var_4;
},
jur_CharClass$4_contains = ($this, $ch) => {
    return $this.$val$curAlt9 ^ (!$this.$val$nb4.$contains($ch) && !$this.$val$cc2.$contains($ch) ? 0 : 1) ? 0 : 1;
};
function jur_CharClass$1() {
    let a = this; jur_AbstractCharClass.call(a);
    a.$val$cc3 = null;
    a.$this$07 = null;
}
let jur_CharClass$1__init_ = ($this, $this$0, var$2) => {
    $this.$this$07 = $this$0;
    $this.$val$cc3 = var$2;
    jur_AbstractCharClass__init_($this);
},
jur_CharClass$1__init_0 = (var_0, var_1) => {
    let var_2 = new jur_CharClass$1();
    jur_CharClass$1__init_(var_2, var_0, var_1);
    return var_2;
},
jur_CharClass$1_contains = ($this, $ch) => {
    return $this.$val$cc3.$contains($ch);
};
function jur_CharClass$2() {
    let a = this; jur_AbstractCharClass.call(a);
    a.$val$curAlt0 = 0;
    a.$val$cc1 = null;
    a.$this$00 = null;
}
let jur_CharClass$2__init_ = ($this, $this$0, var$2, var$3) => {
    $this.$this$00 = $this$0;
    $this.$val$curAlt0 = var$2;
    $this.$val$cc1 = var$3;
    jur_AbstractCharClass__init_($this);
},
jur_CharClass$2__init_0 = (var_0, var_1, var_2) => {
    let var_3 = new jur_CharClass$2();
    jur_CharClass$2__init_(var_3, var_0, var_1, var_2);
    return var_3;
},
jur_CharClass$2_contains = ($this, $ch) => {
    return !($this.$val$curAlt0 ^ $this.$this$00.$bits.$get6($ch)) && !($this.$val$curAlt0 ^ $this.$this$00.$inverted ^ $this.$val$cc1.$contains($ch)) ? 1 : 0;
};
function jur_CharClass$7() {
    let a = this; jur_AbstractCharClass.call(a);
    a.$val$clazz7 = null;
    a.$this$032 = null;
}
let jur_CharClass$7__init_ = ($this, $this$0, var$2) => {
    $this.$this$032 = $this$0;
    $this.$val$clazz7 = var$2;
    jur_AbstractCharClass__init_($this);
},
jur_CharClass$7__init_0 = (var_0, var_1) => {
    let var_2 = new jur_CharClass$7();
    jur_CharClass$7__init_(var_2, var_0, var_1);
    return var_2;
},
jur_CharClass$7_contains = ($this, $ch) => {
    return $this.$val$clazz7.$contains($ch);
};
function jur_CharClass$8() {
    let a = this; jur_AbstractCharClass.call(a);
    a.$val$clazz1 = null;
    a.$val$curAlt2 = 0;
    a.$this$02 = null;
}
let jur_CharClass$8__init_ = ($this, $this$0, var$2, var$3) => {
    $this.$this$02 = $this$0;
    $this.$val$clazz1 = var$2;
    $this.$val$curAlt2 = var$3;
    jur_AbstractCharClass__init_($this);
},
jur_CharClass$8__init_0 = (var_0, var_1, var_2) => {
    let var_3 = new jur_CharClass$8();
    jur_CharClass$8__init_(var_3, var_0, var_1, var_2);
    return var_3;
},
jur_CharClass$8_contains = ($this, $ch) => {
    return !$this.$val$clazz1.$contains($ch) && !($this.$val$curAlt2 ^ $this.$this$02.$bits.$get6($ch)) ? 1 : 0;
},
ao_Process = $rt_classWithoutFields(),
ao_Process_setThreadPriority = var$1 => {
    return;
};
function jur_CharClass$5() {
    let a = this; jur_AbstractCharClass.call(a);
    a.$val$curAlt7 = 0;
    a.$val$nb3 = null;
    a.$val$cc0 = null;
    a.$this$017 = null;
}
let jur_CharClass$5__init_ = ($this, $this$0, var$2, var$3, var$4) => {
    $this.$this$017 = $this$0;
    $this.$val$curAlt7 = var$2;
    $this.$val$nb3 = var$3;
    $this.$val$cc0 = var$4;
    jur_AbstractCharClass__init_($this);
},
jur_CharClass$5__init_0 = (var_0, var_1, var_2, var_3) => {
    let var_4 = new jur_CharClass$5();
    jur_CharClass$5__init_(var_4, var_0, var_1, var_2, var_3);
    return var_4;
},
jur_CharClass$5_contains = ($this, $ch) => {
    return $this.$val$curAlt7 ^ (!$this.$val$nb3.$contains($ch) && !$this.$val$cc0.$contains($ch) ? 0 : 1);
};
function jur_CharClass$6() {
    let a = this; jur_AbstractCharClass.call(a);
    a.$val$clazz6 = null;
    a.$this$019 = null;
}
let jur_CharClass$6__init_ = ($this, $this$0, var$2) => {
    $this.$this$019 = $this$0;
    $this.$val$clazz6 = var$2;
    jur_AbstractCharClass__init_($this);
},
jur_CharClass$6__init_0 = (var_0, var_1) => {
    let var_2 = new jur_CharClass$6();
    jur_CharClass$6__init_(var_2, var_0, var_1);
    return var_2;
},
jur_CharClass$6_contains = ($this, $ch) => {
    return $this.$val$clazz6.$contains($ch) ? 0 : 1;
},
ju_Iterator = $rt_classWithoutFields(0),
ju_ListIterator = $rt_classWithoutFields(0),
ju_Collections$5 = $rt_classWithoutFields(),
ju_Collections$5__init_ = $this => {
    jl_Object__init_($this);
},
ju_Collections$5__init_0 = () => {
    let var_0 = new ju_Collections$5();
    ju_Collections$5__init_(var_0);
    return var_0;
};
function jur_DotSet() {
    jur_JointSet.call(this);
    this.$lt0 = null;
}
let jur_DotSet__init_ = ($this, $lt) => {
    jur_JointSet__init_($this);
    $this.$lt0 = $lt;
},
jur_DotSet__init_0 = var_0 => {
    let var_1 = new jur_DotSet();
    jur_DotSet__init_(var_1, var_0);
    return var_1;
},
jur_DotSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $strLength, var$5, $high, var$7, $low;
    $strLength = $matchResult.$getRightBound();
    var$5 = $stringIndex + 1 | 0;
    if (var$5 > $strLength) {
        $matchResult.$hitEnd = 1;
        return (-1);
    }
    $high = $testString.$charAt($stringIndex);
    if (jl_Character_isHighSurrogate($high)) {
        var$7 = $stringIndex + 2 | 0;
        if (var$7 <= $strLength) {
            $low = $testString.$charAt(var$5);
            if (jl_Character_isSurrogatePair($high, $low))
                return $this.$lt0.$isLineTerminator(jl_Character_toCodePoint($high, $low)) ? (-1) : $this.$next1.$matches(var$7, $testString, $matchResult);
        }
    }
    return $this.$lt0.$isLineTerminator($high) ? (-1) : $this.$next1.$matches(var$5, $testString, $matchResult);
},
jur_DotSet_setNext = ($this, $next) => {
    $this.$next1 = $next;
},
jur_DotSet_getType = $this => {
    return (-2147483602);
},
jur_DotSet_hasConsumed = ($this, $matchResult) => {
    return 1;
},
ju_List = $rt_classWithoutFields(0);
function ju_AbstractList() {
    ju_AbstractCollection.call(this);
    this.$modCount = 0;
}
let ju_AbstractList__init_ = $this => {
    ju_AbstractCollection__init_($this);
},
ju_AbstractList_iterator = $this => {
    return ju_AbstractList$1__init_0($this);
},
ju_RandomAccess = $rt_classWithoutFields(0),
ju_TemplateCollections$AbstractImmutableList = $rt_classWithoutFields(ju_AbstractList),
ju_TemplateCollections$AbstractImmutableList__init_ = $this => {
    ju_AbstractList__init_($this);
},
ju_Collections$3 = $rt_classWithoutFields(ju_TemplateCollections$AbstractImmutableList),
ju_Collections$3__init_ = $this => {
    ju_TemplateCollections$AbstractImmutableList__init_($this);
},
ju_Collections$3__init_0 = () => {
    let var_0 = new ju_Collections$3();
    ju_Collections$3__init_(var_0);
    return var_0;
};
function jur_CharClass$9() {
    let a = this; jur_AbstractCharClass.call(a);
    a.$val$clazz = null;
    a.$val$curAlt8 = 0;
    a.$this$04 = null;
}
let jur_CharClass$9__init_ = ($this, $this$0, var$2, var$3) => {
    $this.$this$04 = $this$0;
    $this.$val$clazz = var$2;
    $this.$val$curAlt8 = var$3;
    jur_AbstractCharClass__init_($this);
},
jur_CharClass$9__init_0 = (var_0, var_1, var_2) => {
    let var_3 = new jur_CharClass$9();
    jur_CharClass$9__init_(var_3, var_0, var_1, var_2);
    return var_3;
},
jur_CharClass$9_contains = ($this, $ch) => {
    return !$this.$val$clazz.$contains($ch) && !($this.$val$curAlt8 ^ $this.$this$04.$bits.$get6($ch)) ? 0 : 1;
},
ju_Collections$4 = $rt_classWithoutFields(),
ju_Collections$4__init_ = $this => {
    jl_Object__init_($this);
},
ju_Collections$4__init_0 = () => {
    let var_0 = new ju_Collections$4();
    ju_Collections$4__init_(var_0);
    return var_0;
},
jl_Character = $rt_classWithoutFields(),
jl_Character_TYPE = null,
jl_Character_digitMapping = null,
jl_Character_upperCaseMapping = null,
jl_Character_lowerCaseMapping = null,
jl_Character_classMapping = null,
jl_Character_characterCache = null,
jl_Character_$$metadata$$0 = null,
jl_Character_$$metadata$$1 = null,
jl_Character_$$metadata$$3 = null,
jl_Character_$$metadata$$4 = null,
jl_Character_$callClinit = () => {
    jl_Character_$callClinit = $rt_eraseClinit(jl_Character);
    jl_Character__clinit_();
},
jl_Character_toString = $c => {
    let var$2, var$3;
    jl_Character_$callClinit();
    var$2 = new jl_String;
    var$3 = $rt_createCharArray(1);
    var$3.data[0] = $c;
    jl_String__init_0(var$2, var$3);
    return var$2;
},
jl_Character_isValidCodePoint = $codePoint => {
    jl_Character_$callClinit();
    return $codePoint >= 0 && $codePoint <= 1114111 ? 1 : 0;
},
jl_Character_isBmpCodePoint = $codePoint => {
    jl_Character_$callClinit();
    return $codePoint > 0 && $codePoint <= 65535 ? 1 : 0;
},
jl_Character_isSupplementaryCodePoint = $codePoint => {
    jl_Character_$callClinit();
    return $codePoint >= 65536 && $codePoint <= 1114111 ? 1 : 0;
},
jl_Character_isHighSurrogate = $ch => {
    jl_Character_$callClinit();
    return ($ch & 64512) != 55296 ? 0 : 1;
},
jl_Character_isLowSurrogate = $ch => {
    jl_Character_$callClinit();
    return ($ch & 64512) != 56320 ? 0 : 1;
},
jl_Character_isSurrogate = $ch => {
    jl_Character_$callClinit();
    return !jl_Character_isHighSurrogate($ch) && !jl_Character_isLowSurrogate($ch) ? 0 : 1;
},
jl_Character_isSurrogatePair = ($high, $low) => {
    jl_Character_$callClinit();
    return jl_Character_isHighSurrogate($high) && jl_Character_isLowSurrogate($low) ? 1 : 0;
},
jl_Character_toCodePoint = ($high, $low) => {
    jl_Character_$callClinit();
    return (($high & 1023) << 10 | $low & 1023) + 65536 | 0;
},
jl_Character_codePointAt = ($a, $index) => {
    jl_Character_$callClinit();
    return jl_Character_codePointAt0($a, $index, $a.data.length);
},
jl_Character_codePointAt0 = ($a, $index, $limit) => {
    let var$4, var$5;
    jl_Character_$callClinit();
    if ($index < $limit && $index >= 0) {
        var$4 = $a.data;
        if ($limit <= var$4.length) {
            if ($index < ($limit - 1 | 0) && jl_Character_isHighSurrogate(var$4[$index])) {
                var$5 = $index + 1 | 0;
                if (jl_Character_isLowSurrogate(var$4[var$5]))
                    return jl_Character_toCodePoint(var$4[$index], var$4[var$5]);
            }
            return var$4[$index];
        }
    }
    $rt_throw(jl_IndexOutOfBoundsException__init_());
},
jl_Character_highSurrogate = $codePoint => {
    let var$2;
    jl_Character_$callClinit();
    var$2 = $codePoint - 65536 | 0;
    return (55296 | var$2 >> 10 & 1023) & 65535;
},
jl_Character_lowSurrogate = $codePoint => {
    jl_Character_$callClinit();
    return (56320 | $codePoint & 1023) & 65535;
},
jl_Character_toLowerCase = $ch => {
    jl_Character_$callClinit();
    return jl_Character_toLowerCase0($ch) & 65535;
},
jl_Character_toLowerCase0 = $ch => {
    jl_Character_$callClinit();
    return jl_Character_mapChar(jl_Character_getLowerCaseMapping(), $ch);
},
jl_Character_getLowerCaseMapping = () => {
    let var$1;
    jl_Character_$callClinit();
    if (jl_Character_lowerCaseMapping === null) {
        var$1 = otciu_UnicodeHelper_decodeCaseMapping(((jl_Character_acquireLowerCaseMapping()).value !== null ? $rt_str((jl_Character_acquireLowerCaseMapping()).value) : null));
        jl_Character_lowerCaseMapping = otciu_UnicodeHelper_createCharMapping(var$1);
    }
    return jl_Character_lowerCaseMapping;
},
jl_Character_acquireLowerCaseMapping = () => {
    jl_Character_$callClinit();
    if (jl_Character_$$metadata$$0 === null)
        jl_Character_$$metadata$$0 = jl_Character_acquireLowerCaseMapping$$create();
    return jl_Character_$$metadata$$0;
},
jl_Character_toUpperCase = $ch => {
    jl_Character_$callClinit();
    return jl_Character_toUpperCase0($ch) & 65535;
},
jl_Character_toUpperCase0 = $codePoint => {
    jl_Character_$callClinit();
    return jl_Character_mapChar(jl_Character_getUpperCaseMapping(), $codePoint);
},
jl_Character_getUpperCaseMapping = () => {
    let var$1;
    jl_Character_$callClinit();
    if (jl_Character_upperCaseMapping === null) {
        var$1 = otciu_UnicodeHelper_decodeCaseMapping(((jl_Character_acquireUpperCaseMapping()).value !== null ? $rt_str((jl_Character_acquireUpperCaseMapping()).value) : null));
        jl_Character_upperCaseMapping = otciu_UnicodeHelper_createCharMapping(var$1);
    }
    return jl_Character_upperCaseMapping;
},
jl_Character_acquireUpperCaseMapping = () => {
    jl_Character_$callClinit();
    if (jl_Character_$$metadata$$1 === null)
        jl_Character_$$metadata$$1 = jl_Character_acquireUpperCaseMapping$$create();
    return jl_Character_$$metadata$$1;
},
jl_Character_mapChar = ($table, $codePoint) => {
    let $binSearchTable, $index, var$5, var$6;
    jl_Character_$callClinit();
    if ($codePoint < $table.$fastTable.data.length)
        return $codePoint + $table.$fastTable.data[$codePoint] | 0;
    $binSearchTable = $table.$binarySearchTable0;
    $index = jl_Character_binarySearchTable($binSearchTable, $codePoint);
    if ($index >= 0) {
        var$5 = $binSearchTable.data;
        var$6 = $index * 2 | 0;
        if (var$6 < var$5.length)
            return $codePoint + var$5[var$6 + 1 | 0] | 0;
    }
    return 0;
},
jl_Character_binarySearchTable = ($data, $key) => {
    let var$3, $l, $u, $i, $e, var$8;
    jl_Character_$callClinit();
    var$3 = $data.data;
    $l = 0;
    $u = (var$3.length / 2 | 0) - 1 | 0;
    while (true) {
        $i = ($l + $u | 0) / 2 | 0;
        $e = var$3[$i * 2 | 0];
        var$8 = $rt_compare($e, $key);
        if (!var$8)
            break;
        if (var$8 <= 0) {
            $l = $i + 1 | 0;
            if ($l > $u)
                return $i;
        } else {
            $u = $i - 1 | 0;
            if ($u < $l)
                return $u;
        }
    }
    return $i;
},
jl_Character_digit = ($ch, $radix) => {
    jl_Character_$callClinit();
    return jl_Character_digit0($ch, $radix);
},
jl_Character_digit0 = ($codePoint, $radix) => {
    let $d;
    jl_Character_$callClinit();
    if ($radix >= 2 && $radix <= 36) {
        $d = jl_Character_getNumericValue($codePoint);
        if ($d >= $radix)
            $d = (-1);
        return $d;
    }
    return (-1);
},
jl_Character_getNumericValue = $codePoint => {
    let $digitMapping, var$3, $l, $u, $idx, var$7, $val, var$9;
    jl_Character_$callClinit();
    $digitMapping = jl_Character_getDigitMapping();
    var$3 = $digitMapping.data;
    $l = 0;
    $u = (var$3.length / 2 | 0) - 1 | 0;
    while ($u >= $l) {
        $idx = ($l + $u | 0) / 2 | 0;
        var$7 = $idx * 2 | 0;
        $val = var$3[var$7];
        var$9 = $rt_compare($codePoint, $val);
        if (var$9 > 0)
            $l = $idx + 1 | 0;
        else {
            if (var$9 >= 0)
                return var$3[var$7 + 1 | 0];
            $u = $idx - 1 | 0;
        }
    }
    return (-1);
},
jl_Character_forDigit = ($digit, $radix) => {
    jl_Character_$callClinit();
    if ($radix >= 2 && $radix <= 36 && $digit >= 0 && $digit < $radix)
        return $digit < 10 ? (48 + $digit | 0) & 65535 : ((97 + $digit | 0) - 10 | 0) & 65535;
    return 0;
},
jl_Character_isDigit = $codePoint => {
    jl_Character_$callClinit();
    return jl_Character_getType($codePoint) != 9 ? 0 : 1;
},
jl_Character_getDigitMapping = () => {
    jl_Character_$callClinit();
    if (jl_Character_digitMapping === null)
        jl_Character_digitMapping = otciu_UnicodeHelper_decodeIntPairsDiff(((jl_Character_obtainDigitMapping()).value !== null ? $rt_str((jl_Character_obtainDigitMapping()).value) : null));
    return jl_Character_digitMapping;
},
jl_Character_obtainDigitMapping = () => {
    jl_Character_$callClinit();
    if (jl_Character_$$metadata$$3 === null)
        jl_Character_$$metadata$$3 = jl_Character_obtainDigitMapping$$create();
    return jl_Character_$$metadata$$3;
},
jl_Character_getClasses = () => {
    jl_Character_$callClinit();
    if (jl_Character_classMapping === null)
        jl_Character_classMapping = otciu_UnicodeHelper_extractRle(((jl_Character_obtainClasses()).value !== null ? $rt_str((jl_Character_obtainClasses()).value) : null));
    return jl_Character_classMapping;
},
jl_Character_obtainClasses = () => {
    jl_Character_$callClinit();
    if (jl_Character_$$metadata$$4 === null)
        jl_Character_$$metadata$$4 = jl_Character_obtainClasses$$create();
    return jl_Character_$$metadata$$4;
};
let jl_Character_toChars = $codePoint => {
    let var$2, var$3;
    jl_Character_$callClinit();
    if (!jl_Character_isValidCodePoint($codePoint))
        $rt_throw(jl_IllegalArgumentException__init_());
    if ($codePoint < 65536) {
        var$2 = $rt_createCharArray(1);
        var$2.data[0] = $codePoint & 65535;
        return var$2;
    }
    var$2 = $rt_createCharArray(2);
    var$3 = var$2.data;
    var$3[0] = jl_Character_highSurrogate($codePoint);
    var$3[1] = jl_Character_lowSurrogate($codePoint);
    return var$2;
},
jl_Character_isISOControl = $codePoint => {
    let var$2;
    jl_Character_$callClinit();
    a: {
        b: {
            if (!($codePoint >= 0 && $codePoint <= 31)) {
                if ($codePoint < 127)
                    break b;
                if ($codePoint > 159)
                    break b;
            }
            var$2 = 1;
            break a;
        }
        var$2 = 0;
    }
    return var$2;
},
jl_Character_getType0 = $c => {
    jl_Character_$callClinit();
    return jl_Character_getType($c);
},
jl_Character_getType = $codePoint => {
    let $classes, var$3, $l, $u, $i, $range;
    jl_Character_$callClinit();
    if (jl_Character_isBmpCodePoint($codePoint) && jl_Character_isSurrogate($codePoint & 65535))
        return 19;
    $classes = jl_Character_getClasses();
    var$3 = $classes.data;
    $l = 0;
    $u = var$3.length - 1 | 0;
    while ($l <= $u) {
        $i = ($l + $u | 0) / 2 | 0;
        $range = var$3[$i];
        if ($codePoint >= $range.$end1)
            $l = $i + 1 | 0;
        else {
            if ($codePoint >= $range.$start2)
                return $range.$data5.data[$codePoint - $range.$start2 | 0];
            $u = $i - 1 | 0;
        }
    }
    return 0;
},
jl_Character_isLowerCase = $codePoint => {
    jl_Character_$callClinit();
    return jl_Character_getType($codePoint) != 2 ? 0 : 1;
},
jl_Character_isUpperCase = $codePoint => {
    jl_Character_$callClinit();
    return jl_Character_getType($codePoint) != 1 ? 0 : 1;
},
jl_Character_isTitleCase = $codePoint => {
    jl_Character_$callClinit();
    return jl_Character_getType($codePoint) != 3 ? 0 : 1;
},
jl_Character_isDefined = $codePoint => {
    jl_Character_$callClinit();
    return !jl_Character_getType($codePoint) ? 0 : 1;
},
jl_Character_isLetter = $codePoint => {
    jl_Character_$callClinit();
    switch (jl_Character_getType($codePoint)) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
            break;
        default:
            return 0;
    }
    return 1;
},
jl_Character_isLetterOrDigit0 = $ch => {
    jl_Character_$callClinit();
    return jl_Character_isLetterOrDigit($ch);
},
jl_Character_isLetterOrDigit = $codePoint => {
    jl_Character_$callClinit();
    a: {
        switch (jl_Character_getType($codePoint)) {
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 9:
                break;
            case 6:
            case 7:
            case 8:
                break a;
            default:
                break a;
        }
        return 1;
    }
    return 0;
},
jl_Character_isJavaIdentifierStart = $codePoint => {
    jl_Character_$callClinit();
    a: {
        switch (jl_Character_getType($codePoint)) {
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 10:
            case 23:
            case 26:
                break;
            case 6:
            case 7:
            case 8:
            case 9:
            case 11:
            case 12:
            case 13:
            case 14:
            case 15:
            case 16:
            case 17:
            case 18:
            case 19:
            case 20:
            case 21:
            case 22:
            case 24:
            case 25:
                break a;
            default:
                break a;
        }
        return 1;
    }
    return jl_Character_isIdentifierIgnorable($codePoint);
},
jl_Character_isJavaIdentifierPart = $codePoint => {
    jl_Character_$callClinit();
    a: {
        switch (jl_Character_getType($codePoint)) {
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 8:
            case 9:
            case 10:
            case 23:
            case 26:
                break;
            case 7:
            case 11:
            case 12:
            case 13:
            case 14:
            case 15:
            case 16:
            case 17:
            case 18:
            case 19:
            case 20:
            case 21:
            case 22:
            case 24:
            case 25:
                break a;
            default:
                break a;
        }
        return 1;
    }
    return jl_Character_isIdentifierIgnorable($codePoint);
},
jl_Character_isUnicodeIdentifierStart = $codePoint => {
    jl_Character_$callClinit();
    a: {
        switch (jl_Character_getType($codePoint)) {
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 10:
                break;
            case 6:
            case 7:
            case 8:
            case 9:
                break a;
            default:
                break a;
        }
        return 1;
    }
    return jl_Character_isIdentifierIgnorable($codePoint);
},
jl_Character_isUnicodeIdentifierPart = $codePoint => {
    jl_Character_$callClinit();
    a: {
        switch (jl_Character_getType($codePoint)) {
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 8:
            case 9:
            case 10:
            case 23:
                break;
            case 7:
            case 11:
            case 12:
            case 13:
            case 14:
            case 15:
            case 16:
            case 17:
            case 18:
            case 19:
            case 20:
            case 21:
            case 22:
                break a;
            default:
                break a;
        }
        return 1;
    }
    return jl_Character_isIdentifierIgnorable($codePoint);
},
jl_Character_isIdentifierIgnorable = $codePoint => {
    jl_Character_$callClinit();
    a: {
        if (!($codePoint >= 0 && $codePoint <= 8) && !($codePoint >= 14 && $codePoint <= 27)) {
            if ($codePoint < 127)
                break a;
            if ($codePoint > 159)
                break a;
        }
        return 1;
    }
    return jl_Character_getType($codePoint) != 16 ? 0 : 1;
},
jl_Character_isSpaceChar = $codePoint => {
    jl_Character_$callClinit();
    switch (jl_Character_getType($codePoint)) {
        case 12:
        case 13:
        case 14:
            break;
        default:
            return 0;
    }
    return 1;
},
jl_Character_isWhitespace0 = $ch => {
    jl_Character_$callClinit();
    return jl_Character_isWhitespace($ch);
},
jl_Character_isWhitespace = $codePoint => {
    jl_Character_$callClinit();
    switch ($codePoint) {
        case 9:
        case 10:
        case 11:
        case 12:
        case 13:
        case 28:
        case 29:
        case 30:
        case 31:
            break;
        case 160:
        case 8199:
        case 8239:
            return 0;
        default:
            return jl_Character_isSpaceChar($codePoint);
    }
    return 1;
},
jl_Character__clinit_ = () => {
    jl_Character_TYPE = $rt_cls($rt_charcls);
    jl_Character_characterCache = $rt_createArray(jl_Character, 128);
},
jl_Character_acquireLowerCaseMapping$$create = () => {
    return {"value" : "NY  H#F#U 4%F#O #F#/ d%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #a1# #%# #%# #%# %%# #%# #%# #%# #%# #%# #%# #%# %%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #<+#%# #%# #%# \'.3#%# #%# #{1#%# #w1%%# %J\'#k1#o1#%# #w1#!3# #23#*3#%# \'23#:3# #>3#%# #%# #%# #N3#%# #N3# %%# #N3#%# #J3%%# #%# #R3#%# \'%# /)#%# #)#%# #)#%# #%# #%# #%# #%# #%# #%# #%# #%# %%# #%# #%# #%# #%# #%# #%# #%# #%# %)#%# #%# #8)#L%#%# #%# #%# #"
    + "%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #a+# #%# #%# #%# #%# #%# #%# #%# #%# #%# /B45#%# #,/#645# %%# #P1#!\'#*\'#%# #%# #%# #%# #%# <-%# #%# \'%# 1&++ %_## #Z#)k%%g%% #F#W hA# 1%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# +]%# %%# #?#%# %a+\'N\'AF#b &#%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# 3%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #^#%# #%# #%# #%# #%# #%# #%# %%# #%# #%# #%# #%# #%# #%# #%"
    + "# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# %*%p kB#oq-&# _?gejg#A1 a$#%# -mo%&# {-%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# 3,4/# #%# #%"
    + "# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# 3C1 1C1 1C1 1C1 1C1 3C/ 1C1 QC1 1C1 1C1 1C%8\'%G# 7i\')G# 7C%D)\' 7C%u)%?# 7X+%P+%G# L-q*/# \'Pw/#8m/# -6## |bA G%# kC.#U !r*%&# &#%# #,05#qX\'#H.5# %%# #%# #%# #e25#D05#q25#m25# #%# %%# 1865%%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# "
    + "#%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# 1%# #%# )%# (a=%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# G%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# y%%# #%# #%# #%# #%# #%# #%# \'%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# 5%# #%# #4Fd#%# #%# #%# #%# #%# )%# #<{p# %%# #%# \'%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #P}p#}}p#m}p#D}p#P}p# #@yp#D{p#Lyp#Br#%# #%# #%"
    + "# #%# #%# #%# #%# #%# #,%#L}p#LJd#%# #%# #$$r#%# #%# #%# #%# #%# #%# #%# #%# #P6r#}!rI )%# :GL#) i,5F#U TUg#r {%g#r >\'c#p Lnk%F# .\'F#S HB#F#b o@5F#b F#2#W 4Z;%# /%# #%# %%# \'%# M%# #%# #%# #%# \'%# #%# #%# #%# #%# #%# #%# u.#N#f "};
},
jl_Character_acquireUpperCaseMapping$$create = () => {
    return {"value" : "L[  ,%H#U :#>b# vH#O #H#/:+# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #,5# #\'# #\'# #\'# %\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# %\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# %\'# #\'# #\'#(;#N1# %\'# #\'# %\'# \'\'# +\'# %6)# \'\'#*/#N6r# %_+# %\'# #\'# #\'# %\'# )\'# %\'# \'\'# #\'# %\'# \'\'# #J%# +\'#+# #\'#+# #\'#+# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'#L\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# %\'#+# #\'# \'\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'#"
    + " #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# \'\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# 1\'# %665% #\'# )\'# #\'# #\'# #\'# #\'#o25#c25#k25#03#}1# #y1% #m1# #q1#{}p# \'y1#k}p# #$3#!$r#:{p#N}p# #,3#43#N}p#*05#B}p# %43# #B05#<3# %@3# #{!r# ){!r#F.5# %P3# #J}p#P3# \'B{p#P3#$\'#L3%,\'# +T3# 5Jyp#>yp# Z\'_\'# x\'# #\'# \'\'\' #_+\' !#a##]#\' #H#CD##H#3m%#i%% #e%#P%# \'(%#D%#C# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'#i\'#P\'#=#(+# #4)# %\'# %\'# .#H#bP\'A #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# 3\'# #\'# #\'# #\'# #\'# #\'# "
    + "#\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# %\'# #\'# #\'# #\'# #\'# #\'# #\'#`# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'% &#,%n mB#ko%x %ko%\' RAC1 >$#yu+#uu+#Pu+#Hu+%Lu+#0u+#io+#>@d# #\'- (+2Fd# \'oX\'# AJJd# N%\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #"
    + "\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# +X%# +\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'#A1 1A1 1A1 1A1 1A1 3A# #A# #A# #A% /A1 16\'%g\')B)%V+%s)%N+)A1 1A1 1A1 1A% #E# 5<m-# )E# 9A% =A% \'=# ;E# R/8## ddA )\'# @E0#U Nr,%&# #\'# \'D4"
    + "5#845# #\'# #\'# #\'# -\'# %\'# 5\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# 1\'# #\'# )\'- /qq-&# i]=\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# G\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# y%\'# #\'# #\'# #\'# #\'# #\'# #\'# \'\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'#"
    + " #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# 5\'# #\'# %\'# #\'# #\'# #\'# #\'# )\'# )\'# #\'#*%# %\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# 7\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# )\'# #\'# %\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# U\'# REJ#% -Dr# Yiejg# e*5H#U eUi#r {%i#r <\'e#t {nm%:# V%H#^ >B#H#b o@5H#b <#4#P# eV;\'# /\'# #\'# %\'# \'\'# M\'# #\'# #\'# #\'# \'\'# #\'# #\'# #\'# #\'# #\'# #\'# Z0#P#f "};
},
jl_Character_obtainDigitMapping$$create = () => {
    return {"value" : "6G*% %%%%%%%%%%%%%%%%%%A%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%=,#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%_H#T#%%%%%%%%%%%%%%%%%%s+G%%%%%%%%%%%%%%%%%%_1G%%%%%%%%%%%%%%%%%%{CG%%%%%%%%%%%%%%%%%%2+G%%%%%%%%%%%%%%%%%%2+G%%%%%%%%%%%%%%%%%%2+G%%%%%%%%%%%%%%%%%%2+G%%%%%%%%%%%%%%%%%%2+G%%%%%%%%%%%%%%%%%%2+G%%%%%%%%%%%%%%%%%%2+G%%%%%%%%%%%%%%%%%%2+G%%%%%%%%%%%%%%%%%%2+G%%%%%%%%%%%%%%%%%%6)G%%%%%%%%%%%%%%%%%%2+G%%%%%%%%%%%%%%%%%%*\'G%%%%%%%%%%%%%%%%%%.9G%%%%%%%%%%%%%%%%%%*\'G%%%%%%%%%%%%%%%%%%!i#G"
    + "%%%%%%%%%%%%%%%%%%c#G%%%%%%%%%%%%%%%%%%*;G%%%%%%%%%%%%%%%%%%Z+G%%%%%%%%%%%%%%%%%%:/G%%%%%%%%%%%%%%%%%%=G%%%%%%%%%%%%%%%%%%{/G%%%%%%%%%%%%%%%%%%k\'G%%%%%%%%%%%%%%%%%%s+G%%%%%%%%%%%%%%%%%%=G%%%%%%%%%%%%%%%%%%R@dG%%%%%%%%%%%%%%%%%%R[G%%%%%%%%%%%%%%%%%%c#G%%%%%%%%%%%%%%%%%%_1G%%%%%%%%%%%%%%%%%%!#G%%%%%%%%%%%%%%%%%%k\'G%%%%%%%%%%%%%%%%%%cCG%%%%%%%%%%%%%%%%%%o*IG%%%%%%%%%%%%%%%%%%A%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%=,#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%c:#T#%%%%%%%%%%%%%%%%%%w&%G%%%%%"
    + "%%%%%%%%%%%%%=G%%%%%%%%%%%%%%%%%%_fG%%%%%%%%%%%%%%%%%%Z+G%%%%%%%%%%%%%%%%%%_%G%%%%%%%%%%%%%%%%%%>-G%%%%%%%%%%%%%%%%%%.9G%%%%%%%%%%%%%%%%%%w=G%%%%%%%%%%%%%%%%%%2+G%%%%%%%%%%%%%%%%%%>AG%%%%%%%%%%%%%%%%%%N)G%%%%%%%%%%%%%%%%%%=G%%%%%%%%%%%%%%%%%%%G%%%%%%%%%%%%%%%%%%B\'G%%%%%%%%%%%%%%%%%%FEG%%%%%%%%%%%%%%%%%%N)G%%%%%%%%%%%%%%%%%%oYG%%%%%%%%%%%%%%%%%%k\'G%%%%%%%%%%%%%%%%%%g5G%%%%%%%%%%%%%%%%%%*\'G%%%%%%%%%%%%%%%%%%F%G%%%%%%%%%%%%%%%%%%Z?G%%%%%%%%%%%%%%%%%%ow?G%%%%%%%%%%%%%%%%%%s4%G%%%%%%%%%%%%%%%%%%k\'G%%%%%%%%%%%%%%"
    + "%%%%s+G%%%%%%%%%%%%%%%%%%:OG%%%%%%%%%%%%%%%%%%c#G%%%%%%%%%%%%%%%%%%N&OG%%%%%%%%%%%%%%%%%%VZ%G%%%%%%%%%%%%%%%%%%%G%%%%%%%%%%%%%%%%%%%G%%%%%%%%%%%%%%%%%%%G%%%%%%%%%%%%%%%%%%%G%%%%%%%%%%%%%%%%%%!8%G%%%%%%%%%%%%%%%%%%FEG%%%%%%%%%%%%%%%%%%sKG%%%%%%%%%%%%%%%%%%k5G%%%%%%%%%%%%%%%%%%.lG%%%%%%%%%%%%%%%%%%wN)G%%%%%%%%%%%%%%%%%%"};
},
jl_Character_obtainClasses$$create = () => {
    return {"value" : "PA-Y$;Y$679:95Y#J+Y#Z$Y#B;697<8<C;6:7:PB-9[%=9<=&>:1=<=:L#<#Y#<,&?L$9B8:B(C9:C)!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!C#!#!#!#!#!#!#!#!C#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#B##!#!C$B##!#B##B$C#B%#B##B$C$B##B##!#!#B##!C#!#B##B$#!#B#C#&!C$F%!$#!$#!$#!#!#!#!#!#!#!#!C#!#!#!#!#!#!#!#!#!C#!$#!#B$#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!C(B##B#C#!#B%#!#!#!#!CgF#C;E3]%E-]/E&](%<%]2b\'Q! !#!#%<!#A#%C$9!A%]#!9B$ ! B##B2 B*CD!C#B$C$!#!#!#!#!#!#!#!#!#!#!#!C&!#:!#B#C#BTCQ!#!#!#!"
    + "#!#!#!#!#!#!#!#!#!#!#!#!#!#=G&H#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#B##!#!#!#!#!#!C#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!# BG E#Y\'CJ95E#^#; GN5\'9G#9G#9G$A\'F<A%F%Y#A,Q\'Z$Y#;Y#^#G,91Y$FA%F+G6J+Y%F#\'b&D! 9&G(1=G\'E#G#=G%F#J+F$^#&Y/ 1&\'F?G<A#b&:! G,&A/J+FBG*E#=Y$%A#\'[#F7G%%G*%G$%G&A#Y0 F:G$A#9 F,A&F9<F(Q#A&G*FJ%G91GA)FW\')\'&I$G)I%\'I#&G(F+G#Y#J+9%F0\'I#\'F)A#F#A#F7 F( &A$F%A#\'&I$G%A#I#A#I#\'&A))A%F# F$G#A#J+F#[#L\'=;&9\'& G#) F\'A%F#A#F7 F( F# F"
    + "# F#A#\' I$G#A%G#A#G$A$\'A(F% &A(J+G#F$\'9A+G#) F* F$ F7 F( F# F&A#\'&I$G& G#) I#\'A#&A0F#G#A#J+9;A(&G\' \'I# F)A#F#A#F7 F( F# F&A#\'&)\')G%A#I#A#I#\'A&G%)A%F# F$G#A#J+=&L\'A+\'& F\'A$F$ F%A$F# & F#A$F#A$F$A$F-A%I#\'I#A$I$ I$\'A#&A\')A/J+L$^\';=A&\'I$\'F) F$ F8 F1A#\'&G$I% G$ G%A(G# F$ F#A#F#G#A#J+A(9L(=&\'I#9F) F$ F8 F+ F&A#\'&)\'I& \'I# I#G#A(I#A&F$ F#G#A#J+ F#)A-G#I#F* F$ FJG#&I$G% I$ I$\'&=A%F$)L(F$G#A#J+L*=F\' \'I# F3A$F9 F* &A#F(A$\'A%I$G$ \' I)A\'J+A#I#9A-FQ\'F#G(A%;F\'%G)9J+Y#AFF# & F& F9 & F+\'F#G*&A#F& % G( J+A#F%AA&^$Y0=9^$G#^\'J"
    + "+L+=\'=\'=\'6767I#F) FEA%G/)G&9G#F&G, GE ^)\'^\' ^#Y&^%Y#AFFLI#G%)G\')G#I#G#&J+Y\'F\'I#G#F%G$&I$F#I(F$G%F.\'I#G#I\'\'&)J+I$\'^#BG !A&!A#CL9%C$b&*&  F%A#F( & F%A#FJ F%A#FB F%A#F( & F%A#F0 FZ F%A#FeA#G$Y*L5A$F1^+A\'b!7! A#C\'A#5b&M* =9F2-F;67A$FmY$K$F)A(F3G$)A*F4G#)Y#A*F3G#A-F. F$ G#A-FUG#)G(I)\'I#G,Y$%Y$;&\'A#J+A\'L+A\'Y\'5Y%G$1\'J+A\'FD%FWA\'F&G#FC\'&A&FhA+F@ G$I%G#I$A%I#\'I\'G$A%=A$Y#J+F?A#F&A,FMA%F;A\'J+,A$^CF8G#I#\'A#Y#FV)\')G( \')\'I#G)I\'G+A#\'J+A\'J+A\'Y(%Y\'A#G/(GSA0G%)FP\')G&)\'I&\'I#F) Y#J+Y(^+G*^*Y$G#)F?)G%I#G#)G$F#J+FM\')G#I$\')G$I#A)Y"
    + "%FEI)G)I#G#A$Y&J+A$F$J+F?E\'Y#C*!#A&BLA#B$Y)A)G$9G.)G(F%\'F\'\'F#)G#&A&CMEaC.%CCEFGb!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!C*!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!C*B)C\'A#B\'A#C)B)C)B)C\'A#B\'A#C) ! ! ! !C)B)C/A#C)D)C)D)C)D)C& C#B%$<#]$C$ C#B%$]$C%A#C#B% ]$C)B&]$A#C$ C#B%$]# M,Q&U\'Y#>?6_#?6>Y)./Q&-Y*>?Y%X#Y$:67Y,:98Y+-Q& Q+,%A#L\'Z$67%L+Z$67E2[FA,G."
    + "H%\'H$G-A0^#!^%!^##B$C#B$#=!^#:B&^\'!=!=!=B%=#B%#F%#^#C#B#Z&!C%=:^##=L1KD!#K%,^#A%Z&^&Z#^%:^#:^#:^(:^@Z#^#:=:^@b:-% ^)6767^5Z#^(67b=2! :^?Z:^IZ\'^jA7^,A6L^^pL7b=X# :^*:^WZ)b=P! :b=Y$ 67676767676767L?^MZ&67Z@6767676767Z1b= % b:$# 6767676767676767676767Za6767ZA67b:#% ^QZ6^#Z\'^HA#b=+# BQCQ!#B$C#!#!#!#B%#!C#!C\'E#B$#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!C#^\'!#!#G$!#A&Y%,Y#CG #A&#A#FYA(%9A/\'F8A*F( F( F( F( F( F( F( F( GAY#>?>?Y$>?9>?Y*5Y#59>?Y#>?67676767Y&%Y"
    + "+U#Y%596Y.^#Y$676767675A#Y#67A=^; b=:! A-b=7$ A;^1-Y$=%&+6767676767^#6767676756W#=K*G%I#5E&^#K$%&9^# b&7! A#G#]#E#&5b&;! 9E$&A&FL b&?!  ^#L%^+FA^GA*=F1^@ L+^?L)=L0^AL+^HL0b= & b& H!^bb&  %b&6)!%b&X2 A$^XA*FIE\'Y#b&-% %Y$F1J+F#A5!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#&\'H$9G+9%!#!#!#!#!#!#!#!#!#!#!#!#!#!#E#G#FhK+G#Y\'A)]8E*]#!#!#!#!#!#!#!C$!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#%C)!#!#B##!#!#!#!#%]#!#!#&!#!C$!#!#!#!#!#!#!#!#!#!#B&#B&#!#!#!#!#!#!#!#B%#!#B##!#!#!#!#!#!#!#B#A%!A/E%!#&"
    + "E##F(\'F$\'F%\'F8I#G#)^%\'A$L\'^#;=A\'FUY%A)I#FSI1G#A)Y#J+A\'G3F\'Y$&9F#\'J+F=G)Y#F8G,I#A,9F>A$G$)FP\'I#G%I#G#I$Y. %J+A%Y#F&\'%F*J+F& FJG\'I#G#I#G#A*F$\'F)\')A#J+A#Y%F1%F\'^$&)\')FS\'&G$F#G#F&G#&\'&A9F#%Y#F,)G#I#Y#&E#)\'A+F\'A#F\'A#F\'A*F( F( CL<E%C*%]#B#A#b#1! FDI#\'I#\'I#9)\'A#J+A\'b&EO#A-F8A%FRA%b4 A b3 E!b&O& A#b&K! AGC(A-C&A&&\'F+:F. F& & F# F# b&M! ]2^1b&L& 76^1Fb^#FW^)AAF-;^$G1Y(679A\'G19U#X#6767676767676767Y#67Y%X$Y$ Y%5676767Y$:5Z$ 9;Y#A%F& b&(# A#1 Y$;Y$679:95Y#J+Y#Z$Y#B;697<8<C;6:7:67967Y#F+%FNE#F@A$F\'A#F\'A#F\'A#F$A$[#:<=[# "
    + "=Z%^#A+Q$^#A#F- F; F4 F# F0A#F/ACb&]! A&Y$A%LNA$^*KVL%^2L#^$ ^.A$=AP^N\'b ## F>A$FRA0\'L<A%FAL%A*F5+F)+A&FGG&A&F? 9FEA%F)9K&AKBICIFpA#J+A\'BEA%CEA%FIA)FUA,9B, B0 B( B# C, C0 C( C#A$FUA-b&X% A*F7A+F)A9E\' EK E/AbF\'A#& FM F#A$&A#F8 9L)F8^#L(F@A)L*AQF4 F#A&L&F7L\'A$9F;A&9F;AGFYA%L#F#L1A#LO&G$ G#A&G%F% F$ F>A#G$A%\'L*A(Y*A(F>L#9F>L$AAF)=F=G#A%L&Y(A*FWA$Y(F7A#L)F4A&L)F3A(Y%A-L(b 1! FkAXBTA.CTA(L\'FEG%A)J+A\'J+F%%&B7A$G&5%C7A)Z#b 1$ L@ FK G#5A#F#A1F$%F# ]#G&9^)F7 G1F>L+&A)F7G,L%Y&A7F3G%Y%AGF6L(A5F8A*)\')FVG0Y(A%L5J+\'F#G#&"
    + "A*G$)FNI$G%I#G#Y#1Y%\'A+1A#F:A(J+A\'G$FEG&)G) J+Y%&I#&A)FD\'Y#&A*G#)FQI$G*I#F%Y%G%9)\'J+&9&Y$ L5A,F3 F:I$G$I#\')G#Y\'\'F#\'A`F( & F% F0 F+9A\'FP\'I$G)A&J+A\'G#I# F)A#F#A#F7 F( F# F& G#&I#\'I%A#I#A#I$A#&A\')A&F&I#A#G(A$G&A,F+ &A#& FG &I$G\' )A#) I% I#\')\'&\'&Y# Y#A)G#A>FVI$G)I#G$)\'F%Y&J+Y# 9\'F$A?FQI$G\')\'I%G#)G#F#9&A)J+b G# FPI$G%A#I%G#)G#Y8F%G#ACFQI$G)I#\')G#Y$&A,J+A\'Y.A4FL\')\'I#G\')\'&9A\'J+A\'J5A=F<A#\')\'I#G%)G&A%J+L#Y$=F(b Z# FMI$G*)G#9b E! BACAJ+L*A-F)A#&A#F) F# F9I\' I#A#G#)\'&)&)\'Y$A*J+AhF)A#FHI$G%A#G#I%\'&9&)A<&G+FIG\')&G%Y)\'A)"
    + "&G\'I#G$FOG.)G#Y$&Y&A.FkA(Y+&b 6! \')G$)\')b 9! FB9A/J+A\'F* FF)G( G\')\'&Y&A+J+L4A$Y#F?A#G7 )G()G#)G#AkF( F# FGG\'A$\' G# G(&\'A)J+A\'F\' F# FAI& G# I#\')\'&A(J+A\'FJ%F#A%J+b W$ F4G#I#Y#A(G#&)F. FCI#G&A$I#\')\'Y.J+\'b 6! &A0L6^)[%^2A.9b&;/ b G! b+Q! Y&K,b&%$ A-b+X% b *E b&B! Y#A.b&Q1 Q1\'F\'G0A+b&<` A&b&(* b ZK!F?G-I$G$J+b \'< b&Z) A(F@ J+A%Y#Fq J+A\'F?A#G&9A+FQG(Y&^%E%9=A+J+ L( F6A&F4b Q\' E$FIE#Y$J+A\'F9\'F%\'A#J+b 7# BACAL8Y%A&B:A#C:AMFmA%\'&IXA(G%E.AbE#9%\'A,I#E#K$A*b&<T!AEFCb @! b&T! A.b&3/ A/FTb >Y!E% E( E# b&J% A*&A>F$A#&A/F&"
    + "A(b&-\' b %E b&L! A&F.A$F*A(F+A#=G#9Q%b =_ b=Q$ J+^$A$b=U\' A\'^8 ^$A)Z$^1Z/A#GOA#G8A*b=U! A^b=W$ A+^HG#^^I#G$^$I\'Q)G)^#G(^?G%b=5# G$=A+I$^)G#^#)^AI#A`L5A-L5A-b=8! A*L:b (# B;C;B;C( C3B;C;! B#A#!A#B#A#B% B)C% # C( C,B;C;B# B%A#B) B( C;B# B% B& !A$B( C;B;C;B;C;B;C;B;C;B;C;B;C> B::C::C\'B::C::C\'B::C::C\'B::C::C\'B::C::C\'!#A#JSb= ) GX^%GS^)\'^/\'^#Y&A0G& G0b 1! Z>b D0 C+&CV!C(!#!C#!C$!C7!#!#!#!C$!#!#!#!#!#!#!#F#A/C(AWETG( G2A#G( G# G&A&E`AB\'b Q! FNA$G(E(A#J+A%&=b  & F?\'A2FMG%J+A&;b 1( F<%G%J+b 7$ F?G#&J+A%9b  $ F@ F$\'"
    + "F#\'F(G#F&\'A)&%b A$ F( F% F# F0 b&&$ A#L*G(AJBCCCG(%A%J+A%Y#b 2- L]=L$;L%AnLN=L0b #$ F% F< F# &A#& F+ F% & &A\'&A%& & & F$ F# &A#& & & & & F# &A#F% F( F% F% & F+ F2A&F$ F& F2AUZ#b /% ^MA%b=E! A-^0A#^0 ^0 ^FA+L.b=C# AX^>A.^MA%^*A(^#A/^\'b ;# b=]$ ]&b=;, A#^2A$^.A$b==$ A%^-A%^=A%^YA)^+A\'^IA)^?A#^-A%^#A/Z*AHb=9& A)^/A#^.A$^i =A$^3 ^.A$^-A&b=4#  b==! J+=b &1 b&  %b&  %b&A<#AAb&@%! b&/;!A#b&RU!A0b&O* b CG b&?) b C8 b&,.!A&b&K%#b   %b   %b \'O!b& R#b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   "
    + "%b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b !0 1A?b1A! b  # b\'Q$ b   %b   %b   %b 1Y$b3  %b3  %b3  %b3`a$A#b3  %b3  %b3  %b3`a$"};
},
ao_Build$VERSION = $rt_classWithoutFields(),
ao_Build$VERSION_RELEASE = null,
ju_Set = $rt_classWithoutFields(0),
ju_AbstractSet = $rt_classWithoutFields(ju_AbstractCollection),
ju_AbstractSet__init_ = $this => {
    ju_AbstractCollection__init_($this);
},
ju_TemplateCollections$AbstractImmutableSet = $rt_classWithoutFields(ju_AbstractSet),
ju_TemplateCollections$AbstractImmutableSet__init_ = $this => {
    ju_AbstractSet__init_($this);
},
ju_Collections$1 = $rt_classWithoutFields(ju_TemplateCollections$AbstractImmutableSet),
ju_Collections$1__init_ = $this => {
    ju_TemplateCollections$AbstractImmutableSet__init_($this);
},
ju_Collections$1__init_0 = () => {
    let var_0 = new ju_Collections$1();
    ju_Collections$1__init_(var_0);
    return var_0;
};
function jur_CICharSet() {
    let a = this; jur_LeafSet.call(a);
    a.$ch3 = 0;
    a.$supplement = 0;
}
let jur_CICharSet__init_0 = ($this, $ch) => {
    jur_LeafSet__init_($this);
    $this.$ch3 = $ch;
    $this.$supplement = jur_Pattern_getSupplement($ch);
},
jur_CICharSet__init_ = var_0 => {
    let var_1 = new jur_CICharSet();
    jur_CICharSet__init_0(var_1, var_0);
    return var_1;
},
jur_CICharSet_accepts = ($this, $strIndex, $testString) => {
    return $this.$ch3 != $testString.$charAt($strIndex) && $this.$supplement != $testString.$charAt($strIndex) ? (-1) : 1;
},
ju_TemplateCollections$AbstractImmutableMap = $rt_classWithoutFields(ju_AbstractMap),
ju_TemplateCollections$AbstractImmutableMap__init_ = $this => {
    ju_AbstractMap__init_($this);
},
ju_TemplateCollections$AbstractImmutableMap_put = ($this, $key, $value) => {
    $rt_throw(jl_UnsupportedOperationException__init_0());
},
ju_Collections$2 = $rt_classWithoutFields(ju_TemplateCollections$AbstractImmutableMap),
ju_Collections$2__init_ = $this => {
    ju_TemplateCollections$AbstractImmutableMap__init_($this);
},
ju_Collections$2__init_0 = () => {
    let var_0 = new ju_Collections$2();
    ju_Collections$2__init_(var_0);
    return var_0;
};
function jur_SupplCharSet() {
    let a = this; jur_LeafSet.call(a);
    a.$high0 = 0;
    a.$low0 = 0;
    a.$ch1 = 0;
}
let jur_SupplCharSet__init_ = ($this, $ch) => {
    let $chUTF16, var$3;
    jur_LeafSet__init_($this);
    $this.$charCount0 = 2;
    $this.$ch1 = $ch;
    $chUTF16 = jl_Character_toChars($ch);
    var$3 = $chUTF16.data;
    $this.$high0 = var$3[0];
    $this.$low0 = var$3[1];
},
jur_SupplCharSet__init_0 = var_0 => {
    let var_1 = new jur_SupplCharSet();
    jur_SupplCharSet__init_(var_1, var_0);
    return var_1;
},
jur_SupplCharSet_accepts = ($this, $strIndex, $testString) => {
    let var$3, $high, $low;
    var$3 = $strIndex + 1 | 0;
    $high = $testString.$charAt($strIndex);
    $low = $testString.$charAt(var$3);
    return $this.$high0 == $high && $this.$low0 == $low ? 2 : (-1);
},
jur_SupplCharSet_find = ($this, $strIndex, $testString, $matchResult) => {
    let $testStr, $strLength, var$6, $ch;
    if (!($testString instanceof jl_String))
        return jur_AbstractSet_find($this, $strIndex, $testString, $matchResult);
    $testStr = $testString;
    $strLength = $matchResult.$getRightBound();
    while ($strIndex < $strLength) {
        var$6 = $testStr.$indexOf1($this.$high0, $strIndex);
        if (var$6 < 0)
            return (-1);
        $strIndex = var$6 + 1 | 0;
        if ($strIndex >= $strLength)
            continue;
        $ch = $testStr.$charAt($strIndex);
        if ($this.$low0 == $ch && $this.$next1.$matches($strIndex + 1 | 0, $testString, $matchResult) >= 0)
            return $strIndex + (-1) | 0;
        $strIndex = $strIndex + 1 | 0;
    }
    return (-1);
},
jur_SupplCharSet_findBack = ($this, $strIndex, $lastIndex, $testString, $matchResult) => {
    let $testStr, var$6, var$7;
    if (!($testString instanceof jl_String))
        return jur_AbstractSet_findBack($this, $strIndex, $lastIndex, $testString, $matchResult);
    $testStr = $testString;
    a: {
        while (true) {
            if ($lastIndex < $strIndex)
                return (-1);
            var$6 = $testStr.$lastIndexOf2($this.$low0, $lastIndex);
            var$7 = var$6 + (-1) | 0;
            if (var$7 < 0)
                break a;
            if (var$7 < $strIndex)
                break a;
            if ($this.$high0 == $testStr.$charAt(var$7) && $this.$next1.$matches(var$7 + 2 | 0, $testString, $matchResult) >= 0)
                break;
            $lastIndex = var$7 + (-1) | 0;
        }
        return var$7;
    }
    return (-1);
},
jur_SupplCharSet_getCodePoint = $this => {
    return $this.$ch1;
},
jur_SupplCharSet_first = ($this, $set) => {
    if ($set instanceof jur_SupplCharSet)
        return $set.$getCodePoint() != $this.$ch1 ? 0 : 1;
    if ($set instanceof jur_SupplRangeSet)
        return $set.$contains($this.$ch1);
    if ($set instanceof jur_CharSet)
        return 0;
    if (!($set instanceof jur_RangeSet))
        return 1;
    return 0;
},
ccra_InGameActivity = $rt_classWithoutFields(ccra_a),
otrr_ReflectionInfo = $rt_classWithoutFields();
function ag_Canvas() {
    let a = this; jl_Object.call(a);
    a.$ctx = null;
    a.$bitmap = null;
    a.$lastPaint = null;
}
let ag_Canvas__init_0 = (var$0, var$1) => {
    jl_Object__init_(var$0);
    var$0.$setBitmap(var$1);
},
ag_Canvas__init_ = var_0 => {
    let var_1 = new ag_Canvas();
    ag_Canvas__init_0(var_1, var_0);
    return var_1;
},
ag_Canvas_setBitmap = (var$0, var$1) => {
    var$0.$bitmap = var$1;
    var$0.$ctx = var$1 !== null ? var$1.$getContext() : null;
},
ag_Canvas_getWidth = var$0 => {
    return var$0.$bitmap === null ? 0 : var$0.$bitmap.$getWidth();
},
ag_Canvas_getHeight = var$0 => {
    return var$0.$bitmap === null ? 0 : var$0.$bitmap.$getHeight();
},
ag_Canvas_drawColor0 = (var$0, var$1) => {
    ag_PorterDuff$Mode_$callClinit();
    var$0.$drawColor(var$1, ag_PorterDuff$Mode_SRC_OVER);
},
ag_Canvas_drawColor = (var$0, var$1, var$2) => {
    let var$3, var$4, var$5, var$6;
    if (var$0.$ctx === null)
        return;
    var$3 = $rt_str(var$0.$ctx.globalCompositeOperation);
    var$4 = var$0.$ctx;
    var$2 = $rt_ustr(ag_Canvas_compositeOf(var$2));
    var$4.globalCompositeOperation = var$2;
    var$2 = var$0.$ctx;
    var$4 = $rt_ustr(ag_Canvas_cssColor(var$1));
    var$2.fillStyle = var$4;
    var$2 = var$0.$ctx;
    var$5 = var$0.$getWidth();
    var$6 = var$0.$getHeight();
    var$2.fillRect(0.0, 0.0, var$5, var$6);
    var$2 = var$0.$ctx;
    var$4 = $rt_ustr(var$3);
    var$2.globalCompositeOperation = var$4;
},
ag_Canvas_drawRect = (var$0, var$1, var$2, var$3, var$4, var$5) => {
    if (var$0.$ctx !== null && var$5 !== null) {
        ag_Canvas_applyPaint(var$0, var$5);
        var$5 = var$5.$getStyle();
        ag_Paint$Style_$callClinit();
        if (var$5 !== ag_Paint$Style_STROKE)
            var$0.$ctx.fillRect(var$1, var$2, var$3 - var$1, var$4 - var$2);
        else
            var$0.$ctx.strokeRect(var$1, var$2, var$3 - var$1, var$4 - var$2);
        return;
    }
},
ag_Canvas_drawLine = (var$0, var$1, var$2, var$3, var$4, var$5) => {
    if (var$0.$ctx !== null && var$5 !== null) {
        ag_Canvas_applyPaint(var$0, var$5);
        var$0.$ctx.beginPath();
        var$0.$ctx.moveTo(var$1, var$2);
        var$0.$ctx.lineTo(var$3, var$4);
        var$0.$ctx.stroke();
        return;
    }
},
ag_Canvas_drawCircle = (var$0, var$1, var$2, var$3, var$4) => {
    if (var$0.$ctx !== null && var$4 !== null) {
        ag_Canvas_applyPaint(var$0, var$4);
        var$0.$ctx.beginPath();
        var$0.$ctx.arc(var$1, var$2, var$3, 0.0, 6.283185307179586, !!0);
        var$4 = var$4.$getStyle();
        ag_Paint$Style_$callClinit();
        if (var$4 !== ag_Paint$Style_STROKE)
            var$0.$ctx.fill();
        else
            var$0.$ctx.stroke();
        return;
    }
},
ag_Canvas_drawOval = (var$0, var$1, var$2) => {
    let var$3, var$4;
    if (var$0.$ctx !== null && var$2 !== null && var$1 !== null) {
        ag_Canvas_applyPaint(var$0, var$2);
        var$3 = (var$1.$right0 - var$1.$left0) * 0.5;
        var$4 = (var$1.$bottom0 - var$1.$top) * 0.5;
        var$0.$ctx.beginPath();
        var$0.$ctx.ellipse(var$1.$left0 + var$3, var$1.$top + var$4, var$3, var$4, 0.0, 0.0, 6.283185307179586);
        var$1 = var$2.$getStyle();
        ag_Paint$Style_$callClinit();
        if (var$1 !== ag_Paint$Style_STROKE)
            var$0.$ctx.fill();
        else
            var$0.$ctx.stroke();
        return;
    }
},
ag_Canvas_drawPath = (var$0, var$1, var$2) => {
    if (var$0.$ctx !== null && var$2 !== null && var$1 !== null) {
        ag_Canvas_applyPaint(var$0, var$2);
        var$1.$emit(var$0.$ctx);
        var$1 = var$2.$getStyle();
        ag_Paint$Style_$callClinit();
        if (var$1 !== ag_Paint$Style_STROKE)
            var$0.$ctx.fill();
        else
            var$0.$ctx.stroke();
        return;
    }
},
ag_Canvas_drawBitmap1 = (var$0, var$1, var$2, var$3, var$4) => {
    if (var$0.$ctx !== null && var$1 !== null) {
        ag_Canvas_applyPaint(var$0, var$4);
        var$0.$ctx.drawImage(var$1.$getSource(), var$2, var$3);
        return;
    }
},
ag_Canvas_drawBitmap0 = (var$0, var$1, var$2, var$3, var$4) => {
    let var$5, var$6, var$7, var$8, var$9, var$10, var$11, var$12;
    if (var$3 === null)
        return;
    var$5 = var$2 === null ? 0.0 : var$2.$left;
    var$6 = var$2 === null ? 0.0 : var$2.$top0;
    var$7 = var$2 === null ? (-1.0) : var$2.$right;
    var$8 = var$2 === null ? (-1.0) : var$2.$bottom;
    var$9 = var$3.$left;
    var$10 = var$3.$top0;
    var$11 = var$3.$right;
    var$12 = var$3.$bottom;
    var$0.$drawBitmap(var$1, var$5, var$6, var$7, var$8, var$9, var$10, var$11, var$12, var$4);
},
ag_Canvas_drawBitmap = (var$0, var$1, var$2, var$3, var$4, var$5, var$6, var$7, var$8, var$9, var$10) => {
    if (var$0.$ctx !== null && var$1 !== null) {
        ag_Canvas_applyPaint(var$0, var$10);
        var$1 = var$1.$getSource();
        if (!(var$4 < 0.0) && !(var$5 < 0.0))
            var$0.$ctx.drawImage(var$1, var$2, var$3, var$4 - var$2, var$5 - var$3, var$6, var$7, var$8 - var$6, var$9 - var$7);
        else
            var$0.$ctx.drawImage(var$1, var$6, var$7, var$8 - var$6, var$9 - var$7);
        return;
    }
},
ag_Canvas_drawText = (var$0, var$1, var$2, var$3, var$4) => {
    if (var$0.$ctx !== null && var$4 !== null && var$1 !== null) {
        ag_Canvas_applyPaint(var$0, var$4);
        var$4 = var$4.$getStyle();
        ag_Paint$Style_$callClinit();
        if (var$4 !== ag_Paint$Style_STROKE)
            var$0.$ctx.fillText($rt_ustr(var$1), var$2, var$3);
        else
            var$0.$ctx.strokeText($rt_ustr(var$1), var$2, var$3);
        return;
    }
},
ag_Canvas_applyPaint = (var$0, var$1) => {
    if (var$1 !== null && var$0.$ctx !== null) {
        var$0.$lastPaint = var$1;
        var$1.$applyTo(var$0.$ctx);
        return;
    }
},
ag_Canvas_compositeOf = var$1 => {
    if (var$1 === null)
        return $rt_s(271);
    ag_Canvas$1_$callClinit();
    switch (ag_Canvas$1_$SwitchMap$android$graphics$PorterDuff$Mode.data[jl_Enum_ordinal(var$1)]) {
        case 1:
            break;
        case 2:
            return $rt_s(272);
        case 3:
            return $rt_s(273);
        case 4:
            return $rt_s(274);
        case 5:
            return $rt_s(275);
        case 6:
            return $rt_s(276);
        case 7:
            return $rt_s(277);
        case 8:
            return $rt_s(278);
        case 9:
            return $rt_s(279);
        case 10:
            return $rt_s(276);
        case 11:
            return $rt_s(280);
        default:
            return $rt_s(271);
    }
    return $rt_s(281);
},
ag_Canvas_cssColor = var$1 => {
    let var$2, var$3, var$4, var$5, var$6;
    var$2 = (var$1 >>> 24 | 0) & 255;
    var$3 = var$1 >> 16 & 255;
    var$4 = var$1 >> 8 & 255;
    var$1 = var$1 & 255;
    if (var$2 == 255) {
        var$5 = jl_StringBuilder__init_();
        jl_StringBuilder_append1(jl_StringBuilder_append0(jl_StringBuilder_append1(jl_StringBuilder_append0(jl_StringBuilder_append1(jl_StringBuilder_append0(jl_StringBuilder_append(var$5, $rt_s(282)), var$3), 44), var$4), 44), var$1), 41);
        return jl_StringBuilder_toString(var$5);
    }
    var$6 = var$2 / 255.0;
    var$5 = jl_StringBuilder__init_();
    jl_StringBuilder_append1(jl_StringBuilder_append4(jl_StringBuilder_append1(jl_StringBuilder_append0(jl_StringBuilder_append1(jl_StringBuilder_append0(jl_StringBuilder_append1(jl_StringBuilder_append0(jl_StringBuilder_append(var$5, $rt_s(283)), var$3), 44), var$4), 44), var$1), 44), var$6), 41);
    return jl_StringBuilder_toString(var$5);
};
function jur_AbstractCharClass$LazyCategoryScope() {
    let a = this; jur_AbstractCharClass$LazyCharClass.call(a);
    a.$category0 = 0;
    a.$mayContainSupplCodepoints2 = 0;
    a.$containsAllSurrogates = 0;
}
let jur_AbstractCharClass$LazyCategoryScope__init_1 = ($this, $cat, $mayContainSupplCodepoints) => {
    jur_AbstractCharClass$LazyCharClass__init_($this);
    $this.$mayContainSupplCodepoints2 = $mayContainSupplCodepoints;
    $this.$category0 = $cat;
},
jur_AbstractCharClass$LazyCategoryScope__init_ = (var_0, var_1) => {
    let var_2 = new jur_AbstractCharClass$LazyCategoryScope();
    jur_AbstractCharClass$LazyCategoryScope__init_1(var_2, var_0, var_1);
    return var_2;
},
jur_AbstractCharClass$LazyCategoryScope__init_0 = ($this, $cat, $mayContainSupplCodepoints, $containsAllSurrogates) => {
    jur_AbstractCharClass$LazyCharClass__init_($this);
    $this.$containsAllSurrogates = $containsAllSurrogates;
    $this.$mayContainSupplCodepoints2 = $mayContainSupplCodepoints;
    $this.$category0 = $cat;
},
jur_AbstractCharClass$LazyCategoryScope__init_2 = (var_0, var_1, var_2) => {
    let var_3 = new jur_AbstractCharClass$LazyCategoryScope();
    jur_AbstractCharClass$LazyCategoryScope__init_0(var_3, var_0, var_1, var_2);
    return var_3;
},
jur_AbstractCharClass$LazyCategoryScope_computeValue = $this => {
    let $chCl;
    $chCl = jur_UnicodeCategoryScope__init_0($this.$category0);
    if ($this.$containsAllSurrogates)
        $chCl.$lowHighSurrogates.$set(0, 2048);
    $chCl.$mayContainSupplCodepoints0 = $this.$mayContainSupplCodepoints2;
    return $chCl;
},
jur_AbstractLineTerminator = $rt_classWithoutFields(),
jur_AbstractLineTerminator_unixLT = null,
jur_AbstractLineTerminator_unicodeLT = null,
jur_AbstractLineTerminator__init_ = $this => {
    jl_Object__init_($this);
},
jur_AbstractLineTerminator_getInstance = $flag => {
    if (!($flag & 1)) {
        if (jur_AbstractLineTerminator_unicodeLT !== null)
            return jur_AbstractLineTerminator_unicodeLT;
        jur_AbstractLineTerminator_unicodeLT = jur_AbstractLineTerminator$2__init_0();
        return jur_AbstractLineTerminator_unicodeLT;
    }
    if (jur_AbstractLineTerminator_unixLT !== null)
        return jur_AbstractLineTerminator_unixLT;
    jur_AbstractLineTerminator_unixLT = jur_AbstractLineTerminator$1__init_0();
    return jur_AbstractLineTerminator_unixLT;
};
function jur_AbstractCharClass$LazyJavaTitleCase$1() {
    jur_AbstractCharClass.call(this);
    this.$this$014 = null;
}
let jur_AbstractCharClass$LazyJavaTitleCase$1__init_ = ($this, $this$0) => {
    $this.$this$014 = $this$0;
    jur_AbstractCharClass__init_($this);
},
jur_AbstractCharClass$LazyJavaTitleCase$1__init_0 = var_0 => {
    let var_1 = new jur_AbstractCharClass$LazyJavaTitleCase$1();
    jur_AbstractCharClass$LazyJavaTitleCase$1__init_(var_1, var_0);
    return var_1;
},
jur_AbstractCharClass$LazyJavaTitleCase$1_contains = ($this, $ch) => {
    return jl_Character_isTitleCase($ch);
},
r_Bootstrap = $rt_classWithoutFields(),
r_Bootstrap_$callClinit = () => {
    r_Bootstrap_$callClinit = $rt_eraseClinit(r_Bootstrap);
    r_Bootstrap__clinit_();
},
r_Bootstrap_main = var$1 => {
    let var$2, var$3, var$4, $$je, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        let $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$4 = $thread.pop();var$3 = $thread.pop();var$2 = $thread.pop();var$1 = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        r_Bootstrap_$callClinit();
        r_Bootstrap_smokeTest();
        try {
            r_Bootstrap_touch($rt_cls(ccra_RWApplication));
            r_Bootstrap_touch($rt_cls(ccra_IntroScreen));
            r_Bootstrap_touch($rt_cls(ccra_MainMenuActivity));
            r_Bootstrap_touch($rt_cls(ccra_InGameActivity));
            r_Bootstrap_touch($rt_cls(ccra_GameViewOpenGL));
            r_Bootstrap_touch($rt_cls(ccra_GameViewNonSurface));
            r_Bootstrap_touch($rt_cls(ccra_GLSurfaceViewShared));
            var$2 = ccrg_ak__init_0();
            $ptr = 1;
            continue main;
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            if ($$je instanceof jl_Throwable) {
                var$2 = $$je;
            } else {
                throw $$e;
            }
        }
        var$3 = jl_System_out();
        var$2 = jl_String_valueOf(var$2);
        var$4 = jl_StringBuilder__init_();
        jl_StringBuilder_append(jl_StringBuilder_append(var$4, $rt_s(284)), var$2);
        var$3.$println(jl_StringBuilder_toString(var$4));
        (jl_System_out()).$println($rt_s(285));
        return;
    case 1:
        a: {
            try {
                ccrg_ak_run(var$2);
                if ($rt_suspending()) {
                    break main;
                }
                r_Bootstrap_touch($rt_cls(ccrgb_t));
                r_Bootstrap_touch($rt_cls(ccrgm_h));
                r_Bootstrap_touch($rt_cls(ccrg_k));
                r_Bootstrap_touch($rt_cls(ccrg_bp));
                break a;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                if ($$je instanceof jl_Throwable) {
                    var$2 = $$je;
                    var$3 = jl_System_out();
                    var$2 = jl_String_valueOf(var$2);
                    var$4 = jl_StringBuilder__init_();
                    jl_StringBuilder_append(jl_StringBuilder_append(var$4, $rt_s(284)), var$2);
                    var$3.$println(jl_StringBuilder_toString(var$4));
                    break a;
                } else {
                    throw $$e;
                }
            }
        }
        (jl_System_out()).$println($rt_s(285));
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push(var$1, var$2, var$3, var$4, $ptr);
},
r_Bootstrap_smokeTest = () => {
    let var$1, var$2, var$3, var$4, var$5, var$6, var$7, $$je;
    r_Bootstrap_$callClinit();
    r_Bootstrap_step($rt_s(286));
    ag_Bitmap$Config_$callClinit();
    var$1 = ag_Bitmap_createBitmap(320, 200, ag_Bitmap$Config_ARGB_8888);
    r_Bootstrap_step($rt_s(287));
    var$2 = ag_Canvas__init_(var$1);
    r_Bootstrap_step($rt_s(288));
    var$3 = ag_Paint__init_();
    r_Bootstrap_step($rt_s(289));
    var$2.$drawColor0((-16777216));
    r_Bootstrap_step($rt_s(290));
    var$3.$setColor((-65536));
    ag_Paint$Style_$callClinit();
    var$3.$setStyle(ag_Paint$Style_FILL);
    var$2.$drawRect(10.0, 10.0, 100.0, 60.0, var$3);
    r_Bootstrap_step($rt_s(291));
    var$3.$setColor((-16711936));
    var$3.$setStyle(ag_Paint$Style_STROKE);
    var$3.$setStrokeWidth(2.5);
    var$2.$drawCircle(160.0, 60.0, 30.0, var$3);
    var$2.$drawLine(10.0, 80.0, 300.0, 80.0, var$3);
    r_Bootstrap_step($rt_s(292));
    var$4 = ag_RectF__init_1(10.0, 100.0, 120.0, 160.0);
    var$2.$drawOval(var$4, var$3);
    r_Bootstrap_step($rt_s(293));
    var$4 = ag_Path__init_0();
    var$4.$moveTo(150.0, 120.0);
    var$4.$lineTo(200.0, 180.0);
    var$4.$lineTo(100.0, 180.0);
    var$4.$close();
    var$2.$drawPath(var$4, var$3);
    r_Bootstrap_step($rt_s(294));
    var$3.$setColor((-1));
    var$3.$setStyle(ag_Paint$Style_FILL);
    var$3.$setTextSize(16.0);
    var$2.$drawText($rt_s(295), 10.0, 190.0, var$3);
    r_Bootstrap_step($rt_s(296));
    var$5 = var$1.$getWidth();
    var$6 = var$1.$getHeight();
    var$7 = var$1.$getPixel(50, 30);
    var$2 = jl_System_out();
    var$3 = jl_Integer_toHexString(var$7);
    var$4 = jl_StringBuilder__init_();
    jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append0(jl_StringBuilder_append1(jl_StringBuilder_append0(jl_StringBuilder_append(var$4, $rt_s(297)), var$5), 120), var$6), $rt_s(298)), var$3);
    var$2.$println(jl_StringBuilder_toString(var$4));
    r_Bootstrap_rwAdapterSmoke();
    r_Bootstrap_rwImageSmoke();
    r_Bootstrap_rwRealAssetSmoke();
    r_Bootstrap_webglSmoke();
    r_Bootstrap_rwRendererSmoke();
    a: {
        try {
            r_Bootstrap_rwRealMap();
            break a;
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            if ($$je instanceof jl_Throwable) {
                var$2 = $$je;
                var$2 = jl_String_valueOf(var$2);
                var$3 = jl_StringBuilder__init_();
                jl_StringBuilder_append(jl_StringBuilder_append(var$3, $rt_s(299)), var$2);
                r_Bootstrap_step(jl_StringBuilder_toString(var$3));
                break a;
            } else {
                throw $$e;
            }
        }
    }
    var$2 = window.document;
    if (var$2 !== null && var$2.body !== null)
        var$2.body.appendChild(var$1.$getElement0());
},
r_Bootstrap_step = var$1 => {
    let var$2, var$3;
    r_Bootstrap_$callClinit();
    var$2 = jl_System_out();
    var$3 = jl_StringBuilder__init_();
    jl_StringBuilder_append(jl_StringBuilder_append(var$3, $rt_s(300)), var$1);
    var$2.$println(jl_StringBuilder_toString(var$3));
    var$2 = jl_StringBuilder__init_();
    jl_StringBuilder_append(jl_StringBuilder_append(var$2, $rt_s(300)), var$1);
    r_Bootstrap_domLog$js_body$_3($rt_ustr(jl_StringBuilder_toString(var$2)));
},
r_Bootstrap_rwAdapterSmoke = () => {
    let var$1, var$2, var$3;
    r_Bootstrap_$callClinit();
    r_Bootstrap_step($rt_s(301));
    ag_Bitmap$Config_$callClinit();
    var$1 = ag_Bitmap_createBitmap(320, 90, ag_Bitmap$Config_ARGB_8888);
    var$2 = ag_Canvas__init_(var$1);
    var$3 = ccrgm_h__init_(var$2);
    r_Bootstrap_step($rt_s(302));
    ccrgm_h_a(var$3, (-15720400));
    var$2 = ag_Paint__init_();
    var$2.$setColor((-13312));
    ag_Paint$Style_$callClinit();
    var$2.$setStyle(ag_Paint$Style_STROKE);
    var$2.$setStrokeWidth(2.0);
    r_Bootstrap_step($rt_s(303));
    ccrgm_h_a2(var$3, 8.0, 14.0, 312.0, 14.0, var$2);
    r_Bootstrap_step($rt_s(304));
    ccrgm_h_a4(var$3, ag_RectF__init_1(8.0, 24.0, 120.0, 72.0), var$2);
    var$2.$setColor((-1));
    var$2.$setStyle(ag_Paint$Style_FILL);
    var$2.$setTextSize(14.0);
    r_Bootstrap_step($rt_s(305));
    ccrgm_h_a0(var$3, $rt_s(306), 130.0, 56.0, var$2);
    r_Bootstrap_step($rt_s(307));
    var$3 = window.document;
    if (var$3 !== null && var$3.body !== null)
        var$3.body.appendChild(var$1.$getElement0());
},
r_Bootstrap_rwImageSmoke = () => {
    let var$1, var$2, var$3, var$4, var$5, var$6;
    r_Bootstrap_$callClinit();
    r_Bootstrap_step($rt_s(308));
    ag_Bitmap$Config_$callClinit();
    var$1 = ag_Bitmap_createBitmap(64, 64, ag_Bitmap$Config_ARGB_8888);
    var$2 = ag_Canvas__init_(var$1);
    var$2.$drawColor0(0);
    var$3 = ag_Paint__init_();
    var$3.$setColor((-11895745));
    ag_Paint$Style_$callClinit();
    var$3.$setStyle(ag_Paint$Style_FILL);
    var$2.$drawCircle(32.0, 34.0, 26.0, var$3);
    var$3.$setColor((-13940186));
    var$3.$setStyle(ag_Paint$Style_STROKE);
    var$3.$setStrokeWidth(3.0);
    var$2.$drawRect(16.0, 26.0, 48.0, 42.0, var$3);
    var$3.$setColor((-2580164));
    var$3.$setStyle(ag_Paint$Style_FILL);
    var$2.$drawRect(28.0, 8.0, 36.0, 30.0, var$3);
    r_Bootstrap_step($rt_s(309));
    var$2 = ccrgm_e__init_();
    var$2.$a7(var$1);
    r_Bootstrap_step($rt_s(310));
    var$1 = ag_Bitmap_createBitmap(320, 120, ag_Bitmap$Config_ARGB_8888);
    var$4 = ag_Canvas__init_(var$1);
    var$5 = ccrgm_h__init_(var$4);
    ccrgm_h_a(var$5, (-15854048));
    var$6 = 0;
    while (var$6 < 5) {
        ccrgm_h_a1(var$5, var$2, 12 + (var$6 * 60 | 0) | 0, 26.0, var$3);
        var$6 = var$6 + 1 | 0;
    }
    var$2 = ag_Paint__init_();
    var$2.$setColor((-7629666));
    var$2.$setTextSize(11.0);
    ccrgm_h_a0(var$5, $rt_s(311), 12.0, 108.0, var$2);
    r_Bootstrap_step($rt_s(312));
    var$2 = window.document;
    if (var$2 !== null && var$2.body !== null)
        var$2.body.appendChild(var$1.$getElement0());
},
r_Bootstrap_rwRealAssetSmoke = () => {
    let var$1, var$2, var$3, var$4, var$5, var$6;
    r_Bootstrap_$callClinit();
    r_Bootstrap_step($rt_s(313));
    var$1 = window.document;
    var$2 = var$1.getElementById("tankCanvas");
    if (var$2 === null) {
        r_Bootstrap_step($rt_s(314));
        return;
    }
    var$2 = ag_Bitmap_fromElement(var$2);
    if (var$2 === null) {
        r_Bootstrap_step($rt_s(315));
        return;
    }
    var$3 = var$2.$getWidth();
    var$4 = var$2.$getHeight();
    var$1 = jl_StringBuilder__init_();
    jl_StringBuilder_append0(jl_StringBuilder_append1(jl_StringBuilder_append0(jl_StringBuilder_append(var$1, $rt_s(316)), var$3), 120), var$4);
    r_Bootstrap_step(jl_StringBuilder_toString(var$1));
    var$1 = ccrgm_e__init_();
    var$1.$a7(var$2);
    ag_Bitmap$Config_$callClinit();
    var$2 = ag_Bitmap_createBitmap(320, 110, ag_Bitmap$Config_ARGB_8888);
    var$5 = ag_Canvas__init_(var$2);
    var$6 = ccrgm_h__init_(var$5);
    ccrgm_h_a(var$6, (-15588818));
    var$3 = 0;
    while (var$3 < 5) {
        ccrgm_h_a1(var$6, var$1, 14 + (var$3 * 60 | 0) | 0, 24.0, ag_Paint__init_());
        var$3 = var$3 + 1 | 0;
    }
    var$1 = ag_Paint__init_();
    var$1.$setColor((-8408376));
    var$1.$setTextSize(11.0);
    ccrgm_h_a0(var$6, $rt_s(317), 14.0, 96.0, var$1);
    r_Bootstrap_step($rt_s(318));
    var$1 = window.document;
    if (var$1 !== null && var$1.body !== null)
        var$1.body.appendChild(var$2.$getElement0());
},
r_Bootstrap_webglSmoke = () => {
    let var$1, var$2, var$3, var$4, var$5, var$6, var$7, var$8, var$9, var$10, var$11;
    r_Bootstrap_$callClinit();
    r_Bootstrap_step($rt_s(319));
    var$1 = window.document;
    var$2 = var$1.createElement("canvas");
    var$2.width = 320;
    var$2.height = 160;
    var$3 = var$2.getContext("webgl", r_Bootstrap_glAttrs$js_body$_9());
    if (var$3 === null) {
        r_Bootstrap_step($rt_s(320));
        return;
    }
    ao_GLES20_setContext(var$3);
    r_Bootstrap_step($rt_s(321));
    var$4 = ao_GLES20_glCreateShader(35633);
    ao_GLES20_glShaderSource(var$4, $rt_s(322));
    ao_GLES20_glCompileShader(var$4);
    var$5 = $rt_createIntArray(1);
    var$6 = var$5.data;
    ao_GLES20_glGetShaderiv(var$4, 35713, var$5, 0);
    if (!var$6[0]) {
        var$7 = ao_GLES20_glGetShaderInfoLog(var$4);
        var$1 = jl_StringBuilder__init_();
        jl_StringBuilder_append(jl_StringBuilder_append(var$1, $rt_s(323)), var$7);
        r_Bootstrap_step(jl_StringBuilder_toString(var$1));
        return;
    }
    var$8 = ao_GLES20_glCreateShader(35632);
    ao_GLES20_glShaderSource(var$8, $rt_s(324));
    ao_GLES20_glCompileShader(var$8);
    ao_GLES20_glGetShaderiv(var$8, 35713, var$5, 0);
    if (!var$6[0]) {
        var$7 = ao_GLES20_glGetShaderInfoLog(var$8);
        var$1 = jl_StringBuilder__init_();
        jl_StringBuilder_append(jl_StringBuilder_append(var$1, $rt_s(325)), var$7);
        r_Bootstrap_step(jl_StringBuilder_toString(var$1));
        return;
    }
    r_Bootstrap_step($rt_s(326));
    var$9 = ao_GLES20_glCreateProgram();
    ao_GLES20_glAttachShader(var$9, var$4);
    ao_GLES20_glAttachShader(var$9, var$8);
    ao_GLES20_glLinkProgram(var$9);
    ao_GLES20_glGetProgramiv(var$9, 35714, var$5, 0);
    if (!var$6[0]) {
        var$7 = ao_GLES20_glGetProgramInfoLog(var$9);
        var$1 = jl_StringBuilder__init_();
        jl_StringBuilder_append(jl_StringBuilder_append(var$1, $rt_s(327)), var$7);
        r_Bootstrap_step(jl_StringBuilder_toString(var$1));
        return;
    }
    ao_GLES20_glUseProgram(var$9);
    r_Bootstrap_step($rt_s(328));
    var$10 = ao_GLES20_glGetAttribLocation(var$9, $rt_s(329));
    var$9 = ao_GLES20_glGetAttribLocation(var$9, $rt_s(261));
    var$7 = jl_StringBuilder__init_();
    jl_StringBuilder_append0(jl_StringBuilder_append(jl_StringBuilder_append0(jl_StringBuilder_append(var$7, $rt_s(330)), var$10), $rt_s(331)), var$9);
    r_Bootstrap_step(jl_StringBuilder_toString(var$7));
    var$5 = $rt_createFloatArray(15);
    var$6 = var$5.data;
    var$6[0] = 0.0;
    var$6[1] = 0.800000011920929;
    var$6[2] = 1.0;
    var$6[3] = 0.20000000298023224;
    var$6[4] = 0.20000000298023224;
    var$6[5] = (-0.800000011920929);
    var$6[6] = (-0.699999988079071);
    var$6[7] = 0.20000000298023224;
    var$6[8] = 1.0;
    var$6[9] = 0.30000001192092896;
    var$6[10] = 0.800000011920929;
    var$6[11] = (-0.699999988079071);
    var$6[12] = 0.30000001192092896;
    var$6[13] = 0.4000000059604645;
    var$6[14] = 1.0;
    var$8 = var$6.length;
    var$7 = jn_FloatBuffer_allocate(var$8);
    jn_FloatBuffer_put(var$7, var$5);
    var$7.$position2(0);
    var$5 = $rt_createIntArray(1);
    var$6 = var$5.data;
    ao_GLES20_glGenBuffers(1, var$5, 0);
    ao_GLES20_glBindBuffer(34962, var$6[0]);
    ao_GLES20_glBufferData(34962, var$8 * 4 | 0, var$7, 35044);
    ao_GLES20_glEnableVertexAttribArray(var$10);
    ao_GLES20_glVertexAttribPointer(var$10, 2, 5126, 0, 20, 0);
    ao_GLES20_glEnableVertexAttribArray(var$9);
    ao_GLES20_glVertexAttribPointer(var$9, 3, 5126, 0, 20, 8);
    r_Bootstrap_step($rt_s(332));
    ao_GLES20_glClearColor(0.05000000074505806, 0.09000000357627869, 0.12999999523162842, 1.0);
    ao_GLES20_glClear(16384);
    ao_GLES20_glViewport(0, 0, 320, 160);
    ao_GLES20_glDrawArrays(4, 0, 3);
    ao_GLES20_glFinish();
    var$4 = ao_GLES20_glGetError();
    var$7 = new Uint8Array(4);
    var$3.readPixels(160, 80, 1, 1, 6408, 5121, var$7);
    var$8 = var$7[0] & 255;
    var$9 = var$7[1] & 255;
    var$10 = var$7[2] & 255;
    var$7 = jl_StringBuilder__init_();
    jl_StringBuilder_append1(jl_StringBuilder_append0(jl_StringBuilder_append1(jl_StringBuilder_append0(jl_StringBuilder_append1(jl_StringBuilder_append0(jl_StringBuilder_append(jl_StringBuilder_append0(jl_StringBuilder_append(var$7, $rt_s(333)), var$4), $rt_s(334)), var$8), 44), var$9), 44), var$10), 41);
    r_Bootstrap_step(jl_StringBuilder_toString(var$7));
    if (var$1.body !== null) {
        var$11 = var$1.createElement("img");
        var$11.setAttribute("src", $rt_ustr($rt_str(var$2.toDataURL("image/png"))));
        var$1.body.appendChild(var$11);
    }
},
r_Bootstrap_rwRendererSmoke = () => {
    let var$1, var$2, var$3, var$4, var$5, var$6, var$7, var$8, $$je;
    r_Bootstrap_$callClinit();
    if (jl_System_getProperty($rt_s(335)) !== null) {
        var$1 = r_Bootstrap$1__init_0();
        ao_GLES20_$callClinit();
        ao_GLES20_sink = var$1;
    }
    r_Bootstrap_step($rt_s(336));
    a: {
        try {
            var$2 = ccrgb_h__init_0();
            break a;
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            if ($$je instanceof jl_Throwable) {
                var$1 = $$je;
            } else {
                throw $$e;
            }
        }
        var$1 = jl_String_valueOf(var$1);
        var$2 = jl_StringBuilder__init_();
        jl_StringBuilder_append(jl_StringBuilder_append(var$2, $rt_s(337)), var$1);
        r_Bootstrap_step(jl_StringBuilder_toString(var$2));
        return;
    }
    r_Bootstrap_step($rt_s(338));
    b: {
        try {
            var$1 = ccrgb_t__init_(var$2);
            break b;
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            if ($$je instanceof jl_Throwable) {
                var$1 = $$je;
            } else {
                throw $$e;
            }
        }
        var$1 = jl_String_valueOf(var$1);
        var$2 = jl_StringBuilder__init_();
        jl_StringBuilder_append(jl_StringBuilder_append(var$2, $rt_s(339)), var$1);
        r_Bootstrap_step(jl_StringBuilder_toString(var$2));
        return;
    }
    r_Bootstrap_step($rt_s(340));
    c: {
        try {
            ccrgb_t_b(var$1);
            var$3 = ao_GLES20_glGetError();
            var$2 = jl_StringBuilder__init_();
            jl_StringBuilder_append0(jl_StringBuilder_append(var$2, $rt_s(341)), var$3);
            r_Bootstrap_step(jl_StringBuilder_toString(var$2));
            break c;
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            if ($$je instanceof jl_Throwable) {
                var$2 = $$je;
                var$2 = jl_String_valueOf(var$2);
                var$4 = jl_StringBuilder__init_();
                jl_StringBuilder_append(jl_StringBuilder_append(var$4, $rt_s(342)), var$2);
                r_Bootstrap_step(jl_StringBuilder_toString(var$4));
                break c;
            } else {
                throw $$e;
            }
        }
    }
    r_Bootstrap_step($rt_s(343));
    d: {
        try {
            var$2 = ccrgb_ac__init_0();
            var$2.$a36 = 1.0;
            var$2.$b9 = (-1);
            var$5 = $rt_createFloatArray(6);
            var$6 = var$5.data;
            var$6[0] = (-0.6000000238418579);
            var$6[1] = (-0.6000000238418579);
            var$6[2] = 0.6000000238418579;
            var$6[3] = (-0.6000000238418579);
            var$6[4] = 0.0;
            var$6[5] = 0.699999988079071;
            ccrgb_t_a5(var$1, var$5, 0, var$6.length, var$2, r_Bootstrap$TestShader__init_0());
            var$3 = ao_GLES20_glGetError();
            var$1 = jl_StringBuilder__init_();
            jl_StringBuilder_append0(jl_StringBuilder_append(var$1, $rt_s(344)), var$3);
            r_Bootstrap_step(jl_StringBuilder_toString(var$1));
            var$2 = new Uint8Array(4);
            (ao_GLES20_getContext()).readPixels(160, 80, 1, 1, 6408, 5121, var$2);
            var$3 = var$2[0] & 255;
            var$7 = var$2[1] & 255;
            var$8 = var$2[2] & 255;
            var$1 = jl_StringBuilder__init_();
            jl_StringBuilder_append1(jl_StringBuilder_append0(jl_StringBuilder_append1(jl_StringBuilder_append0(jl_StringBuilder_append1(jl_StringBuilder_append0(jl_StringBuilder_append(var$1, $rt_s(345)), var$3), 44), var$7), 44), var$8), 41);
            var$1 = jl_StringBuilder_toString(var$1);
            r_Bootstrap_step(var$1);
            break d;
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            if ($$je instanceof jl_Throwable) {
                var$1 = $$je;
                var$1 = jl_String_valueOf(var$1);
                var$2 = jl_StringBuilder__init_();
                jl_StringBuilder_append(jl_StringBuilder_append(var$2, $rt_s(346)), var$1);
                r_Bootstrap_step(jl_StringBuilder_toString(var$2));
                break d;
            } else {
                throw $$e;
            }
        }
    }
},
r_Bootstrap_rwRealMap = () => {
    let var$1, var$2, var$3, var$4, var$5, var$6, var$7, var$8, var$9, var$10, var$11, var$12, var$13, var$14, var$15, var$16, var$17, var$18, var$19, var$20, var$21, var$22, var$23, var$24, var$25, var$26, var$27, var$28, var$29, var$30, var$31;
    r_Bootstrap_$callClinit();
    var$1 = window.__map ? window.__map.w : 0;
    var$2 = window.__map ? window.__map.h : 0;
    var$3 = jl_StringBuilder__init_();
    jl_StringBuilder_append0(jl_StringBuilder_append1(jl_StringBuilder_append0(jl_StringBuilder_append(var$3, $rt_s(347)), var$1), 120), var$2);
    r_Bootstrap_step(jl_StringBuilder_toString(var$3));
    var$4 = window.__map && window.__map.tsMeta || null;
    if (var$4 !== null && (window.__map && window.__map.layers ? window.__map.layers.length : 0)) {
        var$5 = window.__map ? window.__map.w : 0;
        var$6 = window.__map ? window.__map.h : 0;
        var$7 = window.__map ? window.__map.tsCount : 0;
        var$8 = $rt_createArray(ccrgm_e, 16);
        var$9 = 0;
        var$1 = 0;
        a: {
            while (true) {
                if (var$1 >= 16)
                    break a;
                var$3 = window.__map && window.__map.tiles[var$1] || null;
                if (var$3 === null)
                    break;
                var$10 = var$8.data;
                var$3 = ag_Bitmap_fromElement(var$3);
                var$11 = ccrgm_e__init_();
                var$11.$a7(var$3);
                var$10[var$1] = var$11;
                var$9 = var$9 + 1 | 0;
                var$1 = var$1 + 1 | 0;
            }
        }
        var$3 = jl_StringBuilder__init_();
        jl_StringBuilder_append(jl_StringBuilder_append0(jl_StringBuilder_append(jl_StringBuilder_append0(jl_StringBuilder_append(var$3, $rt_s(348)), var$9), $rt_s(349)), var$7), $rt_s(350));
        r_Bootstrap_step(jl_StringBuilder_toString(var$3));
        var$1 = var$5 * 20 | 0;
        var$12 = var$6 * 20 | 0;
        ag_Bitmap$Config_$callClinit();
        var$13 = ag_Bitmap_createBitmap(var$1, var$12, ag_Bitmap$Config_ARGB_8888);
        var$3 = ag_Canvas__init_(var$13);
        var$11 = ccrgm_h__init_(var$3);
        var$14 = ag_Paint__init_();
        ccrgm_h_a(var$11, ag_Color_rgb(12, 26, 34));
        var$15 = jl_System_currentTimeMillis();
        var$16 = 0;
        var$17 = window.__map && window.__map.layers ? window.__map.layers.length : 0;
        var$18 = 0;
        while (var$18 < var$17) {
            var$19 = r_Bootstrap_mapLayerGids$js_body$_12(var$18);
            if (var$19 !== null) {
                var$20 = 0;
                var$21 = 0;
                while (var$21 < var$6) {
                    var$22 = 0;
                    while (var$22 < var$5) {
                        var$1 = var$19[$rt_imul(var$21, var$5) + var$22 | 0];
                        if (var$1) {
                            var$23 = (-1);
                            var$24 = 0;
                            var$25 = (-1);
                            var$26 = 0;
                            var$27 = 20;
                            var$28 = 20;
                            while (var$26 < var$7) {
                                var$29 = var$26 * 5 | 0;
                                var$12 = var$4[var$29];
                                if (var$12 <= var$1 && var$12 > var$23) {
                                    var$24 = var$4[var$29 + 1 | 0];
                                    var$27 = var$4[var$29 + 2 | 0];
                                    var$28 = var$4[var$29 + 3 | 0];
                                    var$25 = var$4[var$29 + 4 | 0];
                                    var$23 = var$12;
                                }
                                var$26 = var$26 + 1 | 0;
                            }
                            if (var$25 >= 0 && var$25 < var$9 && var$24 > 0) {
                                var$10 = var$8.data;
                                var$1 = var$1 - var$23 | 0;
                                var$12 = $rt_imul(var$1 % var$24 | 0, var$27);
                                var$1 = $rt_imul(var$1 / var$24 | 0, var$28);
                                var$30 = ag_Rect__init_2(var$12, var$1, var$12 + var$27 | 0, var$1 + var$28 | 0);
                                var$31 = new ag_Rect;
                                var$1 = var$22 * 20 | 0;
                                var$12 = var$21 * 20 | 0;
                                ag_Rect__init_0(var$31, var$1, var$12, var$1 + 20 | 0, var$12 + 20 | 0);
                                ccrgm_h_a3(var$11, var$10[var$25], var$30, var$31, var$14);
                                var$16 = var$16 + 1 | 0;
                                var$20 = var$20 + 1 | 0;
                            }
                        }
                        var$22 = var$22 + 1 | 0;
                    }
                    var$21 = var$21 + 1 | 0;
                }
                var$3 = jl_StringBuilder__init_();
                jl_StringBuilder_append0(jl_StringBuilder_append(jl_StringBuilder_append0(jl_StringBuilder_append(var$3, $rt_s(351)), var$18), $rt_s(352)), var$20);
                r_Bootstrap_step(jl_StringBuilder_toString(var$3));
            }
            var$18 = var$18 + 1 | 0;
        }
        var$15 = Long_sub(jl_System_currentTimeMillis(), var$15);
        var$3 = jl_StringBuilder__init_();
        jl_StringBuilder_append(jl_StringBuilder_append5(jl_StringBuilder_append(jl_StringBuilder_append0(jl_StringBuilder_append(var$3, $rt_s(353)), var$16), $rt_s(354)), var$15), $rt_s(355));
        r_Bootstrap_step(jl_StringBuilder_toString(var$3));
        var$3 = var$13.$getElement0();
        if (var$3 !== null) {
            var$3.setAttribute("style", "max-width:100%;height:auto;border:1px solid #30363d");
            var$11 = window.document;
            if (var$11 !== null && var$11.body !== null)
                var$11.body.appendChild(var$3);
        }
        r_Bootstrap_step($rt_s(356));
        return;
    }
    r_Bootstrap_step($rt_s(357));
},
r_Bootstrap_touch = var$1 => {
    r_Bootstrap_$callClinit();
    if (var$1 !== null)
        return;
    $rt_throw(jl_IllegalStateException__init_0());
},
r_Bootstrap_domLog$js_body$_3 = var$1 => {
    var el = document.getElementById('log');
    if (el) {
        el.textContent += var$1 + String.fromCharCode(10);
    }
},
r_Bootstrap_glAttrs$js_body$_9 = () => {
    return { preserveDrawingBuffer : true, antialias : false, depth : true };
},
r_Bootstrap_mapLayerGids$js_body$_12 = var$1 => {
    return window.__map && window.__map.layers[var$1] ? window.__map.layers[var$1].gids : null;
},
r_Bootstrap__clinit_ = () => {
    return;
},
ju_Collections$_clinit_$lambda$_59_0 = $rt_classWithoutFields(),
ju_Collections$_clinit_$lambda$_59_0__init_ = var$0 => {
    jl_Object__init_(var$0);
},
ju_Collections$_clinit_$lambda$_59_0__init_0 = () => {
    let var_0 = new ju_Collections$_clinit_$lambda$_59_0();
    ju_Collections$_clinit_$lambda$_59_0__init_(var_0);
    return var_0;
},
ag_Paint$Cap = $rt_classWithoutFields(jl_Enum),
ag_Paint$Cap_BUTT = null,
ag_Paint$Cap_ROUND = null,
ag_Paint$Cap_SQUARE = null,
ag_Paint$Cap_$VALUES = null,
ag_Paint$Cap_$callClinit = () => {
    ag_Paint$Cap_$callClinit = $rt_eraseClinit(ag_Paint$Cap);
    ag_Paint$Cap__clinit_();
},
ag_Paint$Cap_values = () => {
    ag_Paint$Cap_$callClinit();
    return ag_Paint$Cap_$VALUES.$clone0();
},
ag_Paint$Cap__init_0 = (var$0, var$1, var$2) => {
    ag_Paint$Cap_$callClinit();
    jl_Enum__init_(var$0, var$1, var$2);
},
ag_Paint$Cap__init_ = (var_0, var_1) => {
    let var_2 = new ag_Paint$Cap();
    ag_Paint$Cap__init_0(var_2, var_0, var_1);
    return var_2;
},
ag_Paint$Cap_$values = () => {
    let var$1, var$2;
    ag_Paint$Cap_$callClinit();
    var$1 = $rt_createArray(ag_Paint$Cap, 3);
    var$2 = var$1.data;
    var$2[0] = ag_Paint$Cap_BUTT;
    var$2[1] = ag_Paint$Cap_ROUND;
    var$2[2] = ag_Paint$Cap_SQUARE;
    return var$1;
},
ag_Paint$Cap__clinit_ = () => {
    ag_Paint$Cap_BUTT = ag_Paint$Cap__init_($rt_s(358), 0);
    ag_Paint$Cap_ROUND = ag_Paint$Cap__init_($rt_s(359), 1);
    ag_Paint$Cap_SQUARE = ag_Paint$Cap__init_($rt_s(360), 2);
    ag_Paint$Cap_$VALUES = ag_Paint$Cap_$values();
};
function jur_AbstractCharClass$LazyJavaMirrored$1() {
    jur_AbstractCharClass.call(this);
    this.$this$021 = null;
}
let jur_AbstractCharClass$LazyJavaMirrored$1__init_ = ($this, $this$0) => {
    $this.$this$021 = $this$0;
    jur_AbstractCharClass__init_($this);
},
jur_AbstractCharClass$LazyJavaMirrored$1__init_0 = var_0 => {
    let var_1 = new jur_AbstractCharClass$LazyJavaMirrored$1();
    jur_AbstractCharClass$LazyJavaMirrored$1__init_(var_1, var_0);
    return var_1;
},
jur_AbstractCharClass$LazyJavaMirrored$1_contains = ($this, $ch) => {
    return 0;
};
function jur_AbstractCharClass$LazyJavaISOControl$1() {
    jur_AbstractCharClass.call(this);
    this.$this$035 = null;
}
let jur_AbstractCharClass$LazyJavaISOControl$1__init_ = ($this, $this$0) => {
    $this.$this$035 = $this$0;
    jur_AbstractCharClass__init_($this);
},
jur_AbstractCharClass$LazyJavaISOControl$1__init_0 = var_0 => {
    let var_1 = new jur_AbstractCharClass$LazyJavaISOControl$1();
    jur_AbstractCharClass$LazyJavaISOControl$1__init_(var_1, var_0);
    return var_1;
},
jur_AbstractCharClass$LazyJavaISOControl$1_contains = ($this, $ch) => {
    return jl_Character_isISOControl($ch);
};
function jur_UEOLSet() {
    jur_AbstractSet.call(this);
    this.$consCounter3 = 0;
}
let jur_UEOLSet__init_ = ($this, $counter) => {
    jur_AbstractSet__init_($this);
    $this.$consCounter3 = $counter;
},
jur_UEOLSet__init_0 = var_0 => {
    let var_1 = new jur_UEOLSet();
    jur_UEOLSet__init_(var_1, var_0);
    return var_1;
},
jur_UEOLSet_matches = ($this, $strIndex, $testString, $matchResult) => {
    let $rightBound;
    $rightBound = !$matchResult.$hasAnchoringBounds() ? $testString.$length() : $matchResult.$getRightBound();
    if ($strIndex >= $rightBound) {
        $matchResult.$setConsumed($this.$consCounter3, 0);
        return $this.$next1.$matches($strIndex, $testString, $matchResult);
    }
    if (($rightBound - $strIndex | 0) == 1 && $testString.$charAt($strIndex) == 10) {
        $matchResult.$setConsumed($this.$consCounter3, 1);
        return $this.$next1.$matches($strIndex + 1 | 0, $testString, $matchResult);
    }
    return (-1);
},
jur_UEOLSet_hasConsumed = ($this, $matchResult) => {
    let $res;
    $res = !$matchResult.$getConsumed($this.$consCounter3) ? 0 : 1;
    $matchResult.$setConsumed($this.$consCounter3, (-1));
    return $res;
},
ccra_MainMenuActivity = $rt_classWithoutFields(ccra_a);
function jur_UCICharSet() {
    jur_LeafSet.call(this);
    this.$ch2 = 0;
}
let jur_UCICharSet__init_ = ($this, $ch) => {
    jur_LeafSet__init_($this);
    $this.$ch2 = jl_Character_toLowerCase(jl_Character_toUpperCase($ch));
},
jur_UCICharSet__init_0 = var_0 => {
    let var_1 = new jur_UCICharSet();
    jur_UCICharSet__init_(var_1, var_0);
    return var_1;
},
jur_UCICharSet_accepts = ($this, $strIndex, $testString) => {
    return $this.$ch2 != jl_Character_toLowerCase(jl_Character_toUpperCase($testString.$charAt($strIndex))) ? (-1) : 1;
};
function jur_AtomicFSet() {
    jur_FSet.call(this);
    this.$index2 = 0;
}
let jur_AtomicFSet__init_ = ($this, $groupIndex) => {
    jur_FSet__init_($this, $groupIndex);
},
jur_AtomicFSet__init_0 = var_0 => {
    let var_1 = new jur_AtomicFSet();
    jur_AtomicFSet__init_(var_1, var_0);
    return var_1;
},
jur_AtomicFSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $gr;
    $gr = $this.$getGroupIndex();
    $matchResult.$setConsumed($gr, $stringIndex - $matchResult.$getConsumed($gr) | 0);
    $this.$index2 = $stringIndex;
    return $stringIndex;
},
jur_AtomicFSet_getIndex = $this => {
    return $this.$index2;
},
jur_AtomicFSet_hasConsumed = ($this, $mr) => {
    return 0;
};
function jur_LowSurrogateCharSet() {
    jur_JointSet.call(this);
    this.$low = 0;
}
let jur_LowSurrogateCharSet__init_0 = ($this, $low) => {
    jur_JointSet__init_($this);
    $this.$low = $low;
},
jur_LowSurrogateCharSet__init_ = var_0 => {
    let var_1 = new jur_LowSurrogateCharSet();
    jur_LowSurrogateCharSet__init_0(var_1, var_0);
    return var_1;
},
jur_LowSurrogateCharSet_setNext = ($this, $next) => {
    $this.$next1 = $next;
},
jur_LowSurrogateCharSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let var$4, $low, $high;
    var$4 = $stringIndex + 1 | 0;
    if (var$4 > $matchResult.$getRightBound()) {
        $matchResult.$hitEnd = 1;
        return (-1);
    }
    $low = $testString.$charAt($stringIndex);
    if ($stringIndex > $matchResult.$getLeftBound()) {
        $high = $testString.$charAt($stringIndex - 1 | 0);
        if (jl_Character_isHighSurrogate($high))
            return (-1);
    }
    if ($this.$low != $low)
        return (-1);
    return $this.$next1.$matches(var$4, $testString, $matchResult);
},
jur_LowSurrogateCharSet_find = ($this, $strIndex, $testString, $matchResult) => {
    let $testStr, $startStr, $strLength, var$7, var$8;
    if (!($testString instanceof jl_String))
        return jur_AbstractSet_find($this, $strIndex, $testString, $matchResult);
    $testStr = $testString;
    $startStr = $matchResult.$getLeftBound();
    $strLength = $matchResult.$getRightBound();
    while (true) {
        if ($strIndex >= $strLength)
            return (-1);
        var$7 = $testStr.$indexOf1($this.$low, $strIndex);
        if (var$7 < 0)
            return (-1);
        if (var$7 > $startStr && jl_Character_isHighSurrogate($testStr.$charAt(var$7 - 1 | 0))) {
            $strIndex = var$7 + 1 | 0;
            continue;
        }
        var$8 = $this.$next1;
        $strIndex = var$7 + 1 | 0;
        if (var$8.$matches($strIndex, $testString, $matchResult) >= 0)
            break;
    }
    return var$7;
},
jur_LowSurrogateCharSet_findBack = ($this, $strIndex, $lastIndex, $testString, $matchResult) => {
    let $startStr, $testStr, var$7;
    if (!($testString instanceof jl_String))
        return jur_AbstractSet_findBack($this, $strIndex, $lastIndex, $testString, $matchResult);
    $startStr = $matchResult.$getLeftBound();
    $testStr = $testString;
    a: {
        while (true) {
            if ($lastIndex < $strIndex)
                return (-1);
            var$7 = $testStr.$lastIndexOf2($this.$low, $lastIndex);
            if (var$7 < 0)
                break a;
            if (var$7 < $strIndex)
                break a;
            if (var$7 > $startStr && jl_Character_isHighSurrogate($testStr.$charAt(var$7 - 1 | 0))) {
                $lastIndex = var$7 + (-2) | 0;
                continue;
            }
            if ($this.$next1.$matches(var$7 + 1 | 0, $testString, $matchResult) >= 0)
                break;
            $lastIndex = var$7 + (-1) | 0;
        }
        return var$7;
    }
    return (-1);
},
jur_LowSurrogateCharSet_first = ($this, $set) => {
    if ($set instanceof jur_CharSet)
        return 0;
    if ($set instanceof jur_RangeSet)
        return 0;
    if ($set instanceof jur_SupplRangeSet)
        return 0;
    if ($set instanceof jur_SupplCharSet)
        return 0;
    if ($set instanceof jur_HighSurrogateCharSet)
        return 0;
    if (!($set instanceof jur_LowSurrogateCharSet))
        return 1;
    return $set.$low != $this.$low ? 0 : 1;
},
jur_LowSurrogateCharSet_hasConsumed = ($this, $matchResult) => {
    return 1;
};
function jur_CompositeGroupQuantifierSet() {
    let a = this; jur_GroupQuantifierSet.call(a);
    a.$quantifier0 = null;
    a.$setCounter = 0;
}
let jur_CompositeGroupQuantifierSet__init_ = ($this, $quant, $innerSet, $next, $type, $setCounter) => {
    jur_GroupQuantifierSet__init_($this, $innerSet, $next, $type);
    $this.$quantifier0 = $quant;
    $this.$setCounter = $setCounter;
},
jur_CompositeGroupQuantifierSet__init_0 = (var_0, var_1, var_2, var_3, var_4) => {
    let var_5 = new jur_CompositeGroupQuantifierSet();
    jur_CompositeGroupQuantifierSet__init_(var_5, var_0, var_1, var_2, var_3, var_4);
    return var_5;
},
jur_CompositeGroupQuantifierSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $enterCounter, var$5, var$6, $nextIndex;
    $enterCounter = $matchResult.$getEnterCounter($this.$setCounter);
    if (!$this.$innerSet.$hasConsumed($matchResult))
        return $this.$next1.$matches($stringIndex, $testString, $matchResult);
    if ($enterCounter >= $this.$quantifier0.$max1())
        return $this.$next1.$matches($stringIndex, $testString, $matchResult);
    var$5 = $this.$setCounter;
    var$6 = $enterCounter + 1 | 0;
    $matchResult.$setEnterCounter(var$5, var$6);
    $nextIndex = $this.$innerSet.$matches($stringIndex, $testString, $matchResult);
    if ($nextIndex >= 0) {
        $matchResult.$setEnterCounter($this.$setCounter, 0);
        return $nextIndex;
    }
    var$5 = $this.$setCounter;
    var$6 = var$6 + (-1) | 0;
    $matchResult.$setEnterCounter(var$5, var$6);
    if (var$6 >= $this.$quantifier0.$min0())
        return $this.$next1.$matches($stringIndex, $testString, $matchResult);
    $matchResult.$setEnterCounter($this.$setCounter, 0);
    return (-1);
},
jur_RelCompositeGroupQuantifierSet = $rt_classWithoutFields(jur_CompositeGroupQuantifierSet),
jur_RelCompositeGroupQuantifierSet__init_ = ($this, $quant, $innerSet, $next, $type, $setCounter) => {
    jur_CompositeGroupQuantifierSet__init_($this, $quant, $innerSet, $next, $type, $setCounter);
},
jur_RelCompositeGroupQuantifierSet__init_0 = (var_0, var_1, var_2, var_3, var_4) => {
    let var_5 = new jur_RelCompositeGroupQuantifierSet();
    jur_RelCompositeGroupQuantifierSet__init_(var_5, var_0, var_1, var_2, var_3, var_4);
    return var_5;
},
jur_RelCompositeGroupQuantifierSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $enterCounter, $nextIndex;
    $enterCounter = $matchResult.$getEnterCounter($this.$setCounter);
    if (!$this.$innerSet.$hasConsumed($matchResult))
        return $this.$next1.$matches($stringIndex, $testString, $matchResult);
    if ($enterCounter >= $this.$quantifier0.$max1()) {
        $matchResult.$setEnterCounter($this.$setCounter, 0);
        return $this.$next1.$matches($stringIndex, $testString, $matchResult);
    }
    if ($enterCounter < $this.$quantifier0.$min0()) {
        $matchResult.$setEnterCounter($this.$setCounter, $enterCounter + 1 | 0);
        $nextIndex = $this.$innerSet.$matches($stringIndex, $testString, $matchResult);
    } else {
        $nextIndex = $this.$next1.$matches($stringIndex, $testString, $matchResult);
        if ($nextIndex >= 0) {
            $matchResult.$setEnterCounter($this.$setCounter, 0);
            return $nextIndex;
        }
        $matchResult.$setEnterCounter($this.$setCounter, $enterCounter + 1 | 0);
        $nextIndex = $this.$innerSet.$matches($stringIndex, $testString, $matchResult);
    }
    return $nextIndex;
};
function ju_ArrayList() {
    let a = this; ju_AbstractList.call(a);
    a.$array = null;
    a.$size0 = 0;
}
let ju_ArrayList__init_1 = $this => {
    ju_ArrayList__init_0($this, 10);
},
ju_ArrayList__init_ = () => {
    let var_0 = new ju_ArrayList();
    ju_ArrayList__init_1(var_0);
    return var_0;
},
ju_ArrayList__init_0 = ($this, $initialCapacity) => {
    ju_AbstractList__init_($this);
    if ($initialCapacity >= 0) {
        $this.$array = $rt_createArray(jl_Object, $initialCapacity);
        return;
    }
    $rt_throw(jl_IllegalArgumentException__init_());
},
ju_ArrayList__init_2 = var_0 => {
    let var_1 = new ju_ArrayList();
    ju_ArrayList__init_0(var_1, var_0);
    return var_1;
},
ju_ArrayList_ensureCapacity = ($this, $minCapacity) => {
    let $newLength;
    if ($this.$array.data.length < $minCapacity) {
        $newLength = $this.$array.data.length >= 1073741823 ? 2147483647 : jl_Math_max($minCapacity, jl_Math_max($this.$array.data.length * 2 | 0, 5));
        $this.$array = ju_Arrays_copyOf0($this.$array, $newLength);
    }
},
ju_ArrayList_get = ($this, $index) => {
    ju_ArrayList_checkIndex($this, $index);
    return $this.$array.data[$index];
},
ju_ArrayList_size = $this => {
    return $this.$size0;
},
ju_ArrayList_add = ($this, $element) => {
    let var$2, var$3;
    $this.$ensureCapacity($this.$size0 + 1 | 0);
    var$2 = $this.$array.data;
    var$3 = $this.$size0;
    $this.$size0 = var$3 + 1 | 0;
    var$2[var$3] = $element;
    $this.$modCount = $this.$modCount + 1 | 0;
    return 1;
},
ju_ArrayList_add0 = ($this, $index, $element) => {
    let $i;
    ju_ArrayList_checkIndexForAdd($this, $index);
    $this.$ensureCapacity($this.$size0 + 1 | 0);
    $i = $this.$size0;
    while ($i > $index) {
        $this.$array.data[$i] = $this.$array.data[$i - 1 | 0];
        $i = $i + (-1) | 0;
    }
    $this.$array.data[$index] = $element;
    $this.$size0 = $this.$size0 + 1 | 0;
    $this.$modCount = $this.$modCount + 1 | 0;
},
ju_ArrayList_remove = ($this, $i) => {
    let $old, var$3, var$4, $i_0;
    ju_ArrayList_checkIndex($this, $i);
    $old = $this.$array.data[$i];
    $this.$size0 = $this.$size0 - 1 | 0;
    while ($i < $this.$size0) {
        var$3 = $this.$array.data;
        var$4 = $this.$array.data;
        $i_0 = $i + 1 | 0;
        var$3[$i] = var$4[$i_0];
        $i = $i_0;
    }
    $this.$array.data[$this.$size0] = null;
    $this.$modCount = $this.$modCount + 1 | 0;
    return $old;
},
ju_ArrayList_checkIndex = ($this, $index) => {
    if ($index >= 0 && $index < $this.$size0)
        return;
    $rt_throw(jl_IndexOutOfBoundsException__init_());
},
ju_ArrayList_checkIndexForAdd = ($this, $index) => {
    if ($index >= 0 && $index <= $this.$size0)
        return;
    $rt_throw(jl_IndexOutOfBoundsException__init_());
},
otrf_VirtualFileSystem = $rt_classWithoutFields(0),
jl_IllegalMonitorStateException = $rt_classWithoutFields(jl_RuntimeException),
jl_IllegalMonitorStateException__init_ = $this => {
    jl_RuntimeException__init_($this);
},
jl_IllegalMonitorStateException__init_0 = () => {
    let var_0 = new jl_IllegalMonitorStateException();
    jl_IllegalMonitorStateException__init_(var_0);
    return var_0;
};
function jur_CompositeQuantifierSet() {
    jur_LeafQuantifierSet.call(this);
    this.$quantifier = null;
}
let jur_CompositeQuantifierSet__init_ = ($this, $quant, $innerSet, $next, $type) => {
    jur_LeafQuantifierSet__init_($this, $innerSet, $next, $type);
    $this.$quantifier = $quant;
},
jur_CompositeQuantifierSet__init_0 = (var_0, var_1, var_2, var_3) => {
    let var_4 = new jur_CompositeQuantifierSet();
    jur_CompositeQuantifierSet__init_(var_4, var_0, var_1, var_2, var_3);
    return var_4;
},
jur_CompositeQuantifierSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $min, $max, $i, $shift;
    $min = $this.$quantifier.$min0();
    $max = $this.$quantifier.$max1();
    $i = 0;
    while (true) {
        if ($i >= $min) {
            a: {
                while ($i < $max) {
                    if (($stringIndex + $this.$leaf.$charCount() | 0) > $matchResult.$getRightBound())
                        break a;
                    $shift = $this.$leaf.$accepts($stringIndex, $testString);
                    if ($shift < 1)
                        break a;
                    $stringIndex = $stringIndex + $shift | 0;
                    $i = $i + 1 | 0;
                }
            }
            while (true) {
                if ($i < $min)
                    return (-1);
                $shift = $this.$next1.$matches($stringIndex, $testString, $matchResult);
                if ($shift >= 0)
                    break;
                $stringIndex = $stringIndex - $this.$leaf.$charCount() | 0;
                $i = $i + (-1) | 0;
            }
            return $shift;
        }
        if (($stringIndex + $this.$leaf.$charCount() | 0) > $matchResult.$getRightBound()) {
            $matchResult.$hitEnd = 1;
            return (-1);
        }
        $shift = $this.$leaf.$accepts($stringIndex, $testString);
        if ($shift < 1)
            break;
        $stringIndex = $stringIndex + $shift | 0;
        $i = $i + 1 | 0;
    }
    return (-1);
};
function jur_SupplRangeSet() {
    let a = this; jur_JointSet.call(a);
    a.$chars = null;
    a.$alt3 = 0;
}
let jur_SupplRangeSet__init_ = ($this, $cc) => {
    jur_JointSet__init_($this);
    $this.$chars = $cc.$getInstance();
    $this.$alt3 = $cc.$alt;
},
jur_SupplRangeSet__init_0 = var_0 => {
    let var_1 = new jur_SupplRangeSet();
    jur_SupplRangeSet__init_(var_1, var_0);
    return var_1;
},
jur_SupplRangeSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $strLength, var$5, $high, $offset, var$8, $low;
    $strLength = $matchResult.$getRightBound();
    if ($stringIndex < $strLength) {
        var$5 = $stringIndex + 1 | 0;
        $high = $testString.$charAt($stringIndex);
        if ($this.$contains($high)) {
            $offset = $this.$next1.$matches(var$5, $testString, $matchResult);
            if ($offset > 0)
                return $offset;
        }
        if (var$5 < $strLength) {
            var$8 = var$5 + 1 | 0;
            $low = $testString.$charAt(var$5);
            if (jl_Character_isSurrogatePair($high, $low) && $this.$contains(jl_Character_toCodePoint($high, $low)))
                return $this.$next1.$matches(var$8, $testString, $matchResult);
        }
    }
    return (-1);
},
jur_SupplRangeSet_contains = ($this, $ch) => {
    return $this.$chars.$contains($ch);
},
jur_SupplRangeSet_first = ($this, $set) => {
    if ($set instanceof jur_SupplCharSet)
        return jur_AbstractCharClass_intersects0($this.$chars, $set.$getCodePoint());
    if ($set instanceof jur_CharSet)
        return jur_AbstractCharClass_intersects0($this.$chars, $set.$getChar());
    if ($set instanceof jur_SupplRangeSet)
        return jur_AbstractCharClass_intersects($this.$chars, $set.$chars);
    if (!($set instanceof jur_RangeSet))
        return 1;
    return jur_AbstractCharClass_intersects($this.$chars, $set.$getChars());
},
jur_SupplRangeSet_getChars = $this => {
    return $this.$chars;
},
jur_SupplRangeSet_setNext = ($this, $next) => {
    $this.$next1 = $next;
},
jur_SupplRangeSet_hasConsumed = ($this, $mr) => {
    return 1;
},
jur_RelAltGroupQuantifierSet = $rt_classWithoutFields(jur_AltGroupQuantifierSet),
jur_RelAltGroupQuantifierSet__init_ = ($this, $innerSet, $next, $type) => {
    jur_AltGroupQuantifierSet__init_($this, $innerSet, $next, $type);
},
jur_RelAltGroupQuantifierSet__init_0 = (var_0, var_1, var_2) => {
    let var_3 = new jur_RelAltGroupQuantifierSet();
    jur_RelAltGroupQuantifierSet__init_(var_3, var_0, var_1, var_2);
    return var_3;
},
jur_RelAltGroupQuantifierSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $nextIndex;
    if (!$this.$innerSet.$hasConsumed($matchResult))
        return $this.$next1.$matches($stringIndex, $testString, $matchResult);
    $nextIndex = $this.$next1.$matches($stringIndex, $testString, $matchResult);
    if ($nextIndex < 0)
        $nextIndex = $this.$innerSet.$matches($stringIndex, $testString, $matchResult);
    return $nextIndex;
};
function jl_String() {
    jl_Object.call(this);
    this.$hashCode2 = 0;
}
let jl_String_EMPTY_CHARS = null,
jl_String_EMPTY = null,
jl_String_CASE_INSENSITIVE_ORDER = null,
jl_String_$callClinit = () => {
    jl_String_$callClinit = $rt_eraseClinit(jl_String);
    jl_String__clinit_();
},
jl_String__init_2 = $this => {
    jl_String_$callClinit();
    jl_Object__init_($this);
    $this.$nativeString = "";
},
jl_String__init_5 = () => {
    let var_0 = new jl_String();
    jl_String__init_2(var_0);
    return var_0;
},
jl_String__init_0 = ($this, $characters) => {
    let var$2;
    jl_String_$callClinit();
    var$2 = $characters.data;
    jl_Object__init_($this);
    $this.$nativeString = $rt_charArrayToString($characters.data, 0, var$2.length);
},
jl_String__init_ = var_0 => {
    let var_1 = new jl_String();
    jl_String__init_0(var_1, var_0);
    return var_1;
},
jl_String__init_4 = (var$0, var$1) => {
    var$0.$nativeString = var$1;
},
jl_String__init_3 = var_0 => {
    let var_1 = new jl_String();
    jl_String__init_4(var_1, var_0);
    return var_1;
},
jl_String__init_6 = (var$0, var$1, $offset, $count) => {
    let var$4;
    jl_String_$callClinit();
    var$4 = var$1.data;
    jl_Object__init_(var$0);
    ju_Objects_checkFromIndexSize($offset, $count, var$4.length);
    var$0.$nativeString = $rt_charArrayToString(var$1.data, $offset, $count);
},
jl_String__init_1 = (var_0, var_1, var_2) => {
    let var_3 = new jl_String();
    jl_String__init_6(var_3, var_0, var_1, var_2);
    return var_3;
},
jl_String_fromArray = $characters => {
    let $s;
    jl_String_$callClinit();
    $s = jl_String__init_5();
    $s.$nativeString = $rt_fullArrayToString($characters.data);
    return $s;
},
jl_String_charAt = ($this, $index) => {
    if ($index >= 0 && $index < $this.$nativeString.length)
        return $this.$nativeString.charCodeAt($index);
    $rt_throw(jl_StringIndexOutOfBoundsException__init_());
},
jl_String_length = $this => {
    return $this.$nativeString.length;
},
jl_String_isEmpty = $this => {
    return $this.$nativeString.length ? 0 : 1;
},
jl_String_startsWith = ($this, $prefix, $toffset) => {
    let $i, var$4, var$5;
    if (($toffset + $prefix.$length() | 0) > $this.$length())
        return 0;
    $i = 0;
    while ($i < $prefix.$length()) {
        var$4 = $prefix.$charAt($i);
        var$5 = $toffset + 1 | 0;
        if (var$4 != $this.$charAt($toffset))
            return 0;
        $i = $i + 1 | 0;
        $toffset = var$5;
    }
    return 1;
},
jl_String_startsWith0 = ($this, $prefix) => {
    if ($this === $prefix)
        return 1;
    return $this.$startsWith0($prefix, 0);
},
jl_String_indexOf = ($this, $ch, $fromIndex) => {
    let $i, $bmpChar, $hi, $lo;
    $i = jl_Math_max(0, $fromIndex);
    if ($ch < 65536) {
        $bmpChar = $ch & 65535;
        while (true) {
            if ($i >= $this.$nativeString.length)
                return (-1);
            if ($this.$nativeString.charCodeAt($i) == $bmpChar)
                break;
            $i = $i + 1 | 0;
        }
        return $i;
    }
    $hi = jl_Character_highSurrogate($ch);
    $lo = jl_Character_lowSurrogate($ch);
    while (true) {
        if ($i >= ($this.$nativeString.length - 1 | 0))
            return (-1);
        if ($this.$nativeString.charCodeAt($i) == $hi && $this.$nativeString.charCodeAt(($i + 1 | 0)) == $lo)
            break;
        $i = $i + 1 | 0;
    }
    return $i;
},
jl_String_lastIndexOf = ($this, $ch, $fromIndex) => {
    let $i, $bmpChar, $hi, $lo, var$7;
    $i = jl_Math_min($fromIndex, $this.$length() - 1 | 0);
    if ($ch < 65536) {
        $bmpChar = $ch & 65535;
        while (true) {
            if ($i < 0)
                return (-1);
            if ($this.$nativeString.charCodeAt($i) == $bmpChar)
                break;
            $i = $i + (-1) | 0;
        }
        return $i;
    }
    $hi = jl_Character_highSurrogate($ch);
    $lo = jl_Character_lowSurrogate($ch);
    while (true) {
        if ($i < 1)
            return (-1);
        if ($this.$nativeString.charCodeAt($i) == $lo) {
            var$7 = $i - 1 | 0;
            if ($this.$nativeString.charCodeAt(var$7) == $hi)
                break;
        }
        $i = $i + (-1) | 0;
    }
    return var$7;
},
jl_String_lastIndexOf1 = ($this, $ch) => {
    return $this.$lastIndexOf2($ch, $this.$length() - 1 | 0);
},
jl_String_indexOf0 = ($this, $str, $fromIndex) => {
    let $i, $toIndex, $j;
    $i = jl_Math_max(0, $fromIndex);
    $toIndex = $this.$length() - $str.$length() | 0;
    a: while (true) {
        if ($i > $toIndex)
            return (-1);
        $j = 0;
        while (true) {
            if ($j >= $str.$length())
                break a;
            if ($this.$charAt($i + $j | 0) != $str.$charAt($j))
                break;
            $j = $j + 1 | 0;
        }
        $i = $i + 1 | 0;
    }
    return $i;
},
jl_String_lastIndexOf0 = ($this, $str, $fromIndex) => {
    let $i, $j;
    $i = jl_Math_min($fromIndex, $this.$length() - $str.$length() | 0);
    a: while (true) {
        if ($i < 0)
            return (-1);
        $j = 0;
        while (true) {
            if ($j >= $str.$length())
                break a;
            if ($this.$charAt($i + $j | 0) != $str.$charAt($j))
                break;
            $j = $j + 1 | 0;
        }
        $i = $i + (-1) | 0;
    }
    return $i;
},
jl_String_substring = ($this, $beginIndex, $endIndex) => {
    let $length, var$4;
    $length = $this.$nativeString.length;
    var$4 = $rt_compare($beginIndex, $endIndex);
    if (!var$4)
        return jl_String_EMPTY;
    if (!$beginIndex && $endIndex == $length)
        return $this;
    if ($beginIndex >= 0 && var$4 <= 0 && $endIndex <= $length)
        return jl_String__init_3($this.$nativeString.substring($beginIndex, $endIndex));
    $rt_throw(jl_StringIndexOutOfBoundsException__init_());
},
jl_String_substring0 = ($this, $beginIndex) => {
    return $this.$substring($beginIndex, $this.$length());
},
jl_String_subSequence = ($this, $beginIndex, $endIndex) => {
    return $this.$substring($beginIndex, $endIndex);
},
jl_String_concat = ($this, $str) => {
    let $buffer, $index, $i, var$5, var$6;
    if ($str.$isEmpty())
        return $this;
    if ($this.$isEmpty())
        return $str;
    $buffer = $rt_createCharArray($this.$length() + $str.$length() | 0);
    $index = 0;
    $i = 0;
    while ($i < $this.$length()) {
        var$5 = $buffer.data;
        var$6 = $index + 1 | 0;
        var$5[$index] = $this.$charAt($i);
        $i = $i + 1 | 0;
        $index = var$6;
    }
    $i = 0;
    while ($i < $str.$length()) {
        var$5 = $buffer.data;
        var$6 = $index + 1 | 0;
        var$5[$index] = $str.$charAt($i);
        $i = $i + 1 | 0;
        $index = var$6;
    }
    return jl_String_fromArray($buffer);
},
jl_String_contains = ($this, $s) => {
    let $sz, $i, $j;
    $sz = $this.$length() - $s.$length() | 0;
    $i = 0;
    while ($i <= $sz) {
        $j = 0;
        while (true) {
            if ($j >= $s.$length())
                return 1;
            if ($this.$charAt($i + $j | 0) != $s.$charAt($j))
                break;
            $j = $j + 1 | 0;
        }
        $i = $i + 1 | 0;
    }
    return 0;
},
jl_String_toString = $this => {
    return $this;
},
jl_String_toCharArray = $this => {
    let $array, $i, var$3;
    $array = $rt_createCharArray($this.$nativeString.length);
    $i = 0;
    while (true) {
        var$3 = $array.data;
        if ($i >= var$3.length)
            break;
        var$3[$i] = $this.$charAt($i);
        $i = $i + 1 | 0;
    }
    return $array;
},
jl_String_valueOf = $obj => {
    jl_String_$callClinit();
    return $obj === null ? $rt_s(54) : $obj.$toString();
},
jl_String_valueOf0 = $i => {
    jl_String_$callClinit();
    return ((jl_StringBuilder__init_()).$append2($i)).$toString();
},
jl_String_equals = ($this, $other) => {
    let $str;
    if ($this === $other)
        return 1;
    if (!($other instanceof jl_String))
        return 0;
    $str = $other;
    return $this.$nativeString !== $str.$nativeString ? 0 : 1;
},
jl_String_hashCode = $this => {
    let $i;
    a: {
        if (!$this.$hashCode2) {
            $i = 0;
            while (true) {
                if ($i >= $this.$nativeString.length)
                    break a;
                $this.$hashCode2 = (31 * $this.$hashCode2 | 0) + $this.$nativeString.charCodeAt($i) | 0;
                $i = $i + 1 | 0;
            }
        }
    }
    return $this.$hashCode2;
},
jl_String_split = ($this, $regex) => {
    return jur_Pattern_split(jur_Pattern_compile($regex), $this.$toString());
},
jl_String__clinit_ = () => {
    jl_String_EMPTY_CHARS = $rt_createCharArray(0);
    jl_String_EMPTY = jl_String__init_5();
    jl_String_CASE_INSENSITIVE_ORDER = jl_String$_clinit_$lambda$_118_0__init_0();
},
ccra_IntroScreen = $rt_classWithoutFields(aa_Activity),
ju_Dictionary = $rt_classWithoutFields(),
ju_Dictionary__init_ = $this => {
    jl_Object__init_($this);
};
function ju_Hashtable() {
    let a = this; ju_Dictionary.call(a);
    a.$elementCount0 = 0;
    a.$elementData0 = null;
    a.$loadFactor = 0.0;
    a.$threshold0 = 0;
    a.$firstSlot = 0;
    a.$lastSlot = 0;
    a.$modCount2 = 0;
}
let ju_Hashtable_EMPTY_ENUMERATION = null,
ju_Hashtable_EMPTY_ITERATOR = null,
ju_Hashtable_$callClinit = () => {
    ju_Hashtable_$callClinit = $rt_eraseClinit(ju_Hashtable);
    ju_Hashtable__clinit_();
},
ju_Hashtable_newEntry = ($key, $value, $hash) => {
    ju_Hashtable_$callClinit();
    return ju_Hashtable$Entry__init_0($key, $value);
},
ju_Hashtable__init_ = $this => {
    ju_Hashtable_$callClinit();
    ju_Hashtable__init_0($this, 11);
},
ju_Hashtable__init_1 = () => {
    let var_0 = new ju_Hashtable();
    ju_Hashtable__init_(var_0);
    return var_0;
},
ju_Hashtable__init_0 = ($this, $capacity) => {
    ju_Hashtable_$callClinit();
    ju_Dictionary__init_($this);
    $this.$lastSlot = (-1);
    if ($capacity < 0)
        $rt_throw(jl_IllegalArgumentException__init_());
    $this.$elementCount0 = 0;
    if (!$capacity)
        $capacity = 1;
    $this.$elementData0 = ju_Hashtable_newElementArray($this, $capacity);
    $this.$firstSlot = $this.$elementData0.data.length;
    $this.$loadFactor = 0.75;
    ju_Hashtable_computeMaxSize($this);
},
ju_Hashtable__init_2 = var_0 => {
    let var_1 = new ju_Hashtable();
    ju_Hashtable__init_0(var_1, var_0);
    return var_1;
},
ju_Hashtable_newElementArray = ($this, $size) => {
    return $rt_createArray(ju_Hashtable$Entry, $size);
},
ju_Hashtable_computeMaxSize = $this => {
    $this.$threshold0 = $this.$elementData0.data.length * $this.$loadFactor | 0;
},
ju_Hashtable_get = ($this, $key) => {
    let $hash, $index, $entry;
    jl_Object_monitorEnterSync($this);
    try {
        $hash = $key.$hashCode0();
        $index = ($hash & 2147483647) % $this.$elementData0.data.length | 0;
        $entry = $this.$elementData0.data[$index];
        while ($entry !== null) {
            if ($entry.$equalsKey($key, $hash))
                return $entry.$value;
            $entry = $entry.$next3;
        }
        return null;
    } finally {
        jl_Object_monitorExitSync($this);
    }
},
ju_Hashtable_put = ($this, $key, $value) => {
    let $hash, var$4, $index, $entry, $result, var$8, var$9;
    jl_Object_monitorEnterSync($this);
    try {
        if ($key !== null && $value !== null) {
            $hash = $key.$hashCode0();
            var$4 = $hash & 2147483647;
            $index = var$4 % $this.$elementData0.data.length | 0;
            $entry = $this.$elementData0.data[$index];
            while ($entry !== null && !$entry.$equalsKey($key, $hash)) {
                $entry = $entry.$next3;
            }
            if ($entry !== null) {
                $result = $entry.$value;
                $entry.$value = $value;
                return $result;
            }
            $this.$modCount2 = $this.$modCount2 + 1 | 0;
            var$8 = $this.$elementCount0 + 1 | 0;
            $this.$elementCount0 = var$8;
            if (var$8 > $this.$threshold0) {
                $this.$rehash();
                $index = var$4 % $this.$elementData0.data.length | 0;
            }
            if ($index < $this.$firstSlot)
                $this.$firstSlot = $index;
            if ($index > $this.$lastSlot)
                $this.$lastSlot = $index;
            var$9 = ju_Hashtable_newEntry($key, $value, $hash);
            var$9.$next3 = $this.$elementData0.data[$index];
            $this.$elementData0.data[$index] = var$9;
            return null;
        }
        $rt_throw(jl_NullPointerException__init_0());
    } finally {
        jl_Object_monitorExitSync($this);
    }
},
ju_Hashtable_rehash = $this => {
    let $length, $newLast, $newData, $i, var$5, $entry, $index, var$8, $entry_0;
    $length = ($this.$elementData0.data.length << 1) + 1 | 0;
    if (!$length)
        $length = 1;
    $newLast = (-1);
    $newData = ju_Hashtable_newElementArray($this, $length);
    $i = $this.$lastSlot + 1 | 0;
    var$5 = $length;
    while (true) {
        $i = $i + (-1) | 0;
        if ($i < $this.$firstSlot)
            break;
        $entry = $this.$elementData0.data[$i];
        while ($entry !== null) {
            $index = ($entry.$getKeyHash() & 2147483647) % $length | 0;
            if ($index < var$5)
                var$5 = $index;
            if ($index > $newLast)
                $newLast = $index;
            var$8 = $newData.data;
            $entry_0 = $entry.$next3;
            $entry.$next3 = var$8[$index];
            var$8[$index] = $entry;
            $entry = $entry_0;
        }
    }
    $this.$firstSlot = var$5;
    $this.$lastSlot = $newLast;
    $this.$elementData0 = $newData;
    ju_Hashtable_computeMaxSize($this);
},
ju_Hashtable__clinit_ = () => {
    ju_Hashtable_EMPTY_ENUMERATION = ju_Hashtable$1__init_0();
    ju_Hashtable_EMPTY_ITERATOR = ju_Hashtable$2__init_0();
};
function ju_Properties() {
    ju_Hashtable.call(this);
    this.$defaults = null;
}
let ju_Properties__init_ = $this => {
    ju_Hashtable__init_($this);
},
ju_Properties__init_1 = () => {
    let var_0 = new ju_Properties();
    ju_Properties__init_(var_0);
    return var_0;
},
ju_Properties__init_0 = ($this, $properties) => {
    ju_Hashtable__init_($this);
    $this.$defaults = $properties;
},
ju_Properties__init_2 = var_0 => {
    let var_1 = new ju_Properties();
    ju_Properties__init_0(var_1, var_0);
    return var_1;
},
ju_Properties_getProperty = ($this, $name) => {
    let $result, $property;
    $result = ju_Hashtable_get($this, $name);
    $property = !($result instanceof jl_String) ? null : $result;
    if ($property === null && $this.$defaults !== null)
        $property = $this.$defaults.$getProperty($name);
    return $property;
},
jur_FSet$PossessiveFSet = $rt_classWithoutFields(jur_AbstractSet),
jur_FSet$PossessiveFSet__init_ = $this => {
    jur_AbstractSet__init_($this);
},
jur_FSet$PossessiveFSet__init_0 = () => {
    let var_0 = new jur_FSet$PossessiveFSet();
    jur_FSet$PossessiveFSet__init_(var_0);
    return var_0;
},
jur_FSet$PossessiveFSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    return $stringIndex;
},
jur_FSet$PossessiveFSet_hasConsumed = ($this, $mr) => {
    return 0;
},
jur_PosCompositeGroupQuantifierSet = $rt_classWithoutFields(jur_CompositeGroupQuantifierSet),
jur_PosCompositeGroupQuantifierSet__init_ = ($this, $quant, $innerSet, $next, $type, $setCounter) => {
    jur_CompositeGroupQuantifierSet__init_($this, $quant, $innerSet, $next, $type, $setCounter);
    jur_FSet_$callClinit();
    $innerSet.$setNext(jur_FSet_posFSet);
},
jur_PosCompositeGroupQuantifierSet__init_0 = (var_0, var_1, var_2, var_3, var_4) => {
    let var_5 = new jur_PosCompositeGroupQuantifierSet();
    jur_PosCompositeGroupQuantifierSet__init_(var_5, var_0, var_1, var_2, var_3, var_4);
    return var_5;
},
jur_PosCompositeGroupQuantifierSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $counter, $max, $nextIndex;
    $counter = 0;
    $max = $this.$quantifier0.$max1();
    a: {
        while (true) {
            $nextIndex = $this.$innerSet.$matches($stringIndex, $testString, $matchResult);
            if ($nextIndex <= $stringIndex)
                break a;
            if ($counter >= $max)
                break;
            $counter = $counter + 1 | 0;
            $stringIndex = $nextIndex;
        }
    }
    if ($nextIndex < 0 && $counter < $this.$quantifier0.$min0())
        return (-1);
    return $this.$next1.$matches($stringIndex, $testString, $matchResult);
};
function jur_MultiLineEOLSet() {
    jur_AbstractSet.call(this);
    this.$consCounter = 0;
}
let jur_MultiLineEOLSet__init_ = ($this, $counter) => {
    jur_AbstractSet__init_($this);
    $this.$consCounter = $counter;
},
jur_MultiLineEOLSet__init_0 = var_0 => {
    let var_1 = new jur_MultiLineEOLSet();
    jur_MultiLineEOLSet__init_(var_1, var_0);
    return var_1;
},
jur_MultiLineEOLSet_matches = ($this, $strIndex, $testString, $matchResult) => {
    let $strDif, $ch1, $ch2;
    $strDif = !$matchResult.$hasAnchoringBounds() ? $testString.$length() - $strIndex | 0 : $matchResult.$getRightBound() - $strIndex | 0;
    if (!$strDif) {
        $matchResult.$setConsumed($this.$consCounter, 0);
        return $this.$next1.$matches($strIndex, $testString, $matchResult);
    }
    if ($strDif < 2) {
        $ch1 = $testString.$charAt($strIndex);
        $ch2 = 97;
    } else {
        $ch1 = $testString.$charAt($strIndex);
        $ch2 = $testString.$charAt($strIndex + 1 | 0);
    }
    switch ($ch1) {
        case 10:
        case 133:
        case 8232:
        case 8233:
            $matchResult.$setConsumed($this.$consCounter, 0);
            return $this.$next1.$matches($strIndex, $testString, $matchResult);
        case 13:
            if ($ch2 != 10) {
                $matchResult.$setConsumed($this.$consCounter, 0);
                return $this.$next1.$matches($strIndex, $testString, $matchResult);
            }
            $matchResult.$setConsumed($this.$consCounter, 0);
            return $this.$next1.$matches($strIndex, $testString, $matchResult);
        default:
    }
    return (-1);
},
jur_MultiLineEOLSet_hasConsumed = ($this, $matchResult) => {
    let $res;
    $res = !$matchResult.$getConsumed($this.$consCounter) ? 0 : 1;
    $matchResult.$setConsumed($this.$consCounter, (-1));
    return $res;
},
ju_Queue = $rt_classWithoutFields(0),
ju_Deque = $rt_classWithoutFields(0);
function ju_ArrayDeque() {
    let a = this; ju_AbstractCollection.call(a);
    a.$version = 0;
    a.$array0 = null;
    a.$head0 = 0;
    a.$tail0 = 0;
}
let ju_ArrayDeque__init_0 = $this => {
    ju_ArrayDeque__init_($this, 8);
},
ju_ArrayDeque__init_1 = () => {
    let var_0 = new ju_ArrayDeque();
    ju_ArrayDeque__init_0(var_0);
    return var_0;
},
ju_ArrayDeque__init_ = ($this, $numElements) => {
    ju_AbstractCollection__init_($this);
    $this.$array0 = $rt_createArray(jl_Object, $numElements + 1 | 0);
},
ju_ArrayDeque__init_2 = var_0 => {
    let var_1 = new ju_ArrayDeque();
    ju_ArrayDeque__init_(var_1, var_0);
    return var_1;
},
ju_ArrayDeque_addLast = ($this, $e) => {
    ju_Objects_requireNonNull($e);
    ju_ArrayDeque_ensureCapacity($this, $this.$size() + 1 | 0);
    $this.$array0.data[$this.$tail0] = $e;
    $this.$tail0 = ju_ArrayDeque_modInc($this.$tail0, $this.$array0.data.length);
    $this.$version = $this.$version + 1 | 0;
},
ju_ArrayDeque_removeFirst = $this => {
    let $value;
    $value = $this.$pollFirst();
    if ($value !== null)
        return $value;
    $rt_throw(ju_NoSuchElementException__init_0());
},
ju_ArrayDeque_pollFirst = $this => {
    let $result;
    if ($this.$head0 == $this.$tail0)
        return null;
    $result = $this.$array0.data[$this.$head0];
    $this.$array0.data[$this.$head0] = null;
    $this.$head0 = ju_ArrayDeque_modInc($this.$head0, $this.$array0.data.length);
    $this.$version = $this.$version + 1 | 0;
    return $result;
},
ju_ArrayDeque_add = ($this, $e) => {
    $this.$addLast($e);
    return 1;
},
ju_ArrayDeque_remove = $this => {
    return $this.$removeFirst();
},
ju_ArrayDeque_size = $this => {
    return $this.$tail0 >= $this.$head0 ? $this.$tail0 - $this.$head0 | 0 : ($this.$array0.data.length - $this.$head0 | 0) + $this.$tail0 | 0;
},
ju_ArrayDeque_isEmpty = $this => {
    return $this.$head0 != $this.$tail0 ? 0 : 1;
},
ju_ArrayDeque_modInc = ($i, $mod) => {
    let var$3;
    var$3 = $i + 1 | 0;
    if (var$3 == $mod)
        var$3 = 0;
    return var$3;
},
ju_ArrayDeque_ensureCapacity = ($this, $capacity) => {
    let $newArraySize, $newArray, $j, $i, var$6, var$7, var$8;
    if ($capacity < $this.$array0.data.length)
        return;
    $newArraySize = jl_Math_max($this.$array0.data.length * 2 | 0, (($capacity * 3 | 0) / 2 | 0) + 1 | 0);
    if ($newArraySize < 1)
        $newArraySize = 2147483647;
    $newArray = $rt_createArray(jl_Object, $newArraySize);
    $j = 0;
    if ($this.$head0 <= $this.$tail0) {
        $i = $this.$head0;
        while ($i < $this.$tail0) {
            var$6 = $newArray.data;
            var$7 = $j + 1 | 0;
            var$6[$j] = $this.$array0.data[$i];
            $i = $i + 1 | 0;
            $j = var$7;
        }
    } else {
        $i = $this.$head0;
        while ($i < $this.$array0.data.length) {
            var$8 = $newArray.data;
            var$7 = $j + 1 | 0;
            var$8[$j] = $this.$array0.data[$i];
            $i = $i + 1 | 0;
            $j = var$7;
        }
        $i = 0;
        while ($i < $this.$tail0) {
            var$6 = $newArray.data;
            var$7 = $j + 1 | 0;
            var$6[$j] = $this.$array0.data[$i];
            $i = $i + 1 | 0;
            $j = var$7;
        }
    }
    $this.$head0 = 0;
    $this.$tail0 = $j;
    $this.$array0 = $newArray;
},
ag_Canvas$1 = $rt_classWithoutFields(),
ag_Canvas$1_$SwitchMap$android$graphics$PorterDuff$Mode = null,
ag_Canvas$1_$callClinit = () => {
    ag_Canvas$1_$callClinit = $rt_eraseClinit(ag_Canvas$1);
    ag_Canvas$1__clinit_();
},
ag_Canvas$1__clinit_ = () => {
    ag_Canvas$1_$SwitchMap$android$graphics$PorterDuff$Mode = $rt_createIntArray((ag_PorterDuff$Mode_values()).data.length);
    ag_Canvas$1_$SwitchMap$android$graphics$PorterDuff$Mode.data[jl_Enum_ordinal(ag_PorterDuff$Mode_SRC)] = 1;
    ag_Canvas$1_$SwitchMap$android$graphics$PorterDuff$Mode.data[jl_Enum_ordinal(ag_PorterDuff$Mode_DST)] = 2;
    ag_Canvas$1_$SwitchMap$android$graphics$PorterDuff$Mode.data[jl_Enum_ordinal(ag_PorterDuff$Mode_SRC_IN)] = 3;
    ag_Canvas$1_$SwitchMap$android$graphics$PorterDuff$Mode.data[jl_Enum_ordinal(ag_PorterDuff$Mode_DST_IN)] = 4;
    ag_Canvas$1_$SwitchMap$android$graphics$PorterDuff$Mode.data[jl_Enum_ordinal(ag_PorterDuff$Mode_SRC_OUT)] = 5;
    ag_Canvas$1_$SwitchMap$android$graphics$PorterDuff$Mode.data[jl_Enum_ordinal(ag_PorterDuff$Mode_DST_OUT)] = 6;
    ag_Canvas$1_$SwitchMap$android$graphics$PorterDuff$Mode.data[jl_Enum_ordinal(ag_PorterDuff$Mode_SRC_ATOP)] = 7;
    ag_Canvas$1_$SwitchMap$android$graphics$PorterDuff$Mode.data[jl_Enum_ordinal(ag_PorterDuff$Mode_DST_ATOP)] = 8;
    ag_Canvas$1_$SwitchMap$android$graphics$PorterDuff$Mode.data[jl_Enum_ordinal(ag_PorterDuff$Mode_XOR)] = 9;
    ag_Canvas$1_$SwitchMap$android$graphics$PorterDuff$Mode.data[jl_Enum_ordinal(ag_PorterDuff$Mode_CLEAR)] = 10;
    ag_Canvas$1_$SwitchMap$android$graphics$PorterDuff$Mode.data[jl_Enum_ordinal(ag_PorterDuff$Mode_ADD)] = 11;
};
function jur_AbstractCharClass$LazyJavaDigit$1() {
    jur_AbstractCharClass.call(this);
    this.$this$012 = null;
}
let jur_AbstractCharClass$LazyJavaDigit$1__init_ = ($this, $this$0) => {
    $this.$this$012 = $this$0;
    jur_AbstractCharClass__init_($this);
},
jur_AbstractCharClass$LazyJavaDigit$1__init_0 = var_0 => {
    let var_1 = new jur_AbstractCharClass$LazyJavaDigit$1();
    jur_AbstractCharClass$LazyJavaDigit$1__init_(var_1, var_0);
    return var_1;
},
jur_AbstractCharClass$LazyJavaDigit$1_contains = ($this, $ch) => {
    return jl_Character_isDigit($ch);
},
av_SurfaceView = $rt_classWithoutFields(),
ccrgm_l = $rt_classWithoutFields(0);
function ccrgm_h() {
    let a = this; jl_Object.call(a);
    a.$a30 = null;
    a.$b13 = 0;
}
let ccrgm_h__init_0 = (var$0, var$1) => {
    jl_Object__init_(var$0);
    var$0.$b13 = 0;
    var$0.$a30 = var$1;
},
ccrgm_h__init_ = var_0 => {
    let var_1 = new ccrgm_h();
    ccrgm_h__init_0(var_1, var_0);
    return var_1;
},
ccrgm_h_a2 = (var$0, var$1, var$2, var$3, var$4, var$5) => {
    var$0.$a30.$drawLine(var$1, var$2, var$3, var$4, var$5);
},
ccrgm_h_a = (var$0, var$1) => {
    var$0.$a30.$drawColor0(var$1);
},
ccrgm_h_a4 = (var$0, var$1, var$2) => {
    var$0.$a30.$drawOval(var$1, var$2);
},
ccrgm_h_a1 = (var$0, var$1, var$2, var$3, var$4) => {
    var$0.$a30.$drawBitmap0(ccrgm_fk_a(var$1), var$2, var$3, var$4);
},
ccrgm_h_a3 = (var$0, var$1, var$2, var$3, var$4) => {
    var$0.$a30.$drawBitmap1(ccrgm_fk_a(var$1), var$2, var$3, var$4);
},
ccrgm_h_a0 = (var$0, var$1, var$2, var$3, var$4) => {
    var$0.$a30.$drawText(var$1, var$2, var$3, var$4);
};
function ccrgm_e() {
    let a = this; jl_Object.call(a);
    a.$d9 = 0;
    a.$e8 = 0;
    a.$k1 = null;
    a.$l2 = 0;
    a.$o3 = 0;
    a.$p = 0;
    a.$q = 0;
    a.$r2 = 0;
    a.$s1 = 0;
    a.$t3 = 0.0;
    a.$u1 = 0.0;
    a.$w1 = 0;
}
let ccrgm_e_x = 0,
ccrgm_e__init_0 = var$0 => {
    let var$1;
    jl_Object__init_(var$0);
    var$0.$l2 = 1;
    var$0.$o3 = 0;
    var$0.$w1 = 0;
    var$1 = ccrgm_e_x;
    ccrgm_e_x = var$1 + 1 | 0;
    var$0.$d9 = var$1;
    var$0.$e8 = 1;
},
ccrgm_e__init_ = () => {
    let var_0 = new ccrgm_e();
    ccrgm_e__init_0(var_0);
    return var_0;
},
ccrgm_e_a = (var$0, var$1) => {
    var$0.$k1 = var$1;
    var$0.$p = var$0.$k1.$getWidth();
    var$0.$q = var$0.$k1.$getHeight();
    var$0.$c();
},
ccrgm_e_b = var$0 => {
    return var$0.$k1;
},
ccrgm_e_c = var$0 => {
    var$0.$r2 = var$0.$p / 2 | 0;
    var$0.$s1 = var$0.$q / 2 | 0;
    var$0.$t3 = var$0.$p / 2.0;
    var$0.$u1 = var$0.$q / 2.0;
},
av_SurfaceHolder$Callback2 = $rt_classWithoutFields(),
ccra_GLSurfaceViewShared = $rt_classWithoutFields(av_SurfaceView),
ccra_eo = $rt_classWithoutFields(0),
ccra_GameViewOpenGL = $rt_classWithoutFields(ccra_GLSurfaceViewShared),
jl_NullPointerException = $rt_classWithoutFields(jl_RuntimeException),
jl_NullPointerException__init_2 = ($this, $message) => {
    jl_RuntimeException__init_0($this, $message);
},
jl_NullPointerException__init_ = var_0 => {
    let var_1 = new jl_NullPointerException();
    jl_NullPointerException__init_2(var_1, var_0);
    return var_1;
},
jl_NullPointerException__init_1 = $this => {
    jl_RuntimeException__init_($this);
},
jl_NullPointerException__init_0 = () => {
    let var_0 = new jl_NullPointerException();
    jl_NullPointerException__init_1(var_0);
    return var_0;
};
function jur_AbstractCharClass$LazyJavaSpaceChar$1() {
    jur_AbstractCharClass.call(this);
    this.$this$028 = null;
}
let jur_AbstractCharClass$LazyJavaSpaceChar$1__init_ = ($this, $this$0) => {
    $this.$this$028 = $this$0;
    jur_AbstractCharClass__init_($this);
},
jur_AbstractCharClass$LazyJavaSpaceChar$1__init_0 = var_0 => {
    let var_1 = new jur_AbstractCharClass$LazyJavaSpaceChar$1();
    jur_AbstractCharClass$LazyJavaSpaceChar$1__init_(var_1, var_0);
    return var_1;
},
jur_AbstractCharClass$LazyJavaSpaceChar$1_contains = ($this, $ch) => {
    return jl_Character_isSpaceChar($ch);
},
otr_EventQueue$Event = $rt_classWithoutFields(0);
function jl_Object$Monitor() {
    let a = this; jl_Object.call(a);
    a.$enteringThreads = null;
    a.$notifyListeners = null;
    a.$owner = null;
    a.$count = 0;
}
let jl_Object$Monitor__init_ = $this => {
    jl_Object__init_($this);
    $this.$owner = jl_Thread_currentThread();
},
jl_Object$Monitor__init_0 = () => {
    let var_0 = new jl_Object$Monitor();
    jl_Object$Monitor__init_(var_0);
    return var_0;
},
jl_Math = $rt_classWithoutFields(),
jl_Math_round = $a => {
    return $a + jl_Math_signum($a) * 0.5 | 0;
},
jl_Math_min = ($a, $b) => {
    if ($a < $b)
        $b = $a;
    return $b;
},
jl_Math_max = ($a, $b) => {
    if ($a > $b)
        $b = $a;
    return $b;
},
jl_Math_maxImpl = (var$1, var$2) => {
    return Math.max(var$1, var$2);
},
jl_Math_max0 = (var$1, var$2) => {
    return jl_Math_maxImpl(var$1, var$2);
},
jl_Math_sign = var$1 => {
    return Math.sign(var$1);
},
jl_Math_signum = var$1 => {
    return jl_Math_sign(var$1);
},
otji_JSWrapper$Helper$FinalizationRegistryConsumer = $rt_classWithoutFields(0),
jur_AbstractCharClass$LazyJavaUnicodeIdentifierPart = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyJavaUnicodeIdentifierPart__init_ = $this => {
    jur_AbstractCharClass$LazyCharClass__init_($this);
},
jur_AbstractCharClass$LazyJavaUnicodeIdentifierPart__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazyJavaUnicodeIdentifierPart();
    jur_AbstractCharClass$LazyJavaUnicodeIdentifierPart__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyJavaUnicodeIdentifierPart_computeValue = $this => {
    let $chCl;
    $chCl = jur_AbstractCharClass$LazyJavaUnicodeIdentifierPart$1__init_0($this);
    $chCl.$mayContainSupplCodepoints0 = 1;
    return $chCl;
},
jl_IllegalArgumentException = $rt_classWithoutFields(jl_RuntimeException),
jl_IllegalArgumentException__init_1 = $this => {
    jl_RuntimeException__init_($this);
},
jl_IllegalArgumentException__init_ = () => {
    let var_0 = new jl_IllegalArgumentException();
    jl_IllegalArgumentException__init_1(var_0);
    return var_0;
},
jl_IllegalArgumentException__init_0 = ($this, $message) => {
    jl_RuntimeException__init_0($this, $message);
},
jl_IllegalArgumentException__init_2 = var_0 => {
    let var_1 = new jl_IllegalArgumentException();
    jl_IllegalArgumentException__init_0(var_1, var_0);
    return var_1;
};
function jur_PatternSyntaxException() {
    let a = this; jl_IllegalArgumentException.call(a);
    a.$desc = null;
    a.$pattern1 = null;
    a.$index0 = 0;
}
let jur_PatternSyntaxException__init_0 = ($this, $description, $pattern, $index) => {
    jl_IllegalArgumentException__init_1($this);
    $this.$index0 = (-1);
    $this.$desc = $description;
    $this.$pattern1 = $pattern;
    $this.$index0 = $index;
},
jur_PatternSyntaxException__init_ = (var_0, var_1, var_2) => {
    let var_3 = new jur_PatternSyntaxException();
    jur_PatternSyntaxException__init_0(var_3, var_0, var_1, var_2);
    return var_3;
},
jur_PatternSyntaxException_getMessage = $this => {
    let $filler, $temp, var$3, var$4, var$5, var$6;
    $filler = $rt_s(13);
    if ($this.$index0 >= 1) {
        $temp = $rt_createCharArray($this.$index0);
        ju_Arrays_fill2($temp, 32);
        $filler = jl_String__init_($temp);
    }
    var$3 = $this.$desc;
    if ($this.$pattern1 !== null && $this.$pattern1.$length()) {
        var$4 = $this.$index0;
        var$5 = $this.$pattern1;
        var$6 = jl_StringBuilder__init_();
        jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append0(var$6, var$4), $rt_s(361)), var$5), $rt_s(361)), $filler);
        var$5 = jl_StringBuilder_toString(var$6);
    } else
        var$5 = $rt_s(13);
    var$6 = jl_StringBuilder__init_();
    jl_StringBuilder_append(jl_StringBuilder_append(var$6, var$3), var$5);
    return jl_StringBuilder_toString(var$6);
};
function ccrg_k() {
    jl_Object.call(this);
    this.$bN = null;
}
let ccrg_k_aE = 0,
ccrg_k_aF = 0,
ccrg_k_aH = null,
ccrg_k_aI = 0,
ccrg_k_aJ = 0,
ccrg_k_aK = 0,
ccrg_k_aL = 0,
ccrg_k_aM = 0,
ccrg_k_aN = null,
ccrg_k_aQ = 0,
ccrg_k_aR = 0,
ccrg_k_aS = 0,
ccrg_k_aT = 0,
ccrg_k_aU = 0,
ccrg_k_aV = 0,
ccrg_k_aW = 0,
ccrg_k_aX = null,
ccrg_k_aY = 0,
ccrg_k_aZ = 0,
ccrg_k_ak = null,
ccrg_k_ar = 0,
ccrg_k_as = 0,
ccrg_k_at = 0,
ccrg_k_av = 0,
ccrg_k_aw = 0,
ccrg_k_az = 0,
ccrg_k_ba = 0,
ccrg_k_bb = 0,
ccrg_k_bc = 0,
ccrg_k_dQ = 0,
ccrg_k_dR = null,
ccrg_k_dS = null,
ccrg_k_dT = null,
ccrg_k_dV = 0,
ccrg_k_dW = 0,
ccrg_k_dY = null,
ccrg_k_dv = null,
ccrg_k_dw = null,
ccrg_k_$callClinit = () => {
    ccrg_k_$callClinit = $rt_eraseClinit(ccrg_k);
    ccrg_k__clinit_();
},
ccrg_k__clinit_ = () => {
    ccrg_k_ak = null;
    ccrg_k_ar = 1;
    ccrg_k_as = 0;
    ccrg_k_at = 0;
    ccrg_k_av = 0;
    ccrg_k_aw = 0;
    ccrg_k_aE = 0;
    ccrg_k_aF = 0;
    ccrg_k_aH = null;
    ccrg_k_aI = 0;
    ccrg_k_aJ = 0;
    ccrg_k_aK = 0;
    ccrg_k_aL = 0;
    ccrg_k_aM = 0;
    ccrg_k_aN = null;
    ccrg_k_aQ = 0;
    ccrg_k_aR = 0;
    ccrg_k_aS = 0;
    ccrg_k_aT = 0;
    ccrg_k_aU = 0;
    ccrg_k_aV = 0;
    ccrg_k_aW = 0;
    ccrg_k_aX = null;
    ccrg_k_aY = 0;
    ccrg_k_aZ = 1;
    ccrg_k_ba = 1;
    ccrg_k_bb = 0;
    ccrg_k_bc = 0;
    ccrg_k_dv = ccrg_af__init_0();
    ccrg_k_dw = ao_Build$VERSION_RELEASE;
    ccrg_k_dQ = 0;
    ccrg_k_dS = $rt_createByteArray(1000);
    ccrg_k_dT = $rt_createByteArray(1000);
    ccrg_k_dV = 0;
    ccrg_k_dW = 0;
    ccrg_k_dY = null;
},
ccrg_k_W = () => {
    let var$1, var$2, var$3;
    ccrg_k_$callClinit();
    if (ccrg_k_dR === null && ccrg_k_Z()) {
        var$1 = $rt_createByteArray(2500000);
        var$2 = var$1.data;
        ccrg_k_dR = var$1;
        var$2[0] = 2;
        var$1 = ccrg_k_dR.data;
        var$1[var$1.length - 1 | 0] = 5;
    }
    if (!ccrg_k_az) {
        var$3 = jl_Thread_getDefaultUncaughtExceptionHandler();
        if (!(var$3 instanceof ccrg_h))
            jl_Thread_setDefaultUncaughtExceptionHandler(ccrg_h__init_0(var$3));
    } else {
        var$3 = (jl_Thread_currentThread()).$getUncaughtExceptionHandler();
        if (!(var$3 instanceof ccrg_h))
            (jl_Thread_currentThread()).$setUncaughtExceptionHandler(ccrg_h__init_0(var$3));
    }
},
ccrg_k_Z = () => {
    ccrg_k_$callClinit();
    return ccrg_k_aT && !ccrg_k_aW ? 1 : 0;
},
ccrg_k_c = var$1 => {
    ccrg_k_$callClinit();
    if (!ccrg_k_aU)
        au_Log_d($rt_s(362), var$1);
    else
        au_Log_d($rt_s(362), var$1);
},
ccrg_k_d = var$1 => {
    ccrg_k_$callClinit();
    ccrg_k_c(var$1);
},
ccrg_k_t = () => {
    ccrg_k_$callClinit();
    return ccrg_k_ak;
},
jur_AbstractCharClass$LazyJavaDefined = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyJavaDefined__init_ = $this => {
    jur_AbstractCharClass$LazyCharClass__init_($this);
},
jur_AbstractCharClass$LazyJavaDefined__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazyJavaDefined();
    jur_AbstractCharClass$LazyJavaDefined__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyJavaDefined_computeValue = $this => {
    let $chCl;
    $chCl = jur_AbstractCharClass$LazyJavaDefined$1__init_0($this);
    $chCl.$lowHighSurrogates.$set(0, 2048);
    $chCl.$mayContainSupplCodepoints0 = 1;
    return $chCl;
},
jl_Thread$UncaughtExceptionHandler = $rt_classWithoutFields(0);
function ccrg_h() {
    jl_Object.call(this);
    this.$a41 = null;
}
let ccrg_h__init_ = (var$0, var$1) => {
    jl_Object__init_(var$0);
    var$0.$a41 = var$1;
},
ccrg_h__init_0 = var_0 => {
    let var_1 = new ccrg_h();
    ccrg_h__init_(var_1, var_0);
    return var_1;
};
function jur_Pattern() {
    let a = this; jl_Object.call(a);
    a.$lexemes = null;
    a.$flags = 0;
    a.$backRefs = null;
    a.$needsBackRefReplacement = 0;
    a.$globalGroupIndex = 0;
    a.$compCount0 = 0;
    a.$consCount0 = 0;
    a.$start1 = null;
    a.$namedGroups0 = null;
}
let jur_Pattern_matcher = ($this, $input) => {
    return jur_Matcher__init_0($this, $input);
},
jur_Pattern_split0 = ($this, $inputSeq, $limit) => {
    let $res, $mat, $index, $curPos, var$7, var$8;
    $res = ju_ArrayList__init_();
    $mat = jur_Pattern_matcher($this, $inputSeq);
    $index = 0;
    $curPos = 0;
    if (!$inputSeq.$length()) {
        var$7 = $rt_createArray(jl_String, 1);
        var$7.data[0] = $rt_s(13);
        return var$7;
    }
    while (jur_Matcher_find0($mat)) {
        var$8 = $index + 1 | 0;
        if (var$8 >= $limit && $limit > 0)
            break;
        $res.$add(($inputSeq.$subSequence($curPos, jur_Matcher_start($mat))).$toString());
        $curPos = jur_Matcher_end0($mat);
        $index = var$8;
    }
    a: {
        $res.$add(($inputSeq.$subSequence($curPos, $inputSeq.$length())).$toString());
        var$8 = $index + 1 | 0;
        if (!$limit)
            while (true) {
                var$8 = var$8 + (-1) | 0;
                if (var$8 < 0)
                    break;
                if ((($res.$get4(var$8)).$toString()).$length())
                    break a;
                $res.$remove1(var$8);
            }
    }
    if (var$8 < 0)
        var$8 = 0;
    return $res.$toArray($rt_createArray(jl_String, var$8));
},
jur_Pattern_split = ($this, $input) => {
    return jur_Pattern_split0($this, $input, 0);
},
jur_Pattern_pattern = $this => {
    return $this.$lexemes.$toString();
},
jur_Pattern_compile0 = ($pattern, $flags) => {
    if ($pattern === null)
        $rt_throw(jl_NullPointerException__init_($rt_s(363)));
    if ($flags && ($flags | 255) != 255)
        $rt_throw(jl_IllegalArgumentException__init_2($rt_s(13)));
    jur_AbstractSet_$callClinit();
    jur_AbstractSet_counter = 1;
    return jur_Pattern_compileImpl(jur_Pattern__init_0(), $pattern, $flags);
},
jur_Pattern_compileImpl = ($this, $pattern, $flags) => {
    $this.$lexemes = jur_Lexer__init_0($pattern, $flags);
    $this.$flags = $flags;
    $this.$start1 = jur_Pattern_processExpression($this, (-1), $this.$flags, null);
    if ($this.$lexemes.$isEmpty()) {
        jur_Pattern_finalizeCompile($this);
        return $this;
    }
    $rt_throw(jur_PatternSyntaxException__init_($rt_s(13), $this.$lexemes.$toString(), $this.$lexemes.$getIndex()));
},
jur_Pattern_processAlternations = ($this, $last) => {
    let $auxRange, var$3, $rangeSet;
    $auxRange = jur_CharClass__init_4(jur_Pattern_hasFlag($this, 2), jur_Pattern_hasFlag($this, 64));
    while (!$this.$lexemes.$isEmpty()) {
        var$3 = $this.$lexemes;
        if (!var$3.$isLetter())
            break;
        var$3 = $this.$lexemes;
        if (var$3.$lookAhead() && $this.$lexemes.$lookAhead() != (-536870788)) {
            var$3 = $this.$lexemes;
            if (var$3.$lookAhead() != (-536870871))
                break;
        }
        $auxRange.$add0($this.$lexemes.$next0());
        if ($this.$lexemes.$peek() != (-536870788))
            continue;
        $this.$lexemes.$next0();
    }
    $rangeSet = jur_Pattern_processRangeSet($this, $auxRange);
    $rangeSet.$setNext($last);
    return $rangeSet;
},
jur_Pattern_processExpression = ($this, $ch, $newFlags, $last) => {
    let $children, $saveFlags, $saveChangedFlags, $fSet, var$8, $child;
    $children = ju_ArrayList__init_();
    $saveFlags = $this.$flags;
    $saveChangedFlags = 0;
    if ($newFlags != $this.$flags)
        $this.$flags = $newFlags;
    a: {
        switch ($ch) {
            case -1073741784:
                $fSet = new jur_NonCapFSet;
                var$8 = $this.$consCount0 + 1 | 0;
                $this.$consCount0 = var$8;
                jur_NonCapFSet__init_($fSet, var$8);
                break a;
            case -536870872:
            case -268435416:
                break;
            case -134217688:
            case -67108824:
                $fSet = new jur_BehindFSet;
                var$8 = $this.$consCount0 + 1 | 0;
                $this.$consCount0 = var$8;
                jur_BehindFSet__init_($fSet, var$8);
                break a;
            case -33554392:
                $fSet = new jur_AtomicFSet;
                var$8 = $this.$consCount0 + 1 | 0;
                $this.$consCount0 = var$8;
                jur_AtomicFSet__init_($fSet, var$8);
                break a;
            default:
                $this.$globalGroupIndex = $this.$globalGroupIndex + 1 | 0;
                if ($last === null) {
                    $fSet = jur_FinalSet__init_0();
                    $saveChangedFlags = 1;
                } else {
                    $fSet = jur_FSet__init_0($this.$globalGroupIndex);
                    if ($ch == (-2130706392)) {
                        if ($this.$namedGroups0 === null)
                            $this.$namedGroups0 = ju_LinkedHashMap__init_0();
                        $this.$namedGroups0.$put($this.$lexemes.$groupName, jl_Integer_valueOf($this.$globalGroupIndex));
                    }
                }
                if ($this.$globalGroupIndex <= (-1))
                    break a;
                if ($this.$globalGroupIndex >= 10)
                    break a;
                $this.$backRefs.data[$this.$globalGroupIndex] = $fSet;
                break a;
        }
        $fSet = jur_AheadFSet__init_0();
    }
    while (true) {
        if ($this.$lexemes.$isLetter() && $this.$lexemes.$lookAhead() == (-536870788))
            $child = jur_Pattern_processAlternations($this, $fSet);
        else if ($this.$lexemes.$peek() == (-536870788)) {
            $child = jur_EmptySet__init_($fSet);
            $this.$lexemes.$next0();
        } else {
            $child = jur_Pattern_processSubExpression($this, $fSet);
            if ($this.$lexemes.$peek() == (-536870788))
                $this.$lexemes.$next0();
        }
        if ($child !== null)
            $children.$add($child);
        if ($this.$lexemes.$isEmpty())
            break;
        if ($this.$lexemes.$peek() == (-536870871))
            break;
    }
    if ($this.$lexemes.$back() == (-536870788))
        $children.$add(jur_EmptySet__init_($fSet));
    if ($this.$flags != $saveFlags && !$saveChangedFlags) {
        $this.$flags = $saveFlags;
        $this.$lexemes.$restoreFlags($this.$flags);
    }
    switch ($ch) {
        case -1073741784:
            break;
        case -536870872:
            return jur_PositiveLookAhead__init_0($children, $fSet);
        case -268435416:
            return jur_NegativeLookAhead__init_0($children, $fSet);
        case -134217688:
            return jur_PositiveLookBehind__init_0($children, $fSet);
        case -67108824:
            return jur_NegativeLookBehind__init_0($children, $fSet);
        case -33554392:
            return jur_AtomicJointSet__init_0($children, $fSet);
        default:
            switch ($children.$size()) {
                case 0:
                    break;
                case 1:
                    return jur_SingleSet__init_0($children.$get4(0), $fSet);
                default:
                    return jur_JointSet__init_1($children, $fSet);
            }
            return jur_EmptySet__init_($fSet);
    }
    return jur_NonCapJointSet__init_0($children, $fSet);
},
jur_Pattern_processSequence = $this => {
    let $substring, var$2, $ch;
    $substring = jl_StringBuffer__init_();
    while (!$this.$lexemes.$isEmpty()) {
        var$2 = $this.$lexemes;
        if (!var$2.$isLetter())
            break;
        var$2 = $this.$lexemes;
        if (var$2.$isHighSurrogate0())
            break;
        var$2 = $this.$lexemes;
        if (var$2.$isLowSurrogate0())
            break;
        var$2 = $this.$lexemes;
        if (!(!var$2.$isNextSpecial() && !$this.$lexemes.$lookAhead())) {
            var$2 = $this.$lexemes;
            if (!(!var$2.$isNextSpecial() && jur_Lexer_isLetter($this.$lexemes.$lookAhead()))) {
                var$2 = $this.$lexemes;
                if (var$2.$lookAhead() != (-536870871)) {
                    var$2 = $this.$lexemes;
                    if ((var$2.$lookAhead() & (-2147418113)) != (-2147483608)) {
                        var$2 = $this.$lexemes;
                        if (var$2.$lookAhead() != (-536870788)) {
                            var$2 = $this.$lexemes;
                            if (var$2.$lookAhead() != (-536870876))
                                break;
                        }
                    }
                }
            }
        }
        $ch = $this.$lexemes.$next0();
        if (!jl_Character_isSupplementaryCodePoint($ch))
            $substring.$append13($ch & 65535);
        else
            $substring.$append14(jl_Character_toChars($ch));
    }
    if (!jur_Pattern_hasFlag($this, 2))
        return jur_SequenceSet__init_0($substring);
    if (jur_Pattern_hasFlag($this, 64))
        return jur_UCISequenceSet__init_0($substring);
    return jur_CISequenceSet__init_0($substring);
},
jur_Pattern_processDecomposedChar = $this => {
    let $codePoints, $readCodePoints, $curSymb, $curSymbIndex, var$5, $codePointsHangul, var$7, var$8, var$9, var$10;
    $codePoints = $rt_createIntArray(4);
    $readCodePoints = 0;
    $curSymb = (-1);
    $curSymbIndex = (-1);
    if (!$this.$lexemes.$isEmpty() && $this.$lexemes.$isLetter()) {
        var$5 = $codePoints.data;
        $curSymb = $this.$lexemes.$next0();
        var$5[$readCodePoints] = $curSymb;
        $curSymbIndex = $curSymb - 4352 | 0;
    }
    if ($curSymbIndex >= 0 && $curSymbIndex < 19) {
        $codePointsHangul = $rt_createCharArray(3);
        var$5 = $codePointsHangul.data;
        var$5[$readCodePoints] = $curSymb & 65535;
        var$7 = $this.$lexemes.$peek();
        var$8 = var$7 - 4449 | 0;
        if (var$8 >= 0 && var$8 < 21) {
            var$5[1] = var$7 & 65535;
            $this.$lexemes.$next0();
            var$9 = $this.$lexemes.$peek();
            var$7 = var$9 - 4519 | 0;
            if (var$7 >= 0 && var$7 < 28) {
                var$5[2] = var$9 & 65535;
                $this.$lexemes.$next0();
                return jur_HangulDecomposedCharSet__init_0($codePointsHangul, 3);
            }
            return jur_HangulDecomposedCharSet__init_0($codePointsHangul, 2);
        }
        if (!jur_Pattern_hasFlag($this, 2))
            return jur_CharSet__init_(var$5[0]);
        if (jur_Pattern_hasFlag($this, 64))
            return jur_UCICharSet__init_0(var$5[0]);
        return jur_CICharSet__init_(var$5[0]);
    }
    var$10 = 1;
    while (var$10 < 4 && !$this.$lexemes.$isEmpty() && $this.$lexemes.$isLetter()) {
        var$5 = $codePoints.data;
        var$9 = var$10 + 1 | 0;
        var$5[var$10] = $this.$lexemes.$next0();
        var$10 = var$9;
    }
    if (var$10 == 1) {
        var$5 = $codePoints.data;
        if (!jur_Lexer_hasSingleCodepointDecomposition(var$5[0]))
            return jur_Pattern_processCharSet($this, var$5[0]);
    }
    if (!jur_Pattern_hasFlag($this, 2))
        return jur_DecomposedCharSet__init_0($codePoints, var$10);
    if (jur_Pattern_hasFlag($this, 64))
        return jur_UCIDecomposedCharSet__init_0($codePoints, var$10);
    return jur_CIDecomposedCharSet__init_0($codePoints, var$10);
},
jur_Pattern_processSubExpression = ($this, $last) => {
    let $cur, $term, var$4, $next;
    if ($this.$lexemes.$isLetter() && !$this.$lexemes.$isNextSpecial() && jur_Lexer_isLetter($this.$lexemes.$lookAhead())) {
        if (!jur_Pattern_hasFlag($this, 128)) {
            if (!$this.$lexemes.$isHighSurrogate0() && !$this.$lexemes.$isLowSurrogate0())
                $cur = jur_Pattern_processSequence($this);
            else {
                $term = jur_Pattern_processTerminal($this, $last);
                $cur = jur_Pattern_processQuantifier($this, $last, $term);
            }
        } else {
            $cur = jur_Pattern_processDecomposedChar($this);
            if (!$this.$lexemes.$isEmpty()) {
                var$4 = $this.$lexemes;
                if (!(var$4.$peek() == (-536870871) && !($last instanceof jur_FinalSet))) {
                    var$4 = $this.$lexemes;
                    if (var$4.$peek() != (-536870788) && !$this.$lexemes.$isLetter())
                        $cur = jur_Pattern_processQuantifier($this, $last, $cur);
                }
            }
        }
    } else if ($this.$lexemes.$peek() != (-536870871)) {
        $term = jur_Pattern_processTerminal($this, $last);
        $cur = jur_Pattern_processQuantifier($this, $last, $term);
    } else {
        if ($last instanceof jur_FinalSet)
            $rt_throw(jur_PatternSyntaxException__init_($rt_s(13), $this.$lexemes.$toString(), $this.$lexemes.$getIndex()));
        $cur = jur_EmptySet__init_($last);
    }
    a: {
        if (!$this.$lexemes.$isEmpty()) {
            var$4 = $this.$lexemes;
            if (!(var$4.$peek() == (-536870871) && !($last instanceof jur_FinalSet))) {
                var$4 = $this.$lexemes;
                if (var$4.$peek() != (-536870788)) {
                    $next = jur_Pattern_processSubExpression($this, $last);
                    if ($cur instanceof jur_LeafQuantifierSet && !($cur instanceof jur_CompositeQuantifierSet) && !($cur instanceof jur_GroupQuantifierSet) && !($cur instanceof jur_AltQuantifierSet)) {
                        var$4 = $cur;
                        if (!$next.$first(var$4.$getInnerSet()))
                            $cur = jur_UnifiedQuantifierSet__init_0(var$4);
                    }
                    if (($next.$getType() & 65535) != 43)
                        $cur.$setNext($next);
                    else
                        $cur.$setNext($next.$getInnerSet());
                    break a;
                }
            }
        }
        if ($cur === null)
            return null;
        $cur.$setNext($last);
    }
    if (($cur.$getType() & 65535) != 43)
        return $cur;
    return $cur.$getInnerSet();
},
jur_Pattern_processQuantifier = ($this, $last, $term) => {
    let $quant, var$4, var$5, var$6, $q, var$8, $leaf;
    $quant = $this.$lexemes.$peek();
    if ($term !== null && !($term instanceof jur_LeafSet)) {
        switch ($quant) {
            case -2147483606:
                $this.$lexemes.$next0();
                return jur_PossessiveGroupQuantifierSet__init_0($term, $last, $quant);
            case -2147483605:
                $this.$lexemes.$next0();
                return jur_PosPlusGroupQuantifierSet__init_0($term, $last, (-2147483606));
            case -2147483585:
                $this.$lexemes.$next0();
                return jur_PosAltGroupQuantifierSet__init_0($term, $last, (-536870849));
            case -2147483525:
                var$4 = new jur_PosCompositeGroupQuantifierSet;
                var$5 = $this.$lexemes.$nextSpecial();
                var$6 = $this.$compCount0 + 1 | 0;
                $this.$compCount0 = var$6;
                jur_PosCompositeGroupQuantifierSet__init_(var$4, var$5, $term, $last, (-536870849), var$6);
                return var$4;
            case -1073741782:
            case -1073741781:
                $this.$lexemes.$next0();
                $q = jur_ReluctantGroupQuantifierSet__init_0($term, $last, $quant);
                $term.$setNext($q);
                return $q;
            case -1073741761:
                $this.$lexemes.$next0();
                $q = jur_RelAltGroupQuantifierSet__init_0($term, $last, (-536870849));
                $term.$setNext($last);
                return $q;
            case -1073741701:
                $q = new jur_RelCompositeGroupQuantifierSet;
                var$4 = $this.$lexemes;
                var$4 = var$4.$nextSpecial();
                var$8 = $this.$compCount0 + 1 | 0;
                $this.$compCount0 = var$8;
                jur_RelCompositeGroupQuantifierSet__init_($q, var$4, $term, $last, (-536870849), var$8);
                $term.$setNext($q);
                return $q;
            case -536870870:
            case -536870869:
                $this.$lexemes.$next0();
                $q = $term.$getType() != (-2147483602) ? jur_GroupQuantifierSet__init_0($term, $last, $quant) : jur_Pattern_hasFlag($this, 32) ? jur_DotAllQuantifierSet__init_0($term, $last, $quant) : jur_DotQuantifierSet__init_0($term, $last, $quant, jur_AbstractLineTerminator_getInstance($this.$flags));
                $term.$setNext($q);
                return $q;
            case -536870849:
                $this.$lexemes.$next0();
                $q = jur_AltGroupQuantifierSet__init_0($term, $last, (-536870849));
                $term.$setNext($last);
                return $q;
            case -536870789:
                $q = new jur_CompositeGroupQuantifierSet;
                var$4 = $this.$lexemes;
                var$4 = var$4.$nextSpecial();
                var$6 = $this.$compCount0 + 1 | 0;
                $this.$compCount0 = var$6;
                jur_CompositeGroupQuantifierSet__init_($q, var$4, $term, $last, (-536870849), var$6);
                $term.$setNext($q);
                return $q;
            default:
        }
        return $term;
    }
    $leaf = null;
    if ($term !== null)
        $leaf = $term;
    switch ($quant) {
        case -2147483606:
        case -2147483605:
            $this.$lexemes.$next0();
            $q = jur_PossessiveQuantifierSet__init_0($leaf, $last, $quant);
            $leaf.$setNext($q);
            return $q;
        case -2147483585:
            $this.$lexemes.$next0();
            return jur_PossessiveAltQuantifierSet__init_0($leaf, $last, (-2147483585));
        case -2147483525:
            return jur_PossessiveCompositeQuantifierSet__init_0($this.$lexemes.$nextSpecial(), $leaf, $last, (-2147483525));
        case -1073741782:
        case -1073741781:
            $this.$lexemes.$next0();
            $q = jur_ReluctantQuantifierSet__init_0($leaf, $last, $quant);
            $leaf.$setNext($q);
            return $q;
        case -1073741761:
            $this.$lexemes.$next0();
            return jur_ReluctantAltQuantifierSet__init_0($leaf, $last, (-1073741761));
        case -1073741701:
            return jur_ReluctantCompositeQuantifierSet__init_0($this.$lexemes.$nextSpecial(), $leaf, $last, (-1073741701));
        case -536870870:
        case -536870869:
            $this.$lexemes.$next0();
            $q = jur_LeafQuantifierSet__init_0($leaf, $last, $quant);
            $leaf.$setNext($q);
            return $q;
        case -536870849:
            $this.$lexemes.$next0();
            return jur_AltQuantifierSet__init_0($leaf, $last, (-536870849));
        case -536870789:
            return jur_CompositeQuantifierSet__init_0($this.$lexemes.$nextSpecial(), $leaf, $last, (-536870789));
        default:
    }
    return $term;
},
jur_Pattern_processTerminal = ($this, $last) => {
    let $term, $ch, $newFlags, var$5, $negative, $cc, $number, var$9, var$10, var$11;
    $term = null;
    while (true) {
        a: {
            $ch = $this.$lexemes.$peek();
            if (($ch & (-2147418113)) == (-2147483608)) {
                $this.$lexemes.$next0();
                $newFlags = ($ch & 16711680) >> 16;
                $ch = $ch & (-16711681);
                if ($ch == (-16777176))
                    $this.$flags = $newFlags;
                else {
                    if ($ch != (-1073741784))
                        $newFlags = $this.$flags;
                    $term = jur_Pattern_processExpression($this, $ch, $newFlags, $last);
                    if ($this.$lexemes.$peek() != (-536870871))
                        $rt_throw(jur_PatternSyntaxException__init_($rt_s(13), $this.$lexemes.$toString(), $this.$lexemes.$getIndex()));
                    $this.$lexemes.$next0();
                }
            } else {
                b: {
                    c: {
                        switch ($ch) {
                            case -2147483599:
                            case -2147483598:
                            case -2147483597:
                            case -2147483596:
                            case -2147483595:
                            case -2147483594:
                            case -2147483593:
                            case -2147483592:
                            case -2147483591:
                                break c;
                            case -2147483583:
                                break;
                            case -2147483582:
                                $this.$lexemes.$next0();
                                $term = jur_WordBoundary__init_(0);
                                break a;
                            case -2147483577:
                                $this.$lexemes.$next0();
                                $term = jur_PreviousMatch__init_0();
                                break a;
                            case -2147483558:
                                $this.$lexemes.$next0();
                                $term = new jur_EOLSet;
                                var$5 = $this.$consCount0 + 1 | 0;
                                $this.$consCount0 = var$5;
                                jur_EOLSet__init_($term, var$5);
                                break a;
                            case -2147483550:
                                $this.$lexemes.$next0();
                                $term = jur_WordBoundary__init_(1);
                                break a;
                            case -2147483526:
                                $this.$lexemes.$next0();
                                $term = jur_EOISet__init_0();
                                break a;
                            case -536870876:
                                $this.$lexemes.$next0();
                                $this.$consCount0 = $this.$consCount0 + 1 | 0;
                                if (jur_Pattern_hasFlag($this, 8)) {
                                    if (jur_Pattern_hasFlag($this, 1)) {
                                        $term = jur_UMultiLineEOLSet__init_0($this.$consCount0);
                                        break a;
                                    }
                                    $term = jur_MultiLineEOLSet__init_0($this.$consCount0);
                                    break a;
                                }
                                if (jur_Pattern_hasFlag($this, 1)) {
                                    $term = jur_UEOLSet__init_0($this.$consCount0);
                                    break a;
                                }
                                $term = jur_EOLSet__init_0($this.$consCount0);
                                break a;
                            case -536870866:
                                $this.$lexemes.$next0();
                                if (jur_Pattern_hasFlag($this, 32)) {
                                    $term = jur_DotAllSet__init_0();
                                    break a;
                                }
                                $term = jur_DotSet__init_0(jur_AbstractLineTerminator_getInstance($this.$flags));
                                break a;
                            case -536870821:
                                $this.$lexemes.$next0();
                                $negative = 0;
                                if ($this.$lexemes.$peek() == (-536870818)) {
                                    $negative = 1;
                                    $this.$lexemes.$next0();
                                }
                                $term = jur_Pattern_processRange($this, $negative, $last);
                                if ($this.$lexemes.$peek() != (-536870819))
                                    $rt_throw(jur_PatternSyntaxException__init_($rt_s(13), $this.$lexemes.$toString(), $this.$lexemes.$getIndex()));
                                $this.$lexemes.$setMode(1);
                                $this.$lexemes.$next0();
                                break a;
                            case -536870818:
                                $this.$lexemes.$next0();
                                $this.$consCount0 = $this.$consCount0 + 1 | 0;
                                if (!jur_Pattern_hasFlag($this, 8)) {
                                    $term = jur_SOLSet__init_0();
                                    break a;
                                }
                                $term = jur_MultiLineSOLSet__init_0(jur_AbstractLineTerminator_getInstance($this.$flags));
                                break a;
                            case 0:
                                $cc = $this.$lexemes.$peekSpecial();
                                if ($cc !== null)
                                    $term = jur_Pattern_processRangeSet($this, $cc);
                                else {
                                    if ($this.$lexemes.$isEmpty()) {
                                        $term = jur_EmptySet__init_($last);
                                        break a;
                                    }
                                    $term = jur_CharSet__init_($ch & 65535);
                                }
                                $this.$lexemes.$next0();
                                break a;
                            default:
                                break b;
                        }
                        $this.$lexemes.$next0();
                        $term = jur_SOLSet__init_0();
                        break a;
                    }
                    $number = ($ch & 2147483647) - 48 | 0;
                    if ($this.$globalGroupIndex < $number)
                        $rt_throw(jur_PatternSyntaxException__init_($rt_s(13), $this.$lexemes.$toString(), $this.$lexemes.$getIndex()));
                    $this.$lexemes.$next0();
                    $this.$consCount0 = $this.$consCount0 + 1 | 0;
                    $term = !jur_Pattern_hasFlag($this, 2) ? jur_BackReferenceSet__init_0($number, $this.$consCount0) : jur_Pattern_hasFlag($this, 64) ? jur_UCIBackReferenceSet__init_0($number, $this.$consCount0) : jur_CIBackReferenceSet__init_0($number, $this.$consCount0);
                    $this.$backRefs.data[$number].$isBackReferenced = 1;
                    $this.$needsBackRefReplacement = 1;
                    break a;
                }
                if ($ch >= 0 && !$this.$lexemes.$isSpecial()) {
                    $term = jur_Pattern_processCharSet($this, $ch);
                    $this.$lexemes.$next0();
                } else if ($ch == (-536870788))
                    $term = jur_EmptySet__init_($last);
                else {
                    if ($ch != (-536870871)) {
                        var$9 = new jur_PatternSyntaxException;
                        var$10 = !$this.$lexemes.$isSpecial() ? jl_Character_toString($ch & 65535) : ($this.$lexemes.$peekSpecial()).$toString();
                        var$11 = $this.$lexemes;
                        jur_PatternSyntaxException__init_0(var$9, var$10, var$11.$toString(), $this.$lexemes.$getIndex());
                        $rt_throw(var$9);
                    }
                    if ($last instanceof jur_FinalSet)
                        $rt_throw(jur_PatternSyntaxException__init_($rt_s(13), $this.$lexemes.$toString(), $this.$lexemes.$getIndex()));
                    $term = jur_EmptySet__init_($last);
                }
            }
        }
        if ($ch != (-16777176))
            break;
    }
    return $term;
},
jur_Pattern_processRange = ($this, $negative, $last) => {
    let $res, $rangeSet;
    $res = jur_Pattern_processRangeExpression($this, $negative);
    $rangeSet = jur_Pattern_processRangeSet($this, $res);
    $rangeSet.$setNext($last);
    return $rangeSet;
},
jur_Pattern_processRangeExpression = ($this, $alt) => {
    let $res, $buffer, $intersection, $notClosed, $firstInClass, var$7, $cur, $negative, $cs, $$je;
    $res = jur_CharClass__init_3($alt, jur_Pattern_hasFlag($this, 2), jur_Pattern_hasFlag($this, 64));
    $buffer = (-1);
    $intersection = 0;
    $notClosed = 0;
    $firstInClass = 1;
    a: {
        b: {
            c: while (true) {
                if ($this.$lexemes.$isEmpty())
                    break a;
                $notClosed = $this.$lexemes.$peek() == (-536870819) && !$firstInClass ? 0 : 1;
                if (!$notClosed)
                    break a;
                d: {
                    switch ($this.$lexemes.$peek()) {
                        case -536870874:
                            if ($buffer >= 0)
                                $res.$add0($buffer);
                            $buffer = $this.$lexemes.$next0();
                            if ($this.$lexemes.$peek() != (-536870874)) {
                                $buffer = 38;
                                break d;
                            }
                            if ($this.$lexemes.$lookAhead() == (-536870821)) {
                                $this.$lexemes.$next0();
                                $intersection = 1;
                                $buffer = (-1);
                                break d;
                            }
                            $this.$lexemes.$next0();
                            if ($firstInClass) {
                                $res = jur_Pattern_processRangeExpression($this, 0);
                                break d;
                            }
                            if ($this.$lexemes.$peek() == (-536870819))
                                break d;
                            $res.$intersection(jur_Pattern_processRangeExpression($this, 0));
                            break d;
                        case -536870867:
                            if (!$firstInClass && $this.$lexemes.$lookAhead() != (-536870819)) {
                                var$7 = $this.$lexemes;
                                if (var$7.$lookAhead() != (-536870821) && $buffer >= 0) {
                                    $this.$lexemes.$next0();
                                    $cur = $this.$lexemes.$peek();
                                    if ($this.$lexemes.$isSpecial())
                                        break c;
                                    if ($cur < 0) {
                                        var$7 = $this.$lexemes;
                                        if (var$7.$lookAhead() != (-536870819)) {
                                            var$7 = $this.$lexemes;
                                            if (var$7.$lookAhead() != (-536870821) && $buffer >= 0)
                                                break c;
                                        }
                                    }
                                    e: {
                                        try {
                                            if (jur_Lexer_isLetter($cur))
                                                break e;
                                            $cur = $cur & 65535;
                                            break e;
                                        } catch ($$e) {
                                            $$je = $rt_wrapException($$e);
                                            if ($$je instanceof jl_Exception) {
                                                break b;
                                            } else {
                                                throw $$e;
                                            }
                                        }
                                    }
                                    try {
                                        $res.$add1($buffer, $cur);
                                    } catch ($$e) {
                                        $$je = $rt_wrapException($$e);
                                        if ($$je instanceof jl_Exception) {
                                            break b;
                                        } else {
                                            throw $$e;
                                        }
                                    }
                                    $this.$lexemes.$next0();
                                    $buffer = (-1);
                                    break d;
                                }
                            }
                            if ($buffer >= 0)
                                $res.$add0($buffer);
                            $buffer = 45;
                            $this.$lexemes.$next0();
                            break d;
                        case -536870821:
                            if ($buffer >= 0) {
                                $res.$add0($buffer);
                                $buffer = (-1);
                            }
                            $this.$lexemes.$next0();
                            $negative = 0;
                            if ($this.$lexemes.$peek() == (-536870818)) {
                                $this.$lexemes.$next0();
                                $negative = 1;
                            }
                            if (!$intersection)
                                $res.$union(jur_Pattern_processRangeExpression($this, $negative));
                            else
                                $res.$intersection(jur_Pattern_processRangeExpression($this, $negative));
                            $intersection = 0;
                            $this.$lexemes.$next0();
                            break d;
                        case -536870819:
                            if ($buffer >= 0)
                                $res.$add0($buffer);
                            $buffer = 93;
                            $this.$lexemes.$next0();
                            break d;
                        case -536870818:
                            if ($buffer >= 0)
                                $res.$add0($buffer);
                            $buffer = 94;
                            $this.$lexemes.$next0();
                            break d;
                        case 0:
                            if ($buffer >= 0)
                                $res.$add0($buffer);
                            $cs = $this.$lexemes.$peekSpecial();
                            if ($cs === null)
                                $buffer = 0;
                            else {
                                $res.$add4($cs);
                                $buffer = (-1);
                            }
                            $this.$lexemes.$next0();
                            break d;
                        default:
                    }
                    if ($buffer >= 0)
                        $res.$add0($buffer);
                    $buffer = $this.$lexemes.$next0();
                }
                $firstInClass = 0;
            }
            $rt_throw(jur_PatternSyntaxException__init_($rt_s(13), jur_Pattern_pattern($this), $this.$lexemes.$getIndex()));
        }
        $rt_throw(jur_PatternSyntaxException__init_($rt_s(13), jur_Pattern_pattern($this), $this.$lexemes.$getIndex()));
    }
    if (!$notClosed) {
        if ($buffer >= 0)
            $res.$add0($buffer);
        return $res;
    }
    $rt_throw(jur_PatternSyntaxException__init_($rt_s(13), jur_Pattern_pattern($this), $this.$lexemes.$getIndex() - 1 | 0));
},
jur_Pattern_processCharSet = ($this, $ch) => {
    let $isSupplCodePoint;
    $isSupplCodePoint = jl_Character_isSupplementaryCodePoint($ch);
    if (jur_Pattern_hasFlag($this, 2)) {
        a: {
            if (!($ch >= 97 && $ch <= 122)) {
                if ($ch < 65)
                    break a;
                if ($ch > 90)
                    break a;
            }
            return jur_CICharSet__init_($ch & 65535);
        }
        if (jur_Pattern_hasFlag($this, 64) && $ch > 128) {
            if ($isSupplCodePoint)
                return jur_UCISupplCharSet__init_0($ch);
            if (jur_Lexer_isLowSurrogate($ch))
                return jur_LowSurrogateCharSet__init_($ch & 65535);
            if (!jur_Lexer_isHighSurrogate($ch))
                return jur_UCICharSet__init_0($ch & 65535);
            return jur_HighSurrogateCharSet__init_0($ch & 65535);
        }
    }
    if ($isSupplCodePoint)
        return jur_SupplCharSet__init_0($ch);
    if (jur_Lexer_isLowSurrogate($ch))
        return jur_LowSurrogateCharSet__init_($ch & 65535);
    if (!jur_Lexer_isHighSurrogate($ch))
        return jur_CharSet__init_($ch & 65535);
    return jur_HighSurrogateCharSet__init_0($ch & 65535);
},
jur_Pattern_processRangeSet = ($this, $charClass) => {
    let $surrogates, $lowHighSurrRangeSet;
    if (!$charClass.$hasLowHighSurrogates()) {
        if (!$charClass.$mayContainSupplCodepoints()) {
            if ($charClass.$hasUCI())
                return jur_UCIRangeSet__init_0($charClass);
            return jur_RangeSet__init_0($charClass);
        }
        if ($charClass.$hasUCI())
            return jur_UCISupplRangeSet__init_($charClass);
        return jur_SupplRangeSet__init_0($charClass);
    }
    $surrogates = $charClass.$getSurrogates();
    $lowHighSurrRangeSet = jur_LowHighSurrogateRangeSet__init_0($surrogates);
    if (!$charClass.$mayContainSupplCodepoints()) {
        if ($charClass.$hasUCI())
            return jur_CompositeRangeSet__init_(jur_UCIRangeSet__init_0($charClass.$getWithoutSurrogates()), $lowHighSurrRangeSet);
        return jur_CompositeRangeSet__init_(jur_RangeSet__init_0($charClass.$getWithoutSurrogates()), $lowHighSurrRangeSet);
    }
    if ($charClass.$hasUCI())
        return jur_CompositeRangeSet__init_(jur_UCISupplRangeSet__init_($charClass.$getWithoutSurrogates()), $lowHighSurrRangeSet);
    return jur_CompositeRangeSet__init_(jur_SupplRangeSet__init_0($charClass.$getWithoutSurrogates()), $lowHighSurrRangeSet);
},
jur_Pattern_compile = $pattern => {
    return jur_Pattern_compile0($pattern, 0);
},
jur_Pattern_finalizeCompile = $this => {
    if ($this.$needsBackRefReplacement)
        $this.$start1.$processSecondPass();
    if ($this.$namedGroups0 === null)
        $this.$namedGroups0 = ju_Collections_emptyMap();
    else
        $this.$namedGroups0 = ju_Collections_unmodifiableMap($this.$namedGroups0);
},
jur_Pattern_quote = $s => {
    let $sb, $apos, var$4, $apos_0;
    $sb = (jl_StringBuilder__init_()).$append15($rt_s(364));
    $apos = 0;
    while (true) {
        var$4 = $s.$indexOf0($rt_s(365), $apos);
        if (var$4 < 0)
            break;
        $apos_0 = var$4 + 2 | 0;
        ($sb.$append15($s.$substring($apos, $apos_0))).$append15($rt_s(366));
        $apos = $apos_0;
    }
    return (($sb.$append15($s.$substring0($apos))).$append15($rt_s(365))).$toString();
},
jur_Pattern_namedGroups = $this => {
    return $this.$namedGroups0;
},
jur_Pattern_groupCount = $this => {
    return $this.$globalGroupIndex;
},
jur_Pattern_compCount = $this => {
    return $this.$compCount0 + 1 | 0;
},
jur_Pattern_consCount = $this => {
    return $this.$consCount0 + 1 | 0;
},
jur_Pattern_getSupplement = $ch => {
    if ($ch >= 97 && $ch <= 122)
        $ch = ($ch - 32 | 0) & 65535;
    else if ($ch >= 65 && $ch <= 90)
        $ch = ($ch + 32 | 0) & 65535;
    return $ch;
},
jur_Pattern_hasFlag = ($this, $flag) => {
    return ($this.$flags & $flag) != $flag ? 0 : 1;
},
jur_Pattern__init_ = $this => {
    jl_Object__init_($this);
    $this.$backRefs = $rt_createArray(jur_FSet, 10);
    $this.$globalGroupIndex = (-1);
    $this.$compCount0 = (-1);
    $this.$consCount0 = (-1);
},
jur_Pattern__init_0 = () => {
    let var_0 = new jur_Pattern();
    jur_Pattern__init_(var_0);
    return var_0;
},
ccrg_x = $rt_classWithoutFields(),
ccrg_x__init_ = var$0 => {
    jl_Object__init_(var$0);
},
jur_PosAltGroupQuantifierSet = $rt_classWithoutFields(jur_AltGroupQuantifierSet),
jur_PosAltGroupQuantifierSet__init_ = ($this, $innerSet, $next, $type) => {
    jur_AltGroupQuantifierSet__init_($this, $innerSet, $next, $type);
    jur_FSet_$callClinit();
    $innerSet.$setNext(jur_FSet_posFSet);
},
jur_PosAltGroupQuantifierSet__init_0 = (var_0, var_1, var_2) => {
    let var_3 = new jur_PosAltGroupQuantifierSet();
    jur_PosAltGroupQuantifierSet__init_(var_3, var_0, var_1, var_2);
    return var_3;
},
jur_PosAltGroupQuantifierSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $nextIndex;
    $nextIndex = $this.$innerSet.$matches($stringIndex, $testString, $matchResult);
    if ($nextIndex <= 0)
        $nextIndex = $stringIndex;
    return $this.$next1.$matches($nextIndex, $testString, $matchResult);
},
jur_PosAltGroupQuantifierSet_setNext = ($this, $next) => {
    $this.$next1 = $next;
},
jn_BufferOverflowException = $rt_classWithoutFields(jl_RuntimeException),
jn_BufferOverflowException__init_0 = $this => {
    jl_RuntimeException__init_($this);
},
jn_BufferOverflowException__init_ = () => {
    let var_0 = new jn_BufferOverflowException();
    jn_BufferOverflowException__init_0(var_0);
    return var_0;
};
function ju_Collections$13() {
    ju_AbstractMap.call(this);
    this.$val$m = null;
}
let ju_Collections$13__init_ = ($this, var$1) => {
    $this.$val$m = var$1;
    ju_AbstractMap__init_($this);
},
ju_Collections$13__init_0 = var_0 => {
    let var_1 = new ju_Collections$13();
    ju_Collections$13__init_(var_1, var_0);
    return var_1;
},
ag_Paint$Style = $rt_classWithoutFields(jl_Enum),
ag_Paint$Style_FILL = null,
ag_Paint$Style_STROKE = null,
ag_Paint$Style_FILL_AND_STROKE = null,
ag_Paint$Style_$VALUES = null,
ag_Paint$Style_$callClinit = () => {
    ag_Paint$Style_$callClinit = $rt_eraseClinit(ag_Paint$Style);
    ag_Paint$Style__clinit_();
},
ag_Paint$Style__init_0 = (var$0, var$1, var$2) => {
    ag_Paint$Style_$callClinit();
    jl_Enum__init_(var$0, var$1, var$2);
},
ag_Paint$Style__init_ = (var_0, var_1) => {
    let var_2 = new ag_Paint$Style();
    ag_Paint$Style__init_0(var_2, var_0, var_1);
    return var_2;
},
ag_Paint$Style_$values = () => {
    let var$1, var$2;
    ag_Paint$Style_$callClinit();
    var$1 = $rt_createArray(ag_Paint$Style, 3);
    var$2 = var$1.data;
    var$2[0] = ag_Paint$Style_FILL;
    var$2[1] = ag_Paint$Style_STROKE;
    var$2[2] = ag_Paint$Style_FILL_AND_STROKE;
    return var$1;
},
ag_Paint$Style__clinit_ = () => {
    ag_Paint$Style_FILL = ag_Paint$Style__init_($rt_s(367), 0);
    ag_Paint$Style_STROKE = ag_Paint$Style__init_($rt_s(368), 1);
    ag_Paint$Style_FILL_AND_STROKE = ag_Paint$Style__init_($rt_s(369), 2);
    ag_Paint$Style_$VALUES = ag_Paint$Style_$values();
},
jur_AbstractCharClass$LazyJavaLetterOrDigit = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyJavaLetterOrDigit__init_ = $this => {
    jur_AbstractCharClass$LazyCharClass__init_($this);
},
jur_AbstractCharClass$LazyJavaLetterOrDigit__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazyJavaLetterOrDigit();
    jur_AbstractCharClass$LazyJavaLetterOrDigit__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyJavaLetterOrDigit_computeValue = $this => {
    let $chCl;
    $chCl = jur_AbstractCharClass$LazyJavaLetterOrDigit$1__init_0($this);
    $chCl.$mayContainSupplCodepoints0 = 1;
    return $chCl;
};
function otciu_UnicodeHelper$Range() {
    let a = this; jl_Object.call(a);
    a.$start2 = 0;
    a.$end1 = 0;
    a.$data5 = null;
}
let otciu_UnicodeHelper$Range__init_ = ($this, $start, $end, $data) => {
    jl_Object__init_($this);
    $this.$start2 = $start;
    $this.$end1 = $end;
    $this.$data5 = $data;
},
otciu_UnicodeHelper$Range__init_0 = (var_0, var_1, var_2) => {
    let var_3 = new otciu_UnicodeHelper$Range();
    otciu_UnicodeHelper$Range__init_(var_3, var_0, var_1, var_2);
    return var_3;
},
jur_AbstractLineTerminator$2 = $rt_classWithoutFields(jur_AbstractLineTerminator),
jur_AbstractLineTerminator$2__init_ = $this => {
    jur_AbstractLineTerminator__init_($this);
},
jur_AbstractLineTerminator$2__init_0 = () => {
    let var_0 = new jur_AbstractLineTerminator$2();
    jur_AbstractLineTerminator$2__init_(var_0);
    return var_0;
},
jur_AbstractLineTerminator$2_isLineTerminator = ($this, $ch) => {
    return $ch != 10 && $ch != 13 && $ch != 133 && ($ch | 1) != 8233 ? 0 : 1;
},
jur_AbstractLineTerminator$2_isAfterLineTerminator = ($this, $ch, $ch2) => {
    let var$3;
    a: {
        b: {
            if ($ch != 10 && $ch != 133 && ($ch | 1) != 8233) {
                if ($ch != 13)
                    break b;
                if ($ch2 == 10)
                    break b;
            }
            var$3 = 1;
            break a;
        }
        var$3 = 0;
    }
    return var$3;
};
function otciu_CharMapping() {
    let a = this; jl_Object.call(a);
    a.$binarySearchTable0 = null;
    a.$fastTable = null;
}
let otciu_CharMapping__init_ = ($this, $binarySearchTable, $fastTable) => {
    jl_Object__init_($this);
    $this.$binarySearchTable0 = $binarySearchTable;
    $this.$fastTable = $fastTable;
},
otciu_CharMapping__init_0 = (var_0, var_1) => {
    let var_2 = new otciu_CharMapping();
    otciu_CharMapping__init_(var_2, var_0, var_1);
    return var_2;
},
jur_AbstractLineTerminator$1 = $rt_classWithoutFields(jur_AbstractLineTerminator),
jur_AbstractLineTerminator$1__init_ = $this => {
    jur_AbstractLineTerminator__init_($this);
},
jur_AbstractLineTerminator$1__init_0 = () => {
    let var_0 = new jur_AbstractLineTerminator$1();
    jur_AbstractLineTerminator$1__init_(var_0);
    return var_0;
},
jur_AbstractLineTerminator$1_isLineTerminator = ($this, $ch) => {
    return $ch != 10 ? 0 : 1;
},
jur_AbstractLineTerminator$1_isAfterLineTerminator = ($this, $ch, $ch2) => {
    return $ch != 10 ? 0 : 1;
},
jur_AbstractCharClass$LazyJavaUnicodeIdentifierStart = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyJavaUnicodeIdentifierStart__init_ = $this => {
    jur_AbstractCharClass$LazyCharClass__init_($this);
},
jur_AbstractCharClass$LazyJavaUnicodeIdentifierStart__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazyJavaUnicodeIdentifierStart();
    jur_AbstractCharClass$LazyJavaUnicodeIdentifierStart__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyJavaUnicodeIdentifierStart_computeValue = $this => {
    let $chCl;
    $chCl = jur_AbstractCharClass$LazyJavaUnicodeIdentifierStart$1__init_0($this);
    $chCl.$mayContainSupplCodepoints0 = 1;
    return $chCl;
},
otjc_JSWeakRef = $rt_classWithoutFields();
function otci_CharFlow() {
    let a = this; jl_Object.call(a);
    a.$characters = null;
    a.$pointer = 0;
}
let otci_CharFlow__init_ = ($this, $characters) => {
    jl_Object__init_($this);
    $this.$characters = $characters;
},
otci_CharFlow__init_0 = var_0 => {
    let var_1 = new otci_CharFlow();
    otci_CharFlow__init_(var_1, var_0);
    return var_1;
};
function jur_RangeSet() {
    let a = this; jur_LeafSet.call(a);
    a.$chars0 = null;
    a.$alt1 = 0;
}
let jur_RangeSet__init_ = ($this, $cc) => {
    jur_LeafSet__init_($this);
    $this.$chars0 = $cc.$getInstance();
    $this.$alt1 = $cc.$alt;
},
jur_RangeSet__init_0 = var_0 => {
    let var_1 = new jur_RangeSet();
    jur_RangeSet__init_(var_1, var_0);
    return var_1;
},
jur_RangeSet_accepts = ($this, $strIndex, $testString) => {
    return !$this.$chars0.$contains($testString.$charAt($strIndex)) ? (-1) : 1;
},
jur_RangeSet_first = ($this, $set) => {
    if ($set instanceof jur_CharSet)
        return jur_AbstractCharClass_intersects0($this.$chars0, $set.$getChar());
    if ($set instanceof jur_RangeSet)
        return jur_AbstractCharClass_intersects($this.$chars0, $set.$chars0);
    if ($set instanceof jur_SupplRangeSet)
        return jur_AbstractCharClass_intersects($this.$chars0, $set.$getChars());
    if (!($set instanceof jur_SupplCharSet))
        return 1;
    return 0;
},
jur_RangeSet_getChars = $this => {
    return $this.$chars0;
};
function jur_UnicodeCategory() {
    jur_AbstractCharClass.call(this);
    this.$category = 0;
}
let jur_UnicodeCategory__init_ = ($this, $category) => {
    jur_AbstractCharClass__init_($this);
    $this.$category = $category;
},
jur_UnicodeCategory__init_0 = var_0 => {
    let var_1 = new jur_UnicodeCategory();
    jur_UnicodeCategory__init_(var_1, var_0);
    return var_1;
},
jur_UnicodeCategory_contains = ($this, $ch) => {
    return $this.$alt ^ ($this.$category != jl_Character_getType0($ch & 65535) ? 0 : 1);
},
jur_UnicodeCategoryScope = $rt_classWithoutFields(jur_UnicodeCategory),
jur_UnicodeCategoryScope__init_ = ($this, $category) => {
    jur_UnicodeCategory__init_($this, $category);
},
jur_UnicodeCategoryScope__init_0 = var_0 => {
    let var_1 = new jur_UnicodeCategoryScope();
    jur_UnicodeCategoryScope__init_(var_1, var_0);
    return var_1;
},
jur_UnicodeCategoryScope_contains = ($this, $ch) => {
    return $this.$alt ^ (!($this.$category >> jl_Character_getType0($ch & 65535) & 1) ? 0 : 1);
},
otjt_Float32Array = $rt_classWithoutFields(otjt_TypedArray);
function jur_CharClass() {
    let a = this; jur_AbstractCharClass.call(a);
    a.$ci = 0;
    a.$uci = 0;
    a.$hasUCI0 = 0;
    a.$invertedSurrogates = 0;
    a.$inverted = 0;
    a.$hideBits = 0;
    a.$bits = null;
    a.$nonBitSet = null;
}
let jur_CharClass__init_2 = $this => {
    jur_AbstractCharClass__init_($this);
    $this.$bits = ju_BitSet__init_1();
},
jur_CharClass__init_ = () => {
    let var_0 = new jur_CharClass();
    jur_CharClass__init_2(var_0);
    return var_0;
},
jur_CharClass__init_0 = ($this, $ci, $uci) => {
    jur_AbstractCharClass__init_($this);
    $this.$bits = ju_BitSet__init_1();
    $this.$ci = $ci;
    $this.$uci = $uci;
},
jur_CharClass__init_4 = (var_0, var_1) => {
    let var_2 = new jur_CharClass();
    jur_CharClass__init_0(var_2, var_0, var_1);
    return var_2;
},
jur_CharClass__init_1 = ($this, $negative, $ci, $uci) => {
    jur_CharClass__init_0($this, $ci, $uci);
    $this.$setNegative($negative);
},
jur_CharClass__init_3 = (var_0, var_1, var_2) => {
    let var_3 = new jur_CharClass();
    jur_CharClass__init_1(var_3, var_0, var_1, var_2);
    return var_3;
},
jur_CharClass_add = ($this, $ch) => {
    a: {
        if ($this.$ci) {
            b: {
                if (!($ch >= 97 && $ch <= 122)) {
                    if ($ch < 65)
                        break b;
                    if ($ch > 90)
                        break b;
                }
                if ($this.$inverted) {
                    $this.$bits.$clear1(jur_Pattern_getSupplement($ch & 65535));
                    break a;
                }
                $this.$bits.$set0(jur_Pattern_getSupplement($ch & 65535));
                break a;
            }
            if ($this.$uci && $ch > 128) {
                $this.$hasUCI0 = 1;
                $ch = jl_Character_toLowerCase0(jl_Character_toUpperCase0($ch));
            }
        }
    }
    if (!(!jur_Lexer_isHighSurrogate($ch) && !jur_Lexer_isLowSurrogate($ch))) {
        if ($this.$invertedSurrogates)
            $this.$lowHighSurrogates.$clear1($ch - 55296 | 0);
        else
            $this.$lowHighSurrogates.$set0($ch - 55296 | 0);
    }
    if ($this.$inverted)
        $this.$bits.$clear1($ch);
    else
        $this.$bits.$set0($ch);
    if (!$this.$mayContainSupplCodepoints0 && jl_Character_isSupplementaryCodePoint($ch))
        $this.$mayContainSupplCodepoints0 = 1;
    return $this;
},
jur_CharClass_add1 = ($this, $cc) => {
    let $curAlt, $nb;
    if (!$this.$mayContainSupplCodepoints0 && $cc.$mayContainSupplCodepoints0)
        $this.$mayContainSupplCodepoints0 = 1;
    if ($this.$invertedSurrogates) {
        if (!$cc.$altSurrogates)
            $this.$lowHighSurrogates.$andNot($cc.$getLowHighSurrogates());
        else
            $this.$lowHighSurrogates.$and($cc.$getLowHighSurrogates());
    } else if (!$cc.$altSurrogates)
        $this.$lowHighSurrogates.$or($cc.$getLowHighSurrogates());
    else {
        $this.$lowHighSurrogates.$xor($cc.$getLowHighSurrogates());
        $this.$lowHighSurrogates.$and($cc.$getLowHighSurrogates());
        $this.$altSurrogates = $this.$altSurrogates ? 0 : 1;
        $this.$invertedSurrogates = 1;
    }
    if (!$this.$hideBits && $cc.$getBits() !== null) {
        if ($this.$inverted) {
            if (!$cc.$isNegative())
                $this.$bits.$andNot($cc.$getBits());
            else
                $this.$bits.$and($cc.$getBits());
        } else if (!$cc.$isNegative())
            $this.$bits.$or($cc.$getBits());
        else {
            $this.$bits.$xor($cc.$getBits());
            $this.$bits.$and($cc.$getBits());
            $this.$alt = $this.$alt ? 0 : 1;
            $this.$inverted = 1;
        }
    } else {
        $curAlt = $this.$alt;
        if ($this.$nonBitSet !== null) {
            $nb = $this.$nonBitSet;
            if (!$curAlt)
                $this.$nonBitSet = jur_CharClass$5__init_0($this, $curAlt, $nb, $cc);
            else
                $this.$nonBitSet = jur_CharClass$4__init_0($this, $curAlt, $nb, $cc);
        } else {
            if ($curAlt && !$this.$inverted && $this.$bits.$isEmpty())
                $this.$nonBitSet = jur_CharClass$1__init_0($this, $cc);
            else if (!$curAlt)
                $this.$nonBitSet = jur_CharClass$3__init_0($this, $curAlt, $cc);
            else
                $this.$nonBitSet = jur_CharClass$2__init_0($this, $curAlt, $cc);
            $this.$hideBits = 1;
        }
    }
    return $this;
},
jur_CharClass_add0 = ($this, $i, $end) => {
    if ($i > $end)
        $rt_throw(jl_IllegalArgumentException__init_());
    a: {
        b: {
            if (!$this.$ci) {
                if ($end < 55296)
                    break b;
                if ($i > 57343)
                    break b;
            }
            while (true) {
                if ($i >= ($end + 1 | 0))
                    break a;
                $this.$add0($i);
                $i = $i + 1 | 0;
            }
        }
        if ($this.$inverted)
            $this.$bits.$clear2($i, $end + 1 | 0);
        else
            $this.$bits.$set($i, $end + 1 | 0);
    }
    return $this;
},
jur_CharClass_union = ($this, $clazz) => {
    let $curAlt, $nb;
    if (!$this.$mayContainSupplCodepoints0 && $clazz.$mayContainSupplCodepoints0)
        $this.$mayContainSupplCodepoints0 = 1;
    if ($clazz.$hasUCI())
        $this.$hasUCI0 = 1;
    if (!($this.$altSurrogates ^ $clazz.$altSurrogates)) {
        if (!$this.$altSurrogates)
            $this.$lowHighSurrogates.$or($clazz.$getLowHighSurrogates());
        else
            $this.$lowHighSurrogates.$and($clazz.$getLowHighSurrogates());
    } else if ($this.$altSurrogates)
        $this.$lowHighSurrogates.$andNot($clazz.$getLowHighSurrogates());
    else {
        $this.$lowHighSurrogates.$xor($clazz.$getLowHighSurrogates());
        $this.$lowHighSurrogates.$and($clazz.$getLowHighSurrogates());
        $this.$altSurrogates = 1;
    }
    if (!$this.$hideBits && $clazz.$getBits() !== null) {
        if (!($this.$alt ^ $clazz.$isNegative())) {
            if (!$this.$alt)
                $this.$bits.$or($clazz.$getBits());
            else
                $this.$bits.$and($clazz.$getBits());
        } else if ($this.$alt)
            $this.$bits.$andNot($clazz.$getBits());
        else {
            $this.$bits.$xor($clazz.$getBits());
            $this.$bits.$and($clazz.$getBits());
            $this.$alt = 1;
        }
    } else {
        $curAlt = $this.$alt;
        if ($this.$nonBitSet !== null) {
            $nb = $this.$nonBitSet;
            if (!$curAlt)
                $this.$nonBitSet = jur_CharClass$11__init_0($this, $curAlt, $nb, $clazz);
            else
                $this.$nonBitSet = jur_CharClass$10__init_0($this, $curAlt, $nb, $clazz);
        } else {
            if (!$this.$inverted && $this.$bits.$isEmpty()) {
                if (!$curAlt)
                    $this.$nonBitSet = jur_CharClass$7__init_0($this, $clazz);
                else
                    $this.$nonBitSet = jur_CharClass$6__init_0($this, $clazz);
            } else if (!$curAlt)
                $this.$nonBitSet = jur_CharClass$9__init_0($this, $clazz, $curAlt);
            else
                $this.$nonBitSet = jur_CharClass$8__init_0($this, $clazz, $curAlt);
            $this.$hideBits = 1;
        }
    }
},
jur_CharClass_intersection = ($this, $clazz) => {
    let $curAlt, $nb;
    if (!$this.$mayContainSupplCodepoints0 && $clazz.$mayContainSupplCodepoints0)
        $this.$mayContainSupplCodepoints0 = 1;
    if ($clazz.$hasUCI())
        $this.$hasUCI0 = 1;
    if (!($this.$altSurrogates ^ $clazz.$altSurrogates)) {
        if (!$this.$altSurrogates)
            $this.$lowHighSurrogates.$and($clazz.$getLowHighSurrogates());
        else
            $this.$lowHighSurrogates.$or($clazz.$getLowHighSurrogates());
    } else if (!$this.$altSurrogates)
        $this.$lowHighSurrogates.$andNot($clazz.$getLowHighSurrogates());
    else {
        $this.$lowHighSurrogates.$xor($clazz.$getLowHighSurrogates());
        $this.$lowHighSurrogates.$and($clazz.$getLowHighSurrogates());
        $this.$altSurrogates = 0;
    }
    if (!$this.$hideBits && $clazz.$getBits() !== null) {
        if (!($this.$alt ^ $clazz.$isNegative())) {
            if (!$this.$alt)
                $this.$bits.$and($clazz.$getBits());
            else
                $this.$bits.$or($clazz.$getBits());
        } else if (!$this.$alt)
            $this.$bits.$andNot($clazz.$getBits());
        else {
            $this.$bits.$xor($clazz.$getBits());
            $this.$bits.$and($clazz.$getBits());
            $this.$alt = 0;
        }
    } else {
        $curAlt = $this.$alt;
        if ($this.$nonBitSet !== null) {
            $nb = $this.$nonBitSet;
            if (!$curAlt)
                $this.$nonBitSet = jur_CharClass$17__init_0($this, $curAlt, $nb, $clazz);
            else
                $this.$nonBitSet = jur_CharClass$16__init_0($this, $curAlt, $nb, $clazz);
        } else {
            if (!$this.$inverted && $this.$bits.$isEmpty()) {
                if (!$curAlt)
                    $this.$nonBitSet = jur_CharClass$13__init_0($this, $clazz);
                else
                    $this.$nonBitSet = jur_CharClass$12__init_0($this, $clazz);
            } else if (!$curAlt)
                $this.$nonBitSet = jur_CharClass$15__init_0($this, $clazz, $curAlt);
            else
                $this.$nonBitSet = jur_CharClass$14__init_0($this, $clazz, $curAlt);
            $this.$hideBits = 1;
        }
    }
},
jur_CharClass_contains = ($this, $ch) => {
    if ($this.$nonBitSet !== null)
        return $this.$alt ^ $this.$nonBitSet.$contains($ch);
    return $this.$alt ^ $this.$bits.$get6($ch);
},
jur_CharClass_getBits = $this => {
    if (!$this.$hideBits)
        return $this.$bits;
    return null;
},
jur_CharClass_getLowHighSurrogates = $this => {
    return $this.$lowHighSurrogates;
},
jur_CharClass_getInstance = $this => {
    let $bs, $res;
    if ($this.$nonBitSet !== null)
        return $this;
    $bs = $this.$getBits();
    $res = jur_CharClass$18__init_0($this, $bs);
    return $res.$setNegative($this.$isNegative());
},
jur_CharClass_toString = $this => {
    let $temp, $i;
    $temp = jl_StringBuilder__init_();
    $i = $this.$bits.$nextSetBit(0);
    while ($i >= 0) {
        $temp.$append10(jl_Character_toChars($i));
        $temp.$append0(124);
        $i = $this.$bits.$nextSetBit($i + 1 | 0);
    }
    if ($temp.$length() > 0)
        $temp.$deleteCharAt($temp.$length() - 1 | 0);
    return $temp.$toString();
},
jur_CharClass_hasUCI = $this => {
    return $this.$hasUCI0;
},
jn_BufferUnderflowException = $rt_classWithoutFields(jl_RuntimeException),
jn_BufferUnderflowException__init_ = $this => {
    jl_RuntimeException__init_($this);
},
jn_BufferUnderflowException__init_0 = () => {
    let var_0 = new jn_BufferUnderflowException();
    jn_BufferUnderflowException__init_(var_0);
    return var_0;
};
function otcit_FloatAnalyzer$Result() {
    let a = this; jl_Object.call(a);
    a.$mantissa0 = 0;
    a.$exponent0 = 0;
    a.$sign1 = 0;
}
let otcit_FloatAnalyzer$Result__init_ = $this => {
    jl_Object__init_($this);
},
otcit_FloatAnalyzer$Result__init_0 = () => {
    let var_0 = new otcit_FloatAnalyzer$Result();
    otcit_FloatAnalyzer$Result__init_(var_0);
    return var_0;
},
jur_UCIDecomposedCharSet = $rt_classWithoutFields(jur_DecomposedCharSet),
jur_UCIDecomposedCharSet__init_ = ($this, $decomp, $decomposedCharLength) => {
    jur_DecomposedCharSet__init_($this, $decomp, $decomposedCharLength);
},
jur_UCIDecomposedCharSet__init_0 = (var_0, var_1) => {
    let var_2 = new jur_UCIDecomposedCharSet();
    jur_UCIDecomposedCharSet__init_(var_2, var_0, var_1);
    return var_2;
},
jn_FloatBuffer = $rt_classWithoutFields(jn_Buffer),
jn_FloatBuffer__init_ = ($this, $position, $limit) => {
    jn_Buffer__init_($this);
    $this.$position3 = $position;
    $this.$limit = $limit;
},
jn_FloatBuffer_allocate = $capacity => {
    let $array, var$3, var$4;
    if ($capacity >= 0) {
        $array = $rt_createFloatArray($capacity);
        return jn_FloatBufferOverTypedArray__init_(0, $capacity, 0, $array.data, $array);
    }
    var$3 = new jl_IllegalArgumentException;
    var$4 = jl_StringBuilder__init_();
    jl_StringBuilder_append0(jl_StringBuilder_append(var$4, $rt_s(370)), $capacity);
    jl_IllegalArgumentException__init_0(var$3, jl_StringBuilder_toString(var$4));
    $rt_throw(var$3);
},
jn_FloatBuffer_put0 = ($this, $src, $offset, $length) => {
    if ($this.$isReadOnly())
        $rt_throw(jn_ReadOnlyBufferException__init_());
    if (jn_Buffer_remaining($this) < $length)
        $rt_throw(jn_BufferOverflowException__init_());
    if ($length >= 0 && $offset >= 0 && ($offset + $length | 0) <= $src.data.length) {
        $this.$putImpl2($this.$position3, $src, $offset, $length);
        $this.$position3 = $this.$position3 + $length | 0;
        return $this;
    }
    $rt_throw(jl_IndexOutOfBoundsException__init_());
},
jn_FloatBuffer_put = ($this, $src) => {
    return $this.$put0($src, 0, $src.data.length);
},
jn_FloatBuffer_clear = $this => {
    jn_Buffer_clear($this);
    return $this;
},
jn_FloatBuffer_flip = $this => {
    jn_Buffer_flip($this);
    return $this;
},
jn_FloatBuffer_position = ($this, $newPosition) => {
    jn_Buffer_position0($this, $newPosition);
    return $this;
},
jn_FloatBuffer_flip0 = $this => {
    return jn_FloatBuffer_flip($this);
},
jn_FloatBuffer_clear0 = $this => {
    return jn_FloatBuffer_clear($this);
},
jn_FloatBuffer_position0 = ($this, var$1) => {
    return $this.$position2(var$1);
},
jn_FloatBufferImpl = $rt_classWithoutFields(jn_FloatBuffer),
jn_FloatBufferImpl__init_ = ($this, $position, $limit) => {
    jn_FloatBuffer__init_($this, $position, $limit);
},
jn_FloatBufferImpl_duplicate = $this => {
    return $this.$duplicate4(0, jn_Buffer_capacity($this), $this.$position3, $this.$limit, $this.$isReadOnly());
},
jn_FloatBufferImpl_get = $this => {
    let var$1;
    if ($this.$position3 >= $this.$limit)
        $rt_throw(jn_BufferUnderflowException__init_0());
    var$1 = $this.$position3;
    $this.$position3 = var$1 + 1 | 0;
    return $this.$getElement1(var$1);
},
jn_FloatBufferImpl_isReadOnly = $this => {
    return $this.$readOnly();
},
otrr_ClassInfo = $rt_classWithoutFields(otrr_ReflectionInfo),
otrr_ClassInfo_newArrayInstance = (var$0, var$1) => {
    switch (var$0.primitiveKind) {
        default: return $rt_createArray(var$0, var$1);
    }
};
function otrfm_InMemoryVirtualFileSystem() {
    let a = this; jl_Object.call(a);
    a.$root = null;
    a.$userDir = null;
}
let otrfm_InMemoryVirtualFileSystem__init_ = var$0 => {
    jl_Object__init_(var$0);
    var$0.$root = otrfm_InMemoryVirtualDirectory__init_0($rt_s(13));
    var$0.$userDir = $rt_s(371);
},
otrfm_InMemoryVirtualFileSystem__init_0 = () => {
    let var_0 = new otrfm_InMemoryVirtualFileSystem();
    otrfm_InMemoryVirtualFileSystem__init_(var_0);
    return var_0;
},
otrfm_InMemoryVirtualFileSystem_isWindows = $this => {
    return 0;
};
function ccrg_ak() {
    let a = this; jl_Thread.call(a);
    a.$b8 = 0;
    a.$c1 = Long_ZERO;
}
let ccrg_ak_a = 0,
ccrg_ak_$callClinit = () => {
    ccrg_ak_$callClinit = $rt_eraseClinit(ccrg_ak);
    ccrg_ak__clinit_();
},
ccrg_ak__clinit_ = () => {
    ccrg_ak_a = 0;
},
ccrg_ak__init_ = var$0 => {
    ccrg_ak_$callClinit();
    jl_Thread__init_(var$0, ((jl_StringBuilder__init_0($rt_s(372))).$append2(ccrg_ak_a)).$toString());
    var$0.$b8 = 1;
    ccrg_ak_a = ccrg_ak_a + 1 | 0;
},
ccrg_ak__init_0 = () => {
    let var_0 = new ccrg_ak();
    ccrg_ak__init_(var_0);
    return var_0;
},
ccrg_ak_run = var$0 => {
    let var$1, var$2, var$3, var$4, $$je, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        let $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$4 = $thread.pop();var$3 = $thread.pop();var$2 = $thread.pop();var$1 = $thread.pop();var$0 = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        ccrg_k_W();
        if (!ccrg_k_aR)
            ao_Process_setThreadPriority((-4));
        var$0.$c1 = jl_System_currentTimeMillis();
        var$1 = ccrg_k_t();
        a: while (var$0.$b8) {
            var$2 = jl_System_nanoTime();
            var$3 = var$0.$c1;
            var$0.$c1 = jl_System_currentTimeMillis();
            var$1.$a12(Long_toNumber(Long_sub(var$0.$c1, var$3)) * 0.06000000238418579, Long_lo(Long_sub(var$0.$c1, var$3)));
            var$2 = Long_fromInt(jl_Math_round(Long_toNumber(Long_sub(var$1.$bN.$batterySaving ? Long_fromInt(32258064) : !var$1.$bN.$highRefreshRate ? Long_fromInt(16393442) : Long_fromInt(3333333), Long_sub(jl_System_nanoTime(), var$2)))));
            if (Long_le(var$2, Long_ZERO))
                continue;
            var$3 = jl_System_nanoTime();
            while (true) {
                var$4 = Long_sub(jl_System_nanoTime(), var$3);
                if (Long_gt(var$4, var$2))
                    continue a;
                if (Long_lt(var$4, Long_ZERO))
                    continue a;
                var$4 = Long_fromNumber(Long_toNumber(Long_sub(var$2, var$4)) / 1000000.0);
                if (Long_le(var$4, Long_fromInt(1)))
                    continue a;
                try {
                    $ptr = 1;
                    continue main;
                } catch ($$e) {
                    $$je = $rt_wrapException($$e);
                    if ($$je instanceof jl_Exception) {
                    } else {
                        throw $$e;
                    }
                }
            }
        }
        return;
    case 1:
        b: {
            try {
                jl_Thread_sleep(var$4);
                if ($rt_suspending()) {
                    break main;
                }
                break b;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                if ($$je instanceof jl_Exception) {
                    break b;
                } else {
                    throw $$e;
                }
            }
        }
        c: while (true) {
            var$4 = Long_sub(jl_System_nanoTime(), var$3);
            if (Long_le(var$4, var$2) && Long_ge(var$4, Long_ZERO)) {
                var$4 = Long_fromNumber(Long_toNumber(Long_sub(var$2, var$4)) / 1000000.0);
                if (Long_gt(var$4, Long_fromInt(1))) {
                    try {
                        continue main;
                    } catch ($$e) {
                        $$je = $rt_wrapException($$e);
                        if ($$je instanceof jl_Exception) {
                        } else {
                            throw $$e;
                        }
                    }
                    continue;
                }
            }
            while (true) {
                if (!var$0.$b8)
                    break c;
                var$2 = jl_System_nanoTime();
                var$3 = var$0.$c1;
                var$0.$c1 = jl_System_currentTimeMillis();
                var$1.$a12(Long_toNumber(Long_sub(var$0.$c1, var$3)) * 0.06000000238418579, Long_lo(Long_sub(var$0.$c1, var$3)));
                var$2 = Long_fromInt(jl_Math_round(Long_toNumber(Long_sub(var$1.$bN.$batterySaving ? Long_fromInt(32258064) : !var$1.$bN.$highRefreshRate ? Long_fromInt(16393442) : Long_fromInt(3333333), Long_sub(jl_System_nanoTime(), var$2)))));
                if (Long_le(var$2, Long_ZERO))
                    continue;
                else
                    break;
            }
            var$3 = jl_System_nanoTime();
        }
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push(var$0, var$1, var$2, var$3, var$4, $ptr);
};
function jur_AbstractCharClass$LazyJavaWhitespace$1() {
    jur_AbstractCharClass.call(this);
    this.$this$026 = null;
}
let jur_AbstractCharClass$LazyJavaWhitespace$1__init_ = ($this, $this$0) => {
    $this.$this$026 = $this$0;
    jur_AbstractCharClass__init_($this);
},
jur_AbstractCharClass$LazyJavaWhitespace$1__init_0 = var_0 => {
    let var_1 = new jur_AbstractCharClass$LazyJavaWhitespace$1();
    jur_AbstractCharClass$LazyJavaWhitespace$1__init_(var_1, var_0);
    return var_1;
},
jur_AbstractCharClass$LazyJavaWhitespace$1_contains = ($this, $ch) => {
    return jl_Character_isWhitespace($ch);
},
jur_AbstractCharClass$LazyJavaJavaIdentifierStart = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyJavaJavaIdentifierStart__init_ = $this => {
    jur_AbstractCharClass$LazyCharClass__init_($this);
},
jur_AbstractCharClass$LazyJavaJavaIdentifierStart__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazyJavaJavaIdentifierStart();
    jur_AbstractCharClass$LazyJavaJavaIdentifierStart__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyJavaJavaIdentifierStart_computeValue = $this => {
    let $chCl;
    $chCl = jur_AbstractCharClass$LazyJavaJavaIdentifierStart$1__init_0($this);
    $chCl.$mayContainSupplCodepoints0 = 1;
    return $chCl;
},
ccrg_af = $rt_classWithoutFields(ccrg_x),
ccrg_af__init_ = var$0 => {
    ccrg_x__init_(var$0);
},
ccrg_af__init_0 = () => {
    let var_0 = new ccrg_af();
    ccrg_af__init_(var_0);
    return var_0;
},
ag_Paint$Align = $rt_classWithoutFields(jl_Enum),
ag_Paint$Align_LEFT = null,
ag_Paint$Align_CENTER = null,
ag_Paint$Align_RIGHT = null,
ag_Paint$Align_$VALUES = null,
ag_Paint$Align_$callClinit = () => {
    ag_Paint$Align_$callClinit = $rt_eraseClinit(ag_Paint$Align);
    ag_Paint$Align__clinit_();
},
ag_Paint$Align_values = () => {
    ag_Paint$Align_$callClinit();
    return ag_Paint$Align_$VALUES.$clone0();
},
ag_Paint$Align__init_0 = (var$0, var$1, var$2) => {
    ag_Paint$Align_$callClinit();
    jl_Enum__init_(var$0, var$1, var$2);
},
ag_Paint$Align__init_ = (var_0, var_1) => {
    let var_2 = new ag_Paint$Align();
    ag_Paint$Align__init_0(var_2, var_0, var_1);
    return var_2;
},
ag_Paint$Align_$values = () => {
    let var$1, var$2;
    ag_Paint$Align_$callClinit();
    var$1 = $rt_createArray(ag_Paint$Align, 3);
    var$2 = var$1.data;
    var$2[0] = ag_Paint$Align_LEFT;
    var$2[1] = ag_Paint$Align_CENTER;
    var$2[2] = ag_Paint$Align_RIGHT;
    return var$1;
},
ag_Paint$Align__clinit_ = () => {
    ag_Paint$Align_LEFT = ag_Paint$Align__init_($rt_s(373), 0);
    ag_Paint$Align_CENTER = ag_Paint$Align__init_($rt_s(374), 1);
    ag_Paint$Align_RIGHT = ag_Paint$Align__init_($rt_s(375), 2);
    ag_Paint$Align_$VALUES = ag_Paint$Align_$values();
},
jl_CloneNotSupportedException = $rt_classWithoutFields(jl_Exception),
jl_CloneNotSupportedException__init_ = $this => {
    jl_Exception__init_($this);
},
jl_CloneNotSupportedException__init_0 = () => {
    let var_0 = new jl_CloneNotSupportedException();
    jl_CloneNotSupportedException__init_(var_0);
    return var_0;
},
otjt_Uint8Array = $rt_classWithoutFields(otjt_TypedArray),
otcjn_TArrayBufferViewProvider = $rt_classWithoutFields(0),
jl_Long = $rt_classWithoutFields(jl_Number),
jl_Long_TYPE = null,
jl_Long_$callClinit = () => {
    jl_Long_$callClinit = $rt_eraseClinit(jl_Long);
    jl_Long__clinit_();
},
jl_Long_divideUnsigned = (var$1, var$2) => {
    return Long_udiv(var$1, var$2);
},
jl_Long_remainderUnsigned = (var$1, var$2) => {
    return Long_urem(var$1, var$2);
},
jl_Long_compareUnsigned = (var$1, var$2) => {
    return Long_ucompare(var$1, var$2);
},
jl_Long__clinit_ = () => {
    jl_Long_TYPE = $rt_cls($rt_longcls);
};
function jur_SequenceSet$IntHash() {
    let a = this; jl_Object.call(a);
    a.$table = null;
    a.$values3 = null;
    a.$mask = 0;
    a.$size2 = 0;
}
let jur_SequenceSet$IntHash__init_0 = ($this, $size) => {
    jl_Object__init_($this);
    while ($size >= $this.$mask) {
        $this.$mask = $this.$mask << 1 | 1;
    }
    $this.$mask = $this.$mask << 1 | 1;
    $this.$table = $rt_createIntArray($this.$mask + 1 | 0);
    $this.$values3 = $rt_createIntArray($this.$mask + 1 | 0);
    $this.$size2 = $size;
},
jur_SequenceSet$IntHash__init_ = var_0 => {
    let var_1 = new jur_SequenceSet$IntHash();
    jur_SequenceSet$IntHash__init_0(var_1, var_0);
    return var_1;
},
jur_SequenceSet$IntHash_put = ($this, $key, $value) => {
    let $i, $hashCode, var$5;
    $i = 0;
    $hashCode = $key & $this.$mask;
    while ($this.$table.data[$hashCode] && $this.$table.data[$hashCode] != $key) {
        var$5 = $i + 1 | 0;
        $i = var$5 & $this.$mask;
        var$5 = $hashCode + $i | 0;
        $hashCode = var$5 & $this.$mask;
    }
    $this.$table.data[$hashCode] = $key;
    $this.$values3.data[$hashCode] = $value;
},
jur_SequenceSet$IntHash_get = ($this, $key) => {
    let $hashCode, $i, $storedKey, var$5;
    $hashCode = $key & $this.$mask;
    $i = 0;
    while (true) {
        $storedKey = $this.$table.data[$hashCode];
        if (!$storedKey)
            break;
        if ($storedKey == $key)
            return $this.$values3.data[$hashCode];
        var$5 = $i + 1 | 0;
        $i = var$5 & $this.$mask;
        var$5 = $hashCode + $i | 0;
        $hashCode = var$5 & $this.$mask;
    }
    return $this.$size2;
},
jur_AbstractCharClass$LazyNonDigit = $rt_classWithoutFields(jur_AbstractCharClass$LazyDigit),
jur_AbstractCharClass$LazyNonDigit__init_ = $this => {
    jur_AbstractCharClass$LazyDigit__init_($this);
},
jur_AbstractCharClass$LazyNonDigit__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazyNonDigit();
    jur_AbstractCharClass$LazyNonDigit__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyNonDigit_computeValue = $this => {
    let $chCl;
    $chCl = (jur_AbstractCharClass$LazyDigit_computeValue($this)).$setNegative(1);
    $chCl.$mayContainSupplCodepoints0 = 1;
    return $chCl;
},
au_Log = $rt_classWithoutFields(),
au_Log_d = (var$1, var$2) => {
    return 0;
},
au_Log_e = (var$1, var$2) => {
    return 0;
},
au_Log_e0 = (var$1, var$2, var$3) => {
    return 0;
};
function jur_AbstractCharClass$1() {
    let a = this; jur_AbstractCharClass.call(a);
    a.$val$lHS = null;
    a.$this$025 = null;
}
let jur_AbstractCharClass$1__init_ = ($this, $this$0, var$2) => {
    $this.$this$025 = $this$0;
    $this.$val$lHS = var$2;
    jur_AbstractCharClass__init_($this);
},
jur_AbstractCharClass$1__init_0 = (var_0, var_1) => {
    let var_2 = new jur_AbstractCharClass$1();
    jur_AbstractCharClass$1__init_(var_2, var_0, var_1);
    return var_2;
},
jur_AbstractCharClass$1_contains = ($this, $ch) => {
    let $index;
    $index = $ch - 55296 | 0;
    return $index >= 0 && $index < 2048 ? $this.$altSurrogates ^ $this.$val$lHS.$get6($index) : 0;
};
function jur_AbstractCharClass$2() {
    let a = this; jur_AbstractCharClass.call(a);
    a.$val$lHS0 = null;
    a.$val$thisClass = null;
    a.$this$016 = null;
}
let jur_AbstractCharClass$2__init_ = ($this, $this$0, var$2, var$3) => {
    $this.$this$016 = $this$0;
    $this.$val$lHS0 = var$2;
    $this.$val$thisClass = var$3;
    jur_AbstractCharClass__init_($this);
},
jur_AbstractCharClass$2__init_0 = (var_0, var_1, var_2) => {
    let var_3 = new jur_AbstractCharClass$2();
    jur_AbstractCharClass$2__init_(var_3, var_0, var_1, var_2);
    return var_3;
},
jur_AbstractCharClass$2_contains = ($this, $ch) => {
    let $index, $containslHS;
    $index = $ch - 55296 | 0;
    $containslHS = $index >= 0 && $index < 2048 ? $this.$altSurrogates ^ $this.$val$lHS0.$get6($index) : 0;
    return $this.$val$thisClass.$contains($ch) && !$containslHS ? 1 : 0;
},
jur_AbstractCharClass$LazyJavaLowerCase = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyJavaLowerCase__init_ = $this => {
    jur_AbstractCharClass$LazyCharClass__init_($this);
},
jur_AbstractCharClass$LazyJavaLowerCase__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazyJavaLowerCase();
    jur_AbstractCharClass$LazyJavaLowerCase__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyJavaLowerCase_computeValue = $this => {
    let $chCl;
    $chCl = jur_AbstractCharClass$LazyJavaLowerCase$1__init_0($this);
    $chCl.$mayContainSupplCodepoints0 = 1;
    return $chCl;
},
jur_PossessiveCompositeQuantifierSet = $rt_classWithoutFields(jur_CompositeQuantifierSet),
jur_PossessiveCompositeQuantifierSet__init_ = ($this, $quant, $innerSet, $next, $type) => {
    jur_CompositeQuantifierSet__init_($this, $quant, $innerSet, $next, $type);
},
jur_PossessiveCompositeQuantifierSet__init_0 = (var_0, var_1, var_2, var_3) => {
    let var_4 = new jur_PossessiveCompositeQuantifierSet();
    jur_PossessiveCompositeQuantifierSet__init_(var_4, var_0, var_1, var_2, var_3);
    return var_4;
},
jur_PossessiveCompositeQuantifierSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $min, $max, $i, $shift;
    $min = $this.$quantifier.$min0();
    $max = $this.$quantifier.$max1();
    $i = 0;
    while (true) {
        if ($i >= $min) {
            a: {
                while (true) {
                    if ($i >= $max)
                        break a;
                    if (($stringIndex + $this.$leaf.$charCount() | 0) > $matchResult.$getRightBound())
                        break a;
                    $shift = $this.$leaf.$accepts($stringIndex, $testString);
                    if ($shift < 1)
                        break;
                    $stringIndex = $stringIndex + $shift | 0;
                    $i = $i + 1 | 0;
                }
            }
            return $this.$next1.$matches($stringIndex, $testString, $matchResult);
        }
        if (($stringIndex + $this.$leaf.$charCount() | 0) > $matchResult.$getRightBound()) {
            $matchResult.$hitEnd = 1;
            return (-1);
        }
        $shift = $this.$leaf.$accepts($stringIndex, $testString);
        if ($shift < 1)
            break;
        $stringIndex = $stringIndex + $shift | 0;
        $i = $i + 1 | 0;
    }
    return (-1);
};
function jur_AbstractCharClass$LazyJavaLetterOrDigit$1() {
    jur_AbstractCharClass.call(this);
    this.$this$027 = null;
}
let jur_AbstractCharClass$LazyJavaLetterOrDigit$1__init_ = ($this, $this$0) => {
    $this.$this$027 = $this$0;
    jur_AbstractCharClass__init_($this);
},
jur_AbstractCharClass$LazyJavaLetterOrDigit$1__init_0 = var_0 => {
    let var_1 = new jur_AbstractCharClass$LazyJavaLetterOrDigit$1();
    jur_AbstractCharClass$LazyJavaLetterOrDigit$1__init_(var_1, var_0);
    return var_1;
},
jur_AbstractCharClass$LazyJavaLetterOrDigit$1_contains = ($this, $ch) => {
    return jl_Character_isLetterOrDigit($ch);
};
function jur_CharClass$18() {
    let a = this; jur_AbstractCharClass.call(a);
    a.$val$bs = null;
    a.$this$010 = null;
}
let jur_CharClass$18__init_ = ($this, $this$0, var$2) => {
    $this.$this$010 = $this$0;
    $this.$val$bs = var$2;
    jur_AbstractCharClass__init_($this);
},
jur_CharClass$18__init_0 = (var_0, var_1) => {
    let var_2 = new jur_CharClass$18();
    jur_CharClass$18__init_(var_2, var_0, var_1);
    return var_2;
},
jur_CharClass$18_contains = ($this, $ch) => {
    return $this.$alt ^ $this.$val$bs.$get6($ch);
},
jur_CharClass$18_toString = $this => {
    let $temp, $i;
    $temp = jl_StringBuilder__init_();
    $i = $this.$val$bs.$nextSetBit(0);
    while ($i >= 0) {
        $temp.$append10(jl_Character_toChars($i));
        $temp.$append0(124);
        $i = $this.$val$bs.$nextSetBit($i + 1 | 0);
    }
    if ($temp.$length() > 0)
        $temp.$deleteCharAt($temp.$length() - 1 | 0);
    return $temp.$toString();
},
jur_PossessiveGroupQuantifierSet = $rt_classWithoutFields(jur_GroupQuantifierSet),
jur_PossessiveGroupQuantifierSet__init_ = ($this, $innerSet, $next, $type) => {
    jur_GroupQuantifierSet__init_($this, $innerSet, $next, $type);
    jur_FSet_$callClinit();
    $innerSet.$setNext(jur_FSet_posFSet);
},
jur_PossessiveGroupQuantifierSet__init_0 = (var_0, var_1, var_2) => {
    let var_3 = new jur_PossessiveGroupQuantifierSet();
    jur_PossessiveGroupQuantifierSet__init_(var_3, var_0, var_1, var_2);
    return var_3;
},
jur_PossessiveGroupQuantifierSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $stringIndex_0;
    while (true) {
        $stringIndex_0 = $this.$innerSet.$matches($stringIndex, $testString, $matchResult);
        if ($stringIndex_0 <= 0)
            break;
        $stringIndex = $stringIndex_0;
    }
    return $this.$next1.$matches($stringIndex, $testString, $matchResult);
};
function jur_CharClass$13() {
    let a = this; jur_AbstractCharClass.call(a);
    a.$val$clazz4 = null;
    a.$this$020 = null;
}
let jur_CharClass$13__init_ = ($this, $this$0, var$2) => {
    $this.$this$020 = $this$0;
    $this.$val$clazz4 = var$2;
    jur_AbstractCharClass__init_($this);
},
jur_CharClass$13__init_0 = (var_0, var_1) => {
    let var_2 = new jur_CharClass$13();
    jur_CharClass$13__init_(var_2, var_0, var_1);
    return var_2;
},
jur_CharClass$13_contains = ($this, $ch) => {
    return $this.$val$clazz4.$contains($ch);
};
function jur_CharClass$12() {
    let a = this; jur_AbstractCharClass.call(a);
    a.$val$clazz5 = null;
    a.$this$030 = null;
}
let jur_CharClass$12__init_ = ($this, $this$0, var$2) => {
    $this.$this$030 = $this$0;
    $this.$val$clazz5 = var$2;
    jur_AbstractCharClass__init_($this);
},
jur_CharClass$12__init_0 = (var_0, var_1) => {
    let var_2 = new jur_CharClass$12();
    jur_CharClass$12__init_(var_2, var_0, var_1);
    return var_2;
},
jur_CharClass$12_contains = ($this, $ch) => {
    return $this.$val$clazz5.$contains($ch) ? 0 : 1;
};
function jur_CharClass$11() {
    let a = this; jur_AbstractCharClass.call(a);
    a.$val$curAlt4 = 0;
    a.$val$nb2 = null;
    a.$val$clazz8 = null;
    a.$this$011 = null;
}
let jur_CharClass$11__init_ = ($this, $this$0, var$2, var$3, var$4) => {
    $this.$this$011 = $this$0;
    $this.$val$curAlt4 = var$2;
    $this.$val$nb2 = var$3;
    $this.$val$clazz8 = var$4;
    jur_AbstractCharClass__init_($this);
},
jur_CharClass$11__init_0 = (var_0, var_1, var_2, var_3) => {
    let var_4 = new jur_CharClass$11();
    jur_CharClass$11__init_(var_4, var_0, var_1, var_2, var_3);
    return var_4;
},
jur_CharClass$11_contains = ($this, $ch) => {
    return !($this.$val$curAlt4 ^ $this.$val$nb2.$contains($ch)) && !$this.$val$clazz8.$contains($ch) ? 0 : 1;
},
otci_Base46 = $rt_classWithoutFields(),
otci_Base46_decodeUnsigned = $seq => {
    let $number, $pos, var$4, var$5, $digit, $hasMore;
    $number = 0;
    $pos = 1;
    while (true) {
        var$4 = $seq.$characters.data;
        var$5 = $seq.$pointer;
        $seq.$pointer = var$5 + 1 | 0;
        $digit = otci_Base46_decodeDigit(var$4[var$5]);
        $hasMore = ($digit % 2 | 0) != 1 ? 0 : 1;
        $number = $number + $rt_imul($pos, $digit / 2 | 0) | 0;
        $pos = $pos * 46 | 0;
        if (!$hasMore)
            break;
    }
    return $number;
},
otci_Base46_decode = $seq => {
    let $number, $result;
    $number = otci_Base46_decodeUnsigned($seq);
    $result = $number / 2 | 0;
    if ($number % 2 | 0)
        $result =  -$result | 0;
    return $result;
},
otci_Base46_decodeDigit = $c => {
    if ($c < 34)
        return $c - 32 | 0;
    if ($c >= 92)
        return ($c - 32 | 0) - 2 | 0;
    return ($c - 32 | 0) - 1 | 0;
};
function jur_CharClass$10() {
    let a = this; jur_AbstractCharClass.call(a);
    a.$val$curAlt6 = 0;
    a.$val$nb0 = null;
    a.$val$clazz0 = null;
    a.$this$018 = null;
}
let jur_CharClass$10__init_ = ($this, $this$0, var$2, var$3, var$4) => {
    $this.$this$018 = $this$0;
    $this.$val$curAlt6 = var$2;
    $this.$val$nb0 = var$3;
    $this.$val$clazz0 = var$4;
    jur_AbstractCharClass__init_($this);
},
jur_CharClass$10__init_0 = (var_0, var_1, var_2, var_3) => {
    let var_4 = new jur_CharClass$10();
    jur_CharClass$10__init_(var_4, var_0, var_1, var_2, var_3);
    return var_4;
},
jur_CharClass$10_contains = ($this, $ch) => {
    return !($this.$val$curAlt6 ^ $this.$val$nb0.$contains($ch)) && !$this.$val$clazz0.$contains($ch) ? 1 : 0;
};
function jur_CharClass$17() {
    let a = this; jur_AbstractCharClass.call(a);
    a.$val$curAlt5 = 0;
    a.$val$nb1 = null;
    a.$val$clazz10 = null;
    a.$this$015 = null;
}
let jur_CharClass$17__init_ = ($this, $this$0, var$2, var$3, var$4) => {
    $this.$this$015 = $this$0;
    $this.$val$curAlt5 = var$2;
    $this.$val$nb1 = var$3;
    $this.$val$clazz10 = var$4;
    jur_AbstractCharClass__init_($this);
},
jur_CharClass$17__init_0 = (var_0, var_1, var_2, var_3) => {
    let var_4 = new jur_CharClass$17();
    jur_CharClass$17__init_(var_4, var_0, var_1, var_2, var_3);
    return var_4;
},
jur_CharClass$17_contains = ($this, $ch) => {
    return $this.$val$curAlt5 ^ $this.$val$nb1.$contains($ch) && $this.$val$clazz10.$contains($ch) ? 1 : 0;
};
function jur_UCISequenceSet() {
    jur_LeafSet.call(this);
    this.$string2 = null;
}
let jur_UCISequenceSet__init_ = ($this, $substring) => {
    let $res, $i;
    jur_LeafSet__init_($this);
    $res = jl_StringBuilder__init_();
    $i = 0;
    while ($i < $substring.$length()) {
        $res.$append0(jl_Character_toLowerCase(jl_Character_toUpperCase($substring.$charAt($i))));
        $i = $i + 1 | 0;
    }
    $this.$string2 = $res.$toString();
    $this.$charCount0 = $res.$length();
},
jur_UCISequenceSet__init_0 = var_0 => {
    let var_1 = new jur_UCISequenceSet();
    jur_UCISequenceSet__init_(var_1, var_0);
    return var_1;
},
jur_UCISequenceSet_accepts = ($this, $strIndex, $testString) => {
    let $i;
    $i = 0;
    while (true) {
        if ($i >= $this.$string2.$length())
            return $this.$string2.$length();
        if ($this.$string2.$charAt($i) != jl_Character_toLowerCase(jl_Character_toUpperCase($testString.$charAt($strIndex + $i | 0))))
            break;
        $i = $i + 1 | 0;
    }
    return (-1);
};
function jur_CharClass$16() {
    let a = this; jur_AbstractCharClass.call(a);
    a.$val$curAlt3 = 0;
    a.$val$nb = null;
    a.$val$clazz3 = null;
    a.$this$022 = null;
}
let jur_CharClass$16__init_ = ($this, $this$0, var$2, var$3, var$4) => {
    $this.$this$022 = $this$0;
    $this.$val$curAlt3 = var$2;
    $this.$val$nb = var$3;
    $this.$val$clazz3 = var$4;
    jur_AbstractCharClass__init_($this);
},
jur_CharClass$16__init_0 = (var_0, var_1, var_2, var_3) => {
    let var_4 = new jur_CharClass$16();
    jur_CharClass$16__init_(var_4, var_0, var_1, var_2, var_3);
    return var_4;
},
jur_CharClass$16_contains = ($this, $ch) => {
    return $this.$val$curAlt3 ^ $this.$val$nb.$contains($ch) && $this.$val$clazz3.$contains($ch) ? 0 : 1;
};
function jur_CharClass$15() {
    let a = this; jur_AbstractCharClass.call(a);
    a.$val$clazz9 = null;
    a.$val$curAlt1 = 0;
    a.$this$05 = null;
}
let jur_CharClass$15__init_ = ($this, $this$0, var$2, var$3) => {
    $this.$this$05 = $this$0;
    $this.$val$clazz9 = var$2;
    $this.$val$curAlt1 = var$3;
    jur_AbstractCharClass__init_($this);
},
jur_CharClass$15__init_0 = (var_0, var_1, var_2) => {
    let var_3 = new jur_CharClass$15();
    jur_CharClass$15__init_(var_3, var_0, var_1, var_2);
    return var_3;
},
jur_CharClass$15_contains = ($this, $ch) => {
    return $this.$val$clazz9.$contains($ch) && $this.$val$curAlt1 ^ $this.$this$05.$bits.$get6($ch) ? 1 : 0;
};
function jur_AbstractCharClass$LazyJavaDefined$1() {
    jur_AbstractCharClass.call(this);
    this.$this$024 = null;
}
let jur_AbstractCharClass$LazyJavaDefined$1__init_ = ($this, $this$0) => {
    $this.$this$024 = $this$0;
    jur_AbstractCharClass__init_($this);
},
jur_AbstractCharClass$LazyJavaDefined$1__init_0 = var_0 => {
    let var_1 = new jur_AbstractCharClass$LazyJavaDefined$1();
    jur_AbstractCharClass$LazyJavaDefined$1__init_(var_1, var_0);
    return var_1;
},
jur_AbstractCharClass$LazyJavaDefined$1_contains = ($this, $ch) => {
    return jl_Character_isDefined($ch);
},
otjt_Int8Array = $rt_classWithoutFields(otjt_TypedArray);
function jur_CharClass$14() {
    let a = this; jur_AbstractCharClass.call(a);
    a.$val$clazz2 = null;
    a.$val$curAlt10 = 0;
    a.$this$03 = null;
}
let jur_CharClass$14__init_ = ($this, $this$0, var$2, var$3) => {
    $this.$this$03 = $this$0;
    $this.$val$clazz2 = var$2;
    $this.$val$curAlt10 = var$3;
    jur_AbstractCharClass__init_($this);
},
jur_CharClass$14__init_0 = (var_0, var_1, var_2) => {
    let var_3 = new jur_CharClass$14();
    jur_CharClass$14__init_(var_3, var_0, var_1, var_2);
    return var_3;
},
jur_CharClass$14_contains = ($this, $ch) => {
    return $this.$val$clazz2.$contains($ch) && $this.$val$curAlt10 ^ $this.$this$03.$bits.$get6($ch) ? 0 : 1;
},
ju_Map$Entry = $rt_classWithoutFields(0),
ju_WeakHashMap$Entry = $rt_classWithoutFields(jlr_WeakReference),
jl_StringBuilder = $rt_classWithoutFields(jl_AbstractStringBuilder),
jl_StringBuilder__init_4 = ($this, $capacity) => {
    jl_AbstractStringBuilder__init_($this, $capacity);
},
jl_StringBuilder__init_1 = var_0 => {
    let var_1 = new jl_StringBuilder();
    jl_StringBuilder__init_4(var_1, var_0);
    return var_1;
},
jl_StringBuilder__init_3 = $this => {
    jl_AbstractStringBuilder__init_0($this);
},
jl_StringBuilder__init_ = () => {
    let var_0 = new jl_StringBuilder();
    jl_StringBuilder__init_3(var_0);
    return var_0;
},
jl_StringBuilder__init_2 = ($this, $value) => {
    jl_AbstractStringBuilder__init_2($this, $value);
},
jl_StringBuilder__init_0 = var_0 => {
    let var_1 = new jl_StringBuilder();
    jl_StringBuilder__init_2(var_1, var_0);
    return var_1;
},
jl_StringBuilder_append = ($this, $obj) => {
    jl_AbstractStringBuilder_append8($this, $obj);
    return $this;
},
jl_StringBuilder_append6 = ($this, $string) => {
    jl_AbstractStringBuilder_append($this, $string);
    return $this;
},
jl_StringBuilder_append0 = ($this, $value) => {
    jl_AbstractStringBuilder_append3($this, $value);
    return $this;
},
jl_StringBuilder_append5 = ($this, $value) => {
    jl_AbstractStringBuilder_append7($this, $value);
    return $this;
},
jl_StringBuilder_append2 = ($this, $value) => {
    jl_AbstractStringBuilder_append5($this, $value);
    return $this;
},
jl_StringBuilder_append4 = ($this, $value) => {
    jl_AbstractStringBuilder_append6($this, $value);
    return $this;
},
jl_StringBuilder_append1 = ($this, $c) => {
    jl_AbstractStringBuilder_append2($this, $c);
    return $this;
},
jl_StringBuilder_append7 = ($this, $chars, $offset, $len) => {
    jl_AbstractStringBuilder_append1($this, $chars, $offset, $len);
    return $this;
},
jl_StringBuilder_append9 = ($this, $chars) => {
    jl_AbstractStringBuilder_append0($this, $chars);
    return $this;
},
jl_StringBuilder_append3 = ($this, $b) => {
    jl_AbstractStringBuilder_append4($this, $b);
    return $this;
},
jl_StringBuilder_insert7 = ($this, $target, $value) => {
    jl_AbstractStringBuilder_insert6($this, $target, $value);
    return $this;
},
jl_StringBuilder_insert6 = ($this, $target, $value) => {
    jl_AbstractStringBuilder_insert3($this, $target, $value);
    return $this;
},
jl_StringBuilder_insert9 = ($this, $target, $value) => {
    jl_AbstractStringBuilder_insert4($this, $target, $value);
    return $this;
},
jl_StringBuilder_insert4 = ($this, $index, $chars, $offset, $len) => {
    jl_AbstractStringBuilder_insert($this, $index, $chars, $offset, $len);
    return $this;
},
jl_StringBuilder_insert10 = ($this, $index, $obj) => {
    jl_AbstractStringBuilder_insert5($this, $index, $obj);
    return $this;
},
jl_StringBuilder_insert1 = ($this, $index, $b) => {
    jl_AbstractStringBuilder_insert2($this, $index, $b);
    return $this;
},
jl_StringBuilder_insert2 = ($this, $index, $c) => {
    jl_AbstractStringBuilder_insert1($this, $index, $c);
    return $this;
},
jl_StringBuilder_delete = ($this, $start, $end) => {
    jl_AbstractStringBuilder_delete($this, $start, $end);
    return $this;
},
jl_StringBuilder_deleteCharAt = ($this, $index) => {
    jl_AbstractStringBuilder_deleteCharAt($this, $index);
    return $this;
},
jl_StringBuilder_insert12 = ($this, $index, $string) => {
    jl_AbstractStringBuilder_insert0($this, $index, $string);
    return $this;
},
jl_StringBuilder_insert11 = ($this, var$1, var$2, var$3, var$4) => {
    return $this.$insert12(var$1, var$2, var$3, var$4);
},
jl_StringBuilder_append8 = ($this, var$1, var$2, var$3) => {
    return $this.$append22(var$1, var$2, var$3);
},
jl_StringBuilder_length = $this => {
    return jl_AbstractStringBuilder_length($this);
},
jl_StringBuilder_toString = $this => {
    return jl_AbstractStringBuilder_toString($this);
},
jl_StringBuilder_ensureCapacity = ($this, var$1) => {
    jl_AbstractStringBuilder_ensureCapacity($this, var$1);
},
jl_StringBuilder_insert13 = ($this, var$1, var$2) => {
    return $this.$insert13(var$1, var$2);
},
jl_StringBuilder_insert0 = ($this, var$1, var$2) => {
    return $this.$insert14(var$1, var$2);
},
jl_StringBuilder_insert = ($this, var$1, var$2) => {
    return $this.$insert15(var$1, var$2);
},
jl_StringBuilder_insert5 = ($this, var$1, var$2) => {
    return $this.$insert16(var$1, var$2);
},
jl_StringBuilder_insert8 = ($this, var$1, var$2) => {
    return $this.$insert17(var$1, var$2);
},
jl_StringBuilder_insert3 = ($this, var$1, var$2) => {
    return $this.$insert18(var$1, var$2);
},
jl_StringBuilder_insert14 = ($this, var$1, var$2) => {
    return $this.$insert19(var$1, var$2);
};
function otrfm_InMemoryVirtualDirectory() {
    otrfm_AbstractInMemoryVirtualFile.call(this);
    this.$children0 = null;
}
let otrfm_InMemoryVirtualDirectory__init_ = ($this, $name) => {
    otrfm_AbstractInMemoryVirtualFile__init_($this, $name);
    $this.$children0 = ju_LinkedHashMap__init_0();
},
otrfm_InMemoryVirtualDirectory__init_0 = var_0 => {
    let var_1 = new otrfm_InMemoryVirtualDirectory();
    otrfm_InMemoryVirtualDirectory__init_(var_1, var_0);
    return var_1;
};
function jur_CompositeRangeSet() {
    let a = this; jur_JointSet.call(a);
    a.$withoutSurrogates = null;
    a.$withSurrogates = null;
}
let jur_CompositeRangeSet__init_0 = ($this, $withoutSurrogates, $withSurrogates) => {
    jur_JointSet__init_($this);
    $this.$withoutSurrogates = $withoutSurrogates;
    $this.$withSurrogates = $withSurrogates;
},
jur_CompositeRangeSet__init_ = (var_0, var_1) => {
    let var_2 = new jur_CompositeRangeSet();
    jur_CompositeRangeSet__init_0(var_2, var_0, var_1);
    return var_2;
},
jur_CompositeRangeSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $shift;
    $shift = $this.$withoutSurrogates.$matches($stringIndex, $testString, $matchResult);
    if ($shift < 0)
        $shift = $this.$withSurrogates.$matches($stringIndex, $testString, $matchResult);
    if ($shift >= 0)
        return $shift;
    return (-1);
},
jur_CompositeRangeSet_setNext = ($this, $next) => {
    $this.$next1 = $next;
    $this.$withSurrogates.$setNext($next);
    $this.$withoutSurrogates.$setNext($next);
},
jur_CompositeRangeSet_hasConsumed = ($this, $matchResult) => {
    return 1;
},
jur_CompositeRangeSet_first = ($this, $set) => {
    return 1;
},
ju_ConcurrentModificationException = $rt_classWithoutFields(jl_RuntimeException),
ju_ConcurrentModificationException__init_ = $this => {
    jl_RuntimeException__init_($this);
},
ju_ConcurrentModificationException__init_0 = () => {
    let var_0 = new ju_ConcurrentModificationException();
    ju_ConcurrentModificationException__init_(var_0);
    return var_0;
},
ju_Hashtable$1 = $rt_classWithoutFields(),
ju_Hashtable$1__init_ = $this => {
    jl_Object__init_($this);
},
ju_Hashtable$1__init_0 = () => {
    let var_0 = new ju_Hashtable$1();
    ju_Hashtable$1__init_(var_0);
    return var_0;
},
ccrgb_m = $rt_classWithoutFields(0),
ccrgb_b = $rt_classWithoutFields(),
ccrgb_b__init_ = var$0 => {
    jl_Object__init_(var$0);
},
ccrgb_b__init_0 = () => {
    let var_0 = new ccrgb_b();
    ccrgb_b__init_(var_0);
    return var_0;
},
ccrgb_l = $rt_classWithoutFields(ccrgb_b),
ccrgb_l__init_ = var$0 => {
    ccrgb_b__init_(var$0);
},
ccrgb_l__init_0 = () => {
    let var_0 = new ccrgb_l();
    ccrgb_l__init_(var_0);
    return var_0;
},
ju_Hashtable$2 = $rt_classWithoutFields(),
ju_Hashtable$2__init_ = $this => {
    jl_Object__init_($this);
},
ju_Hashtable$2__init_0 = () => {
    let var_0 = new ju_Hashtable$2();
    ju_Hashtable$2__init_(var_0);
    return var_0;
};
function ju_MapEntry() {
    let a = this; jl_Object.call(a);
    a.$key = null;
    a.$value = null;
}
let ju_MapEntry__init_ = ($this, $theKey, $theValue) => {
    jl_Object__init_($this);
    $this.$key = $theKey;
    $this.$value = $theValue;
},
ju_MapEntry__init_0 = (var_0, var_1) => {
    let var_2 = new ju_MapEntry();
    ju_MapEntry__init_(var_2, var_0, var_1);
    return var_2;
};
function ju_Hashtable$Entry() {
    let a = this; ju_MapEntry.call(a);
    a.$next3 = null;
    a.$hashcode = 0;
}
let ju_Hashtable$Entry__init_ = ($this, $theKey, $theValue) => {
    ju_MapEntry__init_($this, $theKey, $theValue);
    $this.$hashcode = $theKey.$hashCode0();
},
ju_Hashtable$Entry__init_0 = (var_0, var_1) => {
    let var_2 = new ju_Hashtable$Entry();
    ju_Hashtable$Entry__init_(var_2, var_0, var_1);
    return var_2;
},
ju_Hashtable$Entry_getKeyHash = $this => {
    return $this.$key.$hashCode0();
},
ju_Hashtable$Entry_equalsKey = ($this, $aKey, $hash) => {
    return $this.$hashcode == $aKey.$hashCode0() && $this.$key.$equals($aKey) ? 1 : 0;
},
ccrgb_r = $rt_classWithoutFields(0),
ag_Paint$Join = $rt_classWithoutFields(jl_Enum),
ag_Paint$Join_MITER = null,
ag_Paint$Join_ROUND = null,
ag_Paint$Join_BEVEL = null,
ag_Paint$Join_$VALUES = null,
ag_Paint$Join_$callClinit = () => {
    ag_Paint$Join_$callClinit = $rt_eraseClinit(ag_Paint$Join);
    ag_Paint$Join__clinit_();
},
ag_Paint$Join_values = () => {
    ag_Paint$Join_$callClinit();
    return ag_Paint$Join_$VALUES.$clone0();
},
ag_Paint$Join__init_0 = (var$0, var$1, var$2) => {
    ag_Paint$Join_$callClinit();
    jl_Enum__init_(var$0, var$1, var$2);
},
ag_Paint$Join__init_ = (var_0, var_1) => {
    let var_2 = new ag_Paint$Join();
    ag_Paint$Join__init_0(var_2, var_0, var_1);
    return var_2;
},
ag_Paint$Join_$values = () => {
    let var$1, var$2;
    ag_Paint$Join_$callClinit();
    var$1 = $rt_createArray(ag_Paint$Join, 3);
    var$2 = var$1.data;
    var$2[0] = ag_Paint$Join_MITER;
    var$2[1] = ag_Paint$Join_ROUND;
    var$2[2] = ag_Paint$Join_BEVEL;
    return var$1;
},
ag_Paint$Join__clinit_ = () => {
    ag_Paint$Join_MITER = ag_Paint$Join__init_($rt_s(376), 0);
    ag_Paint$Join_ROUND = ag_Paint$Join__init_($rt_s(359), 1);
    ag_Paint$Join_BEVEL = ag_Paint$Join__init_($rt_s(377), 2);
    ag_Paint$Join_$VALUES = ag_Paint$Join_$values();
},
ccrgb_s = $rt_classWithoutFields(0),
ccrgb_p = $rt_classWithoutFields(0);
function ccrgb_x() {
    let a = this; jl_Object.call(a);
    a.$a29 = 0;
    a.$b4 = null;
    a.$c3 = 0;
}
let ccrgb_x__init_ = (var$0, var$1) => {
    jl_Object__init_(var$0);
    var$0.$a29 = (-1);
    var$0.$c3 = (-1);
    var$0.$b4 = var$1;
},
ccrgb_w = $rt_classWithoutFields(ccrgb_x),
ccrgb_w__init_0 = var$0 => {
    ccrgb_x__init_(var$0, $rt_s(13));
},
ccrgb_w__init_ = () => {
    let var_0 = new ccrgb_w();
    ccrgb_w__init_0(var_0);
    return var_0;
},
ccrgb_w_a = (var$0, var$1) => {
    return;
},
jur_FinalSet = $rt_classWithoutFields(jur_FSet),
jur_FinalSet__init_ = $this => {
    jur_FSet__init_($this, 0);
},
jur_FinalSet__init_0 = () => {
    let var_0 = new jur_FinalSet();
    jur_FinalSet__init_(var_0);
    return var_0;
},
jur_FinalSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    if ($matchResult.$mode() != 1 && $stringIndex != $matchResult.$getRightBound())
        return (-1);
    $matchResult.$setValid();
    $matchResult.$setEnd(0, $stringIndex);
    return $stringIndex;
};
function ccrgb_t() {
    let a = this; jl_Object.call(a);
    a.$A = 0;
    a.$B = 0;
    a.$C = 0;
    a.$D = null;
    a.$E = 0;
    a.$F = null;
    a.$L = null;
    a.$P = null;
    a.$T = null;
    a.$U = null;
    a.$V = null;
    a.$W0 = null;
    a.$X = 0;
    a.$Y = 0;
    a.$Z0 = 0;
    a.$ac = 0;
    a.$ad = 0;
    a.$ae = null;
    a.$af = null;
    a.$ag = null;
    a.$ah = 0;
    a.$ai = 0;
    a.$aj = 0;
    a.$ak = 0;
    a.$al = null;
    a.$am = null;
    a.$an = null;
    a.$ao = null;
    a.$ap = null;
    a.$aq = null;
    a.$ar = null;
    a.$as = null;
    a.$d5 = null;
    a.$g0 = null;
    a.$h2 = null;
    a.$i1 = null;
    a.$j1 = null;
    a.$k3 = null;
    a.$l0 = null;
    a.$n = 0;
    a.$o0 = 0;
    a.$p0 = null;
    a.$q0 = null;
    a.$r0 = null;
    a.$s = null;
    a.$t1 = null;
    a.$u = 0;
    a.$v = null;
    a.$w = null;
    a.$y = 0;
    a.$z = 0;
}
let ccrgb_t_J = 0,
ccrgb_t_K = 0,
ccrgb_t_Q = null,
ccrgb_t_R = null,
ccrgb_t_S = null,
ccrgb_t_m = null,
ccrgb_t_$callClinit = () => {
    ccrgb_t_$callClinit = $rt_eraseClinit(ccrgb_t);
    ccrgb_t__clinit_();
},
ccrgb_t__clinit_ = () => {
    ccrgb_t_Q = jl_Class_getSimpleName($rt_cls(ccrgb_t));
    ccrgb_t_R = $rt_createFloatArrayFromData([0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0]);
    ccrgb_t_S = $rt_createFloatArrayFromData([0.0, 0.0, 0.0, 1.0, 1.0, 1.0, 0.0, 1.0]);
    ccrgb_t_m = ccrgb_aa__init_0();
    ccrgb_t_J = 0;
    ccrgb_t_K = 0;
},
ccrgb_t__init_0 = (var$0, var$1) => {
    let var$2, var$3, var$4;
    ccrgb_t_$callClinit();
    jl_Object__init_(var$0);
    var$0.$T = ju_HashMap__init_();
    var$0.$U = ju_HashMap__init_();
    var$0.$V = ju_HashMap__init_();
    var$0.$W0 = $rt_createFloatArray(128);
    var$0.$X = 0;
    var$0.$Y = 0;
    var$0.$d5 = $rt_createFloatArray(16);
    var$2 = $rt_createArray(ccrgb_x, 6);
    var$3 = var$2.data;
    var$3[0] = ccrgb_u__init_($rt_s(259));
    var$3[1] = ccrgb_z__init_($rt_s(378));
    var$3[2] = ccrgb_z__init_($rt_s(379));
    var$3[3] = ccrgb_w__init_();
    var$3[4] = ccrgb_w__init_();
    var$3[5] = ccrgb_z__init_($rt_s(262));
    var$0.$g0 = var$2;
    var$2 = $rt_createArray(ccrgb_x, 6);
    var$3 = var$2.data;
    var$3[0] = ccrgb_u__init_($rt_s(259));
    var$3[1] = ccrgb_z__init_($rt_s(378));
    var$3[2] = ccrgb_z__init_($rt_s(380));
    var$3[3] = ccrgb_z__init_($rt_s(263));
    var$3[4] = ccrgb_z__init_($rt_s(379));
    var$3[5] = ccrgb_z__init_($rt_s(262));
    var$0.$h2 = var$2;
    var$2 = $rt_createArray(ccrgb_x, 6);
    var$3 = var$2.data;
    var$3[0] = ccrgb_u__init_($rt_s(259));
    var$3[1] = ccrgb_z__init_($rt_s(378));
    var$3[2] = ccrgb_z__init_($rt_s(380));
    var$3[3] = ccrgb_z__init_($rt_s(263));
    var$3[4] = ccrgb_z__init_($rt_s(379));
    var$3[5] = ccrgb_z__init_($rt_s(262));
    var$0.$i1 = var$2;
    var$2 = $rt_createArray(ccrgb_x, 6);
    var$3 = var$2.data;
    var$3[0] = ccrgb_u__init_($rt_s(259));
    var$3[1] = ccrgb_z__init_($rt_s(378));
    var$3[2] = ccrgb_u__init_($rt_s(381));
    var$3[3] = ccrgb_z__init_($rt_s(263));
    var$3[4] = ccrgb_z__init_($rt_s(379));
    var$3[5] = ccrgb_z__init_($rt_s(262));
    var$0.$j1 = var$2;
    var$0.$k3 = ccrgb_ae__init_0();
    var$0.$l0 = ccrgb_ae__init_0();
    var$0.$ah = 0;
    var$0.$ai = 0;
    var$0.$aj = 0;
    var$0.$ak = 0;
    var$0.$al = $rt_createIntArray(1);
    var$0.$am = ju_ArrayList__init_();
    var$0.$an = $rt_createFloatArray(32);
    var$0.$ao = $rt_createFloatArray(4);
    var$0.$ap = ag_RectF__init_();
    var$0.$aq = ag_RectF__init_();
    var$0.$ar = $rt_createFloatArray(16);
    var$0.$as = $rt_createIntArray(1);
    var$0.$s = $rt_createFloatArray(16);
    var$0.$t1 = ccrgb_y__init_();
    var$0.$u = 0;
    var$0.$v = ccrgu_p__init_();
    var$0.$w = ccrgu_p__init_();
    var$0.$y = (-1);
    var$0.$z = 0;
    var$0.$A = 0;
    var$0.$B = 0;
    var$0.$C = (-1);
    var$0.$D = null;
    var$0.$E = (-1);
    var$0.$F = ag_Paint__init_();
    var$0.$L = ccrgu_p__init_();
    var$0.$r0 = var$1;
    ao_Matrix_setIdentityM(var$0.$ar, 0);
    ao_Matrix_setIdentityM(var$0.$W0, var$0.$Y);
    var$0.$am.$add(null);
    ccrgu_p_add(var$0.$v, ccrgb_y__init_());
    var$2 = ccrgb_t_R;
    var$4 = var$2.data.length;
    var$1 = (jn_ByteBuffer_order(jn_ByteBuffer_allocateDirect(var$4 * 4 | 0), jn_ByteOrder_nativeOrder())).$asFloatBuffer();
    (var$1.$put0(var$2, 0, var$4)).$position0(0);
    ccrgb_t_m.$a13(var$0.$as);
    ccrgb_t_j();
    var$4 = var$0.$as.data[0];
    ao_GLES20_glBindBuffer(34962, var$4);
    ccrgb_t_j();
    ao_GLES20_glBufferData(34962, jn_Buffer_capacity(var$1) * 4 | 0, var$1, 35044);
    ccrgb_t_j();
    var$0.$ad = var$4;
    var$0.$Z0 = ccrgb_t_a4(ccrgb_t_a(35633, $rt_s(382)), ccrgb_t_a(35632, $rt_s(383)), var$0.$g0, var$0.$as);
    ccrgb_t_a1(var$0, var$0.$Z0, var$0.$g0);
    var$4 = ccrgb_t_a(35632, $rt_s(384));
    var$0.$ac = ccrgb_t_a4(ccrgb_t_a(35633, $rt_s(385)), var$4, var$0.$j1, var$0.$as);
    ccrgb_t_a1(var$0, var$0.$ac, var$0.$j1);
    ao_GLES20_glBlendFunc(1, 771);
    ccrgb_t_j();
    var$0.$p0 = ccrgb_ag__init_0(var$0);
    var$0.$q0 = ccrgb_aq__init_0(var$0);
},
ccrgb_t__init_ = var_0 => {
    let var_1 = new ccrgb_t();
    ccrgb_t__init_0(var_1, var_0);
    return var_1;
},
ccrgb_t_a4 = (var$1, var$2, var$3, var$4) => {
    let var$5, var$6, var$7;
    ccrgb_t_$callClinit();
    var$5 = ao_GLES20_glCreateProgram();
    ccrgb_t_k();
    if (!var$5)
        $rt_throw(jl_RuntimeException__init_1(((jl_StringBuilder__init_0($rt_s(386))).$append2(ao_GLES20_glGetError())).$toString()));
    var$6 = var$4.data;
    ao_GLES20_glAttachShader(var$5, var$1);
    ccrgb_t_k();
    ao_GLES20_glAttachShader(var$5, var$2);
    ccrgb_t_k();
    ao_GLES20_glLinkProgram(var$5);
    ccrgb_t_k();
    ao_GLES20_glGetProgramiv(var$5, 35714, var$4, 0);
    if (var$6[0] == 1) {
        ccrgb_t_a6(var$3, var$5);
        return var$5;
    }
    au_Log_e(ccrgb_t_Q, $rt_s(387));
    au_Log_e(ccrgb_t_Q, $rt_s(388));
    var$7 = ao_GLES20_glGetProgramInfoLog(var$5);
    au_Log_e(ccrgb_t_Q, var$7);
    ao_GLES20_glDeleteProgram(var$5);
    $rt_throw(jl_RuntimeException__init_1($rt_s(389).$concat(jl_String_valueOf(var$7))));
},
ccrgb_t_a = (var$1, var$2) => {
    let var$3, var$4, var$5;
    ccrgb_t_$callClinit();
    var$3 = ao_GLES20_glCreateShader(var$1);
    if (var$2 === null)
        $rt_throw(jl_RuntimeException__init_1($rt_s(390)));
    ao_GLES20_glShaderSource(var$3, ccrgb_t_a8(var$2));
    ccrgb_t_j();
    ao_GLES20_glCompileShader(var$3);
    ccrgb_t_j();
    var$4 = $rt_createIntArray(1);
    var$5 = var$4.data;
    ao_GLES20_glGetShaderiv(var$3, 35713, var$4, 0);
    if (var$5[0])
        return var$3;
    var$2 = $rt_s(391).$concat(jl_String_valueOf(ao_GLES20_glGetShaderInfoLog(var$3)));
    au_Log_e(ccrgb_t_Q, var$2);
    $rt_throw(jl_RuntimeException__init_1(var$2));
},
ccrgb_t_a8 = var$1 => {
    let var$2, var$3, var$4, var$5, var$6, var$7;
    ccrgb_t_$callClinit();
    var$2 = jl_StringBuffer__init_();
    var$3 = (var$1.$split1($rt_s(268))).data;
    var$4 = var$3.length;
    var$5 = 0;
    var$6 = 0;
    while (var$5 < var$4) {
        var$7 = var$3[var$5];
        if (!var$6 && var$7.$contains0($rt_s(392)))
            var$6 = 1;
        else {
            if (!var$7.$equals(var$7))
                ccrg_k_d(((((jl_StringBuilder__init_0($rt_s(393))).$append15(var$7)).$append15($rt_s(394))).$append15(var$7)).$toString());
            var$2.$append23(var$7);
            var$2.$append23($rt_s(268));
        }
        var$5 = var$5 + 1 | 0;
    }
    return var$2.$toString();
},
ccrgb_t_a11 = (var$0, var$1, var$2) => {
    let var$3, var$4;
    ccrgb_t_g(var$0);
    ccrgb_t_a2(var$0, var$0.$Z0);
    if (!(var$2 > 0.0)) {
        ao_GLES20_glLineWidth(1.0);
        ccrgb_t_j();
    } else {
        ao_GLES20_glLineWidth(var$0.$W0.data[var$0.$Y] * var$2);
        ccrgb_t_j();
    }
    var$3 = ccrgb_t_b0(var$0, var$1);
    var$4 = var$3.data;
    ccrgb_t_o(var$0);
    ao_GLES20_glBlendColor(var$4[0], var$4[1], var$4[2], var$4[3]);
    ccrgb_t_j();
    ao_GLES20_glUniform4fv(var$0.$g0.data[2].$a29, 1, var$3, 0);
    ccrgb_t_a9(var$0, var$0.$g0);
    ccrgb_t_j();
},
ccrgb_t_a1 = (var$0, var$1, var$2) => {
    var$2 = var$2.data;
    ccrgb_t_j();
    ccrgb_t_g(var$0);
    ccrgb_t_j();
    ccrgb_t_a2(var$0, var$1);
    ao_GLES20_glUniformMatrix4fv(var$2[5].$a29, 1, 0, var$0.$d5, 0);
    ccrgb_t_j();
},
ccrgb_t_a12 = (var$0, var$1) => {
    let var$2;
    if (var$1 === null)
        $rt_throw(jl_NullPointerException__init_($rt_s(395)));
    var$0.$ae = var$1;
    if (!var$0.$T.$containsKey(var$1)) {
        var$0.$Z0 = ccrgb_t_a0(var$0, var$0.$g0, var$1.$a20(), var$1.$b1());
        ccrgb_t_a1(var$0, var$0.$Z0, var$0.$g0);
        var$0.$T.$put(var$1, jl_Integer_valueOf(var$0.$Z0));
    } else {
        var$2 = var$0.$Z0;
        var$0.$Z0 = (var$0.$T.$get(var$1)).$intValue();
        ccrgb_t_a6(var$0.$g0, var$0.$Z0);
        if (var$2 != var$0.$Z0)
            ccrgb_t_a1(var$0, var$0.$Z0, var$0.$g0);
    }
},
ccrgb_t_a3 = (var$1, var$2) => {
    ccrgb_t_$callClinit();
    if (ccrgb_t_K <= 1000) {
        ccrgb_t_K = ccrgb_t_K + 1 | 0;
        if (var$2 === null)
            au_Log_e(ccrgb_t_Q, var$1);
        else
            au_Log_e0(ccrgb_t_Q, var$1, var$2);
    }
},
ccrgb_t_a9 = (var$0, var$1) => {
    if (!(var$0.$A && !var$0.$B)) {
        var$1 = var$1.data;
        ao_GLES20_glBindBuffer(34962, var$0.$ad);
        ccrgb_t_j();
        ao_GLES20_glVertexAttribPointer(var$1[0].$a29, 2, 5126, 0, 8, 0);
        ccrgb_t_j();
        ao_GLES20_glBindBuffer(34962, 0);
        ccrgb_t_j();
        var$0.$A = 1;
        var$0.$B = 0;
    }
},
ccrgb_t_a13 = (var$0, var$1, var$2, var$3, var$4, var$5) => {
    var$1 = var$1.data;
    ao_Matrix_translateM(var$0.$an, 0, var$0.$W0, var$0.$Y, var$2, var$3, 0.0);
    ao_Matrix_scaleM(var$0.$an, 0, var$4, var$5, 1.0);
    ao_GLES20_glUniformMatrix4fv(var$1[1].$a29, 1, 0, var$0.$an, 0);
    ccrgb_t_j();
},
ccrgb_t_a6 = (var$1, var$2) => {
    let var$3, var$4;
    ccrgb_t_$callClinit();
    var$3 = 0;
    while (true) {
        var$4 = var$1.data;
        if (var$3 >= var$4.length)
            break;
        var$4[var$3].$a2(var$2);
        var$3 = var$3 + 1 | 0;
    }
},
ccrgb_t_b0 = (var$0, var$1) => {
    let var$2, var$3, var$4, var$5;
    var$2 = ((var$1 >>> 24 | 0) & 255) * 0.003921568859368563 * 1.0;
    var$3 = (var$1 >>> 16 | 0) & 255;
    var$4 = (var$1 >>> 8 | 0) & 255;
    var$5 = var$1 & 255;
    var$0.$ao.data[0] = var$3 * 0.003921568859368563 * var$2;
    var$0.$ao.data[1] = var$4 * 0.003921568859368563 * var$2;
    var$0.$ao.data[2] = var$5 * 0.003921568859368563 * var$2;
    var$0.$ao.data[3] = var$2;
    return var$0.$ao;
},
ccrgb_t_j = () => {
    let var$1, var$2;
    ccrgb_t_$callClinit();
    if (ccrgb_t_J) {
        var$1 = ao_GLES20_glGetError();
        if (var$1) {
            var$2 = jl_Throwable__init_();
            ccrgb_t_a3($rt_s(396).$concat(jl_String_valueOf0(var$1)), var$2);
            ccrgb_t_t();
        }
    }
},
ccrgb_t_k = () => {
    let var$1, var$2;
    ccrgb_t_$callClinit();
    var$1 = ao_GLES20_glGetError();
    if (var$1) {
        var$2 = jl_Throwable__init_();
        ccrgb_t_a3($rt_s(396).$concat(jl_String_valueOf0(var$1)), var$2);
        ccrgb_t_t();
    }
},
ccrgb_t_l = () => {
    ccrgb_t_$callClinit();
    return ccrgb_t_Q;
},
ccrgb_t_o = var$0 => {
    if (!var$0.$z) {
        ao_GLES20_glEnable(3042);
        ccrgb_t_j();
        var$0.$z = 1;
    }
},
ccrgb_t_t = () => {
    let var$1, var$2;
    ccrgb_t_$callClinit();
    var$1 = 255;
    var$2 = ao_GLES20_glGetError();
    while (var$2 && var$1 > 0) {
        var$1 = var$1 + (-1) | 0;
        var$2 = ao_GLES20_glGetError();
    }
    if (var$2)
        ccrgb_t_a3($rt_s(397), null);
},
ccrgb_t_a0 = (var$0, var$1, var$2, var$3) => {
    return ccrgb_t_a4(ccrgb_t_a(35633, var$2), ccrgb_t_a(35632, var$3), var$1, var$0.$as);
},
ccrgb_t_a2 = (var$0, var$1) => {
    if (var$0.$y != var$1) {
        ao_GLES20_glUseProgram(var$1);
        ccrgb_t_j();
        var$0.$A = 0;
        var$0.$y = var$1;
    }
},
ccrgb_t_a10 = (var$0, var$1) => {
    var$0.$ag = var$1;
},
ccrgb_t_a7 = (var$0, var$1) => {
    var$0.$af = var$1;
},
ccrgb_t_a5 = (var$0, var$1, var$2, var$3, var$4, var$5) => {
    let var$6, var$7;
    if (!(var$0.$P !== null && jn_Buffer_capacity(var$0.$P) >= (var$3 * 4 | 0))) {
        var$6 = jn_ByteBuffer_allocateDirect((var$3 * 4 | 0) + 10 | 0);
        jn_ByteBuffer_order(var$6, jn_ByteOrder_nativeOrder());
        var$0.$P = var$6.$asFloatBuffer();
    }
    var$0.$P.$clear();
    var$0.$P.$put0(var$1, var$2, var$3);
    var$0.$P.$flip();
    var$0.$P.$position0(0);
    var$7 = var$4.$a36;
    var$2 = var$4.$b9;
    if (var$7 === 0.0)
        var$7 = 1.0;
    ccrgb_t_a12(var$0, var$5);
    ccrgb_t_a11(var$0, var$2, var$7);
    if (var$0.$ag !== null)
        var$0.$ag.$a24(var$0.$Z0, var$0.$ae);
    var$1 = var$0.$g0;
    var$2 = var$1.data[0].$a29;
    ao_GLES20_glEnableVertexAttribArray(var$2);
    ccrgb_t_j();
    ao_GLES20_glVertexAttribPointer0(var$2, 2, 5126, 0, 0, var$0.$P);
    ccrgb_t_a13(var$0, var$1, 0.0, 0.0, 1.0, 1.0);
    ao_GLES20_glDrawArrays(0, 0, var$3 / 2 | 0);
    ccrgb_t_j();
    ao_GLES20_glDisableVertexAttribArray(var$2);
    ccrgb_t_j();
},
ccrgb_t_b = var$0 => {
    ao_GLES20_glClearColor(0.0, 0.0, 0.0, 0.0);
    ccrgb_t_j();
    ao_GLES20_glClear(16384);
    ccrgb_t_j();
},
ccrgb_t_g = var$0 => {
    if (var$0.$n) {
        ccrgb_ag_b(var$0.$p0);
        var$0.$n = 0;
    }
    if (var$0.$o0) {
        ccrgb_aq_b(var$0.$q0);
        var$0.$o0 = 0;
    }
},
ccrgb_u = $rt_classWithoutFields(ccrgb_x),
ccrgb_u__init_0 = (var$0, var$1) => {
    ccrgb_x__init_(var$0, var$1);
},
ccrgb_u__init_ = var_0 => {
    let var_1 = new ccrgb_u();
    ccrgb_u__init_0(var_1, var_0);
    return var_1;
},
ccrgb_u_a = (var$0, var$1) => {
    if (var$0.$c3 != var$1) {
        var$0.$a29 = ao_GLES20_glGetAttribLocation(var$1, var$0.$b4);
        var$0.$c3 = var$1;
        ccrgb_t_k();
        if (var$0.$a29 == (-1))
            au_Log_e(ccrgb_t_l(), ((jl_StringBuilder__init_0($rt_s(398))).$append15(var$0.$b4)).$toString());
    }
},
ccrgb_z = $rt_classWithoutFields(ccrgb_x),
ccrgb_z__init_0 = (var$0, var$1) => {
    ccrgb_x__init_(var$0, var$1);
},
ccrgb_z__init_ = var_0 => {
    let var_1 = new ccrgb_z();
    ccrgb_z__init_0(var_1, var_0);
    return var_1;
},
ccrgb_z_a = (var$0, var$1) => {
    if (var$0.$c3 != var$1) {
        var$0.$a29 = ao_GLES20_glGetUniformLocation(var$1, var$0.$b4);
        var$0.$c3 = var$1;
        ccrgb_t_k();
        if (var$0.$a29 == (-1))
            au_Log_e(ccrgb_t_l(), ((jl_StringBuilder__init_0($rt_s(398))).$append15(var$0.$b4)).$toString());
    }
},
ccrgb_y = $rt_classWithoutFields(),
ccrgb_y__init_0 = var$0 => {
    jl_Object__init_(var$0);
},
ccrgb_y__init_ = () => {
    let var_0 = new ccrgb_y();
    ccrgb_y__init_0(var_0);
    return var_0;
},
jur_EmptySet = $rt_classWithoutFields(jur_LeafSet),
jur_EmptySet__init_0 = ($this, $next) => {
    jur_LeafSet__init_0($this, $next);
    $this.$charCount0 = 0;
},
jur_EmptySet__init_ = var_0 => {
    let var_1 = new jur_EmptySet();
    jur_EmptySet__init_0(var_1, var_0);
    return var_1;
},
jur_EmptySet_accepts = ($this, $stringIndex, $testString) => {
    return 0;
},
jur_EmptySet_find = ($this, $stringIndex, $testString, $matchResult) => {
    let $strLength, $startStr, var$6, $low, $high;
    $strLength = $matchResult.$getRightBound();
    $startStr = $matchResult.$getLeftBound();
    while (true) {
        var$6 = $rt_compare($stringIndex, $strLength);
        if (var$6 > 0)
            return (-1);
        if (var$6 < 0) {
            $low = $testString.$charAt($stringIndex);
            if (jl_Character_isLowSurrogate($low) && $stringIndex > $startStr) {
                $high = $testString.$charAt($stringIndex - 1 | 0);
                if (jl_Character_isHighSurrogate($high)) {
                    $stringIndex = $stringIndex + 1 | 0;
                    continue;
                }
            }
        }
        if ($this.$next1.$matches($stringIndex, $testString, $matchResult) >= 0)
            break;
        $stringIndex = $stringIndex + 1 | 0;
    }
    return $stringIndex;
},
jur_EmptySet_findBack = ($this, $stringIndex, $startSearch, $testString, $matchResult) => {
    let $strLength, $startStr, $low, $high;
    $strLength = $matchResult.$getRightBound();
    $startStr = $matchResult.$getLeftBound();
    while (true) {
        if ($startSearch < $stringIndex)
            return (-1);
        if ($startSearch < $strLength) {
            $low = $testString.$charAt($startSearch);
            if (jl_Character_isLowSurrogate($low) && $startSearch > $startStr) {
                $high = $testString.$charAt($startSearch - 1 | 0);
                if (jl_Character_isHighSurrogate($high)) {
                    $startSearch = $startSearch + (-1) | 0;
                    continue;
                }
            }
        }
        if ($this.$next1.$matches($startSearch, $testString, $matchResult) >= 0)
            break;
        $startSearch = $startSearch + (-1) | 0;
    }
    return $startSearch;
};
let jur_EmptySet_hasConsumed = ($this, $mr) => {
    return 0;
};
function jn_ShortBufferOverTypedArray() {
    let a = this; jn_ShortBufferImpl.call(a);
    a.$readOnly1 = 0;
    a.$data4 = null;
    a.$array1 = null;
}
let jn_ShortBufferOverTypedArray__init_0 = ($this, $position, $limit, $readOnly, $data, $array) => {
    jn_ShortBufferImpl__init_($this, $position, $limit);
    $this.$readOnly1 = $readOnly;
    $this.$data4 = $data;
    $this.$array1 = $array;
},
jn_ShortBufferOverTypedArray__init_ = (var_0, var_1, var_2, var_3, var_4) => {
    let var_5 = new jn_ShortBufferOverTypedArray();
    jn_ShortBufferOverTypedArray__init_0(var_5, var_0, var_1, var_2, var_3, var_4);
    return var_5;
},
jn_ShortBufferOverTypedArray_duplicate = ($this, $start, $capacity, $position, $limit, $readOnly) => {
    let var$6, var$7, $slice;
    var$6 = $this.$data4.buffer;
    var$7 = $this.$data4.byteOffset + ($start * 2 | 0) | 0;
    $slice = new Int16Array(var$6, var$7, $capacity);
    return jn_ShortBufferOverTypedArray__init_($position, $limit, $readOnly, $slice, $this.$array1);
},
jn_ShortBufferOverTypedArray_readOnly = $this => {
    return $this.$readOnly1;
},
jn_ShortBufferOverTypedArray_getElement = ($this, $index) => {
    return $this.$data4[$index];
},
jn_ShortBufferOverTypedArray_capacityImpl = $this => {
    return $this.$data4.length;
},
jn_ShortBufferOverTypedArray_putImpl = ($this, $index, $src, $offset, $length) => {
    let var$5, var$6, $slice;
    var$5 = $src.data.buffer;
    var$6 = $offset * 2 | 0;
    $slice = new Int16Array(var$5, var$6, $length);
    $this.$data4.set($slice, $index);
},
jl_StackTraceElement = $rt_classWithoutFields(),
ccrg_bp = $rt_classWithoutFields();
function ju_HashMap$HashEntry() {
    let a = this; ju_MapEntry.call(a);
    a.$origKeyHash = 0;
    a.$next2 = null;
}
let ju_HashMap$HashEntry__init_ = ($this, $theKey, $hash) => {
    ju_MapEntry__init_($this, $theKey, null);
    $this.$origKeyHash = $hash;
},
ju_HashMap$HashEntry__init_0 = (var_0, var_1) => {
    let var_2 = new ju_HashMap$HashEntry();
    ju_HashMap$HashEntry__init_(var_2, var_0, var_1);
    return var_2;
};
function ju_LinkedHashMap$LinkedHashMapEntry() {
    let a = this; ju_HashMap$HashEntry.call(a);
    a.$chainForward = null;
    a.$chainBackward = null;
}
let ju_LinkedHashMap$LinkedHashMapEntry__init_ = ($this, $theKey, $hash) => {
    ju_HashMap$HashEntry__init_($this, $theKey, $hash);
    $this.$chainForward = null;
    $this.$chainBackward = null;
},
ju_LinkedHashMap$LinkedHashMapEntry__init_0 = (var_0, var_1) => {
    let var_2 = new ju_LinkedHashMap$LinkedHashMapEntry();
    ju_LinkedHashMap$LinkedHashMapEntry__init_(var_2, var_0, var_1);
    return var_2;
},
jur_AbstractCharClass$LazyASCII = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyASCII__init_ = $this => {
    jur_AbstractCharClass$LazyCharClass__init_($this);
},
jur_AbstractCharClass$LazyASCII__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazyASCII();
    jur_AbstractCharClass$LazyASCII__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyASCII_computeValue = $this => {
    return (jur_CharClass__init_()).$add1(0, 127);
},
ag_PorterDuff$Mode = $rt_classWithoutFields(jl_Enum),
ag_PorterDuff$Mode_CLEAR = null,
ag_PorterDuff$Mode_SRC = null,
ag_PorterDuff$Mode_DST = null,
ag_PorterDuff$Mode_SRC_OVER = null,
ag_PorterDuff$Mode_DST_OVER = null,
ag_PorterDuff$Mode_SRC_IN = null,
ag_PorterDuff$Mode_DST_IN = null,
ag_PorterDuff$Mode_SRC_OUT = null,
ag_PorterDuff$Mode_DST_OUT = null,
ag_PorterDuff$Mode_SRC_ATOP = null,
ag_PorterDuff$Mode_DST_ATOP = null,
ag_PorterDuff$Mode_XOR = null,
ag_PorterDuff$Mode_DARKEN = null,
ag_PorterDuff$Mode_LIGHTEN = null,
ag_PorterDuff$Mode_MULTIPLY = null,
ag_PorterDuff$Mode_SCREEN = null,
ag_PorterDuff$Mode_ADD = null,
ag_PorterDuff$Mode_OVERLAY = null,
ag_PorterDuff$Mode_$VALUES = null,
ag_PorterDuff$Mode_$callClinit = () => {
    ag_PorterDuff$Mode_$callClinit = $rt_eraseClinit(ag_PorterDuff$Mode);
    ag_PorterDuff$Mode__clinit_();
},
ag_PorterDuff$Mode_values = () => {
    ag_PorterDuff$Mode_$callClinit();
    return ag_PorterDuff$Mode_$VALUES.$clone0();
},
ag_PorterDuff$Mode__init_0 = (var$0, var$1, var$2) => {
    ag_PorterDuff$Mode_$callClinit();
    jl_Enum__init_(var$0, var$1, var$2);
},
ag_PorterDuff$Mode__init_ = (var_0, var_1) => {
    let var_2 = new ag_PorterDuff$Mode();
    ag_PorterDuff$Mode__init_0(var_2, var_0, var_1);
    return var_2;
},
ag_PorterDuff$Mode_$values = () => {
    let var$1, var$2;
    ag_PorterDuff$Mode_$callClinit();
    var$1 = $rt_createArray(ag_PorterDuff$Mode, 18);
    var$2 = var$1.data;
    var$2[0] = ag_PorterDuff$Mode_CLEAR;
    var$2[1] = ag_PorterDuff$Mode_SRC;
    var$2[2] = ag_PorterDuff$Mode_DST;
    var$2[3] = ag_PorterDuff$Mode_SRC_OVER;
    var$2[4] = ag_PorterDuff$Mode_DST_OVER;
    var$2[5] = ag_PorterDuff$Mode_SRC_IN;
    var$2[6] = ag_PorterDuff$Mode_DST_IN;
    var$2[7] = ag_PorterDuff$Mode_SRC_OUT;
    var$2[8] = ag_PorterDuff$Mode_DST_OUT;
    var$2[9] = ag_PorterDuff$Mode_SRC_ATOP;
    var$2[10] = ag_PorterDuff$Mode_DST_ATOP;
    var$2[11] = ag_PorterDuff$Mode_XOR;
    var$2[12] = ag_PorterDuff$Mode_DARKEN;
    var$2[13] = ag_PorterDuff$Mode_LIGHTEN;
    var$2[14] = ag_PorterDuff$Mode_MULTIPLY;
    var$2[15] = ag_PorterDuff$Mode_SCREEN;
    var$2[16] = ag_PorterDuff$Mode_ADD;
    var$2[17] = ag_PorterDuff$Mode_OVERLAY;
    return var$1;
},
ag_PorterDuff$Mode__clinit_ = () => {
    ag_PorterDuff$Mode_CLEAR = ag_PorterDuff$Mode__init_($rt_s(399), 0);
    ag_PorterDuff$Mode_SRC = ag_PorterDuff$Mode__init_($rt_s(400), 1);
    ag_PorterDuff$Mode_DST = ag_PorterDuff$Mode__init_($rt_s(401), 2);
    ag_PorterDuff$Mode_SRC_OVER = ag_PorterDuff$Mode__init_($rt_s(402), 3);
    ag_PorterDuff$Mode_DST_OVER = ag_PorterDuff$Mode__init_($rt_s(403), 4);
    ag_PorterDuff$Mode_SRC_IN = ag_PorterDuff$Mode__init_($rt_s(404), 5);
    ag_PorterDuff$Mode_DST_IN = ag_PorterDuff$Mode__init_($rt_s(405), 6);
    ag_PorterDuff$Mode_SRC_OUT = ag_PorterDuff$Mode__init_($rt_s(406), 7);
    ag_PorterDuff$Mode_DST_OUT = ag_PorterDuff$Mode__init_($rt_s(407), 8);
    ag_PorterDuff$Mode_SRC_ATOP = ag_PorterDuff$Mode__init_($rt_s(408), 9);
    ag_PorterDuff$Mode_DST_ATOP = ag_PorterDuff$Mode__init_($rt_s(409), 10);
    ag_PorterDuff$Mode_XOR = ag_PorterDuff$Mode__init_($rt_s(410), 11);
    ag_PorterDuff$Mode_DARKEN = ag_PorterDuff$Mode__init_($rt_s(411), 12);
    ag_PorterDuff$Mode_LIGHTEN = ag_PorterDuff$Mode__init_($rt_s(412), 13);
    ag_PorterDuff$Mode_MULTIPLY = ag_PorterDuff$Mode__init_($rt_s(413), 14);
    ag_PorterDuff$Mode_SCREEN = ag_PorterDuff$Mode__init_($rt_s(414), 15);
    ag_PorterDuff$Mode_ADD = ag_PorterDuff$Mode__init_($rt_s(415), 16);
    ag_PorterDuff$Mode_OVERLAY = ag_PorterDuff$Mode__init_($rt_s(416), 17);
    ag_PorterDuff$Mode_$VALUES = ag_PorterDuff$Mode_$values();
};
function ju_AbstractList$1() {
    let a = this; jl_Object.call(a);
    a.$index1 = 0;
    a.$modCount1 = 0;
    a.$size1 = 0;
    a.$removeIndex = 0;
    a.$this$0 = null;
}
let ju_AbstractList$1__init_ = ($this, $this$0) => {
    $this.$this$0 = $this$0;
    jl_Object__init_($this);
    $this.$modCount1 = $this.$this$0.$modCount;
    $this.$size1 = $this.$this$0.$size();
    $this.$removeIndex = (-1);
},
ju_AbstractList$1__init_0 = var_0 => {
    let var_1 = new ju_AbstractList$1();
    ju_AbstractList$1__init_(var_1, var_0);
    return var_1;
},
ju_AbstractList$1_hasNext = $this => {
    return $this.$index1 >= $this.$size1 ? 0 : 1;
},
ju_AbstractList$1_next = $this => {
    let var$1, var$2;
    ju_AbstractList$1_checkConcurrentModification($this);
    $this.$removeIndex = $this.$index1;
    var$1 = $this.$this$0;
    var$2 = $this.$index1;
    $this.$index1 = var$2 + 1 | 0;
    return var$1.$get4(var$2);
},
ju_AbstractList$1_checkConcurrentModification = $this => {
    if ($this.$modCount1 == $this.$this$0.$modCount)
        return;
    $rt_throw(ju_ConcurrentModificationException__init_0());
},
ccrgb_f = $rt_classWithoutFields(),
ccrgb_f__init_ = var$0 => {
    jl_Object__init_(var$0);
},
ccrgb_f__init_0 = () => {
    let var_0 = new ccrgb_f();
    ccrgb_f__init_(var_0);
    return var_0;
},
ccrgb_d = $rt_classWithoutFields(),
ccrgb_d__init_ = var$0 => {
    jl_Object__init_(var$0);
},
ccrgb_d__init_0 = () => {
    let var_0 = new ccrgb_d();
    ccrgb_d__init_(var_0);
    return var_0;
},
ccrgb_e = $rt_classWithoutFields(),
ccrgb_e__init_ = var$0 => {
    jl_Object__init_(var$0);
},
ccrgb_e__init_0 = () => {
    let var_0 = new ccrgb_e();
    ccrgb_e__init_(var_0);
    return var_0;
};
function ccrgb_j() {
    jl_Object.call(this);
    this.$a44 = null;
}
let ccrgb_j__init_ = (var$0, var$1) => {
    var$0.$a44 = var$1;
    jl_Object__init_(var$0);
},
ccrgb_j__init_0 = var_0 => {
    let var_1 = new ccrgb_j();
    ccrgb_j__init_(var_1, var_0);
    return var_1;
};
function ccrgb_h() {
    let a = this; jl_Object.call(a);
    a.$a37 = null;
    a.$b14 = null;
    a.$c10 = null;
    a.$d8 = null;
    a.$e7 = null;
    a.$h0 = null;
    a.$i0 = null;
}
let ccrgb_h__init_ = var$0 => {
    jl_Object__init_(var$0);
    var$0.$c10 = ju_WeakHashMap__init_1();
    var$0.$e7 = $rt_createFloatArray(16);
    var$0.$i0 = ccrgb_l__init_0();
    var$0.$a37 = ccrgb_t__init_(var$0);
    var$0.$a37.$a26(ccrgb_i__init_0(var$0));
    var$0.$a37.$a27(ccrgb_j__init_0(var$0));
    var$0.$b14 = ccrgb_d__init_0();
    var$0.$h0 = ccrgb_b__init_0();
    var$0.$d8 = $rt_createFloatArray(4);
},
ccrgb_h__init_0 = () => {
    let var_0 = new ccrgb_h();
    ccrgb_h__init_(var_0);
    return var_0;
};
function ccrgb_i() {
    jl_Object.call(this);
    this.$a39 = null;
}
let ccrgb_i__init_ = (var$0, var$1) => {
    var$0.$a39 = var$1;
    jl_Object__init_(var$0);
},
ccrgb_i__init_0 = var_0 => {
    let var_1 = new ccrgb_i();
    ccrgb_i__init_(var_1, var_0);
    return var_1;
},
ccrgb_i_a = (var$0, var$1, var$2) => {
    var$2.$a28(var$1, var$0.$a39);
};
function jur_Quantifier() {
    let a = this; jur_SpecialToken.call(a);
    a.$min1 = 0;
    a.$max2 = 0;
}
let jur_Quantifier__init_ = ($this, $min, $max) => {
    jur_SpecialToken__init_($this);
    $this.$min1 = $min;
    $this.$max2 = $max;
},
jur_Quantifier__init_0 = (var_0, var_1) => {
    let var_2 = new jur_Quantifier();
    jur_Quantifier__init_(var_2, var_0, var_1);
    return var_2;
},
jur_Quantifier_min = $this => {
    return $this.$min1;
},
jur_Quantifier_max = $this => {
    return $this.$max2;
},
jur_Quantifier_toString = $this => {
    let var$1, var$2, var$3;
    var$1 = $this.$min1;
    var$2 = $this.$max2 == 2147483647 ? $rt_s(13) : jl_Integer_toString($this.$max2);
    var$3 = jl_StringBuilder__init_();
    jl_StringBuilder_append1(jl_StringBuilder_append(jl_StringBuilder_append1(jl_StringBuilder_append0(jl_StringBuilder_append1(var$3, 123), var$1), 44), var$2), 125);
    return jl_StringBuilder_toString(var$3);
};
function ag_Rect() {
    let a = this; jl_Object.call(a);
    a.$left = 0;
    a.$top0 = 0;
    a.$right = 0;
    a.$bottom = 0;
}
let ag_Rect__init_1 = var$0 => {
    jl_Object__init_(var$0);
},
ag_Rect__init_ = () => {
    let var_0 = new ag_Rect();
    ag_Rect__init_1(var_0);
    return var_0;
},
ag_Rect__init_0 = (var$0, var$1, var$2, var$3, var$4) => {
    jl_Object__init_(var$0);
    var$0.$set1(var$1, var$2, var$3, var$4);
},
ag_Rect__init_2 = (var_0, var_1, var_2, var_3) => {
    let var_4 = new ag_Rect();
    ag_Rect__init_0(var_4, var_0, var_1, var_2, var_3);
    return var_4;
},
ag_Rect_set = (var$0, var$1, var$2, var$3, var$4) => {
    var$0.$left = var$1;
    var$0.$top0 = var$2;
    var$0.$right = var$3;
    var$0.$bottom = var$4;
};
function jur_AbstractCharClass$LazyJavaUpperCase$1() {
    jur_AbstractCharClass.call(this);
    this.$this$09 = null;
}
let jur_AbstractCharClass$LazyJavaUpperCase$1__init_ = ($this, $this$0) => {
    $this.$this$09 = $this$0;
    jur_AbstractCharClass__init_($this);
},
jur_AbstractCharClass$LazyJavaUpperCase$1__init_0 = var_0 => {
    let var_1 = new jur_AbstractCharClass$LazyJavaUpperCase$1();
    jur_AbstractCharClass$LazyJavaUpperCase$1__init_(var_1, var_0);
    return var_1;
},
jur_AbstractCharClass$LazyJavaUpperCase$1_contains = ($this, $ch) => {
    return jl_Character_isUpperCase($ch);
},
r_Bootstrap$TestShader = $rt_classWithoutFields(),
r_Bootstrap$TestShader__init_ = var$0 => {
    jl_Object__init_(var$0);
},
r_Bootstrap$TestShader__init_0 = () => {
    let var_0 = new r_Bootstrap$TestShader();
    r_Bootstrap$TestShader__init_(var_0);
    return var_0;
},
r_Bootstrap$TestShader_a0 = var$0 => {
    return $rt_s(417);
},
r_Bootstrap$TestShader_b = var$0 => {
    return $rt_s(418);
},
r_Bootstrap$TestShader_a = (var$0, var$1, var$2) => {
    return;
},
otpp_ResourceAccessor = $rt_classWithoutFields(),
jur_PossessiveQuantifierSet = $rt_classWithoutFields(jur_LeafQuantifierSet),
jur_PossessiveQuantifierSet__init_ = ($this, $innerSet, $next, $type) => {
    jur_LeafQuantifierSet__init_($this, $innerSet, $next, $type);
},
jur_PossessiveQuantifierSet__init_0 = (var_0, var_1, var_2) => {
    let var_3 = new jur_PossessiveQuantifierSet();
    jur_PossessiveQuantifierSet__init_(var_3, var_0, var_1, var_2);
    return var_3;
},
jur_PossessiveQuantifierSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let var$4;
    a: {
        while (true) {
            if (($stringIndex + $this.$leaf.$charCount() | 0) > $matchResult.$getRightBound())
                break a;
            var$4 = $this.$leaf.$accepts($stringIndex, $testString);
            if (var$4 < 1)
                break;
            $stringIndex = $stringIndex + var$4 | 0;
        }
    }
    return $this.$next1.$matches($stringIndex, $testString, $matchResult);
};
function jur_AbstractCharClass$LazyJavaIdentifierIgnorable$1() {
    jur_AbstractCharClass.call(this);
    this.$this$029 = null;
}
let jur_AbstractCharClass$LazyJavaIdentifierIgnorable$1__init_ = ($this, $this$0) => {
    $this.$this$029 = $this$0;
    jur_AbstractCharClass__init_($this);
},
jur_AbstractCharClass$LazyJavaIdentifierIgnorable$1__init_0 = var_0 => {
    let var_1 = new jur_AbstractCharClass$LazyJavaIdentifierIgnorable$1();
    jur_AbstractCharClass$LazyJavaIdentifierIgnorable$1__init_(var_1, var_0);
    return var_1;
},
jur_AbstractCharClass$LazyJavaIdentifierIgnorable$1_contains = ($this, $ch) => {
    return jl_Character_isIdentifierIgnorable($ch);
},
jl_DefaultUncaughtExceptionHandler = $rt_classWithoutFields(),
jl_DefaultUncaughtExceptionHandler__init_ = $this => {
    jl_Object__init_($this);
},
jl_DefaultUncaughtExceptionHandler__init_0 = () => {
    let var_0 = new jl_DefaultUncaughtExceptionHandler();
    jl_DefaultUncaughtExceptionHandler__init_(var_0);
    return var_0;
};
function jur_AbstractCharClass$LazyJavaLetter$1() {
    jur_AbstractCharClass.call(this);
    this.$this$023 = null;
}
let jur_AbstractCharClass$LazyJavaLetter$1__init_ = ($this, $this$0) => {
    $this.$this$023 = $this$0;
    jur_AbstractCharClass__init_($this);
},
jur_AbstractCharClass$LazyJavaLetter$1__init_0 = var_0 => {
    let var_1 = new jur_AbstractCharClass$LazyJavaLetter$1();
    jur_AbstractCharClass$LazyJavaLetter$1__init_(var_1, var_0);
    return var_1;
},
jur_AbstractCharClass$LazyJavaLetter$1_contains = ($this, $ch) => {
    return jl_Character_isLetter($ch);
},
jur_ReluctantQuantifierSet = $rt_classWithoutFields(jur_LeafQuantifierSet),
jur_ReluctantQuantifierSet__init_ = ($this, $innerSet, $next, $type) => {
    jur_LeafQuantifierSet__init_($this, $innerSet, $next, $type);
},
jur_ReluctantQuantifierSet__init_0 = (var_0, var_1, var_2) => {
    let var_3 = new jur_ReluctantQuantifierSet();
    jur_ReluctantQuantifierSet__init_(var_3, var_0, var_1, var_2);
    return var_3;
},
jur_ReluctantQuantifierSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let var$4;
    while (true) {
        var$4 = $this.$next1.$matches($stringIndex, $testString, $matchResult);
        if (var$4 >= 0)
            break;
        if (($stringIndex + $this.$leaf.$charCount() | 0) <= $matchResult.$getRightBound()) {
            var$4 = $this.$leaf.$accepts($stringIndex, $testString);
            $stringIndex = $stringIndex + var$4 | 0;
        }
        if (var$4 < 1)
            return (-1);
    }
    return var$4;
};
function ag_RectF() {
    let a = this; jl_Object.call(a);
    a.$left0 = 0.0;
    a.$top = 0.0;
    a.$right0 = 0.0;
    a.$bottom0 = 0.0;
}
let ag_RectF__init_0 = var$0 => {
    jl_Object__init_(var$0);
},
ag_RectF__init_ = () => {
    let var_0 = new ag_RectF();
    ag_RectF__init_0(var_0);
    return var_0;
},
ag_RectF__init_2 = (var$0, var$1, var$2, var$3, var$4) => {
    jl_Object__init_(var$0);
    var$0.$set2(var$1, var$2, var$3, var$4);
},
ag_RectF__init_1 = (var_0, var_1, var_2, var_3) => {
    let var_4 = new ag_RectF();
    ag_RectF__init_2(var_4, var_0, var_1, var_2, var_3);
    return var_4;
},
ag_RectF_set = (var$0, var$1, var$2, var$3, var$4) => {
    var$0.$left0 = var$1;
    var$0.$top = var$2;
    var$0.$right0 = var$3;
    var$0.$bottom0 = var$4;
},
jur_EOISet = $rt_classWithoutFields(jur_AbstractSet),
jur_EOISet__init_ = $this => {
    jur_AbstractSet__init_($this);
},
jur_EOISet__init_0 = () => {
    let var_0 = new jur_EOISet();
    jur_EOISet__init_(var_0);
    return var_0;
},
jur_EOISet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $rightBound;
    $rightBound = !$matchResult.$hasTransparentBounds() ? $matchResult.$getRightBound() : $testString.$length();
    if ($stringIndex < $rightBound)
        return (-1);
    $matchResult.$hitEnd = 1;
    $matchResult.$requireEnd = 1;
    return $this.$next1.$matches($stringIndex, $testString, $matchResult);
},
jur_EOISet_hasConsumed = ($this, $matchResult) => {
    return 0;
},
jur_AbstractCharClass$LazyUpper = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyUpper__init_ = $this => {
    jur_AbstractCharClass$LazyCharClass__init_($this);
},
jur_AbstractCharClass$LazyUpper__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazyUpper();
    jur_AbstractCharClass$LazyUpper__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyUpper_computeValue = $this => {
    return (jur_CharClass__init_()).$add1(65, 90);
},
jl_ThreadInterruptHandler = $rt_classWithoutFields(0);
function jl_Thread$SleepHandler() {
    let a = this; jl_Object.call(a);
    a.$thread = null;
    a.$callback = null;
    a.$isInterrupted = 0;
    a.$scheduleId = 0;
}
let jl_Thread$SleepHandler__init_ = ($this, $thread_0, $callback) => {
    jl_Object__init_($this);
    $this.$thread = $thread_0;
    $this.$callback = $callback;
},
jl_Thread$SleepHandler__init_0 = (var_0, var_1) => {
    let var_2 = new jl_Thread$SleepHandler();
    jl_Thread$SleepHandler__init_(var_2, var_0, var_1);
    return var_2;
},
jl_Thread$SleepHandler_run = $this => {
    if (!$this.$isInterrupted) {
        $this.$thread.$interruptHandler = null;
        jl_Thread_setCurrentThread($this.$thread);
        $this.$callback.$complete(null);
    }
};
function otji_JSWrapper() {
    jl_Object.call(this);
    this.$js = null;
}
let otji_JSWrapper__init_0 = ($this, $js) => {
    jl_Object__init_($this);
    $this.$js = $js;
},
otji_JSWrapper__init_ = var_0 => {
    let var_1 = new otji_JSWrapper();
    otji_JSWrapper__init_0(var_1, var_0);
    return var_1;
},
otji_JSWrapper_wrap = $o => {
    let $type, $isObject, $wrappers, $existingRef, $existing, $wrapper, $jsString, $stringWrappers, $stringFinalizationRegistry, $wrapperAsJs, $jsNumber, $numberWrappers, $numberFinalizationRegistry;
    if ($o === null)
        return null;
    $type = $rt_str(typeof $o);
    $isObject = !$type.$equals($rt_s(419)) && !$type.$equals($rt_s(420)) ? 0 : 1;
    otji_JSWrapper$Helper_$callClinit();
    $wrappers = otji_JSWrapper$Helper_wrappers;
    if ($wrappers !== null) {
        if ($isObject) {
            $existingRef = $wrappers.get($o);
            $existing = (typeof $existingRef == 'undefined' ? 1 : 0) ? void 0 : $existingRef.deref();
            if (!(typeof $existing == 'undefined' ? 1 : 0))
                return $existing;
            $wrapper = otji_JSWrapper__init_($o);
            $wrappers.set($o, new WeakRef($wrapper));
            return $wrapper;
        }
        if ($type.$equals($rt_s(421))) {
            $jsString = $o;
            $stringWrappers = otji_JSWrapper$Helper_stringWrappers;
            $stringFinalizationRegistry = otji_JSWrapper$Helper_stringFinalizationRegistry;
            $existingRef = $stringWrappers.get($jsString);
            $existing = (typeof $existingRef == 'undefined' ? 1 : 0) ? void 0 : $existingRef.deref();
            if (!(typeof $existing == 'undefined' ? 1 : 0))
                return $existing;
            $wrapper = otji_JSWrapper__init_($o);
            $wrapperAsJs = $wrapper;
            $stringWrappers.set($jsString, new WeakRef($wrapperAsJs));
            $stringFinalizationRegistry.register($wrapperAsJs, $jsString);
            return $wrapper;
        }
        if ($type.$equals($rt_s(422))) {
            $jsNumber = $o;
            $numberWrappers = otji_JSWrapper$Helper_numberWrappers;
            $numberFinalizationRegistry = otji_JSWrapper$Helper_numberFinalizationRegistry;
            $existingRef = $numberWrappers.get($jsNumber);
            $existing = (typeof $existingRef == 'undefined' ? 1 : 0) ? void 0 : $existingRef.deref();
            if (!(typeof $existing == 'undefined' ? 1 : 0))
                return $existing;
            $wrapper = otji_JSWrapper__init_($o);
            $wrapperAsJs = $wrapper;
            $numberWrappers.set($jsNumber, new WeakRef($wrapperAsJs));
            $numberFinalizationRegistry.register($wrapperAsJs, $jsNumber);
            return $wrapper;
        }
        if ($type.$equals($rt_s(423))) {
            $existingRef = otji_JSWrapper$Helper_undefinedWrapper;
            $existing = $existingRef === null ? void 0 : $existingRef.deref();
            if (!(typeof $existing == 'undefined' ? 1 : 0))
                return $existing;
            $wrapper = otji_JSWrapper__init_($o);
            $wrapperAsJs = $wrapper;
            otji_JSWrapper$Helper_undefinedWrapper = new WeakRef($wrapperAsJs);
            return $wrapper;
        }
    }
    return otji_JSWrapper__init_($o);
},
otji_JSWrapper_unwrap = $o => {
    if ($o === null)
        return null;
    return !($o instanceof otji_JSWrapper) ? $o : $o.$js;
},
otji_JSWrapper_toString = $this => {
    return (typeof $this.$js == 'undefined' ? 1 : 0) ? $rt_s(423) : $rt_str($this.$js.toString());
};
function jur_MultiLineSOLSet() {
    jur_AbstractSet.call(this);
    this.$lt1 = null;
}
let jur_MultiLineSOLSet__init_ = ($this, $lt) => {
    jur_AbstractSet__init_($this);
    $this.$lt1 = $lt;
},
jur_MultiLineSOLSet__init_0 = var_0 => {
    let var_1 = new jur_MultiLineSOLSet();
    jur_MultiLineSOLSet__init_(var_1, var_0);
    return var_1;
},
jur_MultiLineSOLSet_matches = ($this, $strIndex, $testString, $matchResult) => {
    let var$4, var$5;
    a: {
        if ($strIndex != $matchResult.$getRightBound()) {
            if (!$strIndex)
                break a;
            if ($matchResult.$hasAnchoringBounds() && $strIndex == $matchResult.$getLeftBound())
                break a;
            var$4 = $this.$lt1;
            var$5 = $strIndex - 1 | 0;
            if (var$4.$isAfterLineTerminator($testString.$charAt(var$5), $testString.$charAt($strIndex)))
                break a;
        }
        return (-1);
    }
    return $this.$next1.$matches($strIndex, $testString, $matchResult);
},
jur_MultiLineSOLSet_hasConsumed = ($this, $matchResult) => {
    return 0;
},
jur_AbstractCharClass$LazyLower = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyLower__init_ = $this => {
    jur_AbstractCharClass$LazyCharClass__init_($this);
},
jur_AbstractCharClass$LazyLower__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazyLower();
    jur_AbstractCharClass$LazyLower__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyLower_computeValue = $this => {
    return (jur_CharClass__init_()).$add1(97, 122);
},
oti_AsyncCallback = $rt_classWithoutFields(0),
jur_AbstractCharClass$LazyJavaTitleCase = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyJavaTitleCase__init_ = $this => {
    jur_AbstractCharClass$LazyCharClass__init_($this);
},
jur_AbstractCharClass$LazyJavaTitleCase__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazyJavaTitleCase();
    jur_AbstractCharClass$LazyJavaTitleCase__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyJavaTitleCase_computeValue = $this => {
    return jur_AbstractCharClass$LazyJavaTitleCase$1__init_0($this);
},
jur_PreviousMatch = $rt_classWithoutFields(jur_AbstractSet),
jur_PreviousMatch__init_ = $this => {
    jur_AbstractSet__init_($this);
},
jur_PreviousMatch__init_0 = () => {
    let var_0 = new jur_PreviousMatch();
    jur_PreviousMatch__init_(var_0);
    return var_0;
},
jur_PreviousMatch_matches = ($this, $stringIndex, $testString, $matchResult) => {
    if ($stringIndex != $matchResult.$getPreviousMatchEnd())
        return (-1);
    return $this.$next1.$matches($stringIndex, $testString, $matchResult);
},
jur_PreviousMatch_hasConsumed = ($this, $matchResult) => {
    return 0;
},
ao_Matrix = $rt_classWithoutFields(),
ao_Matrix_scaleM = (var$1, var$2, var$3, var$4, var$5) => {
    return;
},
ao_Matrix_setIdentityM = (var$1, var$2) => {
    return;
},
ao_Matrix_translateM = (var$1, var$2, var$3, var$4, var$5, var$6, var$7) => {
    return;
},
jur_NonCapFSet = $rt_classWithoutFields(jur_FSet),
jur_NonCapFSet__init_ = ($this, $groupIndex) => {
    jur_FSet__init_($this, $groupIndex);
},
jur_NonCapFSet__init_0 = var_0 => {
    let var_1 = new jur_NonCapFSet();
    jur_NonCapFSet__init_(var_1, var_0);
    return var_1;
},
jur_NonCapFSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $gr;
    $gr = $this.$getGroupIndex();
    $matchResult.$setConsumed($gr, $stringIndex - $matchResult.$getConsumed($gr) | 0);
    return $this.$next1.$matches($stringIndex, $testString, $matchResult);
},
jur_NonCapFSet_hasConsumed = ($this, $mr) => {
    return 0;
};
function jur_UCISupplCharSet() {
    jur_LeafSet.call(this);
    this.$ch4 = 0;
}
let jur_UCISupplCharSet__init_ = ($this, $ch) => {
    jur_LeafSet__init_($this);
    $this.$charCount0 = 2;
    $this.$ch4 = jl_Character_toLowerCase0(jl_Character_toUpperCase0($ch));
},
jur_UCISupplCharSet__init_0 = var_0 => {
    let var_1 = new jur_UCISupplCharSet();
    jur_UCISupplCharSet__init_(var_1, var_0);
    return var_1;
},
jur_UCISupplCharSet_accepts = ($this, $strIndex, $testString) => {
    let var$3, $high, $low;
    var$3 = $strIndex + 1 | 0;
    $high = $testString.$charAt($strIndex);
    $low = $testString.$charAt(var$3);
    return $this.$ch4 != jl_Character_toLowerCase0(jl_Character_toUpperCase0(jl_Character_toCodePoint($high, $low))) ? (-1) : 2;
},
jl_System = $rt_classWithoutFields(),
jl_System_outCache = null,
jl_System_properties = null,
jl_System_out = () => {
    if (jl_System_outCache === null)
        jl_System_outCache = otcic_JSStdoutPrintStream__init_0();
    return jl_System_outCache;
},
jl_System_arraycopy = ($src, $srcPos, $dest, $destPos, $length) => {
    let var$6, $srcType, $targetType, $srcArray, $i, var$11, var$12, $elem;
    if ($src !== null && $dest !== null) {
        if ($srcPos >= 0 && $destPos >= 0 && $length >= 0 && ($srcPos + $length | 0) <= jlr_Array_getLength($src)) {
            var$6 = $destPos + $length | 0;
            if (var$6 <= jlr_Array_getLength($dest)) {
                a: {
                    b: {
                        if ($src !== $dest) {
                            $srcType = jl_Class_getComponentType(jl_Object_getClass($src));
                            $targetType = jl_Class_getComponentType(jl_Object_getClass($dest));
                            if ($srcType !== null && $targetType !== null) {
                                if ($srcType === $targetType)
                                    break b;
                                if (!jl_Class_isPrimitive($srcType) && !jl_Class_isPrimitive($targetType)) {
                                    $srcArray = $src;
                                    $i = 0;
                                    var$6 = $srcPos;
                                    while ($i < $length) {
                                        var$11 = $srcArray.data;
                                        var$12 = var$6 + 1 | 0;
                                        $elem = var$11[var$6];
                                        if (!jl_Class_isInstance($targetType, $elem)) {
                                            jl_System_doArrayCopy($src, $srcPos, $dest, $destPos, $i);
                                            $rt_throw(jl_ArrayStoreException__init_());
                                        }
                                        $i = $i + 1 | 0;
                                        var$6 = var$12;
                                    }
                                    jl_System_doArrayCopy($src, $srcPos, $dest, $destPos, $length);
                                    return;
                                }
                                if (!jl_Class_isPrimitive($srcType))
                                    break a;
                                if (jl_Class_isPrimitive($targetType))
                                    break b;
                                else
                                    break a;
                            }
                            $rt_throw(jl_ArrayStoreException__init_());
                        }
                    }
                    jl_System_doArrayCopy($src, $srcPos, $dest, $destPos, $length);
                    return;
                }
                $rt_throw(jl_ArrayStoreException__init_());
            }
        }
        $rt_throw(jl_IndexOutOfBoundsException__init_());
    }
    $rt_throw(jl_NullPointerException__init_($rt_s(424)));
},
jl_System_fastArraycopy = ($src, $srcPos, $dest, $destPos, $length) => {
    let var$6;
    if ($srcPos >= 0 && $destPos >= 0 && $length >= 0 && ($srcPos + $length | 0) <= jlr_Array_getLength($src)) {
        var$6 = $destPos + $length | 0;
        if (var$6 <= jlr_Array_getLength($dest)) {
            jl_System_doArrayCopy($src, $srcPos, $dest, $destPos, $length);
            return;
        }
    }
    $rt_throw(jl_IndexOutOfBoundsException__init_());
},
jl_System_doArrayCopy = (var$1, var$2, var$3, var$4, var$5) => {
    if (var$5 !== 0) {
        if (typeof var$1.data.buffer !== 'undefined') {
            var$3.data.set(var$1.data.subarray(var$2, var$2 + var$5), var$4);
        } else if (var$1 !== var$3 || var$4 < var$2) {
            for (let i = 0;i < var$5;i = i + 1 | 0) {
                var$3.data[var$4++] = var$1.data[var$2++];
            }
        } else {
            var$2 = var$2 + var$5 | 0;
            var$4 = var$4 + var$5 | 0;
            for (let i = 0;i < var$5;i = i + 1 | 0) {
                var$3.data[ --var$4] = var$1.data[ --var$2];
            }
        }
    }
},
jl_System_currentTimeMillis = () => {
    return Long_fromNumber((new Date()).getTime());
},
jl_System_initPropertiesIfNeeded = () => {
    let var$1;
    if (jl_System_properties === null) {
        var$1 = ju_Properties__init_1();
        var$1.$put($rt_s(425), $rt_s(426));
        var$1.$put($rt_s(427), $rt_s(428));
        var$1.$put($rt_s(429), !(otrf_VirtualFileSystemProvider_getInstance()).$isWindows() ? $rt_s(371) : $rt_s(430));
        var$1.$put($rt_s(431), !(otrf_VirtualFileSystemProvider_getInstance()).$isWindows() ? $rt_s(432) : $rt_s(433));
        var$1.$put($rt_s(434), jl_System_lineSeparator());
        var$1.$put($rt_s(435), jl_System_getTempDir());
        var$1.$put($rt_s(436), $rt_s(426));
        var$1.$put($rt_s(437), jl_System_getHomeDir());
        jl_System_properties = ju_Properties__init_2(var$1);
    }
},
jl_System_getTempDir = () => {
    return $rt_s(438);
},
jl_System_getHomeDir = () => {
    return $rt_s(371);
},
jl_System_getProperty = $key => {
    jl_System_initPropertiesIfNeeded();
    return jl_System_properties.$getProperty($key);
},
jl_System_nanoTime = () => {
    return Long_fromNumber(performance.now() * 1000000.0);
},
jl_System_lineSeparator = () => {
    return $rt_s(268);
};
function jn_FloatBufferOverTypedArray() {
    let a = this; jn_FloatBufferImpl.call(a);
    a.$readOnly4 = 0;
    a.$data1 = null;
    a.$array2 = null;
}
let jn_FloatBufferOverTypedArray__init_0 = ($this, $position, $limit, $readOnly, $data, $array) => {
    jn_FloatBufferImpl__init_($this, $position, $limit);
    $this.$readOnly4 = $readOnly;
    $this.$data1 = $data;
    $this.$array2 = $array;
},
jn_FloatBufferOverTypedArray__init_ = (var_0, var_1, var_2, var_3, var_4) => {
    let var_5 = new jn_FloatBufferOverTypedArray();
    jn_FloatBufferOverTypedArray__init_0(var_5, var_0, var_1, var_2, var_3, var_4);
    return var_5;
},
jn_FloatBufferOverTypedArray_duplicate = ($this, $start, $capacity, $position, $limit, $readOnly) => {
    let var$6, var$7, $slice;
    var$6 = $this.$data1.buffer;
    var$7 = $this.$data1.byteOffset + ($start * 4 | 0) | 0;
    $slice = new Float32Array(var$6, var$7, $capacity);
    return jn_FloatBufferOverTypedArray__init_($position, $limit, $readOnly, $slice, $this.$array2);
},
jn_FloatBufferOverTypedArray_readOnly = $this => {
    return $this.$readOnly4;
},
jn_FloatBufferOverTypedArray_getElement = ($this, $index) => {
    return $this.$data1[$index];
},
jn_FloatBufferOverTypedArray_capacityImpl = $this => {
    return $this.$data1.length;
},
jn_FloatBufferOverTypedArray_putImpl = ($this, $index, $src, $offset, $length) => {
    let var$5, var$6, $slice;
    var$5 = $src.data.buffer;
    var$6 = $offset * 4 | 0;
    $slice = new Float32Array(var$5, var$6, $length);
    $this.$data1.set($slice, $index);
};
function jur_AbstractCharClass$LazyRange() {
    let a = this; jur_AbstractCharClass$LazyCharClass.call(a);
    a.$start4 = 0;
    a.$end2 = 0;
}
let jur_AbstractCharClass$LazyRange__init_0 = ($this, $start, $end) => {
    jur_AbstractCharClass$LazyCharClass__init_($this);
    $this.$start4 = $start;
    $this.$end2 = $end;
},
jur_AbstractCharClass$LazyRange__init_ = (var_0, var_1) => {
    let var_2 = new jur_AbstractCharClass$LazyRange();
    jur_AbstractCharClass$LazyRange__init_0(var_2, var_0, var_1);
    return var_2;
},
jur_AbstractCharClass$LazyRange_computeValue = $this => {
    let $chCl;
    $chCl = (jur_CharClass__init_()).$add1($this.$start4, $this.$end2);
    return $chCl;
},
jur_AbstractCharClass$LazyXDigit = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyXDigit__init_ = $this => {
    jur_AbstractCharClass$LazyCharClass__init_($this);
},
jur_AbstractCharClass$LazyXDigit__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazyXDigit();
    jur_AbstractCharClass$LazyXDigit__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyXDigit_computeValue = $this => {
    return (((jur_CharClass__init_()).$add1(48, 57)).$add1(97, 102)).$add1(65, 70);
};
function jur_Matcher() {
    let a = this; jl_Object.call(a);
    a.$pat = null;
    a.$start3 = null;
    a.$string0 = null;
    a.$matchResult = null;
    a.$leftBound = 0;
    a.$rightBound = 0;
}
let jur_Matcher_find = ($this, $start) => {
    let $stringLength, var$3;
    $stringLength = $this.$string0.$length();
    if ($start >= 0 && $start <= $stringLength) {
        var$3 = jur_Matcher_findAt($this, $start);
        if (var$3 >= 0 && $this.$matchResult.$isValid()) {
            $this.$matchResult.$finalizeMatch();
            return 1;
        }
        $this.$matchResult.$startIndex = (-1);
        return 0;
    }
    $rt_throw(jl_IndexOutOfBoundsException__init_1(jl_String_valueOf0($start)));
},
jur_Matcher_findAt = ($this, $startIndex) => {
    let $foundIndex;
    $this.$matchResult.$reset0();
    $this.$matchResult.$setMode(1);
    $this.$matchResult.$setStartIndex($startIndex);
    $foundIndex = $this.$start3.$find($startIndex, $this.$string0, $this.$matchResult);
    if ($foundIndex == (-1))
        $this.$matchResult.$hitEnd = 1;
    return $foundIndex;
},
jur_Matcher_find0 = $this => {
    let $length, var$2;
    $length = $this.$string0.$length();
    if (!jur_Matcher_hasTransparentBounds($this))
        $length = $this.$rightBound;
    if ($this.$matchResult.$startIndex >= 0 && $this.$matchResult.$mode() == 1) {
        $this.$matchResult.$startIndex = $this.$matchResult.$end0();
        if ($this.$matchResult.$end0() == $this.$matchResult.$start0()) {
            var$2 = $this.$matchResult;
            var$2.$startIndex = var$2.$startIndex + 1 | 0;
        }
        return $this.$matchResult.$startIndex <= $length && jur_Matcher_find($this, $this.$matchResult.$startIndex) ? 1 : 0;
    }
    return jur_Matcher_find($this, $this.$leftBound);
},
jur_Matcher_start0 = ($this, $group) => {
    return $this.$matchResult.$start($group);
},
jur_Matcher_end = ($this, $group) => {
    return $this.$matchResult.$end($group);
},
jur_Matcher_start = $this => {
    return jur_Matcher_start0($this, 0);
},
jur_Matcher_end0 = $this => {
    return jur_Matcher_end($this, 0);
},
jur_Matcher_hasTransparentBounds = $this => {
    return $this.$matchResult.$hasTransparentBounds();
},
jur_Matcher__init_ = ($this, $pat, $cs) => {
    let var$3, var$4, var$5, var$6, var$7;
    jl_Object__init_($this);
    $this.$leftBound = (-1);
    $this.$rightBound = (-1);
    $this.$pat = $pat;
    $this.$start3 = $pat.$start1;
    $this.$string0 = $cs;
    $this.$leftBound = 0;
    $this.$rightBound = $this.$string0.$length();
    var$3 = new jur_MatchResultImpl;
    var$4 = $this.$leftBound;
    var$5 = $this.$rightBound;
    var$6 = jur_Pattern_groupCount($pat);
    var$7 = jur_Pattern_compCount($pat);
    jur_MatchResultImpl__init_(var$3, $cs, var$4, var$5, var$6, var$7, jur_Pattern_consCount($pat), jur_Pattern_namedGroups($pat));
    $this.$matchResult = var$3;
    $this.$matchResult.$useAnchoringBounds(1);
},
jur_Matcher__init_0 = (var_0, var_1) => {
    let var_2 = new jur_Matcher();
    jur_Matcher__init_(var_2, var_0, var_1);
    return var_2;
},
jur_DotAllSet = $rt_classWithoutFields(jur_JointSet),
jur_DotAllSet__init_ = $this => {
    jur_JointSet__init_($this);
},
jur_DotAllSet__init_0 = () => {
    let var_0 = new jur_DotAllSet();
    jur_DotAllSet__init_(var_0);
    return var_0;
},
jur_DotAllSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $strLength, var$5, $high, var$7, $low;
    $strLength = $matchResult.$getRightBound();
    var$5 = $stringIndex + 1 | 0;
    if (var$5 > $strLength) {
        $matchResult.$hitEnd = 1;
        return (-1);
    }
    $high = $testString.$charAt($stringIndex);
    if (jl_Character_isHighSurrogate($high)) {
        var$7 = $stringIndex + 2 | 0;
        if (var$7 <= $strLength) {
            $low = $testString.$charAt(var$5);
            if (jl_Character_isSurrogatePair($high, $low))
                return $this.$next1.$matches(var$7, $testString, $matchResult);
        }
    }
    return $this.$next1.$matches(var$5, $testString, $matchResult);
},
jur_DotAllSet_setNext = ($this, $next) => {
    $this.$next1 = $next;
},
jur_DotAllSet_getType = $this => {
    return (-2147483602);
},
jur_DotAllSet_hasConsumed = ($this, $matchResult) => {
    return 1;
};
function jur_AbstractCharClass$LazyJavaLowerCase$1() {
    jur_AbstractCharClass.call(this);
    this.$this$034 = null;
}
let jur_AbstractCharClass$LazyJavaLowerCase$1__init_ = ($this, $this$0) => {
    $this.$this$034 = $this$0;
    jur_AbstractCharClass__init_($this);
},
jur_AbstractCharClass$LazyJavaLowerCase$1__init_0 = var_0 => {
    let var_1 = new jur_AbstractCharClass$LazyJavaLowerCase$1();
    jur_AbstractCharClass$LazyJavaLowerCase$1__init_(var_1, var_0);
    return var_1;
},
jur_AbstractCharClass$LazyJavaLowerCase$1_contains = ($this, $ch) => {
    return jl_Character_isLowerCase($ch);
};
function jn_FloatBufferOverDataView() {
    let a = this; jn_FloatBufferImpl.call(a);
    a.$readOnly3 = 0;
    a.$data3 = null;
    a.$littleEndian0 = 0;
}
let jn_FloatBufferOverDataView__init_ = ($this, $position, $limit, $readOnly, $data, $littleEndian) => {
    jn_FloatBufferImpl__init_($this, $position, $limit);
    $this.$readOnly3 = $readOnly;
    $this.$data3 = $data;
    $this.$littleEndian0 = $littleEndian;
},
jn_FloatBufferOverDataView__init_0 = (var_0, var_1, var_2, var_3, var_4) => {
    let var_5 = new jn_FloatBufferOverDataView();
    jn_FloatBufferOverDataView__init_(var_5, var_0, var_1, var_2, var_3, var_4);
    return var_5;
},
jn_FloatBufferOverDataView_duplicate = ($this, $start, $capacity, $position, $limit, $readOnly) => {
    let var$6, var$7, var$8, $slice;
    var$6 = $this.$data3.buffer;
    var$7 = $this.$data3.byteOffset + ($start * 4 | 0) | 0;
    var$8 = $capacity * 4 | 0;
    $slice = new DataView(var$6, var$7, var$8);
    return jn_FloatBufferOverDataView__init_0($position, $limit, $readOnly, $slice, $this.$littleEndian0);
},
jn_FloatBufferOverDataView_readOnly = $this => {
    return $this.$readOnly3;
},
jn_FloatBufferOverDataView_getElement = ($this, $index) => {
    return $this.$data3.getFloat32($index * 4 | 0, !!$this.$littleEndian0);
},
jn_FloatBufferOverDataView_putImpl = ($this, $index, $src, $offset, $length) => {
    let var$5, var$6, var$7, var$8, var$9, var$10, var$11;
    var$5 = $index * 4 | 0;
    while (true) {
        var$6 = $length + (-1) | 0;
        if ($length <= 0)
            break;
        var$7 = $src.data;
        var$8 = $this.$data3;
        var$9 = $offset + 1 | 0;
        var$10 = var$7[$offset];
        var$11 = $this.$littleEndian0;
        var$8.setFloat32(var$5, var$10, !!var$11);
        var$5 = var$5 + 4 | 0;
        $length = var$6;
        $offset = var$9;
    }
},
jn_FloatBufferOverDataView_capacityImpl = $this => {
    return $this.$data3.byteLength / 4 | 0;
};
function jl_Object$monitorExit$lambda$_8_1() {
    jl_Object.call(this);
    this.$_0 = null;
}
let jl_Object$monitorExit$lambda$_8_1__init_ = (var$0, var$1) => {
    jl_Object__init_(var$0);
    var$0.$_0 = var$1;
},
jl_Object$monitorExit$lambda$_8_1__init_0 = var_0 => {
    let var_1 = new jl_Object$monitorExit$lambda$_8_1();
    jl_Object$monitorExit$lambda$_8_1__init_(var_1, var_0);
    return var_1;
},
jl_Object$monitorExit$lambda$_8_1_run = var$0 => {
    jl_Object_lambda$monitorExit$2(var$0.$_0);
},
jur_UCISupplRangeSet = $rt_classWithoutFields(jur_SupplRangeSet),
jur_UCISupplRangeSet__init_0 = ($this, $cc) => {
    jur_SupplRangeSet__init_($this, $cc);
},
jur_UCISupplRangeSet__init_ = var_0 => {
    let var_1 = new jur_UCISupplRangeSet();
    jur_UCISupplRangeSet__init_0(var_1, var_0);
    return var_1;
},
jur_UCISupplRangeSet_contains = ($this, $ch) => {
    return $this.$chars.$contains(jl_Character_toLowerCase0(jl_Character_toUpperCase0($ch)));
},
jur_AbstractCharClass$LazyJavaUpperCase = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyJavaUpperCase__init_ = $this => {
    jur_AbstractCharClass$LazyCharClass__init_($this);
},
jur_AbstractCharClass$LazyJavaUpperCase__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazyJavaUpperCase();
    jur_AbstractCharClass$LazyJavaUpperCase__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyJavaUpperCase_computeValue = $this => {
    let $chCl;
    $chCl = jur_AbstractCharClass$LazyJavaUpperCase$1__init_0($this);
    $chCl.$mayContainSupplCodepoints0 = 1;
    return $chCl;
};
function jur_HangulDecomposedCharSet() {
    let a = this; jur_JointSet.call(a);
    a.$decomposedChar = null;
    a.$decomposedCharUTF16 = null;
    a.$decomposedCharLength = 0;
}
let jur_HangulDecomposedCharSet__init_ = ($this, $decomposedChar, $decomposedCharLength) => {
    jur_JointSet__init_($this);
    $this.$decomposedChar = $decomposedChar;
    $this.$decomposedCharLength = $decomposedCharLength;
},
jur_HangulDecomposedCharSet__init_0 = (var_0, var_1) => {
    let var_2 = new jur_HangulDecomposedCharSet();
    jur_HangulDecomposedCharSet__init_(var_2, var_0, var_1);
    return var_2;
},
jur_HangulDecomposedCharSet_setNext = ($this, $next) => {
    $this.$next1 = $next;
},
jur_HangulDecomposedCharSet_getDecomposedChar = $this => {
    if ($this.$decomposedCharUTF16 === null)
        $this.$decomposedCharUTF16 = jl_String__init_($this.$decomposedChar);
    return $this.$decomposedCharUTF16;
},
jur_HangulDecomposedCharSet_matches = ($this, $strIndex, $testString, $matchResult) => {
    let $rightBound, $syllIndex, $decompSyllable, $vIndex, $tIndex, var$9, $curSymb, $decompCurSymb, var$12, $i, var$14, $lIndex, var$16, var$17;
    $rightBound = $matchResult.$getRightBound();
    $syllIndex = 0;
    $decompSyllable = $rt_createIntArray(3);
    $vIndex = (-1);
    $tIndex = (-1);
    if ($strIndex >= $rightBound)
        return (-1);
    var$9 = $strIndex + 1 | 0;
    $curSymb = $testString.$charAt($strIndex);
    $decompCurSymb = jur_Lexer_getHangulDecomposition($curSymb);
    if ($decompCurSymb !== null) {
        var$12 = $decompCurSymb.data;
        $i = 0;
        if (var$12.length != $this.$decomposedCharLength)
            return (-1);
        while (true) {
            if ($i >= $this.$decomposedCharLength)
                return $this.$next1.$matches(var$9, $testString, $matchResult);
            if (var$12[$i] != $this.$decomposedChar.data[$i])
                break;
            $i = $i + 1 | 0;
        }
        return (-1);
    }
    var$14 = $decompSyllable.data;
    var$14[$syllIndex] = $curSymb;
    $lIndex = $curSymb - 4352 | 0;
    if ($lIndex >= 0 && $lIndex < 19) {
        if (var$9 < $rightBound) {
            $curSymb = $testString.$charAt(var$9);
            $vIndex = $curSymb - 4449 | 0;
        }
        if ($vIndex >= 0 && $vIndex < 21) {
            var$16 = var$9 + 1 | 0;
            var$14[1] = $curSymb;
            if (var$16 < $rightBound) {
                $curSymb = $testString.$charAt(var$16);
                $tIndex = $curSymb - 4519 | 0;
            }
            if ($tIndex >= 0 && $tIndex < 28) {
                var$17 = var$16 + 1 | 0;
                var$14[2] = $curSymb;
                var$17 = $this.$decomposedCharLength == 3 && var$14[0] == $this.$decomposedChar.data[0] && var$14[1] == $this.$decomposedChar.data[1] && var$14[2] == $this.$decomposedChar.data[2] ? $this.$next1.$matches(var$17, $testString, $matchResult) : (-1);
                return var$17;
            }
            var$17 = $this.$decomposedCharLength == 2 && var$14[0] == $this.$decomposedChar.data[0] && var$14[1] == $this.$decomposedChar.data[1] ? $this.$next1.$matches(var$16, $testString, $matchResult) : (-1);
            return var$17;
        }
        return (-1);
    }
    return (-1);
},
jur_HangulDecomposedCharSet_first = ($this, $set) => {
    let var$2, var$3;
    a: {
        if ($set instanceof jur_HangulDecomposedCharSet) {
            var$2 = $set;
            if (!(jur_HangulDecomposedCharSet_getDecomposedChar(var$2)).$equals(jur_HangulDecomposedCharSet_getDecomposedChar($this))) {
                var$3 = 0;
                break a;
            }
        }
        var$3 = 1;
    }
    return var$3;
},
jur_HangulDecomposedCharSet_hasConsumed = ($this, $matchResult) => {
    return 1;
},
jur_AbstractCharClass$LazyPunct = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyPunct__init_ = $this => {
    jur_AbstractCharClass$LazyCharClass__init_($this);
},
jur_AbstractCharClass$LazyPunct__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazyPunct();
    jur_AbstractCharClass$LazyPunct__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyPunct_computeValue = $this => {
    return (((jur_CharClass__init_()).$add1(33, 64)).$add1(91, 96)).$add1(123, 126);
};
function jur_WordBoundary() {
    jur_AbstractSet.call(this);
    this.$positive = 0;
}
let jur_WordBoundary__init_0 = ($this, $positive) => {
    jur_AbstractSet__init_($this);
    $this.$positive = $positive;
},
jur_WordBoundary__init_ = var_0 => {
    let var_1 = new jur_WordBoundary();
    jur_WordBoundary__init_0(var_1, var_0);
    return var_1;
},
jur_WordBoundary_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $ch1, $ch2, $leftBound, $left, $right;
    $ch1 = $stringIndex < $matchResult.$getRightBound() ? $testString.$charAt($stringIndex) : 32;
    $ch2 = !$stringIndex ? 32 : $testString.$charAt($stringIndex - 1 | 0);
    $leftBound = !$matchResult.$hasTransparentBounds() ? $matchResult.$getLeftBound() : 0;
    $left = $ch1 != 32 && !jur_WordBoundary_isSpace($this, $ch1, $stringIndex, $leftBound, $testString) ? 0 : 1;
    $right = $ch2 != 32 && !jur_WordBoundary_isSpace($this, $ch2, $stringIndex - 1 | 0, $leftBound, $testString) ? 0 : 1;
    return $left ^ $right ^ $this.$positive ? (-1) : $this.$next1.$matches($stringIndex, $testString, $matchResult);
},
jur_WordBoundary_hasConsumed = ($this, $matchResult) => {
    return 0;
},
jur_WordBoundary_isSpace = ($this, $ch, $index, $leftBound, $testString) => {
    let var$5;
    if (!jl_Character_isLetterOrDigit0($ch) && $ch != 95) {
        a: {
            if (jl_Character_getType0($ch) == 6)
                while (true) {
                    $index = $index + (-1) | 0;
                    if ($index < $leftBound)
                        break a;
                    var$5 = $testString.$charAt($index);
                    if (jl_Character_isLetterOrDigit0(var$5))
                        return 0;
                    if (jl_Character_getType0(var$5) != 6)
                        return 1;
                }
        }
        return 1;
    }
    return 0;
},
jur_AbstractCharClass$LazySpace = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazySpace__init_ = $this => {
    jur_AbstractCharClass$LazyCharClass__init_($this);
},
jur_AbstractCharClass$LazySpace__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazySpace();
    jur_AbstractCharClass$LazySpace__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazySpace_computeValue = $this => {
    return ((jur_CharClass__init_()).$add1(9, 13)).$add0(32);
},
otrf_VirtualFileSystemProvider = $rt_classWithoutFields(),
otrf_VirtualFileSystemProvider_instance = null,
otrf_VirtualFileSystemProvider_getInstance = () => {
    if (otrf_VirtualFileSystemProvider_instance === null)
        otrf_VirtualFileSystemProvider_instance = otrf_VirtualFileSystemProvider_create();
    return otrf_VirtualFileSystemProvider_instance;
},
otrf_VirtualFileSystemProvider_create = () => {
    return otrfm_InMemoryVirtualFileSystem__init_0();
},
jl_Double = $rt_classWithoutFields(jl_Number),
jl_Double_TYPE = null,
jl_Double_$callClinit = () => {
    jl_Double_$callClinit = $rt_eraseClinit(jl_Double);
    jl_Double__clinit_();
},
jl_Double_isInfinite = $v => {
    jl_Double_$callClinit();
    return !(isFinite($v) ? 1 : 0) && !(isNaN($v) ? 1 : 0) ? 1 : 0;
},
jl_Double_doubleToLongBits = $value => {
    jl_Double_$callClinit();
    if (!(isNaN($value) ? 1 : 0))
        return $rt_doubleToRawLongBits($value);
    return Long_create(0, 2146959360);
},
jl_Double__clinit_ = () => {
    jl_Double_TYPE = $rt_cls($rt_doublecls);
};
function ccrg_SettingsEngine() {
    let a = this; jl_Object.call(a);
    a.$batterySaving = 0;
    a.$highRefreshRate = 0;
}
function jlr_ReferenceQueue() {
    let a = this; jl_Object.call(a);
    a.$inner = null;
    a.$registry = null;
}
let jlr_ReferenceQueue__init_ = var$0 => {
    var$0.$inner = [];
},
jlr_ReferenceQueue__init_0 = () => {
    let var_0 = new jlr_ReferenceQueue();
    jlr_ReferenceQueue__init_(var_0);
    return var_0;
},
jur_IntHash = $rt_classWithoutFields(),
ccrgm_fk = $rt_classWithoutFields(),
ccrgm_fk_a0 = 0,
ccrgm_fk_e = null,
ccrgm_fk_h = null,
ccrgm_fk_i = null,
ccrgm_fk_j = null,
ccrgm_fk_$callClinit = () => {
    ccrgm_fk_$callClinit = $rt_eraseClinit(ccrgm_fk);
    ccrgm_fk__clinit_();
},
ccrgm_fk__clinit_ = () => {
    ccrgm_fk_a0 = (-1);
    ccrgm_fk_e = ag_Rect__init_();
    ccrgm_fk_h = ag_Rect__init_();
    ccrgm_fk_i = ag_Rect__init_();
    ccrgm_fk_j = ag_RectF__init_();
},
ccrgm_fk_a = var$1 => {
    ccrgm_fk_$callClinit();
    return var$1.$b2();
},
jur_ReluctantAltQuantifierSet = $rt_classWithoutFields(jur_AltQuantifierSet),
jur_ReluctantAltQuantifierSet__init_ = ($this, $innerSet, $next, $type) => {
    jur_AltQuantifierSet__init_($this, $innerSet, $next, $type);
},
jur_ReluctantAltQuantifierSet__init_0 = (var_0, var_1, var_2) => {
    let var_3 = new jur_ReluctantAltQuantifierSet();
    jur_ReluctantAltQuantifierSet__init_(var_3, var_0, var_1, var_2);
    return var_3;
},
jur_ReluctantAltQuantifierSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $shift;
    $shift = $this.$next1.$matches($stringIndex, $testString, $matchResult);
    if ($shift >= 0)
        return $shift;
    return $this.$innerSet.$matches($stringIndex, $testString, $matchResult);
},
jl_NegativeArraySizeException = $rt_classWithoutFields(jl_RuntimeException),
jl_NegativeArraySizeException__init_ = $this => {
    jl_RuntimeException__init_($this);
},
jl_NegativeArraySizeException__init_0 = () => {
    let var_0 = new jl_NegativeArraySizeException();
    jl_NegativeArraySizeException__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyJavaWhitespace = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyJavaWhitespace__init_ = $this => {
    jur_AbstractCharClass$LazyCharClass__init_($this);
},
jur_AbstractCharClass$LazyJavaWhitespace__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazyJavaWhitespace();
    jur_AbstractCharClass$LazyJavaWhitespace__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyJavaWhitespace_computeValue = $this => {
    return jur_AbstractCharClass$LazyJavaWhitespace$1__init_0($this);
},
jl_NumberFormatException = $rt_classWithoutFields(jl_IllegalArgumentException),
jl_NumberFormatException__init_1 = $this => {
    jl_IllegalArgumentException__init_1($this);
},
jl_NumberFormatException__init_2 = () => {
    let var_0 = new jl_NumberFormatException();
    jl_NumberFormatException__init_1(var_0);
    return var_0;
},
jl_NumberFormatException__init_ = ($this, $message) => {
    jl_IllegalArgumentException__init_0($this, $message);
},
jl_NumberFormatException__init_0 = var_0 => {
    let var_1 = new jl_NumberFormatException();
    jl_NumberFormatException__init_(var_1, var_0);
    return var_1;
},
ccra_RWApplication = $rt_classWithoutFields(aa_Application),
jur_IntArrHash = $rt_classWithoutFields(),
jur_AbstractCharClass$LazyJavaMirrored = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyJavaMirrored__init_ = $this => {
    jur_AbstractCharClass$LazyCharClass__init_($this);
},
jur_AbstractCharClass$LazyJavaMirrored__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazyJavaMirrored();
    jur_AbstractCharClass$LazyJavaMirrored__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyJavaMirrored_computeValue = $this => {
    return jur_AbstractCharClass$LazyJavaMirrored$1__init_0($this);
},
jur_AbstractCharClass$LazyJavaISOControl = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyJavaISOControl__init_ = $this => {
    jur_AbstractCharClass$LazyCharClass__init_($this);
},
jur_AbstractCharClass$LazyJavaISOControl__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazyJavaISOControl();
    jur_AbstractCharClass$LazyJavaISOControl__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyJavaISOControl_computeValue = $this => {
    return jur_AbstractCharClass$LazyJavaISOControl$1__init_0($this);
},
jl_IllegalStateException = $rt_classWithoutFields(jl_RuntimeException),
jl_IllegalStateException__init_1 = $this => {
    jl_RuntimeException__init_($this);
},
jl_IllegalStateException__init_0 = () => {
    let var_0 = new jl_IllegalStateException();
    jl_IllegalStateException__init_1(var_0);
    return var_0;
},
jl_IllegalStateException__init_ = ($this, $message) => {
    jl_RuntimeException__init_0($this, $message);
},
jl_IllegalStateException__init_2 = var_0 => {
    let var_1 = new jl_IllegalStateException();
    jl_IllegalStateException__init_(var_1, var_0);
    return var_1;
};
function jur_HighSurrogateCharSet() {
    jur_JointSet.call(this);
    this.$high = 0;
}
let jur_HighSurrogateCharSet__init_ = ($this, $high) => {
    jur_JointSet__init_($this);
    $this.$high = $high;
},
jur_HighSurrogateCharSet__init_0 = var_0 => {
    let var_1 = new jur_HighSurrogateCharSet();
    jur_HighSurrogateCharSet__init_(var_1, var_0);
    return var_1;
},
jur_HighSurrogateCharSet_setNext = ($this, $next) => {
    $this.$next1 = $next;
},
jur_HighSurrogateCharSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $strLength, var$5, var$6, $high, $low;
    $strLength = $matchResult.$getRightBound();
    var$5 = $stringIndex + 1 | 0;
    var$6 = $rt_compare(var$5, $strLength);
    if (var$6 > 0) {
        $matchResult.$hitEnd = 1;
        return (-1);
    }
    $high = $testString.$charAt($stringIndex);
    if (var$6 < 0) {
        $low = $testString.$charAt(var$5);
        if (jl_Character_isLowSurrogate($low))
            return (-1);
    }
    if ($this.$high != $high)
        return (-1);
    return $this.$next1.$matches(var$5, $testString, $matchResult);
},
jur_HighSurrogateCharSet_find = ($this, $strIndex, $testString, $matchResult) => {
    let $testStr, $strLength, var$6;
    if (!($testString instanceof jl_String))
        return jur_AbstractSet_find($this, $strIndex, $testString, $matchResult);
    $testStr = $testString;
    $strLength = $matchResult.$getRightBound();
    while (true) {
        if ($strIndex >= $strLength)
            return (-1);
        var$6 = $testStr.$indexOf1($this.$high, $strIndex);
        if (var$6 < 0)
            return (-1);
        $strIndex = var$6 + 1 | 0;
        if ($strIndex < $strLength && jl_Character_isLowSurrogate($testStr.$charAt($strIndex))) {
            $strIndex = var$6 + 2 | 0;
            continue;
        }
        if ($this.$next1.$matches($strIndex, $testString, $matchResult) >= 0)
            break;
    }
    return var$6;
},
jur_HighSurrogateCharSet_findBack = ($this, $strIndex, $lastIndex, $testString, $matchResult) => {
    let $testStr, $strLength, var$7, var$8;
    if (!($testString instanceof jl_String))
        return jur_AbstractSet_findBack($this, $strIndex, $lastIndex, $testString, $matchResult);
    $testStr = $testString;
    $strLength = $matchResult.$getRightBound();
    a: {
        while (true) {
            if ($lastIndex < $strIndex)
                return (-1);
            var$7 = $testStr.$lastIndexOf2($this.$high, $lastIndex);
            if (var$7 < 0)
                break a;
            if (var$7 < $strIndex)
                break a;
            var$8 = var$7 + 1 | 0;
            if (var$8 < $strLength && jl_Character_isLowSurrogate($testStr.$charAt(var$8))) {
                $lastIndex = var$7 + (-1) | 0;
                continue;
            }
            if ($this.$next1.$matches(var$8, $testString, $matchResult) >= 0)
                break;
            $lastIndex = var$7 + (-1) | 0;
        }
        return var$7;
    }
    return (-1);
},
jur_HighSurrogateCharSet_first = ($this, $set) => {
    if ($set instanceof jur_CharSet)
        return 0;
    if ($set instanceof jur_RangeSet)
        return 0;
    if ($set instanceof jur_SupplRangeSet)
        return 0;
    if ($set instanceof jur_SupplCharSet)
        return 0;
    if ($set instanceof jur_LowSurrogateCharSet)
        return 0;
    if (!($set instanceof jur_HighSurrogateCharSet))
        return 1;
    return $set.$high != $this.$high ? 0 : 1;
},
jur_HighSurrogateCharSet_hasConsumed = ($this, $matchResult) => {
    return 1;
},
jur_ReluctantCompositeQuantifierSet = $rt_classWithoutFields(jur_CompositeQuantifierSet),
jur_ReluctantCompositeQuantifierSet__init_ = ($this, $quant, $innerSet, $next, $type) => {
    jur_CompositeQuantifierSet__init_($this, $quant, $innerSet, $next, $type);
},
jur_ReluctantCompositeQuantifierSet__init_0 = (var_0, var_1, var_2, var_3) => {
    let var_4 = new jur_ReluctantCompositeQuantifierSet();
    jur_ReluctantCompositeQuantifierSet__init_(var_4, var_0, var_1, var_2, var_3);
    return var_4;
},
jur_ReluctantCompositeQuantifierSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $min, $max, $i, var$7, var$8;
    $min = $this.$quantifier.$min0();
    $max = $this.$quantifier.$max1();
    $i = 0;
    while (true) {
        if ($i >= $min) {
            a: {
                while (true) {
                    var$7 = $this.$next1.$matches($stringIndex, $testString, $matchResult);
                    if (var$7 >= 0)
                        break;
                    if (($stringIndex + $this.$leaf.$charCount() | 0) <= $matchResult.$getRightBound()) {
                        var$7 = $this.$leaf.$accepts($stringIndex, $testString);
                        $stringIndex = $stringIndex + var$7 | 0;
                        $i = $i + 1 | 0;
                    }
                    if (var$7 < 1)
                        break a;
                    if ($i > $max)
                        break a;
                }
                return var$7;
            }
            return (-1);
        }
        if (($stringIndex + $this.$leaf.$charCount() | 0) > $matchResult.$getRightBound()) {
            $matchResult.$hitEnd = 1;
            return (-1);
        }
        var$8 = $this.$leaf.$accepts($stringIndex, $testString);
        if (var$8 < 1)
            break;
        $stringIndex = $stringIndex + var$8 | 0;
        $i = $i + 1 | 0;
    }
    return (-1);
},
av_View = $rt_classWithoutFields(),
ccra_GameViewNonSurface = $rt_classWithoutFields(av_View);
function jn_ByteBuffer() {
    jn_Buffer.call(this);
    this.$order0 = null;
}
let jn_ByteBuffer__init_ = $this => {
    jn_Buffer__init_($this);
    jn_ByteOrder_$callClinit();
    $this.$order0 = jn_ByteOrder_BIG_ENDIAN;
},
jn_ByteBuffer_allocateDirect = $capacity => {
    let var$2, var$3, $result;
    if ($capacity < 0) {
        var$2 = new jl_IllegalArgumentException;
        var$3 = jl_StringBuilder__init_();
        jl_StringBuilder_append0(jl_StringBuilder_append(var$3, $rt_s(370)), $capacity);
        jl_IllegalArgumentException__init_0(var$2, jl_StringBuilder_toString(var$3));
        $rt_throw(var$2);
    }
    $result = jn_ByteBufferJsImpl__init_0(null, 0, new Int8Array($capacity), 1, 0);
    $result.$limit = $capacity;
    return $result;
},
jn_ByteBuffer_order = ($this, $bo) => {
    $this.$order0 = $bo;
    $this.$onOrderChanged();
    return $this;
},
jn_ByteBuffer_onOrderChanged = $this => {
    return;
},
jur_SOLSet = $rt_classWithoutFields(jur_AbstractSet),
jur_SOLSet__init_ = $this => {
    jur_AbstractSet__init_($this);
},
jur_SOLSet__init_0 = () => {
    let var_0 = new jur_SOLSet();
    jur_SOLSet__init_(var_0);
    return var_0;
},
jur_SOLSet_matches = ($this, $strIndex, $testString, $matchResult) => {
    if ($strIndex && !($matchResult.$hasAnchoringBounds() && $strIndex == $matchResult.$getLeftBound()))
        return (-1);
    return $this.$next1.$matches($strIndex, $testString, $matchResult);
},
jur_SOLSet_hasConsumed = ($this, $matchResult) => {
    return 0;
};
function otpp_AsyncCallbackWrapper() {
    jl_Object.call(this);
    this.$realAsyncCallback = null;
}
let otpp_AsyncCallbackWrapper__init_ = ($this, $realAsyncCallback) => {
    jl_Object__init_($this);
    $this.$realAsyncCallback = $realAsyncCallback;
},
otpp_AsyncCallbackWrapper__init_0 = var_0 => {
    let var_1 = new otpp_AsyncCallbackWrapper();
    otpp_AsyncCallbackWrapper__init_(var_1, var_0);
    return var_1;
},
otpp_AsyncCallbackWrapper_create = $realAsyncCallback => {
    return otpp_AsyncCallbackWrapper__init_0($realAsyncCallback);
},
otpp_AsyncCallbackWrapper_complete = ($this, $result) => {
    $this.$realAsyncCallback.$complete($result);
},
otpp_AsyncCallbackWrapper_error = ($this, $e) => {
    $this.$realAsyncCallback.$error($e);
};
function jl_Byte() {
    jl_Number.call(this);
    this.$value1 = 0;
}
let jl_Byte_TYPE = null,
jl_Byte_byteCache = null,
jl_Byte_$callClinit = () => {
    jl_Byte_$callClinit = $rt_eraseClinit(jl_Byte);
    jl_Byte__clinit_();
},
jl_Byte__init_ = ($this, $value) => {
    jl_Byte_$callClinit();
    jl_Number__init_($this);
    $this.$value1 = $value;
},
jl_Byte__init_0 = var_0 => {
    let var_1 = new jl_Byte();
    jl_Byte__init_(var_1, var_0);
    return var_1;
},
jl_Byte_byteValue = $this => {
    return $this.$value1;
},
jl_Byte_valueOf = $i => {
    jl_Byte_$callClinit();
    return jl_Byte_byteCache.data[$i + 128 | 0];
},
jl_Byte_ensureByteCache = () => {
    let $byteCache, $j, var$3;
    jl_Byte_$callClinit();
    $byteCache = $rt_createArray(jl_Byte, 256);
    $j = 0;
    while (true) {
        var$3 = $byteCache.data;
        if ($j >= var$3.length)
            break;
        var$3[$j] = jl_Byte__init_0(($j - 128 | 0) << 24 >> 24);
        $j = $j + 1 | 0;
    }
    return $byteCache;
},
jl_Byte__clinit_ = () => {
    jl_Byte_TYPE = $rt_cls($rt_bytecls);
    jl_Byte_byteCache = jl_Byte_ensureByteCache();
};
function ccrgu_p() {
    let a = this; ju_AbstractList.call(a);
    a.$a40 = 0;
    a.$b10 = null;
}
let ccrgu_p__init_0 = var$0 => {
    ju_AbstractList__init_(var$0);
    ccrgu_aa_$callClinit();
    var$0.$b10 = ccrgu_aa_g;
},
ccrgu_p__init_ = () => {
    let var_0 = new ccrgu_p();
    ccrgu_p__init_0(var_0);
    return var_0;
},
ccrgu_p_add = (var$0, var$1) => {
    let var$2, var$3, var$4;
    var$2 = var$0.$b10;
    var$3 = var$2.data;
    var$4 = var$0.$a40;
    if (var$4 == var$3.length) {
        var$3 = $rt_createArray(jl_Object, (var$4 < 6 ? 12 : var$4 >> 1) + var$4 | 0);
        jl_System_fastArraycopy(var$2, 0, var$3, 0, var$4);
        var$0.$b10 = var$3;
        var$2 = var$3;
    }
    var$2.data[var$4] = var$1;
    var$0.$a40 = var$4 + 1 | 0;
    var$0.$modCount = var$0.$modCount + 1 | 0;
    return 1;
},
ag_Typeface = $rt_classWithoutFields(),
jur_AbstractCharClass$LazyJavaIdentifierIgnorable = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyJavaIdentifierIgnorable__init_ = $this => {
    jur_AbstractCharClass$LazyCharClass__init_($this);
},
jur_AbstractCharClass$LazyJavaIdentifierIgnorable__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazyJavaIdentifierIgnorable();
    jur_AbstractCharClass$LazyJavaIdentifierIgnorable__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyJavaIdentifierIgnorable_computeValue = $this => {
    let $chCl;
    $chCl = jur_AbstractCharClass$LazyJavaIdentifierIgnorable$1__init_0($this);
    $chCl.$mayContainSupplCodepoints0 = 1;
    return $chCl;
};
function jur_UMultiLineEOLSet() {
    jur_AbstractSet.call(this);
    this.$consCounter2 = 0;
}
let jur_UMultiLineEOLSet__init_ = ($this, $counter) => {
    jur_AbstractSet__init_($this);
    $this.$consCounter2 = $counter;
},
jur_UMultiLineEOLSet__init_0 = var_0 => {
    let var_1 = new jur_UMultiLineEOLSet();
    jur_UMultiLineEOLSet__init_(var_1, var_0);
    return var_1;
},
jur_UMultiLineEOLSet_matches = ($this, $strIndex, $testString, $matchResult) => {
    let $strDif;
    $strDif = !$matchResult.$hasAnchoringBounds() ? $testString.$length() - $strIndex | 0 : $matchResult.$getRightBound() - $strIndex | 0;
    if ($strDif <= 0) {
        $matchResult.$setConsumed($this.$consCounter2, 0);
        return $this.$next1.$matches($strIndex, $testString, $matchResult);
    }
    if ($testString.$charAt($strIndex) != 10)
        return (-1);
    $matchResult.$setConsumed($this.$consCounter2, 1);
    return $this.$next1.$matches($strIndex + 1 | 0, $testString, $matchResult);
},
jur_UMultiLineEOLSet_hasConsumed = ($this, $matchResult) => {
    let $res;
    $res = !$matchResult.$getConsumed($this.$consCounter2) ? 0 : 1;
    $matchResult.$setConsumed($this.$consCounter2, (-1));
    return $res;
};
function jn_ByteBufferJsImpl() {
    let a = this; jn_ByteBuffer.call(a);
    a.$array3 = null;
    a.$arrayOffset = 0;
    a.$data0 = null;
    a.$direct = 0;
    a.$readOnly0 = 0;
}
let jn_ByteBufferJsImpl__init_ = ($this, $array, $arrayOffset, $data, $direct, $readOnly) => {
    jn_ByteBuffer__init_($this);
    $this.$array3 = $array;
    $this.$arrayOffset = $arrayOffset;
    $this.$data0 = $data;
    $this.$direct = $direct;
    $this.$readOnly0 = $readOnly;
},
jn_ByteBufferJsImpl__init_0 = (var_0, var_1, var_2, var_3, var_4) => {
    let var_5 = new jn_ByteBufferJsImpl();
    jn_ByteBufferJsImpl__init_(var_5, var_0, var_1, var_2, var_3, var_4);
    return var_5;
},
jn_ByteBufferJsImpl_asShortBuffer = $this => {
    let $sz, $slice;
    $sz = jn_Buffer_remaining($this) / 2 | 0;
    if ($this.$order0 === jn_ByteOrder_nativeOrder()) {
        $slice = new Int16Array($this.$data0.buffer, $this.$data0.byteOffset + $this.$position3 | 0, $sz);
        return jn_ShortBufferOverTypedArray__init_(0, $sz, $this.$readOnly0, $slice, null);
    }
    $slice = new DataView($this.$data0.buffer, $this.$data0.byteOffset + $this.$position3 | 0, $sz * 2 | 0);
    return jn_ShortBufferOverDataView__init_0(0, $sz, $this.$readOnly0, $slice, $this.$order0 !== jn_ByteOrder_LITTLE_ENDIAN ? 0 : 1);
},
jn_ByteBufferJsImpl_asFloatBuffer = $this => {
    let $sz, $slice;
    $sz = jn_Buffer_remaining($this) / 4 | 0;
    if ($this.$order0 === jn_ByteOrder_nativeOrder()) {
        $slice = new Float32Array($this.$data0.buffer, $this.$data0.byteOffset + $this.$position3 | 0, $sz);
        return jn_FloatBufferOverTypedArray__init_(0, $sz, $this.$readOnly0, $slice, null);
    }
    $slice = new DataView($this.$data0.buffer, $this.$data0.byteOffset + $this.$position3 | 0, $sz * 4 | 0);
    return jn_FloatBufferOverDataView__init_0(0, $sz, $this.$readOnly0, $slice, $this.$order0 !== jn_ByteOrder_LITTLE_ENDIAN ? 0 : 1);
},
otcit_DoubleAnalyzer = $rt_classWithoutFields(),
otcit_DoubleAnalyzer_MAX_MANTISSA = Long_ZERO,
otcit_DoubleAnalyzer_resultForLog10 = null,
otcit_DoubleAnalyzer_mantissa10Table = null,
otcit_DoubleAnalyzer_exp10Table = null,
otcit_DoubleAnalyzer_$callClinit = () => {
    otcit_DoubleAnalyzer_$callClinit = $rt_eraseClinit(otcit_DoubleAnalyzer);
    otcit_DoubleAnalyzer__clinit_();
},
otcit_DoubleAnalyzer_analyze = ($d, $result) => {
    let $bits, $mantissa, $exponent, var$6, $decExponent, var$8, var$9, $binExponentCorrection, $mantissaShift, $decMantissa, var$13, var$14, var$15, $decMantissaHi, $decMantissaLow, $lowerPos, $upperPos, $posCmp;
    otcit_DoubleAnalyzer_$callClinit();
    $bits = jl_Double_doubleToLongBits($d);
    $result.$sign0 = Long_eq(Long_and($bits, Long_create(0, 2147483648)), Long_ZERO) ? 0 : 1;
    $mantissa = Long_and($bits, Long_create(4294967295, 1048575));
    $exponent = Long_lo(Long_shr($bits, 52)) & 2047;
    if (Long_eq($mantissa, Long_ZERO) && !$exponent) {
        $result.$mantissa = Long_ZERO;
        $result.$exponent = 0;
        return;
    }
    if ($exponent)
        var$6 = Long_or($mantissa, Long_create(0, 1048576));
    else {
        var$6 = Long_shl($mantissa, 1);
        while (Long_eq(Long_and(var$6, Long_create(0, 1048576)), Long_ZERO)) {
            var$6 = Long_shl(var$6, 1);
            $exponent = $exponent + (-1) | 0;
        }
    }
    $decExponent = ju_Arrays_binarySearch0(otcit_DoubleAnalyzer_exp10Table, $exponent << 16 >> 16);
    if ($decExponent < 0)
        $decExponent =  -$decExponent | 0;
    var$8 = otcit_DoubleAnalyzer_exp10Table.data;
    var$9 = $decExponent + 1 | 0;
    $binExponentCorrection = $exponent - var$8[var$9] | 0;
    $mantissaShift = 12 + $binExponentCorrection | 0;
    $decMantissa = otcit_DoubleAnalyzer_mulAndShiftRight(var$6, otcit_DoubleAnalyzer_mantissa10Table.data[var$9], $mantissaShift);
    if (Long_le($decMantissa, otcit_DoubleAnalyzer_MAX_MANTISSA)) {
        while (jl_Long_compareUnsigned($decMantissa, otcit_DoubleAnalyzer_MAX_MANTISSA) <= 0) {
            $decExponent = $decExponent + (-1) | 0;
            $decMantissa = Long_add(Long_mul($decMantissa, Long_fromInt(10)), Long_fromInt(9));
        }
        var$8 = otcit_DoubleAnalyzer_exp10Table.data;
        var$9 = $decExponent + 1 | 0;
        var$13 = $exponent - var$8[var$9] | 0;
        $mantissaShift = 12 + var$13 | 0;
        $decMantissa = otcit_DoubleAnalyzer_mulAndShiftRight(var$6, otcit_DoubleAnalyzer_mantissa10Table.data[var$9], $mantissaShift);
    }
    var$14 = Long_shl(var$6, 1);
    var$6 = Long_add(var$14, Long_fromInt(1));
    var$8 = otcit_DoubleAnalyzer_mantissa10Table.data;
    var$13 = $decExponent + 1 | 0;
    var$15 = var$8[var$13];
    var$9 = $mantissaShift - 1 | 0;
    $decMantissaHi = otcit_DoubleAnalyzer_mulAndShiftRight(var$6, var$15, var$9);
    $decMantissaLow = otcit_DoubleAnalyzer_mulAndShiftRight(Long_sub(var$14, Long_fromInt(1)), otcit_DoubleAnalyzer_mantissa10Table.data[var$13], var$9);
    $lowerPos = otcit_DoubleAnalyzer_findLowerDistance($decMantissa, $decMantissaLow);
    $upperPos = otcit_DoubleAnalyzer_findUpperDistance($decMantissa, $decMantissaHi);
    $posCmp = jl_Long_compareUnsigned($lowerPos, $upperPos);
    var$6 = $posCmp > 0 ? Long_mul(jl_Long_divideUnsigned($decMantissa, $lowerPos), $lowerPos) : $posCmp < 0 ? Long_add(Long_mul(jl_Long_divideUnsigned($decMantissa, $upperPos), $upperPos), $upperPos) : Long_mul(jl_Long_divideUnsigned(Long_add($decMantissa, Long_div($upperPos, Long_fromInt(2))), $upperPos), $upperPos);
    if (jl_Long_compareUnsigned(var$6, Long_create(2808348672, 232830643)) >= 0)
        while (true) {
            $decExponent = $decExponent + 1 | 0;
            var$6 = jl_Long_divideUnsigned(var$6, Long_fromInt(10));
            if (jl_Long_compareUnsigned(var$6, Long_create(2808348672, 232830643)) < 0)
                break;
        }
    else if (jl_Long_compareUnsigned(var$6, Long_create(1569325056, 23283064)) < 0) {
        $decExponent = $decExponent + (-1) | 0;
        var$6 = Long_mul(var$6, Long_fromInt(10));
    }
    $result.$mantissa = var$6;
    $result.$exponent = $decExponent - 330 | 0;
},
otcit_DoubleAnalyzer_findLowerDistance = ($mantissa, $lower) => {
    let $pos, $pos_0, var$5, var$6;
    otcit_DoubleAnalyzer_$callClinit();
    $pos = Long_fromInt(1);
    while (true) {
        $pos_0 = Long_mul($pos, Long_fromInt(10));
        var$5 = jl_Long_divideUnsigned($mantissa, $pos_0);
        var$6 = jl_Long_divideUnsigned($lower, $pos_0);
        if (jl_Long_compareUnsigned(var$5, var$6) <= 0)
            break;
        $pos = $pos_0;
    }
    return $pos;
},
otcit_DoubleAnalyzer_findUpperDistance = ($mantissa, $upper) => {
    let $pos, $pos_0, var$5, var$6;
    otcit_DoubleAnalyzer_$callClinit();
    $pos = Long_fromInt(1);
    while (true) {
        $pos_0 = Long_mul($pos, Long_fromInt(10));
        var$5 = jl_Long_divideUnsigned($mantissa, $pos_0);
        var$6 = jl_Long_divideUnsigned($upper, $pos_0);
        if (jl_Long_compareUnsigned(var$5, var$6) >= 0)
            break;
        $pos = $pos_0;
    }
    return $pos;
},
otcit_DoubleAnalyzer_mulAndShiftRight = ($a, $b, $shift) => {
    let $a1, $a2, $a3, $a4, $b1, $b2, $b3, $b4, $cm, $c0, $c1, $c2, $c3, $c, var$18;
    otcit_DoubleAnalyzer_$callClinit();
    $a1 = Long_and($a, Long_fromInt(65535));
    $a2 = Long_and(Long_shru($a, 16), Long_fromInt(65535));
    $a3 = Long_and(Long_shru($a, 32), Long_fromInt(65535));
    $a4 = Long_and(Long_shru($a, 48), Long_fromInt(65535));
    $b1 = Long_and($b, Long_fromInt(65535));
    $b2 = Long_and(Long_shru($b, 16), Long_fromInt(65535));
    $b3 = Long_and(Long_shru($b, 32), Long_fromInt(65535));
    $b4 = Long_and(Long_shru($b, 48), Long_fromInt(65535));
    $cm = Long_add(Long_add(Long_mul($b3, $a1), Long_mul($b2, $a2)), Long_mul($b1, $a3));
    $c0 = Long_add(Long_add(Long_add(Long_mul($b4, $a1), Long_mul($b3, $a2)), Long_mul($b2, $a3)), Long_mul($b1, $a4));
    $c1 = Long_add(Long_add(Long_mul($b4, $a2), Long_mul($b3, $a3)), Long_mul($b2, $a4));
    $c2 = Long_add(Long_mul($b4, $a3), Long_mul($b3, $a4));
    $c3 = Long_mul($b4, $a4);
    $c = Long_add(Long_add(Long_shl($c3, 32 + $shift | 0), Long_shl($c2, 16 + $shift | 0)), Long_shl($c1, $shift));
    var$18 = Long_add($cm, Long_shl($c0, 16));
    var$18 = Long_add($c, Long_shru(var$18, 32 - $shift | 0));
    return var$18;
},
otcit_DoubleAnalyzer__clinit_ = () => {
    otcit_DoubleAnalyzer_MAX_MANTISSA = jl_Long_divideUnsigned(Long_fromInt(-1), Long_fromInt(10));
    otcit_DoubleAnalyzer_resultForLog10 = otcit_DoubleAnalyzer$Result__init_();
    otcit_DoubleAnalyzer_mantissa10Table = $rt_createLongArrayFromData([Long_create(3251292512, 2194092222), Long_create(1766094183, 3510547556), Long_create(553881887, 2808438045), Long_create(443105509, 2246750436), Long_create(3285949193, 3594800697), Long_create(910772436, 2875840558), Long_create(2446604867, 2300672446), Long_create(2196580869, 3681075914), Long_create(2616258154, 2944860731), Long_create(1234013064, 2355888585), Long_create(1974420903, 3769421736), Long_create(720543263, 3015537389), Long_create(1435428070, 2412429911),
    Long_create(578697993, 3859887858), Long_create(2180945313, 3087910286), Long_create(885762791, 2470328229), Long_create(3135207384, 3952525166), Long_create(1649172448, 3162020133), Long_create(3037324877, 2529616106), Long_create(3141732885, 4047385770), Long_create(2513386308, 3237908616), Long_create(1151715587, 2590326893), Long_create(983751480, 4144523029), Long_create(1645994643, 3315618423), Long_create(3034782633, 2652494738), Long_create(3996658754, 4243991581), Long_create(2338333544, 3395193265),
    Long_create(1870666835, 2716154612), Long_create(4073513845, 2172923689), Long_create(3940641775, 3476677903), Long_create(575533043, 2781342323), Long_create(2178413352, 2225073858), Long_create(2626467905, 3560118173), Long_create(3819161242, 2848094538), Long_create(478348616, 2278475631), Long_create(3342338164, 3645561009), Long_create(3532863990, 2916448807), Long_create(1108304273, 2333159046), Long_create(55299919, 3733054474), Long_create(903233395, 2986443579), Long_create(1581580175, 2389154863),
    Long_create(1671534821, 3822647781), Long_create(478234397, 3058118225), Long_create(382587518, 2446494580), Long_create(612140029, 3914391328), Long_create(2207698941, 3131513062), Long_create(48172235, 2505210450), Long_create(77075576, 4008336720), Long_create(61660460, 3206669376), Long_create(3485302205, 2565335500), Long_create(1281516232, 4104536801), Long_create(166219527, 3283629441), Long_create(3568949458, 2626903552), Long_create(2274345296, 4203045684), Long_create(2678469696, 3362436547), Long_create(424788838, 2689949238),
    Long_create(2057817989, 2151959390), Long_create(3292508783, 3443135024), Long_create(3493000485, 2754508019), Long_create(3653393847, 2203606415), Long_create(1550462860, 3525770265), Long_create(1240370288, 2820616212), Long_create(3569276608, 2256492969), Long_create(3133862195, 3610388751), Long_create(1648096297, 2888311001), Long_create(459483578, 2310648801), Long_create(3312154103, 3697038081), Long_create(1790729823, 2957630465), Long_create(1432583858, 2366104372), Long_create(3151127633, 3785766995),
    Long_create(2520902106, 3028613596), Long_create(1157728226, 2422890877), Long_create(2711358621, 3876625403), Long_create(3887073815, 3101300322), Long_create(1391672133, 2481040258), Long_create(1367681954, 3969664413), Long_create(2812132482, 3175731530), Long_create(2249705985, 2540585224), Long_create(1022549199, 4064936359), Long_create(1677032818, 3251949087), Long_create(3918606632, 2601559269), Long_create(3692790234, 4162494831), Long_create(2095238728, 3329995865), Long_create(1676190982, 2663996692),
    Long_create(3540899031, 4262394707), Long_create(1114732307, 3409915766), Long_create(32792386, 2727932613), Long_create(1744220827, 2182346090), Long_create(2790753324, 3491753744), Long_create(3091596118, 2793402995), Long_create(2473276894, 2234722396), Long_create(2239256113, 3575555834), Long_create(2650398349, 2860444667), Long_create(402331761, 2288355734), Long_create(2361717736, 3661369174), Long_create(2748367648, 2929095339), Long_create(3057687578, 2343276271), Long_create(3174313206, 3749242034),
    Long_create(3398444024, 2999393627), Long_create(1000768301, 2399514902), Long_create(2460222741, 3839223843), Long_create(3686165111, 3071379074), Long_create(3807925548, 2457103259), Long_create(3515700499, 3931365215), Long_create(2812560399, 3145092172), Long_create(532061401, 2516073738), Long_create(4287272078, 4025717980), Long_create(3429817663, 3220574384), Long_create(3602847589, 2576459507), Long_create(2328582306, 4122335212), Long_create(144878926, 3297868170), Long_create(115903141, 2638294536),
    Long_create(2762425404, 4221271257), Long_create(491953404, 3377017006), Long_create(3829536560, 2701613604), Long_create(3922622707, 2161290883), Long_create(1122235577, 3458065414), Long_create(1756781920, 2766452331), Long_create(546432077, 2213161865), Long_create(874291324, 3541058984), Long_create(1558426518, 2832847187), Long_create(3823721592, 2266277749), Long_create(3540974170, 3626044399), Long_create(3691772795, 2900835519), Long_create(3812411695, 2320668415), Long_create(1804891416, 3713069465),
    Long_create(1443913133, 2970455572), Long_create(3732110884, 2376364457), Long_create(2535403578, 3802183132), Long_create(310335944, 3041746506), Long_create(3684242592, 2433397204), Long_create(3317807769, 3893435527), Long_create(936259297, 3114748422), Long_create(3325987815, 2491798737), Long_create(1885606668, 3986877980), Long_create(1508485334, 3189502384), Long_create(2065781726, 2551601907), Long_create(4164244222, 4082563051), Long_create(2472401918, 3266050441), Long_create(1118928075, 2612840353),
    Long_create(931291461, 4180544565), Long_create(745033169, 3344435652), Long_create(3173006913, 2675548521), Long_create(3358824142, 4280877634), Long_create(3546052773, 3424702107), Long_create(1118855300, 2739761686), Long_create(36090780, 2191809349), Long_create(1775732167, 3506894958), Long_create(3138572652, 2805515966), Long_create(1651864662, 2244412773), Long_create(1783990001, 3591060437), Long_create(4004172378, 2872848349), Long_create(4062331362, 2298278679), Long_create(3922749802, 3677245887),
    Long_create(1420212923, 2941796710), Long_create(1136170338, 2353437368), Long_create(958879082, 3765499789), Long_create(1626096725, 3012399831), Long_create(441883920, 2409919865), Long_create(707014273, 3855871784), Long_create(1424604878, 3084697427), Long_create(3716664280, 2467757941), Long_create(4228675929, 3948412706), Long_create(2523947284, 3158730165), Long_create(2019157827, 2526984132), Long_create(4089645983, 4043174611), Long_create(2412723327, 3234539689), Long_create(2789172121, 2587631751),
    Long_create(2744688475, 4140210802), Long_create(477763862, 3312168642), Long_create(2959191467, 2649734913), Long_create(3875712888, 4239575861), Long_create(2241576851, 3391660689), Long_create(2652254940, 2713328551), Long_create(1262810493, 2170662841), Long_create(302509870, 3473060546), Long_create(3677981733, 2778448436), Long_create(2083391927, 2222758749), Long_create(756446706, 3556413999), Long_create(1464150824, 2845131199), Long_create(2030314118, 2276104959), Long_create(671522212, 3641767935),
    Long_create(537217769, 2913414348), Long_create(2147761134, 2330731478), Long_create(2577424355, 3729170365), Long_create(2061939484, 2983336292), Long_create(4226531965, 2386669033), Long_create(1608490388, 3818670454), Long_create(2145785770, 3054936363), Long_create(3434615534, 2443949090), Long_create(1200417559, 3910318545), Long_create(960334047, 3128254836), Long_create(4204241074, 2502603868), Long_create(1572824964, 4004166190), Long_create(1258259971, 3203332952), Long_create(3583588354, 2562666361),
    Long_create(4015754449, 4100266178), Long_create(635623181, 3280212943), Long_create(2226485463, 2624170354), Long_create(985396364, 4198672567), Long_create(3365297469, 3358938053), Long_create(115257597, 2687150443), Long_create(1810192996, 2149720354), Long_create(319328417, 3439552567), Long_create(2832443111, 2751642053), Long_create(3983941407, 2201313642), Long_create(2938332415, 3522101828), Long_create(4068652850, 2817681462), Long_create(1536935362, 2254145170), Long_create(2459096579, 3606632272),
    Long_create(249290345, 2885305818), Long_create(1917419194, 2308244654), Long_create(490890333, 3693191447), Long_create(2969692644, 2954553157), Long_create(657767197, 2363642526), Long_create(3629407892, 3781828041), Long_create(2044532855, 3025462433), Long_create(3353613202, 2420369946), Long_create(3647794205, 3872591914), Long_create(3777228823, 3098073531), Long_create(2162789599, 2478458825), Long_create(3460463359, 3965534120), Long_create(2768370687, 3172427296), Long_create(1355703090, 2537941837),
    Long_create(3028118404, 4060706939), Long_create(3281488183, 3248565551), Long_create(1766197087, 2598852441), Long_create(1107928421, 4158163906), Long_create(27349277, 3326531125), Long_create(21879422, 2661224900), Long_create(35007075, 4257959840), Long_create(28005660, 3406367872), Long_create(2599384905, 2725094297), Long_create(361521006, 2180075438), Long_create(4014407446, 3488120700), Long_create(3211525957, 2790496560), Long_create(2569220766, 2232397248), Long_create(3251759766, 3571835597),
    Long_create(883420894, 2857468478), Long_create(2424723634, 2285974782), Long_create(443583977, 3657559652), Long_create(2931847559, 2926047721), Long_create(1486484588, 2340838177), Long_create(3237368801, 3745341083), Long_create(12914663, 2996272867), Long_create(2587312108, 2397018293), Long_create(3280705914, 3835229269), Long_create(3483558190, 3068183415), Long_create(2786846552, 2454546732), Long_create(1022980646, 3927274772), Long_create(3395364895, 3141819817), Long_create(998304997, 2513455854),
    Long_create(3315274914, 4021529366), Long_create(1793226472, 3217223493), Long_create(3152568096, 2573778794), Long_create(2467128576, 4118046071), Long_create(1114709402, 3294436857), Long_create(3468747899, 2635549485), Long_create(1255029343, 4216879177), Long_create(3581003852, 3373503341), Long_create(2005809622, 2698802673), Long_create(3322634616, 2159042138), Long_create(162254630, 3454467422), Long_create(2706784082, 2763573937), Long_create(447440347, 2210859150), Long_create(715904555, 3537374640),
    Long_create(572723644, 2829899712), Long_create(3035159293, 2263919769), Long_create(2279274491, 3622271631), Long_create(964426134, 2897817305), Long_create(771540907, 2318253844), Long_create(2952452370, 3709206150), Long_create(2361961896, 2967364920), Long_create(1889569516, 2373891936), Long_create(1305324308, 3798227098), Long_create(2762246365, 3038581678), Long_create(3927784010, 2430865342), Long_create(2848480580, 3889384548), Long_create(3996771382, 3111507638), Long_create(620436728, 2489206111),
    Long_create(3569679143, 3982729777), Long_create(1137756396, 3186183822), Long_create(3487185494, 2548947057), Long_create(2143522954, 4078315292), Long_create(4291798741, 3262652233), Long_create(856458615, 2610121787), Long_create(2229327243, 4176194859), Long_create(2642455254, 3340955887), Long_create(395977285, 2672764710), Long_create(633563656, 4276423536), Long_create(3942824761, 3421138828), Long_create(577279431, 2736911063), Long_create(2179810463, 2189528850), Long_create(3487696741, 3503246160),
    Long_create(2790157393, 2802596928), Long_create(3950112833, 2242077542), Long_create(2884206696, 3587324068), Long_create(4025352275, 2869859254), Long_create(4079275279, 2295887403), Long_create(1372879692, 3673419846), Long_create(239310294, 2938735877), Long_create(2768428613, 2350988701), Long_create(2711498862, 3761581922), Long_create(451212171, 3009265538), Long_create(2078956655, 2407412430), Long_create(3326330649, 3851859888), Long_create(84084141, 3081487911), Long_create(3503241150, 2465190328),
    Long_create(451225085, 3944304526), Long_create(3796953905, 3155443620), Long_create(3037563124, 2524354896), Long_create(3142114080, 4038967834), Long_create(3372684723, 3231174267), Long_create(980160860, 2584939414), Long_create(3286244294, 4135903062), Long_create(911008517, 3308722450), Long_create(728806813, 2646977960), Long_create(1166090902, 4235164736), Long_create(73879262, 3388131789), Long_create(918096869, 2710505431), Long_create(4170451332, 2168404344), Long_create(4095741754, 3469446951),
    Long_create(2417599944, 2775557561), Long_create(1075086496, 2220446049), Long_create(3438125312, 3552713678), Long_create(173519872, 2842170943), Long_create(1856802816, 2273736754), Long_create(393904128, 3637978807), Long_create(2892103680, 2910383045), Long_create(2313682944, 2328306436), Long_create(1983905792, 3725290298), Long_create(3305111552, 2980232238), Long_create(67108864, 2384185791), Long_create(2684354560, 3814697265), Long_create(2147483648, 3051757812), Long_create(0, 2441406250), Long_create(0, 3906250000),
    Long_create(0, 3125000000), Long_create(0, 2500000000), Long_create(0, 4000000000), Long_create(0, 3200000000), Long_create(0, 2560000000), Long_create(0, 4096000000), Long_create(0, 3276800000), Long_create(0, 2621440000), Long_create(0, 4194304000), Long_create(0, 3355443200), Long_create(0, 2684354560), Long_create(0, 2147483648), Long_create(3435973836, 3435973836), Long_create(1889785610, 2748779069), Long_create(2370821947, 2199023255), Long_create(3793315115, 3518437208), Long_create(457671715, 2814749767),
    Long_create(2943117749, 2251799813), Long_create(3849994940, 3602879701), Long_create(2221002492, 2882303761), Long_create(917808535, 2305843009), Long_create(3186480574, 3689348814), Long_create(3408177918, 2951479051), Long_create(1867548875, 2361183241), Long_create(1270091283, 3777893186), Long_create(157079567, 3022314549), Long_create(984657113, 2417851639), Long_create(3293438299, 3868562622), Long_create(916763721, 3094850098), Long_create(2451397895, 2475880078), Long_create(3063243173, 3961408125),
    Long_create(2450594538, 3169126500), Long_create(1960475630, 2535301200), Long_create(3136761009, 4056481920), Long_create(2509408807, 3245185536), Long_create(1148533586, 2596148429), Long_create(3555640657, 4153837486), Long_create(1985519066, 3323069989), Long_create(2447408712, 2658455991), Long_create(2197867021, 4253529586), Long_create(899300158, 3402823669), Long_create(1578433585, 2722258935), Long_create(1262746868, 2177807148), Long_create(1161401530, 3484491437), Long_create(3506101601, 2787593149),
    Long_create(3663874740, 2230074519), Long_create(3285219207, 3568119231), Long_create(1769181906, 2854495385), Long_create(1415345525, 2283596308), Long_create(1405559381, 3653754093), Long_create(2842434423, 2923003274), Long_create(3132940998, 2338402619), Long_create(2435725219, 3741444191), Long_create(1089586716, 2993155353), Long_create(2589656291, 2394524282), Long_create(707476229, 3831238852), Long_create(3142961361, 3064991081), Long_create(1655375629, 2451992865), Long_create(2648601007, 3923188584),
    Long_create(2977874265, 3138550867), Long_create(664312493, 2510840694), Long_create(2780886908, 4017345110), Long_create(2224709526, 3213876088), Long_create(3497754539, 2571100870), Long_create(1301439967, 4113761393), Long_create(2759138892, 3291009114), Long_create(3066304573, 2632807291), Long_create(3188100398, 4212491666), Long_create(1691486859, 3369993333), Long_create(3071176406, 2695994666), Long_create(1597947665, 2156795733), Long_create(1697722806, 3450873173), Long_create(3076165163, 2760698538),
    Long_create(4178919049, 2208558830), Long_create(2391303182, 3533694129), Long_create(2772036005, 2826955303), Long_create(3935615722, 2261564242), Long_create(2861011319, 3618502788), Long_create(4006795973, 2894802230), Long_create(3205436779, 2315841784), Long_create(2551718468, 3705346855), Long_create(2041374775, 2964277484), Long_create(2492093279, 2371421987), Long_create(551375410, 3794275180), Long_create(441100328, 3035420144), Long_create(1211873721, 2428336115), Long_create(1938997954, 3885337784),
    Long_create(2410191822, 3108270227), Long_create(210166539, 2486616182), Long_create(1195259923, 3978585891), Long_create(97214479, 3182868713), Long_create(1795758501, 2546294970), Long_create(2873213602, 4074071952), Long_create(580583963, 3259257562), Long_create(3041447548, 2607406049), Long_create(2289335700, 4171849679), Long_create(2690462019, 3337479743), Long_create(3870356534, 2669983794), Long_create(3615590076, 4271974071), Long_create(2033478602, 3417579257), Long_create(4203763259, 2734063405),
    Long_create(3363010607, 2187250724), Long_create(2803836594, 3499601159), Long_create(3102062734, 2799680927), Long_create(763663269, 2239744742), Long_create(2080854690, 3583591587), Long_create(4241664129, 2866873269), Long_create(4252324763, 2293498615), Long_create(2508752324, 3669597785), Long_create(2007001859, 2935678228), Long_create(3323588406, 2348542582), Long_create(1881767613, 3757668132), Long_create(4082394468, 3006134505), Long_create(3265915574, 2404907604), Long_create(2648484541, 3847852167),
    Long_create(400800715, 3078281734), Long_create(1179634031, 2462625387), Long_create(2746407909, 3940200619), Long_create(3056119786, 3152160495), Long_create(2444895829, 2521728396), Long_create(2193846408, 4034765434), Long_create(2614070585, 3227812347), Long_create(373269550, 2582249878), Long_create(4033205117, 4131599804), Long_create(4085557553, 3305279843), Long_create(691465664, 2644223875), Long_create(1106345063, 4230758200), Long_create(885076050, 3384606560), Long_create(708060840, 2707685248),
    Long_create(2284435591, 2166148198), Long_create(2796103486, 3465837117), Long_create(518895870, 2772669694), Long_create(1274110155, 2218135755), Long_create(2038576249, 3549017208), Long_create(3348847917, 2839213766), Long_create(1820084875, 2271371013), Long_create(2053142340, 3634193621), Long_create(783520413, 2907354897), Long_create(3203796708, 2325883917), Long_create(1690100896, 3721414268), Long_create(3070067635, 2977131414), Long_create(3315047567, 2381705131), Long_create(3586089190, 3810728210),
    Long_create(2868871352, 3048582568), Long_create(4013084000, 2438866054), Long_create(3843954022, 3902185687), Long_create(1357176299, 3121748550), Long_create(1085741039, 2497398840), Long_create(1737185663, 3995838144), Long_create(2248741989, 3196670515), Long_create(1798993591, 2557336412), Long_create(3737383206, 4091738259), Long_create(3848900024, 3273390607), Long_create(1361133101, 2618712486), Long_create(459826043, 4189939978), Long_create(2085847752, 3351951982), Long_create(4245658579, 2681561585),
    Long_create(2498086431, 4290498537), Long_create(280482227, 3432398830), Long_create(224385781, 2745919064), Long_create(1038502084, 2196735251), Long_create(4238583712, 3514776401), Long_create(2531873511, 2811821121), Long_create(1166505349, 2249456897), Long_create(2725402018, 3599131035), Long_create(2180321615, 2879304828), Long_create(3462244210, 2303443862), Long_create(2103616899, 3685510180), Long_create(1682893519, 2948408144), Long_create(2205308275, 2358726515), Long_create(3528493240, 3773962424),
    Long_create(3681788051, 3019169939), Long_create(3804423900, 2415335951), Long_create(74124026, 3864537523), Long_create(1777286139, 3091630018), Long_create(3139815829, 2473304014), Long_create(2446724950, 3957286423), Long_create(3675366878, 3165829138), Long_create(363313125, 2532663311), Long_create(3158281377, 4052261297), Long_create(808638183, 3241809038), Long_create(2364897465, 2593447230), Long_create(3783835944, 4149515568), Long_create(450088378, 3319612455), Long_create(360070702, 2655689964),
    Long_create(2294100042, 4249103942), Long_create(117293115, 3399283154), Long_create(952827951, 2719426523), Long_create(2480249279, 2175541218), Long_create(3109405388, 3480865949), Long_create(3346517769, 2784692759), Long_create(3536207675, 2227754207), Long_create(2221958443, 3564406732), Long_create(59579836, 2851525386), Long_create(3483637705, 2281220308), Long_create(419859574, 3649952494), Long_create(1194881118, 2919961995), Long_create(955904894, 2335969596), Long_create(4106428209, 3737551353),
    Long_create(708162189, 2990041083), Long_create(2284516670, 2392032866), Long_create(1937239754, 3827252586), Long_create(690798344, 3061802069), Long_create(1411632134, 2449441655), Long_create(2258611415, 3919106648), Long_create(3524876050, 3135285318), Long_create(242920462, 2508228255), Long_create(388672740, 4013165208), Long_create(2028925110, 3210532166), Long_create(764146629, 2568425733), Long_create(363641147, 4109481173), Long_create(2008899836, 3287584938), Long_create(3325106787, 2630067950),
    Long_create(1025203564, 4208108721), Long_create(4256136688, 3366486976), Long_create(2545915891, 2693189581), Long_create(1177739254, 2154551665), Long_create(1884382806, 3447282664), Long_create(2366499704, 2757826131), Long_create(1034206304, 2206260905), Long_create(1654730086, 3530017448), Long_create(3041770987, 2824013958), Long_create(4151403708, 2259211166), Long_create(629291719, 3614737867), Long_create(3080413753, 2891790293), Long_create(4182317920, 2313432234), Long_create(4114728295, 3701491575),
    Long_create(3291782636, 2961193260), Long_create(2633426109, 2368954608), Long_create(3354488315, 3790327373), Long_create(106610275, 3032261899), Long_create(944281679, 2425809519), Long_create(3228837605, 3881295230), Long_create(2583070084, 3105036184), Long_create(2925449526, 2484028947), Long_create(1244745405, 3974446316), Long_create(136802865, 3179557053), Long_create(1827429210, 2543645642), Long_create(3782880196, 4069833027), Long_create(1308317238, 3255866422), Long_create(3623634168, 2604693137),
    Long_create(2361840832, 4167509020), Long_create(1889472666, 3334007216), Long_create(652584673, 2667205773), Long_create(185142018, 4267529237), Long_create(2725093992, 3414023389), Long_create(3039068653, 2731218711), Long_create(1572261463, 2184974969), Long_create(4233605259, 3495959950), Long_create(3386884207, 2796767960), Long_create(2709507366, 2237414368), Long_create(3476218326, 3579862989), Long_create(3639968120, 2863890391), Long_create(2052981037, 2291112313), Long_create(2425776200, 3665779701),
    Long_create(1081627501, 2932623761), Long_create(6308541, 2346099009), Long_create(1728080585, 3753758414), Long_create(2241457927, 3003006731), Long_create(934172882, 2402405385), Long_create(1494676612, 3843848616), Long_create(336747830, 3075078893), Long_create(1987385183, 2460063114), Long_create(602835915, 3936100983), Long_create(2200255650, 3148880786), Long_create(901211061, 2519104629), Long_create(3159924616, 4030567406), Long_create(1668946233, 3224453925), Long_create(1335156987, 2579563140),
    Long_create(2136251179, 4127301024), Long_create(2567994402, 3301840819), Long_create(2913388981, 2641472655), Long_create(366455074, 4226356249), Long_create(1152157518, 3381084999), Long_create(1780719474, 2704867999), Long_create(2283569038, 2163894399), Long_create(1076730083, 3462231039), Long_create(1720377526, 2769784831), Long_create(517308561, 2215827865), Long_create(827693699, 3545324584), Long_create(1521148418, 2836259667), Long_create(3793899112, 2269007733), Long_create(916277824, 3630412374),
    Long_create(1592015718, 2904329899), Long_create(2132606034, 2323463919), Long_create(835189277, 3717542271), Long_create(4104125258, 2974033816), Long_create(2424306747, 2379227053), Long_create(3019897337, 3806763285), Long_create(2415917869, 3045410628), Long_create(3650721214, 2436328502), Long_create(2405180105, 3898125604), Long_create(2783137543, 3118500483), Long_create(3944496953, 2494800386), Long_create(298240911, 3991680619), Long_create(1097586188, 3193344495), Long_create(878068950, 2554675596),
    Long_create(3981890698, 4087480953), Long_create(608532181, 3269984763), Long_create(2204812663, 2615987810), Long_create(3527700261, 4185580496), Long_create(1963166749, 3348464397), Long_create(4147513777, 2678771517), Long_create(3200048207, 4286034428), Long_create(4278025484, 3428827542), Long_create(1704433468, 2743062034), Long_create(2222540234, 2194449627), Long_create(120090538, 3511119404), Long_create(955065889, 2808895523), Long_create(2482039630, 2247116418), Long_create(3112269949, 3595386269),
    Long_create(3348809418, 2876309015), Long_create(2679047534, 2301047212), Long_create(850502218, 3681675540), Long_create(680401775, 2945340432), Long_create(3121301797, 2356272345), Long_create(699115580, 3770035753), Long_create(2277279382, 3016028602), Long_create(103836587, 2412822882), Long_create(1025131999, 3860516611), Long_create(4256079436, 3088413288), Long_create(827883168, 2470730631), Long_create(3901593088, 3953169009)]);
    otcit_DoubleAnalyzer_exp10Table = $rt_createShortArrayFromData([(-70), (-66), (-63), (-60), (-56), (-53), (-50), (-46), (-43), (-40), (-36), (-33), (-30), (-26), (-23), (-20), (-16), (-13), (-10), (-6), (-3), 0, 4, 7, 10, 14, 17, 20, 23, 27, 30, 33, 37, 40, 43, 47, 50, 53, 57, 60, 63, 67, 70, 73, 77, 80, 83, 87, 90, 93, 97, 100, 103, 107, 110, 113, 116, 120, 123, 126, 130, 133, 136, 140, 143, 146, 150, 153, 156, 160, 163, 166, 170, 173, 176, 180, 183, 186, 190, 193, 196, 200, 203, 206, 210, 213, 216, 219,
    223, 226, 229, 233, 236, 239, 243, 246, 249, 253, 256, 259, 263, 266, 269, 273, 276, 279, 283, 286, 289, 293, 296, 299, 303, 306, 309, 312, 316, 319, 322, 326, 329, 332, 336, 339, 342, 346, 349, 352, 356, 359, 362, 366, 369, 372, 376, 379, 382, 386, 389, 392, 396, 399, 402, 406, 409, 412, 415, 419, 422, 425, 429, 432, 435, 439, 442, 445, 449, 452, 455, 459, 462, 465, 469, 472, 475, 479, 482, 485, 489, 492, 495, 499, 502, 505, 508, 512, 515, 518, 522, 525, 528, 532, 535, 538, 542, 545, 548, 552, 555, 558,
    562, 565, 568, 572, 575, 578, 582, 585, 588, 592, 595, 598, 601, 605, 608, 611, 615, 618, 621, 625, 628, 631, 635, 638, 641, 645, 648, 651, 655, 658, 661, 665, 668, 671, 675, 678, 681, 685, 688, 691, 695, 698, 701, 704, 708, 711, 714, 718, 721, 724, 728, 731, 734, 738, 741, 744, 748, 751, 754, 758, 761, 764, 768, 771, 774, 778, 781, 784, 788, 791, 794, 797, 801, 804, 807, 811, 814, 817, 821, 824, 827, 831, 834, 837, 841, 844, 847, 851, 854, 857, 861, 864, 867, 871, 874, 877, 881, 884, 887, 891, 894, 897,
    900, 904, 907, 910, 914, 917, 920, 924, 927, 930, 934, 937, 940, 944, 947, 950, 954, 957, 960, 964, 967, 970, 974, 977, 980, 984, 987, 990, 993, 997, 1000, 1003, 1007, 1010, 1013, 1017, 1020, 1023, 1027, 1030, 1033, 1037, 1040, 1043, 1047, 1050, 1053, 1057, 1060, 1063, 1067, 1070, 1073, 1077, 1080, 1083, 1086, 1090, 1093, 1096, 1100, 1103, 1106, 1110, 1113, 1116, 1120, 1123, 1126, 1130, 1133, 1136, 1140, 1143, 1146, 1150, 1153, 1156, 1160, 1163, 1166, 1170, 1173, 1176, 1180, 1183, 1186, 1189, 1193, 1196,
    1199, 1203, 1206, 1209, 1213, 1216, 1219, 1223, 1226, 1229, 1233, 1236, 1239, 1243, 1246, 1249, 1253, 1256, 1259, 1263, 1266, 1269, 1273, 1276, 1279, 1282, 1286, 1289, 1292, 1296, 1299, 1302, 1306, 1309, 1312, 1316, 1319, 1322, 1326, 1329, 1332, 1336, 1339, 1342, 1346, 1349, 1352, 1356, 1359, 1362, 1366, 1369, 1372, 1376, 1379, 1382, 1385, 1389, 1392, 1395, 1399, 1402, 1405, 1409, 1412, 1415, 1419, 1422, 1425, 1429, 1432, 1435, 1439, 1442, 1445, 1449, 1452, 1455, 1459, 1462, 1465, 1469, 1472, 1475, 1478,
    1482, 1485, 1488, 1492, 1495, 1498, 1502, 1505, 1508, 1512, 1515, 1518, 1522, 1525, 1528, 1532, 1535, 1538, 1542, 1545, 1548, 1552, 1555, 1558, 1562, 1565, 1568, 1572, 1575, 1578, 1581, 1585, 1588, 1591, 1595, 1598, 1601, 1605, 1608, 1611, 1615, 1618, 1621, 1625, 1628, 1631, 1635, 1638, 1641, 1645, 1648, 1651, 1655, 1658, 1661, 1665, 1668, 1671, 1674, 1678, 1681, 1684, 1688, 1691, 1694, 1698, 1701, 1704, 1708, 1711, 1714, 1718, 1721, 1724, 1728, 1731, 1734, 1738, 1741, 1744, 1748, 1751, 1754, 1758, 1761,
    1764, 1767, 1771, 1774, 1777, 1781, 1784, 1787, 1791, 1794, 1797, 1801, 1804, 1807, 1811, 1814, 1817, 1821, 1824, 1827, 1831, 1834, 1837, 1841, 1844, 1847, 1851, 1854, 1857, 1861, 1864, 1867, 1870, 1874, 1877, 1880, 1884, 1887, 1890, 1894, 1897, 1900, 1904, 1907, 1910, 1914, 1917, 1920, 1924, 1927, 1930, 1934, 1937, 1940, 1944, 1947, 1950, 1954, 1957, 1960, 1963, 1967, 1970, 1973, 1977, 1980, 1983, 1987, 1990, 1993, 1997, 2000, 2003, 2007, 2010, 2013, 2017, 2020, 2023, 2027, 2030, 2033, 2037, 2040, 2043,
    2047, 2050, 2053, 2057, 2060, 2063, 2066, 2070, 2073, 2076, 2080, 2083, 2086, 2090, 2093, 2096, 2100, 2103, 2106, 2110, 2113, 2116, 2120]);
};
function jur_EOLSet() {
    jur_AbstractSet.call(this);
    this.$consCounter0 = 0;
}
let jur_EOLSet__init_ = ($this, $counter) => {
    jur_AbstractSet__init_($this);
    $this.$consCounter0 = $counter;
},
jur_EOLSet__init_0 = var_0 => {
    let var_1 = new jur_EOLSet();
    jur_EOLSet__init_(var_1, var_0);
    return var_1;
},
jur_EOLSet_matches = ($this, $strIndex, $testString, $matchResult) => {
    let $rightBound, var$5, var$6, $ch;
    $rightBound = !$matchResult.$hasAnchoringBounds() ? $testString.$length() : $matchResult.$getRightBound();
    if ($strIndex >= $rightBound) {
        $matchResult.$setConsumed($this.$consCounter0, 0);
        return $this.$next1.$matches($strIndex, $testString, $matchResult);
    }
    var$5 = $rightBound - $strIndex | 0;
    if (var$5 == 2 && $testString.$charAt($strIndex) == 13) {
        var$6 = $strIndex + 1 | 0;
        if ($testString.$charAt(var$6) == 10) {
            $matchResult.$setConsumed($this.$consCounter0, 0);
            return $this.$next1.$matches($strIndex, $testString, $matchResult);
        }
    }
    a: {
        if (var$5 == 1) {
            $ch = $testString.$charAt($strIndex);
            if ($ch == 10)
                break a;
            if ($ch == 13)
                break a;
            if ($ch == 133)
                break a;
            if (($ch | 1) == 8233)
                break a;
        }
        return (-1);
    }
    $matchResult.$setConsumed($this.$consCounter0, 0);
    return $this.$next1.$matches($strIndex, $testString, $matchResult);
},
jur_EOLSet_hasConsumed = ($this, $matchResult) => {
    let $res;
    $res = !$matchResult.$getConsumed($this.$consCounter0) ? 0 : 1;
    $matchResult.$setConsumed($this.$consCounter0, (-1));
    return $res;
},
otr_StringInfo = $rt_classWithoutFields(otrr_ReflectionInfo);
function jur_Lexer() {
    let a = this; jl_Object.call(a);
    a.$pattern0 = null;
    a.$flags0 = 0;
    a.$mode0 = 0;
    a.$savedMode = 0;
    a.$lookBack = 0;
    a.$ch = 0;
    a.$lookAhead0 = 0;
    a.$groupName = null;
    a.$patternFullLength = 0;
    a.$curST = null;
    a.$lookAheadST = null;
    a.$index = 0;
    a.$prevNW = 0;
    a.$curToc = 0;
    a.$lookAheadToc = 0;
    a.$orig = null;
}
let jur_Lexer_decompTable = null,
jur_Lexer_singleDecompTable = null,
jur_Lexer_singleDecompTableSize = 0,
jur_Lexer__init_ = ($this, $pattern, $flags) => {
    jl_Object__init_($this);
    $this.$mode0 = 1;
    $this.$orig = $pattern;
    if (($flags & 16) > 0)
        $pattern = jur_Pattern_quote($pattern);
    else if (($flags & 128) > 0)
        $pattern = jur_Lexer_normalize($pattern);
    $this.$pattern0 = $rt_createCharArray($pattern.$length() + 2 | 0);
    jl_System_fastArraycopy($pattern.$toCharArray(), 0, $this.$pattern0, 0, $pattern.$length());
    $this.$pattern0.data[$this.$pattern0.data.length - 1 | 0] = 0;
    $this.$pattern0.data[$this.$pattern0.data.length - 2 | 0] = 0;
    $this.$patternFullLength = $this.$pattern0.data.length;
    $this.$flags0 = $flags;
    jur_Lexer_movePointer($this);
    jur_Lexer_movePointer($this);
},
jur_Lexer__init_0 = (var_0, var_1) => {
    let var_2 = new jur_Lexer();
    jur_Lexer__init_(var_2, var_0, var_1);
    return var_2;
},
jur_Lexer_peek = $this => {
    return $this.$ch;
},
jur_Lexer_setMode = ($this, $mode) => {
    if ($mode > 0 && $mode < 3)
        $this.$mode0 = $mode;
    if ($mode == 1)
        jur_Lexer_reread($this);
},
jur_Lexer_restoreFlags = ($this, $flags) => {
    $this.$flags0 = $flags;
    $this.$lookAhead0 = $this.$ch;
    $this.$lookAheadST = $this.$curST;
    $this.$index = $this.$curToc + 1 | 0;
    $this.$lookAheadToc = $this.$curToc;
    jur_Lexer_movePointer($this);
},
jur_Lexer_peekSpecial = $this => {
    return $this.$curST;
},
jur_Lexer_isSpecial = $this => {
    return $this.$curST === null ? 0 : 1;
},
jur_Lexer_isNextSpecial = $this => {
    return $this.$lookAheadST === null ? 0 : 1;
},
jur_Lexer_next = $this => {
    jur_Lexer_movePointer($this);
    return $this.$lookBack;
},
jur_Lexer_nextSpecial = $this => {
    let $res;
    $res = $this.$curST;
    jur_Lexer_movePointer($this);
    return $res;
},
jur_Lexer_lookAhead = $this => {
    return $this.$lookAhead0;
},
jur_Lexer_back = $this => {
    return $this.$lookBack;
},
jur_Lexer_normalize = $input => {
    return $input;
},
jur_Lexer_reread = $this => {
    $this.$lookAhead0 = $this.$ch;
    $this.$lookAheadST = $this.$curST;
    $this.$index = $this.$lookAheadToc;
    $this.$lookAheadToc = $this.$curToc;
    jur_Lexer_movePointer($this);
},
jur_Lexer_movePointer = $this => {
    let $reread, var$2, $cs, $negative, $nonCap, $behindOrNamed, $nameBuilder, var$8, $mod, $$je;
    $this.$lookBack = $this.$ch;
    $this.$ch = $this.$lookAhead0;
    $this.$curST = $this.$lookAheadST;
    $this.$curToc = $this.$lookAheadToc;
    $this.$lookAheadToc = $this.$index;
    a: {
        while (true) {
            $reread = 0;
            $this.$lookAhead0 = $this.$index >= $this.$pattern0.data.length ? 0 : jur_Lexer_nextCodePoint($this);
            $this.$lookAheadST = null;
            if ($this.$mode0 == 4) {
                if ($this.$lookAhead0 != 92)
                    return;
                $this.$lookAhead0 = $this.$index >= $this.$pattern0.data.length ? 0 : $this.$pattern0.data[jur_Lexer_nextIndex($this)];
                switch ($this.$lookAhead0) {
                    case 69:
                        break;
                    default:
                        $this.$lookAhead0 = 92;
                        $this.$index = $this.$prevNW;
                        return;
                }
                $this.$mode0 = $this.$savedMode;
                $this.$lookAhead0 = $this.$index > ($this.$pattern0.data.length - 2 | 0) ? 0 : jur_Lexer_nextCodePoint($this);
            }
            b: {
                if ($this.$lookAhead0 == 92) {
                    var$2 = $this.$index >= ($this.$pattern0.data.length - 2 | 0) ? (-1) : jur_Lexer_nextCodePoint($this);
                    c: {
                        $this.$lookAhead0 = var$2;
                        switch ($this.$lookAhead0) {
                            case -1:
                                $rt_throw(jur_PatternSyntaxException__init_($rt_s(13), $this.$toString(), $this.$index));
                            case 0:
                            case 1:
                            case 2:
                            case 3:
                            case 4:
                            case 5:
                            case 6:
                            case 7:
                            case 8:
                            case 9:
                            case 10:
                            case 11:
                            case 12:
                            case 13:
                            case 14:
                            case 15:
                            case 16:
                            case 17:
                            case 18:
                            case 19:
                            case 20:
                            case 21:
                            case 22:
                            case 23:
                            case 24:
                            case 25:
                            case 26:
                            case 27:
                            case 28:
                            case 29:
                            case 30:
                            case 31:
                            case 32:
                            case 33:
                            case 34:
                            case 35:
                            case 36:
                            case 37:
                            case 38:
                            case 39:
                            case 40:
                            case 41:
                            case 42:
                            case 43:
                            case 44:
                            case 45:
                            case 46:
                            case 47:
                            case 58:
                            case 59:
                            case 60:
                            case 61:
                            case 62:
                            case 63:
                            case 64:
                            case 91:
                            case 92:
                            case 93:
                            case 94:
                            case 95:
                            case 96:
                            case 118:
                                break;
                            case 48:
                                $this.$lookAhead0 = jur_Lexer_readOctals($this);
                                break b;
                            case 49:
                            case 50:
                            case 51:
                            case 52:
                            case 53:
                            case 54:
                            case 55:
                            case 56:
                            case 57:
                                if ($this.$mode0 != 1)
                                    break b;
                                $this.$lookAhead0 = (-2147483648) | $this.$lookAhead0;
                                break b;
                            case 65:
                                $this.$lookAhead0 = (-2147483583);
                                break b;
                            case 66:
                                $this.$lookAhead0 = (-2147483582);
                                break b;
                            case 67:
                            case 69:
                            case 70:
                            case 72:
                            case 73:
                            case 74:
                            case 75:
                            case 76:
                            case 77:
                            case 78:
                            case 79:
                            case 82:
                            case 84:
                            case 85:
                            case 86:
                            case 88:
                            case 89:
                            case 103:
                            case 104:
                            case 105:
                            case 106:
                            case 107:
                            case 108:
                            case 109:
                            case 111:
                            case 113:
                            case 121:
                                $rt_throw(jur_PatternSyntaxException__init_($rt_s(13), $this.$toString(), $this.$index));
                            case 68:
                            case 83:
                            case 87:
                            case 100:
                            case 115:
                            case 119:
                                $this.$lookAheadST = jur_AbstractCharClass_getPredefinedClass(jl_String__init_1($this.$pattern0, $this.$prevNW, 1), 0);
                                $this.$lookAhead0 = 0;
                                break b;
                            case 71:
                                $this.$lookAhead0 = (-2147483577);
                                break b;
                            case 80:
                            case 112:
                                break c;
                            case 81:
                                $this.$savedMode = $this.$mode0;
                                $this.$mode0 = 4;
                                $reread = 1;
                                break b;
                            case 90:
                                $this.$lookAhead0 = (-2147483558);
                                break b;
                            case 97:
                                $this.$lookAhead0 = 7;
                                break b;
                            case 98:
                                $this.$lookAhead0 = (-2147483550);
                                break b;
                            case 99:
                                if ($this.$index >= ($this.$pattern0.data.length - 2 | 0))
                                    $rt_throw(jur_PatternSyntaxException__init_($rt_s(13), $this.$toString(), $this.$index));
                                $this.$lookAhead0 = $this.$pattern0.data[jur_Lexer_nextIndex($this)] & 31;
                                break b;
                            case 101:
                                $this.$lookAhead0 = 27;
                                break b;
                            case 102:
                                $this.$lookAhead0 = 12;
                                break b;
                            case 110:
                                $this.$lookAhead0 = 10;
                                break b;
                            case 114:
                                $this.$lookAhead0 = 13;
                                break b;
                            case 116:
                                $this.$lookAhead0 = 9;
                                break b;
                            case 117:
                                $this.$lookAhead0 = jur_Lexer_readHex($this, 4);
                                break b;
                            case 120:
                                $this.$lookAhead0 = jur_Lexer_readHex($this, 2);
                                break b;
                            case 122:
                                $this.$lookAhead0 = (-2147483526);
                                break b;
                            default:
                        }
                        break b;
                    }
                    $cs = jur_Lexer_parseCharClassName($this);
                    $negative = 0;
                    if ($this.$lookAhead0 == 80)
                        $negative = 1;
                    try {
                        $this.$lookAheadST = jur_AbstractCharClass_getPredefinedClass($cs, $negative);
                    } catch ($$e) {
                        $$je = $rt_wrapException($$e);
                        if ($$je instanceof ju_MissingResourceException) {
                            $rt_throw(jur_PatternSyntaxException__init_($rt_s(13), $this.$toString(), $this.$index));
                        } else {
                            throw $$e;
                        }
                    }
                    $this.$lookAhead0 = 0;
                } else if ($this.$mode0 == 1)
                    switch ($this.$lookAhead0) {
                        case 36:
                            $this.$lookAhead0 = (-536870876);
                            break b;
                        case 40:
                            if ($this.$pattern0.data[$this.$index] != 63) {
                                $this.$lookAhead0 = (-2147483608);
                                break b;
                            }
                            jur_Lexer_nextIndex($this);
                            $nonCap = $this.$pattern0.data[$this.$index];
                            $behindOrNamed = 0;
                            $nameBuilder = null;
                            while (true) {
                                d: {
                                    if (!$behindOrNamed) {
                                        switch ($nonCap) {
                                            case 33:
                                                break;
                                            case 60:
                                                jur_Lexer_nextIndex($this);
                                                $nonCap = $this.$pattern0.data[$this.$index];
                                                $behindOrNamed = 1;
                                                break d;
                                            case 61:
                                                $this.$lookAhead0 = (-536870872);
                                                jur_Lexer_nextIndex($this);
                                                break d;
                                            case 62:
                                                $this.$lookAhead0 = (-33554392);
                                                jur_Lexer_nextIndex($this);
                                                break d;
                                            default:
                                                $this.$lookAhead0 = jur_Lexer_readFlags($this);
                                                if ($this.$lookAhead0 < 256) {
                                                    $this.$flags0 = $this.$lookAhead0;
                                                    $this.$lookAhead0 = $this.$lookAhead0 << 16;
                                                    $this.$lookAhead0 = (-1073741784) | $this.$lookAhead0;
                                                    break d;
                                                }
                                                $this.$lookAhead0 = $this.$lookAhead0 & 255;
                                                $this.$flags0 = $this.$lookAhead0;
                                                $this.$lookAhead0 = $this.$lookAhead0 << 16;
                                                $this.$lookAhead0 = (-16777176) | $this.$lookAhead0;
                                                break d;
                                        }
                                        $this.$lookAhead0 = (-268435416);
                                        jur_Lexer_nextIndex($this);
                                    } else {
                                        e: {
                                            switch ($nonCap) {
                                                case 33:
                                                    break;
                                                case 61:
                                                    $behindOrNamed = 0;
                                                    $this.$lookAhead0 = (-134217688);
                                                    jur_Lexer_nextIndex($this);
                                                    break d;
                                                case 62:
                                                    if ($nameBuilder === null)
                                                        $rt_throw(jur_PatternSyntaxException__init_($rt_s(13), $this.$toString(), $this.$index));
                                                    $this.$groupName = $nameBuilder.$toString();
                                                    jur_Lexer_nextIndex($this);
                                                    $nameBuilder = null;
                                                    $behindOrNamed = 0;
                                                    $this.$lookAhead0 = (-2130706392);
                                                    break d;
                                                default:
                                                    break e;
                                            }
                                            $behindOrNamed = 0;
                                            $this.$lookAhead0 = (-67108824);
                                            jur_Lexer_nextIndex($this);
                                            break d;
                                        }
                                        f: {
                                            if (!($nonCap >= 65 && $nonCap <= 90)) {
                                                if ($nonCap < 97)
                                                    break f;
                                                if ($nonCap > 122)
                                                    break f;
                                            }
                                            if ($nameBuilder === null)
                                                $nameBuilder = jl_StringBuilder__init_();
                                            $nameBuilder.$append0($nonCap);
                                            jur_Lexer_nextIndex($this);
                                            $nonCap = $this.$pattern0.data[$this.$index];
                                            break d;
                                        }
                                        if ($nonCap < 48)
                                            break a;
                                        if ($nonCap > 57)
                                            break a;
                                        if ($nameBuilder === null) {
                                            var$8 = jur_PatternSyntaxException__init_($rt_s(439), $this.$toString(), $this.$index);
                                            $rt_throw(var$8);
                                        }
                                        $nameBuilder.$append0($nonCap);
                                        jur_Lexer_nextIndex($this);
                                        $nonCap = $this.$pattern0.data[$this.$index];
                                    }
                                }
                                if (!$behindOrNamed)
                                    break;
                            }
                            break b;
                        case 41:
                            $this.$lookAhead0 = (-536870871);
                            break b;
                        case 42:
                        case 43:
                        case 63:
                            $mod = $this.$index >= $this.$pattern0.data.length ? 42 : $this.$pattern0.data[$this.$index];
                            switch ($mod) {
                                case 43:
                                    $this.$lookAhead0 = $this.$lookAhead0 | (-2147483648);
                                    jur_Lexer_nextIndex($this);
                                    break b;
                                case 63:
                                    $this.$lookAhead0 = $this.$lookAhead0 | (-1073741824);
                                    jur_Lexer_nextIndex($this);
                                    break b;
                                default:
                            }
                            $this.$lookAhead0 = $this.$lookAhead0 | (-536870912);
                            break b;
                        case 46:
                            $this.$lookAhead0 = (-536870866);
                            break b;
                        case 91:
                            $this.$lookAhead0 = (-536870821);
                            $this.$setMode(2);
                            break b;
                        case 93:
                            if ($this.$mode0 != 2)
                                break b;
                            $this.$lookAhead0 = (-536870819);
                            break b;
                        case 94:
                            $this.$lookAhead0 = (-536870818);
                            break b;
                        case 123:
                            $this.$lookAheadST = jur_Lexer_processQuantifier($this, $this.$lookAhead0);
                            break b;
                        case 124:
                            $this.$lookAhead0 = (-536870788);
                            break b;
                        default:
                    }
                else if ($this.$mode0 == 2)
                    switch ($this.$lookAhead0) {
                        case 38:
                            $this.$lookAhead0 = (-536870874);
                            break b;
                        case 45:
                            $this.$lookAhead0 = (-536870867);
                            break b;
                        case 91:
                            $this.$lookAhead0 = (-536870821);
                            break b;
                        case 93:
                            $this.$lookAhead0 = (-536870819);
                            break b;
                        case 94:
                            $this.$lookAhead0 = (-536870818);
                            break b;
                        default:
                    }
            }
            if ($reread)
                continue;
            else
                break;
        }
        return;
    }
    $rt_throw(jur_PatternSyntaxException__init_($rt_s(13), $this.$toString(), $this.$index));
},
jur_Lexer_parseCharClassName = $this => {
    let $sb, var$2, var$3, $ch, $res;
    $sb = jl_StringBuilder__init_1(10);
    if ($this.$index < ($this.$pattern0.data.length - 2 | 0)) {
        if ($this.$pattern0.data[$this.$index] != 123) {
            var$2 = jl_String__init_1($this.$pattern0, jur_Lexer_nextIndex($this), 1);
            var$3 = jl_StringBuilder__init_();
            jl_StringBuilder_append(jl_StringBuilder_append(var$3, $rt_s(440)), var$2);
            return jl_StringBuilder_toString(var$3);
        }
        jur_Lexer_nextIndex($this);
        $ch = 0;
        a: {
            while ($this.$index < ($this.$pattern0.data.length - 2 | 0)) {
                $ch = $this.$pattern0.data[jur_Lexer_nextIndex($this)];
                if ($ch == 125)
                    break a;
                $sb.$append0($ch);
            }
        }
        if ($ch != 125)
            $rt_throw(jur_PatternSyntaxException__init_($rt_s(13), $this.$toString(), $this.$index));
    }
    if (!$sb.$length())
        $rt_throw(jur_PatternSyntaxException__init_($rt_s(13), $this.$toString(), $this.$index));
    $res = $sb.$toString();
    if ($res.$length() == 1) {
        var$2 = jl_StringBuilder__init_();
        jl_StringBuilder_append(jl_StringBuilder_append(var$2, $rt_s(440)), $res);
        return jl_StringBuilder_toString(var$2);
    }
    b: {
        c: {
            if ($res.$length() > 3) {
                if ($res.$startsWith1($rt_s(440)))
                    break c;
                if ($res.$startsWith1($rt_s(441)))
                    break c;
            }
            break b;
        }
        $res = $res.$substring0(2);
    }
    return $res;
},
jur_Lexer_processQuantifier = ($this, $ch) => {
    let $sb, $min, $max, $mod, $$je;
    $sb = jl_StringBuilder__init_1(4);
    $min = (-1);
    $max = 2147483647;
    a: {
        while (true) {
            if ($this.$index >= $this.$pattern0.data.length)
                break a;
            $ch = $this.$pattern0.data[jur_Lexer_nextIndex($this)];
            if ($ch == 125)
                break a;
            if ($ch == 44 && $min < 0)
                try {
                    $min = jl_Integer_parseInt($sb.$toString(), 10);
                    $sb.$delete0(0, $sb.$length());
                    continue;
                } catch ($$e) {
                    $$je = $rt_wrapException($$e);
                    if ($$je instanceof jl_NumberFormatException) {
                        break;
                    } else {
                        throw $$e;
                    }
                }
            $sb.$append0($ch & 65535);
        }
        $rt_throw(jur_PatternSyntaxException__init_($rt_s(13), $this.$toString(), $this.$index));
    }
    if ($ch != 125)
        $rt_throw(jur_PatternSyntaxException__init_($rt_s(13), $this.$toString(), $this.$index));
    if ($sb.$length() > 0)
        b: {
            try {
                $max = jl_Integer_parseInt($sb.$toString(), 10);
                if ($min >= 0)
                    break b;
                $min = $max;
                break b;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                if ($$je instanceof jl_NumberFormatException) {
                    $rt_throw(jur_PatternSyntaxException__init_($rt_s(13), $this.$toString(), $this.$index));
                } else {
                    throw $$e;
                }
            }
        }
    else if ($min < 0)
        $rt_throw(jur_PatternSyntaxException__init_($rt_s(13), $this.$toString(), $this.$index));
    if (($min | $max | ($max - $min | 0)) < 0)
        $rt_throw(jur_PatternSyntaxException__init_($rt_s(13), $this.$toString(), $this.$index));
    $mod = $this.$index >= $this.$pattern0.data.length ? 42 : $this.$pattern0.data[$this.$index];
    c: {
        switch ($mod) {
            case 43:
                $this.$lookAhead0 = (-2147483525);
                jur_Lexer_nextIndex($this);
                break c;
            case 63:
                $this.$lookAhead0 = (-1073741701);
                jur_Lexer_nextIndex($this);
                break c;
            default:
        }
        $this.$lookAhead0 = (-536870789);
    }
    return jur_Quantifier__init_0($min, $max);
},
jur_Lexer_toString = $this => {
    return $this.$orig;
},
jur_Lexer_isEmpty = $this => {
    return !$this.$ch && !$this.$lookAhead0 && $this.$index == $this.$patternFullLength && !$this.$isSpecial() ? 1 : 0;
},
jur_Lexer_isLetter = $ch => {
    return $ch < 0 ? 0 : 1;
},
jur_Lexer_isLetter0 = $this => {
    return !$this.$isEmpty() && !$this.$isSpecial() && jur_Lexer_isLetter($this.$ch) ? 1 : 0;
},
jur_Lexer_isHighSurrogate0 = $this => {
    return $this.$ch <= 56319 && $this.$ch >= 55296 ? 1 : 0;
},
jur_Lexer_isLowSurrogate0 = $this => {
    return $this.$ch <= 57343 && $this.$ch >= 56320 ? 1 : 0;
},
jur_Lexer_isHighSurrogate = $ch => {
    return $ch <= 56319 && $ch >= 55296 ? 1 : 0;
},
jur_Lexer_isLowSurrogate = $ch => {
    return $ch <= 57343 && $ch >= 56320 ? 1 : 0;
},
jur_Lexer_readHex = ($this, $max) => {
    let $st, $length, $i, var$5, $$je;
    $st = jl_StringBuilder__init_1($max);
    $length = $this.$pattern0.data.length - 2 | 0;
    $i = 0;
    while (true) {
        var$5 = $rt_compare($i, $max);
        if (var$5 >= 0)
            break;
        if ($this.$index >= $length)
            break;
        $st.$append0($this.$pattern0.data[jur_Lexer_nextIndex($this)]);
        $i = $i + 1 | 0;
    }
    if (!var$5)
        a: {
            try {
                var$5 = jl_Integer_parseInt($st.$toString(), 16);
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                if ($$je instanceof jl_NumberFormatException) {
                    break a;
                } else {
                    throw $$e;
                }
            }
            return var$5;
        }
    $rt_throw(jur_PatternSyntaxException__init_($rt_s(13), $this.$toString(), $this.$index));
},
jur_Lexer_readOctals = $this => {
    let $max, $i, $length, $res, var$5;
    $max = 3;
    $i = 1;
    $length = $this.$pattern0.data.length - 2 | 0;
    $res = jl_Character_digit($this.$pattern0.data[$this.$index], 8);
    switch ($res) {
        case -1:
            break;
        default:
            if ($res > 3)
                $max = 2;
            jur_Lexer_nextIndex($this);
            a: {
                while (true) {
                    if ($i >= $max)
                        break a;
                    if ($this.$index >= $length)
                        break a;
                    var$5 = jl_Character_digit($this.$pattern0.data[$this.$index], 8);
                    if (var$5 < 0)
                        break;
                    $res = ($res * 8 | 0) + var$5 | 0;
                    jur_Lexer_nextIndex($this);
                    $i = $i + 1 | 0;
                }
            }
            return $res;
    }
    $rt_throw(jur_PatternSyntaxException__init_($rt_s(13), $this.$toString(), $this.$index));
},
jur_Lexer_readFlags = $this => {
    let $pos, $res, $ch;
    $pos = 1;
    $res = $this.$flags0;
    a: while (true) {
        if ($this.$index >= $this.$pattern0.data.length)
            $rt_throw(jur_PatternSyntaxException__init_($rt_s(13), $this.$toString(), $this.$index));
        b: {
            c: {
                $ch = $this.$pattern0.data[$this.$index];
                switch ($ch) {
                    case 41:
                        jur_Lexer_nextIndex($this);
                        return $res | 256;
                    case 45:
                        if (!$pos)
                            $rt_throw(jur_PatternSyntaxException__init_($rt_s(13), $this.$toString(), $this.$index));
                        $pos = 0;
                        break b;
                    case 58:
                        break a;
                    case 100:
                        break c;
                    case 105:
                        $res = $pos ? $res | 2 : ($res ^ 2) & $res;
                        break b;
                    case 109:
                        $res = $pos ? $res | 8 : ($res ^ 8) & $res;
                        break b;
                    case 115:
                        $res = $pos ? $res | 32 : ($res ^ 32) & $res;
                        break b;
                    case 117:
                        $res = $pos ? $res | 64 : ($res ^ 64) & $res;
                        break b;
                    case 120:
                        $res = $pos ? $res | 4 : ($res ^ 4) & $res;
                        break b;
                    default:
                }
                break b;
            }
            $res = $pos ? $res | 1 : ($res ^ 1) & $res;
        }
        jur_Lexer_nextIndex($this);
    }
    jur_Lexer_nextIndex($this);
    return $res;
},
jur_Lexer_nextIndex = $this => {
    $this.$prevNW = $this.$index;
    if ($this.$flags0 & 4)
        jur_Lexer_skipComments($this);
    else
        $this.$index = $this.$index + 1 | 0;
    return $this.$prevNW;
},
jur_Lexer_skipComments = $this => {
    let $length;
    $length = $this.$pattern0.data.length - 2 | 0;
    $this.$index = $this.$index + 1 | 0;
    a: while (true) {
        if ($this.$index < $length && jl_Character_isWhitespace0($this.$pattern0.data[$this.$index])) {
            $this.$index = $this.$index + 1 | 0;
            continue;
        }
        if ($this.$index >= $length)
            break;
        if ($this.$pattern0.data[$this.$index] != 35)
            break;
        $this.$index = $this.$index + 1 | 0;
        while (true) {
            if ($this.$index >= $length)
                continue a;
            if (jur_Lexer_isLineSeparator($this, $this.$pattern0.data[$this.$index]))
                continue a;
            $this.$index = $this.$index + 1 | 0;
        }
    }
    return $this.$index;
},
jur_Lexer_isLineSeparator = ($this, $ch) => {
    return $ch != 10 && $ch != 13 && $ch != 133 && ($ch | 1) != 8233 ? 0 : 1;
},
jur_Lexer_getDecomposition = $ch => {
    return jur_Lexer_decompTable.$get7($ch);
},
jur_Lexer_getHangulDecomposition = $ch => {
    let $sIndex, $l, $v, $t, $decomp, var$7;
    $sIndex = $ch - 44032 | 0;
    if ($sIndex >= 0 && $sIndex < 11172) {
        $l = 4352 + ($sIndex / 588 | 0) | 0;
        $v = 4449 + (($sIndex % 588 | 0) / 28 | 0) | 0;
        $t = $sIndex % 28 | 0;
        if (!$t)
            $decomp = $rt_createIntArrayFromData([$l, $v]);
        else {
            var$7 = 4519 + $t | 0;
            $decomp = $rt_createIntArrayFromData([$l, $v, var$7]);
        }
        return $decomp;
    }
    return null;
},
jur_Lexer_hasSingleCodepointDecomposition = $ch => {
    let $hasSingleDecomp;
    $hasSingleDecomp = jur_Lexer_singleDecompTable.$get5($ch);
    return $hasSingleDecomp == jur_Lexer_singleDecompTableSize ? 0 : 1;
},
jur_Lexer_hasDecompositionNonNullCanClass = $ch => {
    return ($ch != 832 ? 0 : 1) | ($ch != 833 ? 0 : 1) | ($ch != 835 ? 0 : 1) | ($ch != 836 ? 0 : 1);
},
jur_Lexer_nextCodePoint = $this => {
    let $high, $lowExpectedIndex, $low;
    $high = $this.$pattern0.data[jur_Lexer_nextIndex($this)];
    if (jl_Character_isHighSurrogate($high)) {
        $lowExpectedIndex = $this.$prevNW + 1 | 0;
        if ($lowExpectedIndex < $this.$pattern0.data.length) {
            $low = $this.$pattern0.data[$lowExpectedIndex];
            if (jl_Character_isLowSurrogate($low)) {
                jur_Lexer_nextIndex($this);
                return jl_Character_toCodePoint($high, $low);
            }
        }
    }
    return $high;
},
jur_Lexer_getIndex = $this => {
    return $this.$curToc;
};
function ju_WeakHashMap() {
    let a = this; ju_AbstractMap.call(a);
    a.$referenceQueue = null;
    a.$elementCount1 = 0;
    a.$elementData1 = null;
    a.$loadFactor0 = 0;
    a.$threshold1 = 0;
}
let ju_WeakHashMap_newEntryArray = $size => {
    return $rt_createArray(ju_WeakHashMap$Entry, $size);
},
ju_WeakHashMap__init_0 = $this => {
    ju_WeakHashMap__init_($this, 16);
},
ju_WeakHashMap__init_1 = () => {
    let var_0 = new ju_WeakHashMap();
    ju_WeakHashMap__init_0(var_0);
    return var_0;
},
ju_WeakHashMap__init_ = ($this, $capacity) => {
    ju_AbstractMap__init_($this);
    if ($capacity < 0)
        $rt_throw(jl_IllegalArgumentException__init_());
    $this.$elementCount1 = 0;
    if (!$capacity)
        $capacity = 1;
    $this.$elementData1 = ju_WeakHashMap_newEntryArray($capacity);
    $this.$loadFactor0 = 7500;
    ju_WeakHashMap_computeMaxSize($this);
    $this.$referenceQueue = jlr_ReferenceQueue__init_0();
},
ju_WeakHashMap__init_2 = var_0 => {
    let var_1 = new ju_WeakHashMap();
    ju_WeakHashMap__init_(var_1, var_0);
    return var_1;
},
ju_WeakHashMap_computeMaxSize = $this => {
    $this.$threshold1 = Long_lo(Long_div(Long_mul(Long_fromInt($this.$elementData1.data.length), Long_fromInt($this.$loadFactor0)), Long_fromInt(10000)));
},
jur_AbstractCharClass$LazySpecialsBlock = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazySpecialsBlock__init_ = $this => {
    jur_AbstractCharClass$LazyCharClass__init_($this);
},
jur_AbstractCharClass$LazySpecialsBlock__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazySpecialsBlock();
    jur_AbstractCharClass$LazySpecialsBlock__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazySpecialsBlock_computeValue = $this => {
    return ((jur_CharClass__init_()).$add1(65279, 65279)).$add1(65520, 65533);
},
jur_AbstractCharClass$LazyNonSpace = $rt_classWithoutFields(jur_AbstractCharClass$LazySpace),
jur_AbstractCharClass$LazyNonSpace__init_ = $this => {
    jur_AbstractCharClass$LazySpace__init_($this);
},
jur_AbstractCharClass$LazyNonSpace__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazyNonSpace();
    jur_AbstractCharClass$LazyNonSpace__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyNonSpace_computeValue = $this => {
    let $chCl;
    $chCl = (jur_AbstractCharClass$LazySpace_computeValue($this)).$setNegative(1);
    $chCl.$mayContainSupplCodepoints0 = 1;
    return $chCl;
},
otjt_Int32Array = $rt_classWithoutFields(otjt_TypedArray),
otji_JSWrapper$Helper$_clinit_$lambda$_3_1 = $rt_classWithoutFields(),
otji_JSWrapper$Helper$_clinit_$lambda$_3_1__init_ = var$0 => {
    jl_Object__init_(var$0);
},
otji_JSWrapper$Helper$_clinit_$lambda$_3_1__init_0 = () => {
    let var_0 = new otji_JSWrapper$Helper$_clinit_$lambda$_3_1();
    otji_JSWrapper$Helper$_clinit_$lambda$_3_1__init_(var_0);
    return var_0;
},
otji_JSWrapper$Helper$_clinit_$lambda$_3_1_accept = (var$0, var$1) => {
    otji_JSWrapper$Helper_lambda$static$1(var$1);
},
otji_JSWrapper$Helper$_clinit_$lambda$_3_1_accept$exported$0 = (var$1, var$2) => {
    var$1.$accept(var$2);
},
otji_JSWrapper$Helper$_clinit_$lambda$_3_0 = $rt_classWithoutFields(),
otji_JSWrapper$Helper$_clinit_$lambda$_3_0__init_ = var$0 => {
    jl_Object__init_(var$0);
},
otji_JSWrapper$Helper$_clinit_$lambda$_3_0__init_0 = () => {
    let var_0 = new otji_JSWrapper$Helper$_clinit_$lambda$_3_0();
    otji_JSWrapper$Helper$_clinit_$lambda$_3_0__init_(var_0);
    return var_0;
},
otji_JSWrapper$Helper$_clinit_$lambda$_3_0_accept = (var$0, var$1) => {
    otji_JSWrapper$Helper_lambda$static$0(var$1);
},
otji_JSWrapper$Helper$_clinit_$lambda$_3_0_accept$exported$0 = (var$1, var$2) => {
    var$1.$accept(var$2);
},
ju_Collections = $rt_classWithoutFields(),
ju_Collections_EMPTY_SET = null,
ju_Collections_EMPTY_MAP = null,
ju_Collections_EMPTY_LIST = null,
ju_Collections_EMPTY_ITERATOR = null,
ju_Collections_EMPTY_LIST_ITERATOR = null,
ju_Collections_reverseOrder = null,
ju_Collections_$callClinit = () => {
    ju_Collections_$callClinit = $rt_eraseClinit(ju_Collections);
    ju_Collections__clinit_();
},
ju_Collections_emptyMap = () => {
    ju_Collections_$callClinit();
    return ju_Collections_EMPTY_MAP;
},
ju_Collections_unmodifiableMap = $m => {
    ju_Collections_$callClinit();
    ju_Objects_requireNonNull($m);
    return ju_Collections$13__init_0($m);
},
ju_Collections__clinit_ = () => {
    ju_Collections_EMPTY_SET = ju_Collections$1__init_0();
    ju_Collections_EMPTY_MAP = ju_Collections$2__init_0();
    ju_Collections_EMPTY_LIST = ju_Collections$3__init_0();
    ju_Collections_EMPTY_ITERATOR = ju_Collections$4__init_0();
    ju_Collections_EMPTY_LIST_ITERATOR = ju_Collections$5__init_0();
    ju_Collections_reverseOrder = ju_Collections$_clinit_$lambda$_59_0__init_0();
};
$rt_packages([-1, "com", 0, "corrodinggames", 1, "rts", 2, "gameFramework", 3, "b", -1, "java", 5, "util", 6, "regex", 5, "nio", 5, "lang", -1, "org", 10, "teavm", 11, "jso", 12, "impl"
]);
$rt_metadata([jl_Object, "Object", 9, 0, [], 1, 0, 0, ["$isEmptyMonitor", $rt_wrapFunction0(jl_Object_isEmptyMonitor), "$getClass", $rt_wrapFunction0(jl_Object_getClass), "$hashCode0", $rt_wrapFunction0(jl_Object_hashCode), "$equals", $rt_wrapFunction1(jl_Object_equals), "$toString", $rt_wrapFunction0(jl_Object_toString), "$identity", $rt_wrapFunction0(jl_Object_identity), "$clone0", $rt_wrapFunction0(jl_Object_clone)],
jur_AbstractCharClass$LazyCharClass, 0, jl_Object, [], 1024, 0, 0, ["$_init_0", $rt_wrapFunction0(jur_AbstractCharClass$LazyCharClass__init_), "$getValue", $rt_wrapFunction1(jur_AbstractCharClass$LazyCharClass_getValue)],
jur_AbstractCharClass$LazyBlank, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$_init_0", $rt_wrapFunction0(jur_AbstractCharClass$LazyBlank__init_), "$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyBlank_computeValue)],
jur_AbstractCharClass$LazyCntrl, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$_init_0", $rt_wrapFunction0(jur_AbstractCharClass$LazyCntrl__init_), "$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyCntrl_computeValue)],
ju_Enumeration, 0, jl_Object, [], 1537, 0, 0, 0,
ji_Serializable, 0, jl_Object, [], 1537, 0, 0, 0,
jl_Number, 0, jl_Object, [ji_Serializable], 1025, 0, 0, ["$_init_0", $rt_wrapFunction0(jl_Number__init_)],
jl_Comparable, 0, jl_Object, [], 1537, 0, 0, 0,
jl_Integer, "Integer", 9, jl_Number, [jl_Comparable], 1, 0, () => jl_Integer_$callClinit(), ["$_init_3", $rt_wrapFunction1(jl_Integer__init_), "$intValue", $rt_wrapFunction0(jl_Integer_intValue), "$toString", $rt_wrapFunction0(jl_Integer_toString1), "$hashCode0", $rt_wrapFunction0(jl_Integer_hashCode), "$equals", $rt_wrapFunction1(jl_Integer_equals)],
jl_Enum, 0, jl_Object, [jl_Comparable, ji_Serializable], 1025, 0, 0, ["$_init_4", $rt_wrapFunction2(jl_Enum__init_), "$ordinal", $rt_wrapFunction0(jl_Enum_ordinal)],
ag_Bitmap$Config, 0, jl_Enum, [], 65553, 0, () => ag_Bitmap$Config_$callClinit(), 0,
ao_GLES20, 0, jl_Object, [], 1, 0, () => ao_GLES20_$callClinit(), 0,
jl_AbstractStringBuilder$Constants, 0, jl_Object, [], 0, 0, () => jl_AbstractStringBuilder$Constants_$callClinit(), 0,
jur_AbstractSet, 0, jl_Object, [], 1024, 0, () => jur_AbstractSet_$callClinit(), ["$_init_0", $rt_wrapFunction0(jur_AbstractSet__init_), "$_init_9", $rt_wrapFunction1(jur_AbstractSet__init_0), "$find", $rt_wrapFunction3(jur_AbstractSet_find), "$findBack", $rt_wrapFunction4(jur_AbstractSet_findBack), "$setType", $rt_wrapFunction1(jur_AbstractSet_setType), "$getType", $rt_wrapFunction0(jur_AbstractSet_getType), "$getNext", $rt_wrapFunction0(jur_AbstractSet_getNext), "$setNext", $rt_wrapFunction1(jur_AbstractSet_setNext),
"$first", $rt_wrapFunction1(jur_AbstractSet_first), "$processBackRefReplacement", $rt_wrapFunction0(jur_AbstractSet_processBackRefReplacement), "$processSecondPass", $rt_wrapFunction0(jur_AbstractSet_processSecondPass)],
jur_JointSet, 0, jur_AbstractSet, [], 0, 0, 0, ["$_init_0", $rt_wrapFunction0(jur_JointSet__init_), "$_init_23", $rt_wrapFunction2(jur_JointSet__init_0), "$matches", $rt_wrapFunction3(jur_JointSet_matches), "$setNext", $rt_wrapFunction1(jur_JointSet_setNext), "$first", $rt_wrapFunction1(jur_JointSet_first), "$hasConsumed", $rt_wrapFunction1(jur_JointSet_hasConsumed), "$processSecondPass", $rt_wrapFunction0(jur_JointSet_processSecondPass)],
jur_SingleSet, 0, jur_JointSet, [], 0, 0, 0, ["$_init_8", $rt_wrapFunction2(jur_SingleSet__init_), "$matches", $rt_wrapFunction3(jur_SingleSet_matches), "$find", $rt_wrapFunction3(jur_SingleSet_find), "$findBack", $rt_wrapFunction4(jur_SingleSet_findBack), "$first", $rt_wrapFunction1(jur_SingleSet_first), "$processBackRefReplacement", $rt_wrapFunction0(jur_SingleSet_processBackRefReplacement), "$processSecondPass", $rt_wrapFunction0(jur_SingleSet_processSecondPass)],
jl_Runnable, 0, jl_Object, [], 1537, 0, 0, 0,
jl_Thread, 0, jl_Object, [jl_Runnable], 1, 0, () => jl_Thread_$callClinit(), ["$_init_", $rt_wrapFunction1(jl_Thread__init_), "$_init_6", $rt_wrapFunction2(jl_Thread__init_0), "$getUncaughtExceptionHandler", $rt_wrapFunction0(jl_Thread_getUncaughtExceptionHandler), "$setUncaughtExceptionHandler", $rt_wrapFunction1(jl_Thread_setUncaughtExceptionHandler)],
jur_AbstractCharClass$LazyAlpha, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$_init_0", $rt_wrapFunction0(jur_AbstractCharClass$LazyAlpha__init_), "$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyAlpha_computeValue)],
jur_BackReferencedSingleSet, 0, jur_SingleSet, [], 0, 0, 0, ["$_init_5", $rt_wrapFunction1(jur_BackReferencedSingleSet__init_), "$find", $rt_wrapFunction3(jur_BackReferencedSingleSet_find), "$findBack", $rt_wrapFunction4(jur_BackReferencedSingleSet_findBack), "$processBackRefReplacement", $rt_wrapFunction0(jur_BackReferencedSingleSet_processBackRefReplacement)],
ag_Paint$1, 0, jl_Object, [], 32768, 0, () => ag_Paint$1_$callClinit(), 0,
jur_AbstractCharClass$LazyWord, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$_init_0", $rt_wrapFunction0(jur_AbstractCharClass$LazyWord__init_), "$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyWord_computeValue)],
jur_AbstractCharClass$LazyNonWord, 0, jur_AbstractCharClass$LazyWord, [], 0, 0, 0, ["$_init_0", $rt_wrapFunction0(jur_AbstractCharClass$LazyNonWord__init_), "$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyNonWord_computeValue)],
jur_LeafSet, 0, jur_AbstractSet, [], 1024, 0, 0, ["$_init_9", $rt_wrapFunction1(jur_LeafSet__init_0), "$_init_0", $rt_wrapFunction0(jur_LeafSet__init_), "$matches", $rt_wrapFunction3(jur_LeafSet_matches), "$charCount", $rt_wrapFunction0(jur_LeafSet_charCount), "$hasConsumed", $rt_wrapFunction1(jur_LeafSet_hasConsumed)],
jur_CISequenceSet, 0, jur_LeafSet, [], 0, 0, 0, ["$_init_52", $rt_wrapFunction1(jur_CISequenceSet__init_), "$accepts", $rt_wrapFunction2(jur_CISequenceSet_accepts)],
jl_CharSequence, 0, jl_Object, [], 1537, 0, 0, 0,
ju_Map, 0, jl_Object, [], 1537, 0, 0, 0,
ju_SequencedMap, 0, jl_Object, [ju_Map], 1537, 0, 0, 0,
jl_Throwable, 0, jl_Object, [], 1, 0, 0, ["$fillInStackTrace", $rt_wrapFunction0(jl_Throwable_fillInStackTrace), "$getMessage", $rt_wrapFunction0(jl_Throwable_getMessage), "$getLocalizedMessage", $rt_wrapFunction0(jl_Throwable_getLocalizedMessage), "$getCause", $rt_wrapFunction0(jl_Throwable_getCause), "$toString", $rt_wrapFunction0(jl_Throwable_toString)],
jl_Exception, 0, jl_Throwable, [], 1, 0, 0, ["$_init_0", $rt_wrapFunction0(jl_Exception__init_), "$_init_", $rt_wrapFunction1(jl_Exception__init_0)],
jl_RuntimeException, "RuntimeException", 9, jl_Exception, [], 1, 0, 0, ["$_init_0", $rt_wrapFunction0(jl_RuntimeException__init_), "$_init_", $rt_wrapFunction1(jl_RuntimeException__init_0)],
jl_IndexOutOfBoundsException, "IndexOutOfBoundsException", 9, jl_RuntimeException, [], 1, 0, 0, ["$_init_0", $rt_wrapFunction0(jl_IndexOutOfBoundsException__init_0), "$_init_", $rt_wrapFunction1(jl_IndexOutOfBoundsException__init_2)],
jl_StringIndexOutOfBoundsException, "StringIndexOutOfBoundsException", 9, jl_IndexOutOfBoundsException, [], 1, 0, 0, ["$_init_0", $rt_wrapFunction0(jl_StringIndexOutOfBoundsException__init_0)],
ju_MissingResourceException, "MissingResourceException", 6, jl_RuntimeException, [], 1, 0, 0, ["$_init_18", $rt_wrapFunction3(ju_MissingResourceException__init_)],
jur_CIBackReferenceSet, 0, jur_JointSet, [], 0, 0, 0, ["$_init_10", $rt_wrapFunction2(jur_CIBackReferenceSet__init_), "$matches", $rt_wrapFunction3(jur_CIBackReferenceSet_matches), "$setNext", $rt_wrapFunction1(jur_CIBackReferenceSet_setNext), "$getString", $rt_wrapFunction1(jur_CIBackReferenceSet_getString), "$hasConsumed", $rt_wrapFunction1(jur_CIBackReferenceSet_hasConsumed)],
jur_UCIBackReferenceSet, 0, jur_CIBackReferenceSet, [], 0, 0, 0, ["$_init_10", $rt_wrapFunction2(jur_UCIBackReferenceSet__init_), "$matches", $rt_wrapFunction3(jur_UCIBackReferenceSet_matches)],
jn_ByteOrder, 0, jl_Object, [], 17, 0, () => jn_ByteOrder_$callClinit(), 0,
jur_AbstractCharClass$LazyCategory, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$_init_19", $rt_wrapFunction2(jur_AbstractCharClass$LazyCategory__init_0), "$_init_20", $rt_wrapFunction3(jur_AbstractCharClass$LazyCategory__init_1), "$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyCategory_computeValue)],
jur_QuantifierSet, 0, jur_AbstractSet, [], 1024, 0, 0, ["$_init_11", $rt_wrapFunction3(jur_QuantifierSet__init_), "$getInnerSet", $rt_wrapFunction0(jur_QuantifierSet_getInnerSet), "$first", $rt_wrapFunction1(jur_QuantifierSet_first), "$hasConsumed", $rt_wrapFunction1(jur_QuantifierSet_hasConsumed), "$processSecondPass", $rt_wrapFunction0(jur_QuantifierSet_processSecondPass)],
jur_DotAllQuantifierSet, 0, jur_QuantifierSet, [], 0, 0, 0, ["$_init_11", $rt_wrapFunction3(jur_DotAllQuantifierSet__init_), "$matches", $rt_wrapFunction3(jur_DotAllQuantifierSet_matches), "$find", $rt_wrapFunction3(jur_DotAllQuantifierSet_find)],
otji_JSWrapper$Helper, 0, jl_Object, [], 0, 0, () => otji_JSWrapper$Helper_$callClinit(), 0,
ju_Comparator, 0, jl_Object, [], 1537, 0, 0, 0,
jl_String$_clinit_$lambda$_118_0, 0, jl_Object, [ju_Comparator], 1, 0, 0, ["$_init_0", $rt_wrapFunction0(jl_String$_clinit_$lambda$_118_0__init_)],
jur_FSet, 0, jur_AbstractSet, [], 0, 0, () => jur_FSet_$callClinit(), ["$_init_3", $rt_wrapFunction1(jur_FSet__init_), "$matches", $rt_wrapFunction3(jur_FSet_matches), "$getGroupIndex", $rt_wrapFunction0(jur_FSet_getGroupIndex), "$hasConsumed", $rt_wrapFunction1(jur_FSet_hasConsumed)],
jur_BehindFSet, 0, jur_FSet, [], 0, 0, 0, ["$_init_3", $rt_wrapFunction1(jur_BehindFSet__init_), "$matches", $rt_wrapFunction3(jur_BehindFSet_matches)],
ag_Paint, 0, jl_Object, [], 1, 0, 0, ["$_init_0", $rt_wrapFunction0(ag_Paint__init_0), "$applyTo", $rt_wrapFunction1(ag_Paint_applyTo), "$setColor", $rt_wrapFunction1(ag_Paint_setColor), "$getStyle", $rt_wrapFunction0(ag_Paint_getStyle), "$setStyle", $rt_wrapFunction1(ag_Paint_setStyle), "$setStrokeWidth", $rt_wrapFunction1(ag_Paint_setStrokeWidth), "$setTextSize", $rt_wrapFunction1(ag_Paint_setTextSize)],
ccrgu_aa, 0, jl_Object, [], 17, 0, () => ccrgu_aa_$callClinit(), 0,
ag_Path, 0, jl_Object, [], 1, 0, 0, ["$_init_0", $rt_wrapFunction0(ag_Path__init_), "$moveTo", $rt_wrapFunction2(ag_Path_moveTo), "$lineTo", $rt_wrapFunction2(ag_Path_lineTo), "$close", $rt_wrapFunction0(ag_Path_close), "$emit", $rt_wrapFunction1(ag_Path_emit)],
otrfm_AbstractInMemoryVirtualFile, 0, jl_Object, [], 1025, 0, 0, ["$_init_", $rt_wrapFunction1(otrfm_AbstractInMemoryVirtualFile__init_)],
jur_LowHighSurrogateRangeSet, 0, jur_JointSet, [], 0, 0, 0, ["$_init_61", $rt_wrapFunction1(jur_LowHighSurrogateRangeSet__init_), "$setNext", $rt_wrapFunction1(jur_LowHighSurrogateRangeSet_setNext), "$matches", $rt_wrapFunction3(jur_LowHighSurrogateRangeSet_matches)]]);
$rt_metadata([jur_GroupQuantifierSet, 0, jur_QuantifierSet, [], 0, 0, 0, ["$_init_11", $rt_wrapFunction3(jur_GroupQuantifierSet__init_), "$matches", $rt_wrapFunction3(jur_GroupQuantifierSet_matches)],
jur_ReluctantGroupQuantifierSet, 0, jur_GroupQuantifierSet, [], 0, 0, 0, ["$_init_11", $rt_wrapFunction3(jur_ReluctantGroupQuantifierSet__init_), "$matches", $rt_wrapFunction3(jur_ReluctantGroupQuantifierSet_matches)],
jl_ClassCastException, "ClassCastException", 9, jl_RuntimeException, [], 1, 0, 0, 0,
ju_AbstractMap, 0, jl_Object, [ju_Map], 1025, 0, 0, ["$_init_0", $rt_wrapFunction0(ju_AbstractMap__init_), "$put", $rt_wrapFunction2(ju_AbstractMap_put)],
jl_Cloneable, 0, jl_Object, [], 1537, 0, 0, 0,
ju_HashMap, 0, ju_AbstractMap, [jl_Cloneable, ji_Serializable], 1, 0, 0, ["$newElementArray", $rt_wrapFunction1(ju_HashMap_newElementArray), "$_init_0", $rt_wrapFunction0(ju_HashMap__init_1), "$_init_3", $rt_wrapFunction1(ju_HashMap__init_0), "$_init_12", $rt_wrapFunction2(ju_HashMap__init_2), "$containsKey", $rt_wrapFunction1(ju_HashMap_containsKey), "$get", $rt_wrapFunction1(ju_HashMap_get), "$entryByKey", $rt_wrapFunction1(ju_HashMap_entryByKey), "$findNonNullKeyEntry", $rt_wrapFunction3(ju_HashMap_findNonNullKeyEntry),
"$findNullKeyEntry", $rt_wrapFunction0(ju_HashMap_findNullKeyEntry), "$put", $rt_wrapFunction2(ju_HashMap_put), "$rehash0", $rt_wrapFunction1(ju_HashMap_rehash0), "$rehash", $rt_wrapFunction0(ju_HashMap_rehash), "$remove0", $rt_wrapFunction1(ju_HashMap_remove), "$removeEntry", $rt_wrapFunction1(ju_HashMap_removeEntry), "$removeByKey", $rt_wrapFunction1(ju_HashMap_removeByKey), "$size", $rt_wrapFunction0(ju_HashMap_size)],
ju_LinkedHashMap, 0, ju_HashMap, [ju_SequencedMap], 1, 0, 0, ["$_init_0", $rt_wrapFunction0(ju_LinkedHashMap__init_), "$newElementArray", $rt_wrapFunction1(ju_LinkedHashMap_newElementArray), "$put", $rt_wrapFunction2(ju_LinkedHashMap_put), "$putImpl0", $rt_wrapFunction4(ju_LinkedHashMap_putImpl), "$removeLinkedEntry", $rt_wrapFunction1(ju_LinkedHashMap_removeLinkedEntry), "$removeEldestEntry", $rt_wrapFunction1(ju_LinkedHashMap_removeEldestEntry)],
jur_PosPlusGroupQuantifierSet, 0, jur_GroupQuantifierSet, [], 0, 0, 0, ["$_init_11", $rt_wrapFunction3(jur_PosPlusGroupQuantifierSet__init_), "$matches", $rt_wrapFunction3(jur_PosPlusGroupQuantifierSet_matches)],
jl_AbstractStringBuilder, 0, jl_Object, [ji_Serializable, jl_CharSequence], 0, 0, 0, ["$_init_0", $rt_wrapFunction0(jl_AbstractStringBuilder__init_0), "$_init_3", $rt_wrapFunction1(jl_AbstractStringBuilder__init_), "$_init_", $rt_wrapFunction1(jl_AbstractStringBuilder__init_2), "$_init_14", $rt_wrapFunction1(jl_AbstractStringBuilder__init_1), "$append16", $rt_wrapFunction1(jl_AbstractStringBuilder_append8), "$append6", $rt_wrapFunction1(jl_AbstractStringBuilder_append), "$insert0", $rt_wrapFunction2(jl_AbstractStringBuilder_insert0),
"$append17", $rt_wrapFunction1(jl_AbstractStringBuilder_append3), "$append1", $rt_wrapFunction2(jl_AbstractStringBuilder_append9), "$insert1", $rt_wrapFunction3(jl_AbstractStringBuilder_insert8), "$append18", $rt_wrapFunction1(jl_AbstractStringBuilder_append7), "$insert2", $rt_wrapFunction2(jl_AbstractStringBuilder_insert6), "$insert3", $rt_wrapFunction3(jl_AbstractStringBuilder_insert7), "$append19", $rt_wrapFunction1(jl_AbstractStringBuilder_append5), "$insert4", $rt_wrapFunction2(jl_AbstractStringBuilder_insert3),
"$append20", $rt_wrapFunction1(jl_AbstractStringBuilder_append6), "$insert5", $rt_wrapFunction2(jl_AbstractStringBuilder_insert4), "$append7", $rt_wrapFunction1(jl_AbstractStringBuilder_append2), "$insert6", $rt_wrapFunction2(jl_AbstractStringBuilder_insert1), "$insert", $rt_wrapFunction2(jl_AbstractStringBuilder_insert5), "$append21", $rt_wrapFunction1(jl_AbstractStringBuilder_append4), "$insert7", $rt_wrapFunction2(jl_AbstractStringBuilder_insert2), "$ensureCapacity", $rt_wrapFunction1(jl_AbstractStringBuilder_ensureCapacity),
"$toString", $rt_wrapFunction0(jl_AbstractStringBuilder_toString), "$length", $rt_wrapFunction0(jl_AbstractStringBuilder_length), "$charAt", $rt_wrapFunction1(jl_AbstractStringBuilder_charAt), "$append5", $rt_wrapFunction3(jl_AbstractStringBuilder_append1), "$insert8", $rt_wrapFunction4(jl_AbstractStringBuilder_insert), "$append8", $rt_wrapFunction1(jl_AbstractStringBuilder_append0), "$deleteCharAt0", $rt_wrapFunction1(jl_AbstractStringBuilder_deleteCharAt), "$delete", $rt_wrapFunction2(jl_AbstractStringBuilder_delete)],
jl_Appendable, 0, jl_Object, [], 1537, 0, 0, 0,
jl_StringBuffer, 0, jl_AbstractStringBuilder, [jl_Appendable], 1, 0, 0, ["$_init_0", $rt_wrapFunction0(jl_StringBuffer__init_0), "$append23", $rt_wrapFunction1(jl_StringBuffer_append0), "$append13", $rt_wrapFunction1(jl_StringBuffer_append2), "$append9", $rt_wrapFunction3(jl_StringBuffer_append3), "$append14", $rt_wrapFunction1(jl_StringBuffer_append1), "$insert9", $rt_wrapFunction4(jl_StringBuffer_insert0), "$insert10", $rt_wrapFunction2(jl_StringBuffer_insert4), "$insert11", $rt_wrapFunction2(jl_StringBuffer_insert1),
"$insert8", $rt_wrapFunction4(jl_StringBuffer_insert3), "$append5", $rt_wrapFunction3(jl_StringBuffer_append), "$charAt", $rt_wrapFunction1(jl_StringBuffer_charAt), "$length", $rt_wrapFunction0(jl_StringBuffer_length), "$toString", $rt_wrapFunction0(jl_StringBuffer_toString), "$ensureCapacity", $rt_wrapFunction1(jl_StringBuffer_ensureCapacity), "$insert6", $rt_wrapFunction2(jl_StringBuffer_insert2), "$insert0", $rt_wrapFunction2(jl_StringBuffer_insert)],
jn_Buffer, 0, jl_Object, [], 1025, 0, 0, ["$_init_0", $rt_wrapFunction0(jn_Buffer__init_), "$capacity", $rt_wrapFunction0(jn_Buffer_capacity), "$position", $rt_wrapFunction0(jn_Buffer_position), "$position0", $rt_wrapFunction1(jn_Buffer_position0), "$clear", $rt_wrapFunction0(jn_Buffer_clear), "$flip", $rt_wrapFunction0(jn_Buffer_flip), "$remaining", $rt_wrapFunction0(jn_Buffer_remaining)],
jur_SpecialToken, 0, jl_Object, [], 1024, 0, 0, ["$_init_0", $rt_wrapFunction0(jur_SpecialToken__init_)],
jur_AbstractCharClass, 0, jur_SpecialToken, [], 1024, 0, () => jur_AbstractCharClass_$callClinit(), ["$_init_0", $rt_wrapFunction0(jur_AbstractCharClass__init_), "$getBits", $rt_wrapFunction0(jur_AbstractCharClass_getBits), "$getLowHighSurrogates", $rt_wrapFunction0(jur_AbstractCharClass_getLowHighSurrogates), "$hasLowHighSurrogates", $rt_wrapFunction0(jur_AbstractCharClass_hasLowHighSurrogates), "$mayContainSupplCodepoints", $rt_wrapFunction0(jur_AbstractCharClass_mayContainSupplCodepoints), "$getInstance",
$rt_wrapFunction0(jur_AbstractCharClass_getInstance), "$getSurrogates", $rt_wrapFunction0(jur_AbstractCharClass_getSurrogates), "$getWithoutSurrogates", $rt_wrapFunction0(jur_AbstractCharClass_getWithoutSurrogates), "$hasUCI", $rt_wrapFunction0(jur_AbstractCharClass_hasUCI), "$setNegative", $rt_wrapFunction1(jur_AbstractCharClass_setNegative), "$isNegative", $rt_wrapFunction0(jur_AbstractCharClass_isNegative)],
jur_AbstractCharClass$LazyJavaUnicodeIdentifierPart$1, "AbstractCharClass$LazyJavaUnicodeIdentifierPart$1", 7, jur_AbstractCharClass, [], 0, 0, 0, ["$_init_46", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaUnicodeIdentifierPart$1__init_), "$contains", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaUnicodeIdentifierPart$1_contains)],
jur_AbstractCharClass$PredefinedCharacterClasses, 0, jl_Object, [], 16, 0, () => jur_AbstractCharClass$PredefinedCharacterClasses_$callClinit(), ["$_init_0", $rt_wrapFunction0(jur_AbstractCharClass$PredefinedCharacterClasses__init_), "$getObject", $rt_wrapFunction1(jur_AbstractCharClass$PredefinedCharacterClasses_getObject)],
aa_Activity, 0, jl_Object, [], 1, 0, 0, 0,
ccra_a, 0, aa_Activity, [], 1, 0, 0, 0,
jur_AbstractCharClass$LazyDigit, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$_init_0", $rt_wrapFunction0(jur_AbstractCharClass$LazyDigit__init_), "$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyDigit_computeValue)],
jur_AbstractCharClass$LazyJavaLetter, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$_init_0", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaLetter__init_), "$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaLetter_computeValue)],
ji_Flushable, 0, jl_Object, [], 1537, 0, 0, 0,
jur_DecomposedCharSet, 0, jur_JointSet, [], 0, 0, 0, ["$_init_22", $rt_wrapFunction2(jur_DecomposedCharSet__init_), "$setNext", $rt_wrapFunction1(jur_DecomposedCharSet_setNext), "$matches", $rt_wrapFunction3(jur_DecomposedCharSet_matches), "$codePointAt", $rt_wrapFunction3(jur_DecomposedCharSet_codePointAt), "$first", $rt_wrapFunction1(jur_DecomposedCharSet_first), "$hasConsumed", $rt_wrapFunction1(jur_DecomposedCharSet_hasConsumed)],
jur_CIDecomposedCharSet, 0, jur_DecomposedCharSet, [], 0, 0, 0, ["$_init_22", $rt_wrapFunction2(jur_CIDecomposedCharSet__init_)],
ag_Path$FillType, 0, jl_Enum, [], 65553, 0, () => ag_Path$FillType_$callClinit(), 0,
jur_AheadFSet, 0, jur_FSet, [], 0, 0, 0, ["$_init_0", $rt_wrapFunction0(jur_AheadFSet__init_), "$matches", $rt_wrapFunction3(jur_AheadFSet_matches)],
jur_NonCapJointSet, 0, jur_JointSet, [], 0, 0, 0, ["$_init_23", $rt_wrapFunction2(jur_NonCapJointSet__init_), "$matches", $rt_wrapFunction3(jur_NonCapJointSet_matches), "$hasConsumed", $rt_wrapFunction1(jur_NonCapJointSet_hasConsumed)],
jur_AtomicJointSet, 0, jur_NonCapJointSet, [], 0, 0, 0, ["$_init_23", $rt_wrapFunction2(jur_AtomicJointSet__init_), "$matches", $rt_wrapFunction3(jur_AtomicJointSet_matches), "$setNext", $rt_wrapFunction1(jur_AtomicJointSet_setNext)],
jur_PositiveLookAhead, 0, jur_AtomicJointSet, [], 0, 0, 0, ["$_init_23", $rt_wrapFunction2(jur_PositiveLookAhead__init_), "$matches", $rt_wrapFunction3(jur_PositiveLookAhead_matches), "$hasConsumed", $rt_wrapFunction1(jur_PositiveLookAhead_hasConsumed)],
jur_NegativeLookAhead, 0, jur_AtomicJointSet, [], 0, 0, 0, ["$_init_23", $rt_wrapFunction2(jur_NegativeLookAhead__init_), "$matches", $rt_wrapFunction3(jur_NegativeLookAhead_matches), "$hasConsumed", $rt_wrapFunction1(jur_NegativeLookAhead_hasConsumed)],
ccra_z, 0, jl_Object, [], 1537, 0, 0, 0,
otj_JSObject, 0, jl_Object, [], 1537, 0, 0, 0,
otjt_ArrayBufferView, 0, jl_Object, [otj_JSObject], 1025, 0, 0, 0,
otjt_TypedArray, 0, otjt_ArrayBufferView, [], 1025, 0, 0, 0,
jl_UnsupportedOperationException, "UnsupportedOperationException", 9, jl_RuntimeException, [], 1, 0, 0, ["$_init_0", $rt_wrapFunction0(jl_UnsupportedOperationException__init_)],
jn_ReadOnlyBufferException, "ReadOnlyBufferException", 8, jl_UnsupportedOperationException, [], 1, 0, 0, ["$_init_0", $rt_wrapFunction0(jn_ReadOnlyBufferException__init_0)],
ccrgb_ai, 0, jl_Object, [], 17, 0, 0, ["$_init_24", $rt_wrapFunction3(ccrgb_ai__init_), "$a1", $rt_wrapFunction0(ccrgb_ai_a0), "$a2", $rt_wrapFunction1(ccrgb_ai_a1), "$a0", $rt_wrapFunction2(ccrgb_ai_a), "$c", $rt_wrapFunction0(ccrgb_ai_c)],
jlr_Array, 0, jl_Object, [], 17, 0, 0, 0,
ccrgb_ag, 0, jl_Object, [], 17, 0, 0, ["$_init_73", $rt_wrapFunction1(ccrgb_ag__init_), "$a1", $rt_wrapFunction0(ccrgb_ag_a), "$b", $rt_wrapFunction0(ccrgb_ag_b)],
ccrgb_ah, 0, jl_Object, [], 17, 0, 0, ["$_init_0", $rt_wrapFunction0(ccrgb_ah__init_)],
ccrgb_ae, 0, jl_Object, [], 17, 0, 0, ["$_init_0", $rt_wrapFunction0(ccrgb_ae__init_)],
ao_GLES20$LogSink, 0, jl_Object, [], 1537, 0, 0, 0,
r_Bootstrap$1, 0, jl_Object, [ao_GLES20$LogSink], 0, 0, 0, ["$_init_0", $rt_wrapFunction0(r_Bootstrap$1__init_), "$log", $rt_wrapFunction1(r_Bootstrap$1_log)],
ccrgb_as, 0, jl_Object, [], 17, 0, 0, ["$_init_25", $rt_wrapFunction2(ccrgb_as__init_), "$a1", $rt_wrapFunction0(ccrgb_as_a1), "$a3", $rt_wrapFunction2(ccrgb_as_a0), "$a0", $rt_wrapFunction2(ccrgb_as_a), "$b", $rt_wrapFunction0(ccrgb_as_b)],
otcit_DoubleAnalyzer$Result, 0, jl_Object, [], 1, 0, 0, ["$_init_0", $rt_wrapFunction0(otcit_DoubleAnalyzer$Result__init_0)],
ccrgb_aq, 0, jl_Object, [], 17, 0, 0, ["$_init_73", $rt_wrapFunction1(ccrgb_aq__init_), "$a1", $rt_wrapFunction0(ccrgb_aq_a), "$b", $rt_wrapFunction0(ccrgb_aq_b)],
ccrgb_ar, 0, jl_Object, [], 17, 0, 0, ["$_init_0", $rt_wrapFunction0(ccrgb_ar__init_)],
ccrgb_an, 0, jl_Object, [], 1537, 0, 0, 0,
jur_AbstractCharClass$LazyJavaDigit, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$_init_0", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaDigit__init_), "$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaDigit_computeValue)],
jl_Iterable, 0, jl_Object, [], 1537, 0, 0, 0,
ju_Collection, 0, jl_Object, [jl_Iterable], 1537, 0, 0, 0]);
$rt_metadata([ju_AbstractCollection, 0, jl_Object, [ju_Collection], 1025, 0, 0, ["$_init_0", $rt_wrapFunction0(ju_AbstractCollection__init_), "$toArray", $rt_wrapFunction1(ju_AbstractCollection_toArray)],
otci_IntegerUtil, 0, jl_Object, [], 17, 0, 0, 0,
jn_IntBuffer, 0, jn_Buffer, [jl_Comparable], 1025, 0, 0, 0,
jur_LeafQuantifierSet, 0, jur_QuantifierSet, [], 0, 0, 0, ["$_init_28", $rt_wrapFunction3(jur_LeafQuantifierSet__init_), "$matches", $rt_wrapFunction3(jur_LeafQuantifierSet_matches)],
jur_AltQuantifierSet, 0, jur_LeafQuantifierSet, [], 0, 0, 0, ["$_init_28", $rt_wrapFunction3(jur_AltQuantifierSet__init_), "$matches", $rt_wrapFunction3(jur_AltQuantifierSet_matches), "$setNext", $rt_wrapFunction1(jur_AltQuantifierSet_setNext)],
jur_PossessiveAltQuantifierSet, 0, jur_AltQuantifierSet, [], 0, 0, 0, ["$_init_28", $rt_wrapFunction3(jur_PossessiveAltQuantifierSet__init_), "$matches", $rt_wrapFunction3(jur_PossessiveAltQuantifierSet_matches)],
ccrgb_ac, 0, jl_Object, [], 17, 0, 0, ["$_init_0", $rt_wrapFunction0(ccrgb_ac__init_)],
ccrgb_ad, 0, jl_Object, [], 1537, 0, 0, 0,
ccrgb_ab, 0, jl_Object, [], 1537, 0, 0, 0,
ccrgb_aa, 0, jl_Object, [ccrgb_ab], 17, 0, 0, ["$_init_0", $rt_wrapFunction0(ccrgb_aa__init_), "$a13", $rt_wrapFunction1(ccrgb_aa_a)],
otjc_JSObjects, 0, jl_Object, [], 17, 0, 0, 0,
otji_JS, 0, jl_Object, [], 17, 0, 0, 0,
jur_AbstractCharClass$LazyJavaUnicodeIdentifierStart$1, "AbstractCharClass$LazyJavaUnicodeIdentifierStart$1", 7, jur_AbstractCharClass, [], 0, 0, 0, ["$_init_64", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaUnicodeIdentifierStart$1__init_), "$contains", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaUnicodeIdentifierStart$1_contains)],
otciu_UnicodeHelper, 0, jl_Object, [], 17, 0, 0, 0,
otp_PlatformRunnable, 0, jl_Object, [], 1537, 0, 0, 0,
jl_Object$monitorEnterWait$lambda$_6_0, 0, jl_Object, [otp_PlatformRunnable], 1, 0, 0, ["$_init_1", $rt_wrapFunction4(jl_Object$monitorEnterWait$lambda$_6_0__init_), "$run", $rt_wrapFunction0(jl_Object$monitorEnterWait$lambda$_6_0_run)],
ju_Objects, 0, jl_Object, [], 17, 0, 0, 0,
otjc_JSUndefined, 0, jl_Object, [otj_JSObject], 1, 0, 0, 0,
jur_AbstractCharClass$LazyAlnum, 0, jur_AbstractCharClass$LazyAlpha, [], 0, 0, 0, ["$_init_0", $rt_wrapFunction0(jur_AbstractCharClass$LazyAlnum__init_), "$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyAlnum_computeValue)],
jur_AbstractCharClass$LazyGraph, 0, jur_AbstractCharClass$LazyAlnum, [], 0, 0, 0, ["$_init_0", $rt_wrapFunction0(jur_AbstractCharClass$LazyGraph__init_), "$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyGraph_computeValue)],
jur_AbstractCharClass$LazyPrint, 0, jur_AbstractCharClass$LazyGraph, [], 0, 0, 0, ["$_init_0", $rt_wrapFunction0(jur_AbstractCharClass$LazyPrint__init_), "$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyPrint_computeValue)],
jur_AbstractCharClass$LazyJavaSpaceChar, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$_init_0", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaSpaceChar__init_), "$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaSpaceChar_computeValue)],
jur_PositiveLookBehind, 0, jur_AtomicJointSet, [], 0, 0, 0, ["$_init_23", $rt_wrapFunction2(jur_PositiveLookBehind__init_), "$matches", $rt_wrapFunction3(jur_PositiveLookBehind_matches), "$hasConsumed", $rt_wrapFunction1(jur_PositiveLookBehind_hasConsumed)],
aa_Application, 0, jl_Object, [], 1, 0, 0, 0,
jur_SequenceSet, 0, jur_LeafSet, [], 0, 0, 0, ["$_init_52", $rt_wrapFunction1(jur_SequenceSet__init_), "$accepts", $rt_wrapFunction2(jur_SequenceSet_accepts), "$find", $rt_wrapFunction3(jur_SequenceSet_find), "$findBack", $rt_wrapFunction4(jur_SequenceSet_findBack), "$first", $rt_wrapFunction1(jur_SequenceSet_first), "$indexOf", $rt_wrapFunction3(jur_SequenceSet_indexOf), "$lastIndexOf", $rt_wrapFunction3(jur_SequenceSet_lastIndexOf), "$startsWith", $rt_wrapFunction2(jur_SequenceSet_startsWith)],
jl_ArrayStoreException, "ArrayStoreException", 9, jl_RuntimeException, [], 1, 0, 0, ["$_init_0", $rt_wrapFunction0(jl_ArrayStoreException__init_0)],
ju_SequencedCollection, 0, jl_Object, [ju_Collection], 1537, 0, 0, 0,
jur_AltGroupQuantifierSet, 0, jur_GroupQuantifierSet, [], 0, 0, 0, ["$_init_11", $rt_wrapFunction3(jur_AltGroupQuantifierSet__init_), "$matches", $rt_wrapFunction3(jur_AltGroupQuantifierSet_matches), "$setNext", $rt_wrapFunction1(jur_AltGroupQuantifierSet_setNext)],
jur_MatchResult, 0, jl_Object, [], 1537, 0, 0, 0,
jur_MatchResultImpl, 0, jl_Object, [jur_MatchResult], 0, 0, 0, ["$_init_78", function(var_1, var_2, var_3, var_4, var_5, var_6, var_7) { jur_MatchResultImpl__init_(this, var_1, var_2, var_3, var_4, var_5, var_6, var_7); }, "$setConsumed", $rt_wrapFunction2(jur_MatchResultImpl_setConsumed), "$getConsumed", $rt_wrapFunction1(jur_MatchResultImpl_getConsumed), "$end0", $rt_wrapFunction0(jur_MatchResultImpl_end), "$end", $rt_wrapFunction1(jur_MatchResultImpl_end0), "$setStart", $rt_wrapFunction2(jur_MatchResultImpl_setStart),
"$setEnd", $rt_wrapFunction2(jur_MatchResultImpl_setEnd), "$getStart", $rt_wrapFunction1(jur_MatchResultImpl_getStart), "$getEnd", $rt_wrapFunction1(jur_MatchResultImpl_getEnd), "$getGroupNoCheck", $rt_wrapFunction1(jur_MatchResultImpl_getGroupNoCheck), "$start0", $rt_wrapFunction0(jur_MatchResultImpl_start), "$start", $rt_wrapFunction1(jur_MatchResultImpl_start0), "$finalizeMatch", $rt_wrapFunction0(jur_MatchResultImpl_finalizeMatch), "$getEnterCounter", $rt_wrapFunction1(jur_MatchResultImpl_getEnterCounter),
"$setEnterCounter", $rt_wrapFunction2(jur_MatchResultImpl_setEnterCounter), "$setValid", $rt_wrapFunction0(jur_MatchResultImpl_setValid), "$isValid", $rt_wrapFunction0(jur_MatchResultImpl_isValid), "$reset", $rt_wrapFunction3(jur_MatchResultImpl_reset0), "$reset0", $rt_wrapFunction0(jur_MatchResultImpl_reset), "$setStartIndex", $rt_wrapFunction1(jur_MatchResultImpl_setStartIndex), "$getLeftBound", $rt_wrapFunction0(jur_MatchResultImpl_getLeftBound), "$getRightBound", $rt_wrapFunction0(jur_MatchResultImpl_getRightBound),
"$setMode", $rt_wrapFunction1(jur_MatchResultImpl_setMode), "$mode", $rt_wrapFunction0(jur_MatchResultImpl_mode), "$useAnchoringBounds", $rt_wrapFunction1(jur_MatchResultImpl_useAnchoringBounds), "$hasAnchoringBounds", $rt_wrapFunction0(jur_MatchResultImpl_hasAnchoringBounds), "$hasTransparentBounds", $rt_wrapFunction0(jur_MatchResultImpl_hasTransparentBounds), "$getPreviousMatchEnd", $rt_wrapFunction0(jur_MatchResultImpl_getPreviousMatchEnd)],
jur_UCIRangeSet, 0, jur_LeafSet, [], 0, 0, 0, ["$_init_61", $rt_wrapFunction1(jur_UCIRangeSet__init_), "$accepts", $rt_wrapFunction2(jur_UCIRangeSet_accepts)],
jl_AutoCloseable, 0, jl_Object, [], 1537, 0, 0, 0,
ji_Closeable, 0, jl_Object, [jl_AutoCloseable], 1537, 0, 0, 0,
ji_OutputStream, 0, jl_Object, [ji_Closeable, ji_Flushable], 1025, 0, 0, ["$_init_0", $rt_wrapFunction0(ji_OutputStream__init_)],
ji_FilterOutputStream, 0, ji_OutputStream, [], 1, 0, 0, ["$_init_32", $rt_wrapFunction1(ji_FilterOutputStream__init_)],
ji_PrintStream, 0, ji_FilterOutputStream, [jl_Appendable], 1, 0, 0, ["$_init_33", $rt_wrapFunction3(ji_PrintStream__init_)],
otcic_JsConsolePrintStream, 0, ji_PrintStream, [], 1025, 0, 0, ["$_init_0", $rt_wrapFunction0(otcic_JsConsolePrintStream__init_), "$println", $rt_wrapFunction1(otcic_JsConsolePrintStream_println)],
otcic_JSStdoutPrintStream, 0, otcic_JsConsolePrintStream, [], 1, 0, 0, ["$_init_0", $rt_wrapFunction0(otcic_JSStdoutPrintStream__init_), "$print", $rt_wrapFunction1(otcic_JSStdoutPrintStream_print)],
jur_AbstractCharClass$LazyJavaJavaIdentifierPart$1, "AbstractCharClass$LazyJavaJavaIdentifierPart$1", 7, jur_AbstractCharClass, [], 0, 0, 0, ["$_init_34", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaJavaIdentifierPart$1__init_), "$contains", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaJavaIdentifierPart$1_contains)],
otp_Platform, 0, jl_Object, [], 17, 0, 0, 0,
jnc_Charset, 0, jl_Object, [jl_Comparable], 1025, 0, 0, 0,
jlr_Reference, 0, jl_Object, [], 1025, 0, 0, 0,
jlr_WeakReference, 0, jlr_Reference, [], 1, 0, 0, 0,
ju_NoSuchElementException, "NoSuchElementException", 6, jl_RuntimeException, [], 1, 0, 0, ["$_init_0", $rt_wrapFunction0(ju_NoSuchElementException__init_)],
jlr_AnnotatedElement, 0, jl_Object, [], 1537, 0, 0, 0,
jlr_GenericDeclaration, 0, jl_Object, [jlr_AnnotatedElement], 1537, 0, 0, 0,
jur_NegativeLookBehind, 0, jur_AtomicJointSet, [], 0, 0, 0, ["$_init_23", $rt_wrapFunction2(jur_NegativeLookBehind__init_), "$matches", $rt_wrapFunction3(jur_NegativeLookBehind_matches), "$hasConsumed", $rt_wrapFunction1(jur_NegativeLookBehind_hasConsumed)],
ccra_ab, 0, jl_Object, [], 1537, 0, 0, 0,
jur_BackReferenceSet, 0, jur_CIBackReferenceSet, [], 0, 0, 0, ["$_init_10", $rt_wrapFunction2(jur_BackReferenceSet__init_), "$matches", $rt_wrapFunction3(jur_BackReferenceSet_matches), "$find", $rt_wrapFunction3(jur_BackReferenceSet_find), "$findBack", $rt_wrapFunction4(jur_BackReferenceSet_findBack), "$first", $rt_wrapFunction1(jur_BackReferenceSet_first)],
jur_DotQuantifierSet, 0, jur_QuantifierSet, [], 0, 0, 0, ["$_init_56", $rt_wrapFunction4(jur_DotQuantifierSet__init_), "$matches", $rt_wrapFunction3(jur_DotQuantifierSet_matches), "$find", $rt_wrapFunction3(jur_DotQuantifierSet_find)]]);
$rt_metadata([jur_AbstractCharClass$LazyJavaJavaIdentifierPart, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$_init_0", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaJavaIdentifierPart__init_), "$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaJavaIdentifierPart_computeValue)],
otcit_FloatAnalyzer, 0, jl_Object, [], 17, 0, () => otcit_FloatAnalyzer_$callClinit(), 0,
ag_Color, 0, jl_Object, [], 1, 0, 0, 0,
ag_Bitmap, 0, jl_Object, [], 1, 0, 0, ["$getElement0", $rt_wrapFunction0(ag_Bitmap_getElement), "$getSource", $rt_wrapFunction0(ag_Bitmap_getSource), "$getContext", $rt_wrapFunction0(ag_Bitmap_getContext), "$getWidth", $rt_wrapFunction0(ag_Bitmap_getWidth), "$getHeight", $rt_wrapFunction0(ag_Bitmap_getHeight), "$getPixel", $rt_wrapFunction2(ag_Bitmap_getPixel)],
jur_UnifiedQuantifierSet, 0, jur_LeafQuantifierSet, [], 0, 0, 0, ["$_init_55", $rt_wrapFunction1(jur_UnifiedQuantifierSet__init_), "$matches", $rt_wrapFunction3(jur_UnifiedQuantifierSet_matches), "$find", $rt_wrapFunction3(jur_UnifiedQuantifierSet_find)],
jlr_Type, 0, jl_Object, [], 1537, 0, 0, 0,
jl_Class, 0, jl_Object, [jlr_GenericDeclaration, jlr_Type], 17, 0, 0, ["$getClassInfo", $rt_wrapFunction0(jl_Class_getClassInfo), "$isInstance", $rt_wrapFunction1(jl_Class_isInstance), "$isAssignableFrom", $rt_wrapFunction1(jl_Class_isAssignableFrom), "$getName", $rt_wrapFunction0(jl_Class_getName), "$getSimpleName", $rt_wrapFunction0(jl_Class_getSimpleName), "$isPrimitive", $rt_wrapFunction0(jl_Class_isPrimitive), "$getComponentType", $rt_wrapFunction0(jl_Class_getComponentType), "$getEnclosingClass", $rt_wrapFunction0(jl_Class_getEnclosingClass)],
otjt_Int16Array, 0, otjt_TypedArray, [], 1, 0, 0, 0,
ju_BitSet, 0, jl_Object, [jl_Cloneable, ji_Serializable], 1, 0, 0, ["$_init_0", $rt_wrapFunction0(ju_BitSet__init_0), "$_init_3", $rt_wrapFunction1(ju_BitSet__init_), "$set0", $rt_wrapFunction1(ju_BitSet_set), "$set", $rt_wrapFunction2(ju_BitSet_set0), "$clear1", $rt_wrapFunction1(ju_BitSet_clear0), "$clear2", $rt_wrapFunction2(ju_BitSet_clear), "$get6", $rt_wrapFunction1(ju_BitSet_get), "$nextSetBit", $rt_wrapFunction1(ju_BitSet_nextSetBit), "$nextClearBit", $rt_wrapFunction1(ju_BitSet_nextClearBit), "$intersects",
$rt_wrapFunction1(ju_BitSet_intersects), "$and", $rt_wrapFunction1(ju_BitSet_and), "$andNot", $rt_wrapFunction1(ju_BitSet_andNot), "$or", $rt_wrapFunction1(ju_BitSet_or), "$xor", $rt_wrapFunction1(ju_BitSet_xor), "$isEmpty", $rt_wrapFunction0(ju_BitSet_isEmpty)],
jur_AbstractCharClass$LazyJavaJavaIdentifierStart$1, "AbstractCharClass$LazyJavaJavaIdentifierStart$1", 7, jur_AbstractCharClass, [], 0, 0, 0, ["$_init_71", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaJavaIdentifierStart$1__init_), "$contains", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaJavaIdentifierStart$1_contains)],
jl_Float, 0, jl_Number, [jl_Comparable], 1, 0, () => jl_Float_$callClinit(), 0,
ju_Arrays, 0, jl_Object, [], 1, 0, 0, 0,
jur_CharSet, 0, jur_LeafSet, [], 0, 0, 0, ["$_init_54", $rt_wrapFunction1(jur_CharSet__init_0), "$charCount", $rt_wrapFunction0(jur_CharSet_charCount), "$accepts", $rt_wrapFunction2(jur_CharSet_accepts), "$find", $rt_wrapFunction3(jur_CharSet_find), "$findBack", $rt_wrapFunction4(jur_CharSet_findBack), "$getChar", $rt_wrapFunction0(jur_CharSet_getChar), "$first", $rt_wrapFunction1(jur_CharSet_first)],
jn_ShortBuffer, 0, jn_Buffer, [jl_Comparable], 1025, 0, 0, ["$_init_10", $rt_wrapFunction2(jn_ShortBuffer__init_), "$put1", $rt_wrapFunction3(jn_ShortBuffer_put), "$clear0", $rt_wrapFunction0(jn_ShortBuffer_clear), "$flip0", $rt_wrapFunction0(jn_ShortBuffer_flip), "$position1", $rt_wrapFunction1(jn_ShortBuffer_position0), "$flip", $rt_wrapFunction0(jn_ShortBuffer_flip0), "$clear", $rt_wrapFunction0(jn_ShortBuffer_clear0), "$position0", $rt_wrapFunction1(jn_ShortBuffer_position)],
jn_ShortBufferImpl, 0, jn_ShortBuffer, [], 1024, 0, 0, ["$_init_10", $rt_wrapFunction2(jn_ShortBufferImpl__init_), "$duplicate1", $rt_wrapFunction0(jn_ShortBufferImpl_duplicate), "$get2", $rt_wrapFunction0(jn_ShortBufferImpl_get), "$isReadOnly", $rt_wrapFunction0(jn_ShortBufferImpl_isReadOnly)],
jn_ArrayBufferViewProvider, 0, jl_Object, [], 1537, 0, 0, 0,
jn_ShortBufferOverDataView, 0, jn_ShortBufferImpl, [jn_ArrayBufferViewProvider], 0, 0, 0, ["$_init_37", function(var_1, var_2, var_3, var_4, var_5) { jn_ShortBufferOverDataView__init_(this, var_1, var_2, var_3, var_4, var_5); }, "$duplicate3", function(var_1, var_2, var_3, var_4, var_5) { return jn_ShortBufferOverDataView_duplicate(this, var_1, var_2, var_3, var_4, var_5); }, "$readOnly", $rt_wrapFunction0(jn_ShortBufferOverDataView_readOnly), "$getElement", $rt_wrapFunction1(jn_ShortBufferOverDataView_getElement),
"$putImpl1", $rt_wrapFunction4(jn_ShortBufferOverDataView_putImpl), "$capacityImpl", $rt_wrapFunction0(jn_ShortBufferOverDataView_capacityImpl)],
jur_CharClass$3, 0, jur_AbstractCharClass, [], 0, 0, 0, ["$_init_67", $rt_wrapFunction3(jur_CharClass$3__init_), "$contains", $rt_wrapFunction1(jur_CharClass$3_contains)],
jur_CharClass$4, 0, jur_AbstractCharClass, [], 0, 0, 0, ["$_init_65", $rt_wrapFunction4(jur_CharClass$4__init_), "$contains", $rt_wrapFunction1(jur_CharClass$4_contains)],
jur_CharClass$1, 0, jur_AbstractCharClass, [], 0, 0, 0, ["$_init_66", $rt_wrapFunction2(jur_CharClass$1__init_), "$contains", $rt_wrapFunction1(jur_CharClass$1_contains)],
jur_CharClass$2, 0, jur_AbstractCharClass, [], 0, 0, 0, ["$_init_67", $rt_wrapFunction3(jur_CharClass$2__init_), "$contains", $rt_wrapFunction1(jur_CharClass$2_contains)],
jur_CharClass$7, 0, jur_AbstractCharClass, [], 0, 0, 0, ["$_init_66", $rt_wrapFunction2(jur_CharClass$7__init_), "$contains", $rt_wrapFunction1(jur_CharClass$7_contains)],
jur_CharClass$8, 0, jur_AbstractCharClass, [], 0, 0, 0, ["$_init_68", $rt_wrapFunction3(jur_CharClass$8__init_), "$contains", $rt_wrapFunction1(jur_CharClass$8_contains)],
ao_Process, 0, jl_Object, [], 1, 0, 0, 0,
jur_CharClass$5, 0, jur_AbstractCharClass, [], 0, 0, 0, ["$_init_65", $rt_wrapFunction4(jur_CharClass$5__init_), "$contains", $rt_wrapFunction1(jur_CharClass$5_contains)],
jur_CharClass$6, 0, jur_AbstractCharClass, [], 0, 0, 0, ["$_init_66", $rt_wrapFunction2(jur_CharClass$6__init_), "$contains", $rt_wrapFunction1(jur_CharClass$6_contains)],
ju_Iterator, 0, jl_Object, [], 1537, 0, 0, 0,
ju_ListIterator, 0, jl_Object, [ju_Iterator], 1537, 0, 0, 0,
ju_Collections$5, 0, jl_Object, [ju_ListIterator], 0, 0, 0, ["$_init_0", $rt_wrapFunction0(ju_Collections$5__init_)],
jur_DotSet, 0, jur_JointSet, [], 16, 0, 0, ["$_init_59", $rt_wrapFunction1(jur_DotSet__init_), "$matches", $rt_wrapFunction3(jur_DotSet_matches), "$setNext", $rt_wrapFunction1(jur_DotSet_setNext), "$getType", $rt_wrapFunction0(jur_DotSet_getType), "$hasConsumed", $rt_wrapFunction1(jur_DotSet_hasConsumed)],
ju_List, 0, jl_Object, [ju_SequencedCollection], 1537, 0, 0, 0,
ju_AbstractList, 0, ju_AbstractCollection, [ju_List], 1025, 0, 0, ["$_init_0", $rt_wrapFunction0(ju_AbstractList__init_), "$iterator", $rt_wrapFunction0(ju_AbstractList_iterator)],
ju_RandomAccess, 0, jl_Object, [], 1537, 0, 0, 0,
ju_TemplateCollections$AbstractImmutableList, 0, ju_AbstractList, [ju_RandomAccess], 1024, 0, 0, ["$_init_0", $rt_wrapFunction0(ju_TemplateCollections$AbstractImmutableList__init_)],
ju_Collections$3, 0, ju_TemplateCollections$AbstractImmutableList, [], 0, 0, 0, ["$_init_0", $rt_wrapFunction0(ju_Collections$3__init_)],
jur_CharClass$9, 0, jur_AbstractCharClass, [], 0, 0, 0, ["$_init_68", $rt_wrapFunction3(jur_CharClass$9__init_), "$contains", $rt_wrapFunction1(jur_CharClass$9_contains)],
ju_Collections$4, 0, jl_Object, [ju_Iterator], 0, 0, 0, ["$_init_0", $rt_wrapFunction0(ju_Collections$4__init_)],
jl_Character, 0, jl_Object, [jl_Comparable], 1, 0, () => jl_Character_$callClinit(), 0,
ao_Build$VERSION, 0, jl_Object, [], 1, 0, 0, 0,
ju_Set, 0, jl_Object, [ju_Collection], 1537, 0, 0, 0,
ju_AbstractSet, 0, ju_AbstractCollection, [ju_Set], 1025, 0, 0, ["$_init_0", $rt_wrapFunction0(ju_AbstractSet__init_)],
ju_TemplateCollections$AbstractImmutableSet, 0, ju_AbstractSet, [], 1024, 0, 0, ["$_init_0", $rt_wrapFunction0(ju_TemplateCollections$AbstractImmutableSet__init_)],
ju_Collections$1, 0, ju_TemplateCollections$AbstractImmutableSet, [], 0, 0, 0, ["$_init_0", $rt_wrapFunction0(ju_Collections$1__init_)],
jur_CICharSet, 0, jur_LeafSet, [], 0, 0, 0, ["$_init_54", $rt_wrapFunction1(jur_CICharSet__init_0), "$accepts", $rt_wrapFunction2(jur_CICharSet_accepts)],
ju_TemplateCollections$AbstractImmutableMap, 0, ju_AbstractMap, [], 1024, 0, 0, ["$_init_0", $rt_wrapFunction0(ju_TemplateCollections$AbstractImmutableMap__init_), "$put", $rt_wrapFunction2(ju_TemplateCollections$AbstractImmutableMap_put)],
ju_Collections$2, 0, ju_TemplateCollections$AbstractImmutableMap, [], 0, 0, 0, ["$_init_0", $rt_wrapFunction0(ju_Collections$2__init_)],
jur_SupplCharSet, 0, jur_LeafSet, [], 0, 0, 0, ["$_init_3", $rt_wrapFunction1(jur_SupplCharSet__init_), "$accepts", $rt_wrapFunction2(jur_SupplCharSet_accepts), "$find", $rt_wrapFunction3(jur_SupplCharSet_find), "$findBack", $rt_wrapFunction4(jur_SupplCharSet_findBack), "$getCodePoint", $rt_wrapFunction0(jur_SupplCharSet_getCodePoint), "$first", $rt_wrapFunction1(jur_SupplCharSet_first)],
ccra_InGameActivity, 0, ccra_a, [], 1, 0, 0, 0,
otrr_ReflectionInfo, 0, jl_Object, [], 1025, 0, 0, 0,
ag_Canvas, 0, jl_Object, [], 1, 0, 0, ["$_init_39", $rt_wrapFunction1(ag_Canvas__init_0), "$setBitmap", $rt_wrapFunction1(ag_Canvas_setBitmap), "$getWidth", $rt_wrapFunction0(ag_Canvas_getWidth), "$getHeight", $rt_wrapFunction0(ag_Canvas_getHeight), "$drawColor0", $rt_wrapFunction1(ag_Canvas_drawColor0), "$drawColor", $rt_wrapFunction2(ag_Canvas_drawColor), "$drawRect", function(var_1, var_2, var_3, var_4, var_5) { ag_Canvas_drawRect(this, var_1, var_2, var_3, var_4, var_5); }, "$drawLine", function(var_1, var_2,
var_3, var_4, var_5) { ag_Canvas_drawLine(this, var_1, var_2, var_3, var_4, var_5); }, "$drawCircle", $rt_wrapFunction4(ag_Canvas_drawCircle), "$drawOval", $rt_wrapFunction2(ag_Canvas_drawOval), "$drawPath", $rt_wrapFunction2(ag_Canvas_drawPath), "$drawBitmap0", $rt_wrapFunction4(ag_Canvas_drawBitmap1), "$drawBitmap1", $rt_wrapFunction4(ag_Canvas_drawBitmap0), "$drawBitmap", function(var_1, var_2, var_3, var_4, var_5, var_6, var_7, var_8, var_9, var_10) { ag_Canvas_drawBitmap(this, var_1, var_2, var_3, var_4,
var_5, var_6, var_7, var_8, var_9, var_10); }, "$drawText", $rt_wrapFunction4(ag_Canvas_drawText)]]);
$rt_metadata([jur_AbstractCharClass$LazyCategoryScope, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$_init_19", $rt_wrapFunction2(jur_AbstractCharClass$LazyCategoryScope__init_1), "$_init_20", $rt_wrapFunction3(jur_AbstractCharClass$LazyCategoryScope__init_0), "$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyCategoryScope_computeValue)],
jur_AbstractLineTerminator, 0, jl_Object, [], 1024, 0, 0, ["$_init_0", $rt_wrapFunction0(jur_AbstractLineTerminator__init_)],
jur_AbstractCharClass$LazyJavaTitleCase$1, "AbstractCharClass$LazyJavaTitleCase$1", 7, jur_AbstractCharClass, [], 0, 0, 0, ["$_init_76", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaTitleCase$1__init_), "$contains", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaTitleCase$1_contains)],
r_Bootstrap, 0, jl_Object, [], 1, 0, () => r_Bootstrap_$callClinit(), 0,
ju_Collections$_clinit_$lambda$_59_0, 0, jl_Object, [ju_Comparator], 1, 0, 0, ["$_init_0", $rt_wrapFunction0(ju_Collections$_clinit_$lambda$_59_0__init_)],
ag_Paint$Cap, 0, jl_Enum, [], 65553, 0, () => ag_Paint$Cap_$callClinit(), 0,
jur_AbstractCharClass$LazyJavaMirrored$1, "AbstractCharClass$LazyJavaMirrored$1", 7, jur_AbstractCharClass, [], 0, 0, 0, ["$_init_81", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaMirrored$1__init_), "$contains", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaMirrored$1_contains)],
jur_AbstractCharClass$LazyJavaISOControl$1, "AbstractCharClass$LazyJavaISOControl$1", 7, jur_AbstractCharClass, [], 0, 0, 0, ["$_init_82", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaISOControl$1__init_), "$contains", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaISOControl$1_contains)],
jur_UEOLSet, 0, jur_AbstractSet, [], 16, 0, 0, ["$_init_3", $rt_wrapFunction1(jur_UEOLSet__init_), "$matches", $rt_wrapFunction3(jur_UEOLSet_matches), "$hasConsumed", $rt_wrapFunction1(jur_UEOLSet_hasConsumed)],
ccra_MainMenuActivity, 0, ccra_a, [], 1, 0, 0, 0,
jur_UCICharSet, 0, jur_LeafSet, [], 0, 0, 0, ["$_init_54", $rt_wrapFunction1(jur_UCICharSet__init_), "$accepts", $rt_wrapFunction2(jur_UCICharSet_accepts)],
jur_AtomicFSet, 0, jur_FSet, [], 0, 0, 0, ["$_init_3", $rt_wrapFunction1(jur_AtomicFSet__init_), "$matches", $rt_wrapFunction3(jur_AtomicFSet_matches), "$getIndex", $rt_wrapFunction0(jur_AtomicFSet_getIndex), "$hasConsumed", $rt_wrapFunction1(jur_AtomicFSet_hasConsumed)],
jur_LowSurrogateCharSet, 0, jur_JointSet, [], 0, 0, 0, ["$_init_54", $rt_wrapFunction1(jur_LowSurrogateCharSet__init_0), "$setNext", $rt_wrapFunction1(jur_LowSurrogateCharSet_setNext), "$matches", $rt_wrapFunction3(jur_LowSurrogateCharSet_matches), "$find", $rt_wrapFunction3(jur_LowSurrogateCharSet_find), "$findBack", $rt_wrapFunction4(jur_LowSurrogateCharSet_findBack), "$first", $rt_wrapFunction1(jur_LowSurrogateCharSet_first), "$hasConsumed", $rt_wrapFunction1(jur_LowSurrogateCharSet_hasConsumed)],
jur_CompositeGroupQuantifierSet, 0, jur_GroupQuantifierSet, [], 0, 0, 0, ["$_init_44", function(var_1, var_2, var_3, var_4, var_5) { jur_CompositeGroupQuantifierSet__init_(this, var_1, var_2, var_3, var_4, var_5); }, "$matches", $rt_wrapFunction3(jur_CompositeGroupQuantifierSet_matches)],
jur_RelCompositeGroupQuantifierSet, 0, jur_CompositeGroupQuantifierSet, [], 0, 0, 0, ["$_init_44", function(var_1, var_2, var_3, var_4, var_5) { jur_RelCompositeGroupQuantifierSet__init_(this, var_1, var_2, var_3, var_4, var_5); }, "$matches", $rt_wrapFunction3(jur_RelCompositeGroupQuantifierSet_matches)],
ju_ArrayList, 0, ju_AbstractList, [jl_Cloneable, ji_Serializable, ju_RandomAccess], 1, 0, 0, ["$_init_0", $rt_wrapFunction0(ju_ArrayList__init_1), "$_init_3", $rt_wrapFunction1(ju_ArrayList__init_0), "$ensureCapacity", $rt_wrapFunction1(ju_ArrayList_ensureCapacity), "$get4", $rt_wrapFunction1(ju_ArrayList_get), "$size", $rt_wrapFunction0(ju_ArrayList_size), "$add", $rt_wrapFunction1(ju_ArrayList_add), "$add2", $rt_wrapFunction2(ju_ArrayList_add0), "$remove1", $rt_wrapFunction1(ju_ArrayList_remove)],
otrf_VirtualFileSystem, 0, jl_Object, [], 1537, 0, 0, 0,
jl_IllegalMonitorStateException, "IllegalMonitorStateException", 9, jl_RuntimeException, [], 1, 0, 0, ["$_init_0", $rt_wrapFunction0(jl_IllegalMonitorStateException__init_)],
jur_CompositeQuantifierSet, 0, jur_LeafQuantifierSet, [], 0, 0, 0, ["$_init_57", $rt_wrapFunction4(jur_CompositeQuantifierSet__init_), "$matches", $rt_wrapFunction3(jur_CompositeQuantifierSet_matches)],
jur_SupplRangeSet, 0, jur_JointSet, [], 0, 0, 0, ["$_init_61", $rt_wrapFunction1(jur_SupplRangeSet__init_), "$matches", $rt_wrapFunction3(jur_SupplRangeSet_matches), "$contains", $rt_wrapFunction1(jur_SupplRangeSet_contains), "$first", $rt_wrapFunction1(jur_SupplRangeSet_first), "$getChars", $rt_wrapFunction0(jur_SupplRangeSet_getChars), "$setNext", $rt_wrapFunction1(jur_SupplRangeSet_setNext), "$hasConsumed", $rt_wrapFunction1(jur_SupplRangeSet_hasConsumed)],
jur_RelAltGroupQuantifierSet, 0, jur_AltGroupQuantifierSet, [], 0, 0, 0, ["$_init_11", $rt_wrapFunction3(jur_RelAltGroupQuantifierSet__init_), "$matches", $rt_wrapFunction3(jur_RelAltGroupQuantifierSet_matches)],
jl_String, "String", 9, jl_Object, [ji_Serializable, jl_Comparable, jl_CharSequence], 1, 0, () => jl_String_$callClinit(), ["$_init_0", $rt_wrapFunction0(jl_String__init_2), "$_init_27", $rt_wrapFunction1(jl_String__init_0), "$_init_2", $rt_wrapFunction1(jl_String__init_4), "$_init_15", $rt_wrapFunction3(jl_String__init_6), "$charAt", $rt_wrapFunction1(jl_String_charAt), "$length", $rt_wrapFunction0(jl_String_length), "$isEmpty", $rt_wrapFunction0(jl_String_isEmpty), "$startsWith0", $rt_wrapFunction2(jl_String_startsWith),
"$startsWith1", $rt_wrapFunction1(jl_String_startsWith0), "$indexOf1", $rt_wrapFunction2(jl_String_indexOf), "$lastIndexOf2", $rt_wrapFunction2(jl_String_lastIndexOf), "$lastIndexOf1", $rt_wrapFunction1(jl_String_lastIndexOf1), "$indexOf0", $rt_wrapFunction2(jl_String_indexOf0), "$lastIndexOf0", $rt_wrapFunction2(jl_String_lastIndexOf0), "$substring", $rt_wrapFunction2(jl_String_substring), "$substring0", $rt_wrapFunction1(jl_String_substring0), "$subSequence", $rt_wrapFunction2(jl_String_subSequence), "$concat",
$rt_wrapFunction1(jl_String_concat), "$contains0", $rt_wrapFunction1(jl_String_contains), "$toString", $rt_wrapFunction0(jl_String_toString), "$toCharArray", $rt_wrapFunction0(jl_String_toCharArray), "$equals", $rt_wrapFunction1(jl_String_equals), "$hashCode0", $rt_wrapFunction0(jl_String_hashCode), "$split1", $rt_wrapFunction1(jl_String_split)],
ccra_IntroScreen, 0, aa_Activity, [], 1, 0, 0, 0,
ju_Dictionary, 0, jl_Object, [], 1025, 0, 0, ["$_init_0", $rt_wrapFunction0(ju_Dictionary__init_)],
ju_Hashtable, 0, ju_Dictionary, [ju_Map, jl_Cloneable, ji_Serializable], 1, 0, () => ju_Hashtable_$callClinit(), ["$_init_0", $rt_wrapFunction0(ju_Hashtable__init_), "$_init_3", $rt_wrapFunction1(ju_Hashtable__init_0), "$get", $rt_wrapFunction1(ju_Hashtable_get), "$put", $rt_wrapFunction2(ju_Hashtable_put), "$rehash", $rt_wrapFunction0(ju_Hashtable_rehash)],
ju_Properties, 0, ju_Hashtable, [], 1, 0, 0, ["$_init_0", $rt_wrapFunction0(ju_Properties__init_), "$_init_77", $rt_wrapFunction1(ju_Properties__init_0), "$getProperty", $rt_wrapFunction1(ju_Properties_getProperty)],
jur_FSet$PossessiveFSet, 0, jur_AbstractSet, [], 0, 0, 0, ["$_init_0", $rt_wrapFunction0(jur_FSet$PossessiveFSet__init_), "$matches", $rt_wrapFunction3(jur_FSet$PossessiveFSet_matches), "$hasConsumed", $rt_wrapFunction1(jur_FSet$PossessiveFSet_hasConsumed)],
jur_PosCompositeGroupQuantifierSet, 0, jur_CompositeGroupQuantifierSet, [], 0, 0, 0, ["$_init_44", function(var_1, var_2, var_3, var_4, var_5) { jur_PosCompositeGroupQuantifierSet__init_(this, var_1, var_2, var_3, var_4, var_5); }, "$matches", $rt_wrapFunction3(jur_PosCompositeGroupQuantifierSet_matches)],
jur_MultiLineEOLSet, 0, jur_AbstractSet, [], 0, 0, 0, ["$_init_3", $rt_wrapFunction1(jur_MultiLineEOLSet__init_), "$matches", $rt_wrapFunction3(jur_MultiLineEOLSet_matches), "$hasConsumed", $rt_wrapFunction1(jur_MultiLineEOLSet_hasConsumed)],
ju_Queue, 0, jl_Object, [ju_Collection], 1537, 0, 0, 0,
ju_Deque, 0, jl_Object, [ju_Queue, ju_SequencedCollection], 1537, 0, 0, 0,
ju_ArrayDeque, 0, ju_AbstractCollection, [ju_Deque, jl_Cloneable, ji_Serializable], 1, 0, 0, ["$_init_0", $rt_wrapFunction0(ju_ArrayDeque__init_0), "$_init_3", $rt_wrapFunction1(ju_ArrayDeque__init_), "$addLast", $rt_wrapFunction1(ju_ArrayDeque_addLast), "$removeFirst", $rt_wrapFunction0(ju_ArrayDeque_removeFirst), "$pollFirst", $rt_wrapFunction0(ju_ArrayDeque_pollFirst), "$add", $rt_wrapFunction1(ju_ArrayDeque_add), "$remove", $rt_wrapFunction0(ju_ArrayDeque_remove), "$size", $rt_wrapFunction0(ju_ArrayDeque_size),
"$isEmpty", $rt_wrapFunction0(ju_ArrayDeque_isEmpty)],
ag_Canvas$1, 0, jl_Object, [], 32768, 0, () => ag_Canvas$1_$callClinit(), 0,
jur_AbstractCharClass$LazyJavaDigit$1, "AbstractCharClass$LazyJavaDigit$1", 7, jur_AbstractCharClass, [], 0, 0, 0, ["$_init_26", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaDigit$1__init_), "$contains", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaDigit$1_contains)],
av_SurfaceView, 0, jl_Object, [], 1, 0, 0, 0,
ccrgm_l, 0, jl_Object, [], 1537, 0, 0, 0,
ccrgm_h, 0, jl_Object, [ccrgm_l], 17, 0, 0, ["$_init_41", $rt_wrapFunction1(ccrgm_h__init_0), "$a4", function(var_1, var_2, var_3, var_4, var_5) { ccrgm_h_a2(this, var_1, var_2, var_3, var_4, var_5); }, "$a2", $rt_wrapFunction1(ccrgm_h_a), "$a5", $rt_wrapFunction2(ccrgm_h_a4), "$a8", $rt_wrapFunction4(ccrgm_h_a1), "$a10", $rt_wrapFunction4(ccrgm_h_a3), "$a6", $rt_wrapFunction4(ccrgm_h_a0)],
ccrgm_e, 0, jl_Object, [], 1, 0, 0, ["$_init_0", $rt_wrapFunction0(ccrgm_e__init_0), "$a7", $rt_wrapFunction1(ccrgm_e_a), "$b2", $rt_wrapFunction0(ccrgm_e_b), "$c", $rt_wrapFunction0(ccrgm_e_c)],
av_SurfaceHolder$Callback2, 0, jl_Object, [], 1, 0, 0, 0,
ccra_GLSurfaceViewShared, 0, av_SurfaceView, [av_SurfaceHolder$Callback2], 1, 0, 0, 0,
ccra_eo, 0, jl_Object, [], 1537, 0, 0, 0,
ccra_GameViewOpenGL, 0, ccra_GLSurfaceViewShared, [ccra_ab, ccra_eo, ccra_z], 1, 0, 0, 0,
jl_NullPointerException, "NullPointerException", 9, jl_RuntimeException, [], 1, 0, 0, ["$_init_", $rt_wrapFunction1(jl_NullPointerException__init_2), "$_init_0", $rt_wrapFunction0(jl_NullPointerException__init_1)],
jur_AbstractCharClass$LazyJavaSpaceChar$1, "AbstractCharClass$LazyJavaSpaceChar$1", 7, jur_AbstractCharClass, [], 0, 0, 0, ["$_init_31", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaSpaceChar$1__init_), "$contains", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaSpaceChar$1_contains)],
otr_EventQueue$Event, 0, jl_Object, [], 1537, 0, 0, 0,
jl_Object$Monitor, 0, jl_Object, [], 0, 0, 0, ["$_init_0", $rt_wrapFunction0(jl_Object$Monitor__init_)],
jl_Math, 0, jl_Object, [], 17, 0, 0, 0,
otji_JSWrapper$Helper$FinalizationRegistryConsumer, 0, jl_Object, [otj_JSObject], 1536, 0, 0, 0,
jur_AbstractCharClass$LazyJavaUnicodeIdentifierPart, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$_init_0", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaUnicodeIdentifierPart__init_), "$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaUnicodeIdentifierPart_computeValue)],
jl_IllegalArgumentException, "IllegalArgumentException", 9, jl_RuntimeException, [], 1, 0, 0, ["$_init_0", $rt_wrapFunction0(jl_IllegalArgumentException__init_1), "$_init_", $rt_wrapFunction1(jl_IllegalArgumentException__init_0)]]);
$rt_metadata([jur_PatternSyntaxException, "PatternSyntaxException", 7, jl_IllegalArgumentException, [], 1, 0, 0, ["$_init_50", $rt_wrapFunction3(jur_PatternSyntaxException__init_0), "$getMessage", $rt_wrapFunction0(jur_PatternSyntaxException_getMessage)],
ccrg_k, 0, jl_Object, [], 1025, 0, () => ccrg_k_$callClinit(), 0,
jur_AbstractCharClass$LazyJavaDefined, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$_init_0", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaDefined__init_), "$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaDefined_computeValue)],
jl_Thread$UncaughtExceptionHandler, 0, jl_Object, [], 1537, 0, 0, 0,
ccrg_h, 0, jl_Object, [jl_Thread$UncaughtExceptionHandler], 17, 0, 0, ["$_init_47", $rt_wrapFunction1(ccrg_h__init_)],
jur_Pattern, 0, jl_Object, [ji_Serializable], 17, 0, 0, ["$matcher", $rt_wrapFunction1(jur_Pattern_matcher), "$split0", $rt_wrapFunction2(jur_Pattern_split0), "$split", $rt_wrapFunction1(jur_Pattern_split), "$pattern", $rt_wrapFunction0(jur_Pattern_pattern), "$namedGroups", $rt_wrapFunction0(jur_Pattern_namedGroups), "$groupCount", $rt_wrapFunction0(jur_Pattern_groupCount), "$compCount", $rt_wrapFunction0(jur_Pattern_compCount), "$consCount", $rt_wrapFunction0(jur_Pattern_consCount)],
ccrg_x, 0, jl_Object, [], 1025, 0, 0, ["$_init_0", $rt_wrapFunction0(ccrg_x__init_)],
jur_PosAltGroupQuantifierSet, 0, jur_AltGroupQuantifierSet, [], 0, 0, 0, ["$_init_11", $rt_wrapFunction3(jur_PosAltGroupQuantifierSet__init_), "$matches", $rt_wrapFunction3(jur_PosAltGroupQuantifierSet_matches), "$setNext", $rt_wrapFunction1(jur_PosAltGroupQuantifierSet_setNext)],
jn_BufferOverflowException, "BufferOverflowException", 8, jl_RuntimeException, [], 1, 0, 0, ["$_init_0", $rt_wrapFunction0(jn_BufferOverflowException__init_0)],
ju_Collections$13, 0, ju_AbstractMap, [], 0, 0, 0, ["$_init_87", $rt_wrapFunction1(ju_Collections$13__init_)],
ag_Paint$Style, 0, jl_Enum, [], 65553, 0, () => ag_Paint$Style_$callClinit(), 0,
jur_AbstractCharClass$LazyJavaLetterOrDigit, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$_init_0", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaLetterOrDigit__init_), "$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaLetterOrDigit_computeValue)],
otciu_UnicodeHelper$Range, 0, jl_Object, [], 1, 0, 0, ["$_init_30", $rt_wrapFunction3(otciu_UnicodeHelper$Range__init_)],
jur_AbstractLineTerminator$2, 0, jur_AbstractLineTerminator, [], 0, 0, 0, ["$_init_0", $rt_wrapFunction0(jur_AbstractLineTerminator$2__init_), "$isLineTerminator", $rt_wrapFunction1(jur_AbstractLineTerminator$2_isLineTerminator), "$isAfterLineTerminator", $rt_wrapFunction2(jur_AbstractLineTerminator$2_isAfterLineTerminator)],
otciu_CharMapping, 0, jl_Object, [], 1, 0, 0, ["$_init_29", $rt_wrapFunction2(otciu_CharMapping__init_)],
jur_AbstractLineTerminator$1, 0, jur_AbstractLineTerminator, [], 0, 0, 0, ["$_init_0", $rt_wrapFunction0(jur_AbstractLineTerminator$1__init_), "$isLineTerminator", $rt_wrapFunction1(jur_AbstractLineTerminator$1_isLineTerminator), "$isAfterLineTerminator", $rt_wrapFunction2(jur_AbstractLineTerminator$1_isAfterLineTerminator)],
jur_AbstractCharClass$LazyJavaUnicodeIdentifierStart, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$_init_0", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaUnicodeIdentifierStart__init_), "$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaUnicodeIdentifierStart_computeValue)],
otjc_JSWeakRef, 0, jl_Object, [otj_JSObject], 1025, 0, 0, 0,
otci_CharFlow, 0, jl_Object, [], 1, 0, 0, ["$_init_27", $rt_wrapFunction1(otci_CharFlow__init_)],
jur_RangeSet, 0, jur_LeafSet, [], 0, 0, 0, ["$_init_61", $rt_wrapFunction1(jur_RangeSet__init_), "$accepts", $rt_wrapFunction2(jur_RangeSet_accepts), "$first", $rt_wrapFunction1(jur_RangeSet_first), "$getChars", $rt_wrapFunction0(jur_RangeSet_getChars)],
jur_UnicodeCategory, "UnicodeCategory", 7, jur_AbstractCharClass, [], 0, 0, 0, ["$_init_3", $rt_wrapFunction1(jur_UnicodeCategory__init_), "$contains", $rt_wrapFunction1(jur_UnicodeCategory_contains)],
jur_UnicodeCategoryScope, "UnicodeCategoryScope", 7, jur_UnicodeCategory, [], 0, 0, 0, ["$_init_3", $rt_wrapFunction1(jur_UnicodeCategoryScope__init_), "$contains", $rt_wrapFunction1(jur_UnicodeCategoryScope_contains)],
otjt_Float32Array, 0, otjt_TypedArray, [], 1, 0, 0, 0,
jur_CharClass, "CharClass", 7, jur_AbstractCharClass, [], 0, 0, 0, ["$_init_0", $rt_wrapFunction0(jur_CharClass__init_2), "$_init_51", $rt_wrapFunction2(jur_CharClass__init_0), "$_init_60", $rt_wrapFunction3(jur_CharClass__init_1), "$add0", $rt_wrapFunction1(jur_CharClass_add), "$add4", $rt_wrapFunction1(jur_CharClass_add1), "$add1", $rt_wrapFunction2(jur_CharClass_add0), "$union", $rt_wrapFunction1(jur_CharClass_union), "$intersection", $rt_wrapFunction1(jur_CharClass_intersection), "$contains", $rt_wrapFunction1(jur_CharClass_contains),
"$getBits", $rt_wrapFunction0(jur_CharClass_getBits), "$getLowHighSurrogates", $rt_wrapFunction0(jur_CharClass_getLowHighSurrogates), "$getInstance", $rt_wrapFunction0(jur_CharClass_getInstance), "$toString", $rt_wrapFunction0(jur_CharClass_toString), "$hasUCI", $rt_wrapFunction0(jur_CharClass_hasUCI)],
jn_BufferUnderflowException, "BufferUnderflowException", 8, jl_RuntimeException, [], 1, 0, 0, ["$_init_0", $rt_wrapFunction0(jn_BufferUnderflowException__init_)],
otcit_FloatAnalyzer$Result, 0, jl_Object, [], 1, 0, 0, ["$_init_0", $rt_wrapFunction0(otcit_FloatAnalyzer$Result__init_)],
jur_UCIDecomposedCharSet, 0, jur_DecomposedCharSet, [], 0, 0, 0, ["$_init_22", $rt_wrapFunction2(jur_UCIDecomposedCharSet__init_)],
jn_FloatBuffer, 0, jn_Buffer, [jl_Comparable], 1025, 0, 0, ["$_init_10", $rt_wrapFunction2(jn_FloatBuffer__init_), "$put0", $rt_wrapFunction3(jn_FloatBuffer_put0), "$put3", $rt_wrapFunction1(jn_FloatBuffer_put), "$clear3", $rt_wrapFunction0(jn_FloatBuffer_clear), "$flip1", $rt_wrapFunction0(jn_FloatBuffer_flip), "$position2", $rt_wrapFunction1(jn_FloatBuffer_position), "$flip", $rt_wrapFunction0(jn_FloatBuffer_flip0), "$clear", $rt_wrapFunction0(jn_FloatBuffer_clear0), "$position0", $rt_wrapFunction1(jn_FloatBuffer_position0)],
jn_FloatBufferImpl, 0, jn_FloatBuffer, [], 1024, 0, 0, ["$_init_10", $rt_wrapFunction2(jn_FloatBufferImpl__init_), "$duplicate", $rt_wrapFunction0(jn_FloatBufferImpl_duplicate), "$get0", $rt_wrapFunction0(jn_FloatBufferImpl_get), "$isReadOnly", $rt_wrapFunction0(jn_FloatBufferImpl_isReadOnly)],
otrr_ClassInfo, 0, otrr_ReflectionInfo, [], 17, 0, 0, ["$newArrayInstance", $rt_wrapFunction1(otrr_ClassInfo_newArrayInstance)],
otrfm_InMemoryVirtualFileSystem, 0, jl_Object, [otrf_VirtualFileSystem], 1, 0, 0, ["$_init_0", $rt_wrapFunction0(otrfm_InMemoryVirtualFileSystem__init_), "$isWindows", $rt_wrapFunction0(otrfm_InMemoryVirtualFileSystem_isWindows)],
ccrg_ak, 0, jl_Thread, [], 17, 0, () => ccrg_ak_$callClinit(), ["$_init_0", $rt_wrapFunction0(ccrg_ak__init_), "$run", $rt_wrapFunction0(ccrg_ak_run)],
jur_AbstractCharClass$LazyJavaWhitespace$1, "AbstractCharClass$LazyJavaWhitespace$1", 7, jur_AbstractCharClass, [], 0, 0, 0, ["$_init_80", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaWhitespace$1__init_), "$contains", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaWhitespace$1_contains)],
jur_AbstractCharClass$LazyJavaJavaIdentifierStart, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$_init_0", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaJavaIdentifierStart__init_), "$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaJavaIdentifierStart_computeValue)],
ccrg_af, 0, ccrg_x, [], 17, 0, 0, ["$_init_0", $rt_wrapFunction0(ccrg_af__init_)],
ag_Paint$Align, 0, jl_Enum, [], 65553, 0, () => ag_Paint$Align_$callClinit(), 0,
jl_CloneNotSupportedException, "CloneNotSupportedException", 9, jl_Exception, [], 1, 0, 0, ["$_init_0", $rt_wrapFunction0(jl_CloneNotSupportedException__init_)],
otjt_Uint8Array, 0, otjt_TypedArray, [], 1, 0, 0, 0,
otcjn_TArrayBufferViewProvider, 0, jl_Object, [], 1537, 0, 0, 0,
jl_Long, 0, jl_Number, [jl_Comparable], 1, 0, () => jl_Long_$callClinit(), 0,
jur_SequenceSet$IntHash, 0, jl_Object, [], 0, 0, 0, ["$_init_3", $rt_wrapFunction1(jur_SequenceSet$IntHash__init_0), "$put2", $rt_wrapFunction2(jur_SequenceSet$IntHash_put), "$get5", $rt_wrapFunction1(jur_SequenceSet$IntHash_get)],
jur_AbstractCharClass$LazyNonDigit, 0, jur_AbstractCharClass$LazyDigit, [], 0, 0, 0, ["$_init_0", $rt_wrapFunction0(jur_AbstractCharClass$LazyNonDigit__init_), "$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyNonDigit_computeValue)],
au_Log, 0, jl_Object, [], 1, 0, 0, 0,
jur_AbstractCharClass$1, "AbstractCharClass$1", 7, jur_AbstractCharClass, [], 0, 0, 0, ["$_init_16", $rt_wrapFunction2(jur_AbstractCharClass$1__init_), "$contains", $rt_wrapFunction1(jur_AbstractCharClass$1_contains)],
jur_AbstractCharClass$2, "AbstractCharClass$2", 7, jur_AbstractCharClass, [], 0, 0, 0, ["$_init_17", $rt_wrapFunction3(jur_AbstractCharClass$2__init_), "$contains", $rt_wrapFunction1(jur_AbstractCharClass$2_contains)],
jur_AbstractCharClass$LazyJavaLowerCase, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$_init_0", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaLowerCase__init_), "$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaLowerCase_computeValue)],
jur_PossessiveCompositeQuantifierSet, 0, jur_CompositeQuantifierSet, [], 0, 0, 0, ["$_init_57", $rt_wrapFunction4(jur_PossessiveCompositeQuantifierSet__init_), "$matches", $rt_wrapFunction3(jur_PossessiveCompositeQuantifierSet_matches)],
jur_AbstractCharClass$LazyJavaLetterOrDigit$1, "AbstractCharClass$LazyJavaLetterOrDigit$1", 7, jur_AbstractCharClass, [], 0, 0, 0, ["$_init_63", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaLetterOrDigit$1__init_), "$contains", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaLetterOrDigit$1_contains)],
jur_CharClass$18, "CharClass$18", 7, jur_AbstractCharClass, [], 0, 0, 0, ["$_init_69", $rt_wrapFunction2(jur_CharClass$18__init_), "$contains", $rt_wrapFunction1(jur_CharClass$18_contains), "$toString", $rt_wrapFunction0(jur_CharClass$18_toString)],
jur_PossessiveGroupQuantifierSet, 0, jur_GroupQuantifierSet, [], 0, 0, 0, ["$_init_11", $rt_wrapFunction3(jur_PossessiveGroupQuantifierSet__init_), "$matches", $rt_wrapFunction3(jur_PossessiveGroupQuantifierSet_matches)]]);
$rt_metadata([jur_CharClass$13, 0, jur_AbstractCharClass, [], 0, 0, 0, ["$_init_66", $rt_wrapFunction2(jur_CharClass$13__init_), "$contains", $rt_wrapFunction1(jur_CharClass$13_contains)],
jur_CharClass$12, 0, jur_AbstractCharClass, [], 0, 0, 0, ["$_init_66", $rt_wrapFunction2(jur_CharClass$12__init_), "$contains", $rt_wrapFunction1(jur_CharClass$12_contains)],
jur_CharClass$11, 0, jur_AbstractCharClass, [], 0, 0, 0, ["$_init_65", $rt_wrapFunction4(jur_CharClass$11__init_), "$contains", $rt_wrapFunction1(jur_CharClass$11_contains)],
otci_Base46, 0, jl_Object, [], 17, 0, 0, 0,
jur_CharClass$10, 0, jur_AbstractCharClass, [], 0, 0, 0, ["$_init_65", $rt_wrapFunction4(jur_CharClass$10__init_), "$contains", $rt_wrapFunction1(jur_CharClass$10_contains)],
jur_CharClass$17, 0, jur_AbstractCharClass, [], 0, 0, 0, ["$_init_65", $rt_wrapFunction4(jur_CharClass$17__init_), "$contains", $rt_wrapFunction1(jur_CharClass$17_contains)],
jur_UCISequenceSet, 0, jur_LeafSet, [], 0, 0, 0, ["$_init_52", $rt_wrapFunction1(jur_UCISequenceSet__init_), "$accepts", $rt_wrapFunction2(jur_UCISequenceSet_accepts)],
jur_CharClass$16, 0, jur_AbstractCharClass, [], 0, 0, 0, ["$_init_65", $rt_wrapFunction4(jur_CharClass$16__init_), "$contains", $rt_wrapFunction1(jur_CharClass$16_contains)],
jur_CharClass$15, 0, jur_AbstractCharClass, [], 0, 0, 0, ["$_init_68", $rt_wrapFunction3(jur_CharClass$15__init_), "$contains", $rt_wrapFunction1(jur_CharClass$15_contains)],
jur_AbstractCharClass$LazyJavaDefined$1, "AbstractCharClass$LazyJavaDefined$1", 7, jur_AbstractCharClass, [], 0, 0, 0, ["$_init_48", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaDefined$1__init_), "$contains", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaDefined$1_contains)],
otjt_Int8Array, 0, otjt_TypedArray, [], 1, 0, 0, 0,
jur_CharClass$14, 0, jur_AbstractCharClass, [], 0, 0, 0, ["$_init_68", $rt_wrapFunction3(jur_CharClass$14__init_), "$contains", $rt_wrapFunction1(jur_CharClass$14_contains)],
ju_Map$Entry, 0, jl_Object, [], 1537, 0, 0, 0,
ju_WeakHashMap$Entry, 0, jlr_WeakReference, [ju_Map$Entry], 16, 0, 0, 0,
jl_StringBuilder, 0, jl_AbstractStringBuilder, [jl_Appendable], 1, 0, 0, ["$_init_3", $rt_wrapFunction1(jl_StringBuilder__init_4), "$_init_0", $rt_wrapFunction0(jl_StringBuilder__init_3), "$_init_", $rt_wrapFunction1(jl_StringBuilder__init_2), "$append", $rt_wrapFunction1(jl_StringBuilder_append), "$append15", $rt_wrapFunction1(jl_StringBuilder_append6), "$append2", $rt_wrapFunction1(jl_StringBuilder_append0), "$append12", $rt_wrapFunction1(jl_StringBuilder_append5), "$append4", $rt_wrapFunction1(jl_StringBuilder_append2),
"$append11", $rt_wrapFunction1(jl_StringBuilder_append4), "$append0", $rt_wrapFunction1(jl_StringBuilder_append1), "$append22", $rt_wrapFunction3(jl_StringBuilder_append7), "$append10", $rt_wrapFunction1(jl_StringBuilder_append9), "$append3", $rt_wrapFunction1(jl_StringBuilder_append3), "$insert18", $rt_wrapFunction2(jl_StringBuilder_insert7), "$insert17", $rt_wrapFunction2(jl_StringBuilder_insert6), "$insert16", $rt_wrapFunction2(jl_StringBuilder_insert9), "$insert12", $rt_wrapFunction4(jl_StringBuilder_insert4),
"$insert14", $rt_wrapFunction2(jl_StringBuilder_insert10), "$insert13", $rt_wrapFunction2(jl_StringBuilder_insert1), "$insert15", $rt_wrapFunction2(jl_StringBuilder_insert2), "$delete0", $rt_wrapFunction2(jl_StringBuilder_delete), "$deleteCharAt", $rt_wrapFunction1(jl_StringBuilder_deleteCharAt), "$insert19", $rt_wrapFunction2(jl_StringBuilder_insert12), "$insert8", $rt_wrapFunction4(jl_StringBuilder_insert11), "$append5", $rt_wrapFunction3(jl_StringBuilder_append8), "$length", $rt_wrapFunction0(jl_StringBuilder_length),
"$toString", $rt_wrapFunction0(jl_StringBuilder_toString), "$ensureCapacity", $rt_wrapFunction1(jl_StringBuilder_ensureCapacity), "$insert7", $rt_wrapFunction2(jl_StringBuilder_insert13), "$insert", $rt_wrapFunction2(jl_StringBuilder_insert0), "$insert6", $rt_wrapFunction2(jl_StringBuilder_insert), "$insert5", $rt_wrapFunction2(jl_StringBuilder_insert5), "$insert4", $rt_wrapFunction2(jl_StringBuilder_insert8), "$insert2", $rt_wrapFunction2(jl_StringBuilder_insert3), "$insert0", $rt_wrapFunction2(jl_StringBuilder_insert14)],
otrfm_InMemoryVirtualDirectory, 0, otrfm_AbstractInMemoryVirtualFile, [], 1, 0, 0, ["$_init_", $rt_wrapFunction1(otrfm_InMemoryVirtualDirectory__init_)],
jur_CompositeRangeSet, 0, jur_JointSet, [], 0, 0, 0, ["$_init_62", $rt_wrapFunction2(jur_CompositeRangeSet__init_0), "$matches", $rt_wrapFunction3(jur_CompositeRangeSet_matches), "$setNext", $rt_wrapFunction1(jur_CompositeRangeSet_setNext), "$hasConsumed", $rt_wrapFunction1(jur_CompositeRangeSet_hasConsumed), "$first", $rt_wrapFunction1(jur_CompositeRangeSet_first)],
ju_ConcurrentModificationException, "ConcurrentModificationException", 6, jl_RuntimeException, [], 1, 0, 0, ["$_init_0", $rt_wrapFunction0(ju_ConcurrentModificationException__init_)],
ju_Hashtable$1, 0, jl_Object, [ju_Enumeration], 0, 0, 0, ["$_init_0", $rt_wrapFunction0(ju_Hashtable$1__init_)],
ccrgb_m, 0, jl_Object, [], 1537, 0, 0, 0,
ccrgb_b, 0, jl_Object, [ccrgb_m], 1, 0, 0, ["$_init_0", $rt_wrapFunction0(ccrgb_b__init_)],
ccrgb_l, 0, ccrgb_b, [], 17, 0, 0, ["$_init_0", $rt_wrapFunction0(ccrgb_l__init_)],
ju_Hashtable$2, 0, jl_Object, [ju_Iterator], 0, 0, 0, ["$_init_0", $rt_wrapFunction0(ju_Hashtable$2__init_)],
ju_MapEntry, 0, jl_Object, [ju_Map$Entry, jl_Cloneable], 0, 0, 0, ["$_init_45", $rt_wrapFunction2(ju_MapEntry__init_)],
ju_Hashtable$Entry, 0, ju_MapEntry, [], 0, 0, 0, ["$_init_45", $rt_wrapFunction2(ju_Hashtable$Entry__init_), "$getKeyHash", $rt_wrapFunction0(ju_Hashtable$Entry_getKeyHash), "$equalsKey", $rt_wrapFunction2(ju_Hashtable$Entry_equalsKey)],
ccrgb_r, 0, jl_Object, [], 1537, 0, 0, 0,
ag_Paint$Join, 0, jl_Enum, [], 65553, 0, () => ag_Paint$Join_$callClinit(), 0,
ccrgb_s, 0, jl_Object, [], 1537, 0, 0, 0,
ccrgb_p, 0, jl_Object, [], 1537, 0, 0, 0,
ccrgb_x, 0, jl_Object, [], 1024, 0, 0, ["$_init_", $rt_wrapFunction1(ccrgb_x__init_)],
ccrgb_w, 0, ccrgb_x, [], 16, 0, 0, ["$_init_0", $rt_wrapFunction0(ccrgb_w__init_0), "$a2", $rt_wrapFunction1(ccrgb_w_a)],
jur_FinalSet, 0, jur_FSet, [], 0, 0, 0, ["$_init_0", $rt_wrapFunction0(jur_FinalSet__init_), "$matches", $rt_wrapFunction3(jur_FinalSet_matches)],
ccrgb_t, "t", 4, jl_Object, [ccrgb_p], 1, [0,0,0], () => ccrgb_t_$callClinit(), ["$_init_42", $rt_wrapFunction1(ccrgb_t__init_0), "$a", $rt_wrapFunction3(ccrgb_t_a0), "$a2", $rt_wrapFunction1(ccrgb_t_a2), "$a26", $rt_wrapFunction1(ccrgb_t_a10), "$a27", $rt_wrapFunction1(ccrgb_t_a7), "$a9", function(var_1, var_2, var_3, var_4, var_5) { ccrgb_t_a5(this, var_1, var_2, var_3, var_4, var_5); }, "$b", $rt_wrapFunction0(ccrgb_t_b), "$g", $rt_wrapFunction0(ccrgb_t_g)],
ccrgb_u, 0, ccrgb_x, [], 16, 0, 0, ["$_init_", $rt_wrapFunction1(ccrgb_u__init_0), "$a2", $rt_wrapFunction1(ccrgb_u_a)],
ccrgb_z, 0, ccrgb_x, [], 16, 0, 0, ["$_init_", $rt_wrapFunction1(ccrgb_z__init_0), "$a2", $rt_wrapFunction1(ccrgb_z_a)],
ccrgb_y, 0, jl_Object, [], 17, 0, 0, ["$_init_0", $rt_wrapFunction0(ccrgb_y__init_0)],
jur_EmptySet, 0, jur_LeafSet, [], 0, 0, 0, ["$_init_9", $rt_wrapFunction1(jur_EmptySet__init_0), "$accepts", $rt_wrapFunction2(jur_EmptySet_accepts), "$find", $rt_wrapFunction3(jur_EmptySet_find), "$findBack", $rt_wrapFunction4(jur_EmptySet_findBack), "$hasConsumed", $rt_wrapFunction1(jur_EmptySet_hasConsumed)],
jn_ShortBufferOverTypedArray, 0, jn_ShortBufferImpl, [jn_ArrayBufferViewProvider], 0, 0, 0, ["$_init_74", function(var_1, var_2, var_3, var_4, var_5) { jn_ShortBufferOverTypedArray__init_0(this, var_1, var_2, var_3, var_4, var_5); }, "$duplicate3", function(var_1, var_2, var_3, var_4, var_5) { return jn_ShortBufferOverTypedArray_duplicate(this, var_1, var_2, var_3, var_4, var_5); }, "$readOnly", $rt_wrapFunction0(jn_ShortBufferOverTypedArray_readOnly), "$getElement", $rt_wrapFunction1(jn_ShortBufferOverTypedArray_getElement),
"$capacityImpl", $rt_wrapFunction0(jn_ShortBufferOverTypedArray_capacityImpl), "$putImpl1", $rt_wrapFunction4(jn_ShortBufferOverTypedArray_putImpl)],
jl_StackTraceElement, 0, jl_Object, [ji_Serializable], 17, 0, 0, 0,
ccrg_bp, 0, jl_Object, [], 17, 0, 0, 0,
ju_HashMap$HashEntry, 0, ju_MapEntry, [], 0, 0, 0, ["$_init_13", $rt_wrapFunction2(ju_HashMap$HashEntry__init_)],
ju_LinkedHashMap$LinkedHashMapEntry, 0, ju_HashMap$HashEntry, [], 16, 0, 0, ["$_init_13", $rt_wrapFunction2(ju_LinkedHashMap$LinkedHashMapEntry__init_)],
jur_AbstractCharClass$LazyASCII, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$_init_0", $rt_wrapFunction0(jur_AbstractCharClass$LazyASCII__init_), "$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyASCII_computeValue)],
ag_PorterDuff$Mode, 0, jl_Enum, [], 65553, 0, () => ag_PorterDuff$Mode_$callClinit(), 0,
ju_AbstractList$1, 0, jl_Object, [ju_Iterator], 0, 0, 0, ["$_init_38", $rt_wrapFunction1(ju_AbstractList$1__init_), "$hasNext", $rt_wrapFunction0(ju_AbstractList$1_hasNext), "$next", $rt_wrapFunction0(ju_AbstractList$1_next)],
ccrgb_f, 0, jl_Object, [ccrgb_an], 17, 0, 0, ["$_init_0", $rt_wrapFunction0(ccrgb_f__init_)],
ccrgb_d, 0, jl_Object, [ccrgb_an], 1, 0, 0, ["$_init_0", $rt_wrapFunction0(ccrgb_d__init_)],
ccrgb_e, 0, jl_Object, [ccrgb_an], 17, 0, 0, ["$_init_0", $rt_wrapFunction0(ccrgb_e__init_)],
ccrgb_j, 0, jl_Object, [ccrgb_s], 16, 0, 0, ["$_init_42", $rt_wrapFunction1(ccrgb_j__init_)],
ccrgb_h, 0, jl_Object, [ccrgb_ad], 17, 0, 0, ["$_init_0", $rt_wrapFunction0(ccrgb_h__init_)]]);
$rt_metadata([ccrgb_i, 0, jl_Object, [ccrgb_r], 16, 0, 0, ["$_init_42", $rt_wrapFunction1(ccrgb_i__init_), "$a24", $rt_wrapFunction2(ccrgb_i_a)],
jur_Quantifier, "Quantifier", 7, jur_SpecialToken, [jl_Cloneable], 0, 0, 0, ["$_init_10", $rt_wrapFunction2(jur_Quantifier__init_), "$min0", $rt_wrapFunction0(jur_Quantifier_min), "$max1", $rt_wrapFunction0(jur_Quantifier_max), "$toString", $rt_wrapFunction0(jur_Quantifier_toString)],
ag_Rect, 0, jl_Object, [], 1, 0, 0, ["$_init_0", $rt_wrapFunction0(ag_Rect__init_1), "$_init_43", $rt_wrapFunction4(ag_Rect__init_0), "$set1", $rt_wrapFunction4(ag_Rect_set)],
jur_AbstractCharClass$LazyJavaUpperCase$1, "AbstractCharClass$LazyJavaUpperCase$1", 7, jur_AbstractCharClass, [], 0, 0, 0, ["$_init_79", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaUpperCase$1__init_), "$contains", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaUpperCase$1_contains)],
r_Bootstrap$TestShader, 0, jl_Object, [ccrgb_m], 1, 0, 0, ["$_init_0", $rt_wrapFunction0(r_Bootstrap$TestShader__init_), "$a20", $rt_wrapFunction0(r_Bootstrap$TestShader_a0), "$b1", $rt_wrapFunction0(r_Bootstrap$TestShader_b), "$a28", $rt_wrapFunction2(r_Bootstrap$TestShader_a)],
otpp_ResourceAccessor, 0, jl_Object, [], 16, 0, 0, 0,
jur_PossessiveQuantifierSet, 0, jur_LeafQuantifierSet, [], 0, 0, 0, ["$_init_28", $rt_wrapFunction3(jur_PossessiveQuantifierSet__init_), "$matches", $rt_wrapFunction3(jur_PossessiveQuantifierSet_matches)],
jur_AbstractCharClass$LazyJavaIdentifierIgnorable$1, "AbstractCharClass$LazyJavaIdentifierIgnorable$1", 7, jur_AbstractCharClass, [], 0, 0, 0, ["$_init_86", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaIdentifierIgnorable$1__init_), "$contains", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaIdentifierIgnorable$1_contains)],
jl_DefaultUncaughtExceptionHandler, 0, jl_Object, [jl_Thread$UncaughtExceptionHandler], 1, 0, 0, ["$_init_0", $rt_wrapFunction0(jl_DefaultUncaughtExceptionHandler__init_)],
jur_AbstractCharClass$LazyJavaLetter$1, "AbstractCharClass$LazyJavaLetter$1", 7, jur_AbstractCharClass, [], 0, 0, 0, ["$_init_21", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaLetter$1__init_), "$contains", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaLetter$1_contains)],
jur_ReluctantQuantifierSet, 0, jur_LeafQuantifierSet, [], 0, 0, 0, ["$_init_28", $rt_wrapFunction3(jur_ReluctantQuantifierSet__init_), "$matches", $rt_wrapFunction3(jur_ReluctantQuantifierSet_matches)],
ag_RectF, 0, jl_Object, [], 1, 0, 0, ["$_init_0", $rt_wrapFunction0(ag_RectF__init_0), "$_init_40", $rt_wrapFunction4(ag_RectF__init_2), "$set2", $rt_wrapFunction4(ag_RectF_set)],
jur_EOISet, 0, jur_AbstractSet, [], 0, 0, 0, ["$_init_0", $rt_wrapFunction0(jur_EOISet__init_), "$matches", $rt_wrapFunction3(jur_EOISet_matches), "$hasConsumed", $rt_wrapFunction1(jur_EOISet_hasConsumed)],
jur_AbstractCharClass$LazyUpper, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$_init_0", $rt_wrapFunction0(jur_AbstractCharClass$LazyUpper__init_), "$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyUpper_computeValue)],
jl_ThreadInterruptHandler, 0, jl_Object, [], 1537, 0, 0, 0,
jl_Thread$SleepHandler, 0, jl_Object, [otp_PlatformRunnable, otr_EventQueue$Event, jl_ThreadInterruptHandler], 0, 0, 0, ["$_init_7", $rt_wrapFunction2(jl_Thread$SleepHandler__init_), "$run", $rt_wrapFunction0(jl_Thread$SleepHandler_run)],
otji_JSWrapper, "JSWrapper", 13, jl_Object, [], 17, 0, 0, ["$toString", $rt_wrapFunction0(otji_JSWrapper_toString)],
jur_MultiLineSOLSet, 0, jur_AbstractSet, [], 0, 0, 0, ["$_init_59", $rt_wrapFunction1(jur_MultiLineSOLSet__init_), "$matches", $rt_wrapFunction3(jur_MultiLineSOLSet_matches), "$hasConsumed", $rt_wrapFunction1(jur_MultiLineSOLSet_hasConsumed)],
jur_AbstractCharClass$LazyLower, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$_init_0", $rt_wrapFunction0(jur_AbstractCharClass$LazyLower__init_), "$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyLower_computeValue)],
oti_AsyncCallback, 0, jl_Object, [], 1537, 0, 0, 0,
jur_AbstractCharClass$LazyJavaTitleCase, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$_init_0", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaTitleCase__init_), "$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaTitleCase_computeValue)],
jur_PreviousMatch, 0, jur_AbstractSet, [], 0, 0, 0, ["$_init_0", $rt_wrapFunction0(jur_PreviousMatch__init_), "$matches", $rt_wrapFunction3(jur_PreviousMatch_matches), "$hasConsumed", $rt_wrapFunction1(jur_PreviousMatch_hasConsumed)],
ao_Matrix, 0, jl_Object, [], 1, 0, 0, 0,
jur_NonCapFSet, 0, jur_FSet, [], 0, 0, 0, ["$_init_3", $rt_wrapFunction1(jur_NonCapFSet__init_), "$matches", $rt_wrapFunction3(jur_NonCapFSet_matches), "$hasConsumed", $rt_wrapFunction1(jur_NonCapFSet_hasConsumed)],
jur_UCISupplCharSet, 0, jur_LeafSet, [], 0, 0, 0, ["$_init_3", $rt_wrapFunction1(jur_UCISupplCharSet__init_), "$accepts", $rt_wrapFunction2(jur_UCISupplCharSet_accepts)],
jl_System, 0, jl_Object, [], 17, 0, 0, 0,
jn_FloatBufferOverTypedArray, 0, jn_FloatBufferImpl, [jn_ArrayBufferViewProvider], 0, 0, 0, ["$_init_70", function(var_1, var_2, var_3, var_4, var_5) { jn_FloatBufferOverTypedArray__init_0(this, var_1, var_2, var_3, var_4, var_5); }, "$duplicate4", function(var_1, var_2, var_3, var_4, var_5) { return jn_FloatBufferOverTypedArray_duplicate(this, var_1, var_2, var_3, var_4, var_5); }, "$readOnly", $rt_wrapFunction0(jn_FloatBufferOverTypedArray_readOnly), "$getElement1", $rt_wrapFunction1(jn_FloatBufferOverTypedArray_getElement),
"$capacityImpl", $rt_wrapFunction0(jn_FloatBufferOverTypedArray_capacityImpl), "$putImpl2", $rt_wrapFunction4(jn_FloatBufferOverTypedArray_putImpl)],
jur_AbstractCharClass$LazyRange, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$_init_10", $rt_wrapFunction2(jur_AbstractCharClass$LazyRange__init_0), "$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyRange_computeValue)],
jur_AbstractCharClass$LazyXDigit, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$_init_0", $rt_wrapFunction0(jur_AbstractCharClass$LazyXDigit__init_), "$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyXDigit_computeValue)],
jur_Matcher, 0, jl_Object, [jur_MatchResult], 17, 0, 0, ["$find1", $rt_wrapFunction1(jur_Matcher_find), "$find0", $rt_wrapFunction0(jur_Matcher_find0), "$start", $rt_wrapFunction1(jur_Matcher_start0), "$end", $rt_wrapFunction1(jur_Matcher_end), "$start0", $rt_wrapFunction0(jur_Matcher_start), "$end0", $rt_wrapFunction0(jur_Matcher_end0), "$hasTransparentBounds", $rt_wrapFunction0(jur_Matcher_hasTransparentBounds), "$_init_49", $rt_wrapFunction2(jur_Matcher__init_)],
jur_DotAllSet, 0, jur_JointSet, [], 0, 0, 0, ["$_init_0", $rt_wrapFunction0(jur_DotAllSet__init_), "$matches", $rt_wrapFunction3(jur_DotAllSet_matches), "$setNext", $rt_wrapFunction1(jur_DotAllSet_setNext), "$getType", $rt_wrapFunction0(jur_DotAllSet_getType), "$hasConsumed", $rt_wrapFunction1(jur_DotAllSet_hasConsumed)],
jur_AbstractCharClass$LazyJavaLowerCase$1, "AbstractCharClass$LazyJavaLowerCase$1", 7, jur_AbstractCharClass, [], 0, 0, 0, ["$_init_72", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaLowerCase$1__init_), "$contains", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaLowerCase$1_contains)],
jn_FloatBufferOverDataView, 0, jn_FloatBufferImpl, [jn_ArrayBufferViewProvider], 0, 0, 0, ["$_init_37", function(var_1, var_2, var_3, var_4, var_5) { jn_FloatBufferOverDataView__init_(this, var_1, var_2, var_3, var_4, var_5); }, "$duplicate4", function(var_1, var_2, var_3, var_4, var_5) { return jn_FloatBufferOverDataView_duplicate(this, var_1, var_2, var_3, var_4, var_5); }, "$readOnly", $rt_wrapFunction0(jn_FloatBufferOverDataView_readOnly), "$getElement1", $rt_wrapFunction1(jn_FloatBufferOverDataView_getElement),
"$putImpl2", $rt_wrapFunction4(jn_FloatBufferOverDataView_putImpl), "$capacityImpl", $rt_wrapFunction0(jn_FloatBufferOverDataView_capacityImpl)],
jl_Object$monitorExit$lambda$_8_1, 0, jl_Object, [otp_PlatformRunnable], 1, 0, 0, ["$_init_2", $rt_wrapFunction1(jl_Object$monitorExit$lambda$_8_1__init_), "$run", $rt_wrapFunction0(jl_Object$monitorExit$lambda$_8_1_run)],
jur_UCISupplRangeSet, 0, jur_SupplRangeSet, [], 0, 0, 0, ["$_init_61", $rt_wrapFunction1(jur_UCISupplRangeSet__init_0), "$contains", $rt_wrapFunction1(jur_UCISupplRangeSet_contains)],
jur_AbstractCharClass$LazyJavaUpperCase, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$_init_0", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaUpperCase__init_), "$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaUpperCase_computeValue)],
jur_HangulDecomposedCharSet, 0, jur_JointSet, [], 0, 0, 0, ["$_init_53", $rt_wrapFunction2(jur_HangulDecomposedCharSet__init_), "$setNext", $rt_wrapFunction1(jur_HangulDecomposedCharSet_setNext), "$matches", $rt_wrapFunction3(jur_HangulDecomposedCharSet_matches), "$first", $rt_wrapFunction1(jur_HangulDecomposedCharSet_first), "$hasConsumed", $rt_wrapFunction1(jur_HangulDecomposedCharSet_hasConsumed)],
jur_AbstractCharClass$LazyPunct, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$_init_0", $rt_wrapFunction0(jur_AbstractCharClass$LazyPunct__init_), "$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyPunct_computeValue)],
jur_WordBoundary, 0, jur_AbstractSet, [], 0, 0, 0, ["$_init_58", $rt_wrapFunction1(jur_WordBoundary__init_0), "$matches", $rt_wrapFunction3(jur_WordBoundary_matches), "$hasConsumed", $rt_wrapFunction1(jur_WordBoundary_hasConsumed)],
jur_AbstractCharClass$LazySpace, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$_init_0", $rt_wrapFunction0(jur_AbstractCharClass$LazySpace__init_), "$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazySpace_computeValue)],
otrf_VirtualFileSystemProvider, 0, jl_Object, [], 17, 0, 0, 0,
jl_Double, 0, jl_Number, [jl_Comparable], 1, 0, () => jl_Double_$callClinit(), 0,
ccrg_SettingsEngine, 0, jl_Object, [], 1, 0, 0, 0,
jlr_ReferenceQueue, 0, jl_Object, [], 1, 0, 0, ["$_init_0", $rt_wrapFunction0(jlr_ReferenceQueue__init_)],
jur_IntHash, 0, jl_Object, [], 0, 0, 0, 0,
ccrgm_fk, 0, jl_Object, [], 17, 0, () => ccrgm_fk_$callClinit(), 0,
jur_ReluctantAltQuantifierSet, 0, jur_AltQuantifierSet, [], 0, 0, 0, ["$_init_28", $rt_wrapFunction3(jur_ReluctantAltQuantifierSet__init_), "$matches", $rt_wrapFunction3(jur_ReluctantAltQuantifierSet_matches)],
jl_NegativeArraySizeException, "NegativeArraySizeException", 9, jl_RuntimeException, [], 1, 0, 0, ["$_init_0", $rt_wrapFunction0(jl_NegativeArraySizeException__init_)],
jur_AbstractCharClass$LazyJavaWhitespace, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$_init_0", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaWhitespace__init_), "$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaWhitespace_computeValue)],
jl_NumberFormatException, "NumberFormatException", 9, jl_IllegalArgumentException, [], 1, 0, 0, ["$_init_0", $rt_wrapFunction0(jl_NumberFormatException__init_1), "$_init_", $rt_wrapFunction1(jl_NumberFormatException__init_)]]);
$rt_metadata([ccra_RWApplication, 0, aa_Application, [], 1, 0, 0, 0,
jur_IntArrHash, 0, jl_Object, [], 0, 0, 0, 0,
jur_AbstractCharClass$LazyJavaMirrored, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$_init_0", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaMirrored__init_), "$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaMirrored_computeValue)],
jur_AbstractCharClass$LazyJavaISOControl, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$_init_0", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaISOControl__init_), "$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaISOControl_computeValue)],
jl_IllegalStateException, "IllegalStateException", 9, jl_RuntimeException, [], 1, 0, 0, ["$_init_0", $rt_wrapFunction0(jl_IllegalStateException__init_1), "$_init_", $rt_wrapFunction1(jl_IllegalStateException__init_)],
jur_HighSurrogateCharSet, 0, jur_JointSet, [], 0, 0, 0, ["$_init_54", $rt_wrapFunction1(jur_HighSurrogateCharSet__init_), "$setNext", $rt_wrapFunction1(jur_HighSurrogateCharSet_setNext), "$matches", $rt_wrapFunction3(jur_HighSurrogateCharSet_matches), "$find", $rt_wrapFunction3(jur_HighSurrogateCharSet_find), "$findBack", $rt_wrapFunction4(jur_HighSurrogateCharSet_findBack), "$first", $rt_wrapFunction1(jur_HighSurrogateCharSet_first), "$hasConsumed", $rt_wrapFunction1(jur_HighSurrogateCharSet_hasConsumed)],
jur_ReluctantCompositeQuantifierSet, 0, jur_CompositeQuantifierSet, [], 0, 0, 0, ["$_init_57", $rt_wrapFunction4(jur_ReluctantCompositeQuantifierSet__init_), "$matches", $rt_wrapFunction3(jur_ReluctantCompositeQuantifierSet_matches)],
av_View, 0, jl_Object, [], 1, 0, 0, 0,
ccra_GameViewNonSurface, 0, av_View, [ccra_ab, ccra_eo], 1, 0, 0, 0,
jn_ByteBuffer, 0, jn_Buffer, [jl_Comparable], 1025, 0, 0, ["$_init_0", $rt_wrapFunction0(jn_ByteBuffer__init_), "$order", $rt_wrapFunction1(jn_ByteBuffer_order), "$onOrderChanged", $rt_wrapFunction0(jn_ByteBuffer_onOrderChanged)],
jur_SOLSet, 0, jur_AbstractSet, [], 16, 0, 0, ["$_init_0", $rt_wrapFunction0(jur_SOLSet__init_), "$matches", $rt_wrapFunction3(jur_SOLSet_matches), "$hasConsumed", $rt_wrapFunction1(jur_SOLSet_hasConsumed)],
otpp_AsyncCallbackWrapper, 0, jl_Object, [oti_AsyncCallback], 0, 0, 0, ["$_init_84", $rt_wrapFunction1(otpp_AsyncCallbackWrapper__init_), "$complete", $rt_wrapFunction1(otpp_AsyncCallbackWrapper_complete), "$error", $rt_wrapFunction1(otpp_AsyncCallbackWrapper_error)],
jl_Byte, 0, jl_Number, [jl_Comparable], 1, 0, () => jl_Byte_$callClinit(), ["$_init_85", $rt_wrapFunction1(jl_Byte__init_), "$byteValue", $rt_wrapFunction0(jl_Byte_byteValue)],
ccrgu_p, 0, ju_AbstractList, [ji_Serializable, jl_Cloneable, ju_RandomAccess], 17, 0, 0, ["$_init_0", $rt_wrapFunction0(ccrgu_p__init_0), "$add", $rt_wrapFunction1(ccrgu_p_add)],
ag_Typeface, 0, jl_Object, [], 1, 0, 0, 0,
jur_AbstractCharClass$LazyJavaIdentifierIgnorable, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$_init_0", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaIdentifierIgnorable__init_), "$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaIdentifierIgnorable_computeValue)],
jur_UMultiLineEOLSet, 0, jur_AbstractSet, [], 0, 0, 0, ["$_init_3", $rt_wrapFunction1(jur_UMultiLineEOLSet__init_), "$matches", $rt_wrapFunction3(jur_UMultiLineEOLSet_matches), "$hasConsumed", $rt_wrapFunction1(jur_UMultiLineEOLSet_hasConsumed)],
jn_ByteBufferJsImpl, 0, jn_ByteBuffer, [jn_ArrayBufferViewProvider], 0, 0, 0, ["$_init_83", function(var_1, var_2, var_3, var_4, var_5) { jn_ByteBufferJsImpl__init_(this, var_1, var_2, var_3, var_4, var_5); }, "$asShortBuffer", $rt_wrapFunction0(jn_ByteBufferJsImpl_asShortBuffer), "$asFloatBuffer", $rt_wrapFunction0(jn_ByteBufferJsImpl_asFloatBuffer)],
otcit_DoubleAnalyzer, 0, jl_Object, [], 17, 0, () => otcit_DoubleAnalyzer_$callClinit(), 0,
jur_EOLSet, 0, jur_AbstractSet, [], 16, 0, 0, ["$_init_3", $rt_wrapFunction1(jur_EOLSet__init_), "$matches", $rt_wrapFunction3(jur_EOLSet_matches), "$hasConsumed", $rt_wrapFunction1(jur_EOLSet_hasConsumed)],
otr_StringInfo, 0, otrr_ReflectionInfo, [], 17, 0, 0, 0,
jur_Lexer, 0, jl_Object, [], 0, 0, 0, ["$_init_4", $rt_wrapFunction2(jur_Lexer__init_), "$peek", $rt_wrapFunction0(jur_Lexer_peek), "$setMode", $rt_wrapFunction1(jur_Lexer_setMode), "$restoreFlags", $rt_wrapFunction1(jur_Lexer_restoreFlags), "$peekSpecial", $rt_wrapFunction0(jur_Lexer_peekSpecial), "$isSpecial", $rt_wrapFunction0(jur_Lexer_isSpecial), "$isNextSpecial", $rt_wrapFunction0(jur_Lexer_isNextSpecial), "$next0", $rt_wrapFunction0(jur_Lexer_next), "$nextSpecial", $rt_wrapFunction0(jur_Lexer_nextSpecial),
"$lookAhead", $rt_wrapFunction0(jur_Lexer_lookAhead), "$back", $rt_wrapFunction0(jur_Lexer_back), "$toString", $rt_wrapFunction0(jur_Lexer_toString), "$isEmpty", $rt_wrapFunction0(jur_Lexer_isEmpty), "$isLetter", $rt_wrapFunction0(jur_Lexer_isLetter0), "$isHighSurrogate0", $rt_wrapFunction0(jur_Lexer_isHighSurrogate0), "$isLowSurrogate0", $rt_wrapFunction0(jur_Lexer_isLowSurrogate0), "$getIndex", $rt_wrapFunction0(jur_Lexer_getIndex)],
ju_WeakHashMap, 0, ju_AbstractMap, [ju_Map], 1, 0, 0, ["$_init_0", $rt_wrapFunction0(ju_WeakHashMap__init_0), "$_init_3", $rt_wrapFunction1(ju_WeakHashMap__init_)],
jur_AbstractCharClass$LazySpecialsBlock, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$_init_0", $rt_wrapFunction0(jur_AbstractCharClass$LazySpecialsBlock__init_), "$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazySpecialsBlock_computeValue)],
jur_AbstractCharClass$LazyNonSpace, 0, jur_AbstractCharClass$LazySpace, [], 0, 0, 0, ["$_init_0", $rt_wrapFunction0(jur_AbstractCharClass$LazyNonSpace__init_), "$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyNonSpace_computeValue)],
otjt_Int32Array, 0, otjt_TypedArray, [], 1, 0, 0, 0,
otji_JSWrapper$Helper$_clinit_$lambda$_3_1, "JSWrapper$Helper$<clinit>$lambda$_3_1", 13, jl_Object, [otji_JSWrapper$Helper$FinalizationRegistryConsumer], 1, 0, 0, ["$_init_0", $rt_wrapFunction0(otji_JSWrapper$Helper$_clinit_$lambda$_3_1__init_), "$accept", $rt_wrapFunction1(otji_JSWrapper$Helper$_clinit_$lambda$_3_1_accept)],
otji_JSWrapper$Helper$_clinit_$lambda$_3_0, "JSWrapper$Helper$<clinit>$lambda$_3_0", 13, jl_Object, [otji_JSWrapper$Helper$FinalizationRegistryConsumer], 1, 0, 0, ["$_init_0", $rt_wrapFunction0(otji_JSWrapper$Helper$_clinit_$lambda$_3_0__init_), "$accept", $rt_wrapFunction1(otji_JSWrapper$Helper$_clinit_$lambda$_3_0_accept)],
ju_Collections, 0, jl_Object, [], 17, 0, () => ju_Collections_$callClinit(), 0]);
let $rt_booleanArrayCls = $rt_arraycls($rt_booleancls),
$rt_charArrayCls = $rt_arraycls($rt_charcls),
$rt_byteArrayCls = $rt_arraycls($rt_bytecls),
$rt_shortArrayCls = $rt_arraycls($rt_shortcls),
$rt_intArrayCls = $rt_arraycls($rt_intcls),
$rt_longArrayCls = $rt_arraycls($rt_longcls),
$rt_floatArrayCls = $rt_arraycls($rt_floatcls),
$rt_doubleArrayCls = $rt_arraycls($rt_doublecls);
$rt_stringPool(["Can\'t enter monitor from another thread synchronously", "String is null", "String is empty", "String contains invalid digits: ", "String contains digits out of radix ", ": ", "The value is too big for int type: ", "The value is too big for integer type", "Illegal radix: ", "ALPHA_8", "RGB_565", "ARGB_4444", "ARGB_8888", "", "glUseProgram(", "useProgram", "glGetAttribLocation(\"", "\")=", "glBindBuffer(target=", ",buf=", "glBufferData(target=", ",size=", ",hasView=", "!! glError=", " after ",
"glEnableVertexAttribArray(", "glVertexAttribPointer(client-side, idx=", ",stride=", ") -> temp VBO", "vertexAttribPointer(client-side)", "glVertexAttribPointer(idx=", ",off=", "vertexAttribPointer(offset)", "glDrawArrays(mode=", ",first=", ",count=", ",program=", ",vbo=", ",attribState=", "drawArrays", "main", "BIG_ENDIAN", "LITTLE_ENDIAN", "px ", "sans-serif", "bold ", "square", "butt", "round", "bevel", "miter", "right", "left", "center", "null", "false", "true", "New position ", " is outside of range [0;",
"Lower", "Upper", "ASCII", "Alpha", "Digit", "Alnum", "Punct", "Graph", "Print", "Blank", "Cntrl", "XDigit", "javaLowerCase", "javaUpperCase", "javaWhitespace", "javaMirrored", "javaDefined", "javaDigit", "javaIdentifierIgnorable", "javaISOControl", "javaJavaIdentifierPart", "javaJavaIdentifierStart", "javaLetter", "javaLetterOrDigit", "javaSpaceChar", "javaTitleCase", "javaUnicodeIdentifierPart", "javaUnicodeIdentifierStart", "Space", "w", "W", "s", "S", "d", "D", "BasicLatin", "Latin-1Supplement", "LatinExtended-A",
"LatinExtended-B", "IPAExtensions", "SpacingModifierLetters", "CombiningDiacriticalMarks", "Greek", "Cyrillic", "CyrillicSupplement", "Armenian", "Hebrew", "Arabic", "Syriac", "ArabicSupplement", "Thaana", "Devanagari", "Bengali", "Gurmukhi", "Gujarati", "Oriya", "Tamil", "Telugu", "Kannada", "Malayalam", "Sinhala", "Thai", "Lao", "Tibetan", "Myanmar", "Georgian", "HangulJamo", "Ethiopic", "EthiopicSupplement", "Cherokee", "UnifiedCanadianAboriginalSyllabics", "Ogham", "Runic", "Tagalog", "Hanunoo", "Buhid",
"Tagbanwa", "Khmer", "Mongolian", "Limbu", "TaiLe", "NewTaiLue", "KhmerSymbols", "Buginese", "PhoneticExtensions", "PhoneticExtensionsSupplement", "CombiningDiacriticalMarksSupplement", "LatinExtendedAdditional", "GreekExtended", "GeneralPunctuation", "SuperscriptsandSubscripts", "CurrencySymbols", "CombiningMarksforSymbols", "LetterlikeSymbols", "NumberForms", "Arrows", "MathematicalOperators", "MiscellaneousTechnical", "ControlPictures", "OpticalCharacterRecognition", "EnclosedAlphanumerics", "BoxDrawing",
"BlockElements", "GeometricShapes", "MiscellaneousSymbols", "Dingbats", "MiscellaneousMathematicalSymbols-A", "SupplementalArrows-A", "BraillePatterns", "SupplementalArrows-B", "MiscellaneousMathematicalSymbols-B", "SupplementalMathematicalOperators", "MiscellaneousSymbolsandArrows", "Glagolitic", "Coptic", "GeorgianSupplement", "Tifinagh", "EthiopicExtended", "SupplementalPunctuation", "CJKRadicalsSupplement", "KangxiRadicals", "IdeographicDescriptionCharacters", "CJKSymbolsandPunctuation", "Hiragana", "Katakana",
"Bopomofo", "HangulCompatibilityJamo", "Kanbun", "BopomofoExtended", "CJKStrokes", "KatakanaPhoneticExtensions", "EnclosedCJKLettersandMonths", "CJKCompatibility", "CJKUnifiedIdeographsExtensionA", "YijingHexagramSymbols", "CJKUnifiedIdeographs", "YiSyllables", "YiRadicals", "ModifierToneLetters", "SylotiNagri", "HangulSyllables", "HighSurrogates", "HighPrivateUseSurrogates", "LowSurrogates", "PrivateUseArea", "CJKCompatibilityIdeographs", "AlphabeticPresentationForms", "ArabicPresentationForms-A", "VariationSelectors",
"VerticalForms", "CombiningHalfMarks", "CJKCompatibilityForms", "SmallFormVariants", "ArabicPresentationForms-B", "HalfwidthandFullwidthForms", "all", "Specials", "Cn", "IsL", "Lu", "Ll", "Lt", "Lm", "Lo", "IsM", "Mn", "Me", "Mc", "N", "Nd", "Nl", "No", "IsZ", "Zs", "Zl", "Zp", "IsC", "Cc", "Cf", "Co", "Cs", "IsP", "Pd", "Ps", "Pe", "Pc", "Po", "IsS", "Sm", "Sc", "Sk", "So", "Pi", "Pf", "WINDING", "EVEN_ODD", "INVERSE_WINDING", "INVERSE_EVEN_ODD", "uniform mat4 uProjection;\nattribute vec2 aPosition;\nattribute vec2 aTextureCoordinate;\nattribute vec4 aColor;\nvarying vec4 v_color;\nvarying vec2 v_texCoords;\nvoid main() {\n  vec4 pos = vec4(aPosition, 0.0, 1.0);\n  gl_Position = uProjection * pos;\n  v_texCoords = aTextureCoordinate;\n  v_color = aColor;\n}\n",
"precision mediump float;\nvarying vec2 v_texCoords;\nvarying vec4 v_color;\nuniform sampler2D u_texture;\nvoid main() {\n  gl_FragColor = texture2D(u_texture, v_texCoords)  * v_color ;\n}\n", "aPosition", "aTextureCoordinate", "aColor", "uProjection", "u_texture", "    · ", "uniform mat4 uProjection;\nattribute vec2 aPosition;\nattribute vec4 aColor;\nvarying vec4 v_color;\nvoid main() {\n  vec4 pos = vec4(aPosition, 0.0, 1.0);\n  gl_Position = uProjection * pos;\n  v_color = aColor;\n}\n", "precision mediump float;\nvarying vec4 v_color;\nuniform sampler2D u_texture;\nvoid main() {\n  gl_FragColor = v_color ;\n}\n",
"0", "\n", "[L", "[]", "source-over", "destination-over", "source-in", "destination-in", "source-out", "destination-out", "source-atop", "destination-atop", "xor", "lighter", "copy", "rgb(", "rgba(", "[probe] 游戏类展开中止（预期内）: ", "bootstrap done", "1 createBitmap", "2 new Canvas", "3 new Paint", "4 drawColor", "5 drawRect", "6 drawCircle", "7 drawOval", "8 drawPath", "9 drawText", "Rusted Warfare", "10 getPixel", "canvas smoke: ", " px=", "37 FAILED rwRealMap: ", "[step] ", "11 new m.h adapter", "12 adapter.drawColor",
"13 adapter.drawLine", "14 adapter.drawOval", "15 adapter.drawText", "via m/h adapter", "16 adapter done", "17 build sprite bitmap", "18 wrap into m.e", "19 draw via m/h", "m/e -> drawBitmap x5", "20 image smoke done", "21 load real tank.png", "21 SKIP: tankCanvas 未就绪", "21 SKIP: null canvas", "22 real bitmap ", "assets/units/tanks/tank.png 48x30", "23 real asset drawn", "24 create webgl canvas", "24 SKIP: webgl 不可用", "25 compile shaders", "attribute vec2 aPos;\nattribute vec3 aColor;\nvarying vec3 vColor;\nvoid main() {\n  vColor = aColor;\n  gl_Position = vec4(aPos, 0.0, 1.0);\n}\n",
"25 VS 编译失败: ", "precision mediump float;\nvarying vec3 vColor;\nvoid main() {\n  gl_FragColor = vec4(vColor, 1.0);\n}\n", "25 FS 编译失败: ", "26 link program", "26 link 失败: ", "27 attribs + buffer（走 GLES20 的 FloatBuffer 上传）", "aPos", "27 aPos=", " aColor=", "28 draw", "29 webgl done, err=", " centerPixel=(", "rw.gl.trace", "30 new b.h (render manager)", "30 FAILED b.h: ", "31 new b.t (renderer)", "31 FAILED b.t: ", "32 renderer.b() -> glClearColor + glClear", "33 renderer clear ok, glError=", "32 FAILED renderer.b(): ",
"34 renderer.a(float[],...) -> glDrawArrays", "35 drawArrays ok, glError=", "36 pixel=(", "34 FAILED renderer.a(): ", "37 real map: ", "38 tiles decoded: ", " images, ", " tilesets", "39.", " layer drawn: ", "39 tiles drawn: ", " in ", "ms", "40 map ready", "37 SKIP: 地图未加载", "BUTT", "ROUND", "SQUARE", ", ", "RustedWarfare", "Patter is null", "\\Q", "\\E", "\\\\E\\Q", "FILL", "STROKE", "FILL_AND_STROKE", "Capacity is negative: ", "/", "GameThread", "LEFT", "CENTER", "RIGHT", "MITER", "BEVEL", "uMatrix", "uColor",
"uTextureMatrix", "v_texCoords", "uniform mat4 uMatrix;\nuniform mat4 uProjection;\nattribute vec2 aPosition;\nvoid main() {\n  vec4 pos = vec4(aPosition, 0.0, 1.0);\n  gl_Position = uProjection * uMatrix * pos;\n}\n", "precision mediump float;\nuniform vec4 uColor;\nvoid main() {\n  gl_FragColor = uColor;\n}\n", "precision mediump float;\nvarying vec2 vTextureCoord;\nuniform lowp vec4 uColor;\nuniform sampler2D u_texture;\nvoid main() {\n  gl_FragColor = texture2D(u_texture, vTextureCoord) * uColor;\n}\n",
"uniform mat4 uMatrix;\nuniform mat4 uProjection;\nattribute vec2 aPosition;\nattribute vec2 v_texCoords;\nvarying vec2 vTextureCoord;\nvoid main() {\n  vec4 pos = vec4(aPosition, 0.0, 1.0);\n  gl_Position = uMatrix * pos;\n  vTextureCoord = v_texCoords;\n}\n", "Cannot create GL program: ", "======= ERROR =========", "Could not link program: ", "Cannot link GL program: ", "Shader Compilation Failed: shaderCode==null", "Shader Compilation Failed: ", "version", "Changing: ", " to ", "draw shape filter is null.",
"GL error: ", "clearGlError: Failed to clear", "loadHandle: Failed to find: ", "CLEAR", "SRC", "DST", "SRC_OVER", "DST_OVER", "SRC_IN", "DST_IN", "SRC_OUT", "DST_OUT", "SRC_ATOP", "DST_ATOP", "XOR", "DARKEN", "LIGHTEN", "MULTIPLY", "SCREEN", "ADD", "OVERLAY", "attribute vec2 aPosition;\nuniform mat4 uMatrix;\nuniform mat4 uProjection;\nvoid main() {\n  gl_Position = uProjection * uMatrix * vec4(aPosition, 0.0, 1.0);\n}\n", "#ifdef GL_ES\nprecision mediump float;\n#endif\nuniform vec4 uColor;\nvoid main() {\n  gl_FragColor = uColor;\n}\n",
"object", "function", "string", "number", "undefined", "Either src or dest is null", "java.version", "21", "os.name", "TeaVM", "file.separator", "\\", "path.separator", ":", ";", "line.separator", "java.io.tmpdir", "java.vm.version", "user.home", "/tmp", "Name capturing group should start with letter", "Is", "In"]);
jl_String.prototype.toString = function() {
    return $rt_ustr(this);
};
jl_String.prototype.valueOf = jl_String.prototype.toString;
jl_Object.prototype.toString = function() {
    return $rt_ustr(jl_Object_toString(this));
};
jl_Object.prototype.__teavm_class__ = function() {
    return $dbg_class(this);
};
let $rt_export_main = $rt_mainStarter(r_Bootstrap_main);
$rt_export_main.javaException = $rt_javaException;
let $rt_jso_marker = Symbol('jsoClass');
(() => {
    let c;
    c = otji_JSWrapper$Helper$_clinit_$lambda$_3_1.prototype;
    c.accept = $rt_callWithReceiver(otji_JSWrapper$Helper$_clinit_$lambda$_3_1_accept$exported$0);
    c = otji_JSWrapper$Helper$_clinit_$lambda$_3_0.prototype;
    c.accept = $rt_callWithReceiver(otji_JSWrapper$Helper$_clinit_$lambda$_3_0_accept$exported$0);
})();
$rt_exports.main = $rt_export_main;
}));
