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
      dom.style[key] = styles[key];
    }
  }
}
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

var _setStyle = _interopRequireDefault(require("./dom/setStyle"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./dom/setStyle":"utils/dom/setStyle.js"}],"plugin/draw-editer/drop/index.js":[function(require,module,exports) {
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

    this.dropDom = null;
    this.angleIcon = null;
    this.canvas = null;
    this.leftTopIcon = null;
    this.rightTopIcon = null;
    this.rightBottomIcon = null;
    this.leftBottomIcon = null;
    this.elemClick = null;
    this.canvasDetail = null;
  }

  _createClass(drop, [{
    key: "init",
    value: function init(canvas, params) {
      var _this = this;

      this.canvas = canvas;
      this.canvasDetail = this.canvas.getBoundingClientRect(); // console.log(this.canvasDetail)

      this.elemClick = params.elemClick;

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
        transform: 'translateX(-50%) translateY(-50%) rotate(0deg)'
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
        _this3.leftTopIcon = leftTopIcon;
        _this3.leftTopIcon.dataset.monusedown = 1;
        var parentNode = _this3.leftTopIcon.parentNode;
        var parentNodeDetail = parentNode.getBoundingClientRect();
        _this3.leftTopIcon.dataset.parentdetail = JSON.stringify(parentNodeDetail); // console.log( JSON.stringify(parentNodeDetail),"kkkkkk")

        evt.stopPropagation();
      };

      rightTopIcon.onmousedown = function (evt) {
        _this3.rightTopIcon = rightTopIcon;
        var parentNode = _this3.rightTopIcon.parentNode;
        var parentNodeDetail = parentNode.getBoundingClientRect();
        _this3.rightTopIcon.dataset.monusedown = 1;
        _this3.rightTopIcon.dataset.parentdetail = JSON.stringify(parentNodeDetail);
        evt.stopPropagation();
      };

      rightBottomIcon.onmousedown = function (evt) {
        _this3.rightBottomIcon = rightBottomIcon;
        var parentNode = _this3.rightBottomIcon.parentNode;
        var parentNodeDetail = parentNode.getBoundingClientRect();
        _this3.rightBottomIcon.dataset.monusedown = 1;
        _this3.rightBottomIcon.dataset.parentdetail = JSON.stringify(parentNodeDetail);
        evt.stopPropagation();
      };

      leftBottomIcon.onmousedown = function (evt) {
        _this3.leftBottomIcon = leftBottomIcon;
        var parentNode = _this3.leftBottomIcon.parentNode;
        var parentNodeDetail = parentNode.getBoundingClientRect();
        _this3.leftBottomIcon.dataset.monusedown = 1;
        _this3.leftBottomIcon.dataset.parentdetail = JSON.stringify(parentNodeDetail);
        evt.stopPropagation();
      };

      return [leftTopIcon, rightTopIcon, rightBottomIcon, leftBottomIcon];
    } // 修改大小图标

  }, {
    key: "createSize",
    value: function createSize() {
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
      return [topIcon, rightIcon, bottomIcon, leftIcon];
    } // 生成旋转icon

  }, {
    key: "createAngle",
    value: function createAngle() {
      var _this4 = this;

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
        _this4.angleIcon = angleIcon;
        _this4.angleIcon.dataset.monusedown = 1;
        evt.stopPropagation();
      };

      return angleIcon;
    }
  }, {
    key: "onmousedown",
    value: function onmousedown(evt, dom, canvas) {
      var domDetail = dom.getBoundingClientRect(),
          mousePageX = evt.pageX,
          mousePageY = evt.pageY;
      dom.dataset.monusedown = 1;
      var top = dom.style.top.replace('px', '');
      var left = dom.style.left.replace('px', '');
      dom.dataset.mouseleft = mousePageX - left - this.canvasDetail.left;
      dom.dataset.mousetop = mousePageY - top - this.canvasDetail.top;
      this.dropDom = dom;
    } // 获取角度

  }, {
    key: "getAngle",
    value: function getAngle(start, end) {
      var diffX = end.x - start.x,
          diffY = end.y - start.y; //返回角度,不是弧度

      return 360 * Math.atan2(diffY, diffX) / (2 * Math.PI) - 90;
    }
  }, {
    key: "onmouseup",
    value: function onmouseup(evt) {
      if (this.dropDom) {
        this.dropDom.dataset.monusedown = 0;
      }

      if (this.angleIcon) {
        this.angleIcon.dataset.monusedown = 0;
      }

      if (this.leftTopIcon) {
        this.leftTopIcon.dataset.monusedown = 0;
      }

      if (this.rightTopIcon) {
        this.rightTopIcon.dataset.monusedown = 0;
      }

      if (this.rightBottomIcon) {
        this.rightBottomIcon.dataset.monusedown = 0;
      }

      if (this.leftBottomIcon) {
        this.leftBottomIcon.dataset.monusedown = 0;
      }

      this.dropDom = null;
      this.angleIcon = null;
      this.leftTopIcon = null;
      this.rightTopIcon = null;
      this.rightBottomIcon = null;
      this.leftBottomIcon = null;
    }
  }, {
    key: "onmousemove",
    value: function onmousemove(evt) {
      var monusedown = null,
          angleMonusedown = null,
          leftTopDown = null,
          rigthTopDown = null,
          rightBottomDown = null,
          leftBottomDown = null,
          activeElem = null,
          x = 0,
          y = 0,
          width = 0,
          height = 0,
          angle = 0,
          canvasDetail = this.canvasDetail;

      if (this.dropDom) {
        activeElem = this.dropDom;
        monusedown = this.dropDom.dataset.monusedown;
      }

      if (this.angleIcon) {
        activeElem = this.angleIcon.parentNode;
        angleMonusedown = this.angleIcon.dataset.monusedown;
      }

      if (this.leftTopIcon) {
        activeElem = this.leftTopIcon.parentNode;
        leftTopDown = this.leftTopIcon.dataset.monusedown;
      }

      if (this.rightTopIcon) {
        activeElem = this.rightTopIcon.parentNode;
        rigthTopDown = this.rightTopIcon.dataset.monusedown;
      }

      if (this.rightBottomIcon) {
        activeElem = this.rightBottomIcon.parentNode;
        rightBottomDown = this.rightBottomIcon.dataset.monusedown;
      }

      if (this.leftBottomIcon) {
        activeElem = this.leftBottomIcon.parentNode;
        leftBottomDown = this.leftBottomIcon.dataset.monusedown;
      }

      if (activeElem) {
        var transform = activeElem.style.transform;
        var transforms = transform.split(' ');

        if (transform) {
          width = activeElem.style.width;
          height = activeElem.style.height;
          x = transforms[0].replace('translateX(', '').replace('px)', '');
          y = transforms[1].replace('translateY(', '').replace('px)', '');
          angle = transforms[2].replace('rotate(', '').replace('deg)', '');
        }
      }

      if (monusedown === '1') {
        var monuseFromDomTop = +activeElem.dataset.mousetop,
            monuseFromDomLeft = +activeElem.dataset.mouseleft,
            mousePageX = evt.pageX,
            mousePageY = evt.pageY;
        x = mousePageX - canvasDetail.left - monuseFromDomLeft;
        y = mousePageY - canvasDetail.top - monuseFromDomTop;
      }

      if (angleMonusedown === '1') {
        var parentNodeDetail = activeElem.getBoundingClientRect();
        var centerPage = {
          x: parentNodeDetail.x + parentNodeDetail.width / 2,
          y: parentNodeDetail.y + parentNodeDetail.height / 2
        };
        angle = this.getAngle(centerPage, {
          x: evt.pageX,
          y: evt.pageY
        });
      }

      if (leftTopDown === '1') {
        activeElem = this.leftTopIcon.parentNode;
        var left = activeElem.style.left.replace('px', '');
        var top = activeElem.style.top.replace('px', '');
        var orgin = {
          x: this.canvasDetail + left,
          y: this.canvasDetail.top
        };

        var _parentNodeDetail = JSON.parse(this.leftTopIcon.dataset.parentdetail);

        var distanceX = _parentNodeDetail.x - evt.pageX;
        var distanceY = _parentNodeDetail.y - evt.pageY;

        if (distanceX > distanceY) {
          distanceY = distanceX * _parentNodeDetail.height / _parentNodeDetail.width;
        } else {
          distanceX = distanceY * _parentNodeDetail.width / _parentNodeDetail.height;
        }

        width = distanceX + _parentNodeDetail.width + 'px';
        height = distanceY + _parentNodeDetail.height + 'px';
        x = _parentNodeDetail.x - distanceX - canvasDetail.x;
        y = _parentNodeDetail.y - distanceY - canvasDetail.y;
      }

      if (rigthTopDown === '1') {
        activeElem = this.rightTopIcon.parentNode;

        var _parentNodeDetail2 = JSON.parse(this.rightTopIcon.dataset.parentdetail);

        var _distanceX = evt.pageX - _parentNodeDetail2.right;

        var _distanceY = _parentNodeDetail2.y - evt.pageY;

        if (_distanceX > _distanceY) {
          _distanceY = _distanceX * _parentNodeDetail2.height / _parentNodeDetail2.width;
        } else {
          _distanceX = _distanceY * _parentNodeDetail2.width / _parentNodeDetail2.height;
        }

        width = _distanceX + _parentNodeDetail2.width + 'px';
        height = _distanceY + _parentNodeDetail2.height + 'px';
        y = _parentNodeDetail2.y - _distanceY - canvasDetail.y;
      }

      if (rightBottomDown == '1') {
        activeElem = this.rightBottomIcon.parentNode;

        var _parentNodeDetail3 = JSON.parse(this.rightBottomIcon.dataset.parentdetail);

        var _distanceX2 = evt.pageX - _parentNodeDetail3.right;

        var _distanceY2 = evt.pageY - _parentNodeDetail3.bottom;

        if (_distanceX2 > _distanceY2) {
          _distanceY2 = _distanceX2 * _parentNodeDetail3.height / _parentNodeDetail3.width;
        } else {
          _distanceX2 = _distanceY2 * _parentNodeDetail3.width / _parentNodeDetail3.height;
        }

        width = _distanceX2 + _parentNodeDetail3.width + 'px';
        height = _distanceY2 + _parentNodeDetail3.height + 'px';
      }

      if (leftBottomDown == '1') {
        activeElem = this.leftBottomIcon.parentNode;

        var _parentNodeDetail4 = JSON.parse(this.leftBottomIcon.dataset.parentdetail);

        var _distanceX3 = _parentNodeDetail4.left - evt.pageX;

        var _distanceY3 = evt.pageY - _parentNodeDetail4.bottom;

        if (_distanceX3 > _distanceY3) {
          _distanceY3 = _distanceX3 * _parentNodeDetail4.height / _parentNodeDetail4.width;
        } else {
          _distanceX3 = _distanceY3 * _parentNodeDetail4.width / _parentNodeDetail4.height;
        }

        width = _distanceX3 + _parentNodeDetail4.width + 'px';
        height = _distanceY3 + _parentNodeDetail4.height + 'px';
        x = _parentNodeDetail4.x - _distanceX3 - canvasDetail.x;
      }

      if (activeElem) {
        activeElem.style.transform = "translateX(-50%) translateY(-50%) rotate(".concat(angle, "deg) ");
        activeElem.style.top = y + 'px';
        activeElem.style.left = x + 'px';
        activeElem.style.width = width;
        activeElem.style.height = height;
      }
    }
  }, {
    key: "deleteDrop",
    value: function deleteDrop() {}
  }]);

  return drop;
}();

var _default = new drop();

exports.default = _default;
},{"../../../utils":"utils/index.js"}],"plugin/draw-editer/drawEditer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _drop = _interopRequireDefault(require("./drop"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var drawEditer =
/*#__PURE__*/
function () {
  function drawEditer(canvas, params) {
    _classCallCheck(this, drawEditer);

    this.canvas = canvas;
    this.canvas.style.position = 'relative';
    this.elements = [];
    this.id = 0;
    console.log(params, "kjjj");

    _drop.default.init(canvas, params); // return this;

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
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      var elements = this.elements;
      this.canvas.innerHTML = '';
      var htmls = elements.map(function (item, index) {
        _this.canvas.appendChild(_drop.default.create(item, _this.canvas));
      }); // this.canvas.appendChild(htmls);
      // let 
    }
  }]);

  return drawEditer;
}();

exports.default = drawEditer;
},{"./drop":"plugin/draw-editer/drop/index.js"}],"plugin/draw-editer/index.js":[function(require,module,exports) {
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
<<<<<<< HEAD
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "56424" + '/');
=======
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "55304" + '/');
>>>>>>> master

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