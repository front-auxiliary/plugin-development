
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
  imgFormat(){
    // \includegraphics[width=71.69045005488475mm]{/home/lsk/Desktop/Gaosi/formula_19_0212/data/test111/122/旧/6_0_img/572_77_883_319.jpg}
    const imgReg = /\\includegraphics\[(.*?)\]\{(.*?)\}/g
   
    this.stream = this.stream.replace(imgReg,(str)=>{
      console.log(str)
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