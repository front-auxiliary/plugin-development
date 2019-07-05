import { creatDom } from '../../../utils';
let options = []
const render = (options,boxDom,params)=>{
    const change = params.on.change;
    boxDom.innerHTML = '';

    options.map((item)=>{
        let everyItem = creatDom({
            tag:'input',
            attr:{
                value :item.value,
                name:params.name,
                checked:item.active?true:false ,
                type:'radio'
            },
            style:{
                width: '30px',
                height: '30px',
                cursor: 'pointer',
                display: 'inline-block',
                backgroundSize: '25px',
                backgroundColor: item.active?'rgba(14,19,24,.15)':'#fff',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                borderRadius: '4px',
                verticalAlign: 'middle',
                margin: '2px',
                backgroundImage:`url(${item.url})`
            },
            on:{
                click:(event,dom)=>{
                    let value = dom.getAttribute('value');
                    options= options.map((item,index)=>{
                        if(item.value == value){
                            item.active = true;
                        }else{
                            item.active = false;
                        }
                        return item;

                    })
                    boxDom.value = value;
                    boxDom.setAttribute('value',value)
                    // change()
                    render(options,boxDom,params)
                }
            }

        })
        boxDom.appendChild(everyItem)
    })

}
export default (params)=>{
    options = [].concat(params.options);
    const boxDom = creatDom({
        tag:'div',
        style:{
            display:'inline-block',
        },
        on:{
            input:()=>{
                console.log("kkjjjjj")
            } 
        }
    })
  
    // new Proxy(boxDom,{
    //     set:function(target, key, value){
    //         console.log(value,"jjjjj")
    //     }
    // })
    render(options,boxDom,params)
   return boxDom;
}
