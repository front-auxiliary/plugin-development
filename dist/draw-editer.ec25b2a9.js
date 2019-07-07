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
          dom["on" + key] = function (event) {
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
  }

  _onListener.default.call(this, dom, params.on, params);

  return dom;
}
},{"./setStyle":"utils/dom/setStyle.js","./setAttr":"utils/dom/setAttr.js","./onListener":"utils/dom/onListener.js"}],"utils/index.js":[function(require,module,exports) {
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

var _setStyle = _interopRequireDefault(require("./dom/setStyle"));

var _creatDom = _interopRequireDefault(require("./dom/creatDom"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./dom/setStyle":"utils/dom/setStyle.js","./dom/creatDom":"utils/dom/creatDom.js"}],"plugin/draw-editer/drop/icon.js":[function(require,module,exports) {
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
},{}],"plugin/draw-editer/drop/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = require("../../../utils");

var _icon = _interopRequireDefault(require("./icon"));

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
    key: "init",
    value: function init(canvas, params, unit, activeElemClick) {
      var _this = this;

      this.canvas = canvas;
      this.unit = unit;
      this.canvasDetail = this.canvas.getBoundingClientRect(); // console.log(this.canvasDetail)

      this.elemClick = params.canvas.on.elemClick;
      this.activeElemClick = activeElemClick;

      document.onmouseup = function (event) {
        _this.onmouseup(event, _this.canvas);
      };

      document.onmousemove = function (event) {
        _this.onmousemove(event, _this.canvas);
      };
    }
  }, {
    key: "styleFramt",
    value: function styleFramt(style, elem) {
      var judgeStr = 'width,height,left,top,fontSize,lineHeight';
      var newStyle = {};

      for (var key in style) {
        if (key == 'angle' && style[key]) {
          newStyle.transform = "rotate(".concat(style[key], "deg)");
        } else if (key == 'width' || key == 'height') {
          if (key == 'width') {
            newStyle.minWidth = style.width + this.unit;
          }

          if (key == 'height') {
            newStyle.minHeight = style.height + this.unit;
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

      var dom = (0, _utils.creatDom)({
        tag: 'div',
        style: {
          backgroundImage: "url(".concat(elem.src, ")"),
          width: '100%',
          height: '100%',
          display: 'block'
        }
      });
      var img = (0, _utils.creatDom)({
        tag: 'img',
        attr: {
          src: elem.src
        },
        style: {
          height: '100%',
          width: '100%',
          display: 'block',
          userSelect: 'none' // pointerEvents:'none'

        },
        on: {
          load: function load(event) {
            dropDom.style.height = img.height + _this2.unit;
            dropDom.style.width = img.width + _this2.unit; // console.log(img.width,"kkk")
          }
        }
      });
      return img;
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
          boxSizing: 'border-box' // writingMode:'vertical-rl'

        }, this.styleFramt(elem.style, elem)),
        child: elem.text || '',
        attr: {
          id: elem.name,
          tabindex: elem.id,
          class: 'draw-editor-elem'
        },
        data: {},
        on: {
          mousedown: function mousedown(event) {
            event.stopPropagation();

            _this3.onmousedown(event, dropDom, _this3.canvas);

            if (_this3.elemClick) {
              _this3.elemClick(dropDom); // console.log('-----')


              _this3.activeElemClick(dropDom);
            }
          },
          blur: function blur() {
            // console.log(that.isAngleClick)
            // if(that.isAngleClick){
            //   return ;
            // }
            var zoomArr = dropDom.querySelectorAll('.zoom');
            dropDom.style.borderWidth = 0;

            for (var i = 0; i < zoomArr.length; i++) {
              zoomArr[i].style.display = 'none';
            } // console.log("kkkk1111")

          },
          focus: function focus() {
            var elemType = dropDom.dataset.elemtype; // console.log(elemType,"jjjjjj")

            var zoomArr = dropDom.querySelectorAll('.zoom');

            for (var i = 0; i < zoomArr.length; i++) {
              zoomArr[i].style.display = 'block';
            }
          }
        }
      }); // const dropDom = document.createElement('div');


      var zoomDoms = this.createZoom();
      var angleDom = this.createAngle();
      var sizes = this.createSize();
      var childs = [angleDom].concat(_toConsumableArray(zoomDoms));

      if (elem.type == 'img') {
        childs = [].concat(_toConsumableArray(childs), _toConsumableArray(sizes));
      }

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

      angleIcon.tabIndex = 1;
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
      var transform = parentNode.style.transform;
      var top = parentNode.style.top.replace('px', '');
      var left = parentNode.style.left.replace('px', '');
      var elemDetail = {
        width: width.replace('px', ''),
        height: height.replace('px', ''),
        centerX: detail.left + detail.width / 2,
        centerY: detail.top + detail.height / 2,
        mouseX: event.pageX - left - this.canvasDetail.left,
        mouseY: event.pageY - top - this.canvasDetail.top,
        pageX: event.pageX,
        pageY: event.pageY,
        angle: transform.replace('rotate(', '').replace('deg)', ''),
        x: left,
        y: top
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
      var activeElem = null,
          type = null,
          activeDetail = null,
          centerPos = null,
          mouseToPagePos = null,
          activePos = null,
          mousePos = null;

      if (this.activeDom) {
        type = this.activeDom.dataset.type;
        activeElem = this.activeDom.parentNode;
        activeDetail = JSON.parse(this.activeDom.dataset.activeDetail);
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
        activeDetail.width = mousePos.x - activePos.x + +activeDetail.width; // activeDetail.y = activeDetail.y - (activePos.y - mousePos.y);
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
        activeDetail.height = activePos.y - mousePos.y + +activeDetail.height;
        activeDetail.x = activeDetail.x - (activePos.x - mousePos.x);
        activeDetail.y = activeDetail.y - (activePos.y - mousePos.y);
      }

      if (type === 'rightTop') {
        activeDetail.width = mousePos.x - activePos.x + +activeDetail.width;
        activeDetail.height = activePos.y - mousePos.y + +activeDetail.height;
        activeDetail.y = activeDetail.y - (activePos.y - mousePos.y);
      }

      if (type === 'rightBottom') {
        activeDetail.width = mousePos.x - activePos.x + +activeDetail.width;
        activeDetail.height = mousePos.y - activePos.y + +activeDetail.height;
      }

      if (type === 'leftBottom') {
        activeDetail.width = activePos.x - mousePos.x + +activeDetail.width;
        activeDetail.height = mousePos.y - activePos.y + +activeDetail.height;
        activeDetail.x = activeDetail.x - (activePos.x - mousePos.x);
      }

      if (activeElem) {
        activeElem.style.transform = "rotate(".concat(activeDetail.angle, "deg) ");
        activeElem.style.left = "".concat(activeDetail.x, "px");
        activeElem.style.top = "".concat(activeDetail.y, "px");
        activeElem.style.width = "".concat(activeDetail.width, "px");
        activeElem.style.height = "".concat(activeDetail.height, "px");
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
},{"../../../utils":"utils/index.js","./icon":"plugin/draw-editer/drop/icon.js"}],"plugin/draw-editer/draw-bar/data.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = [{
  text: '字体',
  img: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTYxOTY1NTE5NzQyIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE5OTIiIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTU2My45NTY2MjcgMjc1Ljc0MjYzNSA4MDAuODk5MTYxIDI3NS43NDI2MzVDODI5LjgzNDQgMjc1Ljc0MjYzNSA4NTMuMzMzMzMzIDI1Mi4yMjA1NzggODUzLjMzMzMzMyAyMjMuMjA0NjUxIDg1My4zMzMzMzMgMTkzLjk4NjQzIDgyOS44NTc3NTQgMTcwLjY2NjY2NyA4MDAuODk5MTYxIDE3MC42NjY2NjdMMjIzLjEwMDg0IDE3MC42NjY2NjdDMTk0LjE2NTU5OSAxNzAuNjY2NjY3IDE3MC42NjY2NjcgMTk0LjE4ODcyMyAxNzAuNjY2NjY3IDIyMy4yMDQ2NTEgMTcwLjY2NjY2NyAyNTIuNDIyODcyIDE5NC4xNDIyNDYgMjc1Ljc0MjYzNSAyMjMuMTAwODQgMjc1Ljc0MjYzNUw0NjAuMDQyNzIxIDI3NS43NDI2MzVDNDU5LjY2MDEzMSAyNzguMzAwNzM0IDQ1OS40NjIwMTggMjgwLjkxOTQxNCA0NTkuNDYyMDE4IDI4My41ODQ2MDdMNDU5LjQ2MjAxOCA3OTIuOTUzMzc4QzQ1OS40NjIwMTggODIxLjk4Njc0MSA0ODIuOTg0MDczIDg0NS4zMDk1OTQgNTEyIDg0NS4zMDk1OTQgNTQxLjIxODIyMiA4NDUuMzA5NTk0IDU2NC41Mzc5ODIgODIxLjg2ODkxOSA1NjQuNTM3OTgyIDc5Mi45NTMzNzhMNTY0LjUzNzk4MiAyODMuNTg0NjA3QzU2NC41Mzc5ODIgMjgwLjkxNzg5MSA1NjQuMzM5NTQxIDI3OC4yOTkzNTEgNTYzLjk1NjYyNyAyNzUuNzQyNjM1WiIgcC1pZD0iMTk5MyI+PC9wYXRoPjwvc3ZnPg==',
  class: '',
  on: {
    click: function click(draw, evt) {
      draw.add('text');
    }
  }
}, {
  text: '图片',
  img: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTYxOTY1NTYxODQyIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjI3NjgiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMzIiIGhlaWdodD0iMzIiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTEwNy4wMDggMTA3LjI2NGg4MDkuODU2YzIzLjIzMiAwIDQxLjkyIDE4LjY4OCA0MS45MiA0MS45MnYzMzAuMzY4Yy00MS45Mi0zMi42NC0xMjAuOTYtODMuNzc2LTE4MS41NjgtODMuNzc2LTg4LjQ0OCAwLTE2Ny41NTIgMjA0LjgtMjY1LjI4IDIwNC44QzQzNy40NCA1OTUuODQgMzM1LjEwNCA1MTIgMjE4LjY4OCA1MjYuMDE2Yy00Ni41MjggOS4yOC0xMTEuNjggODMuODQtMTUzLjYgMTM5LjY0OHYtNTE2LjQ4YzAtMjMuMzYgMTguNjg4LTQxLjkyIDQxLjkyLTQxLjkyeiBtMTk1LjUyIDMzNS4xMDRjLTM3LjI0OCAwLTY5LjgyNC0xMy45NTItOTMuMDU2LTM3LjE4NHMtMzcuMjQ4LTYwLjU0NC0zNy4yNDgtOTMuMDU2YzAtMzIuNjQgMTQuMDE2LTY5Ljc2IDM3LjI0OC05My4wNTZhMTI5Ljk4NCAxMjkuOTg0IDAgMCAxIDkzLjA1Ni0zNy4xODRjMzIuNjQgMCA2NS4wODggMTMuOTUyIDkyLjk5MiAzNy4xODQgMjMuMjMyIDIzLjIzMiAzNy4yNDggNjAuNTQ0IDM3LjI0OCA5My4wNTYgMCAzMi42NC0xNC4wMTYgNjkuODI0LTM3LjI0OCA5My4wNTYtMjcuOTA0IDIzLjIzMi02MC40MTYgMzcuMTg0LTkyLjk5MiAzNy4xODR6TTk0MC4wOTYgNDYuNzJIODMuODRDMzcuMTg0IDQ2LjcyIDAgODMuOTA0IDAgMTMwLjQ5NnY3NjMuMjY0YzAgNDYuNTkyIDM3LjE4NCA4My44NCA4My43NzYgODMuODRoODU2LjQ0OGM0Ni41OTIgMCA4My43NzYtMzcuMjQ4IDgzLjc3Ni04My44NFYxMzAuNTZBODMuNTIgODMuNTIgMCAwIDAgOTQwLjE2IDQ2LjcyeiIgcC1pZD0iMjc2OSI+PC9wYXRoPjwvc3ZnPg==',
  class: '',
  on: {
    click: function click(draw, evt) {
      draw.add('text');
    }
  }
}];
exports.default = _default;
},{}],"plugin/draw-editer/draw-bar/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _data = _interopRequireDefault(require("./data"));

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
        var dombox = (0, _utils.creatDom)({
          tag: 'div',
          style: style,
          on: {
            hover: function hover(event) {
              event.currentTarget.style.backgroundColor = 'rgba(14,19,24,.15)';
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

        _this.dom.appendChild(dombox);
      });
    }
  }]);

  return bar;
}();

var _default = bar;
exports.default = _default;
},{"./data":"plugin/draw-editer/draw-bar/data.js","../../../utils":"utils/index.js"}],"plugin/draw-editer/draw-data/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var arr = [];
var activeDom = null;
var _default = {
  add: function add(item) {
    return arr.push(item);
  },
  getData: function getData(id) {
    if (id) {
      return arr;
    } else {
      for (var i = 0; i < arr.length; i++) {
        if (id == arr[i].id) {
          return arr[i];
        }
      }
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
  },
  getActive: function getActive() {
    return activeDom;
  }
};
exports.default = _default;
},{}],"plugin/draw-editer/draw-detail/data.js":[function(require,module,exports) {
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
  return [{
    title: "文字内容",
    name: 'text',
    type: 'textarea',
    on: {
      input: function input(event, e) {
        var activeDom = _drawData.default.getActive(); // console.log(event,e)


        activeDom.innerText = e.value;
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
        var activeDom = _drawData.default.getActive();

        activeDom.style.fontSize = e.value + 'pt';
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

        activeDom.style.lineHeight = e.value + 'pt';
      }
    }
  }, {
    title: "颜色",
    name: 'color',
    type: 'color',
    on: {
      change: function change(event, e) {
        console.log("00000");

        var activeDom = _drawData.default.getActive();

        activeDom.style.color = '#' + e.value;
        console.log(e.value);
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
      change: function change(event, dom) {
        // console.log("oooo",dom.value,event)
        var activeDom = _drawData.default.getActive();

        activeDom.style.textAlign = dom.value;
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
      value: 'll',
      label: '',
      url: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTYxOTg1NDI2NDExIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEyNzggMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE2MzMiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjQ5LjYwOTM3NSIgaGVpZ2h0PSIyMDAiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTI2My40NzYyMzY3NyA3MzMuNDcwMTg3NjdoNjY5LjAxNDY2OTU1djY3LjA1MzU3NTU1SDI2My40NzYyMzY3N3pNNDAyLjc4NjU0MzQ1IDQ5OC40Nzg0NTczNmg1MzEuNDY2NzIyMDl2NjcuMDUzNTc1NTVINDAyLjc4NjU0MzQ1ek0yNjMuNDc2MjM2NzcgMjYzLjQ3NjIzNjc3aDY2OS4wMTQ2Njk1NXY2Ny4wNTM1NzU1NEgyNjMuNDc2MjM2Nzd6IiBmaWxsPSIjNjY2NjY2IiBwLWlkPSIxNjM0Ij48L3BhdGg+PC9zdmc+'
    }]
  }, {
    title: "",
    name: 'blod',
    type: 'switch',
    style: {
      padding: '0px',
      margin: '0px 5px'
    },
    url: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTYxOTg4NzA4NjM2IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE5MzkiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNMjczLjUyMjA3MTA1IDg1OS42MTQyODgzM1YxNjQuNDE4NTA0MTloMjA1LjQ5ODEyNTE5cTkyLjEzNTMwMjkgMCAxNDcuMjI2Mjg5NCA0My43MjMwMDUzdDU1LjA5MDk4NzE2IDExNS45OTcxMzI5N3EwIDU3LjQ1MjAyODktMzIuNzkyMjU0MzEgMTAxLjQzNzM3MjMydC05MC4wNDc1Mjk0NiA2Mi40MTQ1OTAxOXYxLjc5MjY0MjhxNzEuMzU1OTQ0NTkgOC4wNzc4MjU1MyAxMTQuMDI5NTk4MDggNTMuNjM3MTk2OTl0NDIuNjI5OTMwMTQgMTE1LjU3MDgzMzYxcTAgODkuNzc0MjYwNS02NC44MDg0MjQ0NCAxNDUuMTkzMTcwMTV0LTE2NS45MTc4NzQ5NCA1NS40Mjk4Mzk4MXpNMzYzLjg0Mjg2OTQ3IDI0Mi45MzQwOTA1NFY0NjAuNjA5MDcyOTVoODIuMTk5MjUwMjFxNjUuNDc1MjAwMjMgMCAxMDIuNzQ5MDYyMjUtMzEuNjQ0NTI1NjJ0MzcuMjYyOTMxMTgtODcuNzQxMTQwNTZxMC05OC4yODkzMTYyMi0xMzEuODY4NTg0MjMtOTguMjg5MzE2MjR6IG0wIDI5NS43NzUyMDAyNHYyNDIuMzM0NzU3MDFoMTA4LjM4OTMzMDE2cTcwLjg5Njg1MzM4IDAgMTA5LjUxNTE5Nzg2LTMyLjU0MDg0NjM3dDM4LjYxODM0Mzc5LTkwLjQ0MTAzNjk3cTAtMTE5LjM4NTY2NjE5LTE2My4wMzIxNTU2MS0xMTkuMzg1NjY1NTF6IiBmaWxsPSIjNjY2NjY2IiBwLWlkPSIxOTQwIj48L3BhdGg+PC9zdmc+',
    on: {
      change: function change(event, e) {
        var activeDom = _drawData.default.getActive(); // console.log(event,e)


        if (e.checked) {
          activeDom.style.fontWeight = 'bold';
          return;
        }

        activeDom.style.fontWeight = 'normal';
      }
    }
  }, {
    title: "",
    name: 'italic',
    type: 'switch',
    style: {
      padding: '0px',
      margin: '0px'
    },
    url: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTYxOTg4NzM0Njc1IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjIyNDUiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNNDQ2LjEwOTMyNzgyIDkwMi43ODg1NzQyMkgzNjkuMDAxMjQ5NzVMNTc3Ljg5MDY3MjE4IDE2MS4yMTE0MjU3OGg3Ny4xMDgwNzgwN0w0NDYuMTA5MzI3ODIgOTAyLjc4ODU3NDIyeiIgZmlsbD0iIzY2NjY2NiIgcC1pZD0iMjI0NiI+PC9wYXRoPjwvc3ZnPg==',
    on: {
      change: function change(event, e) {
        var activeDom = _drawData.default.getActive(); // console.log(event,e)


        if (e.checked) {
          activeDom.style.fontStyle = 'italic';
          return;
        }

        activeDom.style.fontStyle = 'normal';
      }
    }
  }, {
    title: "",
    name: 'italic',
    type: 'switch',
    style: {
      padding: '0px',
      margin: '5px'
    },
    url: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTYxOTg4NzI4NDA5IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjIwOTIiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNMjQ0LjgwMzkxMTk2IDkzMC4yNjMzNjgwNXYtNTMuMzA4MzAzNDNsNTM0LjM5MjE3NjA4LTQuODQ5MDY1NjF2NTMuMjk3ODMwMjNMMjQ0LjgwMzkxMTk2IDkzMC4yNjMzNjgwNXpNNzUzLjc5ODcxMzc4IDUyMS40MTI3Njk2NXEwIDI3My41MDYxNTcxOS0yNDguMTA4NzgyOTEgMjczLjUwNjE1Nzk3LTIzNy43NDAzNzAyNSAwLTIzNy43NDAzNzAyNy0yNjMuOTIzMjMwNzhWMTM5LjMwMDEwODQ0aDgzLjI2MTQ5NTE0djM4Ny45MzU3Mjk2OXEwIDE5My41NzUxMjIxMSAxNjIuMzMzNzMyODggMTkzLjU3NTEyMjEgMTU2Ljk0MDA2Mzg1IDAgMTU2Ljk0MDA2Mzg2LTE4Ny4zMzMxMjgyVjEzOS4yNDc3NDMwNUg3NTMuNzk4NzEzNzh6IiBmaWxsPSIjNjY2NjY2IiBwLWlkPSIyMDkzIj48L3BhdGg+PC9zdmc+',
    on: {
      change: function change(event, e) {
        var activeDom = _drawData.default.getActive(); // console.log(event,e)


        if (e.checked) {
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
        var value = dom.value || '';
        var arr = value ? options.filter(function (currentValue) {
          // console.log(currentValue,"kkkkk")
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
  console.log(options, "kkkkk");
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

var render = function render(options, boxDom, params) {
  var change = params.on.change;
  boxDom.innerHTML = '';
  options = options.map(function (item) {
    var lableDom = (0, _utils.creatDom)({
      tag: 'label',
      chlid: 'niho',
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
        backgroundPosition: 'center'
      }
    });
    var radioDom = (0, _utils.creatDom)({
      tag: 'input',
      attr: {
        type: 'radio',
        name: params.name,
        value: item.value
      },
      on: {
        change: function change(event, dom) {
          // console.log('iiiiii')
          for (var i = 0; i < options.length; i++) {
            var value = options[i].dom.dataset.value;
            console.log(options[i].dom.value);

            if (value == dom.value) {
              options[i].dom.style.backgroundColor = 'red';
            } else {
              options[i].dom.style.backgroundColor = '#fff';
            }
          }

          params.on.change(event, dom);
        }
      },
      style: {
        width: '30px',
        height: '30px',
        display: 'inline-block',
        opacity: '0',
        cursor: 'pointer'
      }
    });
    lableDom.appendChild(radioDom);
    boxDom.appendChild(lableDom);
    item.dom = lableDom;
    return item;
  }); // console.log("mmmmn",options)
};

var _default = function _default(params) {
  options = [].concat(params.options);
  var boxDom = (0, _utils.creatDom)({
    tag: 'div',
    style: {
      display: 'inline-block'
    }
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
  var boxDom = (0, _utils.creatDom)({
    tag: 'div',
    style: {
      display: 'inline-block',
      width: '30px',
      height: '30px',
      backgroundImage: "url(".concat(params.url, ")"),
      backgroundSize: '100%',
      backgroundPosition: 'center'
    }
  });
  var checkbox = (0, _utils.creatDom)({
    tag: 'input',
    attr: {
      type: 'checkbox'
    },
    style: {
      width: '30px',
      height: '30px',
      display: 'inline-block',
      opacity: '0',
      cursor: 'pointer'
    },
    on: {
      change: function change(event, dom) {
        if (dom.checked) {
          boxDom.style.backgroundColor = 'red';
        } else {
          boxDom.style.backgroundColor = '#fff';
        }

        params.on.change(event, dom);
      }
    }
  });
  boxDom.appendChild(checkbox);
  return boxDom;
};

exports.default = _default;
},{"../../../utils":"utils/index.js"}],"plugin/draw-editer/components/index.js":[function(require,module,exports) {
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

var _inputSelect = _interopRequireDefault(require("./input-select"));

var _textarea = _interopRequireDefault(require("./textarea"));

var _radioButton = _interopRequireDefault(require("./radio-button"));

var _switched = _interopRequireDefault(require("./switched"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./input-select":"plugin/draw-editer/components/input-select.js","./textarea":"plugin/draw-editer/components/textarea.js","./radio-button":"plugin/draw-editer/components/radio-button.js","./switched":"plugin/draw-editer/components/switched.js"}],"plugin/draw-editer/draw-detail/index.js":[function(require,module,exports) {
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

    this.canvas = canvas;
    this.form = null;
    this.activeDom = null;
    this.data = _data.default.call(this);
  }

  _createClass(drawDetail, [{
    key: "init",
    value: function init() {
      var _this = this;

      var detailBox = _utils.creatDom.call(this, {
        tag: 'form',
        style: {
          position: 'absolute',
          width: '300px',
          background: '#FFF',
          margin: '0 -300px 0 0',
          right: '-5px',
          bottom: '0px',
          top: '0px' // boxShadow:'0 2px 8px rgba(0,0,0,0.15)',

        }
      });

      this.form = detailBox;
      this.data.map(function (item, index) {
        detailBox.appendChild(_this.divList(item));
      });
      this.canvas.appendChild(detailBox);
    }
  }, {
    key: "active",
    value: function active(dom) {
      // let type = dom.dataset.elemtype,
      // text = dom.innerText,
      // fontFamily = dom.style.fontFamily,
      // fontSize = dom.style.fontSize,
      // lineHeight = dom.style.lineHeight,
      // textAlign = dom.style.textAlign,
      // fontWeight = dom.style.fontWeight,
      // color=dom.style.color;
      this.activeDom = dom;
      var formArr = {
        text: dom.innerText,
        fontFamily: dom.style.fontFamily,
        fontSize: dom.style.fontSize,
        lineHeight: dom.style.lineHeight,
        textAlign: dom.style.textAlign,
        color: dom.style.color
      };

      for (var key in formArr) {
        var itemName = this.form.elements[key];

        if (key == 'color') {
          console.log(key, "----", itemName, formArr[key]);
        }

        if (!itemName.length) {
          itemName.value = formArr[key];
        } else {
          for (var i = 0; i < itemName.length; i++) {
            var item = itemName[i];

            if (item.value == formArr[key]) {
              item.checked = true;
            } else {
              item.checked = false;
            }
          }
        }
      }

      _drawData.default.setActive(dom); // 
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
        itemDom = _utils.creatDom.call(this, {
          tag: 'input',
          attr: {
            name: params.name,
            class: 'jscolor'
          },
          on: params.on
        });
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
  img: 'https://tse3-mm.cn.bing.net/th?id=OIP.rJNHO8sYJpEhccdXGlN27gHaFj&w=277&h=207&c=7&o=5&dpr=2&pid=1.7'
}, {
  title: "更换图片",
  name: 'text',
  type: 'div',
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
  type: 'div',
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var drawImg =
/*#__PURE__*/
function () {
  function drawImg(canvas) {
    _classCallCheck(this, drawImg);

    this.canvas = canvas;
  }

  _createClass(drawImg, [{
    key: "init",
    value: function init() {
      var _this = this;

      var detailBox = _utils.creatDom.call(this, {
        tag: 'form',
        style: {
          position: 'absolute',
          width: '300px',
          background: '#FFF',
          margin: '0 -300px 0 0',
          right: '0px',
          bottom: '0px',
          top: '0px',
          boxShadow: '1px 1px 1px 1px rgba(14,19,24,.15)'
        }
      });

      _data.default.map(function (item, index) {
        detailBox.appendChild(_this.divList(item));
      });

      this.canvas.appendChild(detailBox);
    }
  }, {
    key: "divList",
    value: function divList(params) {
      var domBox = _utils.creatDom.call(this, {});

      var titleDom = null; // let formDom = 

      var itemDom = null;

      if (params.type == 'img') {
        titleDom = _utils.creatDom.call(this, {
          tag: 'div',
          child: params.title,
          style: {
            'lineHeight': '60px',
            paddingLeft: '34px'
          }
        });
        itemDom = _utils.creatDom.call(this, {
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
      } else {
        titleDom = _utils.creatDom.call(this, {
          tag: 'span'
        });
        itemDom = _utils.creatDom.call(this, {
          tag: 'span',
          style: {
            display: 'inline-block',
            width: '49%',
            height: '35px',
            float: 'right',
            border: '1px solid #eee',
            margin: '5px 0 10px 0'
          },
          on: params.on,
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

var _default = drawImg;
exports.default = _default;
},{"../../../utils":"utils/index.js","./data":"plugin/draw-editer/draw-img/data.js"}],"plugin/draw-editer/main/data.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = [{
  name: 1,
  id: 1,
  text: '物理 <br/> 元本9',
  type: 'text',
  style: {
    width: 50,
    height: 400,
    angle: 0,
    top: 40,
    left: 800,
    color: '#333',
    fontSize: 80,
    lineHeight: 96,
    textAlign: 'left',
    fontWeight: 'bold'
  }
}, {
  name: 2,
  id: 2,
  type: 'img',
  src: 'https://tse3-mm.cn.bing.net/th?id=OIP.rJNHO8sYJpEhccdXGlN27gHaFj&w=277&h=207&c=7&o=5&dpr=2&pid=1.7',
  style: {
    width: 100,
    height: 200,
    angle: 0,
    top: 200,
    left: 100,
    color: '#000',
    fontSize: 14
  }
}];
exports.default = _default;
},{}],"plugin/draw-editer/main/index.js":[function(require,module,exports) {
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

    this.canvas = params.canvas.dom;
    this.unit = params.unit || 'px';
    this.zoom = params.canvas.zoom || 1;
    this.drawData = _data.default;
    this.canvas.style.position = 'relative';
    this.canvas.style.height = params.canvas.height * this.zoom + this.unit;
    this.canvas.style.width = params.canvas.width * this.zoom + this.unit;
    this.elements = [];
    this.id = 0; // console.log(params,"kjjj")

    _drop.default.init(this.canvas, params, this.unit, function (dom) {
      _this.activeElemClick(dom);
    });

    this.bar = new _drawBar.default(params.bar, this);
    this.detail = new _drawDetail.default(canvas);
    this.imgDetail = new _drawImg.default(canvas);
    this.bar.init();
    this.detail.init(); // this.imgDetail.init();
    // return this;
    // console.log((new bar()).init(),"kkkk")
  }

  _createClass(drawEditer, [{
    key: "create",
    value: function create() {}
  }, {
    key: "activeElemClick",
    value: function activeElemClick(dom) {
      console.log(this);
      this.detail.active(dom);
    }
  }, {
    key: "getData",
    value: function getData() {
      var doms = this.canvas.querySelectorAll('.box');
      console.log(doms, "kkkkk");

      for (var key in doms) {
        var style = doms[key].style;
        console.log(style, "kkkk"); // arr.push({
        // })
      } // doms.map((item,index)=>{
      //   let style = item.style;
      //   console.log(style,"kkkk")
      // })

    }
  }, {
    key: "elemClick",
    value: function elemClick(callback) {
      _drop.default.elemClick(callback);
    }
  }, {
    key: "add",
    value: function add(type) {
      this.id++; // this.elements.push()

      this.canvas.appendChild(_drop.default.create({
        name: type + this.id,
        id: this.id,
        text: '是的发送到',
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
      }, this.canvas));
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
},{"../drop":"plugin/draw-editer/drop/index.js","../draw-bar":"plugin/draw-editer/draw-bar/index.js","../draw-detail":"plugin/draw-editer/draw-detail/index.js","../draw-img":"plugin/draw-editer/draw-img/index.js","./data":"plugin/draw-editer/main/data.js"}],"plugin/draw-editer/index.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "53829" + '/');

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