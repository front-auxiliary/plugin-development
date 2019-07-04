import setStyle from './setStyle'
import setAttr from './setAttr'
export default function onListener(dom,onBar,params){
    if(typeof onBar == 'object'){
        for(let key in onBar){
            if(onBar[key]){
                if(key == 'hover'){
                    dom.onmousemove = (event)=>{
                        params.on[key](event,dom)
                    }
                    dom.onmouseleave = (event)=>{
                        setStyle(dom,params.style);
                        setAttr(dom,params.attr)
                    }

                }else{
                    dom[`on`+key] = (event)=>{
                        params.on[key](event,dom)
                    };
                  
                }
                
            }
        }
    }
}
