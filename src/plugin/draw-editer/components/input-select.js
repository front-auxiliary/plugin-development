import { creatDom } from '../../../utils';
export default (params)=>{
    const boxDom = creatDom({
        tag:'div',
        style:{
           
            position:'relative'
        }
    })
    const select = creatDom({
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
    })
    // const options = [];
    for(let i=1;i<100;i++){
        let everyOption = creatDom.call(this,{
            tag:'div',
            child:i,
            style:{
                cursor:'pointer',
                boxSizing:'border-box',
                padding:'8px 10px',
                background:'#fff'
            },
            on:{
                hover:()=>{
                    everyOption.style.background="#e6f7ff"
                },
                mousedown:()=>{
                    console.log("----")
                  inputDom.value = everyOption.innerText
                }
            }
           
        })
        select.appendChild(everyOption);
    }
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
            name:params.name
        },
        on:{
            focus:()=>{
                select.style.display='block'
            },
            blur:()=>{
                select.style.display='none'
            }
        }
    })

    boxDom.appendChild(inputDom)
    boxDom.appendChild(select)
    
    return boxDom;
}