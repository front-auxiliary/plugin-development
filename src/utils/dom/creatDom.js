 export default function creatDom (params){
    let dom =  document.createElement(params.tag);
    // dom.style = Object.assign({},dom.style,params.style||{});
    dom.innerHTML= params.child||'';
    if(params.style){
        for(let key in params.style){
            if(params.style[key]){
                dom.style[key] = params.style[key];
            }
        }
    }
    if(params.on){
        for(let key in params.on){
            if(params.on[key]){
                dom[`on`+key] = params.on[key].bind(this,dom);
            }
        }
    }

    if(params.attr){
        for(let key in params.attr){
            if(params.attr[key]){
                dom[key] = params.attr[key]
            }
        }
    }
    return dom;
}