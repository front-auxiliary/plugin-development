 import setStyle from './setStyle'
 import setAttr from './setAttr'
 import onListener from './onListener'
 export default function creatDom (params){
    let dom =  document.createElement(params.tag||'div');
    // dom.style = Object.assign({},dom.style,params.style||{});
    dom.innerHTML= params.child||'';
    setStyle(dom,params.style);
    setAttr(dom,params.attr)
    if(params.data){
        for(let key in params.data){
            dom.dataset[key] = params.data[key]
        }
    }
    // console.log()
    // if(dom.name == 'text'){
    //     Object.defineProperty(dom,'_value',{
    //         configurable: true,
    //         set: function(value) {
    //             // this.value = value;
    //            console.log("-------||")
    //         },
    //         get: function() {
    //             return this.value;
    //         }
    //     })
    // }
    
    onListener.call(this,dom,params.on,params)

    return dom;
}
