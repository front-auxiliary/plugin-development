export default function setAttr(dom,attrs){
    if(typeof attrs == 'object'){
        for(let key in attrs){
            if(attrs[key]){
                
                dom.setAttribute(key, attrs[key])
            }
        }
    }
}