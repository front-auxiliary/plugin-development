import setStyle from './setStyle'
import setAttr from './setAttr'
export default function onListener(dom,onBar,params){
    if(typeof onBar == 'object'){
        for(let key in onBar){
            if(onBar[key]){
                if(key == 'hover'){
                    dom.removeEventListener('mousemove',onBar[key].bind(this));
                    dom.removeEventListener('mouseleave',onBar[key].bind(this));
                    dom.addEventListener('mousemove',onBar[key].bind(this));
                    dom.addEventListener('mouseleave',()=>{
                        setStyle(dom,params.style);
                        setAttr(dom,params.attr)
                    });

                }else{
                    // dom[`on`+key] = params.on[key].bind(this,dom);
                    dom.removeEventListener(key,onBar[key].bind(this,dom));
                    dom.addEventListener(key,onBar[key].bind(this,dom));
                }
                
            }
        }
    }
}
