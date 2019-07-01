import data from './data';
class bar {
    constructor(params,draw){
        this.dom = params.dom;
        this.data = data.concat(params.data||[]);
        this.drawObj = draw
    }   
    init(){
        
        this.data.map((item)=>{
            let dombox =  this.creatDom({tag:'div',style:{
                display:'inline-block',
                margin:'5px',
                minWidth:'50px',
                minHeight:'50px',
                padding:'5px',
                textAlign:'center',
                fontSize:'12px',
                cursor:'pointer',
                verticalAlign:'middle',
                boxSizing:'border-box',
                borderRadius:'4px'
                
            }});
            let domText = this.creatDom({tag:'span',child:item.text,style:{display:'block'}})
            let domImg = this.creatDom({tag:'img',attr:{src:item.img},style:{
                height:'20px'
            }});
            if(item.on){
                for(let key in item.on){
                    dombox.removeEventListener(key,item.on[key].bind(this));
                    dombox.addEventListener(key,item.on[key].bind(this,this.drawObj));
                }
            }
            dombox.appendChild(domImg);
            dombox.appendChild(domText);
            dombox.onmousemove = function(){
                dombox.style.background='rgba(14,19,24,.15)'
            }
            dombox.onmouseleave = function(){
                dombox.style.background='#fff'
            }

           
            this.dom.appendChild(dombox);

            
           
        })
    }
    creatDom(params){
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
    creatImg(){

    }
    add(){

    }
}
export default bar;