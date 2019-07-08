import { creatDom } from '../../../utils';
export default (params)=>{
    let boxDom =creatDom({
        tag:'div',
        style:{
            display:'inline-block',
            width:'30px',
            height:'30px',
            backgroundImage:`url(${params.url})`,
            backgroundSize:'80%',
            backgroundPosition:'center',
            borderRadius:'4px',
            backgroundRepeat:'no-repeat'

        }
    })
    let checkbox = creatDom({
        tag:'input',
        attr:{
            type:'checkbox',
            name:params.name
        },
        style:{
            width: '30px',
            height: '30px',
            display: 'inline-block',
            opacity: '0',
            cursor:'pointer',
          
        },
        on:{
            change:(event,dom)=>{
            
                if(dom.checked){
                    boxDom.style.backgroundColor='rgba(14,19,24,.07)';
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