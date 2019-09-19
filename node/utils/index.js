
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
  getAttr(attrStr){
    const attrReg = /\[(.*?)\]/g;
    attrStr.replace(attrReg,(str)=>{
      let newStr = str,
          attrs = [],
          attrObj={};
      newStr= newStr.replace(/\[|\]/g,'');
      attrs = newStr.split(',');
      attrs.map((item)=>{
        let everyAttr = item.split('=');
        attrObj[everyAttr[0]] = everyAttr[1]
      })
      return {...attrObj};
    })


  }
  imgFormat(){
    // \includegraphics[width=71.69045005488475mm]{/home/lsk/Desktop/Gaosi/formula_19_0212/data/test111/122/旧/6_0_img/572_77_883_319.jpg}
    const imgReg = /\\includegraphics\[(.*?)\]\{(.*?)\}/g
   
    this.stream = this.stream.replace(imgReg,(str)=>{
      this.getAttr(str)
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