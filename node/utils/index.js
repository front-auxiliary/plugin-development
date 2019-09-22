
class Parser {
  constructor() {
    this.stream = null;
    this.attrObj = {}
  }
  init(stream) {
    this.stream = stream;
    return this;
  }

  parsing() {

    return this;
  }
  then(callback) {
    callback(this)
    return this;
  }
  includegraphicsFormat(attrStr) {
    const attrReg = /\[(.*?)\]/g;
    const srcReg = /\{(.*?)\}/g;
    let attrObj = {};
    attrStr.replace(attrReg, (str) => {
      let newStr = str,
        attrs = [];
      newStr = newStr.replace(/\[|\]/g, '');
      attrs = newStr.split(',');
      attrs.map((item) => {
        let everyAttr = item.split('=');
        attrObj[everyAttr[0]] = everyAttr[1]
      })
      attrStr.replace(srcReg, (str) => {
        let newSrc = str;
        newSrc = newSrc.replace(/\{|\}/g, '');
        attrObj.src = newSrc;
      })

    })
    return { ...attrObj };
  }
  // \documentclass
  replace(cmd, callback) {
    let reg = RegExp(cmd + '(\\[(.*?)\\])*\\{(.*?)\\}', 'g')
    if(this.gettype(cmd) == 'regExp'){
      reg = cmd;
    }
    this.stream = this.stream.replace(reg, callback)
    return this;
  }
  // 获取类型
  gettype(cmd) {
    const gettype = Object.prototype.toString;
    switch (gettype.call(cmd)) {
      case '[object RegExp]': return 'regExp';
      case '[object String]': return 'string';
      case '[object Number]': return 'number';
      case '[object Boolean]': return 'boolean';
      case '[object Undefined]': return 'undefined';
      case '[object Object]': return 'object';
      case '[object Array]': return 'array';
      case '[object Function]': return 'function';
      case '[object Null]': return 'null';
      default:
        return 'null';
    }
  }

  imgFormat() {
    //  tex  ==> exp （输入正则表达式）==> getAttr（过去对应属性允许过滤） =>tohtml （用具体对象过滤生成） 三个方法
    // \includegraphics[width=71.69045005488475mm]{/home/lsk/Desktop/Gaosi/formula_19_0212/data/test111/122/旧/6_0_img/572_77_883_319.jpg}
    // const imgReg = /\\includegraphics\[(.*?)\]\{(.*?)\}/g
    this.replace('\documentclass', (str) => {
      return str;
    })
    // this.delhander(this.stream,'begin' )
    // this.delhander(this.stream,'end' )
    // this.delhander(this.stream,'usepackage' )
    // this.delhander(this.stream,'includegraphics' )
    return;
    this.stream = this.stream.replace(imgReg, (str) => {
      // console.log( this.includegraphicsFormat(str))

      // this.getAttr(str)
      return str;
    })
  }
  getHtml() {
    const enterReg = /\n|\r/g;

    this.stream = this.stream.replace(enterReg, function (str) {
      return '<br>';
    })

    return this.stream;
  }
}
module.exports = Parser;