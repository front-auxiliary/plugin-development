import main from './main'
  ; (function (global, factory) {
    "use strict";

    if (typeof module === "object" && typeof module.exports === "object") {
      module.exports = global.document ?
        factory(global, true) :
        function (w) {
          if (!w.document) {
            throw new Error("draw-editer requires a window with a document");
          }
          return factory(w);
        };
    } else {
      factory(global);
    }
  }(typeof window !== "undefined" ? window : this, function (window, noGlobal) {
    const version = "0.0.1";
    window.drawEditer = main;

  }))