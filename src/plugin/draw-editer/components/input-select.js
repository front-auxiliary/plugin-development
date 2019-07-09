import { creatDom } from '../../../utils';
export default (params)=>{
    const {options,isInput} = params;
    const boxDom = creatDom({
        tag:'div',
        style:{
           
            position:'relative'
        }
    })
    const select = isInput?creatDom({
        tag:'div',
        style:{
            maxHeight:'200px',
            overflow:'auto',
            position:'absolute',
            width:'100%',
            display:'none',
            zIndex:'999',
            background:'#fff',
            boxShadow:'0 2px 8px rgba(0,0,0,0.15)',
            borderRadius:'4px',
            margin:'5px 0'
            
        }
    }):creatDom({

        tag:'select',
        attr:{
            name:params.name,
        },
        style:{
            display:'block',
            width:'100%',
            height:'35px',
            borderRadius:'4px',
            border:'1px solid #d9d9d9',
            boxSizing:'border-box',
            padding:' 0 10px',
            background:'#fff',
        }
    })

   
    
    const inputDom = creatDom({
        tag:'input',
        style:{
            display:'block',
            width:'100%',
            lineHeight:'35px',
            borderRadius:'4px',
            border:'1px solid #d9d9d9',
            boxSizing:'border-box',
            padding:' 0 10px',

        },
        attr:{
            name:params.name,
            autocomplete:"off"
        },
        on:{
            focus:(event,dom)=>{
                select.style.display='block'
                const value = dom.value||'';
                
                
                // console.log(arr,"kkkk")
                creatOptions(select,options,inputDom,params)
            },
            blur:()=>{
                select.style.display='none'
            },
            input:(event,dom)=>{
                const value = dom.value||'';
                const arr =value ? options.filter((currentValue)=>{
                    // console.log(currentValue,"kkkkk")
                    return (currentValue.value+'').indexOf(value)!=-1;
                }):options
                if(value){
                    arr.unshift({value:value,label:value})
                }
                creatOptions(select,arr,inputDom,params)

            }
        }
    })
    creatOptions(select,options,inputDom,params)
    if(isInput){
        boxDom.appendChild(inputDom)
    }
   
    boxDom.appendChild(select)
    
    return boxDom;
}
function creatOptions(select,options,inputDom,params){
    select.innerHTML = '';
    options.map((item,index)=>{
        let everyOption = creatDom({
            tag:'option',
            child:item.value,
            style:{
                display:'block',
                cursor:'pointer',
                boxSizing:'border-box',
                padding:'8px 10px',
                height:'35px',
                background:'#fff'
            },
            attr:{
                value:item.value,
            },
            on:{
                hover:()=>{
                    everyOption.style.background="#e6f7ff"
                },
                mousedown:(event,dom)=>{
                   
                  inputDom.value = everyOption.innerText
                  params.on.change(event,dom)
                }
            }
           
        })
        select.appendChild(everyOption);
    })
}