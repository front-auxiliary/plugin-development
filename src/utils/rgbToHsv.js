export default (params) =>{
    let {r,g,b} = params;
    r = r / 255;
    g = g / 255;
    b = b / 255;
    let h, s, v;
    let min = Math.min(r, g, b);
    let max = v = Math.max(r, g, b);
    let l = (min + max) / 2;
    let difference = max - min;

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
    return {s,h,v};
}