// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"utils/dom/setStyle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _default(dom, styles) {
  if (_typeof(styles) == 'object') {
    for (var key in styles) {
      if (styles[key]) {
        dom.style[key] = styles[key];
      }
    }
  }
}
},{}],"utils/dom/setAttr.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = setAttr;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function setAttr(dom, attrs) {
  if (_typeof(attrs) == 'object') {
    for (var key in attrs) {
      if (attrs[key]) {
        dom.setAttribute(key, attrs[key]);
      }
    }
  }
}
},{}],"utils/dom/onListener.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = onListener;

var _setStyle = _interopRequireDefault(require("./setStyle"));

var _setAttr = _interopRequireDefault(require("./setAttr"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function onListener(dom, onBar, params) {
  if (_typeof(onBar) == 'object') {
    var _loop = function _loop(key) {
      if (onBar[key]) {
        if (key == 'hover') {
          dom.onmousemove = function (event) {
            params.on[key](event, dom);
          };

          dom.onmouseleave = function (event) {
            (0, _setStyle.default)(dom, params.style);
            (0, _setAttr.default)(dom, params.attr);
          };
        } else {
          dom["on" + key] = function (event, value, a) {
            params.on[key](event, dom);
          };
        }
      }
    };

    for (var key in onBar) {
      _loop(key);
    }
  }
}
},{"./setStyle":"utils/dom/setStyle.js","./setAttr":"utils/dom/setAttr.js"}],"utils/dom/creatDom.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = creatDom;

var _setStyle = _interopRequireDefault(require("./setStyle"));

var _setAttr = _interopRequireDefault(require("./setAttr"));

var _onListener = _interopRequireDefault(require("./onListener"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function creatDom(params) {
  var dom = document.createElement(params.tag || 'div'); // dom.style = Object.assign({},dom.style,params.style||{});

  dom.innerHTML = params.child || '';
  (0, _setStyle.default)(dom, params.style);
  (0, _setAttr.default)(dom, params.attr);

  if (params.data) {
    for (var key in params.data) {
      dom.dataset[key] = params.data[key];
    }
  } // console.log()
  // if(dom.name == 'text'){
  //     Object.defineProperty(dom,'_value',{
  //         configurable: true,
  //         set: function(value) {
  //             // this.value = value;
  //            console.log("-------||")
  //         },
  //         get: function() {
  //             return this.value;
  //         }
  //     })
  // }


  _onListener.default.call(this, dom, params.on, params);

  return dom;
}
},{"./setStyle":"utils/dom/setStyle.js","./setAttr":"utils/dom/setAttr.js","./onListener":"utils/dom/onListener.js"}],"utils/dom/delUnit.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = function _default(str, unit) {
  if (str) {
    return str.replace(unit, '');
  }

  return str;
};

exports.default = _default;
},{}],"utils/colorHex.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = function _default(value) {
  var that = value; //十六进制颜色值的正则表达式

  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/; // 如果是rgb颜色表示

  if (/^(rgb|RGB)/.test(that)) {
    var aColor = that.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
    var strHex = "#";

    for (var i = 0; i < aColor.length; i++) {
      var hex = Number(aColor[i]).toString(16);

      if (hex.length < 2) {
        hex = '0' + hex;
      }

      strHex += hex;
    }

    if (strHex.length !== 7) {
      strHex = that;
    }

    return strHex;
  } else if (reg.test(that)) {
    var aNum = that.replace(/#/, "").split("");

    if (aNum.length === 6) {
      return that;
    } else if (aNum.length === 3) {
      var numHex = "#";

      for (var i = 0; i < aNum.length; i += 1) {
        numHex += aNum[i] + aNum[i];
      }

      return numHex;
    }
  }

  return that;
};

exports.default = _default;
},{}],"utils/hsvToRgb.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = hsvToRgb;

function hsvToRgb(params) {
  var h = params.h,
      s = params.s,
      v = params.v;
  s = s / 100;
  v = v / 100;
  var h1 = Math.floor(h / 60) % 6;
  var f = h / 60 - h1;
  var p = v * (1 - s);
  var q = v * (1 - f * s);
  var t = v * (1 - (1 - f) * s);
  var r, g, b;

  switch (h1) {
    case 0:
      r = v;
      g = t;
      b = p;
      break;

    case 1:
      r = q;
      g = v;
      b = p;
      break;

    case 2:
      r = p;
      g = v;
      b = t;
      break;

    case 3:
      r = p;
      g = q;
      b = v;
      break;

    case 4:
      r = t;
      g = p;
      b = v;
      break;

    case 5:
      r = v;
      g = p;
      b = q;
      break;
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  };
}
},{}],"utils/getFileDetail.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = function _default(e, callback) {
  var file = e.target.files[0];
  var imageType = /image.*/;

  if (file.type.match(imageType)) {
    var reader = new FileReader();

    reader.onload = function () {
      // const { fileUpload } = dreawData.getParams();
      callback && callback(file, reader.result); // fileUpload(file, reader.result)
    };

    reader.readAsDataURL(file);
  } else {
    alert(opts.errorMessage);
  }
};

exports.default = _default;
},{}],"utils/pubsub.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var pubsub =
/*#__PURE__*/
function () {
  function pubsub() {
    _classCallCheck(this, pubsub);

    this.topics = {};
    this.token = 0;
  } // 发布


  _createClass(pubsub, [{
    key: "pub",
    value: function pub(name, args) {
      if (!this.topics[name]) {
        return false;
      }

      var subscribers = this.topics[name];
      var len = subscribers ? subscribers.length : 0;

      while (len--) {
        subscribers[len].fn(name, args);
      }

      return this;
    } // 订阅

  }, {
    key: "sub",
    value: function sub(name, fn) {
      if (!this.topics[name]) {
        this.topics[name] = [];
      }

      this.token++;
      this.topics[name].push({
        token: this.token,
        fn: fn
      });
      return this.token;
    }
  }, {
    key: "unSub",
    value: function unSub(token) {
      for (var key in this.topics) {
        var topArr = this.topics[key];

        if (topArr) {
          for (var i = 0; i < topArr.length; i++) {
            if (topArr[i].token == token) {
              topArr.splice(i, 1);
              return token;
            }
          }
        }
      }

      return this;
    }
  }]);

  return pubsub;
}();

exports.default = pubsub;
},{}],"utils/rgbToCmyk.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = function _default(params) {
  var r = params.r,
      g = params.g,
      b = params.b;
  var saturation = 255;

  for (var key in params) {
    if (!params[key]) {
      throw new Error("".concat(key, "\u662F\u5FC5\u586B\u9879"));
    }
  }

  var c = 1 - r / 255;
  var m = 1 - g / 255;
  var y = 1 - b / 255;
  var k = Math.min(y, Math.min(m, Math.min(c, 1)));
  c = Math.round((c - k) / (1 - k) * 100);
  m = Math.round((m - k) / (1 - k) * 100);
  y = Math.round((y - k) / (1 - k) * 100);
  k = Math.round(k * 100);
  return {
    c: c,
    m: m,
    y: y,
    k: k
  };
};

exports.default = _default;
},{}],"utils/cmykToRgb.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = function _default(params) {
  var c = params.c,
      m = params.m,
      y = params.y,
      k = params.k;

  for (var key in params) {
    if (!params[key]) {
      throw new Error("".concat(key, "\u662F\u5FC5\u586B\u9879"));
    }
  }

  return {
    r: 255 * (100 - c) * (100 - k) / 10000,
    g: 255 * (100 - m) * (100 - k) / 10000,
    b: 255 * (100 - y) * (100 - k) / 10000
  };
};

exports.default = _default;
},{}],"utils/colorToRgb.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = function _default(sColor) {
  sColor = sColor.toLowerCase(); //十六进制颜色值的正则表达式

  var hexReg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  var rgbReg = /^(rgb|RGB)/;

  if (!sColor) {
    return;
  } // 如果是16进制颜色


  if (hexReg.test(sColor)) {
    if (sColor.length === 4) {
      var sColorNew = "#";

      for (var i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }

      sColor = sColorNew;
    } //处理六位的颜色值


    var sColorChange = [];

    for (var _i = 1; _i < 7; _i += 2) {
      sColorChange.push(parseInt("0x" + sColor.slice(_i, _i + 2)));
    }

    return "RGB(" + sColorChange.join(",") + ")";
  }

  return sColor;
};

exports.default = _default;
},{}],"utils/rgbToHsv.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = function _default(params) {
  var r = params.r,
      g = params.g,
      b = params.b;
  r = r / 255;
  g = g / 255;
  b = b / 255;
  var h, s, v;
  var min = Math.min(r, g, b);
  var max = v = Math.max(r, g, b);
  var l = (min + max) / 2;
  var difference = max - min;

  if (max == min) {
    h = 0;
  } else {
    switch (max) {
      case r:
        h = (g - b) / difference + (g < b ? 6 : 0);
        break;

      case g:
        h = 2.0 + (b - r) / difference;
        break;

      case b:
        h = 4.0 + (r - g) / difference;
        break;
    }

    h = Math.round(h * 60);
  }

  if (max == 0) {
    s = 0;
  } else {
    s = 1 - min / max;
  }

  s = Math.round(s * 100);
  v = Math.round(v * 100);
  return {
    s: s,
    h: h,
    v: v
  };
};

exports.default = _default;
},{}],"utils/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "setStyle", {
  enumerable: true,
  get: function () {
    return _setStyle.default;
  }
});
Object.defineProperty(exports, "creatDom", {
  enumerable: true,
  get: function () {
    return _creatDom.default;
  }
});
Object.defineProperty(exports, "delUnit", {
  enumerable: true,
  get: function () {
    return _delUnit.default;
  }
});
Object.defineProperty(exports, "colorHex", {
  enumerable: true,
  get: function () {
    return _colorHex.default;
  }
});
Object.defineProperty(exports, "hsvToRgb", {
  enumerable: true,
  get: function () {
    return _hsvToRgb.default;
  }
});
Object.defineProperty(exports, "getFileDetail", {
  enumerable: true,
  get: function () {
    return _getFileDetail.default;
  }
});
Object.defineProperty(exports, "pubsub", {
  enumerable: true,
  get: function () {
    return _pubsub.default;
  }
});
Object.defineProperty(exports, "rgbToCmyk", {
  enumerable: true,
  get: function () {
    return _rgbToCmyk.default;
  }
});
Object.defineProperty(exports, "cmykToRgb", {
  enumerable: true,
  get: function () {
    return _cmykToRgb.default;
  }
});
Object.defineProperty(exports, "colorToRgb", {
  enumerable: true,
  get: function () {
    return _colorToRgb.default;
  }
});
Object.defineProperty(exports, "rgbToHsv", {
  enumerable: true,
  get: function () {
    return _rgbToHsv.default;
  }
});

var _setStyle = _interopRequireDefault(require("./dom/setStyle"));

var _creatDom = _interopRequireDefault(require("./dom/creatDom"));

var _delUnit = _interopRequireDefault(require("./dom/delUnit"));

var _colorHex = _interopRequireDefault(require("./colorHex"));

var _hsvToRgb = _interopRequireDefault(require("./hsvToRgb"));

var _getFileDetail = _interopRequireDefault(require("./getFileDetail"));

var _pubsub = _interopRequireDefault(require("./pubsub"));

var _rgbToCmyk = _interopRequireDefault(require("./rgbToCmyk"));

var _cmykToRgb = _interopRequireDefault(require("./cmykToRgb"));

var _colorToRgb = _interopRequireDefault(require("./colorToRgb"));

var _rgbToHsv = _interopRequireDefault(require("./rgbToHsv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./dom/setStyle":"utils/dom/setStyle.js","./dom/creatDom":"utils/dom/creatDom.js","./dom/delUnit":"utils/dom/delUnit.js","./colorHex":"utils/colorHex.js","./hsvToRgb":"utils/hsvToRgb.js","./getFileDetail":"utils/getFileDetail.js","./pubsub":"utils/pubsub.js","./rgbToCmyk":"utils/rgbToCmyk.js","./cmykToRgb":"utils/cmykToRgb.js","./colorToRgb":"utils/colorToRgb.js","./rgbToHsv":"utils/rgbToHsv.js"}],"plugin/draw-editer/drop/icon.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  vertical: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAAXNSR0IArs4c6QAAAXRQTFRFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA9vb23t7e39/f8/Pz7+/v7Ozs8/Pz6Ojo8PDw6enp7Ozs4eHh4uLi1dXV1tbW8fHx9fX19fX17u7u8vLy6+vr7+/vxcXFyMjI6Ojo7OzsxsbG4uLi5ubm6enp4+Pj5ubmvLy80tLS09PTtLS0urq6u7u7xMTErKystLS0xcXFqKios7Oztra2u7u7tLS0t7e3vLy8paWltbW1pqamtbW1uLi4/v7+/f39/v7+/f39/v7+/////f39/v7+/////v7+AAAAAQEBBwcHCAgICQkJCgoKCwsLkJCQkZGRkpKSk5OTlJSUlZWVlpaWl5eXmJiYmZmZm5ubwMDAwcHBwsLCw8PD/Pz8////bUJzpwAAAGR0Uk5TAAECAwQFBgcICQoLDA0ODxARExQVFhcYGRobHB0eHyEiJCUoOD4/QEFCQkNDRERFRklKS0tMTU1OTk9PT09QUFBQUVFUVVdYWVpaXFxcXl5eXl9fX2BgYWFh9fb29/f3+Pj4+RPQ1HsAAAIkSURBVEjH3ZVpV9NAFIbJJJMOk5SkpEkBU0DBfa+7iLigqCjuuFIzkSguCAoq9P55J2liW80yfPIc75fk5DzPyZy5897p6/tHJfHaIb4TRZKQfPqMjEQNjuOzvn8Bc0WQV8/7AP60KmSE/BUfVj+Bf13ESPjlZTGjw4sZ3byI0csXG3/yRcbffL4hSbJ6yYfWz7Dec/gHf261wL+qyqk9l5AS9qtdH7mQvPvTCkoX8N7G1Ozc/MJTFgvPFubnZqca+3DaseIrwtSoDtfHdk+8ioWJPWP14apBsZwqIEx0c9AecscTYdwdsgdNnaT+IdokQvWBir0rEVy7MqBToqaf9DAFClaJZtZexkLN1IiKlYxk8IQhXkqpbCeCXS4p4bes8EWxRFizXsOHSKjqKirMao+gYVQYoP9FaAoKybZWm7AisK1Su3Nh4xIhv3Ecn9x/4ODh4ycvvo2Fy40TR48dOTSZcTSQfO53gFa6AvTmVGpGo+N9jUd0e4vXOy6Ez+0WsBmSE6CbDD53D4FVYDcyAhRGlJr2PQZfOvwasDu2SXFGphVStkaeMFiL8WAd2MMRq0wyhgAfM9R06i8YrAcR/w28x3XHzFhRO6NapTb6nMFXbgQb4C2O1ipa/uiLDA82gmATvEf5fMdY9GDzuwDfY8DS/WK+YzxoLt0V4RPDcW/fch0Rvm1Qw3Icy6Di12i/bhh6vyp+UeMSISXRiz0emlkD8hfSgcq4TGZ29wAAAABJRU5ErkJggg==',
  level: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAAXNSR0IArs4c6QAAAWtQTFRFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA9vb27+/v8PDwzs7O6Ojo6enp3t7e39/f1dXV5+fn1tbW4ODg5+fn+Pj4z8/P+Pj40NDQ5OTk8vLy5eXlx8fH5eXl6Ojo6+vryMjI6OjowsLC5ubmw8PD4+Pjy8vLvLy809PTtLS01NTU0dHRu7u7rKysxcXFtra2xsbGtLS0vLy8paWltbW1wsLCpqamtbW1uLi4wMDAvLy8urq6/////v7+/////v7+/v7+/////f39/v7+/////v7+AAAAAQEBBwcHCAgICgoKCwsLkJCQkZGRkpKSk5OTlJSUlZWVlpaWl5eXmJiYmZmZm5ubwMDAwcHBwsLCw8PD/Pz8////EaSl3gAAAGJ0Uk5TAAECAwQFBgcICQoLDA0ODxARFBUWFxgZGxwdHh8gIiQoKSorOEFCQ0NERkdJSUpKSkpLS0xMTE1OTk5OT09QUFFSU1RWWFhZWlxcXl5fX2BgYGFhYWFjZPT19fb39/j4+PnG87QpAAACIElEQVRIx+2UaVfTQBSGyTKTkKRNWhPQUkAWxX1FXEBBERX33WprkwbXuivF+/O9M502zQbH40d5v2XyPGcyd27u0NBu/stImO2eM/BBJPmc5mX57Kw8KMizp2U5z5BkRV0IDih9AHnlYLCg4koOTxYDOET773GFHoZgkWQa7O2l1wBHdDUSVP0oQHCZZhiMv+jDbzhmkEggxglcCpbThuA/bsEZi0YCteZhs51hMP68D5/CDlwo4jeJqHpxCTbDtCH4zyEKV0qmRkQ0s7SCQspg/DkfvoRMaDXq9VeYWq32EuMzIWFwvgHfNriQChNihiQp9FQDvjM+fPOO5/1A3oaRwa8Ui3e8AT84v03a7AbZFriBdrIOP3cSPkDrqsa2kCRVt6/Vd9oC+Zu2rvYE75Y4RMahfwn+kdcTFM0qV+404etGbpWQf14pF/gnsUMP2171XpNdRAcezExP7ReZmp55zATkX1Q9Z7jbZaysRmmk+rDJW2N9cmK8KjI+MbmOAudHSqYoK784kxk+tLdgrTLq7hFxRytr0In4watmxhPW3quuU7BMHqvguKu4lOQj46kPsILNR7u9R3nz4XmTfN8Yu+/DUrK9W8/GUnzP8Pbe9ucTP1Dr7j4vzQvDKbvX5+K/6NwNt+yYeT+1UXBsKz4ELNspGjRvbBDdMPR49dgKyR9MKtYmPsgIJXmDrDsqFTk+KuML/zqM/37c7yYnfwAObMapoePDiwAAAABJRU5ErkJggg==',
  tilt: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAAXNSR0IArs4c6QAAAOpQTFRFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8PDwAAAAAAAA4uLiAAAA3Nzc3d3dxMTExcXFp6enra2tlZWVjIyMjo6OfHx86Ojo6Ojo0dHRyMjIx8fHwcHB/v7+/f39+vr6/f39/Pz8/Pz8+fn5/Pz8+vr6+vr6/f39////7e3t/v7+7Ozs/v7+////////6Ojo6enpAAAAAwMDBAQEBQUFBgYGBwcHDQ0NKysrLCwsMDAwYGBgYWFhYmJiampqa2trbGxsRsyhyQAAAD50Uk5TAAECAwQFBggKCw0ODxESFxgZGhwhISIjIyQkJissMTI6PD1GWVpjb3F03t/i4+Tl5+nq7PP4+vr7+/v8/f0FqgrYAAAA4ElEQVQoz73Ry0LCMBAF0M6kpQ0pioDyVgEFAVHepQViQEF5/f/vGKIUChtW3O3Z3LmjaZcJABIVBAiC0fNUaqkgIB1+CiHWbw8mBoTYww/Ol+1CJITaKXwPypTACfzMpDzpW4BDWHVGUvpSAG/9bhKapeq/kGzN8IG9FmPxFyXPuYZn7SqgdR+h4WhlK4PWxmPEP9AMEZ1eK1kK1yb7SeQYOo1WxnPOJ3v4awh6+LGz4HzqHIBCkn/fiMn06xgwU3dd13GcLgsAoHkVv0um04kbikfjW8yWYdSA8951bn4B+/Ud1D7TL4MAAAAASUVORK5CYII=',
  reverseTilt: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAAXNSR0IArs4c6QAAAOdQTFRFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8PDwAAAAAAAA4uLiAAAA3Nzc3d3dxMTExcXFp6enra2tlZWVjo6OfHx86Ojo6Ojo0dHRyMjIx8fHwcHB/v7+/f39+vr6/f39+/v7/Pz8+fn5/Pz8+vr6+vr6/f39////7Ozs7e3t/v7+7Ozs/v7+////////6Ojo6enpAAAAAwMDBAQEBQUFBgYGBwcHDQ0NKysrLCwsMDAwYGBgYWFhYmJiampqa2trbGxsSXP2QwAAAD10Uk5TAAECAwQFBggKCw0ODxESFxgZGhwhIiMjJCQmKywxMjo9RllaY29xdN7f4uPk5efp6+z0+Pr6+vv7+/z9/fVNPNwAAADnSURBVCjPvZHZWsIwFIQ5OSltSFEWQVZZy6agbKUFSlBxAXz/5zEFKoQrvGEu5/8y32ROKHRNARDciQCo4L7l7jTUFABEf3jaCiHepowoL0g4Wn5Ze95iaqIahaw++TwDfijQqvRXXycA4E42odWx9Gf9zQnQWjk8+M1K7wiI4T7mayPfbyQT5Q4PAHJ3++znz6xYhEWLRlAXTUespT+3bhnFsP73QQmWnvcxt2KMymGOk+zBd78UoXDoHgD7/XUpfroFVOdDPrBt23GcdvZsJRZPZTLpVPJGJ+qwGuOmFDc0uOxE/9MvTK0dPSS3AqMAAAAASUVORK5CYII=',
  angle: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTYwODQ5OTkzNTAyIiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE5ODQiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMzIiIGhlaWdodD0iMzIiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTUxMS44NzIgODU5LjQ3NzMzM2MtMTg2LjExMiAwLTMzOC4zNDY2NjctMTU1LjY5MDY2Ny0zMzguMzQ2NjY3LTM0NS45ODQgMC0xNi4xMjggMTIuMzczMzMzLTI4Ljg0MjY2NyAyOC4xNi0yOC44NDI2NjYgMTUuNzg2NjY3IDAgMjguMjAyNjY3IDEyLjcxNDY2NyAyOC4yMDI2NjcgMjguODQyNjY2IDAgMTU5LjE0NjY2NyAxMjYuMzM2IDI4OC4zNDEzMzMgMjgyLjAyNjY2NyAyODguMzQxMzM0YTI3OC45MTIgMjc4LjkxMiAwIDAgMCAyMDYuMzc4NjY2LTkyLjI4OCAyNi44OCAyNi44OCAwIDAgMSAzOS40NjY2NjctMS4xNTJjMTEuMjY0IDExLjUyIDEyLjM3MzMzMyAyOC44NDI2NjcgMS4xMDkzMzMgNDAuMzYyNjY2YTMzMi45NzA2NjcgMzMyLjk3MDY2NyAwIDAgMS0yNDYuOTk3MzMzIDExMC43MnogbTMxMC4xODY2NjctMzE3LjE0MTMzM2EyOC4yNDUzMzMgMjguMjQ1MzMzIDAgMCAxLTI4LjIwMjY2Ny0yOC44NDI2NjdjMC0xNTkuMTQ2NjY3LTEyNi4yOTMzMzMtMjg4LjM0MTMzMy0yODEuOTg0LTI4OC4zNDEzMzNhMjc2LjA1MzMzMyAyNzYuMDUzMzMzIDAgMCAwLTIwNC4xNiA4OS45ODQgMjcuODE4NjY3IDI3LjgxODY2NyAwIDAgMS0zOS40NjY2NjcgMS4xNTIgMjkuMzk3MzMzIDI5LjM5NzMzMyAwIDAgMS0xLjEwOTMzMy00MC4zNjI2NjcgMzMxLjQzNDY2NyAzMzEuNDM0NjY3IDAgMCAxIDI0NS44ODgtMTA3LjI2NGMxODYuMDY5MzMzIDAgMzM4LjM0NjY2NyAxNTUuNjkwNjY3IDMzOC4zNDY2NjcgMzQ2LjAyNjY2N2EyOS43ODEzMzMgMjkuNzgxMzMzIDAgMCAxLTI5LjMxMiAyNy42NDh6IiBmaWxsPSIjNDI0QjU0IiBwLWlkPSIxOTg1Ij48L3BhdGg+PHBhdGggZD0iTTEwNi45NjUzMzMgNTEzLjQ5MzMzM2w5NC43Mi0xMjkuMTUyIDk0Ljc2MjY2NyAxMjkuMTUyaC0xODkuNDR6IG04MDkuODEzMzM0IDBsLTk0LjcyIDEyOS4xOTQ2NjctOTQuNzItMTI5LjE5NDY2N2gxODkuNDR6IiBmaWxsPSIjNDI0QjU0IiBwLWlkPSIxOTg2Ij48L3BhdGg+PC9zdmc+',
  angleCursor: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABpklEQVR4AWIYWmAUjAIAY+SAW0EARdH8X9u24rqrKDcxG6htLGXidAm1bdu2+U7y7Z+czOu79747mWp0aO2gAVd9to67fXx8dL69vXXZQrSO1dXVGGB24OvklmUJzd5/8lNVdcSU6enpcfY3NzcV4vECZnZoln723OKmaQGNATrRQFpa2pm81dn29naj/B1KEJhl14SGxzTDj1vctCwIsiwoKipae319PXt5eRm/vLysPz8/LwNmdmh4bBQE2SoI1heEh4c/yPOX2c3N7VtRlLn+/v6xg4ODOWBmh4YHLxmTgmB7BXyWc3mzczm0npWVdUjIEXjwkiHrqCAIEePCwkLX0tJSz9fX1/XW1tZSW1vbdEFBwX50dPQtMLNDw4OXDFn7n0hXsLa21iJzvBCXk5OTMT09XXFxcdEr/9BNOXYDzOzQ8OAlI9lWRwX+R0dHtfKMFAIFP50xXIgREoVkYGaHhgcvGbJyo45blgVawUsn+AoeOoO7bs8OLRBMfGh48JLR+/7HjpIPYFkfphhHscCMhjGLD4SjmLAWF3BMPkCYMWjAKAAAxlBp/QKMhJEAAAAASUVORK5CYII='
};
exports.default = _default;
},{}],"plugin/draw-editer/draw-data/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = require("../../../utils");

var arr = [];
var activeDom = null;
var activeData = {};
var params = {};
var detailDom = null;
var imgDom = null;
var drawEdit = null;
var imgDetail = {};
var imgDetailDom = null;
var model = null;
var _default = {
  pubsub: null,
  id: 0,
  setModel: function setModel(params) {
    model = params;
    return model;
  },
  getModel: function getModel() {
    return model;
  },
  setImgDetailDom: function setImgDetailDom(dom) {
    imgDetailDom = dom;
    return imgDetailDom;
  },
  getImgDetailDom: function getImgDetailDom() {
    return imgDetailDom;
  },
  setDrawEdit: function setDrawEdit(draw) {
    drawEdit = draw;
    return drawEdit;
  },
  getDrawEdit: function getDrawEdit() {
    return drawEdit;
  },
  add: function add(item) {
    return arr.push(item);
  },
  getActiveData: function getActiveData() {
    var type = activeDom.dataset.elemtype;
    var detail = activeDom.getBoundingClientRect();
    var _activeDom$style = activeDom.style,
        left = _activeDom$style.left,
        top = _activeDom$style.top,
        height = _activeDom$style.height,
        width = _activeDom$style.width,
        fontSize = _activeDom$style.fontSize,
        lineHeight = _activeDom$style.lineHeight,
        color = _activeDom$style.color,
        textAlign = _activeDom$style.textAlign,
        fontWeight = _activeDom$style.fontWeight,
        fontStyle = _activeDom$style.fontStyle,
        textDecoration = _activeDom$style.textDecoration;

    if (type == 'text') {
      activeData = {
        text: activeDom.innerText,
        left: (0, _utils.delUnit)(left, params.unit),
        top: (0, _utils.delUnit)(top, params.unit),
        width: (0, _utils.delUnit)(width, params.unit),
        height: (0, _utils.delUnit)(height, params.unit),
        fontSize: (0, _utils.delUnit)(fontSize, params.unit),
        lineHeight: (0, _utils.delUnit)(lineHeight, params.unit),
        color: (0, _utils.colorToRgb)(color),
        textAlign: textAlign || 'left',
        fontWeight: fontWeight || 'normal',
        fontStyle: fontStyle || 'normal',
        textDecoration: textDecoration || 'none' // console.log(activeData,"kkkkk")

      };
      return Object.assign({}, activeData);
    }
  },
  editorData: function editorData(id, item) {
    for (var i = 0; i < arr.lengthl; i++) {
      if (id == arr[i]) {
        arr[i] = item;
        return arr;
      }
    }

    return arr;
  },
  setActive: function setActive(dom) {
    activeDom = dom;

    if (activeDom) {
      this.getActiveData();
    }
  },
  getActive: function getActive() {
    return activeDom;
  },
  setParams: function setParams(values) {
    params = Object.assign({}, values);
  },
  getParams: function getParams() {
    return Object.assign({}, params);
  },
  setDetail: function setDetail(dom) {
    detailDom = dom;
    return detailDom;
  },
  getDetail: function getDetail() {
    return detailDom;
  },
  setImg: function setImg(dom) {
    imgDom = dom;
    return imgDom;
  },
  getImg: function getImg() {
    return imgDom;
  },
  setForm: function setForm() {
    var formArr = this.getActiveData();

    for (var key in formArr) {
      var itemName = detailDom.elements[key];

      if (!itemName) {
        continue;
      }

      if ('color,textAlign,fontStyle,fontWeight,textDecoration'.indexOf(key) != -1) {
        itemName.value = formArr[key];
        itemName.click();
      } else {
        itemName.value = formArr[key];
      }
    }
  },
  getImgDetail: function getImgDetail() {
    var elemtype = activeDom.dataset.elemtype;
    var _activeDom$style2 = activeDom.style,
        transform = _activeDom$style2.transform,
        width = _activeDom$style2.width,
        height = _activeDom$style2.height,
        top = _activeDom$style2.top,
        left = _activeDom$style2.left;
    var activeImg = activeDom.getElementsByTagName('img')[0];

    if (elemtype == 'img') {
      imgDetail.angle = transform.replace('rotate(', '').replace('deg)', '');
      imgDetail.width = (0, _utils.delUnit)(width, params.unit);
      imgDetail.height = (0, _utils.delUnit)(height, params.unit);
      imgDetail.top = (0, _utils.delUnit)(top, params.unit);
      imgDetail.left = (0, _utils.delUnit)(left, params.unit);
      imgDetail.src = activeImg.src;
    }

    return imgDetail;
  }
};
exports.default = _default;
},{"../../../utils":"utils/index.js"}],"plugin/draw-editer/drop/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = require("../../../utils");

var _icon = _interopRequireDefault(require("./icon"));

var _drawData = _interopRequireDefault(require("../draw-data"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var drop =
/*#__PURE__*/
function () {
  function drop() {
    _classCallCheck(this, drop);

    this.canvas = null; // this.elemClick = null;

    this.unit = null;
    this.canvasDetail = null;
    this.activeDom = null;
    this.type == 'text';
    this.isAngleClick = false;
    this.activeElemClick = null;
  }

  _createClass(drop, [{
    key: "activeHighlight",
    value: function activeHighlight(type) {
      var activeDom = _drawData.default.getActive(); // drawData.getActive()


      if (!activeDom) {
        return;
      }

      var zoomArr = activeDom.querySelectorAll('.zoom');

      if (type == 'none') {
        activeDom.style.borderWidth = 0;
      } else {
        activeDom.style.borderWidth = '1px';
      }

      for (var i = 0; i < zoomArr.length; i++) {
        zoomArr[i].style.display = type;
      }
    }
  }, {
    key: "init",
    value: function init(canvas, params, unit, activeElemClick) {
      var _this = this;

      _drawData.default.pubsub.sub('imgChange', function (name, data) {
        if (_this.activeDom) {
          _this.activeDom.getElementsByTagName('img')[0];
          img.src = data.src;
        }
      });

      this.canvas = canvas;
      this.unit = unit;
      this.canvasDetail = this.canvas.getBoundingClientRect(); // console.log(this.canvasDetail)

      this.elemClick = params.canvas.on.elemClick;
      this.activeElemClick = activeElemClick;

      document.onmouseup = function (event) {
        _this.onmouseup(event, _this.canvas);
      };

      document.onmousedown = function (event) {
        _this.activeHighlight('none');
      };

      document.onmousemove = function (event) {
        _this.onmousemove(event, _this.canvas);
      };

      this.canvas.onmousedown = function () {
        _drawData.default.getDetail().style.display = 'none';
        _drawData.default.getImg().style.display = 'none';
      };
    }
  }, {
    key: "styleFramt",
    value: function styleFramt(style, elem) {
      var judgeStr = 'width,height,left,top,fontSize';
      var newStyle = {};

      for (var key in style) {
        if (key == 'angle' && style[key]) {
          newStyle.transform = "rotate(".concat(style[key], "deg)");
        } else if (key == 'width' || key == 'height') {
          if (key == 'width') {
            if (elem.type == 'text') {
              newStyle.minWidth = style.width + this.unit;
            } else {
              newStyle.width = style.width + this.unit;
            }
          }

          if (key == 'height') {
            if (elem.type == 'text') {
              newStyle.minHeight = style.height + this.unit;
            } else {
              newStyle.height = style.height + this.unit;
            }
          }
        } else if (judgeStr.indexOf(key) != -1) {
          newStyle[key] = style[key] + this.unit;
        } else {
          newStyle[key] = style[key];
        }
      }

      return Object.assign({}, newStyle);
    }
  }, {
    key: "creatImg",
    value: function creatImg(elem, dropDom) {
      var _this2 = this;

      var boxDom = (0, _utils.creatDom)({
        tag: 'div',
        style: {
          position: 'absolute',
          top: '0px',
          left: '0px',
          bottom: '0px',
          right: '0px',
          overflow: 'hidden'
        }
      });
      var img = (0, _utils.creatDom)({
        tag: 'img',
        attr: {
          src: elem.src
        },
        style: {
          position: 'absolute',
          // height: '100%',
          // width: '100%',
          display: 'block',
          userSelect: 'none',
          // pointerEvents:'none',
          top: '0' + this.unit,
          left: '0' + this.unit
        },
        on: {
          load: function load(event) {
            dropDom.style.height = img.height + _this2.unit;
            dropDom.style.width = img.width + _this2.unit;
            img.style.height = dropDom.style.height;
            img.style.width = dropDom.style.width; // console.log(img.width,"kkk")
          }
        }
      });
      boxDom.appendChild(img);
      return boxDom;
    }
  }, {
    key: "create",
    value: function create(elem, canvas) {
      var _this3 = this;

      var that = this;

      var dropDom = _utils.creatDom.call(this, {
        tag: 'div',
        style: Object.assign({
          display: 'inline-block',
          position: 'absolute',
          border: '1px solid #fff',
          cursor: 'move',
          transformOrigin: 'center',
          transform: 'rotate(0deg)',
          boxSizing: 'border-box',
          // overflow:'hidden',
          zIndex: _drawData.default.id++ // writingMode:'vertical-rl'

        }, this.styleFramt(elem.style, elem)),
        attr: {
          id: elem.name,
          class: 'draw-editor-elem'
        },
        data: {},
        on: {
          mousedown: function mousedown(event, dom) {
            event.stopPropagation();

            _this3.activeHighlight('none');

            _drawData.default.setActive(dom);

            _this3.activeHighlight('block');

            var _drawData$getImgDetai = _drawData.default.getImgDetail(),
                src = _drawData$getImgDetai.src;

            _drawData.default.getImgDetailDom().src = src;
            var elemtype = dom.dataset.elemtype;

            _this3.onmousedown(event, dropDom, _this3.canvas);

            if (elemtype == 'img') {
              _drawData.default.getDetail().style.display = 'none';
              _drawData.default.getImg().style.display = 'block';
            } else {
              _drawData.default.getDetail().style.display = 'block';
              _drawData.default.getImg().style.display = 'none';
            }

            _drawData.default.setForm();

            if (_this3.elemClick) {
              _this3.elemClick(dropDom);

              _this3.activeElemClick(dropDom);
            }
          }
        }
      });

      var textDom = (0, _utils.creatDom)({
        tag: 'span',
        child: elem.text || '',
        style: {
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis'
        }
      });

      if (elem.type == 'text') {
        dropDom.appendChild(textDom);
      } // const dropDom = document.createElement('div');


      var zoomDoms = this.createZoom();
      var angleDom = this.createAngle();
      var sizes = this.createSize();
      var childs = [angleDom].concat(_toConsumableArray(zoomDoms)); // if (elem.type == 'img') {
      //   childs = [...childs, ...sizes]
      // }

      dropDom.dataset.elemtype = elem.type; // dropDom.innerText = elem.text;
      // 添加旋转图标

      dropDom.appendChild(angleDom); // dropDom.appendChild("<h1>8888</h1>")
      // 添加缩放图标

      for (var key in childs) {
        dropDom.appendChild(childs[key]);
      } // setStyle(dropDom, dropStyle)
      // dropDom.id = elem.name;
      // dropDom.onmousedown = (event) => {
      //   event.stopPropagation();
      //   this.onmousedown(event, dropDom, canvas)
      //   console.log(this,"kkkkk")
      //   if (this.elemClick) {
      //     this.elemClick(event)
      //   }
      // }


      if (elem.type == 'img') {
        dropDom.appendChild(this.creatImg(elem, dropDom));
        dropDom.appendChild((0, _utils.creatDom)({
          tag: 'div',
          style: {
            position: 'absolute',
            top: '0px',
            left: '0px',
            right: '0px',
            bottom: '0px'
          }
        }));
      }

      return dropDom;
    } // 生成

  }, {
    key: "createZoom",
    value: function createZoom() {
      var _this4 = this;

      // let zoomDoms = [];
      var style = {
        position: 'absolute',
        backgroundColor: '#FFF',
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        zIndex: 10,
        boxShadow: '0 0 5px 1px rgba(14,19,24,.15), 0 0 0 1px rgba(14,19,24,.15)'
      };
      var tilt = _icon.default.tilt,
          reverseTilt = _icon.default.reverseTilt;
      var leftTopIcon = document.createElement('div');
      var rightTopIcon = document.createElement('div');
      var rightBottomIcon = document.createElement('div');
      var leftBottomIcon = document.createElement('div');
      var leftTopIconStyle = Object.assign({}, style, {
        top: '-5px',
        left: '-5px',
        cursor: "url(".concat(tilt, ") 8 12, auto")
      });
      var rightTopIconStyle = Object.assign({}, style, {
        top: '-5px',
        left: '100%',
        marginLeft: '-5px',
        cursor: "url(".concat(reverseTilt, ") 8 12, auto")
      });
      var rightBottomIconStyle = Object.assign({}, style, {
        top: '100%',
        left: '100%',
        marginLeft: '-5px',
        marginTop: '-5px',
        cursor: "url(".concat(tilt, ") 8 12, auto")
      });
      var leftBottomIconStyle = Object.assign({}, style, {
        top: '100%',
        left: '-5px',
        marginTop: '-5px',
        cursor: "url(".concat(reverseTilt, ") 8 12, auto")
      });
      leftTopIcon.className = 'zoom';
      rightBottomIcon.className = 'zoom';
      leftBottomIcon.className = 'zoom';
      rightTopIcon.className = 'zoom';
      (0, _utils.setStyle)(leftTopIcon, leftTopIconStyle);
      (0, _utils.setStyle)(rightTopIcon, rightTopIconStyle);
      (0, _utils.setStyle)(rightBottomIcon, rightBottomIconStyle);
      (0, _utils.setStyle)(leftBottomIcon, leftBottomIconStyle);

      leftTopIcon.onmousedown = function (evt) {
        _this4.activeDom = leftTopIcon;

        _this4.domSetTag(evt, 'leftTop');
      };

      rightTopIcon.onmousedown = function (evt) {
        _this4.activeDom = rightTopIcon;

        _this4.domSetTag(evt, 'rightTop');
      };

      rightBottomIcon.onmousedown = function (evt) {
        _this4.activeDom = rightBottomIcon;

        _this4.domSetTag(evt, 'rightBottom');
      };

      leftBottomIcon.onmousedown = function (evt) {
        _this4.activeDom = leftBottomIcon;

        _this4.domSetTag(evt, 'leftBottom');
      };

      return [leftTopIcon, rightTopIcon, rightBottomIcon, leftBottomIcon];
    } // 修改大小图标

  }, {
    key: "createSize",
    value: function createSize() {
      var _this5 = this;

      var style = {
        position: 'absolute',
        backgroundColor: '#fff',
        boxShadow: '0 0 5px 1px rgba(14,19,24,.15), 0 0 0 1px rgba(14,19,24,.15)',
        borderRadius: '5px'
      };
      var vertical = _icon.default.vertical,
          level = _icon.default.level;
      var topIcon = document.createElement('div');
      var rightIcon = document.createElement('div');
      var bottomIcon = document.createElement('div');
      var leftIcon = document.createElement('div');
      var topIconStyle = Object.assign({}, style, {
        width: '16px',
        height: '5px',
        top: '-3px',
        left: '50%',
        marginLeft: '-8px',
        cursor: "url(".concat(vertical, ") 8 12, auto")
      });
      var rightIconStyle = Object.assign({}, style, {
        width: '5px',
        height: '16px',
        top: '50%',
        left: '100%',
        marginLeft: '-2px',
        marginTop: '-8px',
        cursor: "url(".concat(level, ") 8 12, auto")
      });
      var bottomIconStyle = Object.assign({}, style, {
        width: '16px',
        height: '5px',
        top: '100%',
        left: '50%',
        marginLeft: '-8px',
        marginTop: '-2px',
        cursor: "url(".concat(vertical, ") 8 12, auto")
      });
      var leftIconStyle = Object.assign({}, style, {
        width: '5px',
        height: '16px',
        top: '50%',
        left: '0%',
        marginLeft: '-3px',
        marginTop: '-8px',
        cursor: "url(".concat(level, ") 8 12, auto")
      });
      topIcon.className = 'zoom';
      rightIcon.className = 'zoom';
      bottomIcon.className = 'zoom';
      leftIcon.className = 'zoom';
      (0, _utils.setStyle)(topIcon, topIconStyle);
      (0, _utils.setStyle)(rightIcon, rightIconStyle);
      (0, _utils.setStyle)(bottomIcon, bottomIconStyle);
      (0, _utils.setStyle)(leftIcon, leftIconStyle);

      topIcon.onmousedown = function (evt) {
        _this5.activeDom = topIcon;

        _this5.domSetTag(evt, 'top');
      };

      rightIcon.onmousedown = function (evt) {
        _this5.activeDom = rightIcon;

        _this5.domSetTag(evt, 'right');
      };

      bottomIcon.onmousedown = function (evt) {
        _this5.activeDom = bottomIcon;

        _this5.domSetTag(evt, 'bottom');
      };

      leftIcon.onmousedown = function (evt) {
        _this5.activeDom = leftIcon;

        _this5.domSetTag(evt, 'left');
      };

      return [topIcon, rightIcon, bottomIcon, leftIcon];
    } // 生成旋转icon

  }, {
    key: "createAngle",
    value: function createAngle() {
      var _this6 = this;

      var angleIcon = document.createElement('div');
      var angle = _icon.default.angle,
          angleCursor = _icon.default.angleCursor;
      var style = {
        position: 'absolute',
        backgroundImage: "url(".concat(angle, ")"),
        backgroundSize: '100%',
        backgroundColor: '#fff',
        width: '20px',
        height: '20px',
        top: '100%',
        left: '50%',
        marginLeft: '-10px',
        marginTop: '10px',
        borderRadius: '50%',
        boxShadow: '0 0 5px 1px rgba(14,19,24,.15), 0 0 0 1px rgba(14,19,24,.15)',
        cursor: "url(".concat(angleCursor, ") 4 12, auto")
      };
      angleIcon.className = 'zoom'; // angleIcon. = 10;
      // angleIcon.tabIndex = 1;

      (0, _utils.setStyle)(angleIcon, style);

      angleIcon.onblur = function () {
        _this6.isAngleClick = false;
      };

      angleIcon.onmousedown = function (evt) {
        _this6.activeDom = angleIcon;
        _this6.isAngleClick = true; // console.log("kkkk222")

        _this6.domSetTag(evt, 'angle');
      };

      return angleIcon;
    }
  }, {
    key: "onmousedown",
    value: function onmousedown(evt, dom) {
      this.activeDom = dom;
      this.domSetTag(evt, 'elem');
    } // 获取角度

  }, {
    key: "getAngle",
    value: function getAngle(start, end) {
      var diffX = end.x - start.x,
          diffY = end.y - start.y; //返回角度,不是弧度

      return 360 * Math.atan2(diffY, diffX) / (2 * Math.PI) - 90;
    }
  }, {
    key: "domSetTag",
    value: function domSetTag(event, type) {
      this.activeDom.dataset.monusedown = 1;
      var parentNode = type == 'elem' ? this.activeDom : this.activeDom.parentNode;
      var detail = parentNode.getBoundingClientRect();
      var width = parentNode.style.width;
      var height = parentNode.style.height;
      var elemType = parentNode.dataset.elemtype;
      var imgWidth = 0;
      var imgHeight = 0;
      var imgTop = 0;
      var imgLeft = 0; // console.log(parentNode.offsetWidth,"kkkkk")

      if (elemType !== 'img') {
        // parentNode.style.minWidth = parentNode.offsetWidth+this.unit;
        // parentNode.style.minHeight = parentNode.offsetHeight+this.unit;
        // console.log( parentNode.offsetWidth+this.unit,"jjjkkkk",this.unit)
        height = parentNode.style.minHeight;
        width = parentNode.offsetWidth + this.unit;
      } else {
        var imgDom = parentNode.getElementsByTagName('img')[0]; // console.log(imgDom,"----")

        imgWidth = imgDom.style.width.replace(this.unit, '');
        imgHeight = imgDom.style.height.replace(this.unit, '');
        imgTop = imgDom.style.top.replace(this.unit, '');
        imgLeft = imgDom.style.left.replace(this.unit, '');
      } // console.log(parentNode.offsetWidth,"jjjj")


      var transform = parentNode.style.transform;
      var top = parentNode.style.top.replace(this.unit, '');
      var left = parentNode.style.left.replace(this.unit, '');
      var fontSize = parentNode.style.fontSize.replace(this.unit, '');
      var elemDetail = {
        width: width.replace(this.unit, ''),
        height: height.replace(this.unit, ''),
        centerX: detail.left + detail.width / 2,
        centerY: detail.top + detail.height / 2,
        mouseX: event.pageX - left - this.canvasDetail.left,
        mouseY: event.pageY - top - this.canvasDetail.top,
        pageX: event.pageX,
        pageY: event.pageY,
        angle: transform.replace('rotate(', '').replace('deg)', ''),
        x: left,
        y: top,
        fontSize: fontSize,
        type: parentNode.dataset.elemtype,
        imgWidth: imgWidth,
        imgHeight: imgHeight,
        imgLeft: imgLeft,
        imgTop: imgTop
      };
      this.activeDom.dataset.activeDetail = JSON.stringify(elemDetail);
      this.activeDom.dataset.type = type;
      event.stopPropagation();
    }
  }, {
    key: "onmouseup",
    value: function onmouseup(evt) {
      this.activeDom = null;
    }
  }, {
    key: "onmousemove",
    value: function onmousemove(evt) {
      // console.log('move')
      var activeElem = null,
          type = null,
          activeDetail = null,
          centerPos = null,
          mouseToPagePos = null,
          activePos = null,
          oldWidth = null,
          oldHeight = null,
          mousePos = null;

      if (this.activeDom) {
        type = this.activeDom.dataset.type;
        activeElem = this.activeDom.parentNode;
        activeDetail = JSON.parse(this.activeDom.dataset.activeDetail);
        oldWidth = activeDetail.width;
        oldHeight = activeDetail.height;
        centerPos = {
          x: activeDetail.centerX,
          y: activeDetail.centerY
        };
        mouseToPagePos = {
          x: activeDetail.pageX,
          y: activeDetail.pageY
        };
        activePos = this.getRotatedPoint(mouseToPagePos, centerPos, -activeDetail.angle);
        mousePos = this.getRotatedPoint({
          x: evt.pageX,
          y: evt.pageY
        }, centerPos, -activeDetail.angle);
      }

      if (type === 'elem') {
        activeElem = this.activeDom;
        activeDetail.x = evt.pageX - this.canvasDetail.left - activeDetail.mouseX;
        activeDetail.y = evt.pageY - this.canvasDetail.top - activeDetail.mouseY;
      }

      if (type === 'angle') {
        activeDetail.angle = this.getAngle(centerPos, {
          x: evt.pageX,
          y: evt.pageY
        });
      }

      if (type == 'top') {
        activeDetail.height = activePos.y - mousePos.y + +activeDetail.height;
        activeDetail.y = activeDetail.y - (activePos.y - mousePos.y);
      }

      if (type == 'right') {
        activeDetail.width = mousePos.x - activePos.x + +activeDetail.width;
      }

      if (type == 'left') {
        activeDetail.width = activePos.x - mousePos.x + +activeDetail.width;
        activeDetail.x = activeDetail.x - (activePos.x - mousePos.x);
      }

      if (type == 'bottom') {
        activeDetail.height = mousePos.y - activePos.y + +activeDetail.height;
      }

      if (type === 'leftTop') {
        activeDetail.width = activePos.x - mousePos.x + +activeDetail.width;
        activeDetail.height = oldHeight * activeDetail.width / oldWidth;
        activeDetail.x = activeDetail.x - (activePos.x - mousePos.x);
        activeDetail.y = activeDetail.y - (activeDetail.height - oldHeight);
      }

      if (type === 'rightTop') {
        activeDetail.width = mousePos.x - activePos.x + +activeDetail.width;
        activeDetail.height = oldHeight * activeDetail.width / oldWidth;
        activeDetail.y = activeDetail.y - (activeDetail.height - oldHeight);
      }

      if (type === 'rightBottom') {
        activeDetail.width = mousePos.x - activePos.x + +activeDetail.width;
        activeDetail.height = oldHeight * activeDetail.width / oldWidth;
      }

      if (type === 'leftBottom') {
        activeDetail.width = activePos.x - mousePos.x + +activeDetail.width;
        activeDetail.height = oldHeight * activeDetail.width / oldWidth;
        activeDetail.x = activeDetail.x - (activePos.x - mousePos.x);
      }

      if (activeElem) {
        activeDetail.fontSize = activeDetail.fontSize * activeDetail.width / oldWidth;
        activeElem.style.transform = "rotate(".concat(activeDetail.angle, "deg) ");

        if (activeDetail.type == 'img') {
          var zoom = (activeDetail.width / oldWidth).toFixed(3); // console.log(zoom,"kkkk")

          var imgDom = activeElem.getElementsByTagName('img')[0]; // let imgWidth = imgDom.style.width.replace(this.unit,'')*zoom;
          // let imgHeight = imgDom.style.height.replace(this.unit,'')*zoom;
          // let imgTop = imgDom.style.top.replace(this.unit,'')*zoom;
          // let imgLeft = imgDom.style.left.replace(this.unit,'')*zoom;
          // console.log(imgWidth,imgHeight,imgTop,imgLeft)
          // console.log(activeDetail)il)

          if ('leftTop,rightTop,rightBottom,leftBottom'.indexOf(type) != -1) {
            // console.log
            imgDom.style.width = activeDetail.imgWidth * zoom + this.unit;
            imgDom.style.height = activeDetail.imgHeight * zoom + this.unit;
            imgDom.style.top = activeDetail.imgTop * zoom + this.unit;
            imgDom.style.left = activeDetail.imgLeft * zoom + this.unit;
          }

          activeElem.style.width = activeDetail.width + this.unit;
          activeElem.style.height = activeDetail.height + this.unit;
          activeElem.style.left = activeDetail.x + this.unit;
          activeElem.style.top = activeDetail.y + this.unit;
        } else {
          if (activeDetail.fontSize >= 12) {
            // console.log('move')
            activeElem.style.left = activeDetail.x + this.unit;
            activeElem.style.top = activeDetail.y + this.unit; // activeElem.style.minWidth = activeDetail.width+this.unit;
            // activeElem.style.minHeight = activeDetail.height+this.unit;

            activeElem.style.fontSize = activeDetail.fontSize + this.unit;
          }
        }
      }
    }
  }, {
    key: "deleteDrop",
    value: function deleteDrop() {}
  }, {
    key: "getRotatedPoint",
    value: function getRotatedPoint(curPos, centerPos, angle) {
      return {
        x: Math.floor((curPos.x - centerPos.x) * Math.cos(Math.PI / 180 * angle) - (curPos.y - centerPos.y) * Math.sin(Math.PI / 180 * angle) + centerPos.x),
        y: Math.floor((curPos.x - centerPos.x) * Math.sin(Math.PI / 180 * angle) + (curPos.y - centerPos.y) * Math.cos(Math.PI / 180 * angle) + centerPos.y)
      };
    }
  }]);

  return drop;
}();

var _default = new drop();

exports.default = _default;
},{"../../../utils":"utils/index.js","./icon":"plugin/draw-editer/drop/icon.js","../draw-data":"plugin/draw-editer/draw-data/index.js"}],"plugin/draw-editer/draw-bar/data.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _drawData = _interopRequireDefault(require("../draw-data"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = [{
  text: '字体',
  type: 'text',
  img: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTYxOTY1NTE5NzQyIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE5OTIiIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTU2My45NTY2MjcgMjc1Ljc0MjYzNSA4MDAuODk5MTYxIDI3NS43NDI2MzVDODI5LjgzNDQgMjc1Ljc0MjYzNSA4NTMuMzMzMzMzIDI1Mi4yMjA1NzggODUzLjMzMzMzMyAyMjMuMjA0NjUxIDg1My4zMzMzMzMgMTkzLjk4NjQzIDgyOS44NTc3NTQgMTcwLjY2NjY2NyA4MDAuODk5MTYxIDE3MC42NjY2NjdMMjIzLjEwMDg0IDE3MC42NjY2NjdDMTk0LjE2NTU5OSAxNzAuNjY2NjY3IDE3MC42NjY2NjcgMTk0LjE4ODcyMyAxNzAuNjY2NjY3IDIyMy4yMDQ2NTEgMTcwLjY2NjY2NyAyNTIuNDIyODcyIDE5NC4xNDIyNDYgMjc1Ljc0MjYzNSAyMjMuMTAwODQgMjc1Ljc0MjYzNUw0NjAuMDQyNzIxIDI3NS43NDI2MzVDNDU5LjY2MDEzMSAyNzguMzAwNzM0IDQ1OS40NjIwMTggMjgwLjkxOTQxNCA0NTkuNDYyMDE4IDI4My41ODQ2MDdMNDU5LjQ2MjAxOCA3OTIuOTUzMzc4QzQ1OS40NjIwMTggODIxLjk4Njc0MSA0ODIuOTg0MDczIDg0NS4zMDk1OTQgNTEyIDg0NS4zMDk1OTQgNTQxLjIxODIyMiA4NDUuMzA5NTk0IDU2NC41Mzc5ODIgODIxLjg2ODkxOSA1NjQuNTM3OTgyIDc5Mi45NTMzNzhMNTY0LjUzNzk4MiAyODMuNTg0NjA3QzU2NC41Mzc5ODIgMjgwLjkxNzg5MSA1NjQuMzM5NTQxIDI3OC4yOTkzNTEgNTYzLjk1NjYyNyAyNzUuNzQyNjM1WiIgcC1pZD0iMTk5MyI+PC9wYXRoPjwvc3ZnPg==',
  class: '',
  on: {
    click: function click(draw, evt) {
      var dreawEdit = _drawData.default.getDrawEdit();

      dreawEdit.add('text');
    }
  }
}, {
  text: '图片',
  type: 'img',
  img: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTYxOTY1NTYxODQyIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjI3NjgiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMzIiIGhlaWdodD0iMzIiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTEwNy4wMDggMTA3LjI2NGg4MDkuODU2YzIzLjIzMiAwIDQxLjkyIDE4LjY4OCA0MS45MiA0MS45MnYzMzAuMzY4Yy00MS45Mi0zMi42NC0xMjAuOTYtODMuNzc2LTE4MS41NjgtODMuNzc2LTg4LjQ0OCAwLTE2Ny41NTIgMjA0LjgtMjY1LjI4IDIwNC44QzQzNy40NCA1OTUuODQgMzM1LjEwNCA1MTIgMjE4LjY4OCA1MjYuMDE2Yy00Ni41MjggOS4yOC0xMTEuNjggODMuODQtMTUzLjYgMTM5LjY0OHYtNTE2LjQ4YzAtMjMuMzYgMTguNjg4LTQxLjkyIDQxLjkyLTQxLjkyeiBtMTk1LjUyIDMzNS4xMDRjLTM3LjI0OCAwLTY5LjgyNC0xMy45NTItOTMuMDU2LTM3LjE4NHMtMzcuMjQ4LTYwLjU0NC0zNy4yNDgtOTMuMDU2YzAtMzIuNjQgMTQuMDE2LTY5Ljc2IDM3LjI0OC05My4wNTZhMTI5Ljk4NCAxMjkuOTg0IDAgMCAxIDkzLjA1Ni0zNy4xODRjMzIuNjQgMCA2NS4wODggMTMuOTUyIDkyLjk5MiAzNy4xODQgMjMuMjMyIDIzLjIzMiAzNy4yNDggNjAuNTQ0IDM3LjI0OCA5My4wNTYgMCAzMi42NC0xNC4wMTYgNjkuODI0LTM3LjI0OCA5My4wNTYtMjcuOTA0IDIzLjIzMi02MC40MTYgMzcuMTg0LTkyLjk5MiAzNy4xODR6TTk0MC4wOTYgNDYuNzJIODMuODRDMzcuMTg0IDQ2LjcyIDAgODMuOTA0IDAgMTMwLjQ5NnY3NjMuMjY0YzAgNDYuNTkyIDM3LjE4NCA4My44NCA4My43NzYgODMuODRoODU2LjQ0OGM0Ni41OTIgMCA4My43NzYtMzcuMjQ4IDgzLjc3Ni04My44NFYxMzAuNTZBODMuNTIgODMuNTIgMCAwIDAgOTQwLjE2IDQ2LjcyeiIgcC1pZD0iMjc2OSI+PC9wYXRoPjwvc3ZnPg==',
  class: '',
  on: {
    click: function click(draw, evt) {// let dreawEdit = dreawData.getDrawEdit();
      // dreawEdit.add('img');
      // draw.add('text');
    }
  }
}];
exports.default = _default;
},{"../draw-data":"plugin/draw-editer/draw-data/index.js"}],"plugin/draw-editer/draw-bar/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _data = _interopRequireDefault(require("./data"));

var _drawData = _interopRequireDefault(require("../draw-data"));

var _utils = require("../../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var bar =
/*#__PURE__*/
function () {
  function bar(params, draw) {
    _classCallCheck(this, bar);

    this.dom = params.dom;
    this.data = _data.default.concat(params.data || []);
    this.drawObj = draw;
  }

  _createClass(bar, [{
    key: "init",
    value: function init() {
      var _this = this;

      this.data.map(function (item) {
        var style = {
          display: 'inline-block',
          margin: '5px',
          minWidth: '50px',
          minHeight: '50px',
          padding: '5px',
          textAlign: 'center',
          fontSize: '12px',
          cursor: 'pointer',
          verticalAlign: 'middle',
          boxSizing: 'border-box',
          borderRadius: '4px',
          backgroundColor: '#fff'
        };
        var upFileDom = (0, _utils.creatDom)({
          tag: 'input',
          attr: {
            type: 'file'
          },
          style: {
            display: 'none'
          },
          on: {
            change: function change(e) {
              (0, _utils.getFileDetail)(e, function (file, url) {
                var _dreawData$getParams = _drawData.default.getParams(),
                    fileUpload = _dreawData$getParams.fileUpload;

                fileUpload(file, url);
              });
            }
          }
        });
        var dombox = (0, _utils.creatDom)({
          tag: 'div',
          style: style,
          on: {
            hover: function hover(event) {
              event.currentTarget.style.backgroundColor = 'rgba(14,19,24,.15)';
            },
            click: function click() {
              if (item.type == 'img') {
                upFileDom.click();
              } else {
                item.on.click();
              }
            }
          }
        });
        var domText = (0, _utils.creatDom)({
          tag: 'span',
          child: item.text,
          style: {
            display: 'block'
          }
        });
        var domImg = (0, _utils.creatDom)({
          tag: 'img',
          attr: {
            src: item.img
          },
          style: {
            height: '20px'
          }
        });

        if (item.on) {
          for (var key in item.on) {
            dombox.removeEventListener(key, item.on[key].bind(_this, _this.drawObj));
            dombox.addEventListener(key, item.on[key].bind(_this, _this.drawObj));
          }
        }

        dombox.appendChild(domImg);
        dombox.appendChild(domText);

        if (item.type == 'img') {
          dombox.appendChild(upFileDom);
        }

        _this.dom.appendChild(dombox);
      });
    }
  }]);

  return bar;
}();

var _default = bar;
exports.default = _default;
},{"./data":"plugin/draw-editer/draw-bar/data.js","../draw-data":"plugin/draw-editer/draw-data/index.js","../../../utils":"utils/index.js"}],"plugin/draw-editer/draw-detail/data.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _drawData = _interopRequireDefault(require("../draw-data"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var publicStyle = {
  width: '30px',
  height: '30px',
  cursor: 'pointer',
  display: 'inline-block',
  backgroundSize: '25px',
  backgroundColor: '#fff',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  borderRadius: '4px',
  verticalAlign: 'middle',
  margin: '2px'
};

var hover = function hover(event) {
  event.currentTarget.style.backgroundColor = 'rgba(14,19,24,.15)';
};

var setActive = function setActive(event) {
  var active = +event.dataset.active;

  if (!active) {
    event.dataset.active = 1;
    event.style.backgroundColor = 'rgba(14,19,24,0.15)';
  } else {
    event.dataset.active = 0;
    event.style.backgroundColor = '#fff';
  }
};

function _default() {
  var _drawData$getParams = _drawData.default.getParams(),
      unit = _drawData$getParams.unit;

  return [{
    title: "文字内容",
    name: 'text',
    type: 'textarea',
    on: {
      change: function change() {
        console.log("------");
      },
      input: function input(event, e) {
        var activeDom = _drawData.default.getActive();

        var textDom = activeDom.getElementsByTagName('span')[0];

        if (activeDom) {
          textDom.innerText = e.value;
          activeDom.style.minWidth = '';
          activeDom.style.minHeight = '';
        }
      }
    }
  }, {
    title: "字体",
    name: 'fontFamily',
    type: 'select',
    options: [{
      label: 'Apple',
      value: 'Apple'
    }, {
      label: 'Orange',
      value: 'Orange'
    }],
    on: {
      change: function change(evt) {
        console.log('ppppp', evt.value);
      }
    }
  }, {
    title: "字号",
    name: 'fontSize',
    type: 'select',
    isInput: true,
    options: [{
      label: '14',
      value: '14'
    }, {
      label: '16',
      value: '16'
    }],
    on: {
      change: function change(evt, e) {
        console.log("------", "kkkk");

        var activeDom = _drawData.default.getActive();

        if (activeDom) {
          activeDom.style.fontSize = e.value + unit;
        }
      }
    }
  }, {
    title: "行高",
    name: 'lineHeight',
    isInput: true,
    type: 'select',
    options: [{
      label: '14',
      value: '14'
    }, {
      label: '16',
      value: '16'
    }],
    on: {
      change: function change(evt, e) {
        var activeDom = _drawData.default.getActive();

        if (activeDom) {
          activeDom.style.lineHeight = e.value + unit;
        }
      }
    }
  }, {
    title: "颜色",
    name: 'color',
    type: 'color',
    on: {
      change: function change(event, value) {
        // console.log(e.value,"jjjj")
        var activeDom = _drawData.default.getActive();

        if (activeDom) {
          activeDom.style.color = value;
        }
      }
    }
  }, {
    title: "",
    name: 'textAlign',
    type: 'radio-button',
    style: {
      display: 'inline-block'
    },
    on: {
      change: function change(value) {
        var activeDom = _drawData.default.getActive();

        activeDom.style.textAlign = value;
      }
    },
    options: [{
      value: 'left',
      label: '',
      url: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTYxOTg1NDM1MzM0IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEyNzggMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE3ODYiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjQ5LjYwOTM3NSIgaGVpZ2h0PSIyMDAiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTI2NC44MDg0OTY0NCA3MzMuNDcwMTg3NjdoNjY5LjAxNDY2OTU1djY3LjA1MzU3NTU1SDI2NC44MDg0OTY0NHpNMjYzLjQ3NjIzNjc3IDQ5OC40Nzg0NTczNmg1MzEuNDY2NzIyMDl2NjcuMDUzNTc1NTVIMjYzLjQ3NjIzNjc3ek0yNjQuODA4NDk2NDQgMjYzLjQ3NjIzNjc3aDY2OS4wMTQ2Njk1NXY2Ny4wNTM1NzU1NEgyNjQuODA4NDk2NDR6IiBmaWxsPSIjNjY2NjY2IiBwLWlkPSIxNzg3Ij48L3BhdGg+PC9zdmc+'
    }, {
      value: 'center',
      label: '',
      url: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTYxOTg1Mzk5ODM2IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEyNzUgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE0MTMiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjQ5LjAyMzQzNzUiIGhlaWdodD0iMjAwIj48ZGVmcz48c3R5bGUgdHlwZT0idGV4dC9jc3MiPjwvc3R5bGU+PC9kZWZzPjxwYXRoIGQ9Ik0yODMuNDc2MjM2NzcgNzEzLjQ3MDE4NzY3aDY2OS4wMTQ2Njk1NXY2Ny4wNTM1NzU1NUgyODMuNDc2MjM2Nzd6TTM1Mi4yNTAyMTA1MSA0NzguNDc4NDU3MzZoNTMxLjQ2NjcyMjA2djY3LjA1MzU3NTU1SDM1Mi4yNTAyMTA1MXpNMjgzLjQ3NjIzNjc3IDI0My40NzYyMzY3OGg2NjkuMDE0NjY5NTV2NjcuMDUzNTc1NTRIMjgzLjQ3NjIzNjc3eiIgZmlsbD0iIzY2NjY2NiIgcC1pZD0iMTQxNCI+PC9wYXRoPjwvc3ZnPg=='
    }, {
      value: 'right',
      label: '',
      url: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTYxOTg1NDI2NDExIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEyNzggMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE2MzMiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjQ5LjYwOTM3NSIgaGVpZ2h0PSIyMDAiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTI2My40NzYyMzY3NyA3MzMuNDcwMTg3NjdoNjY5LjAxNDY2OTU1djY3LjA1MzU3NTU1SDI2My40NzYyMzY3N3pNNDAyLjc4NjU0MzQ1IDQ5OC40Nzg0NTczNmg1MzEuNDY2NzIyMDl2NjcuMDUzNTc1NTVINDAyLjc4NjU0MzQ1ek0yNjMuNDc2MjM2NzcgMjYzLjQ3NjIzNjc3aDY2OS4wMTQ2Njk1NXY2Ny4wNTM1NzU1NEgyNjMuNDc2MjM2Nzd6IiBmaWxsPSIjNjY2NjY2IiBwLWlkPSIxNjM0Ij48L3BhdGg+PC9zdmc+'
    }, {
      value: 'justify',
      label: '',
      url: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTYxOTg1NDI2NDExIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEyNzggMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE2MzMiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjQ5LjYwOTM3NSIgaGVpZ2h0PSIyMDAiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTI2My40NzYyMzY3NyA3MzMuNDcwMTg3NjdoNjY5LjAxNDY2OTU1djY3LjA1MzU3NTU1SDI2My40NzYyMzY3N3pNNDAyLjc4NjU0MzQ1IDQ5OC40Nzg0NTczNmg1MzEuNDY2NzIyMDl2NjcuMDUzNTc1NTVINDAyLjc4NjU0MzQ1ek0yNjMuNDc2MjM2NzcgMjYzLjQ3NjIzNjc3aDY2OS4wMTQ2Njk1NXY2Ny4wNTM1NzU1NEgyNjMuNDc2MjM2Nzd6IiBmaWxsPSIjNjY2NjY2IiBwLWlkPSIxNjM0Ij48L3BhdGg+PC9zdmc+'
    }]
  }, {
    title: "",
    name: 'fontWeight',
    type: 'switch',
    value: 'bold',
    style: {
      padding: '0px',
      margin: '0px 5px'
    },
    url: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTYxOTg4NzA4NjM2IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE5MzkiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNMjczLjUyMjA3MTA1IDg1OS42MTQyODgzM1YxNjQuNDE4NTA0MTloMjA1LjQ5ODEyNTE5cTkyLjEzNTMwMjkgMCAxNDcuMjI2Mjg5NCA0My43MjMwMDUzdDU1LjA5MDk4NzE2IDExNS45OTcxMzI5N3EwIDU3LjQ1MjAyODktMzIuNzkyMjU0MzEgMTAxLjQzNzM3MjMydC05MC4wNDc1Mjk0NiA2Mi40MTQ1OTAxOXYxLjc5MjY0MjhxNzEuMzU1OTQ0NTkgOC4wNzc4MjU1MyAxMTQuMDI5NTk4MDggNTMuNjM3MTk2OTl0NDIuNjI5OTMwMTQgMTE1LjU3MDgzMzYxcTAgODkuNzc0MjYwNS02NC44MDg0MjQ0NCAxNDUuMTkzMTcwMTV0LTE2NS45MTc4NzQ5NCA1NS40Mjk4Mzk4MXpNMzYzLjg0Mjg2OTQ3IDI0Mi45MzQwOTA1NFY0NjAuNjA5MDcyOTVoODIuMTk5MjUwMjFxNjUuNDc1MjAwMjMgMCAxMDIuNzQ5MDYyMjUtMzEuNjQ0NTI1NjJ0MzcuMjYyOTMxMTgtODcuNzQxMTQwNTZxMC05OC4yODkzMTYyMi0xMzEuODY4NTg0MjMtOTguMjg5MzE2MjR6IG0wIDI5NS43NzUyMDAyNHYyNDIuMzM0NzU3MDFoMTA4LjM4OTMzMDE2cTcwLjg5Njg1MzM4IDAgMTA5LjUxNTE5Nzg2LTMyLjU0MDg0NjM3dDM4LjYxODM0Mzc5LTkwLjQ0MTAzNjk3cTAtMTE5LjM4NTY2NjE5LTE2My4wMzIxNTU2MS0xMTkuMzg1NjY1NTF6IiBmaWxsPSIjNjY2NjY2IiBwLWlkPSIxOTQwIj48L3BhdGg+PC9zdmc+',
    on: {
      change: function change(e) {
        var activeDom = _drawData.default.getActive(); // console.log(event,e)


        var value = e;

        if (value) {
          activeDom.style.fontWeight = 'bold';
          return;
        }

        activeDom.style.fontWeight = 'normal';
      }
    }
  }, {
    title: "",
    name: 'fontStyle',
    type: 'switch',
    value: 'italic',
    style: {
      padding: '0px',
      margin: '0px'
    },
    url: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTYxOTg4NzM0Njc1IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjIyNDUiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNNDQ2LjEwOTMyNzgyIDkwMi43ODg1NzQyMkgzNjkuMDAxMjQ5NzVMNTc3Ljg5MDY3MjE4IDE2MS4yMTE0MjU3OGg3Ny4xMDgwNzgwN0w0NDYuMTA5MzI3ODIgOTAyLjc4ODU3NDIyeiIgZmlsbD0iIzY2NjY2NiIgcC1pZD0iMjI0NiI+PC9wYXRoPjwvc3ZnPg==',
    on: {
      change: function change(e) {
        var activeDom = _drawData.default.getActive(); // console.log(event,e)


        var value = e;

        if (value) {
          activeDom.style.fontStyle = 'italic';
          return;
        }

        activeDom.style.fontStyle = 'normal';
      }
    }
  }, {
    title: "",
    name: 'textDecoration',
    type: 'switch',
    value: 'underline',
    style: {
      padding: '0px',
      margin: '5px'
    },
    url: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTYxOTg4NzI4NDA5IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjIwOTIiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNMjQ0LjgwMzkxMTk2IDkzMC4yNjMzNjgwNXYtNTMuMzA4MzAzNDNsNTM0LjM5MjE3NjA4LTQuODQ5MDY1NjF2NTMuMjk3ODMwMjNMMjQ0LjgwMzkxMTk2IDkzMC4yNjMzNjgwNXpNNzUzLjc5ODcxMzc4IDUyMS40MTI3Njk2NXEwIDI3My41MDYxNTcxOS0yNDguMTA4NzgyOTEgMjczLjUwNjE1Nzk3LTIzNy43NDAzNzAyNSAwLTIzNy43NDAzNzAyNy0yNjMuOTIzMjMwNzhWMTM5LjMwMDEwODQ0aDgzLjI2MTQ5NTE0djM4Ny45MzU3Mjk2OXEwIDE5My41NzUxMjIxMSAxNjIuMzMzNzMyODggMTkzLjU3NTEyMjEgMTU2Ljk0MDA2Mzg1IDAgMTU2Ljk0MDA2Mzg2LTE4Ny4zMzMxMjgyVjEzOS4yNDc3NDMwNUg3NTMuNzk4NzEzNzh6IiBmaWxsPSIjNjY2NjY2IiBwLWlkPSIyMDkzIj48L3BhdGg+PC9zdmc+',
    on: {
      change: function change(e) {
        var activeDom = _drawData.default.getActive();

        var value = e;

        if (value) {
          activeDom.style.textDecoration = 'underline';
          return;
        }

        activeDom.style.textDecoration = 'none';
      }
    }
  }];
}
/**
 *   {
        tag: 'div',
        style: Object.assign({}, publicStyle, {
          backgroundSize: '17px',
          backgroundImage: 'url()',
        }),
        on: {
          click: (event, dom) => {
            console.log("-------", event)
            setActive(dom)
            // console.log("ppppppp",elemDom)
          },
          // hover: hover,
        }
      }, {
        tag: 'div',
        style: Object.assign({}, publicStyle, {
          backgroundSize: '17px',
          backgroundImage: 'url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTYxOTg4NzM0Njc1IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjIyNDUiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNNDQ2LjEwOTMyNzgyIDkwMi43ODg1NzQyMkgzNjkuMDAxMjQ5NzVMNTc3Ljg5MDY3MjE4IDE2MS4yMTE0MjU3OGg3Ny4xMDgwNzgwN0w0NDYuMTA5MzI3ODIgOTAyLjc4ODU3NDIyeiIgZmlsbD0iIzY2NjY2NiIgcC1pZD0iMjI0NiI+PC9wYXRoPjwvc3ZnPg==)',
        }),
        on: {
          click: (event, dom) => {
            // console.log("ppppppp")
            setActive(dom)
          },
          // hover: hover,
        }
      }, {
        tag: 'div',
        style: Object.assign({}, publicStyle, {
          backgroundSize: '17px',
          backgroundImage: 'url()',
        }),
        on: {
          click: (event, dom) => {
            // console.log("ppppppp")
            setActive(dom)
          },
          // hover: hover,
        }
      }*/
},{"../draw-data":"plugin/draw-editer/draw-data/index.js"}],"plugin/draw-editer/components/input-select.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = require("../../../utils");

var _default = function _default(params) {
  var options = params.options,
      isInput = params.isInput;
  var boxDom = (0, _utils.creatDom)({
    tag: 'div',
    style: {
      position: 'relative'
    }
  });
  var select = isInput ? (0, _utils.creatDom)({
    tag: 'div',
    style: {
      maxHeight: '200px',
      overflow: 'auto',
      position: 'absolute',
      width: '100%',
      display: 'none',
      zIndex: '999',
      background: '#fff',
      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
      borderRadius: '4px',
      margin: '5px 0'
    }
  }) : (0, _utils.creatDom)({
    tag: 'select',
    attr: {
      name: params.name
    },
    style: {
      display: 'block',
      width: '100%',
      height: '35px',
      borderRadius: '4px',
      border: '1px solid #d9d9d9',
      boxSizing: 'border-box',
      padding: ' 0 10px',
      background: '#fff'
    }
  });
  var inputDom = (0, _utils.creatDom)({
    tag: 'input',
    style: {
      display: 'block',
      width: '100%',
      lineHeight: '35px',
      borderRadius: '4px',
      border: '1px solid #d9d9d9',
      boxSizing: 'border-box',
      padding: ' 0 10px'
    },
    attr: {
      name: params.name,
      autocomplete: "off"
    },
    on: {
      focus: function focus(event, dom) {
        select.style.display = 'block';
        var value = dom.value || ''; // console.log(arr,"kkkk")

        creatOptions(select, options, inputDom, params);
      },
      blur: function blur() {
        select.style.display = 'none';
      },
      input: function input(event, dom) {
        event.stopPropagation();
        var value = dom.value || '';
        console.log(value, "jjjjj");
        var arr = value ? options.filter(function (currentValue) {
          return (currentValue.value + '').indexOf(value) != -1;
        }) : options;

        if (value) {
          arr.unshift({
            value: value,
            label: value
          });
        }

        creatOptions(select, arr, inputDom, params);
      }
    }
  });
  creatOptions(select, options, inputDom, params);

  if (isInput) {
    boxDom.appendChild(inputDom);
  }

  boxDom.appendChild(select);
  return boxDom;
};

exports.default = _default;

function creatOptions(select, options, inputDom, params) {
  select.innerHTML = '';
  options.map(function (item, index) {
    var everyOption = (0, _utils.creatDom)({
      tag: 'option',
      child: item.value,
      style: {
        display: 'block',
        cursor: 'pointer',
        boxSizing: 'border-box',
        padding: '8px 10px',
        height: '35px',
        background: '#fff'
      },
      attr: {
        value: item.value
      },
      on: {
        hover: function hover() {
          everyOption.style.background = "#e6f7ff";
        },
        mousedown: function mousedown(event, dom) {
          inputDom.value = everyOption.innerText;
          params.on.change(event, dom);
        }
      }
    });
    select.appendChild(everyOption);
  });
}
},{"../../../utils":"utils/index.js"}],"plugin/draw-editer/components/textarea.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = require("../../../utils");

var _this = void 0;

var _default = function _default(params) {
  var textareaDom = _utils.creatDom.call(_this, {
    tag: 'textarea',
    style: {
      display: 'block',
      width: '100%',
      height: '100px',
      borderRadius: '4px',
      border: '1px solid #d9d9d9'
    },
    attr: {
      name: params.name
    },
    on: params.on
  });

  return textareaDom;
};

exports.default = _default;
},{"../../../utils":"utils/index.js"}],"plugin/draw-editer/components/radio.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = require("../../../utils");

function radio() {}

var _default = function _default(params) {
  var lableDom = (0, _utils.creatDom)({
    tag: 'label',
    chlid: 'niho',
    style: {
      width: '30px',
      height: '30px',
      backgroundImage: "url(".concat(params.url, ")"),
      display: 'inline-block',
      backgroundSize: '100%',
      backgroundPosition: 'center'
    }
  });
  var radioDom = (0, _utils.creatDom)({
    tag: 'input',
    attr: {
      type: 'radio',
      name: params.name,
      value: params.value
    },
    on: {
      change: function change(event, dom) {
        boxDom.style.backgroundColor = "red";
        console.log(dom.checked, "jjj", event);
        params.on.change(event, dom);
      }
    },
    style: {
      width: '30px',
      height: '30px',
      display: 'inline-block',
      opacity: '0'
    }
  });
  lableDom.appendChild(radioDom);
  return boxDom;
};

exports.default = _default;
},{"../../../utils":"utils/index.js"}],"plugin/draw-editer/components/radio-button.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = require("../../../utils");

var _radio = _interopRequireDefault(require("./radio"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var options = [];

var render = function render(options, boxDom, params) {// console.log("mmmmn",options)
};

var _default = function _default(params) {
  options = [].concat(params.options);
  var inputDom = null;
  inputDom = (0, _utils.creatDom)({
    tag: 'input',
    attr: {
      name: params.name
    },
    style: {
      display: 'none'
    },
    on: {
      click: function click(event, dom) {
        event.stopPropagation();
        var value = dom.value;
        options.map(function (item) {
          if (value == item.value) {
            item.dom.style.backgroundColor = 'rgba(14,19,24,.07)';
          } else {
            item.dom.style.backgroundColor = '#FFF';
          }
        }); // params.on.change(event, dom)
      }
    }
  });
  var boxDom = (0, _utils.creatDom)({
    tag: 'div',
    style: {
      display: 'inline-block'
    }
  });
  boxDom.appendChild(inputDom);
  options = options.map(function (item) {
    var lableDom = (0, _utils.creatDom)({
      tag: 'label',
      chlid: '',
      attr: {
        value: item.value
      },
      data: {
        value: item.value
      },
      style: {
        width: '30px',
        height: '30px',
        backgroundImage: "url(".concat(item.url, ")"),
        display: 'inline-block',
        backgroundSize: '100%',
        backgroundPosition: 'center',
        borderRadius: '4px',
        cursor: 'pointer'
      },
      on: {
        click: function click(event, dom) {
          var value = dom.dataset.value;
          options.map(function (item) {
            if (value == item.value) {
              item.dom.style.backgroundColor = 'rgba(14,19,24,.07)';
            } else {
              item.dom.style.backgroundColor = '#FFF';
            }
          });
          params.on.change(value);
        }
      }
    });
    boxDom.appendChild(lableDom);
    item.dom = lableDom;
    return item;
  }); // new Proxy(boxDom,{
  //     set:function(target, key, value){
  //         console.log(value,"jjjjj")
  //     }
  // })

  render(options, boxDom, params);
  return boxDom;
};

exports.default = _default;
},{"../../../utils":"utils/index.js","./radio":"plugin/draw-editer/components/radio.js"}],"plugin/draw-editer/components/switched.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = require("../../../utils");

var _default = function _default(params) {
  var boxDom = null,
      inputDom = null;
  boxDom = (0, _utils.creatDom)({
    tag: 'div',
    data: {
      value: params.value
    },
    style: {
      display: 'inline-block',
      width: '30px',
      height: '30px',
      backgroundImage: "url(".concat(params.url, ")"),
      backgroundSize: '80%',
      backgroundPosition: 'center',
      borderRadius: '4px',
      backgroundRepeat: 'no-repeat',
      cursor: 'pointer'
    },
    on: {
      click: function click(event, dom) {
        var value = dom.dataset.value;

        if (value == params.value) {
          boxDom.style.backgroundColor = '#fff';
          dom.dataset.value = '';
        } else {
          boxDom.style.backgroundColor = 'rgba(14,19,24,.07)';
          dom.dataset.value = params.value;
        }

        params.on.change(dom.dataset.value);
      }
    }
  });
  inputDom = (0, _utils.creatDom)({
    tag: 'input',
    attr: {
      name: params.name
    },
    style: {
      display: 'none'
    },
    on: {
      click: function click(event, dom) {
        event.stopPropagation();
        var value = dom.value;

        if (value == params.value) {
          boxDom.style.backgroundColor = 'rgba(14,19,24,.07)';
        } else {
          boxDom.style.backgroundColor = '#fff';
        }
      }
    }
  });
  boxDom.appendChild(inputDom);
  return boxDom;
};

exports.default = _default;
},{"../../../utils":"utils/index.js"}],"plugin/draw-editer/components/color.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = require("../../../utils");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var rangeValue = 0.5;
var defaultRgb = (0, _utils.hsvToRgb)({
  h: rangeValue * 360,
  s: 100,
  v: 100
});
var defaultColor = "rgb(".concat(defaultRgb.r, ",").concat(defaultRgb.g, ",").concat(defaultRgb.b, ")");

var _default = function _default(params) {
  var _style, _style2;

  // console.log(params,":------")
  var hsv = {
    h: 0,
    s: 0,
    v: 0
  };
  var _mousedown = false;
  var boxDom = null,
      showColor = null,
      selectDom = null,
      showHex = null,
      svSelevt = null,
      gradientBlack = null,
      gradientWhite = null,
      rangeDom = null,
      hSelect = null,
      inputDom = null,
      colorPoint = null;
  boxDom = (0, _utils.creatDom)({
    tag: 'div',
    style: {
      position: 'relative',
      zIndex: 10
    }
  }); // console.log(params.name)

  inputDom = (0, _utils.creatDom)({
    tag: 'input',
    style: {
      display: 'none'
    },
    attr: {
      name: params.name
    },
    on: {
      click: function click(event, dom) {
        var value = dom.value;
        var rgbs = value.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
        var hsv = (0, _utils.rgbToHsv)({
          r: +rgbs[0],
          g: +rgbs[1],
          b: +rgbs[2]
        });
        showColor.style.background = value;
        rangeDom.value = hsv.h / 360;
        colorPoint.style.left = hsv.s * 268 / 100 + 'px';
        colorPoint.style.top = 112 - hsv.v * 112 / 100 + 'px';
      }
    }
  });
  showColor = (0, _utils.creatDom)({
    tag: 'div',
    style: {
      width: '50px',
      height: '30px',
      background: defaultColor,
      borderRadius: '4px',
      cursor: 'pointer'
    },
    on: {
      click: function click() {
        var display = selectDom.style.display;

        if (display == 'none') {
          selectDom.style.display = 'block';
        } else {
          selectDom.style.display = 'none';
        }
      }
    }
  });
  selectDom = (0, _utils.creatDom)({
    tag: 'div',
    style: (_style = {
      // height:'200px',
      width: '100%',
      position: 'absolute'
    }, _defineProperty(_style, "width", '268px'), _defineProperty(_style, "display", 'none'), _defineProperty(_style, "boxShadow", '0 0 0 1px rgba(14,19,24,.07), 0 2px 12px rgba(14,19,24,.2)'), _defineProperty(_style, "padding", '5px'), _defineProperty(_style, "marginTop", '5px'), _defineProperty(_style, "borderRadius", '4px'), _defineProperty(_style, "zIndex", 999), _style)
  });
  showHex = (0, _utils.creatDom)({
    tag: 'input',
    attr: {
      value: ''
    },
    style: (_style2 = {
      width: '100%'
    }, _defineProperty(_style2, "width", '268px'), _defineProperty(_style2, "background", '#fff'), _defineProperty(_style2, "borderColor", 'rgba(14,19,24,.2)'), _defineProperty(_style2, "borderRadius", '4px'), _defineProperty(_style2, "padding", '9px 12px 10px'), _defineProperty(_style2, "border", '1px solid rgba(14,19,24,.2)'), _defineProperty(_style2, "cursor", 'text'), _defineProperty(_style2, "textAlign", 'center'), _defineProperty(_style2, "boxSizing", 'border-box'), _defineProperty(_style2, "outline", 'none'), _defineProperty(_style2, "marginTop", '5px'), _style2),
    on: {
      input: function input(event, e) {
        var reg = /^[0-9a-zA-Z]*$/g;
        var value = e.value;

        if (reg.test(value)) {}
      }
    }
  });
  svSelevt = (0, _utils.creatDom)({
    tag: 'div',
    style: {
      position: 'relative',
      height: '112px',
      width: '268px',
      background: defaultColor,
      marginTop: '4px',
      borderRadius: '4px',
      overflow: 'hidden',
      cursor: 'pointer'
    },
    on: {
      mousedown: function mousedown(event, e) {
        _mousedown = true;
        var svDetail = svSelevt.getBoundingClientRect();
        var saturation = 100 * (event.clientX - svDetail.left) / 268; // console.log()

        var value = 100 * (svDetail.bottom - event.clientY) / 112; // console.log(value)

        colorPoint.style.left = event.clientX - svDetail.left + 'px';
        colorPoint.style.top = 112 - (svDetail.bottom - event.clientY) + 'px';
        hsv = {};

        var _hsvToRgb = (0, _utils.hsvToRgb)({
          h: rangeValue * 360,
          s: saturation,
          v: value
        }),
            r = _hsvToRgb.r,
            g = _hsvToRgb.g,
            b = _hsvToRgb.b;

        showColor.style.background = "rgb(".concat(r, ",").concat(g, ",").concat(b, ")");
        params.on.change(event, "rgb(".concat(r, ",").concat(g, ",").concat(b, ")"));
        showHex.value = (0, _utils.colorHex)("rgb(".concat(r, ",").concat(g, ",").concat(b, ")"));
      },
      mousemove: function mousemove() {
        if (!_mousedown) {
          return;
        }

        var svDetail = svSelevt.getBoundingClientRect();
        var saturation = 100 * (event.clientX - svDetail.left) / 268; // console.log()

        var value = 100 * (svDetail.bottom - event.clientY) / 112; // console.log(value)

        hsv = {
          h: rangeValue * 360,
          s: saturation,
          v: value
        };

        var _hsvToRgb2 = (0, _utils.hsvToRgb)(hsv),
            r = _hsvToRgb2.r,
            g = _hsvToRgb2.g,
            b = _hsvToRgb2.b;

        colorPoint.style.left = hsv.s * 268 / 100 + 'px';
        colorPoint.style.top = 112 - hsv.v * 112 / 100 + 'px';
        showColor.style.background = "rgb(".concat(r, ",").concat(g, ",").concat(b, ")");
        params.on.change(event, "rgb(".concat(r, ",").concat(g, ",").concat(b, ")"));
        showHex.value = (0, _utils.colorHex)("rgb(".concat(r, ",").concat(g, ",").concat(b, ")"));
      },
      mouseup: function mouseup() {
        _mousedown = false;
      } // height:

    }
  });
  gradientBlack = (0, _utils.creatDom)({
    tag: 'div',
    style: {
      width: '100%',
      height: '100%',
      background: 'linear-gradient(180deg,transparent 0,#000)',
      // borderRadius:'4px',
      position: 'absolute',
      // borderRadius:'4px',
      top: '0',
      left: '0',
      zIndex: 1,
      cursor: 'pointer',
      pointerEvents: 'none'
    }
  });
  gradientWhite = (0, _utils.creatDom)({
    tag: 'div',
    style: {
      width: '100%',
      height: '100%',
      background: 'linear-gradient(270deg,transparent 0,#fff)',
      position: 'absolute',
      // borderRadius:'4px',
      top: '0',
      left: '0',
      cursor: 'pointer',
      pointerEvents: 'none'
    }
  });
  colorPoint = (0, _utils.creatDom)({
    style: {
      position: 'absolute',
      borderRadius: ' 50%',
      border: ' 3px solid #fff',
      width: '14px',
      height: '14px',
      boxShadow: 'inset 0 0 0 1px rgba(14,19,24,.15)',
      transform: 'translateX(-50%) translateY(-50%)',
      zIndex: 10,
      pointerEvents: 'none',
      cursor: 'pointer'
    }
  });
  rangeDom = (0, _utils.creatDom)({
    tag: 'input',
    attr: {
      type: 'range',
      min: 0,
      max: 0.99,
      step: 0.01,
      value: rangeValue,
      defaultValue: rangeValue
    },
    style: {
      display: 'block',
      width: '101%',
      height: '10px',
      outline: 'none',
      marginLeft: '-1px'
    },
    on: {
      input: function input(event, e) {
        rangeValue = e.value; // console.log(rangeValue*360,"jjjj")

        hsv.h = rangeValue * 360;

        var _hsvToRgb3 = (0, _utils.hsvToRgb)({
          h: rangeValue * 360,
          s: 100,
          v: 100
        }),
            r = _hsvToRgb3.r,
            g = _hsvToRgb3.g,
            b = _hsvToRgb3.b;

        var showColorVal = (0, _utils.hsvToRgb)(hsv);
        svSelevt.style.background = "rgb(".concat(r, ",").concat(g, ",").concat(b, ")");
        showColor.style.background = "rgb(".concat(showColorVal.r, ",").concat(showColorVal.g, ",").concat(showColorVal.b, ")");
        params.on.change(event, "rgb(".concat(showColorVal.r, ",").concat(showColorVal.g, ",").concat(showColorVal.b, ")")); // console.log()
      }
    }
  });
  hSelect = (0, _utils.creatDom)({
    tag: 'div',
    style: {
      height: '10px',
      borderRadius: '10px',
      marginTop: '10px',
      background: 'linear-gradient(90deg,red,#ff2b00,#f50,#ff8000,#fa0,#ffd500,#ff0,#d4ff00,#af0,#80ff00,#5f0,#2bff00,#0f0,#00ff2b,#0f5,#00ff80,#0fa,#00ffd5,#0ff,#00d4ff,#0af,#007fff,#05f,#002bff,#00f,#2a00ff,#50f,#7f00ff,#a0f,#d400ff,#f0f,#ff00d4,#f0a,#ff0080,#f05,#ff002b)'
    }
  });
  svSelevt.appendChild(gradientBlack);
  svSelevt.appendChild(gradientWhite);
  svSelevt.appendChild(colorPoint);
  hSelect.appendChild(rangeDom);
  selectDom.appendChild(hSelect);
  selectDom.appendChild(svSelevt);
  boxDom.appendChild(showColor);
  boxDom.appendChild(selectDom);
  boxDom.appendChild(inputDom); // selectDom.appendChild(showHex)

  return boxDom;
};

exports.default = _default;
},{"../../../utils":"utils/index.js"}],"plugin/draw-editer/components/cropper.js":[function(require,module,exports) {
/*!
 * Cropper.js v1.5.1
 * https://fengyuanchen.github.io/cropperjs
 *
 * Copyright 2015-present Chen Fengyuan
 * Released under the MIT license
 *
 * Date: 2019-03-10T09:55:53.729Z
 */
'use strict';

function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

function _typeof(obj) {
  if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
    _typeof = function _typeof(obj) {
      return _typeof2(obj);
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

var IS_BROWSER = typeof window !== 'undefined';
var WINDOW = IS_BROWSER ? window : {};
var IS_TOUCH_DEVICE = IS_BROWSER ? 'ontouchstart' in WINDOW.document.documentElement : false;
var HAS_POINTER_EVENT = IS_BROWSER ? 'PointerEvent' in WINDOW : false;
var NAMESPACE = 'cropper'; // Actions

var ACTION_ALL = 'all';
var ACTION_CROP = 'crop';
var ACTION_MOVE = 'move';
var ACTION_ZOOM = 'zoom';
var ACTION_EAST = 'e';
var ACTION_WEST = 'w';
var ACTION_SOUTH = 's';
var ACTION_NORTH = 'n';
var ACTION_NORTH_EAST = 'ne';
var ACTION_NORTH_WEST = 'nw';
var ACTION_SOUTH_EAST = 'se';
var ACTION_SOUTH_WEST = 'sw'; // Classes

var CLASS_CROP = "".concat(NAMESPACE, "-crop");
var CLASS_DISABLED = "".concat(NAMESPACE, "-disabled");
var CLASS_HIDDEN = "".concat(NAMESPACE, "-hidden");
var CLASS_HIDE = "".concat(NAMESPACE, "-hide");
var CLASS_INVISIBLE = "".concat(NAMESPACE, "-invisible");
var CLASS_MODAL = "".concat(NAMESPACE, "-modal");
var CLASS_MOVE = "".concat(NAMESPACE, "-move"); // Data keys

var DATA_ACTION = "".concat(NAMESPACE, "Action");
var DATA_PREVIEW = "".concat(NAMESPACE, "Preview"); // Drag modes

var DRAG_MODE_CROP = 'crop';
var DRAG_MODE_MOVE = 'move';
var DRAG_MODE_NONE = 'none'; // Events

var EVENT_CROP = 'crop';
var EVENT_CROP_END = 'cropend';
var EVENT_CROP_MOVE = 'cropmove';
var EVENT_CROP_START = 'cropstart';
var EVENT_DBLCLICK = 'dblclick';
var EVENT_TOUCH_START = IS_TOUCH_DEVICE ? 'touchstart' : 'mousedown';
var EVENT_TOUCH_MOVE = IS_TOUCH_DEVICE ? 'touchmove' : 'mousemove';
var EVENT_TOUCH_END = IS_TOUCH_DEVICE ? 'touchend touchcancel' : 'mouseup';
var EVENT_POINTER_DOWN = HAS_POINTER_EVENT ? 'pointerdown' : EVENT_TOUCH_START;
var EVENT_POINTER_MOVE = HAS_POINTER_EVENT ? 'pointermove' : EVENT_TOUCH_MOVE;
var EVENT_POINTER_UP = HAS_POINTER_EVENT ? 'pointerup pointercancel' : EVENT_TOUCH_END;
var EVENT_READY = 'ready';
var EVENT_RESIZE = 'resize';
var EVENT_WHEEL = 'wheel';
var EVENT_ZOOM = 'zoom'; // Mime types

var MIME_TYPE_JPEG = 'image/jpeg'; // RegExps

var REGEXP_ACTIONS = /^e|w|s|n|se|sw|ne|nw|all|crop|move|zoom$/;
var REGEXP_DATA_URL_JPEG = /^data:image\/jpeg;base64,/;
var REGEXP_TAG_NAME = /^img|canvas$/i; // Misc
// Inspired by the default width and height of a canvas element.

var MIN_CONTAINER_WIDTH = 200;
var MIN_CONTAINER_HEIGHT = 100;
var DEFAULTS = {
  // Define the view mode of the cropper
  viewMode: 0,
  // 0, 1, 2, 3
  // Define the dragging mode of the cropper
  dragMode: DRAG_MODE_CROP,
  // 'crop', 'move' or 'none'
  // Define the initial aspect ratio of the crop box
  initialAspectRatio: NaN,
  // Define the aspect ratio of the crop box
  aspectRatio: NaN,
  // An object with the previous cropping result data
  data: null,
  // A selector for adding extra containers to preview
  preview: '',
  // Re-render the cropper when resize the window
  responsive: true,
  // Restore the cropped area after resize the window
  restore: true,
  // Check if the current image is a cross-origin image
  checkCrossOrigin: true,
  // Check the current image's Exif Orientation information
  checkOrientation: true,
  // Show the black modal
  modal: true,
  // Show the dashed lines for guiding
  guides: true,
  // Show the center indicator for guiding
  center: true,
  // Show the white modal to highlight the crop box
  highlight: true,
  // Show the grid background
  background: true,
  // Enable to crop the image automatically when initialize
  autoCrop: true,
  // Define the percentage of automatic cropping area when initializes
  autoCropArea: 0.8,
  // Enable to move the image
  movable: true,
  // Enable to rotate the image
  rotatable: true,
  // Enable to scale the image
  scalable: true,
  // Enable to zoom the image
  zoomable: true,
  // Enable to zoom the image by dragging touch
  zoomOnTouch: true,
  // Enable to zoom the image by wheeling mouse
  zoomOnWheel: true,
  // Define zoom ratio when zoom the image by wheeling mouse
  wheelZoomRatio: 0.1,
  // Enable to move the crop box
  cropBoxMovable: true,
  // Enable to resize the crop box
  cropBoxResizable: true,
  // Toggle drag mode between "crop" and "move" when click twice on the cropper
  toggleDragModeOnDblclick: true,
  // Size limitation
  minCanvasWidth: 0,
  minCanvasHeight: 0,
  minCropBoxWidth: 0,
  minCropBoxHeight: 0,
  minContainerWidth: 200,
  minContainerHeight: 100,
  // Shortcuts of events
  ready: null,
  cropstart: null,
  cropmove: null,
  cropend: null,
  crop: null,
  zoom: null
};
var TEMPLATE = '<div class="cropper-container" touch-action="none">' + '<div class="cropper-wrap-box">' + '<div class="cropper-canvas"></div>' + '</div>' + '<div class="cropper-drag-box"></div>' + '<div class="cropper-crop-box">' + '<span class="cropper-view-box"></span>' + '<span class="cropper-dashed dashed-h"></span>' + '<span class="cropper-dashed dashed-v"></span>' + '<span class="cropper-center"></span>' + '<span class="cropper-face"></span>' + '<span class="cropper-line line-e" data-cropper-action="e"></span>' + '<span class="cropper-line line-n" data-cropper-action="n"></span>' + '<span class="cropper-line line-w" data-cropper-action="w"></span>' + '<span class="cropper-line line-s" data-cropper-action="s"></span>' + '<span class="cropper-point point-e" data-cropper-action="e"></span>' + '<span class="cropper-point point-n" data-cropper-action="n"></span>' + '<span class="cropper-point point-w" data-cropper-action="w"></span>' + '<span class="cropper-point point-s" data-cropper-action="s"></span>' + '<span class="cropper-point point-ne" data-cropper-action="ne"></span>' + '<span class="cropper-point point-nw" data-cropper-action="nw"></span>' + '<span class="cropper-point point-sw" data-cropper-action="sw"></span>' + '<span class="cropper-point point-se" data-cropper-action="se"></span>' + '</div>' + '</div>';
/**
 * Check if the given value is not a number.
 */

var isNaN = Number.isNaN || WINDOW.isNaN;
/**
 * Check if the given value is a number.
 * @param {*} value - The value to check.
 * @returns {boolean} Returns `true` if the given value is a number, else `false`.
 */

function isNumber(value) {
  return typeof value === 'number' && !isNaN(value);
}
/**
 * Check if the given value is a positive number.
 * @param {*} value - The value to check.
 * @returns {boolean} Returns `true` if the given value is a positive number, else `false`.
 */


var isPositiveNumber = function isPositiveNumber(value) {
  return value > 0 && value < Infinity;
};
/**
 * Check if the given value is undefined.
 * @param {*} value - The value to check.
 * @returns {boolean} Returns `true` if the given value is undefined, else `false`.
 */


function isUndefined(value) {
  return typeof value === 'undefined';
}
/**
 * Check if the given value is an object.
 * @param {*} value - The value to check.
 * @returns {boolean} Returns `true` if the given value is an object, else `false`.
 */


function isObject(value) {
  return _typeof(value) === 'object' && value !== null;
}

var hasOwnProperty = Object.prototype.hasOwnProperty;
/**
 * Check if the given value is a plain object.
 * @param {*} value - The value to check.
 * @returns {boolean} Returns `true` if the given value is a plain object, else `false`.
 */

function isPlainObject(value) {
  if (!isObject(value)) {
    return false;
  }

  try {
    var _constructor = value.constructor;
    var prototype = _constructor.prototype;
    return _constructor && prototype && hasOwnProperty.call(prototype, 'isPrototypeOf');
  } catch (error) {
    return false;
  }
}
/**
 * Check if the given value is a function.
 * @param {*} value - The value to check.
 * @returns {boolean} Returns `true` if the given value is a function, else `false`.
 */


function isFunction(value) {
  return typeof value === 'function';
}

var slice = Array.prototype.slice;
/**
 * Convert array-like or iterable object to an array.
 * @param {*} value - The value to convert.
 * @returns {Array} Returns a new array.
 */

function toArray(value) {
  return Array.from ? Array.from(value) : slice.call(value);
}
/**
 * Iterate the given data.
 * @param {*} data - The data to iterate.
 * @param {Function} callback - The process function for each element.
 * @returns {*} The original data.
 */


function forEach(data, callback) {
  if (data && isFunction(callback)) {
    if (Array.isArray(data) || isNumber(data.length)
    /* array-like */
    ) {
        toArray(data).forEach(function (value, key) {
          callback.call(data, value, key, data);
        });
      } else if (isObject(data)) {
      Object.keys(data).forEach(function (key) {
        callback.call(data, data[key], key, data);
      });
    }
  }

  return data;
}
/**
 * Extend the given object.
 * @param {*} target - The target object to extend.
 * @param {*} args - The rest objects for merging to the target object.
 * @returns {Object} The extended object.
 */


var assign = Object.assign || function assign(target) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  if (isObject(target) && args.length > 0) {
    args.forEach(function (arg) {
      if (isObject(arg)) {
        Object.keys(arg).forEach(function (key) {
          target[key] = arg[key];
        });
      }
    });
  }

  return target;
};

var REGEXP_DECIMALS = /\.\d*(?:0|9){12}\d*$/;
/**
 * Normalize decimal number.
 * Check out {@link http://0.30000000000000004.com/}
 * @param {number} value - The value to normalize.
 * @param {number} [times=100000000000] - The times for normalizing.
 * @returns {number} Returns the normalized number.
 */

function normalizeDecimalNumber(value) {
  var times = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100000000000;
  return REGEXP_DECIMALS.test(value) ? Math.round(value * times) / times : value;
}

var REGEXP_SUFFIX = /^width|height|left|top|marginLeft|marginTop$/;
/**
 * Apply styles to the given element.
 * @param {Element} element - The target element.
 * @param {Object} styles - The styles for applying.
 */

function setStyle(element, styles) {
  var style = element.style;
  forEach(styles, function (value, property) {
    if (REGEXP_SUFFIX.test(property) && isNumber(value)) {
      value = "".concat(value, "px");
    }

    style[property] = value;
  });
}
/**
 * Check if the given element has a special class.
 * @param {Element} element - The element to check.
 * @param {string} value - The class to search.
 * @returns {boolean} Returns `true` if the special class was found.
 */


function hasClass(element, value) {
  return element.classList ? element.classList.contains(value) : element.className.indexOf(value) > -1;
}
/**
 * Add classes to the given element.
 * @param {Element} element - The target element.
 * @param {string} value - The classes to be added.
 */


function addClass(element, value) {
  if (!value) {
    return;
  }

  if (isNumber(element.length)) {
    forEach(element, function (elem) {
      addClass(elem, value);
    });
    return;
  }

  if (element.classList) {
    element.classList.add(value);
    return;
  }

  var className = element.className.trim();

  if (!className) {
    element.className = value;
  } else if (className.indexOf(value) < 0) {
    element.className = "".concat(className, " ").concat(value);
  }
}
/**
 * Remove classes from the given element.
 * @param {Element} element - The target element.
 * @param {string} value - The classes to be removed.
 */


function removeClass(element, value) {
  if (!value) {
    return;
  }

  if (isNumber(element.length)) {
    forEach(element, function (elem) {
      removeClass(elem, value);
    });
    return;
  }

  if (element.classList) {
    element.classList.remove(value);
    return;
  }

  if (element.className.indexOf(value) >= 0) {
    element.className = element.className.replace(value, '');
  }
}
/**
 * Add or remove classes from the given element.
 * @param {Element} element - The target element.
 * @param {string} value - The classes to be toggled.
 * @param {boolean} added - Add only.
 */


function toggleClass(element, value, added) {
  if (!value) {
    return;
  }

  if (isNumber(element.length)) {
    forEach(element, function (elem) {
      toggleClass(elem, value, added);
    });
    return;
  } // IE10-11 doesn't support the second parameter of `classList.toggle`


  if (added) {
    addClass(element, value);
  } else {
    removeClass(element, value);
  }
}

var REGEXP_CAMEL_CASE = /([a-z\d])([A-Z])/g;
/**
 * Transform the given string from camelCase to kebab-case
 * @param {string} value - The value to transform.
 * @returns {string} The transformed value.
 */

function toParamCase(value) {
  return value.replace(REGEXP_CAMEL_CASE, '$1-$2').toLowerCase();
}
/**
 * Get data from the given element.
 * @param {Element} element - The target element.
 * @param {string} name - The data key to get.
 * @returns {string} The data value.
 */


function getData(element, name) {
  if (isObject(element[name])) {
    return element[name];
  }

  if (element.dataset) {
    return element.dataset[name];
  }

  return element.getAttribute("data-".concat(toParamCase(name)));
}
/**
 * Set data to the given element.
 * @param {Element} element - The target element.
 * @param {string} name - The data key to set.
 * @param {string} data - The data value.
 */


function setData(element, name, data) {
  if (isObject(data)) {
    element[name] = data;
  } else if (element.dataset) {
    element.dataset[name] = data;
  } else {
    element.setAttribute("data-".concat(toParamCase(name)), data);
  }
}
/**
 * Remove data from the given element.
 * @param {Element} element - The target element.
 * @param {string} name - The data key to remove.
 */


function removeData(element, name) {
  if (isObject(element[name])) {
    try {
      delete element[name];
    } catch (error) {
      element[name] = undefined;
    }
  } else if (element.dataset) {
    // #128 Safari not allows to delete dataset property
    try {
      delete element.dataset[name];
    } catch (error) {
      element.dataset[name] = undefined;
    }
  } else {
    element.removeAttribute("data-".concat(toParamCase(name)));
  }
}

var REGEXP_SPACES = /\s\s*/;

var onceSupported = function () {
  var supported = false;

  if (IS_BROWSER) {
    var once = false;

    var listener = function listener() {};

    var options = Object.defineProperty({}, 'once', {
      get: function get() {
        supported = true;
        return once;
      },

      /**
       * This setter can fix a `TypeError` in strict mode
       * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Getter_only}
       * @param {boolean} value - The value to set
       */
      set: function set(value) {
        once = value;
      }
    });
    WINDOW.addEventListener('test', listener, options);
    WINDOW.removeEventListener('test', listener, options);
  }

  return supported;
}();
/**
 * Remove event listener from the target element.
 * @param {Element} element - The event target.
 * @param {string} type - The event type(s).
 * @param {Function} listener - The event listener.
 * @param {Object} options - The event options.
 */


function removeListener(element, type, listener) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var handler = listener;
  type.trim().split(REGEXP_SPACES).forEach(function (event) {
    if (!onceSupported) {
      var listeners = element.listeners;

      if (listeners && listeners[event] && listeners[event][listener]) {
        handler = listeners[event][listener];
        delete listeners[event][listener];

        if (Object.keys(listeners[event]).length === 0) {
          delete listeners[event];
        }

        if (Object.keys(listeners).length === 0) {
          delete element.listeners;
        }
      }
    }

    element.removeEventListener(event, handler, options);
  });
}
/**
 * Add event listener to the target element.
 * @param {Element} element - The event target.
 * @param {string} type - The event type(s).
 * @param {Function} listener - The event listener.
 * @param {Object} options - The event options.
 */


function addListener(element, type, listener) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var _handler = listener;
  type.trim().split(REGEXP_SPACES).forEach(function (event) {
    if (options.once && !onceSupported) {
      var _element$listeners = element.listeners,
          listeners = _element$listeners === void 0 ? {} : _element$listeners;

      _handler = function handler() {
        delete listeners[event][listener];
        element.removeEventListener(event, _handler, options);

        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        listener.apply(element, args);
      };

      if (!listeners[event]) {
        listeners[event] = {};
      }

      if (listeners[event][listener]) {
        element.removeEventListener(event, listeners[event][listener], options);
      }

      listeners[event][listener] = _handler;
      element.listeners = listeners;
    }

    element.addEventListener(event, _handler, options);
  });
}
/**
 * Dispatch event on the target element.
 * @param {Element} element - The event target.
 * @param {string} type - The event type(s).
 * @param {Object} data - The additional event data.
 * @returns {boolean} Indicate if the event is default prevented or not.
 */


function dispatchEvent(element, type, data) {
  var event; // Event and CustomEvent on IE9-11 are global objects, not constructors

  if (isFunction(Event) && isFunction(CustomEvent)) {
    event = new CustomEvent(type, {
      detail: data,
      bubbles: true,
      cancelable: true
    });
  } else {
    event = document.createEvent('CustomEvent');
    event.initCustomEvent(type, true, true, data);
  }

  return element.dispatchEvent(event);
}
/**
 * Get the offset base on the document.
 * @param {Element} element - The target element.
 * @returns {Object} The offset data.
 */


function getOffset(element) {
  var box = element.getBoundingClientRect();
  return {
    left: box.left + (window.pageXOffset - document.documentElement.clientLeft),
    top: box.top + (window.pageYOffset - document.documentElement.clientTop)
  };
}

var location = WINDOW.location;
var REGEXP_ORIGINS = /^(\w+:)\/\/([^:/?#]*):?(\d*)/i;
/**
 * Check if the given URL is a cross origin URL.
 * @param {string} url - The target URL.
 * @returns {boolean} Returns `true` if the given URL is a cross origin URL, else `false`.
 */

function isCrossOriginURL(url) {
  var parts = url.match(REGEXP_ORIGINS);
  return parts !== null && (parts[1] !== location.protocol || parts[2] !== location.hostname || parts[3] !== location.port);
}
/**
 * Add timestamp to the given URL.
 * @param {string} url - The target URL.
 * @returns {string} The result URL.
 */


function addTimestamp(url) {
  var timestamp = "timestamp=".concat(new Date().getTime());
  return url + (url.indexOf('?') === -1 ? '?' : '&') + timestamp;
}
/**
 * Get transforms base on the given object.
 * @param {Object} obj - The target object.
 * @returns {string} A string contains transform values.
 */


function getTransforms(_ref) {
  var rotate = _ref.rotate,
      scaleX = _ref.scaleX,
      scaleY = _ref.scaleY,
      translateX = _ref.translateX,
      translateY = _ref.translateY;
  var values = [];

  if (isNumber(translateX) && translateX !== 0) {
    values.push("translateX(".concat(translateX, "px)"));
  }

  if (isNumber(translateY) && translateY !== 0) {
    values.push("translateY(".concat(translateY, "px)"));
  } // Rotate should come first before scale to match orientation transform


  if (isNumber(rotate) && rotate !== 0) {
    values.push("rotate(".concat(rotate, "deg)"));
  }

  if (isNumber(scaleX) && scaleX !== 1) {
    values.push("scaleX(".concat(scaleX, ")"));
  }

  if (isNumber(scaleY) && scaleY !== 1) {
    values.push("scaleY(".concat(scaleY, ")"));
  }

  var transform = values.length ? values.join(' ') : 'none';
  return {
    WebkitTransform: transform,
    msTransform: transform,
    transform: transform
  };
}
/**
 * Get the max ratio of a group of pointers.
 * @param {string} pointers - The target pointers.
 * @returns {number} The result ratio.
 */


function getMaxZoomRatio(pointers) {
  var pointers2 = assign({}, pointers);
  var ratios = [];
  forEach(pointers, function (pointer, pointerId) {
    delete pointers2[pointerId];
    forEach(pointers2, function (pointer2) {
      var x1 = Math.abs(pointer.startX - pointer2.startX);
      var y1 = Math.abs(pointer.startY - pointer2.startY);
      var x2 = Math.abs(pointer.endX - pointer2.endX);
      var y2 = Math.abs(pointer.endY - pointer2.endY);
      var z1 = Math.sqrt(x1 * x1 + y1 * y1);
      var z2 = Math.sqrt(x2 * x2 + y2 * y2);
      var ratio = (z2 - z1) / z1;
      ratios.push(ratio);
    });
  });
  ratios.sort(function (a, b) {
    return Math.abs(a) < Math.abs(b);
  });
  return ratios[0];
}
/**
 * Get a pointer from an event object.
 * @param {Object} event - The target event object.
 * @param {boolean} endOnly - Indicates if only returns the end point coordinate or not.
 * @returns {Object} The result pointer contains start and/or end point coordinates.
 */


function getPointer(_ref2, endOnly) {
  var pageX = _ref2.pageX,
      pageY = _ref2.pageY;
  var end = {
    endX: pageX,
    endY: pageY
  };
  return endOnly ? end : assign({
    startX: pageX,
    startY: pageY
  }, end);
}
/**
 * Get the center point coordinate of a group of pointers.
 * @param {Object} pointers - The target pointers.
 * @returns {Object} The center point coordinate.
 */


function getPointersCenter(pointers) {
  var pageX = 0;
  var pageY = 0;
  var count = 0;
  forEach(pointers, function (_ref3) {
    var startX = _ref3.startX,
        startY = _ref3.startY;
    pageX += startX;
    pageY += startY;
    count += 1;
  });
  pageX /= count;
  pageY /= count;
  return {
    pageX: pageX,
    pageY: pageY
  };
}
/**
 * Get the max sizes in a rectangle under the given aspect ratio.
 * @param {Object} data - The original sizes.
 * @param {string} [type='contain'] - The adjust type.
 * @returns {Object} The result sizes.
 */


function getAdjustedSizes(_ref4) // or 'cover'
{
  var aspectRatio = _ref4.aspectRatio,
      height = _ref4.height,
      width = _ref4.width;
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'contain';
  var isValidWidth = isPositiveNumber(width);
  var isValidHeight = isPositiveNumber(height);

  if (isValidWidth && isValidHeight) {
    var adjustedWidth = height * aspectRatio;

    if (type === 'contain' && adjustedWidth > width || type === 'cover' && adjustedWidth < width) {
      height = width / aspectRatio;
    } else {
      width = height * aspectRatio;
    }
  } else if (isValidWidth) {
    height = width / aspectRatio;
  } else if (isValidHeight) {
    width = height * aspectRatio;
  }

  return {
    width: width,
    height: height
  };
}
/**
 * Get the new sizes of a rectangle after rotated.
 * @param {Object} data - The original sizes.
 * @returns {Object} The result sizes.
 */


function getRotatedSizes(_ref5) {
  var width = _ref5.width,
      height = _ref5.height,
      degree = _ref5.degree;
  degree = Math.abs(degree) % 180;

  if (degree === 90) {
    return {
      width: height,
      height: width
    };
  }

  var arc = degree % 90 * Math.PI / 180;
  var sinArc = Math.sin(arc);
  var cosArc = Math.cos(arc);
  var newWidth = width * cosArc + height * sinArc;
  var newHeight = width * sinArc + height * cosArc;
  return degree > 90 ? {
    width: newHeight,
    height: newWidth
  } : {
    width: newWidth,
    height: newHeight
  };
}
/**
 * Get a canvas which drew the given image.
 * @param {HTMLImageElement} image - The image for drawing.
 * @param {Object} imageData - The image data.
 * @param {Object} canvasData - The canvas data.
 * @param {Object} options - The options.
 * @returns {HTMLCanvasElement} The result canvas.
 */


function getSourceCanvas(image, _ref6, _ref7, _ref8) {
  var imageAspectRatio = _ref6.aspectRatio,
      imageNaturalWidth = _ref6.naturalWidth,
      imageNaturalHeight = _ref6.naturalHeight,
      _ref6$rotate = _ref6.rotate,
      rotate = _ref6$rotate === void 0 ? 0 : _ref6$rotate,
      _ref6$scaleX = _ref6.scaleX,
      scaleX = _ref6$scaleX === void 0 ? 1 : _ref6$scaleX,
      _ref6$scaleY = _ref6.scaleY,
      scaleY = _ref6$scaleY === void 0 ? 1 : _ref6$scaleY;
  var aspectRatio = _ref7.aspectRatio,
      naturalWidth = _ref7.naturalWidth,
      naturalHeight = _ref7.naturalHeight;
  var _ref8$fillColor = _ref8.fillColor,
      fillColor = _ref8$fillColor === void 0 ? 'transparent' : _ref8$fillColor,
      _ref8$imageSmoothingE = _ref8.imageSmoothingEnabled,
      imageSmoothingEnabled = _ref8$imageSmoothingE === void 0 ? true : _ref8$imageSmoothingE,
      _ref8$imageSmoothingQ = _ref8.imageSmoothingQuality,
      imageSmoothingQuality = _ref8$imageSmoothingQ === void 0 ? 'low' : _ref8$imageSmoothingQ,
      _ref8$maxWidth = _ref8.maxWidth,
      maxWidth = _ref8$maxWidth === void 0 ? Infinity : _ref8$maxWidth,
      _ref8$maxHeight = _ref8.maxHeight,
      maxHeight = _ref8$maxHeight === void 0 ? Infinity : _ref8$maxHeight,
      _ref8$minWidth = _ref8.minWidth,
      minWidth = _ref8$minWidth === void 0 ? 0 : _ref8$minWidth,
      _ref8$minHeight = _ref8.minHeight,
      minHeight = _ref8$minHeight === void 0 ? 0 : _ref8$minHeight;
  var canvas = document.createElement('canvas');
  var context = canvas.getContext('2d');
  var maxSizes = getAdjustedSizes({
    aspectRatio: aspectRatio,
    width: maxWidth,
    height: maxHeight
  });
  var minSizes = getAdjustedSizes({
    aspectRatio: aspectRatio,
    width: minWidth,
    height: minHeight
  }, 'cover');
  var width = Math.min(maxSizes.width, Math.max(minSizes.width, naturalWidth));
  var height = Math.min(maxSizes.height, Math.max(minSizes.height, naturalHeight)); // Note: should always use image's natural sizes for drawing as
  // imageData.naturalWidth === canvasData.naturalHeight when rotate % 180 === 90

  var destMaxSizes = getAdjustedSizes({
    aspectRatio: imageAspectRatio,
    width: maxWidth,
    height: maxHeight
  });
  var destMinSizes = getAdjustedSizes({
    aspectRatio: imageAspectRatio,
    width: minWidth,
    height: minHeight
  }, 'cover');
  var destWidth = Math.min(destMaxSizes.width, Math.max(destMinSizes.width, imageNaturalWidth));
  var destHeight = Math.min(destMaxSizes.height, Math.max(destMinSizes.height, imageNaturalHeight));
  var params = [-destWidth / 2, -destHeight / 2, destWidth, destHeight];
  canvas.width = normalizeDecimalNumber(width);
  canvas.height = normalizeDecimalNumber(height);
  context.fillStyle = fillColor;
  context.fillRect(0, 0, width, height);
  context.save();
  context.translate(width / 2, height / 2);
  context.rotate(rotate * Math.PI / 180);
  context.scale(scaleX, scaleY);
  context.imageSmoothingEnabled = imageSmoothingEnabled;
  context.imageSmoothingQuality = imageSmoothingQuality;
  context.drawImage.apply(context, [image].concat(_toConsumableArray(params.map(function (param) {
    return Math.floor(normalizeDecimalNumber(param));
  }))));
  context.restore();
  return canvas;
}

var fromCharCode = String.fromCharCode;
/**
 * Get string from char code in data view.
 * @param {DataView} dataView - The data view for read.
 * @param {number} start - The start index.
 * @param {number} length - The read length.
 * @returns {string} The read result.
 */

function getStringFromCharCode(dataView, start, length) {
  var str = '';
  length += start;

  for (var i = start; i < length; i += 1) {
    str += fromCharCode(dataView.getUint8(i));
  }

  return str;
}

var REGEXP_DATA_URL_HEAD = /^data:.*,/;
/**
 * Transform Data URL to array buffer.
 * @param {string} dataURL - The Data URL to transform.
 * @returns {ArrayBuffer} The result array buffer.
 */

function dataURLToArrayBuffer(dataURL) {
  var base64 = dataURL.replace(REGEXP_DATA_URL_HEAD, '');
  var binary = atob(base64);
  var arrayBuffer = new ArrayBuffer(binary.length);
  var uint8 = new Uint8Array(arrayBuffer);
  forEach(uint8, function (value, i) {
    uint8[i] = binary.charCodeAt(i);
  });
  return arrayBuffer;
}
/**
 * Transform array buffer to Data URL.
 * @param {ArrayBuffer} arrayBuffer - The array buffer to transform.
 * @param {string} mimeType - The mime type of the Data URL.
 * @returns {string} The result Data URL.
 */


function arrayBufferToDataURL(arrayBuffer, mimeType) {
  var chunks = []; // Chunk Typed Array for better performance (#435)

  var chunkSize = 8192;
  var uint8 = new Uint8Array(arrayBuffer);

  while (uint8.length > 0) {
    // XXX: Babel's `toConsumableArray` helper will throw error in IE or Safari 9
    // eslint-disable-next-line prefer-spread
    chunks.push(fromCharCode.apply(null, toArray(uint8.subarray(0, chunkSize))));
    uint8 = uint8.subarray(chunkSize);
  }

  return "data:".concat(mimeType, ";base64,").concat(btoa(chunks.join('')));
}
/**
 * Get orientation value from given array buffer.
 * @param {ArrayBuffer} arrayBuffer - The array buffer to read.
 * @returns {number} The read orientation value.
 */


function resetAndGetOrientation(arrayBuffer) {
  var dataView = new DataView(arrayBuffer);
  var orientation; // Ignores range error when the image does not have correct Exif information

  try {
    var littleEndian;
    var app1Start;
    var ifdStart; // Only handle JPEG image (start by 0xFFD8)

    if (dataView.getUint8(0) === 0xFF && dataView.getUint8(1) === 0xD8) {
      var length = dataView.byteLength;
      var offset = 2;

      while (offset + 1 < length) {
        if (dataView.getUint8(offset) === 0xFF && dataView.getUint8(offset + 1) === 0xE1) {
          app1Start = offset;
          break;
        }

        offset += 1;
      }
    }

    if (app1Start) {
      var exifIDCode = app1Start + 4;
      var tiffOffset = app1Start + 10;

      if (getStringFromCharCode(dataView, exifIDCode, 4) === 'Exif') {
        var endianness = dataView.getUint16(tiffOffset);
        littleEndian = endianness === 0x4949;

        if (littleEndian || endianness === 0x4D4D
        /* bigEndian */
        ) {
            if (dataView.getUint16(tiffOffset + 2, littleEndian) === 0x002A) {
              var firstIFDOffset = dataView.getUint32(tiffOffset + 4, littleEndian);

              if (firstIFDOffset >= 0x00000008) {
                ifdStart = tiffOffset + firstIFDOffset;
              }
            }
          }
      }
    }

    if (ifdStart) {
      var _length = dataView.getUint16(ifdStart, littleEndian);

      var _offset;

      var i;

      for (i = 0; i < _length; i += 1) {
        _offset = ifdStart + i * 12 + 2;

        if (dataView.getUint16(_offset, littleEndian) === 0x0112
        /* Orientation */
        ) {
            // 8 is the offset of the current tag's value
            _offset += 8; // Get the original orientation value

            orientation = dataView.getUint16(_offset, littleEndian); // Override the orientation with its default value

            dataView.setUint16(_offset, 1, littleEndian);
            break;
          }
      }
    }
  } catch (error) {
    orientation = 1;
  }

  return orientation;
}
/**
 * Parse Exif Orientation value.
 * @param {number} orientation - The orientation to parse.
 * @returns {Object} The parsed result.
 */


function parseOrientation(orientation) {
  var rotate = 0;
  var scaleX = 1;
  var scaleY = 1;

  switch (orientation) {
    // Flip horizontal
    case 2:
      scaleX = -1;
      break;
    // Rotate left 180°

    case 3:
      rotate = -180;
      break;
    // Flip vertical

    case 4:
      scaleY = -1;
      break;
    // Flip vertical and rotate right 90°

    case 5:
      rotate = 90;
      scaleY = -1;
      break;
    // Rotate right 90°

    case 6:
      rotate = 90;
      break;
    // Flip horizontal and rotate right 90°

    case 7:
      rotate = 90;
      scaleX = -1;
      break;
    // Rotate left 90°

    case 8:
      rotate = -90;
      break;

    default:
  }

  return {
    rotate: rotate,
    scaleX: scaleX,
    scaleY: scaleY
  };
}

var render = {
  render: function render() {
    this.initContainer();
    this.initCanvas();
    this.initCropBox();
    this.renderCanvas();

    if (this.cropped) {
      this.renderCropBox();
    }
  },
  initContainer: function initContainer() {
    var element = this.element,
        options = this.options,
        container = this.container,
        cropper = this.cropper;
    addClass(cropper, CLASS_HIDDEN);
    removeClass(element, CLASS_HIDDEN);
    var containerData = {
      width: Math.max(container.offsetWidth, Number(options.minContainerWidth) || 200),
      height: Math.max(container.offsetHeight, Number(options.minContainerHeight) || 100)
    };
    this.containerData = containerData;
    setStyle(cropper, {
      width: containerData.width,
      height: containerData.height
    });
    addClass(element, CLASS_HIDDEN);
    removeClass(cropper, CLASS_HIDDEN);
  },
  // Canvas (image wrapper)
  initCanvas: function initCanvas() {
    var containerData = this.containerData,
        imageData = this.imageData;
    var viewMode = this.options.viewMode;
    var rotated = Math.abs(imageData.rotate) % 180 === 90;
    var naturalWidth = rotated ? imageData.naturalHeight : imageData.naturalWidth;
    var naturalHeight = rotated ? imageData.naturalWidth : imageData.naturalHeight;
    var aspectRatio = naturalWidth / naturalHeight;
    var canvasWidth = containerData.width;
    var canvasHeight = containerData.height;

    if (containerData.height * aspectRatio > containerData.width) {
      if (viewMode === 3) {
        canvasWidth = containerData.height * aspectRatio;
      } else {
        canvasHeight = containerData.width / aspectRatio;
      }
    } else if (viewMode === 3) {
      canvasHeight = containerData.width / aspectRatio;
    } else {
      canvasWidth = containerData.height * aspectRatio;
    }

    var canvasData = {
      aspectRatio: aspectRatio,
      naturalWidth: naturalWidth,
      naturalHeight: naturalHeight,
      width: canvasWidth,
      height: canvasHeight
    };
    canvasData.left = (containerData.width - canvasWidth) / 2;
    canvasData.top = (containerData.height - canvasHeight) / 2;
    canvasData.oldLeft = canvasData.left;
    canvasData.oldTop = canvasData.top;
    this.canvasData = canvasData;
    this.limited = viewMode === 1 || viewMode === 2;
    this.limitCanvas(true, true);
    this.initialImageData = assign({}, imageData);
    this.initialCanvasData = assign({}, canvasData);
  },
  limitCanvas: function limitCanvas(sizeLimited, positionLimited) {
    var options = this.options,
        containerData = this.containerData,
        canvasData = this.canvasData,
        cropBoxData = this.cropBoxData;
    var viewMode = options.viewMode;
    var aspectRatio = canvasData.aspectRatio;
    var cropped = this.cropped && cropBoxData;

    if (sizeLimited) {
      var minCanvasWidth = Number(options.minCanvasWidth) || 0;
      var minCanvasHeight = Number(options.minCanvasHeight) || 0;

      if (viewMode > 1) {
        minCanvasWidth = Math.max(minCanvasWidth, containerData.width);
        minCanvasHeight = Math.max(minCanvasHeight, containerData.height);

        if (viewMode === 3) {
          if (minCanvasHeight * aspectRatio > minCanvasWidth) {
            minCanvasWidth = minCanvasHeight * aspectRatio;
          } else {
            minCanvasHeight = minCanvasWidth / aspectRatio;
          }
        }
      } else if (viewMode > 0) {
        if (minCanvasWidth) {
          minCanvasWidth = Math.max(minCanvasWidth, cropped ? cropBoxData.width : 0);
        } else if (minCanvasHeight) {
          minCanvasHeight = Math.max(minCanvasHeight, cropped ? cropBoxData.height : 0);
        } else if (cropped) {
          minCanvasWidth = cropBoxData.width;
          minCanvasHeight = cropBoxData.height;

          if (minCanvasHeight * aspectRatio > minCanvasWidth) {
            minCanvasWidth = minCanvasHeight * aspectRatio;
          } else {
            minCanvasHeight = minCanvasWidth / aspectRatio;
          }
        }
      }

      var _getAdjustedSizes = getAdjustedSizes({
        aspectRatio: aspectRatio,
        width: minCanvasWidth,
        height: minCanvasHeight
      });

      minCanvasWidth = _getAdjustedSizes.width;
      minCanvasHeight = _getAdjustedSizes.height;
      canvasData.minWidth = minCanvasWidth;
      canvasData.minHeight = minCanvasHeight;
      canvasData.maxWidth = Infinity;
      canvasData.maxHeight = Infinity;
    }

    if (positionLimited) {
      if (viewMode > (cropped ? 0 : 1)) {
        var newCanvasLeft = containerData.width - canvasData.width;
        var newCanvasTop = containerData.height - canvasData.height;
        canvasData.minLeft = Math.min(0, newCanvasLeft);
        canvasData.minTop = Math.min(0, newCanvasTop);
        canvasData.maxLeft = Math.max(0, newCanvasLeft);
        canvasData.maxTop = Math.max(0, newCanvasTop);

        if (cropped && this.limited) {
          canvasData.minLeft = Math.min(cropBoxData.left, cropBoxData.left + (cropBoxData.width - canvasData.width));
          canvasData.minTop = Math.min(cropBoxData.top, cropBoxData.top + (cropBoxData.height - canvasData.height));
          canvasData.maxLeft = cropBoxData.left;
          canvasData.maxTop = cropBoxData.top;

          if (viewMode === 2) {
            if (canvasData.width >= containerData.width) {
              canvasData.minLeft = Math.min(0, newCanvasLeft);
              canvasData.maxLeft = Math.max(0, newCanvasLeft);
            }

            if (canvasData.height >= containerData.height) {
              canvasData.minTop = Math.min(0, newCanvasTop);
              canvasData.maxTop = Math.max(0, newCanvasTop);
            }
          }
        }
      } else {
        canvasData.minLeft = -canvasData.width;
        canvasData.minTop = -canvasData.height;
        canvasData.maxLeft = containerData.width;
        canvasData.maxTop = containerData.height;
      }
    }
  },
  renderCanvas: function renderCanvas(changed, transformed) {
    var canvasData = this.canvasData,
        imageData = this.imageData;

    if (transformed) {
      var _getRotatedSizes = getRotatedSizes({
        width: imageData.naturalWidth * Math.abs(imageData.scaleX || 1),
        height: imageData.naturalHeight * Math.abs(imageData.scaleY || 1),
        degree: imageData.rotate || 0
      }),
          naturalWidth = _getRotatedSizes.width,
          naturalHeight = _getRotatedSizes.height;

      var width = canvasData.width * (naturalWidth / canvasData.naturalWidth);
      var height = canvasData.height * (naturalHeight / canvasData.naturalHeight);
      canvasData.left -= (width - canvasData.width) / 2;
      canvasData.top -= (height - canvasData.height) / 2;
      canvasData.width = width;
      canvasData.height = height;
      canvasData.aspectRatio = naturalWidth / naturalHeight;
      canvasData.naturalWidth = naturalWidth;
      canvasData.naturalHeight = naturalHeight;
      this.limitCanvas(true, false);
    }

    if (canvasData.width > canvasData.maxWidth || canvasData.width < canvasData.minWidth) {
      canvasData.left = canvasData.oldLeft;
    }

    if (canvasData.height > canvasData.maxHeight || canvasData.height < canvasData.minHeight) {
      canvasData.top = canvasData.oldTop;
    }

    canvasData.width = Math.min(Math.max(canvasData.width, canvasData.minWidth), canvasData.maxWidth);
    canvasData.height = Math.min(Math.max(canvasData.height, canvasData.minHeight), canvasData.maxHeight);
    this.limitCanvas(false, true);
    canvasData.left = Math.min(Math.max(canvasData.left, canvasData.minLeft), canvasData.maxLeft);
    canvasData.top = Math.min(Math.max(canvasData.top, canvasData.minTop), canvasData.maxTop);
    canvasData.oldLeft = canvasData.left;
    canvasData.oldTop = canvasData.top;
    setStyle(this.canvas, assign({
      width: canvasData.width,
      height: canvasData.height
    }, getTransforms({
      translateX: canvasData.left,
      translateY: canvasData.top
    })));
    this.renderImage(changed);

    if (this.cropped && this.limited) {
      this.limitCropBox(true, true);
    }
  },
  renderImage: function renderImage(changed) {
    var canvasData = this.canvasData,
        imageData = this.imageData;
    var width = imageData.naturalWidth * (canvasData.width / canvasData.naturalWidth);
    var height = imageData.naturalHeight * (canvasData.height / canvasData.naturalHeight);
    assign(imageData, {
      width: width,
      height: height,
      left: (canvasData.width - width) / 2,
      top: (canvasData.height - height) / 2
    });
    setStyle(this.image, assign({
      width: imageData.width,
      height: imageData.height
    }, getTransforms(assign({
      translateX: imageData.left,
      translateY: imageData.top
    }, imageData))));

    if (changed) {
      this.output();
    }
  },
  initCropBox: function initCropBox() {
    var options = this.options,
        canvasData = this.canvasData;
    var aspectRatio = options.aspectRatio || options.initialAspectRatio;
    var autoCropArea = Number(options.autoCropArea) || 0.8;
    var cropBoxData = {
      width: canvasData.width,
      height: canvasData.height
    };

    if (aspectRatio) {
      if (canvasData.height * aspectRatio > canvasData.width) {
        cropBoxData.height = cropBoxData.width / aspectRatio;
      } else {
        cropBoxData.width = cropBoxData.height * aspectRatio;
      }
    }

    this.cropBoxData = cropBoxData;
    this.limitCropBox(true, true); // Initialize auto crop area

    cropBoxData.width = Math.min(Math.max(cropBoxData.width, cropBoxData.minWidth), cropBoxData.maxWidth);
    cropBoxData.height = Math.min(Math.max(cropBoxData.height, cropBoxData.minHeight), cropBoxData.maxHeight); // The width/height of auto crop area must large than "minWidth/Height"

    cropBoxData.width = Math.max(cropBoxData.minWidth, cropBoxData.width * autoCropArea);
    cropBoxData.height = Math.max(cropBoxData.minHeight, cropBoxData.height * autoCropArea);
    cropBoxData.left = canvasData.left + (canvasData.width - cropBoxData.width) / 2;
    cropBoxData.top = canvasData.top + (canvasData.height - cropBoxData.height) / 2;
    cropBoxData.oldLeft = cropBoxData.left;
    cropBoxData.oldTop = cropBoxData.top;
    this.initialCropBoxData = assign({}, cropBoxData);
  },
  limitCropBox: function limitCropBox(sizeLimited, positionLimited) {
    var options = this.options,
        containerData = this.containerData,
        canvasData = this.canvasData,
        cropBoxData = this.cropBoxData,
        limited = this.limited;
    var aspectRatio = options.aspectRatio;

    if (sizeLimited) {
      var minCropBoxWidth = Number(options.minCropBoxWidth) || 0;
      var minCropBoxHeight = Number(options.minCropBoxHeight) || 0;
      var maxCropBoxWidth = limited ? Math.min(containerData.width, canvasData.width, canvasData.width + canvasData.left, containerData.width - canvasData.left) : containerData.width;
      var maxCropBoxHeight = limited ? Math.min(containerData.height, canvasData.height, canvasData.height + canvasData.top, containerData.height - canvasData.top) : containerData.height; // The min/maxCropBoxWidth/Height must be less than container's width/height

      minCropBoxWidth = Math.min(minCropBoxWidth, containerData.width);
      minCropBoxHeight = Math.min(minCropBoxHeight, containerData.height);

      if (aspectRatio) {
        if (minCropBoxWidth && minCropBoxHeight) {
          if (minCropBoxHeight * aspectRatio > minCropBoxWidth) {
            minCropBoxHeight = minCropBoxWidth / aspectRatio;
          } else {
            minCropBoxWidth = minCropBoxHeight * aspectRatio;
          }
        } else if (minCropBoxWidth) {
          minCropBoxHeight = minCropBoxWidth / aspectRatio;
        } else if (minCropBoxHeight) {
          minCropBoxWidth = minCropBoxHeight * aspectRatio;
        }

        if (maxCropBoxHeight * aspectRatio > maxCropBoxWidth) {
          maxCropBoxHeight = maxCropBoxWidth / aspectRatio;
        } else {
          maxCropBoxWidth = maxCropBoxHeight * aspectRatio;
        }
      } // The minWidth/Height must be less than maxWidth/Height


      cropBoxData.minWidth = Math.min(minCropBoxWidth, maxCropBoxWidth);
      cropBoxData.minHeight = Math.min(minCropBoxHeight, maxCropBoxHeight);
      cropBoxData.maxWidth = maxCropBoxWidth;
      cropBoxData.maxHeight = maxCropBoxHeight;
    }

    if (positionLimited) {
      if (limited) {
        cropBoxData.minLeft = Math.max(0, canvasData.left);
        cropBoxData.minTop = Math.max(0, canvasData.top);
        cropBoxData.maxLeft = Math.min(containerData.width, canvasData.left + canvasData.width) - cropBoxData.width;
        cropBoxData.maxTop = Math.min(containerData.height, canvasData.top + canvasData.height) - cropBoxData.height;
      } else {
        cropBoxData.minLeft = 0;
        cropBoxData.minTop = 0;
        cropBoxData.maxLeft = containerData.width - cropBoxData.width;
        cropBoxData.maxTop = containerData.height - cropBoxData.height;
      }
    }
  },
  renderCropBox: function renderCropBox() {
    var options = this.options,
        containerData = this.containerData,
        cropBoxData = this.cropBoxData;

    if (cropBoxData.width > cropBoxData.maxWidth || cropBoxData.width < cropBoxData.minWidth) {
      cropBoxData.left = cropBoxData.oldLeft;
    }

    if (cropBoxData.height > cropBoxData.maxHeight || cropBoxData.height < cropBoxData.minHeight) {
      cropBoxData.top = cropBoxData.oldTop;
    }

    cropBoxData.width = Math.min(Math.max(cropBoxData.width, cropBoxData.minWidth), cropBoxData.maxWidth);
    cropBoxData.height = Math.min(Math.max(cropBoxData.height, cropBoxData.minHeight), cropBoxData.maxHeight);
    this.limitCropBox(false, true);
    cropBoxData.left = Math.min(Math.max(cropBoxData.left, cropBoxData.minLeft), cropBoxData.maxLeft);
    cropBoxData.top = Math.min(Math.max(cropBoxData.top, cropBoxData.minTop), cropBoxData.maxTop);
    cropBoxData.oldLeft = cropBoxData.left;
    cropBoxData.oldTop = cropBoxData.top;

    if (options.movable && options.cropBoxMovable) {
      // Turn to move the canvas when the crop box is equal to the container
      setData(this.face, DATA_ACTION, cropBoxData.width >= containerData.width && cropBoxData.height >= containerData.height ? ACTION_MOVE : ACTION_ALL);
    }

    setStyle(this.cropBox, assign({
      width: cropBoxData.width,
      height: cropBoxData.height
    }, getTransforms({
      translateX: cropBoxData.left,
      translateY: cropBoxData.top
    })));

    if (this.cropped && this.limited) {
      this.limitCanvas(true, true);
    }

    if (!this.disabled) {
      this.output();
    }
  },
  output: function output() {
    this.preview();
    dispatchEvent(this.element, EVENT_CROP, this.getData());
  }
};
var preview = {
  initPreview: function initPreview() {
    var crossOrigin = this.crossOrigin;
    var preview = this.options.preview;
    var url = crossOrigin ? this.crossOriginUrl : this.url;
    var image = document.createElement('img');

    if (crossOrigin) {
      image.crossOrigin = crossOrigin;
    }

    image.src = url;
    this.viewBox.appendChild(image);
    this.viewBoxImage = image;

    if (!preview) {
      return;
    }

    var previews = preview;

    if (typeof preview === 'string') {
      previews = this.element.ownerDocument.querySelectorAll(preview);
    } else if (preview.querySelector) {
      previews = [preview];
    }

    this.previews = previews;
    forEach(previews, function (el) {
      var img = document.createElement('img'); // Save the original size for recover

      setData(el, DATA_PREVIEW, {
        width: el.offsetWidth,
        height: el.offsetHeight,
        html: el.innerHTML
      });

      if (crossOrigin) {
        img.crossOrigin = crossOrigin;
      }

      img.src = url;
      /**
       * Override img element styles
       * Add `display:block` to avoid margin top issue
       * Add `height:auto` to override `height` attribute on IE8
       * (Occur only when margin-top <= -height)
       */

      img.style.cssText = 'display:block;' + 'width:100%;' + 'height:auto;' + 'min-width:0!important;' + 'min-height:0!important;' + 'max-width:none!important;' + 'max-height:none!important;' + 'image-orientation:0deg!important;"';
      el.innerHTML = '';
      el.appendChild(img);
    });
  },
  resetPreview: function resetPreview() {
    forEach(this.previews, function (element) {
      var data = getData(element, DATA_PREVIEW);
      setStyle(element, {
        width: data.width,
        height: data.height
      });
      element.innerHTML = data.html;
      removeData(element, DATA_PREVIEW);
    });
  },
  preview: function preview() {
    var imageData = this.imageData,
        canvasData = this.canvasData,
        cropBoxData = this.cropBoxData;
    var cropBoxWidth = cropBoxData.width,
        cropBoxHeight = cropBoxData.height;
    var width = imageData.width,
        height = imageData.height;
    var left = cropBoxData.left - canvasData.left - imageData.left;
    var top = cropBoxData.top - canvasData.top - imageData.top;

    if (!this.cropped || this.disabled) {
      return;
    }

    setStyle(this.viewBoxImage, assign({
      width: width,
      height: height
    }, getTransforms(assign({
      translateX: -left,
      translateY: -top
    }, imageData))));
    forEach(this.previews, function (element) {
      var data = getData(element, DATA_PREVIEW);
      var originalWidth = data.width;
      var originalHeight = data.height;
      var newWidth = originalWidth;
      var newHeight = originalHeight;
      var ratio = 1;

      if (cropBoxWidth) {
        ratio = originalWidth / cropBoxWidth;
        newHeight = cropBoxHeight * ratio;
      }

      if (cropBoxHeight && newHeight > originalHeight) {
        ratio = originalHeight / cropBoxHeight;
        newWidth = cropBoxWidth * ratio;
        newHeight = originalHeight;
      }

      setStyle(element, {
        width: newWidth,
        height: newHeight
      });
      setStyle(element.getElementsByTagName('img')[0], assign({
        width: width * ratio,
        height: height * ratio
      }, getTransforms(assign({
        translateX: -left * ratio,
        translateY: -top * ratio
      }, imageData))));
    });
  }
};
var events = {
  bind: function bind() {
    var element = this.element,
        options = this.options,
        cropper = this.cropper;

    if (isFunction(options.cropstart)) {
      addListener(element, EVENT_CROP_START, options.cropstart);
    }

    if (isFunction(options.cropmove)) {
      addListener(element, EVENT_CROP_MOVE, options.cropmove);
    }

    if (isFunction(options.cropend)) {
      addListener(element, EVENT_CROP_END, options.cropend);
    }

    if (isFunction(options.crop)) {
      addListener(element, EVENT_CROP, options.crop);
    }

    if (isFunction(options.zoom)) {
      addListener(element, EVENT_ZOOM, options.zoom);
    }

    addListener(cropper, EVENT_POINTER_DOWN, this.onCropStart = this.cropStart.bind(this));

    if (options.zoomable && options.zoomOnWheel) {
      addListener(cropper, EVENT_WHEEL, this.onWheel = this.wheel.bind(this), {
        passive: false,
        capture: true
      });
    }

    if (options.toggleDragModeOnDblclick) {
      addListener(cropper, EVENT_DBLCLICK, this.onDblclick = this.dblclick.bind(this));
    }

    addListener(element.ownerDocument, EVENT_POINTER_MOVE, this.onCropMove = this.cropMove.bind(this));
    addListener(element.ownerDocument, EVENT_POINTER_UP, this.onCropEnd = this.cropEnd.bind(this));

    if (options.responsive) {
      addListener(window, EVENT_RESIZE, this.onResize = this.resize.bind(this));
    }
  },
  unbind: function unbind() {
    var element = this.element,
        options = this.options,
        cropper = this.cropper;

    if (isFunction(options.cropstart)) {
      removeListener(element, EVENT_CROP_START, options.cropstart);
    }

    if (isFunction(options.cropmove)) {
      removeListener(element, EVENT_CROP_MOVE, options.cropmove);
    }

    if (isFunction(options.cropend)) {
      removeListener(element, EVENT_CROP_END, options.cropend);
    }

    if (isFunction(options.crop)) {
      removeListener(element, EVENT_CROP, options.crop);
    }

    if (isFunction(options.zoom)) {
      removeListener(element, EVENT_ZOOM, options.zoom);
    }

    removeListener(cropper, EVENT_POINTER_DOWN, this.onCropStart);

    if (options.zoomable && options.zoomOnWheel) {
      removeListener(cropper, EVENT_WHEEL, this.onWheel, {
        passive: false,
        capture: true
      });
    }

    if (options.toggleDragModeOnDblclick) {
      removeListener(cropper, EVENT_DBLCLICK, this.onDblclick);
    }

    removeListener(element.ownerDocument, EVENT_POINTER_MOVE, this.onCropMove);
    removeListener(element.ownerDocument, EVENT_POINTER_UP, this.onCropEnd);

    if (options.responsive) {
      removeListener(window, EVENT_RESIZE, this.onResize);
    }
  }
};
var handlers = {
  resize: function resize() {
    var options = this.options,
        container = this.container,
        containerData = this.containerData;
    var minContainerWidth = Number(options.minContainerWidth) || MIN_CONTAINER_WIDTH;
    var minContainerHeight = Number(options.minContainerHeight) || MIN_CONTAINER_HEIGHT;

    if (this.disabled || containerData.width <= minContainerWidth || containerData.height <= minContainerHeight) {
      return;
    }

    var ratio = container.offsetWidth / containerData.width; // Resize when width changed or height changed

    if (ratio !== 1 || container.offsetHeight !== containerData.height) {
      var canvasData;
      var cropBoxData;

      if (options.restore) {
        canvasData = this.getCanvasData();
        cropBoxData = this.getCropBoxData();
      }

      this.render();

      if (options.restore) {
        this.setCanvasData(forEach(canvasData, function (n, i) {
          canvasData[i] = n * ratio;
        }));
        this.setCropBoxData(forEach(cropBoxData, function (n, i) {
          cropBoxData[i] = n * ratio;
        }));
      }
    }
  },
  dblclick: function dblclick() {
    if (this.disabled || this.options.dragMode === DRAG_MODE_NONE) {
      return;
    }

    this.setDragMode(hasClass(this.dragBox, CLASS_CROP) ? DRAG_MODE_MOVE : DRAG_MODE_CROP);
  },
  wheel: function wheel(event) {
    var _this = this;

    var ratio = Number(this.options.wheelZoomRatio) || 0.1;
    var delta = 1;

    if (this.disabled) {
      return;
    }

    event.preventDefault(); // Limit wheel speed to prevent zoom too fast (#21)

    if (this.wheeling) {
      return;
    }

    this.wheeling = true;
    setTimeout(function () {
      _this.wheeling = false;
    }, 50);

    if (event.deltaY) {
      delta = event.deltaY > 0 ? 1 : -1;
    } else if (event.wheelDelta) {
      delta = -event.wheelDelta / 120;
    } else if (event.detail) {
      delta = event.detail > 0 ? 1 : -1;
    }

    this.zoom(-delta * ratio, event);
  },
  cropStart: function cropStart(event) {
    var buttons = event.buttons,
        button = event.button;

    if (this.disabled // No primary button (Usually the left button)
    // Note that touch events have no `buttons` or `button` property
    || isNumber(buttons) && buttons !== 1 || isNumber(button) && button !== 0 // Open context menu
    || event.ctrlKey) {
      return;
    }

    var options = this.options,
        pointers = this.pointers;
    var action;

    if (event.changedTouches) {
      // Handle touch event
      forEach(event.changedTouches, function (touch) {
        pointers[touch.identifier] = getPointer(touch);
      });
    } else {
      // Handle mouse event and pointer event
      pointers[event.pointerId || 0] = getPointer(event);
    }

    if (Object.keys(pointers).length > 1 && options.zoomable && options.zoomOnTouch) {
      action = ACTION_ZOOM;
    } else {
      action = getData(event.target, DATA_ACTION);
    }

    if (!REGEXP_ACTIONS.test(action)) {
      return;
    }

    if (dispatchEvent(this.element, EVENT_CROP_START, {
      originalEvent: event,
      action: action
    }) === false) {
      return;
    } // This line is required for preventing page zooming in iOS browsers


    event.preventDefault();
    this.action = action;
    this.cropping = false;

    if (action === ACTION_CROP) {
      this.cropping = true;
      addClass(this.dragBox, CLASS_MODAL);
    }
  },
  cropMove: function cropMove(event) {
    var action = this.action;

    if (this.disabled || !action) {
      return;
    }

    var pointers = this.pointers;
    event.preventDefault();

    if (dispatchEvent(this.element, EVENT_CROP_MOVE, {
      originalEvent: event,
      action: action
    }) === false) {
      return;
    }

    if (event.changedTouches) {
      forEach(event.changedTouches, function (touch) {
        // The first parameter should not be undefined (#432)
        assign(pointers[touch.identifier] || {}, getPointer(touch, true));
      });
    } else {
      assign(pointers[event.pointerId || 0] || {}, getPointer(event, true));
    }

    this.change(event);
  },
  cropEnd: function cropEnd(event) {
    if (this.disabled) {
      return;
    }

    var action = this.action,
        pointers = this.pointers;

    if (event.changedTouches) {
      forEach(event.changedTouches, function (touch) {
        delete pointers[touch.identifier];
      });
    } else {
      delete pointers[event.pointerId || 0];
    }

    if (!action) {
      return;
    }

    event.preventDefault();

    if (!Object.keys(pointers).length) {
      this.action = '';
    }

    if (this.cropping) {
      this.cropping = false;
      toggleClass(this.dragBox, CLASS_MODAL, this.cropped && this.options.modal);
    }

    dispatchEvent(this.element, EVENT_CROP_END, {
      originalEvent: event,
      action: action
    });
  }
};
var change = {
  change: function change(event) {
    var options = this.options,
        canvasData = this.canvasData,
        containerData = this.containerData,
        cropBoxData = this.cropBoxData,
        pointers = this.pointers;
    var action = this.action;
    var aspectRatio = options.aspectRatio;
    var left = cropBoxData.left,
        top = cropBoxData.top,
        width = cropBoxData.width,
        height = cropBoxData.height;
    var right = left + width;
    var bottom = top + height;
    var minLeft = 0;
    var minTop = 0;
    var maxWidth = containerData.width;
    var maxHeight = containerData.height;
    var renderable = true;
    var offset; // Locking aspect ratio in "free mode" by holding shift key

    if (!aspectRatio && event.shiftKey) {
      aspectRatio = width && height ? width / height : 1;
    }

    if (this.limited) {
      minLeft = cropBoxData.minLeft;
      minTop = cropBoxData.minTop;
      maxWidth = minLeft + Math.min(containerData.width, canvasData.width, canvasData.left + canvasData.width);
      maxHeight = minTop + Math.min(containerData.height, canvasData.height, canvasData.top + canvasData.height);
    }

    var pointer = pointers[Object.keys(pointers)[0]];
    var range = {
      x: pointer.endX - pointer.startX,
      y: pointer.endY - pointer.startY
    };

    var check = function check(side) {
      switch (side) {
        case ACTION_EAST:
          if (right + range.x > maxWidth) {
            range.x = maxWidth - right;
          }

          break;

        case ACTION_WEST:
          if (left + range.x < minLeft) {
            range.x = minLeft - left;
          }

          break;

        case ACTION_NORTH:
          if (top + range.y < minTop) {
            range.y = minTop - top;
          }

          break;

        case ACTION_SOUTH:
          if (bottom + range.y > maxHeight) {
            range.y = maxHeight - bottom;
          }

          break;

        default:
      }
    };

    switch (action) {
      // Move crop box
      case ACTION_ALL:
        left += range.x;
        top += range.y;
        break;
      // Resize crop box

      case ACTION_EAST:
        if (range.x >= 0 && (right >= maxWidth || aspectRatio && (top <= minTop || bottom >= maxHeight))) {
          renderable = false;
          break;
        }

        check(ACTION_EAST);
        width += range.x;

        if (width < 0) {
          action = ACTION_WEST;
          width = -width;
          left -= width;
        }

        if (aspectRatio) {
          height = width / aspectRatio;
          top += (cropBoxData.height - height) / 2;
        }

        break;

      case ACTION_NORTH:
        if (range.y <= 0 && (top <= minTop || aspectRatio && (left <= minLeft || right >= maxWidth))) {
          renderable = false;
          break;
        }

        check(ACTION_NORTH);
        height -= range.y;
        top += range.y;

        if (height < 0) {
          action = ACTION_SOUTH;
          height = -height;
          top -= height;
        }

        if (aspectRatio) {
          width = height * aspectRatio;
          left += (cropBoxData.width - width) / 2;
        }

        break;

      case ACTION_WEST:
        if (range.x <= 0 && (left <= minLeft || aspectRatio && (top <= minTop || bottom >= maxHeight))) {
          renderable = false;
          break;
        }

        check(ACTION_WEST);
        width -= range.x;
        left += range.x;

        if (width < 0) {
          action = ACTION_EAST;
          width = -width;
          left -= width;
        }

        if (aspectRatio) {
          height = width / aspectRatio;
          top += (cropBoxData.height - height) / 2;
        }

        break;

      case ACTION_SOUTH:
        if (range.y >= 0 && (bottom >= maxHeight || aspectRatio && (left <= minLeft || right >= maxWidth))) {
          renderable = false;
          break;
        }

        check(ACTION_SOUTH);
        height += range.y;

        if (height < 0) {
          action = ACTION_NORTH;
          height = -height;
          top -= height;
        }

        if (aspectRatio) {
          width = height * aspectRatio;
          left += (cropBoxData.width - width) / 2;
        }

        break;

      case ACTION_NORTH_EAST:
        if (aspectRatio) {
          if (range.y <= 0 && (top <= minTop || right >= maxWidth)) {
            renderable = false;
            break;
          }

          check(ACTION_NORTH);
          height -= range.y;
          top += range.y;
          width = height * aspectRatio;
        } else {
          check(ACTION_NORTH);
          check(ACTION_EAST);

          if (range.x >= 0) {
            if (right < maxWidth) {
              width += range.x;
            } else if (range.y <= 0 && top <= minTop) {
              renderable = false;
            }
          } else {
            width += range.x;
          }

          if (range.y <= 0) {
            if (top > minTop) {
              height -= range.y;
              top += range.y;
            }
          } else {
            height -= range.y;
            top += range.y;
          }
        }

        if (width < 0 && height < 0) {
          action = ACTION_SOUTH_WEST;
          height = -height;
          width = -width;
          top -= height;
          left -= width;
        } else if (width < 0) {
          action = ACTION_NORTH_WEST;
          width = -width;
          left -= width;
        } else if (height < 0) {
          action = ACTION_SOUTH_EAST;
          height = -height;
          top -= height;
        }

        break;

      case ACTION_NORTH_WEST:
        if (aspectRatio) {
          if (range.y <= 0 && (top <= minTop || left <= minLeft)) {
            renderable = false;
            break;
          }

          check(ACTION_NORTH);
          height -= range.y;
          top += range.y;
          width = height * aspectRatio;
          left += cropBoxData.width - width;
        } else {
          check(ACTION_NORTH);
          check(ACTION_WEST);

          if (range.x <= 0) {
            if (left > minLeft) {
              width -= range.x;
              left += range.x;
            } else if (range.y <= 0 && top <= minTop) {
              renderable = false;
            }
          } else {
            width -= range.x;
            left += range.x;
          }

          if (range.y <= 0) {
            if (top > minTop) {
              height -= range.y;
              top += range.y;
            }
          } else {
            height -= range.y;
            top += range.y;
          }
        }

        if (width < 0 && height < 0) {
          action = ACTION_SOUTH_EAST;
          height = -height;
          width = -width;
          top -= height;
          left -= width;
        } else if (width < 0) {
          action = ACTION_NORTH_EAST;
          width = -width;
          left -= width;
        } else if (height < 0) {
          action = ACTION_SOUTH_WEST;
          height = -height;
          top -= height;
        }

        break;

      case ACTION_SOUTH_WEST:
        if (aspectRatio) {
          if (range.x <= 0 && (left <= minLeft || bottom >= maxHeight)) {
            renderable = false;
            break;
          }

          check(ACTION_WEST);
          width -= range.x;
          left += range.x;
          height = width / aspectRatio;
        } else {
          check(ACTION_SOUTH);
          check(ACTION_WEST);

          if (range.x <= 0) {
            if (left > minLeft) {
              width -= range.x;
              left += range.x;
            } else if (range.y >= 0 && bottom >= maxHeight) {
              renderable = false;
            }
          } else {
            width -= range.x;
            left += range.x;
          }

          if (range.y >= 0) {
            if (bottom < maxHeight) {
              height += range.y;
            }
          } else {
            height += range.y;
          }
        }

        if (width < 0 && height < 0) {
          action = ACTION_NORTH_EAST;
          height = -height;
          width = -width;
          top -= height;
          left -= width;
        } else if (width < 0) {
          action = ACTION_SOUTH_EAST;
          width = -width;
          left -= width;
        } else if (height < 0) {
          action = ACTION_NORTH_WEST;
          height = -height;
          top -= height;
        }

        break;

      case ACTION_SOUTH_EAST:
        if (aspectRatio) {
          if (range.x >= 0 && (right >= maxWidth || bottom >= maxHeight)) {
            renderable = false;
            break;
          }

          check(ACTION_EAST);
          width += range.x;
          height = width / aspectRatio;
        } else {
          check(ACTION_SOUTH);
          check(ACTION_EAST);

          if (range.x >= 0) {
            if (right < maxWidth) {
              width += range.x;
            } else if (range.y >= 0 && bottom >= maxHeight) {
              renderable = false;
            }
          } else {
            width += range.x;
          }

          if (range.y >= 0) {
            if (bottom < maxHeight) {
              height += range.y;
            }
          } else {
            height += range.y;
          }
        }

        if (width < 0 && height < 0) {
          action = ACTION_NORTH_WEST;
          height = -height;
          width = -width;
          top -= height;
          left -= width;
        } else if (width < 0) {
          action = ACTION_SOUTH_WEST;
          width = -width;
          left -= width;
        } else if (height < 0) {
          action = ACTION_NORTH_EAST;
          height = -height;
          top -= height;
        }

        break;
      // Move canvas

      case ACTION_MOVE:
        this.move(range.x, range.y);
        renderable = false;
        break;
      // Zoom canvas

      case ACTION_ZOOM:
        this.zoom(getMaxZoomRatio(pointers), event);
        renderable = false;
        break;
      // Create crop box

      case ACTION_CROP:
        if (!range.x || !range.y) {
          renderable = false;
          break;
        }

        offset = getOffset(this.cropper);
        left = pointer.startX - offset.left;
        top = pointer.startY - offset.top;
        width = cropBoxData.minWidth;
        height = cropBoxData.minHeight;

        if (range.x > 0) {
          action = range.y > 0 ? ACTION_SOUTH_EAST : ACTION_NORTH_EAST;
        } else if (range.x < 0) {
          left -= width;
          action = range.y > 0 ? ACTION_SOUTH_WEST : ACTION_NORTH_WEST;
        }

        if (range.y < 0) {
          top -= height;
        } // Show the crop box if is hidden


        if (!this.cropped) {
          removeClass(this.cropBox, CLASS_HIDDEN);
          this.cropped = true;

          if (this.limited) {
            this.limitCropBox(true, true);
          }
        }

        break;

      default:
    }

    if (renderable) {
      cropBoxData.width = width;
      cropBoxData.height = height;
      cropBoxData.left = left;
      cropBoxData.top = top;
      this.action = action;
      this.renderCropBox();
    } // Override


    forEach(pointers, function (p) {
      p.startX = p.endX;
      p.startY = p.endY;
    });
  }
};
var methods = {
  // Show the crop box manually
  crop: function crop() {
    if (this.ready && !this.cropped && !this.disabled) {
      this.cropped = true;
      this.limitCropBox(true, true);

      if (this.options.modal) {
        addClass(this.dragBox, CLASS_MODAL);
      }

      removeClass(this.cropBox, CLASS_HIDDEN);
      this.setCropBoxData(this.initialCropBoxData);
    }

    return this;
  },
  // Reset the image and crop box to their initial states
  reset: function reset() {
    if (this.ready && !this.disabled) {
      this.imageData = assign({}, this.initialImageData);
      this.canvasData = assign({}, this.initialCanvasData);
      this.cropBoxData = assign({}, this.initialCropBoxData);
      this.renderCanvas();

      if (this.cropped) {
        this.renderCropBox();
      }
    }

    return this;
  },
  // Clear the crop box
  clear: function clear() {
    if (this.cropped && !this.disabled) {
      assign(this.cropBoxData, {
        left: 0,
        top: 0,
        width: 0,
        height: 0
      });
      this.cropped = false;
      this.renderCropBox();
      this.limitCanvas(true, true); // Render canvas after crop box rendered

      this.renderCanvas();
      removeClass(this.dragBox, CLASS_MODAL);
      addClass(this.cropBox, CLASS_HIDDEN);
    }

    return this;
  },

  /**
   * Replace the image's src and rebuild the cropper
   * @param {string} url - The new URL.
   * @param {boolean} [hasSameSize] - Indicate if the new image has the same size as the old one.
   * @returns {Cropper} this
   */
  replace: function replace(url) {
    var hasSameSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    if (!this.disabled && url) {
      if (this.isImg) {
        this.element.src = url;
      }

      if (hasSameSize) {
        this.url = url;
        this.image.src = url;

        if (this.ready) {
          this.viewBoxImage.src = url;
          forEach(this.previews, function (element) {
            element.getElementsByTagName('img')[0].src = url;
          });
        }
      } else {
        if (this.isImg) {
          this.replaced = true;
        }

        this.options.data = null;
        this.uncreate();
        this.load(url);
      }
    }

    return this;
  },
  // Enable (unfreeze) the cropper
  enable: function enable() {
    if (this.ready && this.disabled) {
      this.disabled = false;
      removeClass(this.cropper, CLASS_DISABLED);
    }

    return this;
  },
  // Disable (freeze) the cropper
  disable: function disable() {
    if (this.ready && !this.disabled) {
      this.disabled = true;
      addClass(this.cropper, CLASS_DISABLED);
    }

    return this;
  },

  /**
   * Destroy the cropper and remove the instance from the image
   * @returns {Cropper} this
   */
  destroy: function destroy() {
    var element = this.element;

    if (!element[NAMESPACE]) {
      return this;
    }

    element[NAMESPACE] = undefined;

    if (this.isImg && this.replaced) {
      element.src = this.originalUrl;
    }

    this.uncreate();
    return this;
  },

  /**
   * Move the canvas with relative offsets
   * @param {number} offsetX - The relative offset distance on the x-axis.
   * @param {number} [offsetY=offsetX] - The relative offset distance on the y-axis.
   * @returns {Cropper} this
   */
  move: function move(offsetX) {
    var offsetY = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : offsetX;
    var _this$canvasData = this.canvasData,
        left = _this$canvasData.left,
        top = _this$canvasData.top;
    return this.moveTo(isUndefined(offsetX) ? offsetX : left + Number(offsetX), isUndefined(offsetY) ? offsetY : top + Number(offsetY));
  },

  /**
   * Move the canvas to an absolute point
   * @param {number} x - The x-axis coordinate.
   * @param {number} [y=x] - The y-axis coordinate.
   * @returns {Cropper} this
   */
  moveTo: function moveTo(x) {
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : x;
    var canvasData = this.canvasData;
    var changed = false;
    x = Number(x);
    y = Number(y);

    if (this.ready && !this.disabled && this.options.movable) {
      if (isNumber(x)) {
        canvasData.left = x;
        changed = true;
      }

      if (isNumber(y)) {
        canvasData.top = y;
        changed = true;
      }

      if (changed) {
        this.renderCanvas(true);
      }
    }

    return this;
  },

  /**
   * Zoom the canvas with a relative ratio
   * @param {number} ratio - The target ratio.
   * @param {Event} _originalEvent - The original event if any.
   * @returns {Cropper} this
   */
  zoom: function zoom(ratio, _originalEvent) {
    var canvasData = this.canvasData;
    ratio = Number(ratio);

    if (ratio < 0) {
      ratio = 1 / (1 - ratio);
    } else {
      ratio = 1 + ratio;
    }

    return this.zoomTo(canvasData.width * ratio / canvasData.naturalWidth, null, _originalEvent);
  },

  /**
   * Zoom the canvas to an absolute ratio
   * @param {number} ratio - The target ratio.
   * @param {Object} pivot - The zoom pivot point coordinate.
   * @param {Event} _originalEvent - The original event if any.
   * @returns {Cropper} this
   */
  zoomTo: function zoomTo(ratio, pivot, _originalEvent) {
    var options = this.options,
        canvasData = this.canvasData;
    var width = canvasData.width,
        height = canvasData.height,
        naturalWidth = canvasData.naturalWidth,
        naturalHeight = canvasData.naturalHeight;
    ratio = Number(ratio);

    if (ratio >= 0 && this.ready && !this.disabled && options.zoomable) {
      var newWidth = naturalWidth * ratio;
      var newHeight = naturalHeight * ratio;

      if (dispatchEvent(this.element, EVENT_ZOOM, {
        ratio: ratio,
        oldRatio: width / naturalWidth,
        originalEvent: _originalEvent
      }) === false) {
        return this;
      }

      if (_originalEvent) {
        var pointers = this.pointers;
        var offset = getOffset(this.cropper);
        var center = pointers && Object.keys(pointers).length ? getPointersCenter(pointers) : {
          pageX: _originalEvent.pageX,
          pageY: _originalEvent.pageY
        }; // Zoom from the triggering point of the event

        canvasData.left -= (newWidth - width) * ((center.pageX - offset.left - canvasData.left) / width);
        canvasData.top -= (newHeight - height) * ((center.pageY - offset.top - canvasData.top) / height);
      } else if (isPlainObject(pivot) && isNumber(pivot.x) && isNumber(pivot.y)) {
        canvasData.left -= (newWidth - width) * ((pivot.x - canvasData.left) / width);
        canvasData.top -= (newHeight - height) * ((pivot.y - canvasData.top) / height);
      } else {
        // Zoom from the center of the canvas
        canvasData.left -= (newWidth - width) / 2;
        canvasData.top -= (newHeight - height) / 2;
      }

      canvasData.width = newWidth;
      canvasData.height = newHeight;
      this.renderCanvas(true);
    }

    return this;
  },

  /**
   * Rotate the canvas with a relative degree
   * @param {number} degree - The rotate degree.
   * @returns {Cropper} this
   */
  rotate: function rotate(degree) {
    return this.rotateTo((this.imageData.rotate || 0) + Number(degree));
  },

  /**
   * Rotate the canvas to an absolute degree
   * @param {number} degree - The rotate degree.
   * @returns {Cropper} this
   */
  rotateTo: function rotateTo(degree) {
    degree = Number(degree);

    if (isNumber(degree) && this.ready && !this.disabled && this.options.rotatable) {
      this.imageData.rotate = degree % 360;
      this.renderCanvas(true, true);
    }

    return this;
  },

  /**
   * Scale the image on the x-axis.
   * @param {number} scaleX - The scale ratio on the x-axis.
   * @returns {Cropper} this
   */
  scaleX: function scaleX(_scaleX) {
    var scaleY = this.imageData.scaleY;
    return this.scale(_scaleX, isNumber(scaleY) ? scaleY : 1);
  },

  /**
   * Scale the image on the y-axis.
   * @param {number} scaleY - The scale ratio on the y-axis.
   * @returns {Cropper} this
   */
  scaleY: function scaleY(_scaleY) {
    var scaleX = this.imageData.scaleX;
    return this.scale(isNumber(scaleX) ? scaleX : 1, _scaleY);
  },

  /**
   * Scale the image
   * @param {number} scaleX - The scale ratio on the x-axis.
   * @param {number} [scaleY=scaleX] - The scale ratio on the y-axis.
   * @returns {Cropper} this
   */
  scale: function scale(scaleX) {
    var scaleY = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : scaleX;
    var imageData = this.imageData;
    var transformed = false;
    scaleX = Number(scaleX);
    scaleY = Number(scaleY);

    if (this.ready && !this.disabled && this.options.scalable) {
      if (isNumber(scaleX)) {
        imageData.scaleX = scaleX;
        transformed = true;
      }

      if (isNumber(scaleY)) {
        imageData.scaleY = scaleY;
        transformed = true;
      }

      if (transformed) {
        this.renderCanvas(true, true);
      }
    }

    return this;
  },

  /**
   * Get the cropped area position and size data (base on the original image)
   * @param {boolean} [rounded=false] - Indicate if round the data values or not.
   * @returns {Object} The result cropped data.
   */
  getData: function getData() {
    var rounded = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var options = this.options,
        imageData = this.imageData,
        canvasData = this.canvasData,
        cropBoxData = this.cropBoxData;
    var data;

    if (this.ready && this.cropped) {
      data = {
        x: cropBoxData.left - canvasData.left,
        y: cropBoxData.top - canvasData.top,
        width: cropBoxData.width,
        height: cropBoxData.height
      };
      var ratio = imageData.width / imageData.naturalWidth;
      forEach(data, function (n, i) {
        data[i] = n / ratio;
      });

      if (rounded) {
        // In case rounding off leads to extra 1px in right or bottom border
        // we should round the top-left corner and the dimension (#343).
        var bottom = Math.round(data.y + data.height);
        var right = Math.round(data.x + data.width);
        data.x = Math.round(data.x);
        data.y = Math.round(data.y);
        data.width = right - data.x;
        data.height = bottom - data.y;
      }
    } else {
      data = {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      };
    }

    if (options.rotatable) {
      data.rotate = imageData.rotate || 0;
    }

    if (options.scalable) {
      data.scaleX = imageData.scaleX || 1;
      data.scaleY = imageData.scaleY || 1;
    }

    return data;
  },

  /**
   * Set the cropped area position and size with new data
   * @param {Object} data - The new data.
   * @returns {Cropper} this
   */
  setData: function setData(data) {
    var options = this.options,
        imageData = this.imageData,
        canvasData = this.canvasData;
    var cropBoxData = {};

    if (this.ready && !this.disabled && isPlainObject(data)) {
      var transformed = false;

      if (options.rotatable) {
        if (isNumber(data.rotate) && data.rotate !== imageData.rotate) {
          imageData.rotate = data.rotate;
          transformed = true;
        }
      }

      if (options.scalable) {
        if (isNumber(data.scaleX) && data.scaleX !== imageData.scaleX) {
          imageData.scaleX = data.scaleX;
          transformed = true;
        }

        if (isNumber(data.scaleY) && data.scaleY !== imageData.scaleY) {
          imageData.scaleY = data.scaleY;
          transformed = true;
        }
      }

      if (transformed) {
        this.renderCanvas(true, true);
      }

      var ratio = imageData.width / imageData.naturalWidth;

      if (isNumber(data.x)) {
        cropBoxData.left = data.x * ratio + canvasData.left;
      }

      if (isNumber(data.y)) {
        cropBoxData.top = data.y * ratio + canvasData.top;
      }

      if (isNumber(data.width)) {
        cropBoxData.width = data.width * ratio;
      }

      if (isNumber(data.height)) {
        cropBoxData.height = data.height * ratio;
      }

      this.setCropBoxData(cropBoxData);
    }

    return this;
  },

  /**
   * Get the container size data.
   * @returns {Object} The result container data.
   */
  getContainerData: function getContainerData() {
    return this.ready ? assign({}, this.containerData) : {};
  },

  /**
   * Get the image position and size data.
   * @returns {Object} The result image data.
   */
  getImageData: function getImageData() {
    return this.sized ? assign({}, this.imageData) : {};
  },

  /**
   * Get the canvas position and size data.
   * @returns {Object} The result canvas data.
   */
  getCanvasData: function getCanvasData() {
    var canvasData = this.canvasData;
    var data = {};

    if (this.ready) {
      forEach(['left', 'top', 'width', 'height', 'naturalWidth', 'naturalHeight'], function (n) {
        data[n] = canvasData[n];
      });
    }

    return data;
  },

  /**
   * Set the canvas position and size with new data.
   * @param {Object} data - The new canvas data.
   * @returns {Cropper} this
   */
  setCanvasData: function setCanvasData(data) {
    var canvasData = this.canvasData;
    var aspectRatio = canvasData.aspectRatio;

    if (this.ready && !this.disabled && isPlainObject(data)) {
      if (isNumber(data.left)) {
        canvasData.left = data.left;
      }

      if (isNumber(data.top)) {
        canvasData.top = data.top;
      }

      if (isNumber(data.width)) {
        canvasData.width = data.width;
        canvasData.height = data.width / aspectRatio;
      } else if (isNumber(data.height)) {
        canvasData.height = data.height;
        canvasData.width = data.height * aspectRatio;
      }

      this.renderCanvas(true);
    }

    return this;
  },

  /**
   * Get the crop box position and size data.
   * @returns {Object} The result crop box data.
   */
  getCropBoxData: function getCropBoxData() {
    var cropBoxData = this.cropBoxData;
    var data;

    if (this.ready && this.cropped) {
      data = {
        left: cropBoxData.left,
        top: cropBoxData.top,
        width: cropBoxData.width,
        height: cropBoxData.height
      };
    }

    return data || {};
  },

  /**
   * Set the crop box position and size with new data.
   * @param {Object} data - The new crop box data.
   * @returns {Cropper} this
   */
  setCropBoxData: function setCropBoxData(data) {
    var cropBoxData = this.cropBoxData;
    var aspectRatio = this.options.aspectRatio;
    var widthChanged;
    var heightChanged;

    if (this.ready && this.cropped && !this.disabled && isPlainObject(data)) {
      if (isNumber(data.left)) {
        cropBoxData.left = data.left;
      }

      if (isNumber(data.top)) {
        cropBoxData.top = data.top;
      }

      if (isNumber(data.width) && data.width !== cropBoxData.width) {
        widthChanged = true;
        cropBoxData.width = data.width;
      }

      if (isNumber(data.height) && data.height !== cropBoxData.height) {
        heightChanged = true;
        cropBoxData.height = data.height;
      }

      if (aspectRatio) {
        if (widthChanged) {
          cropBoxData.height = cropBoxData.width / aspectRatio;
        } else if (heightChanged) {
          cropBoxData.width = cropBoxData.height * aspectRatio;
        }
      }

      this.renderCropBox();
    }

    return this;
  },

  /**
   * Get a canvas drawn the cropped image.
   * @param {Object} [options={}] - The config options.
   * @returns {HTMLCanvasElement} - The result canvas.
   */
  getCroppedCanvas: function getCroppedCanvas() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (!this.ready || !window.HTMLCanvasElement) {
      return null;
    }

    var canvasData = this.canvasData;
    var source = getSourceCanvas(this.image, this.imageData, canvasData, options); // Returns the source canvas if it is not cropped.

    if (!this.cropped) {
      return source;
    }

    var _this$getData = this.getData(),
        initialX = _this$getData.x,
        initialY = _this$getData.y,
        initialWidth = _this$getData.width,
        initialHeight = _this$getData.height;

    var ratio = source.width / Math.floor(canvasData.naturalWidth);

    if (ratio !== 1) {
      initialX *= ratio;
      initialY *= ratio;
      initialWidth *= ratio;
      initialHeight *= ratio;
    }

    var aspectRatio = initialWidth / initialHeight;
    var maxSizes = getAdjustedSizes({
      aspectRatio: aspectRatio,
      width: options.maxWidth || Infinity,
      height: options.maxHeight || Infinity
    });
    var minSizes = getAdjustedSizes({
      aspectRatio: aspectRatio,
      width: options.minWidth || 0,
      height: options.minHeight || 0
    }, 'cover');

    var _getAdjustedSizes = getAdjustedSizes({
      aspectRatio: aspectRatio,
      width: options.width || (ratio !== 1 ? source.width : initialWidth),
      height: options.height || (ratio !== 1 ? source.height : initialHeight)
    }),
        width = _getAdjustedSizes.width,
        height = _getAdjustedSizes.height;

    width = Math.min(maxSizes.width, Math.max(minSizes.width, width));
    height = Math.min(maxSizes.height, Math.max(minSizes.height, height));
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    canvas.width = normalizeDecimalNumber(width);
    canvas.height = normalizeDecimalNumber(height);
    context.fillStyle = options.fillColor || 'transparent';
    context.fillRect(0, 0, width, height);
    var _options$imageSmoothi = options.imageSmoothingEnabled,
        imageSmoothingEnabled = _options$imageSmoothi === void 0 ? true : _options$imageSmoothi,
        imageSmoothingQuality = options.imageSmoothingQuality;
    context.imageSmoothingEnabled = imageSmoothingEnabled;

    if (imageSmoothingQuality) {
      context.imageSmoothingQuality = imageSmoothingQuality;
    } // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D.drawImage


    var sourceWidth = source.width;
    var sourceHeight = source.height; // Source canvas parameters

    var srcX = initialX;
    var srcY = initialY;
    var srcWidth;
    var srcHeight; // Destination canvas parameters

    var dstX;
    var dstY;
    var dstWidth;
    var dstHeight;

    if (srcX <= -initialWidth || srcX > sourceWidth) {
      srcX = 0;
      srcWidth = 0;
      dstX = 0;
      dstWidth = 0;
    } else if (srcX <= 0) {
      dstX = -srcX;
      srcX = 0;
      srcWidth = Math.min(sourceWidth, initialWidth + srcX);
      dstWidth = srcWidth;
    } else if (srcX <= sourceWidth) {
      dstX = 0;
      srcWidth = Math.min(initialWidth, sourceWidth - srcX);
      dstWidth = srcWidth;
    }

    if (srcWidth <= 0 || srcY <= -initialHeight || srcY > sourceHeight) {
      srcY = 0;
      srcHeight = 0;
      dstY = 0;
      dstHeight = 0;
    } else if (srcY <= 0) {
      dstY = -srcY;
      srcY = 0;
      srcHeight = Math.min(sourceHeight, initialHeight + srcY);
      dstHeight = srcHeight;
    } else if (srcY <= sourceHeight) {
      dstY = 0;
      srcHeight = Math.min(initialHeight, sourceHeight - srcY);
      dstHeight = srcHeight;
    }

    var params = [srcX, srcY, srcWidth, srcHeight]; // Avoid "IndexSizeError"

    if (dstWidth > 0 && dstHeight > 0) {
      var scale = width / initialWidth;
      params.push(dstX * scale, dstY * scale, dstWidth * scale, dstHeight * scale);
    } // All the numerical parameters should be integer for `drawImage`
    // https://github.com/fengyuanchen/cropper/issues/476


    context.drawImage.apply(context, [source].concat(_toConsumableArray(params.map(function (param) {
      return Math.floor(normalizeDecimalNumber(param));
    }))));
    return canvas;
  },

  /**
   * Change the aspect ratio of the crop box.
   * @param {number} aspectRatio - The new aspect ratio.
   * @returns {Cropper} this
   */
  setAspectRatio: function setAspectRatio(aspectRatio) {
    var options = this.options;

    if (!this.disabled && !isUndefined(aspectRatio)) {
      // 0 -> NaN
      options.aspectRatio = Math.max(0, aspectRatio) || NaN;

      if (this.ready) {
        this.initCropBox();

        if (this.cropped) {
          this.renderCropBox();
        }
      }
    }

    return this;
  },

  /**
   * Change the drag mode.
   * @param {string} mode - The new drag mode.
   * @returns {Cropper} this
   */
  setDragMode: function setDragMode(mode) {
    var options = this.options,
        dragBox = this.dragBox,
        face = this.face;

    if (this.ready && !this.disabled) {
      var croppable = mode === DRAG_MODE_CROP;
      var movable = options.movable && mode === DRAG_MODE_MOVE;
      mode = croppable || movable ? mode : DRAG_MODE_NONE;
      options.dragMode = mode;
      setData(dragBox, DATA_ACTION, mode);
      toggleClass(dragBox, CLASS_CROP, croppable);
      toggleClass(dragBox, CLASS_MOVE, movable);

      if (!options.cropBoxMovable) {
        // Sync drag mode to crop box when it is not movable
        setData(face, DATA_ACTION, mode);
        toggleClass(face, CLASS_CROP, croppable);
        toggleClass(face, CLASS_MOVE, movable);
      }
    }

    return this;
  }
};
var AnotherCropper = WINDOW.Cropper;

var Cropper =
/*#__PURE__*/
function () {
  /**
   * Create a new Cropper.
   * @param {Element} element - The target element for cropping.
   * @param {Object} [options={}] - The configuration options.
   */
  function Cropper(element) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Cropper);

    if (!element || !REGEXP_TAG_NAME.test(element.tagName)) {
      throw new Error('The first argument is required and must be an <img> or <canvas> element.');
    }

    this.element = element;
    this.options = assign({}, DEFAULTS, isPlainObject(options) && options);
    this.cropped = false;
    this.disabled = false;
    this.pointers = {};
    this.ready = false;
    this.reloading = false;
    this.replaced = false;
    this.sized = false;
    this.sizing = false;
    this.init();
  }

  _createClass(Cropper, [{
    key: "init",
    value: function init() {
      var element = this.element;
      var tagName = element.tagName.toLowerCase();
      var url;

      if (element[NAMESPACE]) {
        return;
      }

      element[NAMESPACE] = this;

      if (tagName === 'img') {
        this.isImg = true; // e.g.: "img/picture.jpg"

        url = element.getAttribute('src') || '';
        this.originalUrl = url; // Stop when it's a blank image

        if (!url) {
          return;
        } // e.g.: "http://example.com/img/picture.jpg"


        url = element.src;
      } else if (tagName === 'canvas' && window.HTMLCanvasElement) {
        url = element.toDataURL();
      }

      this.load(url);
    }
  }, {
    key: "load",
    value: function load(url) {
      var _this = this;

      if (!url) {
        return;
      }

      this.url = url;
      this.imageData = {};
      var element = this.element,
          options = this.options;

      if (!options.rotatable && !options.scalable) {
        options.checkOrientation = false;
      } // Only IE10+ supports Typed Arrays


      if (!options.checkOrientation || !window.ArrayBuffer) {
        this.clone();
        return;
      } // Read ArrayBuffer from Data URL of JPEG images directly for better performance.


      if (REGEXP_DATA_URL_JPEG.test(url)) {
        this.read(dataURLToArrayBuffer(url));
        return;
      }

      var xhr = new XMLHttpRequest();
      var clone = this.clone.bind(this);
      this.reloading = true;
      this.xhr = xhr; // 1. Cross origin requests are only supported for protocol schemes:
      // http, https, data, chrome, chrome-extension.
      // 2. Access to XMLHttpRequest from a Data URL will be blocked by CORS policy
      // in some browsers as IE11 and Safari.

      xhr.onabort = clone;
      xhr.onerror = clone;
      xhr.ontimeout = clone;

      xhr.onprogress = function () {
        if (xhr.getResponseHeader('content-type') !== MIME_TYPE_JPEG) {
          xhr.abort();
        }
      };

      xhr.onload = function () {
        _this.read(xhr.response);
      };

      xhr.onloadend = function () {
        _this.reloading = false;
        _this.xhr = null;
      }; // Bust cache when there is a "crossOrigin" property to avoid browser cache error


      if (options.checkCrossOrigin && isCrossOriginURL(url) && element.crossOrigin) {
        url = addTimestamp(url);
      }

      xhr.open('GET', url);
      xhr.responseType = 'arraybuffer';
      xhr.withCredentials = element.crossOrigin === 'use-credentials';
      xhr.send();
    }
  }, {
    key: "read",
    value: function read(arrayBuffer) {
      var options = this.options,
          imageData = this.imageData; // Reset the orientation value to its default value 1
      // as some iOS browsers will render image with its orientation

      var orientation = resetAndGetOrientation(arrayBuffer);
      var rotate = 0;
      var scaleX = 1;
      var scaleY = 1;

      if (orientation > 1) {
        // Generate a new URL which has the default orientation value
        this.url = arrayBufferToDataURL(arrayBuffer, MIME_TYPE_JPEG);

        var _parseOrientation = parseOrientation(orientation);

        rotate = _parseOrientation.rotate;
        scaleX = _parseOrientation.scaleX;
        scaleY = _parseOrientation.scaleY;
      }

      if (options.rotatable) {
        imageData.rotate = rotate;
      }

      if (options.scalable) {
        imageData.scaleX = scaleX;
        imageData.scaleY = scaleY;
      }

      this.clone();
    }
  }, {
    key: "clone",
    value: function clone() {
      var element = this.element,
          url = this.url;
      var crossOrigin;
      var crossOriginUrl;

      if (this.options.checkCrossOrigin && isCrossOriginURL(url)) {
        crossOrigin = element.crossOrigin;

        if (crossOrigin) {
          crossOriginUrl = url;
        } else {
          crossOrigin = 'anonymous'; // Bust cache when there is not a "crossOrigin" property

          crossOriginUrl = addTimestamp(url);
        }
      }

      this.crossOrigin = crossOrigin;
      this.crossOriginUrl = crossOriginUrl;
      var image = document.createElement('img');

      if (crossOrigin) {
        image.crossOrigin = crossOrigin;
      }

      image.src = crossOriginUrl || url;
      this.image = image;
      image.onload = this.start.bind(this);
      image.onerror = this.stop.bind(this);
      addClass(image, CLASS_HIDE);
      element.parentNode.insertBefore(image, element.nextSibling);
    }
  }, {
    key: "start",
    value: function start() {
      var _this2 = this;

      var image = this.isImg ? this.element : this.image;
      image.onload = null;
      image.onerror = null;
      this.sizing = true;
      var IS_SAFARI = WINDOW.navigator && /^(?:.(?!chrome|android))*safari/i.test(WINDOW.navigator.userAgent);

      var done = function done(naturalWidth, naturalHeight) {
        assign(_this2.imageData, {
          naturalWidth: naturalWidth,
          naturalHeight: naturalHeight,
          aspectRatio: naturalWidth / naturalHeight
        });
        _this2.sizing = false;
        _this2.sized = true;

        _this2.build();
      }; // Modern browsers (except Safari)


      if (image.naturalWidth && !IS_SAFARI) {
        done(image.naturalWidth, image.naturalHeight);
        return;
      }

      var sizingImage = document.createElement('img');
      var body = document.body || document.documentElement;
      this.sizingImage = sizingImage;

      sizingImage.onload = function () {
        done(sizingImage.width, sizingImage.height);

        if (!IS_SAFARI) {
          body.removeChild(sizingImage);
        }
      };

      sizingImage.src = image.src; // iOS Safari will convert the image automatically
      // with its orientation once append it into DOM (#279)

      if (!IS_SAFARI) {
        sizingImage.style.cssText = 'left:0;' + 'max-height:none!important;' + 'max-width:none!important;' + 'min-height:0!important;' + 'min-width:0!important;' + 'opacity:0;' + 'position:absolute;' + 'top:0;' + 'z-index:-1;';
        body.appendChild(sizingImage);
      }
    }
  }, {
    key: "stop",
    value: function stop() {
      var image = this.image;
      image.onload = null;
      image.onerror = null;
      image.parentNode.removeChild(image);
      this.image = null;
    }
  }, {
    key: "build",
    value: function build() {
      if (!this.sized || this.ready) {
        return;
      }

      var element = this.element,
          options = this.options,
          image = this.image; // Create cropper elements

      var container = element.parentNode;
      var template = document.createElement('div');
      template.innerHTML = TEMPLATE;
      var cropper = template.querySelector(".".concat(NAMESPACE, "-container"));
      var canvas = cropper.querySelector(".".concat(NAMESPACE, "-canvas"));
      var dragBox = cropper.querySelector(".".concat(NAMESPACE, "-drag-box"));
      var cropBox = cropper.querySelector(".".concat(NAMESPACE, "-crop-box"));
      var face = cropBox.querySelector(".".concat(NAMESPACE, "-face"));
      this.container = container;
      this.cropper = cropper;
      this.canvas = canvas;
      this.dragBox = dragBox;
      this.cropBox = cropBox;
      this.viewBox = cropper.querySelector(".".concat(NAMESPACE, "-view-box"));
      this.face = face;
      canvas.appendChild(image); // Hide the original image

      addClass(element, CLASS_HIDDEN); // Inserts the cropper after to the current image

      container.insertBefore(cropper, element.nextSibling); // Show the image if is hidden

      if (!this.isImg) {
        removeClass(image, CLASS_HIDE);
      }

      this.initPreview();
      this.bind();
      options.initialAspectRatio = Math.max(0, options.initialAspectRatio) || NaN;
      options.aspectRatio = Math.max(0, options.aspectRatio) || NaN;
      options.viewMode = Math.max(0, Math.min(3, Math.round(options.viewMode))) || 0;
      addClass(cropBox, CLASS_HIDDEN);

      if (!options.guides) {
        addClass(cropBox.getElementsByClassName("".concat(NAMESPACE, "-dashed")), CLASS_HIDDEN);
      }

      if (!options.center) {
        addClass(cropBox.getElementsByClassName("".concat(NAMESPACE, "-center")), CLASS_HIDDEN);
      }

      if (options.background) {
        addClass(cropper, "".concat(NAMESPACE, "-bg"));
      }

      if (!options.highlight) {
        addClass(face, CLASS_INVISIBLE);
      }

      if (options.cropBoxMovable) {
        addClass(face, CLASS_MOVE);
        setData(face, DATA_ACTION, ACTION_ALL);
      }

      if (!options.cropBoxResizable) {
        addClass(cropBox.getElementsByClassName("".concat(NAMESPACE, "-line")), CLASS_HIDDEN);
        addClass(cropBox.getElementsByClassName("".concat(NAMESPACE, "-point")), CLASS_HIDDEN);
      }

      this.render();
      this.ready = true;
      this.setDragMode(options.dragMode);

      if (options.autoCrop) {
        this.crop();
      }

      this.setData(options.data);

      if (isFunction(options.ready)) {
        addListener(element, EVENT_READY, options.ready, {
          once: true
        });
      }

      dispatchEvent(element, EVENT_READY);
    }
  }, {
    key: "unbuild",
    value: function unbuild() {
      if (!this.ready) {
        return;
      }

      this.ready = false;
      this.unbind();
      this.resetPreview();
      this.cropper.parentNode.removeChild(this.cropper);
      removeClass(this.element, CLASS_HIDDEN);
    }
  }, {
    key: "uncreate",
    value: function uncreate() {
      if (this.ready) {
        this.unbuild();
        this.ready = false;
        this.cropped = false;
      } else if (this.sizing) {
        this.sizingImage.onload = null;
        this.sizing = false;
        this.sized = false;
      } else if (this.reloading) {
        this.xhr.onabort = null;
        this.xhr.abort();
      } else if (this.image) {
        this.stop();
      }
    }
    /**
     * Get the no conflict cropper class.
     * @returns {Cropper} The cropper class.
     */

  }], [{
    key: "noConflict",
    value: function noConflict() {
      window.Cropper = AnotherCropper;
      return Cropper;
    }
    /**
     * Change the default options.
     * @param {Object} options - The new default options.
     */

  }, {
    key: "setDefaults",
    value: function setDefaults(options) {
      assign(DEFAULTS, isPlainObject(options) && options);
    }
  }]);

  return Cropper;
}();

assign(Cropper.prototype, render, preview, events, handlers, change, methods);
module.exports = Cropper;
},{}],"../node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"plugin/draw-editer/components/model/index.less":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"plugin/draw-editer/components/button.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = require("../../../utils");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = function _default(params) {
  var type = params.type,
      style = params.style;
  var box = null;
  var publicStyle = {
    display: 'inline-block',
    padding: '5px 20px',
    boxShadow: '0 2px 0 rgba(0,0,0,0.015)',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'all .3s cubic-bezier(.645, .045, .355, 1)'
  };
  var primaryStyle = Object.assign({
    border: '0px solid #d9d9d9',
    fontSize: '14px',
    color: '#fff',
    background: '#1890ff'
  }, publicStyle, style);
  var defaultStyle = Object.assign({
    border: '1px solid #d9d9d9',
    fontSize: '14px',
    color: '#333'
  }, publicStyle, style);

  var primaryHover = function primaryHover() {
    box.style.background = '#40a9ff'; // box.style.color='#1890ff';
  };

  var defaultHover = function defaultHover() {
    box.style.borderColor = '#1890ff';
    box.style.color = '#1890ff';
  };

  var initStyle = defaultStyle;
  var hover = defaultHover;

  if (type == 'primary') {
    initStyle = primaryStyle;
    hover = primaryHover;
  }

  box = (0, _utils.creatDom)({
    tag: 'div',
    child: params.child,
    style: initStyle,
    on: _objectSpread({
      hover: hover
    }, params.on)
  });
  return box;
};

exports.default = _default;
},{"../../../utils":"utils/index.js"}],"plugin/draw-editer/components/model/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = require("../../../../utils");

var _cropper = _interopRequireDefault(require("../cropper"));

require("./index.less");

var _button = _interopRequireDefault(require("../button"));

var _drawData = _interopRequireDefault(require("../../draw-data"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var closeIcon = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTYyODE1MDIxNDU4IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE5NzciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTUyMS42OTM4NjcgNDQ5LjI5NzA2N0wxMTEuNDExMiAzOS4wMTQ0YTUxLjIgNTEuMiAwIDEgMC03Mi40MzA5MzMgNzIuMzYyNjY3bDQxMC4yODI2NjYgNDEwLjMxNjgtNDEwLjI4MjY2NiA0MTAuMzE2OGE1MS4yIDUxLjIgMCAxIDAgNzIuMzk2OCA3Mi4zOTY4bDQxMC4zMTY4LTQxMC4yODI2NjcgNDEwLjMxNjggNDEwLjI4MjY2N2E1MS4yIDUxLjIgMCAxIDAgNzIuMzk2OC03Mi4zNjI2NjdsLTQxMC4yODI2NjctNDEwLjM1MDkzMyA0MTAuMjgyNjY3LTQxMC4yODI2NjdhNTEuMiA1MS4yIDAgMSAwLTcyLjM5NjgtNzIuMzk2OGwtNDEwLjI4MjY2NyA0MTAuMjgyNjY3eiIgZmlsbD0iIzAwMDAwMCIgcC1pZD0iMTk3OCI+PC9wYXRoPjwvc3ZnPg==';
var imgIccn = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTYyODI4Nzc1MjcxIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE5OTQiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMzIiIGhlaWdodD0iMzIiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTQyMC41NzE0MjkgMjQ2Ljg1NzE0M20tOTEuNDI4NTcyIDBhOTEuNDI4NTcxIDkxLjQyODU3MSAwIDEgMCAxODIuODU3MTQzIDAgOTEuNDI4NTcxIDkxLjQyODU3MSAwIDEgMC0xODIuODU3MTQzIDBaIiBmaWxsPSIjRTlFREYyIiBwLWlkPSIxOTk1Ij48L3BhdGg+PHBhdGggZD0iTTEwMDIuMDU3MTQzIDgzOS4zMTQyODZsLTI5Mi41NzE0MjktNDM4Ljg1NzE0M2MtMy42NTcxNDMtNS40ODU3MTQtOS4xNDI4NTctNy4zMTQyODYtMTQuNjI4NTcxLTcuMzE0Mjg2LTUuNDg1NzE0IDAtMTAuOTcxNDI5IDEuODI4NTcxLTE0LjYyODU3MiA1LjQ4NTcxNGwtMTc1LjU0Mjg1NyAyMDQuOCA4MC40NTcxNDMgMTI4LTI4My40Mjg1NzEtMjI0LjkxNDI4NWMtMy42NTcxNDMtMy42NTcxNDMtOS4xNDI4NTctMy42NTcxNDMtMTIuOC0zLjY1NzE0My01LjQ4NTcxNCAwLTkuMTQyODU3IDMuNjU3MTQzLTEyLjggNy4zMTQyODZsLTI1NiAzMjkuMTQyODU3Yy0zLjY1NzE0MyA1LjQ4NTcxNC01LjQ4NTcxNCAxMi44LTEuODI4NTcyIDIwLjExNDI4NSAzLjY1NzE0MyA1LjQ4NTcxNCA5LjE0Mjg1NyAxMC45NzE0MjkgMTYuNDU3MTQzIDEwLjk3MTQyOWg5NTAuODU3MTQzYzcuMzE0Mjg2IDAgMTIuOC0zLjY1NzE0MyAxNi40NTcxNDMtOS4xNDI4NTcgNS40ODU3MTQtOS4xNDI4NTcgMy42NTcxNDMtMTQuNjI4NTcxIDAtMjEuOTQyODU3eiIgZmlsbD0iI0U5RURGMiIgcC1pZD0iMTk5NiI+PC9wYXRoPjwvc3ZnPg==';

var model =
/*#__PURE__*/
function () {
  function model(param) {
    _classCallCheck(this, model);

    this.creatCropper = null;
    this.boxDom = null;
    this.contentBoxDom = null;
    this.cutDom = null;
    this.imgDom = null;
    this.widthDom = null;
    this.heightDom = null;
    this.xDom = null;
    this.yDom = null;
    this.cropperData = {};
    this.formDom = null;
    this.src = 'https://gss2.bdstatic.com/-fo3dSag_xI4khGkpoWK1HF6hhy/baike/s%3D220/sign=652b9cbd6b600c33f479d9ca2a4d5134/4a36acaf2edda3cc7291e78901e93901213f9225.jpg';
  }

  _createClass(model, [{
    key: "renderForm",
    value: function renderForm() {
      var _this = this;

      var inputFn = function inputFn(event, dom) {
        var value = dom.value;
        console.log(dom.name);

        if (!isNaN(value) && value) {
          var data = Object.assign(_this.cropperData, _defineProperty({}, dom.name, +value));

          _this.creatCropper.setData(data);
        }
      };

      var arr = [{
        text: '宽:',
        name: 'width',
        on: {
          input: inputFn
        }
      }, {
        text: '高:',
        name: 'height',
        on: {
          input: inputFn
        }
      }, {
        text: 'x :',
        name: 'x',
        on: {
          input: inputFn
        }
      }, {
        text: 'y :',
        name: 'y',
        on: {
          input: inputFn
        }
      }];
      this.formDom = (0, _utils.creatDom)({
        tag: 'form',
        style: {
          // background:'red',
          // height:'400px',
          top: '80px',
          bottom: '90px',
          right: '30px',
          left: '0px',
          position: 'absolute'
        }
      });
      arr.map(function (item) {
        _this.formDom.appendChild(_this.rednerItem(item));
      });
      return this.formDom;
    }
  }, {
    key: "rednerItem",
    value: function rednerItem(params) {
      var boxDom = (0, _utils.creatDom)({
        tag: 'div'
      });
      var textDom = (0, _utils.creatDom)({
        tag: 'span',
        child: params.text,
        style: {
          display: 'inline-block',
          width: '30px',
          textAlign: 'center'
        }
      });
      var inputDom = (0, _utils.creatDom)({
        tag: 'input',
        attr: {
          name: params.name
        },
        style: {
          display: 'inline-block',
          width: '200px',
          margin: '10px',
          lineHeight: '35px',
          borderRadius: '4px',
          border: '1px solid #d9d9d9',
          boxSizing: 'border-box',
          padding: ' 0 10px'
        },
        on: params.on
      });
      boxDom.appendChild(textDom);
      boxDom.appendChild(inputDom);
      return boxDom;
    }
  }, {
    key: "renderRight",
    value: function renderRight() {
      var _this2 = this;

      var rightBox = (0, _utils.creatDom)({
        tag: 'div',
        style: {
          display: 'inline-block',
          width: '305px',
          height: '100%',
          verticalAlign: 'middle',
          position: 'relative'
        }
      });
      var close = (0, _utils.creatDom)({
        tag: 'div',
        style: {
          dispaly: 'inline-block',
          width: '30px',
          height: '30px',
          backgroundImage: "url(".concat(closeIcon, ")"),
          backgroundSize: '20px',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          position: 'absolute',
          top: '20px',
          right: '20px',
          cursor: 'pointer'
        },
        on: {
          click: function click() {
            _this2.boxDom.style.display = 'none';
          }
        }
      });
      rightBox.appendChild(close);
      rightBox.appendChild(this.renderBtn());
      rightBox.appendChild(this.renderForm());
      return rightBox;
    } // 左侧渲染

  }, {
    key: "renderLeft",
    value: function renderLeft() {
      var leftBox = (0, _utils.creatDom)({
        tag: 'div',
        style: {
          padding: '0px 30px 30px 30px',
          boxSizing: 'border-box',
          width: '650px',
          verticalAlign: 'middle',
          display: 'inline-block'
        }
      });
      var title = (0, _utils.creatDom)({
        tag: 'div',
        child: '图片剪切',
        style: {
          lineHeight: '60px',
          fontSize: '20px',
          fontWeight: 'bold'
        }
      });
      this.cutDom = (0, _utils.creatDom)({
        tag: 'div',
        style: {
          width: '100%',
          height: '512px',
          background: "rgba(0,0,0,0.5)",
          overflow: 'hidden',
          backgroundImage: "url(".concat(imgIccn, ")"),
          backgroundRepeat: 'no-repeat',
          backgroundSize: '80%',
          backgroundPosition: 'center',
          borderRadius: '4px'
        }
      });
      leftBox.appendChild(title);
      leftBox.appendChild(this.cutDom);
      return leftBox;
    }
  }, {
    key: "renderBtn",
    value: function renderBtn() {
      var _this3 = this;

      var btnBox = (0, _utils.creatDom)({
        tag: 'div',
        style: {
          position: 'absolute',
          bottom: '30px'
        }
      });
      btnBox.appendChild((0, _button.default)({
        child: '取消',
        style: {
          margin: '0 30px'
        },
        on: {
          click: function click() {
            _this3.boxDom.style.display = 'none';
          }
        }
      }));
      btnBox.appendChild((0, _button.default)({
        type: 'primary',
        child: '确定',
        style: {
          margin: '0 30px'
        },
        on: {
          click: function click() {
            _this3.submit();
          }
        }
      }));
      return btnBox;
    }
  }, {
    key: "setCropperData",
    value: function setCropperData(params) {
      this.cropperData = _objectSpread({}, params);

      for (var key in params) {
        var item = this.formDom.elements[key];

        if (item) {
          item.value = params[key].toFixed(0);
        }
      }
    }
  }, {
    key: "init",
    value: function init() {
      var _this4 = this;

      this.boxDom = (0, _utils.creatDom)({
        tag: 'div',
        style: {
          dispaly: 'block',
          zIndex: 999,
          background: 'rgba(0,0,0,0.5)',
          position: 'fixed',
          top: '0px',
          left: '0px',
          right: '0px',
          bottom: '0px',
          display: 'none'
        }
      });
      this.contentBoxDom = (0, _utils.creatDom)({
        tag: 'div',
        style: {
          width: '960px',
          height: '600px',
          position: 'absolute',
          boxShadow: '0 0 16px 0 rgba(0,0,0,.16)',
          background: "#fff",
          top: '50%',
          left: '50%',
          transform: 'translateX(-50%) translateY(-50%)'
        }
      });
      this.imgDom = (0, _utils.creatDom)({
        tag: 'img',
        attr: {
          src: 'https://gss2.bdstatic.com/-fo3dSag_xI4khGkpoWK1HF6hhy/baike/s%3D220/sign=652b9cbd6b600c33f479d9ca2a4d5134/4a36acaf2edda3cc7291e78901e93901213f9225.jpg'
        },
        style: {
          display: 'none'
        }
      });
      this.contentBoxDom.appendChild(this.renderLeft());
      this.contentBoxDom.appendChild(this.renderRight());
      this.boxDom.appendChild(this.contentBoxDom);
      this.cutDom.appendChild(this.imgDom);
      this.creatCropper = new _cropper.default(this.imgDom, {
        zoomOnTouch: false,
        movable: true,
        crop: function crop(event) {
          console.log(111);

          _this4.setCropperData(event.detail);
        }
      });
      return this.boxDom;
    }
  }, {
    key: "open",
    value: function open(params) {
      var _this5 = this;

      if (params.src) {
        this.imgDom.src = params.src;
        this.src = params.src;
      }

      this.creatCropper.destroy();
      this.creatCropper = new _cropper.default(this.imgDom, {
        zoomOnTouch: false,
        movable: true,
        crop: function crop(event) {
          _this5.setCropperData(event.detail);
        },
        ready: function ready() {
          _this5.creatCropper.setData(params);
        }
      });
      this.boxDom.style.display = "block";
    }
  }, {
    key: "submit",
    value: function submit() {
      this.boxDom.style.display = "none";

      _drawData.default.pubsub.pub('imgChange', _objectSpread({
        src: this.src
      }, this.creatCropper.getData()));
    }
  }, {
    key: "close",
    value: function close() {}
  }]);

  return model;
}();

exports.default = model;
},{"../../../../utils":"utils/index.js","../cropper":"plugin/draw-editer/components/cropper.js","./index.less":"plugin/draw-editer/components/model/index.less","../button":"plugin/draw-editer/components/button.js","../../draw-data":"plugin/draw-editer/draw-data/index.js"}],"plugin/draw-editer/components/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "inputSelect", {
  enumerable: true,
  get: function () {
    return _inputSelect.default;
  }
});
Object.defineProperty(exports, "textarea", {
  enumerable: true,
  get: function () {
    return _textarea.default;
  }
});
Object.defineProperty(exports, "radioButton", {
  enumerable: true,
  get: function () {
    return _radioButton.default;
  }
});
Object.defineProperty(exports, "switched", {
  enumerable: true,
  get: function () {
    return _switched.default;
  }
});
Object.defineProperty(exports, "color", {
  enumerable: true,
  get: function () {
    return _color.default;
  }
});
Object.defineProperty(exports, "model", {
  enumerable: true,
  get: function () {
    return _model.default;
  }
});

var _inputSelect = _interopRequireDefault(require("./input-select"));

var _textarea = _interopRequireDefault(require("./textarea"));

var _radioButton = _interopRequireDefault(require("./radio-button"));

var _switched = _interopRequireDefault(require("./switched"));

var _color = _interopRequireDefault(require("./color"));

var _model = _interopRequireDefault(require("./model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./input-select":"plugin/draw-editer/components/input-select.js","./textarea":"plugin/draw-editer/components/textarea.js","./radio-button":"plugin/draw-editer/components/radio-button.js","./switched":"plugin/draw-editer/components/switched.js","./color":"plugin/draw-editer/components/color.js","./model":"plugin/draw-editer/components/model/index.js"}],"plugin/draw-editer/draw-detail/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = require("../../../utils");

var _data = _interopRequireDefault(require("./data"));

var _drawData = _interopRequireDefault(require("../draw-data"));

var _components = require("../components");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var drawDetail =
/*#__PURE__*/
function () {
  function drawDetail(canvas) {
    _classCallCheck(this, drawDetail);

    var _drawData$getParams = _drawData.default.getParams(),
        detail = _drawData$getParams.detail;

    this.canvas = detail;
    this.form = null;
    this.activeDom = null;
    this.data = _data.default.call(this), this.detailBox = null;
  }

  _createClass(drawDetail, [{
    key: "init",
    value: function init() {
      var _this = this;

      if (this.detailBox) {
        this.detailBox.parentNode.removeChild(this.detailBox);
      }

      var _drawData$getParams2 = _drawData.default.getParams(),
          canvas = _drawData$getParams2.canvas;

      var detailBox = _utils.creatDom.call(this, {
        tag: 'form',
        style: {
          position: 'absolute',
          width: '300px',
          minHeight: canvas.style.height,
          background: '#FFF',
          margin: '0 -300px 0 0',
          right: '-5px',
          bottom: '0px',
          top: '0px',
          display: 'none'
        }
      });

      this.form = detailBox;
      this.data.map(function (item, index) {
        detailBox.appendChild(_this.divList(item));
      });
      this.detailBox = _drawData.default.setDetail(detailBox);
      this.canvas.appendChild(detailBox);
    }
  }, {
    key: "active",
    value: function active(dom) {
      this.activeDom = dom; // this.init();
      // drawData.getDetail().style.display = 'block'
      // 
      // .text = '3333'
      // console.log(this.form,"kkkk")
      // if(type == text)
      // console.log(type,text,fontFamily,fontSize,lineHeight,textAlign,color)
    }
  }, {
    key: "divList",
    value: function divList(params) {
      // console.log(params.style,"hhh")
      var domBox = _utils.creatDom.call(this, {
        tag: 'div',
        style: Object.assign({
          padding: '5px 10px',
          margin: '8px 5px',
          display: params.type == 'switch' ? 'inline-block' : 'block'
        }, params.style)
      });

      var titleDom = _utils.creatDom.call(this, {
        tag: 'div',
        child: params.title,
        style: {
          margin: '5px 0'
        }
      }); // let formDom = 


      var itemDom = null;

      if (params.type == 'textarea') {
        itemDom = (0, _components.textarea)({
          name: params.name,
          on: params.on
        });
      }

      if (params.type == 'select') {
        itemDom = (0, _components.inputSelect)(params); // itemDom = creatDom.call(this, { tag: 'select', on: params.on })
        // let optionData = params.options;
        // optionData.map((item) => {
        //   itemDom.appendChild(creatDom.call(this, { tag: 'option', child: item.label }))
        // })
      }

      if (params.type == 'radio-button') {
        itemDom = (0, _components.radioButton)({
          name: params.name,
          options: params.options,
          on: params.on
        }); // itemDom = creatDom.call(this, { tag: 'div', style: { margin: '5px' } })
        // let optionData = params.options;
        // optionData.map((item) => {
        //   itemDom.appendChild(creatDom.call(this, item))
        // })
      }

      if (params.type == 'switch') {
        itemDom = (0, _components.switched)(params);
      }

      if (params.type == 'color') {
        itemDom = (0, _components.color)(params); // itemDom = creatDom.call(this, {
        //   tag: 'input',
        //   attr: {
        //     name: params.name,
        //     // class: 'jscolor'
        //     type:'color'
        //   },
        //   style: {
        //     width: '100%',
        //     lineHeight: '35px',
        //     borderRadius: '4px',
        //     border: '1px solid #d9d9d9',
        //     boxSizing: 'border-box',
        //     padding: ' 0 10px',
        //   },
        //   on: params.on
        // })
      }

      if (params.type !== 'switch') {
        domBox.appendChild(titleDom);
      }

      domBox.appendChild(itemDom);
      return domBox;
    }
  }]);

  return drawDetail;
}();

var _default = drawDetail;
exports.default = _default;
},{"../../../utils":"utils/index.js","./data":"plugin/draw-editer/draw-detail/data.js","../draw-data":"plugin/draw-editer/draw-data/index.js","../components":"plugin/draw-editer/components/index.js"}],"plugin/draw-editer/draw-img/data.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var publicStyle = {
  width: '30px',
  height: '30px',
  cursor: 'pointer',
  display: 'inline-block',
  backgroundSize: '25px',
  backgroundColor: '#fff',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  borderRadius: '4px',
  verticalAlign: 'middle',
  margin: '2px'
};

var hover = function hover(event) {
  event.currentTarget.style.backgroundColor = 'rgba(14,19,24,.15)';
};

var setActive = function setActive(event) {
  var active = +event.dataset.active;

  if (!active) {
    event.dataset.active = 1;
    event.style.backgroundColor = 'rgba(14,19,24,0.15)';
  } else {
    event.dataset.active = 0;
    event.style.backgroundColor = '#fff';
  }
};

var _default = [{
  title: "图片",
  name: 'img',
  type: 'img',
  style: {},
  img: 'https://gss2.bdstatic.com/-fo3dSag_xI4khGkpoWK1HF6hhy/baike/s%3D220/sign=652b9cbd6b600c33f479d9ca2a4d5134/4a36acaf2edda3cc7291e78901e93901213f9225.jpg'
}, {
  title: "更换图片",
  name: 'text',
  type: 'change',
  style: {},
  img: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTYxOTY1NTYxODQyIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjI3NjgiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMzIiIGhlaWdodD0iMzIiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTEwNy4wMDggMTA3LjI2NGg4MDkuODU2YzIzLjIzMiAwIDQxLjkyIDE4LjY4OCA0MS45MiA0MS45MnYzMzAuMzY4Yy00MS45Mi0zMi42NC0xMjAuOTYtODMuNzc2LTE4MS41NjgtODMuNzc2LTg4LjQ0OCAwLTE2Ny41NTIgMjA0LjgtMjY1LjI4IDIwNC44QzQzNy40NCA1OTUuODQgMzM1LjEwNCA1MTIgMjE4LjY4OCA1MjYuMDE2Yy00Ni41MjggOS4yOC0xMTEuNjggODMuODQtMTUzLjYgMTM5LjY0OHYtNTE2LjQ4YzAtMjMuMzYgMTguNjg4LTQxLjkyIDQxLjkyLTQxLjkyeiBtMTk1LjUyIDMzNS4xMDRjLTM3LjI0OCAwLTY5LjgyNC0xMy45NTItOTMuMDU2LTM3LjE4NHMtMzcuMjQ4LTYwLjU0NC0zNy4yNDgtOTMuMDU2YzAtMzIuNjQgMTQuMDE2LTY5Ljc2IDM3LjI0OC05My4wNTZhMTI5Ljk4NCAxMjkuOTg0IDAgMCAxIDkzLjA1Ni0zNy4xODRjMzIuNjQgMCA2NS4wODggMTMuOTUyIDkyLjk5MiAzNy4xODQgMjMuMjMyIDIzLjIzMiAzNy4yNDggNjAuNTQ0IDM3LjI0OCA5My4wNTYgMCAzMi42NC0xNC4wMTYgNjkuODI0LTM3LjI0OCA5My4wNTYtMjcuOTA0IDIzLjIzMi02MC40MTYgMzcuMTg0LTkyLjk5MiAzNy4xODR6TTk0MC4wOTYgNDYuNzJIODMuODRDMzcuMTg0IDQ2LjcyIDAgODMuOTA0IDAgMTMwLjQ5NnY3NjMuMjY0YzAgNDYuNTkyIDM3LjE4NCA4My44NCA4My43NzYgODMuODRoODU2LjQ0OGM0Ni41OTIgMCA4My43NzYtMzcuMjQ4IDgzLjc3Ni04My44NFYxMzAuNTZBODMuNTIgODMuNTIgMCAwIDAgOTQwLjE2IDQ2LjcyeiIgcC1pZD0iMjc2OSI+PC9wYXRoPjwvc3ZnPg==',
  on: {
    click: function click(evt) {
      console.log('更换图片', evt);
    }
  }
}, {
  title: "裁剪图片",
  name: 'text',
  type: 'cut',
  img: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTYxOTY1NTYxODQyIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjI3NjgiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMzIiIGhlaWdodD0iMzIiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTEwNy4wMDggMTA3LjI2NGg4MDkuODU2YzIzLjIzMiAwIDQxLjkyIDE4LjY4OCA0MS45MiA0MS45MnYzMzAuMzY4Yy00MS45Mi0zMi42NC0xMjAuOTYtODMuNzc2LTE4MS41NjgtODMuNzc2LTg4LjQ0OCAwLTE2Ny41NTIgMjA0LjgtMjY1LjI4IDIwNC44QzQzNy40NCA1OTUuODQgMzM1LjEwNCA1MTIgMjE4LjY4OCA1MjYuMDE2Yy00Ni41MjggOS4yOC0xMTEuNjggODMuODQtMTUzLjYgMTM5LjY0OHYtNTE2LjQ4YzAtMjMuMzYgMTguNjg4LTQxLjkyIDQxLjkyLTQxLjkyeiBtMTk1LjUyIDMzNS4xMDRjLTM3LjI0OCAwLTY5LjgyNC0xMy45NTItOTMuMDU2LTM3LjE4NHMtMzcuMjQ4LTYwLjU0NC0zNy4yNDgtOTMuMDU2YzAtMzIuNjQgMTQuMDE2LTY5Ljc2IDM3LjI0OC05My4wNTZhMTI5Ljk4NCAxMjkuOTg0IDAgMCAxIDkzLjA1Ni0zNy4xODRjMzIuNjQgMCA2NS4wODggMTMuOTUyIDkyLjk5MiAzNy4xODQgMjMuMjMyIDIzLjIzMiAzNy4yNDggNjAuNTQ0IDM3LjI0OCA5My4wNTYgMCAzMi42NC0xNC4wMTYgNjkuODI0LTM3LjI0OCA5My4wNTYtMjcuOTA0IDIzLjIzMi02MC40MTYgMzcuMTg0LTkyLjk5MiAzNy4xODR6TTk0MC4wOTYgNDYuNzJIODMuODRDMzcuMTg0IDQ2LjcyIDAgODMuOTA0IDAgMTMwLjQ5NnY3NjMuMjY0YzAgNDYuNTkyIDM3LjE4NCA4My44NCA4My43NzYgODMuODRoODU2LjQ0OGM0Ni41OTIgMCA4My43NzYtMzcuMjQ4IDgzLjc3Ni04My44NFYxMzAuNTZBODMuNTIgODMuNTIgMCAwIDAgOTQwLjE2IDQ2LjcyeiIgcC1pZD0iMjc2OSI+PC9wYXRoPjwvc3ZnPg==',
  style: {},
  on: {
    click: function click(evt) {
      console.log('裁剪图片', evt);
    }
  }
}];
exports.default = _default;
},{}],"plugin/draw-editer/draw-img/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = require("../../../utils");

var _data = _interopRequireDefault(require("./data"));

var _drawData = _interopRequireDefault(require("../draw-data"));

var _main = _interopRequireDefault(require("../main"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var drawImg =
/*#__PURE__*/
function () {
  function drawImg(canvas) {
    var _this = this;

    _classCallCheck(this, drawImg);

    var _drawData$getParams = _drawData.default.getParams(),
        detail = _drawData$getParams.detail;

    this.unit = null;
    this.canvas = detail;
    this.upFile = null;
    this.img = null;

    _drawData.default.pubsub.sub('imgChange', function (name, data) {
      var active = _drawData.default.getActive();

      _this.unit = _drawData.default.getParams().unit;

      if (active) {
        var imgDom = active.getElementsByTagName('img')[0]; // console.log()
        // imgDom.style.width = data.width + this.unit;
        // imgDom.style.height = data.height + this.unit;

        imgDom.style.top = -data.y + _this.unit;
        imgDom.style.left = -data.x + _this.unit;
        active.style.height = data.height + _this.unit;
        active.style.width = data.width + _this.unit; // console.log(active,this.unit)

        _this.img.src = data.src;
      }
    });
  }

  _createClass(drawImg, [{
    key: "init",
    value: function init() {
      var _this2 = this;

      var _drawData$getParams2 = _drawData.default.getParams(),
          canvas = _drawData$getParams2.canvas;

      this.upFile = (0, _utils.creatDom)({
        tag: 'input',
        attr: {
          type: 'file'
        },
        on: {
          change: function change(e) {
            (0, _utils.getFileDetail)(e, function (file, url) {
              var active = _drawData.default.getActive();

              var activeImg = active.getElementsByTagName('img')[0];
              activeImg.src = url; // const { fileUpload } = dreawData.getParams();
              // fileUpload(file, url)

              _this2.img.src = url;
            });
          }
        },
        style: {
          display: 'none'
        }
      });

      var detailBox = _utils.creatDom.call(this, {
        tag: 'form',
        style: {
          position: 'absolute',
          width: '300px',
          minHeight: canvas.style.height,
          background: '#FFF',
          margin: '0 -300px 0 0',
          right: '-5px',
          bottom: '0px',
          top: '0px',
          display: 'none'
        }
      }); // 获取 img detail dom 


      _drawData.default.setImg(detailBox);

      _data.default.map(function (item, index) {
        detailBox.appendChild(_this2.divList(item));
      });

      detailBox.appendChild(this.upFile);
      this.canvas.appendChild(detailBox);
    }
  }, {
    key: "divList",
    value: function divList(params) {
      var _this3 = this;

      var domBox = _utils.creatDom.call(this, {});

      var titleDom = null;
      var itemDom = null;

      if (params.type == 'img') {
        titleDom = (0, _utils.creatDom)({
          tag: 'div',
          child: params.title,
          style: {
            'lineHeight': '60px',
            paddingLeft: '34px'
          }
        });
        itemDom = (0, _utils.creatDom)({
          tag: 'img',
          attr: {
            src: params.img
          },
          on: params.on,
          style: {
            width: '50%',
            height: '100px',
            float: 'left'
          }
        });
        this.img = itemDom;

        _drawData.default.setImgDetailDom(itemDom);
      } else {
        titleDom = (0, _utils.creatDom)({
          tag: 'span'
        });
        itemDom = (0, _utils.creatDom)({
          tag: 'span',
          style: {
            display: 'inline-block',
            width: '48%',
            height: '35px',
            lineHeight: '35px',
            textAlign: 'center',
            float: 'right',
            borderRadius: '4px',
            border: '1px solid #eee',
            margin: '5px 0 10px 0',
            cursor: 'pointer'
          },
          on: {
            click: function click(e) {
              if (params.type == 'cut') {
                var model = _drawData.default.getModel();

                var img = _drawData.default.getImgDetailDom();

                model.open({
                  src: img.src
                });
              } else {
                _this3.upFile.click();
              }
            }
          },
          child: params.title
        });
      }

      domBox.appendChild(titleDom);
      domBox.appendChild(itemDom);
      return domBox;
    }
  }]);

  return drawImg;
}();

exports.default = drawImg;
},{"../../../utils":"utils/index.js","./data":"plugin/draw-editer/draw-img/data.js","../draw-data":"plugin/draw-editer/draw-data/index.js","../main":"plugin/draw-editer/main/index.js"}],"plugin/draw-editer/main/data.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = [{
  name: 1,
  id: 1,
  text: '能力提高体系 八年级 秋',
  type: 'text',
  style: {
    // width:50,
    // height:400,
    angle: 0,
    top: 297.58740,
    left: 602.44921,
    color: '#333',
    fontSize: 14,
    lineHeight: 1.5,
    textAlign: 'left',
    fontWeight: 'bold'
  }
}, {
  name: 2,
  id: 2,
  type: 'img',
  src: 'https://tse3-mm.cn.bing.net/th?id=OIP.rJNHO8sYJpEhccdXGlN27gHaFj&w=277&h=207&c=7&o=5&dpr=2&pid=1.7',
  style: {
    // width:100,
    // height:200,
    angle: 0,
    top: 200,
    left: 100,
    color: '#000',
    fontSize: 14
  }
}];
exports.default = _default;
},{}],"plugin/draw-editer/draw-del/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _drawData = _interopRequireDefault(require("../draw-data"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default() {
  document.onkeydown = function (e) {// const {getActive,setActive} = drawData;
    // let active = getActive();
    // if(event.keyCode == 8 && active){
    //     active.parentNode.removeChild(active);
    //     setActive(null);
    // }
    // console.log( event.keyCode,"kkkkk")
  };
};

exports.default = _default;
},{"../draw-data":"plugin/draw-editer/draw-data/index.js"}],"plugin/draw-editer/main/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _drop = _interopRequireDefault(require("../drop"));

var _drawBar = _interopRequireDefault(require("../draw-bar"));

var _drawDetail = _interopRequireDefault(require("../draw-detail"));

var _drawImg = _interopRequireDefault(require("../draw-img"));

var _data = _interopRequireDefault(require("./data"));

var _drawData = _interopRequireDefault(require("../draw-data"));

var _components = require("../components");

var _utils = require("../../../utils");

var _drawDel = _interopRequireDefault(require("../draw-del"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var drawEditer =
/*#__PURE__*/
function () {
  function drawEditer(params) {
    var _this = this;

    _classCallCheck(this, drawEditer);

    _drawData.default.setParams({
      canvas: params.canvas.dom,
      unit: params.unit || 'px',
      zoom: params.canvas.zoom || 1,
      detail: params.detail.dom,
      fileUpload: params.fileUpload
    });

    _drawData.default.pubsub = new _utils.pubsub();
    this.creatModel = new _components.model();
    (0, _drawDel.default)();

    _drawData.default.setDrawEdit(this);

    _drawData.default.setModel(this.creatModel);

    this.canvas = params.canvas.dom;
    this.canvas.parentNode.appendChild(this.creatModel.init());
    this.unit = params.unit || 'px';
    this.zoom = params.canvas.zoom || 1;
    this.drawData = _data.default;
    this.canvas.style.position = 'relative';
    this.canvas.style.overflow = 'hidden';
    this.canvas.style.height = params.canvas.height * this.zoom + this.unit;
    this.canvas.style.width = params.canvas.width * this.zoom + this.unit;
    this.elements = [];
    this.id = 0;

    _drop.default.init(this.canvas, params, this.unit, function (dom) {
      _this.activeElemClick(dom);
    });

    this.bar = new _drawBar.default(params.bar, this);
    this.detail = new _drawDetail.default(canvas);
    this.imgDetail = new _drawImg.default(canvas);
    this.bar.init();
    this.detail.init();
    this.imgDetail.init(); // return this;
    // console.log((new bar()).init(),"kkkk")
  }

  _createClass(drawEditer, [{
    key: "create",
    value: function create() {}
  }, {
    key: "activeElemClick",
    value: function activeElemClick(dom) {// console.log(this)
      // this.detail.active(dom)
    }
  }, {
    key: "elemClick",
    value: function elemClick(callback) {
      _drop.default.elemClick(callback);
    }
  }, {
    key: "add",
    value: function add(params) {
      this.id++; // this.elements.push()

      var data = Object.assign({
        name: this.id,
        id: this.id,
        text: '是的发送到',
        type: 'text',
        url: '',
        style: {
          width: 50 + 'px',
          height: 400 + 'px',
          angle: 0,
          top: 100,
          left: 100,
          color: '#000',
          fontSize: 14
        }
      }, params);
      this.canvas.appendChild(_drop.default.create(data, this.canvas));
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      // this.drawDat
      this.drawData.map(function (item, index) {
        _this2.canvas.appendChild(_drop.default.create(item));
      });
    }
  }]);

  return drawEditer;
}();

exports.default = drawEditer;
},{"../drop":"plugin/draw-editer/drop/index.js","../draw-bar":"plugin/draw-editer/draw-bar/index.js","../draw-detail":"plugin/draw-editer/draw-detail/index.js","../draw-img":"plugin/draw-editer/draw-img/index.js","./data":"plugin/draw-editer/main/data.js","../draw-data":"plugin/draw-editer/draw-data/index.js","../components":"plugin/draw-editer/components/index.js","../../../utils":"utils/index.js","../draw-del":"plugin/draw-editer/draw-del/index.js"}],"plugin/draw-editer/index.js":[function(require,module,exports) {
var global = arguments[3];
"use strict";

var _main = _interopRequireDefault(require("./main"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function (global, factory) {
  "use strict";

  if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && _typeof(module.exports) === "object") {
    module.exports = global.document ? factory(global, true) : function (w) {
      if (!w.document) {
        throw new Error("draw-editer requires a window with a document");
      }

      return factory(w);
    };
  } else {
    factory(global);
  }
})(typeof window !== "undefined" ? window : void 0, function (window, noGlobal) {
  var version = "0.0.1";
  window.drawEditer = _main.default;
});
},{"./main":"plugin/draw-editer/main/index.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "64058" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","plugin/draw-editer/index.js"], null)
//# sourceMappingURL=/draw-editer.ec25b2a9.js.map