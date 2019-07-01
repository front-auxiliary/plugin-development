 import setStyle from './setStyle'
 import setAttr from './setAttr'
 export default function creatDom (params){
    let dom =  document.createElement(params.tag||'div');
    // dom.style = Object.assign({},dom.style,params.style||{});
    dom.innerHTML= params.child||'';
    setStyle(dom,params.style);
    setAttr(dom,params.attr)
    if(params.on){
        for(let key in params.on){
            if(params.on[key]){
                if(key == 'hover'){
                    dom.removeEventListener('mousemove',params.on[key].bind(this));
                    dom.removeEventListener('mouseleave',params.on[key].bind(this));
                    dom.addEventListener('mousemove',params.on[key].bind(this));
                    dom.addEventListener('mouseleave',()=>{
                        setStyle(dom,params.style);
                        setAttr(dom,params.attr)
                    });

                }else{
                    // dom[`on`+key] = params.on[key].bind(this,dom);
                    dom.removeEventListener(key,params.on[key].bind(this,dom));
                    dom.addEventListener(key,params.on[key].bind(this,dom));
                }
                
            }
        }
    }

    return dom;
}
