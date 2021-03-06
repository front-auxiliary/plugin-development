export default class pubsub{
    constructor(){
        this.topics  = {};
        this.token = 0;
    }   
    // 发布
    pub(name,args){
        if (!this.topics[name]) {
            return false;
        }
        var subscribers = this.topics[name];
        var len = subscribers ? subscribers.length : 0;
        while(len--) {
            subscribers[len].fn(name, args);
        }
        return this;
    }
    // 订阅
    sub(name,fn){
        if (!this.topics[name]) {
            this.topics[name] = [];
        }
        this.token++;
        this.topics[name].push({
            token: this.token,
            fn:fn
        })
        return this.token;
       
    }
    unSub(token){
        for(let key in this.topics){
            let topArr = this.topics[key];
            if(topArr){
                for(let i = 0; i<topArr.length;i++){
                    if(topArr[i].token == token){
                        topArr.splice(i,1);
                        return token;
                    }
                }

            }
        }
        return this;
    }

}