
class Parser {
  constructor() {

    this.stream = null;
  }
  init(stream) {
    this.stream = stream;
    return this;
  }

  parsing() {

    return this;
  }
  then(callback) {

    return this;
  }
  includegraphicsFormat(attrStr){
    const attrReg = /\[(.*?)\]/g;
    const srcReg = /\{(.*?)\}/g;
    let attrObj={};
    attrStr.replace(attrReg,(str)=>{
      let newStr = str,
          attrs = [];
      newStr= newStr.replace(/\[|\]/g,'');
      attrs = newStr.split(',');
      attrs.map((item)=>{
        let everyAttr = item.split('=');
        attrObj[everyAttr[0]] = everyAttr[1]
      })
      attrStr.replace(srcReg,(str)=>{
        let newSrc = str;
        newSrc= newSrc.replace(/\{|\}/g,'');
        attrObj.src = newSrc;
      })
      
    })
    return {...attrObj};
  }
  // \documentclass
  delhander (str){
    let docReg = /\\documentclass(\[(.*?)\])*\{(.*?)\}/g
    let begnReg = /\\begin\{(.*?)\}/g
    let endReg = /\\end\{(.*?)\}/g
    let usepackageReg = /\\usepackage(\[(.*?)\])*\{(.*?)\}/g
    // console.log('----',str)
    str = str.replace(docReg,(a)=>{
      console.log(a,"ppp");
      return a
    })
  }

  imgFormat(){
    // \includegraphics[width=71.69045005488475mm]{/home/lsk/Desktop/Gaosi/formula_19_0212/data/test111/122/旧/6_0_img/572_77_883_319.jpg}
    const imgReg = /\\includegraphics\[(.*?)\]\{(.*?)\}/g
    this.delhander(this.stream )
    return ;
    this.stream = this.stream.replace(imgReg,(str)=>{
      // console.log( this.includegraphicsFormat(str))
     
      // this.getAttr(str)
      return str;
    })
  }
  getHtml() {
    const enterReg = /\n|\r/g;
    
    this.stream = this.stream.replace(enterReg,function(str){
      return '<br>';
    })
    
    return this.stream;
  }
}
module.exports = Parser;