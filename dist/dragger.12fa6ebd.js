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
})({"plugin/dragger/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*
 * @Description: dragger
 * @Author: zy
 * @LastEditors: zy
 * @Date: 2019-04-04 16:35:59
 * @LastEditTime: 2019-04-18 15:01:43
 */

/**
 * @description: 拖拽类
 * @param {
    *  canRotate: true, 可旋转
    *  canZoom: true, 可缩放
    *  canPull: true, 可拉升
    *  canMove: true, 可平移
    *  showAngle: false, 展示角度
    *  showPosition: false, 展示位置
    *  isScale: true 是否等比例缩放
    * } 
    * @return:  
    */
var Drag =
/*#__PURE__*/
function () {
  function Drag(obj) {
    _classCallCheck(this, Drag);

    this.id = obj.id;
    this.initParameter(obj);
  }
  /**
   * @description: 初始化参数 
   * @param {type} 
   * @return: 
   */


  _createClass(Drag, [{
    key: "initParameter",
    value: function initParameter(obj) {
      this.canRotate = obj.canRotate === undefined ? true : obj.canRotate;
      this.canZoom = obj.canZoom === undefined ? true : obj.canZoom;
      this.canPull = obj.canPull === undefined ? true : obj.canPull;
      this.canMove = obj.canMove === undefined ? true : obj.canMove;
      this.showBorder = obj.showBorder === undefined ? true : obj.showBorder;
      this.showAngle = obj.showAngle;
      this.showPosition = obj.showPosition;
      this.isScale = obj.isScale === undefined ? true : obj.isScale;
      this.container = obj.container ? document.getElementById(obj.container) : document.body;
      this.targetObj = document.getElementById(obj.id);
      this.initPos();
      this.initPannel();
      this.initEvent();
    }
    /**
     * @description: 判断是否有pannel面板
     * @param {type} 
     * @return: 
     */

  }, {
    key: "initPannel",
    value: function initPannel() {
      this.pannelDom = document.querySelector('#pannel');

      if (!this.pannelDom) {
        this.pannelDom = document.createElement('div');
        this.pannelDom.id = 'pannel';
        this.container.appendChild(this.pannelDom);
      } else {
        this.pannelDom.innerHTML = '';
      }

      this.initPannelDom();
    }
    /**
     * @description: 初始化事件
     * @param {type} 
     * @return: 
     */

  }, {
    key: "initEvent",
    value: function initEvent() {
      var _this2 = this;

      function throttle(fn, interval) {
        var canRun = true;
        return function () {
          var _this = this,
              _arguments = arguments;

          if (!canRun) return;
          canRun = false;
          setTimeout(function () {
            fn.apply(_this, _arguments);
            canRun = true;
          }, interval);
        };
      }

      var that = this;
      document.addEventListener('mousemove', throttle(function (e) {
        e.preventDefault && e.preventDefault();
        that.moveChange(e, that.targetObj);
      }, 10));
      document.addEventListener('mouseup', function (e) {
        _this2.moveLeave(_this2.targetObj);
      }); // this.container.addEventListener('mousedown', e => {
      //   this.mergeBox.flag = true
      //   this.initPannel()
      //   this.mergeBox.initPos = {
      //     x: Math.floor(e.clientX),
      //     y: Math.floor(e.clientY)
      //   }
      //   this.container.addEventListener('mousemove', e => {
      //     if (this.mergeBox.flag) {
      //       this.mergeBox.left = this.mergeBox.initPos.x
      //       this.mergeBox.top = this.mergeBox.initPos.y
      //       this.pannelDom.style.left = `${this.mergeBox.initPos.x}px`
      //       this.pannelDom.style.top = `${this.mergeBox.initPos.y}px`
      //       this.pannelDom.style.width = `${Math.floor(e.clientX) - this.mergeBox.initPos.x}px`
      //       this.pannelDom.style.height = `${Math.floor(e.clientY) - this.mergeBox.initPos.y}px`
      //     }
      //   })
      // })

      if (this.canMove) {
        // 外层给this.pannelDom添加mousedown事件，是在所有实例化结束后，panneldom被展示在最后一个实例化对象上，鼠标按下它时，触发moveInit事件
        this.pannelDom.onmousedown = function (e) {
          e.stopPropagation();

          _this2.moveInit(9, e, _this2.targetObj);
        };

        this.targetObj.onmousedown = function (e) {
          e.stopPropagation();

          _this2.moveInit(9, e, _this2.targetObj);

          _this2.initPannel(); // 在点击其他未被选中元素时，pannel定位到该元素上，重写pannelDom事件，因为此时的this.pannelDom已经根据新的目标元素被重写


          _this2.pannelDom.onmousedown = function (e) {
            _this2.moveInit(9, e, _this2.targetObj);
          };
        };
      }
    }
    /**
     * @description: 初始化Pannel内部dom结构
     * @param {} 
     * @return: null
     */

  }, {
    key: "initPannelDom",
    value: function initPannelDom() {
      var _this3 = this;

      this.pannelDom.style.left = "".concat(this.left, "px");
      this.pannelDom.style.top = "".concat(this.top, "px");
      this.pannelDom.style.width = "".concat(this.width, "px");
      this.pannelDom.style.height = "".concat(this.height, "px");
      this.pannelDom.style.transform = "rotate(".concat(this.angle, "deg)");

      if (this.canRotate) {
        var rotatePoint = document.createElement('span');
        rotatePoint.className = "".concat(this.id, "-dragger-rotate-point dragger-rotate-point");

        if (this.showAngle) {
          this.angleDom = document.createElement('span');
          this.angleDom.className = "dragger-rotate-angle ".concat(this.id, "-dragger-rotate-angle");
          this.angleDom.style.display = 'none';
          this.pannelDom.appendChild(this.angleDom);
        }

        this.pannelDom.appendChild(rotatePoint);
        rotatePoint.addEventListener('mousedown', function (e) {
          e.stopPropagation();

          _this3.moveInit(0, e, _this3.targetObj);
        });
      }

      if (this.showBorder) {
        for (var i = 1; i < 5; i++) {
          var baseLine = document.createElement('span');
          baseLine.className = "".concat(this.id, "-dragger-base-line dragger-base-line dragger-line").concat(i);
          this.pannelDom.appendChild(baseLine);
        }
      }

      if (this.canZoom) {
        var _loop = function _loop(_i) {
          var zoomPoint = document.createElement('span');
          zoomPoint.className = "".concat(_this3.id, "-dragger-base-piont dragger-base-piont dragger-zoom").concat(_i);

          _this3.pannelDom.appendChild(zoomPoint);

          zoomPoint.addEventListener('mousedown', function (e) {
            e.stopPropagation();

            _this3.moveInit(_i, e, _this3.targetObj);
          });
        };

        for (var _i = 1; _i < 5; _i++) {
          _loop(_i);
        }
      }

      if (this.canPull) {
        var _loop2 = function _loop2(_i2) {
          var pullPoint = document.createElement('span');
          pullPoint.className = "".concat(_this3.id, "-dragger-base-piont dragger-base-piont dragger-pull").concat(_i2);

          _this3.pannelDom.appendChild(pullPoint);

          pullPoint.addEventListener('mousedown', function (e) {
            e.stopPropagation();

            _this3.moveInit(_i2, e, _this3.targetObj);
          });
        };

        for (var _i2 = 5; _i2 < 9; _i2++) {
          _loop2(_i2);
        }
      }

      if (this.canMove && this.showPosition) {
        this.positionDom = document.createElement('span');
        this.positionDom.className = 'dragger-position';
        this.pannelDom.appendChild(this.positionDom);
        this.positionDom.style.display = 'none';
      }
    }
    /**
     * @description: 初始化targetObj的位置
     * @param {type} 
     * @return: 
     */

  }, {
    key: "initPos",
    value: function initPos() {
      this.left = this.targetObj.offsetLeft;
      this.top = this.targetObj.offsetTop;
      this.width = this.targetObj.offsetWidth;
      this.height = this.targetObj.offsetHeight;
      this.angle = this.getRotate(this.targetObj); // 记录初始盒子位置右下

      this.rightBottomPoint = {
        x: this.width + this.left,
        y: this.height + this.top // 记录初始盒子右上角位置

      };
      this.rightTopPoint = {
        x: this.width + this.left,
        y: this.top // 记录左上角的位置

      };
      this.leftTopPoint = {
        x: this.left,
        y: this.top // 左下

      };
      this.leftBottomPoint = {
        x: this.left,
        y: this.top + this.height // 左中

      };
      this.leftMiddlePoint = {
        x: this.left,
        y: this.top + this.height / 2 // 右中

      };
      this.rightMiddlePoint = {
        x: this.left + this.width,
        y: this.top + this.height / 2 // 上中

      };
      this.topMiddlePoint = {
        x: this.left + this.width / 2,
        y: this.top // 下中

      };
      this.bottomMiddlePoint = {
        x: this.left + this.width / 2,
        y: this.top + this.height // 记录中心位置

      };
      this.centerPos = {
        x: this.left + this.width / 2,
        y: this.top + this.height / 2
      };
    }
  }, {
    key: "moveInit",
    value: function moveInit(type, e, target) {
      this.type = Number(type);
      this.mouseInit = {
        x: Math.floor(e.clientX),
        y: Math.floor(e.clientY)
      };
      this.scale = target.offsetWidth / target.offsetHeight;
      this.initAngle = this.angle;
      this.initRightBottomPoint = this.rightBottomPoint;
      this.initRightTopPoint = this.rightTopPoint;
      this.initLeftTopPoint = this.leftTopPoint;
      this.initLeftBottomPoint = this.leftBottomPoint;
      this.initLeftMiddlePoint = this.leftMiddlePoint;
      this.initRightMiddlePoint = this.rightMiddlePoint;
      this.initTopMiddlePoint = this.topMiddlePoint;
      this.initBottomMiddlePoint = this.bottomMiddlePoint;
      this.initCenterPos = this.centerPos;
      this.initPosition = {
        x: this.left,
        y: this.top
      };

      if (type === 0) {
        this.rotateFlag = true;
        this.preRadian = Math.atan2(this.mouseInit.y - this.centerPos.y, this.mouseInit.x - this.centerPos.x);
      } else if (type < 10) {
        this.canChange = true;
      }
    }
  }, {
    key: "moveChange",
    value: function moveChange(e, target) {
      var newHeight, newWidth, newRightBottomPoint, newLeftTopPoint, newLeftBottomPoint, newRightTopPoint, rotateCurrentPos;

      switch (this.type) {
        case 0:
          if (this.rotateFlag) {
            this.rotateCurrent = {
              x: Math.floor(e.clientX),
              y: Math.floor(e.clientY)
            };
            this.curRadian = Math.atan2(this.rotateCurrent.y - this.centerPos.y, this.rotateCurrent.x - this.centerPos.x);
            this.tranformRadian = this.curRadian - this.preRadian;
            this.angle = this.getRotate(target) + Math.round(this.tranformRadian * 180 / Math.PI);
            target.style.transform = "rotate(".concat(this.angle, "deg)");
            this.pannelDom.style.transform = "rotate(".concat(this.angle, "deg)");

            if (this.showAngle) {
              this.angleDom.innerHTML = this.angle;
              this.angleDom.style.display = 'block';
            }

            this.preRadian = this.curRadian; // 重新计算旋转后四个点的坐标变化

            var disAngle = this.angle - this.initAngle;
            this.rightBottomPoint = this.getRotatedPoint(this.initRightBottomPoint, this.centerPos, disAngle);
            this.rightTopPoint = this.getRotatedPoint(this.initRightTopPoint, this.centerPos, disAngle);
            this.leftTopPoint = this.getRotatedPoint(this.initLeftTopPoint, this.centerPos, disAngle);
            this.leftBottomPoint = this.getRotatedPoint(this.initLeftBottomPoint, this.centerPos, disAngle);
            this.leftMiddlePoint = this.getRotatedPoint(this.initLeftMiddlePoint, this.centerPos, disAngle);
            this.rightMiddlePoint = this.getRotatedPoint(this.initRightMiddlePoint, this.centerPos, disAngle);
            this.topMiddlePoint = this.getRotatedPoint(this.initTopMiddlePoint, this.centerPos, disAngle);
            this.bottomMiddlePoint = this.getRotatedPoint(this.initBottomMiddlePoint, this.centerPos, disAngle);
          }

        case 1:
          if (this.canChange) {
            this.centerPos = {
              x: Math.floor((e.clientX + this.rightBottomPoint.x) / 2),
              y: Math.floor((e.clientY + this.rightMiddlePoint.y) / 2) // 计算旋转为水平角度的两点坐标

            };
            newLeftTopPoint = this.getRotatedPoint({
              x: e.clientX,
              y: e.clientY
            }, this.centerPos, -this.initAngle);
            newRightBottomPoint = this.getRotatedPoint(this.rightBottomPoint, this.centerPos, -this.initAngle);
            newWidth = newRightBottomPoint.x - newLeftTopPoint.x;
            newHeight = newRightBottomPoint.y - newLeftTopPoint.y;

            if (this.isScale) {
              if (newWidth / newHeight > this.scale) {
                newLeftTopPoint.x = newLeftTopPoint.x + Math.abs(newWidth - newHeight * this.scale);
                newWidth = newHeight * this.scale;
              } else {
                newLeftTopPoint.y = newLeftTopPoint.y + Math.abs(newHeight - newWidth / this.scale);
                newHeight = newWidth / this.scale;
              } // 计算出左上角等比角度变换后水平坐标后，再计算旋转后的角度


              var rotateLeftTopPoint = this.getRotatedPoint(newLeftTopPoint, this.centerPos, this.initAngle);
              this.centerPos = {
                x: Math.floor((rotateLeftTopPoint.x + this.rightBottomPoint.x) / 2),
                y: Math.floor((rotateLeftTopPoint.y + this.rightBottomPoint.y) / 2)
              };
              newLeftTopPoint = this.getRotatedPoint(rotateLeftTopPoint, this.centerPos, -this.initAngle);
              newRightBottomPoint = this.getRotatedPoint(this.rightBottomPoint, this.centerPos, -this.initAngle);
              newWidth = newRightBottomPoint.x - newLeftTopPoint.x;
              newHeight = newRightBottomPoint.y - newLeftTopPoint.y;
            }

            if (newWidth <= 12) {
              newWidth = 12;
              newHeight = Math.floor(newWidth / this.scale);
              newLeftTopPoint.x = newRightBottomPoint.x - newWidth;
              newLeftTopPoint.y = newRightBottomPoint.y - newHeight;
            }

            if (newHeight <= 12) {
              newHeight = 12;
              newWidth = Math.floor(newHeight * this.scale);
              newLeftTopPoint.y = newRightBottomPoint.y - newHeight;
              newLeftTopPoint.x = newRightBottomPoint.x - newWidth;
            }

            if (newHeight > 12 && newWidth > 12) {
              this.left = newLeftTopPoint.x;
              this.top = newLeftTopPoint.y;
              this.width = newWidth;
              this.height = newHeight;
              target.style.left = "".concat(this.left, "px");
              target.style.top = "".concat(this.top, "px");
              target.style.width = "".concat(this.width, "px");
              target.style.height = "".concat(this.height, "px");
              this.pannelDom.style.left = "".concat(this.left, "px");
              this.pannelDom.style.top = "".concat(this.top, "px");
              this.pannelDom.style.width = "".concat(this.width, "px");
              this.pannelDom.style.height = "".concat(this.height, "px");
            }
          }

          break;

        case 2:
          if (this.canChange) {
            this.centerPos = {
              x: Math.floor((e.clientX + this.rightTopPoint.x) / 2),
              y: Math.floor((e.clientY + this.rightTopPoint.y) / 2)
            };
            newLeftBottomPoint = this.getRotatedPoint({
              x: e.clientX,
              y: e.clientY
            }, this.centerPos, -this.initAngle);
            newRightTopPoint = this.getRotatedPoint(this.rightTopPoint, this.centerPos, -this.initAngle);
            newWidth = newRightTopPoint.x - newLeftBottomPoint.x;
            newHeight = newLeftBottomPoint.y - newRightTopPoint.y;

            if (this.isScale) {
              if (newWidth / newHeight > this.scale) {
                newLeftBottomPoint.x = newLeftBottomPoint.x + Math.abs(newWidth - newHeight * this.scale);
                newWidth = newHeight * this.scale;
              } else {
                newLeftBottomPoint.y = newLeftBottomPoint.y - Math.abs(newHeight - newWidth / this.scale);
                newHeight = newWidth / this.scale;
              }

              var rotatedLeftBottomPoint = this.getRotatedPoint(newLeftBottomPoint, this.centerPos, this.initAngle);
              this.centerPos = {
                x: Math.floor((rotatedLeftBottomPoint.x + this.rightTopPoint.x) / 2),
                y: Math.floor((rotatedLeftBottomPoint.y + this.rightTopPoint.y) / 2)
              };
              newLeftBottomPoint = this.getRotatedPoint(rotatedLeftBottomPoint, this.centerPos, -this.initAngle);
              newRightTopPoint = this.getRotatedPoint(this.rightTopPoint, this.centerPos, -this.initAngle);
              newWidth = newRightTopPoint.x - newLeftBottomPoint.x;
              newHeight = newLeftBottomPoint.y - newRightTopPoint.y;
            }

            if (newHeight <= 12) {
              newHeight = 12;
              newWidth = Math.floor(newHeight * this.scale);
              newLeftBottomPoint = {
                x: newRightTopPoint.x - newWidth,
                y: newRightTopPoint.y + newHeight
              };
            }

            if (newWidth <= 12) {
              newWidth = 12;
              newHeight = Math.floor(newWidth / this.scale);
              newLeftBottomPoint = {
                x: newRightTopPoint.x - newWidth,
                y: newRightTopPoint.y + newHeight
              };
            }

            if (newHeight > 12 && newHeight > 12) {
              this.left = newLeftBottomPoint.x;
              this.top = newRightTopPoint.y;
              this.width = newWidth;
              this.height = newHeight;
              target.style.left = "".concat(this.left, "px");
              target.style.top = "".concat(this.top, "px");
              target.style.width = "".concat(this.width, "px");
              target.style.height = "".concat(this.height, "px");
              this.pannelDom.style.left = "".concat(this.left, "px");
              this.pannelDom.style.top = "".concat(this.top, "px");
              this.pannelDom.style.width = "".concat(this.width, "px");
              this.pannelDom.style.height = "".concat(this.height, "px");
            }
          }

          break;

        case 3:
          if (this.canChange) {
            this.centerPos = {
              x: Math.floor((e.clientX + this.leftBottomPoint.x) / 2),
              y: Math.floor((e.clientY + this.leftBottomPoint.y) / 2)
            };
            newRightTopPoint = this.getRotatedPoint({
              x: e.clientX,
              y: e.clientY
            }, this.centerPos, -this.initAngle);
            newLeftBottomPoint = this.getRotatedPoint(this.leftBottomPoint, this.centerPos, -this.initAngle);
            newWidth = newRightTopPoint.x - newLeftBottomPoint.x;
            newHeight = newLeftBottomPoint.y - newRightTopPoint.y;

            if (this.isScale) {
              if (newWidth / newHeight > this.scale) {
                newRightTopPoint.x = newRightTopPoint.x - Math.abs(newWidth - newHeight * this.scale);
                newWidth = newHeight * this.scale;
              } else {
                newRightTopPoint.y = newRightTopPoint.y + Math.abs(newHeight - newWidth / this.scale);
                newHeight = newWidth / this.scale;
              }

              var rotatedRightTopPoint = this.getRotatedPoint(newRightTopPoint, this.centerPos, this.initAngle);
              this.centerPos = {
                x: Math.floor((rotatedRightTopPoint.x + this.leftBottomPoint.x) / 2),
                y: Math.floor((rotatedRightTopPoint.y + this.leftBottomPoint.y) / 2)
              };
              newLeftBottomPoint = this.getRotatedPoint(this.leftBottomPoint, this.centerPos, -this.initAngle);
              newRightTopPoint = this.getRotatedPoint(rotatedRightTopPoint, this.centerPos, -this.initAngle);
              newWidth = newRightTopPoint.x - newLeftBottomPoint.x;
              newHeight = newLeftBottomPoint.y - newRightTopPoint.y;
            }

            if (newWidth <= 12) {
              newWidth = 12;
              newHeight = Math.floor(newWidth / this.scale);
              newRightTopPoint = {
                x: newLeftBottomPoint.x + newWidth,
                y: newLeftBottomPoint.y - newHeight
              };
            }

            if (newHeight <= 12) {
              newHeight = 12;
              newWidth = Math.floor(newHeight * this.scale);
              newRightTopPoint = {
                x: newLeftBottomPoint.x + newWidth,
                y: newLeftBottomPoint.y - newHeight
              };
            }

            if (newWidth > 12 && newHeight > 12) {
              this.left = newLeftBottomPoint.x;
              this.top = newRightTopPoint.y;
              this.width = newWidth;
              this.height = newHeight;
              target.style.left = "".concat(this.left, "px");
              target.style.top = "".concat(this.top, "px");
              target.style.width = "".concat(this.width, "px");
              target.style.height = "".concat(this.height, "px");
              this.pannelDom.style.left = "".concat(this.left, "px");
              this.pannelDom.style.top = "".concat(this.top, "px");
              this.pannelDom.style.width = "".concat(this.width, "px");
              this.pannelDom.style.height = "".concat(this.height, "px");
            }
          }

          break;

        case 4:
          if (this.canChange) {
            this.centerPos = {
              x: Math.floor((e.clientX + this.leftTopPoint.x) / 2),
              y: Math.floor((e.clientY + this.leftTopPoint.y) / 2)
            };
            newRightBottomPoint = this.getRotatedPoint({
              x: e.clientX,
              y: e.clientY
            }, this.centerPos, -this.initAngle);
            newLeftTopPoint = this.getRotatedPoint(this.leftTopPoint, this.centerPos, -this.initAngle);
            newWidth = newRightBottomPoint.x - newLeftTopPoint.x;
            newHeight = newRightBottomPoint.y - newLeftTopPoint.y;

            if (this.isScale) {
              if (newWidth / newHeight > this.scale) {
                newRightBottomPoint.x = newRightBottomPoint.x - Math.abs(newWidth - newHeight * this.scale);
                newWidth = newHeight * this.scale;
              } else {
                newRightBottomPoint.y = newRightBottomPoint.y - Math.abs(newHeight - newWidth / this.scale);
                newHeight = newWidth / this.scale;
              }

              var rotatedRightBottomPoint = this.getRotatedPoint(newRightBottomPoint, this.centerPos, this.initAngle);
              this.centerPos = {
                x: Math.floor((rotatedRightBottomPoint.x + this.leftTopPoint.x) / 2),
                y: Math.floor((rotatedRightBottomPoint.y + this.leftTopPoint.y) / 2)
              };
              newLeftTopPoint = this.getRotatedPoint(this.leftTopPoint, this.centerPos, -this.initAngle);
              newRightBottomPoint = this.getRotatedPoint(rotatedRightBottomPoint, this.centerPos, -this.initAngle);
              newWidth = newRightBottomPoint.x - newLeftTopPoint.x;
              newHeight = newRightBottomPoint.y - newLeftTopPoint.y;
            }

            if (newWidth <= 12) {
              newWidth = 12;
              newHeight = Math.floor(newWidth / this.scale);
              newRightBottomPoint = {
                x: newLeftTopPoint.x + newWidth,
                y: newLeftTopPoint.y + newHeight
              };
            }

            if (newHeight <= 12) {
              newHeight = 12;
              newWidth = Math.floor(newHeight * this.scale);
              newRightBottomPoint = {
                x: newLeftTopPoint.x + newWidth,
                y: newLeftTopPoint.y + newHeight
              };
            }

            if (newWidth > 12 && newHeight > 12) {
              this.left = newLeftTopPoint.x;
              this.top = newLeftTopPoint.y;
              this.width = newWidth;
              this.height = newHeight;
              target.style.left = "".concat(this.left, "px");
              target.style.top = "".concat(this.top, "px");
              target.style.width = "".concat(this.width, "px");
              target.style.height = "".concat(this.height, "px");
              this.pannelDom.style.left = "".concat(this.left, "px");
              this.pannelDom.style.top = "".concat(this.top, "px");
              this.pannelDom.style.width = "".concat(this.width, "px");
              this.pannelDom.style.height = "".concat(this.height, "px");
            }
          }

          break;

        case 5:
          if (this.canChange) {
            // 计算出鼠标现在所在的点，经过以bottommiddle点反向旋转后的位置,从而得到其y轴坐标点与topmiddle的x轴坐标结合，求出旋转后图形的topmiddle
            rotateCurrentPos = this.getRotatedPoint({
              x: e.clientX,
              y: e.clientY
            }, this.bottomMiddlePoint, -this.initAngle);
            var rotatedTopMiddlePoint = {
              x: this.bottomMiddlePoint.x,
              y: rotateCurrentPos.y
            };
            newHeight = this.bottomMiddlePoint.y - rotatedTopMiddlePoint.y; // newHeight = Math.sqrt(Math.pow((this.topMiddlePoint.x - this.bottomMiddlePoint.x), 2) + Math.pow((this.topMiddlePoint.y - this.bottomMiddlePoint.y), 2))

            if (newHeight <= 12) {
              newHeight = 12;
              rotatedTopMiddlePoint.y = this.bottomMiddlePoint.y - 12;
            } // 计算转回去的topmiddle点坐标


            this.topMiddlePoint = this.getRotatedPoint(rotatedTopMiddlePoint, this.bottomMiddlePoint, this.initAngle);
            this.centerPos = {
              x: (this.topMiddlePoint.x + this.bottomMiddlePoint.x) / 2,
              y: (this.topMiddlePoint.y + this.bottomMiddlePoint.y) / 2
            };
            this.left = this.centerPos.x - target.offsetWidth / 2;
            this.top = this.centerPos.y - newHeight / 2;
            this.height = newHeight;
            target.style.left = "".concat(this.left, "px");
            target.style.height = "".concat(this.height, "px");
            target.style.top = "".concat(this.top, "px");
            this.pannelDom.style.left = "".concat(this.left, "px");
            this.pannelDom.style.height = "".concat(this.height, "px");
            this.pannelDom.style.top = "".concat(this.top, "px");
          }

          break;

        case 6:
          if (this.canChange) {
            rotateCurrentPos = this.getRotatedPoint({
              x: e.clientX,
              y: e.clientY
            }, this.rightMiddlePoint, -this.initAngle);
            var rotatedLeftMiddlePonit = {
              x: rotateCurrentPos.x,
              y: this.rightMiddlePoint.y
            };
            newWidth = this.rightMiddlePoint.x - rotatedLeftMiddlePonit.x;

            if (newWidth <= 12) {
              newWidth = 12;
              rotatedLeftMiddlePonit.x = this.rightMiddlePoint.x - 12;
            }

            this.leftMiddlePoint = this.getRotatedPoint(rotatedLeftMiddlePonit, this.rightMiddlePoint, this.initAngle);
            this.centerPos = {
              x: Math.floor((this.leftMiddlePoint.x + this.rightMiddlePoint.x) / 2),
              y: Math.floor((this.leftMiddlePoint.y + this.rightMiddlePoint.y) / 2)
            };
            this.left = this.centerPos.x - newWidth / 2;
            this.top = this.centerPos.y - target.offsetHeight / 2;
            this.width = newWidth;
            target.style.left = "".concat(this.left, "px");
            target.style.top = "".concat(this.top, "px");
            target.style.width = "".concat(this.width, "px");
            this.pannelDom.style.left = "".concat(this.left, "px");
            this.pannelDom.style.top = "".concat(this.top, "px");
            this.pannelDom.style.width = "".concat(this.width, "px");
          }

          break;

        case 7:
          if (this.canChange) {
            rotateCurrentPos = this.getRotatedPoint({
              x: e.clientX,
              y: e.clientY
            }, this.topMiddlePoint, -this.initAngle);
            var rotatedBottomMiddlePoint = {
              x: this.topMiddlePoint.x,
              y: rotateCurrentPos.y
            };
            newHeight = rotatedBottomMiddlePoint.y - this.topMiddlePoint.y;

            if (newHeight <= 12) {
              newHeight = 12;
              rotatedBottomMiddlePoint.y = this.topMiddlePoint.y - 12;
            }

            this.bottomMiddlePoint = this.getRotatedPoint(rotatedBottomMiddlePoint, this.topMiddlePoint, this.initAngle);
            this.centerPos = {
              x: Math.floor((this.bottomMiddlePoint.x + this.topMiddlePoint.x) / 2),
              y: Math.floor((this.bottomMiddlePoint.y + this.topMiddlePoint.y) / 2)
            };
            this.left = this.centerPos.x - target.offsetWidth / 2;
            this.top = this.centerPos.y - newHeight / 2;
            this.height = newHeight;
            target.style.left = "".concat(this.left, "px");
            target.style.top = "".concat(this.top, "px");
            target.style.height = "".concat(this.height, "px");
            this.pannelDom.style.left = "".concat(this.left, "px");
            this.pannelDom.style.top = "".concat(this.top, "px");
            this.pannelDom.style.height = "".concat(this.height, "px");
          }

          break;

        case 8:
          if (this.canChange) {
            rotateCurrentPos = this.getRotatedPoint({
              x: e.clientX,
              y: e.clientY
            }, this.leftMiddlePoint, -this.initAngle);
            var rotatedRightMiddlePoint = {
              x: rotateCurrentPos.x,
              y: this.leftMiddlePoint.y
            };
            newWidth = rotatedRightMiddlePoint.x - this.leftMiddlePoint.x;

            if (newWidth <= 12) {
              newWidth = 12;
              rotatedRightMiddlePoint.x = this.leftMiddlePoint.x + 12;
            }

            this.rightMiddlePoint = this.getRotatedPoint(rotatedRightMiddlePoint, this.leftMiddlePoint, this.initAngle);
            this.centerPos = {
              x: Math.floor((this.leftMiddlePoint.x + this.rightMiddlePoint.x) / 2),
              y: Math.floor((this.leftMiddlePoint.y + this.rightMiddlePoint.y) / 2)
            };
            this.left = this.centerPos.x - newWidth / 2;
            this.top = this.centerPos.y - target.offsetHeight / 2;
            this.width = newWidth;
            target.style.left = "".concat(this.left, "px");
            target.style.top = "".concat(this.top, "px");
            target.style.width = "".concat(newWidth, "px");
            this.pannelDom.style.left = "".concat(this.left, "px");
            this.pannelDom.style.top = "".concat(this.top, "px");
            this.pannelDom.style.width = "".concat(this.width, "px");
          }

          break;

        case 9:
          if (this.canChange) {
            var dis = {
              x: Math.floor(e.clientX - this.mouseInit.x),
              y: Math.floor(e.clientY - this.mouseInit.y)
            };
            this.left = this.initPosition.x + dis.x;
            this.top = this.initPosition.y + dis.y;
            target.style.left = "".concat(this.left, "px");
            target.style.top = "".concat(this.top, "px");
            this.pannelDom.style.left = "".concat(this.left, "px");
            this.pannelDom.style.top = "".concat(this.top, "px");
            this.pannelDom.style.width = "".concat(this.width, "px");
            this.pannelDom.style.height = "".concat(this.height, "px");
            this.centerPos = {
              x: this.initCenterPos.x + dis.x,
              y: this.initCenterPos.y + dis.y
            };

            if (this.showPosition) {
              this.positionDom.style.display = 'inline-block';
              this.positionDom.innerHTML = "X: ".concat(this.left, " Y: ").concat(this.top);
            }
          }

          break;
      }
    }
  }, {
    key: "moveLeave",
    value: function moveLeave() {
      if (this.canChange || this.rotateFlag) {
        this.rotateFlag = false;
        this.canChange = false;
        if (this.angleDom) this.angleDom.style.display = 'none';
        if (this.positionDom) this.positionDom.style.display = 'none';
        this.getTransferPosition(this.left, this.top, this.width, this.height, this.angle, this.centerPos);
      }
    }
  }, {
    key: "getRotate",
    value: function getRotate(target) {
      var st = window.getComputedStyle(target, null);
      var tr = st.getPropertyValue("-webkit-transform") || st.getPropertyValue("-moz-transform") || st.getPropertyValue("-ms-transform") || st.getPropertyValue("-o-transform") || st.getPropertyValue("transform") || "FAIL"; // With rotate(30deg)...
      // matrix(0.866025, 0.5, -0.5, 0.866025, 0px, 0px)

      if (tr !== 'none') {
        var values = tr.split('(')[1].split(')')[0].split(',');
        var a = values[0];
        var b = values[1];
        var c = values[2];
        var d = values[3];
        var scale = Math.sqrt(a * a + b * b); // arc sin, convert from radians to degrees, round

        var sin = b / scale; // next line works for 30deg but not 130deg (returns 50);
        // var angle = Math.round(Math.asin(sin) * (180/Math.PI));

        var angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));

        if (angle < 0) {
          angle = 360 + angle;
        }

        return angle;
      } else {
        return 0;
      }
    }
  }, {
    key: "getRotatedPoint",
    value: function getRotatedPoint(curPos, centerPos, angle) {
      return {
        x: Math.floor((curPos.x - centerPos.x) * Math.cos(Math.PI / 180 * angle) - (curPos.y - centerPos.y) * Math.sin(Math.PI / 180 * angle) + centerPos.x),
        y: Math.floor((curPos.x - centerPos.x) * Math.sin(Math.PI / 180 * angle) + (curPos.y - centerPos.y) * Math.cos(Math.PI / 180 * angle) + centerPos.y)
      };
    }
  }, {
    key: "getTransferPosition",
    value: function getTransferPosition(left, top, width, height, angle, center) {
      // 计算变换后的方框四个角的位置
      var a1 = {
        x: left,
        y: top
      };
      var a2 = {
        x: left,
        y: top + height
      };
      var a3 = {
        x: left + width,
        y: top
      };
      var a4 = {
        x: left + width,
        y: top + height
      };
      var a5 = {
        x: left,
        y: top + height / 2
      };
      var a6 = {
        x: left + width,
        y: top + height / 2
      };
      var a7 = {
        x: left + width / 2,
        y: top
      };
      var a8 = {
        x: left + width / 2,
        y: top + height
      };
      this.leftTopPoint = this.getRotatedPoint(a1, center, angle);
      this.leftBottomPoint = this.getRotatedPoint(a2, center, angle);
      this.rightTopPoint = this.getRotatedPoint(a3, center, angle);
      this.rightBottomPoint = this.getRotatedPoint(a4, center, angle);
      this.leftMiddlePoint = this.getRotatedPoint(a5, center, angle);
      this.rightMiddlePoint = this.getRotatedPoint(a6, center, angle);
      this.topMiddlePoint = this.getRotatedPoint(a7, center, angle);
      this.bottomMiddlePoint = this.getRotatedPoint(a8, center, angle);
    }
  }]);

  return Drag;
}();

exports.default = Drag;
window.Drag = Drag;
},{}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49830" + '/');

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
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","plugin/dragger/index.js"], null)
//# sourceMappingURL=/dragger.12fa6ebd.js.map