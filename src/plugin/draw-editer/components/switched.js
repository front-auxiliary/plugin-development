import { creatDom } from '../../../utils';
export default (params)=>{
    let boxDom =creatDom({
        tag:'div',
        style:{
            display:'inline-block',
            width:'30px',
            height:'30px',
            backgroundImage:`url(${params.url})`,
            backgroundSize:'100%',
            backgroundPosition:'center'

        }
    })
    let checkbox = creatDom({
        tag:'input',
        attr:{
            type:'checkbox'
        },
        style:{
            width: '30px',
            height: '30px',
            display: 'inline-block',
            opacity: '0',
            cursor:'pointer'
        },
        on:{
            change:(event,dom)=>{
            
                if(dom.checked){
                    boxDom.style.backgroundColor='red';
                }else{
                    boxDom.style.backgroundColor='#fff';
                }
                params.on.change(event,dom)
            }
        }
    })
    boxDom.appendChild(checkbox)
    
    return boxDom
}