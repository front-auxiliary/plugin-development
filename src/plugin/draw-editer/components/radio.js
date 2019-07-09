import { creatDom } from '../../../utils';
function radio(){

}
export default (params)=>{
    const lableDom = creatDom({
        tag:'label',
        chlid:'niho',
        style:{
            width:'30px',
            height:'30px',
            backgroundImage:`url(${params.url})`,
            display:'inline-block',
            backgroundSize:'100%',
            backgroundPosition:'center'
        }
    })
    const radioDom = creatDom({
        tag:'input',
        attr:{
            type:'radio',
            name:params.name,
            value:params.value
        },
        on:{
            change:(event,dom)=>{
                boxDom.style.backgroundColor="red"
                console.log(dom.checked,"jjj",event)
                params.on.change(event,dom)
            }
        },
        style:{
            width:'30px',
            height:'30px',
            display:'inline-block',
            opacity:'0'
        }
    })
    lableDom.appendChild(radioDom)
    return boxDom
}