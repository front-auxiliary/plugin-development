import { creatDom } from '../../../utils';
import radio from './radio';
let options = []
const render = (options, boxDom, params) => {
   
   
   
    
    // console.log("mmmmn",options)

}
export default (params) => {
    options = [].concat(params.options);
    let inputDom = null;
    inputDom = creatDom({
        tag:'input',
        attr:{
            name:params.name
        },
        style:{
            display:'none'
        },
        on:{
            click:(event,dom)=>{
                event.stopPropagation()
                let value = dom.value;
                
                options.map((item,)=>{
                    
                    if(value == item.value){
                        item.dom.style.backgroundColor='rgba(14,19,24,.07)'
                    }else{
                        item.dom.style.backgroundColor='#FFF'
                    }
                })
                // params.on.change(event, dom)
            }
        }
    })
    const boxDom = creatDom({
        tag: 'div',
        style: {
            display: 'inline-block',
        },
    })
    boxDom.appendChild(inputDom);
    options = options.map((item) => {
        const lableDom = creatDom({
            tag: 'label',
            chlid: '',
            attr:{
                value:item.value
            },
            data:{
                value:item.value
            },
            style: {
                width: '30px',
                height: '30px',
                backgroundImage: `url(${item.url})`,
                display: 'inline-block',
                backgroundSize: '100%',
                backgroundPosition: 'center',
                borderRadius:'4px',
                cursor:'pointer'
            },
            on:{
                click:(event,dom)=>{
                    let value = dom.dataset.value;
                    options.map((item,)=>{
                      
                        if(value == item.value){
                            item.dom.style.backgroundColor='rgba(14,19,24,.07)'
                        }else{
                            item.dom.style.backgroundColor='#FFF'
                        }
                    })
                    params.on.change(value)
                }
            }
        })
        boxDom.appendChild(lableDom)
        item.dom = lableDom;
        return item;
    })
    // new Proxy(boxDom,{
    //     set:function(target, key, value){
    //         console.log(value,"jjjjj")
    //     }
    // })
    render(options, boxDom, params)
   
    return boxDom;
}
