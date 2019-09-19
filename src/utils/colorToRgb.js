export default (sColor)=>{
    sColor = sColor.toLowerCase();
    //十六进制颜色值的正则表达式
    let hexReg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    
    let rgbReg = /^(rgb|RGB)/
    if(!sColor){
        return ;
    }
    // 如果是16进制颜色
    if (hexReg.test(sColor)) {
        if (sColor.length === 4) {
            let sColorNew = "#";
            for (let i=1; i<4; i+=1) {
                sColorNew += sColor.slice(i, i+1).concat(sColor.slice(i, i+1));    
            }
            sColor = sColorNew;
        }
        //处理六位的颜色值
        let sColorChange = [];
        for (let i=1; i<7; i+=2) {
            sColorChange.push(parseInt("0x"+sColor.slice(i, i+2)));    
        }
        return "RGB(" + sColorChange.join(",") + ")";
    }
    return sColor;
}