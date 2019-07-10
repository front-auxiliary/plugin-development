export default function hsvToRgb(params) {
    var {h,s,v} = params;

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
    　　return {r:Math.round(r * 255), g:Math.round(g * 255),b: Math.round(b * 255)};
}
