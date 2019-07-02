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
        dom[key] = attrs[key];
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
    for (var key in onBar) {
      if (onBar[key]) {
        if (key == 'hover') {
          dom.removeEventListener('mousemove', onBar[key].bind(this));
          dom.removeEventListener('mouseleave', onBar[key].bind(this));
          dom.addEventListener('mousemove', onBar[key].bind(this));
          dom.addEventListener('mouseleave', function () {
            (0, _setStyle.default)(dom, params.style);
            (0, _setAttr.default)(dom, params.attr);
          });
        } else {
          // dom[`on`+key] = params.on[key].bind(this,dom);
          dom.removeEventListener(key, onBar[key].bind(this, dom));
          dom.addEventListener(key, onBar[key].bind(this, dom));
        }
      }
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
},{"./dom/setStyle":"utils/dom/setStyle.js","./dom/creatDom":"utils/dom/creatDom.js"}],"plugin/draw-editer/drop/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = require("../../../utils");

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

    this.canvasDetail = null;
    this.activeDom = null;
  }

  _createClass(drop, [{
    key: "init",
    value: function init(canvas, params) {
      var _this = this;

      this.canvas = canvas;
      this.canvasDetail = this.canvas.getBoundingClientRect(); // console.log(this.canvasDetail)

      this.elemClick = params.canvas.on.elemClick;

      document.onmouseup = function (event) {
        _this.onmouseup(event, _this.canvas);
      };

      document.onmousemove = function (event) {
        _this.onmousemove(event, _this.canvas);
      };
    }
  }, {
    key: "create",
    value: function create(elem, canvas) {
      var _this2 = this;

      var dropDom = document.createElement('div');
      var zoomDoms = this.createZoom();
      var angleDom = this.createAngle();
      var sizes = this.createSize();
      var childs = [angleDom].concat(_toConsumableArray(sizes), _toConsumableArray(zoomDoms));
      var dropStyle = Object.assign({
        display: 'inline-block',
        position: 'absolute',
        border: '1px solid #fff',
        cursor: 'move',
        transformOrigin: 'center',
        transform: 'rotate(0deg)'
      }, elem.style);
      dropDom.innerText = elem.text;
      dropDom.className = 'box'; // 添加旋转图标

      dropDom.appendChild(angleDom); // 添加缩放图标

      for (var key in childs) {
        dropDom.appendChild(childs[key]);
      }

      (0, _utils.setStyle)(dropDom, dropStyle);
      dropDom.id = elem.name;

      dropDom.onmousedown = function (event) {
        event.stopPropagation();

        _this2.onmousedown(event, dropDom, canvas);

        console.log(_this2, "kkkkk");

        if (_this2.elemClick) {
          _this2.elemClick(event);
        }
      };

      return dropDom;
    } // 生成

  }, {
    key: "createZoom",
    value: function createZoom() {
      var _this3 = this;

      // let zoomDoms = [];
      var style = {
        position: 'absolute',
        backgroundColor: '#FFF',
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        boxShadow: '0 0 5px 1px rgba(14,19,24,.15), 0 0 0 1px rgba(14,19,24,.15)'
      };
      var cursorIcon = 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAAXNSR0IArs4c6QAAAOpQTFRFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8PDwAAAAAAAA4uLiAAAA3Nzc3d3dxMTExcXFp6enra2tlZWVjIyMjo6OfHx86Ojo6Ojo0dHRyMjIx8fHwcHB/v7+/f39+vr6/f39/Pz8/Pz8+fn5/Pz8+vr6+vr6/f39////7e3t/v7+7Ozs/v7+////////6Ojo6enpAAAAAwMDBAQEBQUFBgYGBwcHDQ0NKysrLCwsMDAwYGBgYWFhYmJiampqa2trbGxsRsyhyQAAAD50Uk5TAAECAwQFBggKCw0ODxESFxgZGhwhISIjIyQkJissMTI6PD1GWVpjb3F03t/i4+Tl5+nq7PP4+vr7+/v8/f0FqgrYAAAA4ElEQVQoz73Ry0LCMBAF0M6kpQ0pioDyVgEFAVHepQViQEF5/f/vGKIUChtW3O3Z3LmjaZcJABIVBAiC0fNUaqkgIB1+CiHWbw8mBoTYww/Ol+1CJITaKXwPypTACfzMpDzpW4BDWHVGUvpSAG/9bhKapeq/kGzN8IG9FmPxFyXPuYZn7SqgdR+h4WhlK4PWxmPEP9AMEZ1eK1kK1yb7SeQYOo1WxnPOJ3v4awh6+LGz4HzqHIBCkn/fiMn06xgwU3dd13GcLgsAoHkVv0um04kbikfjW8yWYdSA8951bn4B+/Ud1D7TL4MAAAAASUVORK5CYII=) 8 12, auto';
      var flipCursorIcon = 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAAXNSR0IArs4c6QAAAOdQTFRFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8PDwAAAAAAAA4uLiAAAA3Nzc3d3dxMTExcXFp6enra2tlZWVjo6OfHx86Ojo6Ojo0dHRyMjIx8fHwcHB/v7+/f39+vr6/f39+/v7/Pz8+fn5/Pz8+vr6+vr6/f39////7Ozs7e3t/v7+7Ozs/v7+////////6Ojo6enpAAAAAwMDBAQEBQUFBgYGBwcHDQ0NKysrLCwsMDAwYGBgYWFhYmJiampqa2trbGxsSXP2QwAAAD10Uk5TAAECAwQFBggKCw0ODxESFxgZGhwhIiMjJCQmKywxMjo9RllaY29xdN7f4uPk5efp6+z0+Pr6+vv7+/z9/fVNPNwAAADnSURBVCjPvZHZWsIwFIQ5OSltSFEWQVZZy6agbKUFSlBxAXz/5zEFKoQrvGEu5/8y32ROKHRNARDciQCo4L7l7jTUFABEf3jaCiHepowoL0g4Wn5Ze95iaqIahaw++TwDfijQqvRXXycA4E42odWx9Gf9zQnQWjk8+M1K7wiI4T7mayPfbyQT5Q4PAHJ3++znz6xYhEWLRlAXTUespT+3bhnFsP73QQmWnvcxt2KMymGOk+zBd78UoXDoHgD7/XUpfroFVOdDPrBt23GcdvZsJRZPZTLpVPJGJ+qwGuOmFDc0uOxE/9MvTK0dPSS3AqMAAAAASUVORK5CYII=) 8 12, auto';
      var leftTopIcon = document.createElement('div');
      var rightTopIcon = document.createElement('div');
      var rightBottomIcon = document.createElement('div');
      var leftBottomIcon = document.createElement('div');
      var leftTopIconStyle = Object.assign({}, style, {
        top: '-5px',
        left: '-5px',
        cursor: cursorIcon
      });
      var rightTopIconStyle = Object.assign({}, style, {
        top: '-5px',
        left: '100%',
        marginLeft: '-5px',
        cursor: flipCursorIcon
      });
      var rightBottomIconStyle = Object.assign({}, style, {
        top: '100%',
        left: '100%',
        marginLeft: '-5px',
        marginTop: '-5px',
        cursor: cursorIcon
      });
      var leftBottomIconStyle = Object.assign({}, style, {
        top: '100%',
        left: '-5px',
        marginTop: '-5px',
        cursor: flipCursorIcon
      });
      (0, _utils.setStyle)(leftTopIcon, leftTopIconStyle);
      (0, _utils.setStyle)(rightTopIcon, rightTopIconStyle);
      (0, _utils.setStyle)(rightBottomIcon, rightBottomIconStyle);
      (0, _utils.setStyle)(leftBottomIcon, leftBottomIconStyle);

      leftTopIcon.onmousedown = function (evt) {
        _this3.activeDom = leftTopIcon;

        _this3.domSetTag(evt, 'leftTop');
      };

      rightTopIcon.onmousedown = function (evt) {
        _this3.activeDom = rightTopIcon;

        _this3.domSetTag(evt, 'rightTop');
      };

      rightBottomIcon.onmousedown = function (evt) {
        _this3.activeDom = rightBottomIcon;

        _this3.domSetTag(evt, 'rightBottom');
      };

      leftBottomIcon.onmousedown = function (evt) {
        _this3.activeDom = leftBottomIcon;

        _this3.domSetTag(evt, 'leftBottom');
      };

      return [leftTopIcon, rightTopIcon, rightBottomIcon, leftBottomIcon];
    } // 修改大小图标

  }, {
    key: "createSize",
    value: function createSize() {
      var _this4 = this;

      var style = {
        position: 'absolute',
        backgroundColor: '#fff',
        boxShadow: '0 0 5px 1px rgba(14,19,24,.15), 0 0 0 1px rgba(14,19,24,.15)',
        borderRadius: '5px'
      };
      var topIcon = document.createElement('div');
      var rightIcon = document.createElement('div');
      var bottomIcon = document.createElement('div');
      var leftIcon = document.createElement('div');
      var topIconStyle = Object.assign({}, style, {
        width: '16px',
        height: '5px',
        top: '-3px',
        left: '50%',
        marginLeft: '-8px'
      });
      var rightIconStyle = Object.assign({}, style, {
        width: '5px',
        height: '16px',
        top: '50%',
        left: '100%',
        marginLeft: '-2px',
        marginTop: '-8px'
      });
      var bottomIconStyle = Object.assign({}, style, {
        width: '16px',
        height: '5px',
        top: '100%',
        left: '50%',
        marginLeft: '-8px',
        marginTop: '-2px'
      });
      var leftIconStyle = Object.assign({}, style, {
        width: '5px',
        height: '16px',
        top: '50%',
        left: '0%',
        marginLeft: '-3px',
        marginTop: '-8px'
      });
      (0, _utils.setStyle)(topIcon, topIconStyle);
      (0, _utils.setStyle)(rightIcon, rightIconStyle);
      (0, _utils.setStyle)(bottomIcon, bottomIconStyle);
      (0, _utils.setStyle)(leftIcon, leftIconStyle);

      topIcon.onmousedown = function (evt) {
        _this4.activeDom = topIcon;

        _this4.domSetTag(evt, 'top');
      };

      rightIcon.onmousedown = function (evt) {
        _this4.activeDom = rightIcon;

        _this4.domSetTag(evt, 'right');
      };

      bottomIcon.onmousedown = function (evt) {
        _this4.activeDom = bottomIcon;

        _this4.domSetTag(evt, 'bottom');
      };

      leftIcon.onmousedown = function (evt) {
        _this4.activeDom = leftIcon;

        _this4.domSetTag(evt, 'left');
      };

      return [topIcon, rightIcon, bottomIcon, leftIcon];
    } // 生成旋转icon

  }, {
    key: "createAngle",
    value: function createAngle() {
      var _this5 = this;

      var angleIcon = document.createElement('div');
      var style = {
        position: 'absolute',
        backgroundImage: 'url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTYwODQ5OTkzNTAyIiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE5ODQiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMzIiIGhlaWdodD0iMzIiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTUxMS44NzIgODU5LjQ3NzMzM2MtMTg2LjExMiAwLTMzOC4zNDY2NjctMTU1LjY5MDY2Ny0zMzguMzQ2NjY3LTM0NS45ODQgMC0xNi4xMjggMTIuMzczMzMzLTI4Ljg0MjY2NyAyOC4xNi0yOC44NDI2NjYgMTUuNzg2NjY3IDAgMjguMjAyNjY3IDEyLjcxNDY2NyAyOC4yMDI2NjcgMjguODQyNjY2IDAgMTU5LjE0NjY2NyAxMjYuMzM2IDI4OC4zNDEzMzMgMjgyLjAyNjY2NyAyODguMzQxMzM0YTI3OC45MTIgMjc4LjkxMiAwIDAgMCAyMDYuMzc4NjY2LTkyLjI4OCAyNi44OCAyNi44OCAwIDAgMSAzOS40NjY2NjctMS4xNTJjMTEuMjY0IDExLjUyIDEyLjM3MzMzMyAyOC44NDI2NjcgMS4xMDkzMzMgNDAuMzYyNjY2YTMzMi45NzA2NjcgMzMyLjk3MDY2NyAwIDAgMS0yNDYuOTk3MzMzIDExMC43MnogbTMxMC4xODY2NjctMzE3LjE0MTMzM2EyOC4yNDUzMzMgMjguMjQ1MzMzIDAgMCAxLTI4LjIwMjY2Ny0yOC44NDI2NjdjMC0xNTkuMTQ2NjY3LTEyNi4yOTMzMzMtMjg4LjM0MTMzMy0yODEuOTg0LTI4OC4zNDEzMzNhMjc2LjA1MzMzMyAyNzYuMDUzMzMzIDAgMCAwLTIwNC4xNiA4OS45ODQgMjcuODE4NjY3IDI3LjgxODY2NyAwIDAgMS0zOS40NjY2NjcgMS4xNTIgMjkuMzk3MzMzIDI5LjM5NzMzMyAwIDAgMS0xLjEwOTMzMy00MC4zNjI2NjcgMzMxLjQzNDY2NyAzMzEuNDM0NjY3IDAgMCAxIDI0NS44ODgtMTA3LjI2NGMxODYuMDY5MzMzIDAgMzM4LjM0NjY2NyAxNTUuNjkwNjY3IDMzOC4zNDY2NjcgMzQ2LjAyNjY2N2EyOS43ODEzMzMgMjkuNzgxMzMzIDAgMCAxLTI5LjMxMiAyNy42NDh6IiBmaWxsPSIjNDI0QjU0IiBwLWlkPSIxOTg1Ij48L3BhdGg+PHBhdGggZD0iTTEwNi45NjUzMzMgNTEzLjQ5MzMzM2w5NC43Mi0xMjkuMTUyIDk0Ljc2MjY2NyAxMjkuMTUyaC0xODkuNDR6IG04MDkuODEzMzM0IDBsLTk0LjcyIDEyOS4xOTQ2NjctOTQuNzItMTI5LjE5NDY2N2gxODkuNDR6IiBmaWxsPSIjNDI0QjU0IiBwLWlkPSIxOTg2Ij48L3BhdGg+PC9zdmc+)',
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
        cursor: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABpklEQVR4AWIYWmAUjAIAY+SAW0EARdH8X9u24rqrKDcxG6htLGXidAm1bdu2+U7y7Z+czOu79747mWp0aO2gAVd9to67fXx8dL69vXXZQrSO1dXVGGB24OvklmUJzd5/8lNVdcSU6enpcfY3NzcV4vECZnZoln723OKmaQGNATrRQFpa2pm81dn29naj/B1KEJhl14SGxzTDj1vctCwIsiwoKipae319PXt5eRm/vLysPz8/LwNmdmh4bBQE2SoI1heEh4c/yPOX2c3N7VtRlLn+/v6xg4ODOWBmh4YHLxmTgmB7BXyWc3mzczm0npWVdUjIEXjwkiHrqCAIEePCwkLX0tJSz9fX1/XW1tZSW1vbdEFBwX50dPQtMLNDw4OXDFn7n0hXsLa21iJzvBCXk5OTMT09XXFxcdEr/9BNOXYDzOzQ8OAlI9lWRwX+R0dHtfKMFAIFP50xXIgREoVkYGaHhgcvGbJyo45blgVawUsn+AoeOoO7bs8OLRBMfGh48JLR+/7HjpIPYFkfphhHscCMhjGLD4SjmLAWF3BMPkCYMWjAKAAAxlBp/QKMhJEAAAAASUVORK5CYII=) 4 12, auto'
      };
      (0, _utils.setStyle)(angleIcon, style);

      angleIcon.onmousedown = function (evt) {
        _this5.activeDom = angleIcon;

        _this5.domSetTag(evt, 'angle');
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
},{"../../../utils":"utils/index.js"}],"plugin/draw-editer/draw-bar/data.js":[function(require,module,exports) {
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
},{"./data":"plugin/draw-editer/draw-bar/data.js","../../../utils":"utils/index.js"}],"plugin/draw-editer/draw-detail/data.js":[function(require,module,exports) {
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
  title: "文字内容",
  name: 'text',
  type: 'textarea'
}, {
  title: "字体",
  name: 'text',
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
  name: 'text',
  type: 'select',
  options: [{
    label: '14',
    value: '14'
  }, {
    label: '16',
    value: '16'
  }],
  on: {
    change: function change(evt) {
      console.log('ppppp', evt.value);
    }
  }
}, {
  title: "行高",
  name: 'text',
  type: 'select',
  options: [{
    label: '14',
    value: '14'
  }, {
    label: '16',
    value: '16'
  }],
  on: {
    change: function change(evt) {
      console.log('ppppp', evt.value);
    }
  }
}, {
  title: "",
  name: 'text',
  type: 'tab',
  options: [{
    tag: 'div',
    style: Object.assign({}, publicStyle, {
      backgroundImage: 'url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTYxOTg1NDM1MzM0IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEyNzggMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE3ODYiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjQ5LjYwOTM3NSIgaGVpZ2h0PSIyMDAiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTI2NC44MDg0OTY0NCA3MzMuNDcwMTg3NjdoNjY5LjAxNDY2OTU1djY3LjA1MzU3NTU1SDI2NC44MDg0OTY0NHpNMjYzLjQ3NjIzNjc3IDQ5OC40Nzg0NTczNmg1MzEuNDY2NzIyMDl2NjcuMDUzNTc1NTVIMjYzLjQ3NjIzNjc3ek0yNjQuODA4NDk2NDQgMjYzLjQ3NjIzNjc3aDY2OS4wMTQ2Njk1NXY2Ny4wNTM1NzU1NEgyNjQuODA4NDk2NDR6IiBmaWxsPSIjNjY2NjY2IiBwLWlkPSIxNzg3Ij48L3BhdGg+PC9zdmc+)'
    }),
    on: {
      click: function click() {
        console.log("ppppppp");
      },
      hover: hover
    }
  }, {
    tag: 'div',
    style: Object.assign({}, publicStyle, {
      backgroundImage: 'url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTYxOTg1Mzk5ODM2IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEyNzUgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE0MTMiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjQ5LjAyMzQzNzUiIGhlaWdodD0iMjAwIj48ZGVmcz48c3R5bGUgdHlwZT0idGV4dC9jc3MiPjwvc3R5bGU+PC9kZWZzPjxwYXRoIGQ9Ik0yODMuNDc2MjM2NzcgNzEzLjQ3MDE4NzY3aDY2OS4wMTQ2Njk1NXY2Ny4wNTM1NzU1NUgyODMuNDc2MjM2Nzd6TTM1Mi4yNTAyMTA1MSA0NzguNDc4NDU3MzZoNTMxLjQ2NjcyMjA2djY3LjA1MzU3NTU1SDM1Mi4yNTAyMTA1MXpNMjgzLjQ3NjIzNjc3IDI0My40NzYyMzY3OGg2NjkuMDE0NjY5NTV2NjcuMDUzNTc1NTRIMjgzLjQ3NjIzNjc3eiIgZmlsbD0iIzY2NjY2NiIgcC1pZD0iMTQxNCI+PC9wYXRoPjwvc3ZnPg==)'
    }),
    on: {
      click: function click() {
        console.log("ppppppp");
      },
      hover: hover
    }
  }, {
    tag: 'div',
    style: Object.assign({}, publicStyle, {
      backgroundImage: 'url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTYxOTg1NDI2NDExIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEyNzggMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE2MzMiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjQ5LjYwOTM3NSIgaGVpZ2h0PSIyMDAiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTI2My40NzYyMzY3NyA3MzMuNDcwMTg3NjdoNjY5LjAxNDY2OTU1djY3LjA1MzU3NTU1SDI2My40NzYyMzY3N3pNNDAyLjc4NjU0MzQ1IDQ5OC40Nzg0NTczNmg1MzEuNDY2NzIyMDl2NjcuMDUzNTc1NTVINDAyLjc4NjU0MzQ1ek0yNjMuNDc2MjM2NzcgMjYzLjQ3NjIzNjc3aDY2OS4wMTQ2Njk1NXY2Ny4wNTM1NzU1NEgyNjMuNDc2MjM2Nzd6IiBmaWxsPSIjNjY2NjY2IiBwLWlkPSIxNjM0Ij48L3BhdGg+PC9zdmc+)'
    }),
    on: {
      click: function click() {
        console.log("ppppppp");
      },
      hover: hover
    }
  }, {
    tag: 'div',
    style: {
      display: 'inline-block',
      height: '15px',
      width: '1px',
      backgroundColor: '#666',
      verticalAlign: 'middle',
      margin: '0 5px'
    }
  }, {
    tag: 'div',
    style: Object.assign({}, publicStyle, {
      backgroundSize: '17px',
      backgroundImage: 'url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTYxOTg4NzA4NjM2IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE5MzkiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNMjczLjUyMjA3MTA1IDg1OS42MTQyODgzM1YxNjQuNDE4NTA0MTloMjA1LjQ5ODEyNTE5cTkyLjEzNTMwMjkgMCAxNDcuMjI2Mjg5NCA0My43MjMwMDUzdDU1LjA5MDk4NzE2IDExNS45OTcxMzI5N3EwIDU3LjQ1MjAyODktMzIuNzkyMjU0MzEgMTAxLjQzNzM3MjMydC05MC4wNDc1Mjk0NiA2Mi40MTQ1OTAxOXYxLjc5MjY0MjhxNzEuMzU1OTQ0NTkgOC4wNzc4MjU1MyAxMTQuMDI5NTk4MDggNTMuNjM3MTk2OTl0NDIuNjI5OTMwMTQgMTE1LjU3MDgzMzYxcTAgODkuNzc0MjYwNS02NC44MDg0MjQ0NCAxNDUuMTkzMTcwMTV0LTE2NS45MTc4NzQ5NCA1NS40Mjk4Mzk4MXpNMzYzLjg0Mjg2OTQ3IDI0Mi45MzQwOTA1NFY0NjAuNjA5MDcyOTVoODIuMTk5MjUwMjFxNjUuNDc1MjAwMjMgMCAxMDIuNzQ5MDYyMjUtMzEuNjQ0NTI1NjJ0MzcuMjYyOTMxMTgtODcuNzQxMTQwNTZxMC05OC4yODkzMTYyMi0xMzEuODY4NTg0MjMtOTguMjg5MzE2MjR6IG0wIDI5NS43NzUyMDAyNHYyNDIuMzM0NzU3MDFoMTA4LjM4OTMzMDE2cTcwLjg5Njg1MzM4IDAgMTA5LjUxNTE5Nzg2LTMyLjU0MDg0NjM3dDM4LjYxODM0Mzc5LTkwLjQ0MTAzNjk3cTAtMTE5LjM4NTY2NjE5LTE2My4wMzIxNTU2MS0xMTkuMzg1NjY1NTF6IiBmaWxsPSIjNjY2NjY2IiBwLWlkPSIxOTQwIj48L3BhdGg+PC9zdmc+)'
    }),
    on: {
      click: function click(event) {
        setActive(event); // console.log("ppppppp",elemDom)
      } // hover: hover,

    }
  }, {
    tag: 'div',
    style: Object.assign({}, publicStyle, {
      backgroundSize: '17px',
      backgroundImage: 'url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTYxOTg4NzM0Njc1IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjIyNDUiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNNDQ2LjEwOTMyNzgyIDkwMi43ODg1NzQyMkgzNjkuMDAxMjQ5NzVMNTc3Ljg5MDY3MjE4IDE2MS4yMTE0MjU3OGg3Ny4xMDgwNzgwN0w0NDYuMTA5MzI3ODIgOTAyLjc4ODU3NDIyeiIgZmlsbD0iIzY2NjY2NiIgcC1pZD0iMjI0NiI+PC9wYXRoPjwvc3ZnPg==)'
    }),
    on: {
      click: function click(event) {
        // console.log("ppppppp")
        setActive(event);
      } // hover: hover,

    }
  }, {
    tag: 'div',
    style: Object.assign({}, publicStyle, {
      backgroundSize: '17px',
      backgroundImage: 'url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTYxOTg4NzI4NDA5IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjIwOTIiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNMjQ0LjgwMzkxMTk2IDkzMC4yNjMzNjgwNXYtNTMuMzA4MzAzNDNsNTM0LjM5MjE3NjA4LTQuODQ5MDY1NjF2NTMuMjk3ODMwMjNMMjQ0LjgwMzkxMTk2IDkzMC4yNjMzNjgwNXpNNzUzLjc5ODcxMzc4IDUyMS40MTI3Njk2NXEwIDI3My41MDYxNTcxOS0yNDguMTA4NzgyOTEgMjczLjUwNjE1Nzk3LTIzNy43NDAzNzAyNSAwLTIzNy43NDAzNzAyNy0yNjMuOTIzMjMwNzhWMTM5LjMwMDEwODQ0aDgzLjI2MTQ5NTE0djM4Ny45MzU3Mjk2OXEwIDE5My41NzUxMjIxMSAxNjIuMzMzNzMyODggMTkzLjU3NTEyMjEgMTU2Ljk0MDA2Mzg1IDAgMTU2Ljk0MDA2Mzg2LTE4Ny4zMzMxMjgyVjEzOS4yNDc3NDMwNUg3NTMuNzk4NzEzNzh6IiBmaWxsPSIjNjY2NjY2IiBwLWlkPSIyMDkzIj48L3BhdGg+PC9zdmc+)'
    }),
    on: {
      click: function click(event) {
        // console.log("ppppppp")
        setActive(event);
      } // hover: hover,

    }
  }]
}];
exports.default = _default;
},{}],"plugin/draw-editer/draw-detail/index.js":[function(require,module,exports) {
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

var drawDetail =
/*#__PURE__*/
function () {
  function drawDetail(canvas) {
    _classCallCheck(this, drawDetail);

    this.canvas = canvas;
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
      var _this2 = this;

      var domBox = _utils.creatDom.call(this, {});

      var titleDom = _utils.creatDom.call(this, {
        tag: 'div',
        child: params.title
      }); // let formDom = 


      var itemDom = null;

      if (params.type == 'textarea') {
        itemDom = _utils.creatDom.call(this, {
          tag: 'textarea'
        });
      }

      if (params.type == 'select') {
        itemDom = _utils.creatDom.call(this, {
          tag: 'select',
          on: params.on
        });
        var optionData = params.options;
        optionData.map(function (item) {
          itemDom.appendChild(_utils.creatDom.call(_this2, {
            tag: 'option',
            child: item.label
          }));
        });
      }

      if (params.type == 'tab') {
        itemDom = _utils.creatDom.call(this, {
          tag: 'div',
          style: {
            margin: '5px'
          }
        });
        var _optionData = params.options;

        _optionData.map(function (item) {
          itemDom.appendChild(_utils.creatDom.call(_this2, item));
        });
      }

      domBox.appendChild(titleDom);
      domBox.appendChild(itemDom);
      return domBox;
    }
  }]);

  return drawDetail;
}();

var _default = drawDetail;
exports.default = _default;
},{"../../../utils":"utils/index.js","./data":"plugin/draw-editer/draw-detail/data.js"}],"plugin/draw-editer/drawEditer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _drop = _interopRequireDefault(require("./drop"));

var _drawBar = _interopRequireDefault(require("./draw-bar"));

var _drawDetail = _interopRequireDefault(require("./draw-detail"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var drawEditer =
/*#__PURE__*/
function () {
  function drawEditer(params) {
    _classCallCheck(this, drawEditer);

    this.canvas = params.canvas.dom;
    this.canvas.style.position = 'relative';
    this.elements = [];
    this.id = 0; // console.log(params,"kjjj")

    _drop.default.init(this.canvas, params);

    this.bar = new _drawBar.default(params.bar, this);
    this.detail = new _drawDetail.default(canvas);
    this.bar.init();
    this.detail.init(); // return this;
    // console.log((new bar()).init(),"kkkk")
  }

  _createClass(drawEditer, [{
    key: "create",
    value: function create() {}
  }, {
    key: "getData",
    value: function getData() {
      var arr = [];
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
          top: 0,
          left: 0,
          color: '#000',
          fontSize: 14
        }
      }, this.canvas)); // this.render();
    }
  }]);

  return drawEditer;
}();

exports.default = drawEditer;
},{"./drop":"plugin/draw-editer/drop/index.js","./draw-bar":"plugin/draw-editer/draw-bar/index.js","./draw-detail":"plugin/draw-editer/draw-detail/index.js"}],"plugin/draw-editer/index.js":[function(require,module,exports) {
var global = arguments[3];
"use strict";

var _drawEditer = _interopRequireDefault(require("./drawEditer"));

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
  window.drawEditer = _drawEditer.default;
});
},{"./drawEditer":"plugin/draw-editer/drawEditer.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "59663" + '/');

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