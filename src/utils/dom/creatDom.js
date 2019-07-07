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
    onListener.call(this,dom,params.on,params)

    return dom;
}
