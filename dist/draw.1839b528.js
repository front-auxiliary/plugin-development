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
})({"plugin/go/draw/index.js":[function(require,module,exports) {
(function () {
  function init(go, content, selectToolbar, overview) {
    if (window.goSamples) goSamples(); // init for these samples -- you don't need to call this

    var $ = go.GraphObject.make; // for conciseness in defining templates
    // return ;

    function TopRotatingTool() {
      go.RotatingTool.call(this);
    }

    go.Diagram.inherit(TopRotatingTool, go.RotatingTool);
    /** @override */

    TopRotatingTool.prototype.updateAdornments = function (part) {
      go.RotatingTool.prototype.updateAdornments.call(this, part);
      var adornment = part.findAdornment("Rotating");

      if (adornment !== null) {
        adornment.location = part.rotateObject.getDocumentPoint(new go.Spot(0.5, 0, 0, -30)); // above middle top
      }
    };
    /** @override */


    TopRotatingTool.prototype.rotate = function (newangle) {
      go.RotatingTool.prototype.rotate.call(this, newangle + 90);
    };

    var myDiagram = $(go.Diagram, content, {
      /**
       * 网格设置
      */
      grid: $(go.Panel, "Grid", $(go.Shape, "LineH", {
        stroke: "lightgray",
        strokeWidth: 0.5
      }), $(go.Shape, "LineH", {
        stroke: "gray",
        strokeWidth: 0.5,
        interval: 10
      }), $(go.Shape, "LineV", {
        stroke: "lightgray",
        strokeWidth: 0.5
      }), $(go.Shape, "LineV", {
        stroke: "gray",
        strokeWidth: 0.5,
        interval: 10
      })),
      allowDrop: true,
      // 允许从Palette往画板拖拽内容
      "draggingTool.dragsLink": true,
      //直线被拖入
      "draggingTool.isGridSnapEnabled": true,
      //启用网格捕获
      "linkingTool.isUnconnectedLinkValid": true,
      //从图形上点出的连接线是否允许连接单个图形
      "linkingTool.portGravity": 20,
      //从图形上点出的连接线的锚点的吸附范围
      "relinkingTool.isUnconnectedLinkValid": true,
      //工具栏的链接线是否允许连接单个图形
      "relinkingTool.portGravity": 20,
      //工具栏的链接线的锚点的吸附范围

      /**
       * 链接线的属性
      */
      "relinkingTool.fromHandleArchetype": $(go.Shape, "Diamond", {
        segmentIndex: 0,
        cursor: "pointer",
        desiredSize: new go.Size(8, 8),
        fill: "tomato",
        stroke: "darkred"
      }),
      "relinkingTool.toHandleArchetype": $(go.Shape, "Diamond", {
        segmentIndex: -1,
        cursor: "pointer",
        desiredSize: new go.Size(8, 8),
        fill: "darkred",
        stroke: "tomato"
      }),
      "linkReshapingTool.handleArchetype": $(go.Shape, "Diamond", {
        desiredSize: new go.Size(7, 7),
        fill: "lightblue",
        stroke: "deepskyblue"
      }),
      rotatingTool: $(TopRotatingTool),
      // 旋转按钮
      "rotatingTool.snapAngleMultiple": 15,
      //？
      "rotatingTool.snapAngleEpsilon": 15,
      //?
      "undoManager.isEnabled": true
    }); // when the document is modified, add a "*" to the title and enable the "Save" button

    myDiagram.addDiagramListener("Modified", function (e) {
      var button = document.getElementById("SaveButton");
      if (button) button.disabled = !myDiagram.isModified;
      var idx = document.title.indexOf("*");

      if (myDiagram.isModified) {
        if (idx < 0) document.title += "*";
      } else {
        if (idx >= 0) document.title = document.title.substr(0, idx);
      }
    });

    function makePort(name, spot, output, input) {
      return $(go.Shape, "Circle", {
        fill: null,
        // not seen, by default; set to a translucent gray by showSmallPorts, defined below
        stroke: null,
        desiredSize: new go.Size(7, 7),
        alignment: spot,
        // align the port on the main Shape
        alignmentFocus: spot,
        // just inside the Shape
        portId: name,
        // declare this object to be a "port"
        fromSpot: spot,
        toSpot: spot,
        // declare where links may connect at this port
        fromLinkable: output,
        toLinkable: input,
        // declare whether the user may draw links to/from here
        cursor: "pointer" // show a different cursor to indicate potential link point

      });
    }

    var nodeSelectionAdornmentTemplate = $(go.Adornment, "Auto", $(go.Shape, {
      fill: null,
      stroke: "deepskyblue",
      strokeWidth: 1.5,
      strokeDashArray: [4, 2]
    }), $(go.Placeholder));
    var nodeResizeAdornmentTemplate = $(go.Adornment, "Spot", {
      locationSpot: go.Spot.Right
    }, $(go.Placeholder), $(go.Shape, {
      alignment: go.Spot.TopLeft,
      cursor: "nw-resize",
      desiredSize: new go.Size(6, 6),
      fill: "lightblue",
      stroke: "deepskyblue"
    }), $(go.Shape, {
      alignment: go.Spot.Top,
      cursor: "n-resize",
      desiredSize: new go.Size(6, 6),
      fill: "lightblue",
      stroke: "deepskyblue"
    }), $(go.Shape, {
      alignment: go.Spot.TopRight,
      cursor: "ne-resize",
      desiredSize: new go.Size(6, 6),
      fill: "lightblue",
      stroke: "deepskyblue"
    }), $(go.Shape, {
      alignment: go.Spot.Left,
      cursor: "w-resize",
      desiredSize: new go.Size(6, 6),
      fill: "lightblue",
      stroke: "deepskyblue"
    }), $(go.Shape, {
      alignment: go.Spot.Right,
      cursor: "e-resize",
      desiredSize: new go.Size(6, 6),
      fill: "lightblue",
      stroke: "deepskyblue"
    }), $(go.Shape, {
      alignment: go.Spot.BottomLeft,
      cursor: "se-resize",
      desiredSize: new go.Size(6, 6),
      fill: "lightblue",
      stroke: "deepskyblue"
    }), $(go.Shape, {
      alignment: go.Spot.Bottom,
      cursor: "s-resize",
      desiredSize: new go.Size(6, 6),
      fill: "lightblue",
      stroke: "deepskyblue"
    }), $(go.Shape, {
      alignment: go.Spot.BottomRight,
      cursor: "sw-resize",
      desiredSize: new go.Size(6, 6),
      fill: "lightblue",
      stroke: "deepskyblue"
    }));
    var nodeRotateAdornmentTemplate = $(go.Adornment, {
      locationSpot: go.Spot.Center,
      locationObjectName: "CIRCLE"
    }, $(go.Shape, "Circle", {
      name: "CIRCLE",
      cursor: "pointer",
      desiredSize: new go.Size(7, 7),
      fill: "lightblue",
      stroke: "deepskyblue"
    }), $(go.Shape, {
      geometryString: "M3.5 7 L3.5 30",
      isGeometryPositioned: true,
      stroke: "deepskyblue",
      strokeWidth: 1.5,
      strokeDashArray: [4, 2]
    }));
    myDiagram.nodeTemplate = $(go.Node, "Spot", {
      locationSpot: go.Spot.Center
    }, new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify), {
      selectable: true,
      selectionAdornmentTemplate: nodeSelectionAdornmentTemplate
    }, {
      resizable: true,
      resizeObjectName: "PANEL",
      resizeAdornmentTemplate: nodeResizeAdornmentTemplate
    }, {
      rotatable: true,
      rotateAdornmentTemplate: nodeRotateAdornmentTemplate
    }, new go.Binding("angle").makeTwoWay(), // the main object is a Panel that surrounds a TextBlock with a Shape
    $(go.Panel, "Auto", {
      name: "PANEL"
    }, new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify), $(go.Shape, "Rectangle", // default figure
    {
      portId: "",
      // the default port: if no spot on link data, use closest side
      fromLinkable: true,
      toLinkable: true,
      cursor: "pointer",
      fill: "white",
      // default color
      strokeWidth: 2
    }, new go.Binding("figure"), new go.Binding("fill")), $(go.TextBlock, {
      font: "bold 11pt Helvetica, Arial, sans-serif",
      margin: 8,
      maxSize: new go.Size(160, NaN),
      wrap: go.TextBlock.WrapFit,
      editable: true
    }, new go.Binding("text").makeTwoWay())), // four small named ports, one on each side:
    makePort("T", go.Spot.Top, false, true), makePort("L", go.Spot.Left, true, true), makePort("R", go.Spot.Right, true, true), makePort("B", go.Spot.Bottom, true, false), {
      // 鼠标事假
      mouseEnter: function mouseEnter(e, node) {
        showSmallPorts(node, true);
      },
      mouseLeave: function mouseLeave(e, node) {
        showSmallPorts(node, false);
      },
      selectionChanged: function selectionChanged(part) {
        console.log(part.elt(0), "oooooooo");
      },
      click: function click(e, obj) {
        console.log(e, "++++++++++", obj);
      }
    });

    function showSmallPorts(node, show) {
      node.ports.each(function (port) {
        if (port.portId !== "") {
          // don't change the default port, which is the big shape
          port.fill = show ? "rgba(0,0,0,.3)" : null;
        }
      });
    }

    var linkSelectionAdornmentTemplate = $(go.Adornment, "Link", $(go.Shape, // isPanelMain declares that this Shape shares the Link.geometry
    {
      isPanelMain: true,
      fill: null,
      stroke: "deepskyblue",
      strokeWidth: 0
    }) // use selection object's strokeWidth
    );
    myDiagram.linkTemplate = $(go.Link, // the whole link panel
    {
      selectable: true,
      selectionAdornmentTemplate: linkSelectionAdornmentTemplate
    }, {
      relinkableFrom: true,
      relinkableTo: true,
      reshapable: true
    }, {
      routing: go.Link.AvoidsNodes,
      curve: go.Link.JumpOver,
      corner: 5,
      toShortLength: 4
    }, new go.Binding("points").makeTwoWay(), $(go.Shape, // the link path shape
    {
      isPanelMain: true,
      strokeWidth: 2
    }), $(go.Shape, // the arrowhead
    {
      toArrow: "Standard",
      stroke: null
    }), $(go.Panel, "Auto", new go.Binding("visible", "isSelected").ofObject(), $(go.Shape, "RoundedRectangle", // the link shape
    {
      fill: "#F8F8F8",
      stroke: null
    }), $(go.TextBlock, {
      textAlign: "center",
      font: "10pt helvetica, arial, sans-serif",
      stroke: "#919191",
      margin: 2,
      minSize: new go.Size(10, NaN),
      editable: true
    }, new go.Binding("text").makeTwoWay())), {
      click: function click(e, obj) {
        console.log(e, "------", obj);
      }
    }); // initialize the Palette that is on the left side of the page

    var myPalette = $(go.Palette, selectToolbar, // must name or refer to the DIV HTML element
    {
      maxSelectionCount: 1,
      nodeTemplateMap: myDiagram.nodeTemplateMap,
      // share the templates used by myDiagram
      linkTemplate: // simplify the link template, just in this Palette
      $(go.Link, {
        // because the GridLayout.alignment is Location and the nodes have locationSpot == Spot.Center,
        // to line up the Link in the same manner we have to pretend the Link has the same location spot
        locationSpot: go.Spot.Center,
        selectionAdornmentTemplate: $(go.Adornment, "Link", {
          locationSpot: go.Spot.Center
        }, $(go.Shape, {
          isPanelMain: true,
          fill: null,
          stroke: "deepskyblue",
          strokeWidth: 0
        }), $(go.Shape, // the arrowhead
        {
          toArrow: "Standard",
          stroke: null
        }))
      }, {
        routing: go.Link.AvoidsNodes,
        //绕行节点
        curve: go.Link.JumpOver,
        corner: 5,
        toShortLength: 4
      },
      /*{
          routing: go.Link.AvoidsNodes,//绕行节点
          curve: go.Link.Bezier ,
          corner: 5,
          toShortLength: 4
      },*/
      new go.Binding("points"), $(go.Shape, // the link path shape
      {
        isPanelMain: true,
        strokeWidth: 2
      }), $(go.Shape, // the arrowhead
      {
        toArrow: "Standard",
        stroke: null
      })),
      model: new go.GraphLinksModel([// specify the contents of the Palette
      {
        text: "创建节点"
      }, {
        text: "普通节点"
      }, {
        text: "归档节点"
      }, {
        text: "分支",
        figure: "Diamond",
        fill: "lightskyblue"
      }, {
        text: "合并",
        figure: "RoundedRectangle",
        fill: "lightyellow",
        name: 'name'
      }], [{
        points: new go.List(go.Point).addAll([new go.Point(0, 0), new go.Point(30, 0), new go.Point(30, 40), new go.Point(60, 40)])
      }])
    });
    var myOverview = $(go.Overview, overview, {
      observed: myDiagram
    });
    var myModel = $(go.Model);
    return {
      diagram: myDiagram,
      model: myModel
    };
  }

  window.goDrow = init;
})(); // end of TopRotatingTool class
// Show the diagram's model in JSON format that the user may edit
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "60306" + '/');

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
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","plugin/go/draw/index.js"], null)
//# sourceMappingURL=/draw.1839b528.js.map