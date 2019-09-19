export default (params) =>{
    let { r, g, b } = params;
    const saturation = 255
    for(let key in params){
        if(!params[key]){
            throw new Error(`${key}是必填项`);
        }
    }
    let c = 1 - (r / 255); 
    let m = 1 - (g / 255); 
    let y = 1 - (b / 255); 
    let k = Math.min(y, Math.min(m, Math.min(c, 1)));
    c = Math.round((c - k) / (1 - k) * 100);
	m = Math.round((m - k) / (1 - k) * 100);
	y = Math.round((y - k) / (1 - k) * 100);
	k = Math.round(k * 100);
    return {c,m,y,k}
}