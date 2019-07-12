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
})({"plugin/map/main.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var map =
/*#__PURE__*/
function () {
  function map(params) {
    _classCallCheck(this, map);

    //初始化
    this.init();
  }

  _createClass(map, [{
    key: "init",
    value: function init() {
      //echarts
      var myChart = echarts.init(document.getElementById('main'));
      var option = {
        bmap: {},
        tooltip: {
          trigger: 'item'
        },
        visualMap: {
          min: 0,
          max: 2500,
          left: 'left',
          top: 'bottom',
          text: ['高', '低'],
          // 文本，默认为数值文本
          calculable: true
        },
        toolbox: {
          show: true,
          orient: 'vertical',
          left: 'right',
          top: 'center',
          feature: {
            mark: {
              show: true
            },
            dataView: {
              show: true,
              readOnly: false
            },
            restore: {
              show: true
            },
            saveAsImage: {
              show: true
            }
          }
        } // series : [
        //   {
        //       name: '陕西省',
        //       type: 'map',
        //       mapType: 'china',
        //       roam: false,
        //       label: {
        //           normal: {
        //               show: false
        //           },
        //           emphasis: {
        //               show: true
        //           }
        //       },
        //       data:[
        //           {name: '北京',value: Math.round(Math.random()*1000)},
        //           {name: '天津',value: Math.round(Math.random()*1000)},
        //           {name: '上海',value: Math.round(Math.random()*1000)},
        //           {name: '重庆',value: Math.round(Math.random()*1000)},
        //           {name: '河北',value: Math.round(Math.random()*1000)},
        //           {name: '河南',value: Math.round(Math.random()*1000)},
        //           {name: '云南',value: Math.round(Math.random()*1000)},
        //           {name: '辽宁',value: Math.round(Math.random()*1000)},
        //           {name: '黑龙江',value: Math.round(Math.random()*1000)},
        //           {name: '湖南',value: Math.round(Math.random()*1000)},
        //           {name: '安徽',value: Math.round(Math.random()*1000)},
        //           {name: '山东',value: Math.round(Math.random()*1000)},
        //           {name: '新疆',value: Math.round(Math.random()*1000)},
        //           {name: '江苏',value: Math.round(Math.random()*1000)},
        //           {name: '浙江',value: Math.round(Math.random()*1000)},
        //           {name: '江西',value: Math.round(Math.random()*1000)},
        //           {name: '湖北',value: Math.round(Math.random()*1000)},
        //           {name: '广西',value: Math.round(Math.random()*1000)},
        //           {name: '甘肃',value: Math.round(Math.random()*1000)},
        //           {name: '山西',value: Math.round(Math.random()*1000)},
        //           {name: '内蒙古',value: Math.round(Math.random()*1000)},
        //           {name: '陕西',value: Math.round(Math.random()*1000)},
        //           {name: '吉林',value: Math.round(Math.random()*1000)},
        //           {name: '福建',value: Math.round(Math.random()*1000)},
        //           {name: '贵州',value: Math.round(Math.random()*1000)},
        //           {name: '广东',value: Math.round(Math.random()*1000)},
        //           {name: '青海',value: Math.round(Math.random()*1000)},
        //           {name: '西藏',value: Math.round(Math.random()*1000)},
        //           {name: '四川',value: Math.round(Math.random()*1000)},
        //           {name: '宁夏',value: Math.round(Math.random()*1000)},
        //           {name: '海南',value: Math.round(Math.random()*1000)},
        //           {name: '台湾',value: Math.round(Math.random()*1000)},
        //           {name: '香港',value: Math.round(Math.random()*1000)},
        //           {name: '澳门',value: Math.round(Math.random()*1000)}
        //       ]
        //   }]

      };
      myChart.setOption(option); //创建地图实例

      var map = myChart.getModel().getComponent('bmap').getBMap(); //通过取色器获取各省颜色

      var provList = new Array(["黑龙江", "#F09ABD"], ["吉林省", "#01933F"], ["辽宁", "#FAC300"], ["内蒙古", "#FCF502"], ["河北", "#F09ABD"], ["北京", "#FCF502"], ["天津", "#01933F"], ["山东省", "#FCF502"], ["江苏", "#D8EDDA"], ["上海", "#B9B4C8"], ["浙江", "#FCF502"], ["福建", "#FAC300"], ["台湾", "#F09ABD"], ["广东", "#FCF502"], ["香港", "#F09ABD"], ["澳门", "#F09ABD"], ["海南", "#F09ABD"], ["广西", "#FAC300"], ["云南", "#FCF502"], ["西藏", "#B9B4C8"], ["新疆", "#FAC300"], ["甘肃", "#01933F"], ["青海", "#F09ABD"], ["四川", "#FAC300"], ["贵州", "#01933F"], ["重庆", "#B9B4C8"], ["湖南", "#F09ABD"], ["江西", "#01933F"], ["湖北", "#FCF502"], ["安徽", "#FAC300"], ["河南", "#B9B4C8"], ["陕西", "#F09ABD"], ["山西", "#01933F"], ["宁夏", "#FAC300"]); //设置中心点

      map.centerAndZoom(new BMap.Point(116.404, 39.915), 11); // 平移缩放控件

      map.addControl(new BMap.NavigationControl()); // 比例尺

      map.addControl(new BMap.ScaleControl()); //启用滚轮缩放

      map.enableScrollWheelZoom(); //给每个区域添加覆盖物

      provList.forEach(function (item) {
        getBoundary(item);
      });

      function getBoundary(provItem) {
        var bdary = new BMap.Boundary(); //获取行政区域

        bdary.get(provItem[0], function (rs) {
          //行政区域的点有多少个
          var count = rs.boundaries.length;

          if (count === 0) {
            console.log('未能获取当前输入行政区域');
            return;
          }

          var pointArray = [];

          for (var i = 0; i < count; i++) {
            //建立多边形覆盖物
            var ply = new BMap.Polygon(rs.boundaries[i], {
              strokeWeight: 1,
              strokeColor: "#aaaaaa",
              fillColor: provItem[1]
            }); //添加覆盖物
            // ply.addEventListener("mousemove",function(e){
            //    console.log('poy--',e);
            // })

            map.addOverlay(ply);
            pointArray = pointArray.concat(ply.getPath());
          }
        });
      }
    }
  }, {
    key: "render",
    value: function render() {}
  }]);

  return map;
}();

exports.default = map;
},{}],"plugin/map/index.js":[function(require,module,exports) {
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
  window.map = _main.default;
});
},{"./main":"plugin/map/main.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "55345" + '/');

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
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","plugin/map/index.js"], null)
//# sourceMappingURL=/map.2f0ec65c.js.map