
class Parser {
    constructor(){
        
        this.stream = null;
    }
    init(stream){
        this.stream = stream;
        return this;
    }

    parsing(){

     return this;
    }
    then(callback){

        return this;
    }

    getHtml(){
        return 'niha';
    }
}
module.exports = Parser;