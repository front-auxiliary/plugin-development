
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

  getHtml() {
    const enterReg = /\n\r/g;
    this.stream = this.stream.replace(enterReg,function(str){
      return <br>;
    })
    
    return this.stream;
  }
}
module.exports = Parser;