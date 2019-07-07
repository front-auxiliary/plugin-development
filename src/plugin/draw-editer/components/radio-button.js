import { creatDom } from '../../../utils';
import radio from './radio';
let options = []
const render = (options, boxDom, params) => {
    const change = params.on.change;
    boxDom.innerHTML = '';

    options = options.map((item) => {
        const lableDom = creatDom({
            tag: 'label',
            chlid: 'niho',
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
                backgroundPosition: 'center'
            }
        })
        const radioDom = creatDom({
            tag: 'input',
            attr: {
                type: 'radio',
                name: params.name,
                value: item.value
            },
            on: {
                change: (event, dom) => {
                    // lableDom.style.backgroundColor = "red"
                    // console.log(dom.checked, "jjj", event)
                    console.log("------",options)
                    for(let i=0;i<options.length;i++){
                        let value = options[i].dom.dataset.value;
                        console.log(options[i].dom.value)
                        if(value == dom.value){
                            options[i].dom.style.backgroundColor='red'
                        }else{
                            options[i].dom.style.backgroundColor='#fff'
                        }
                    }
                    params.on.change(event, dom)
                }
            },
            style: {
                width: '30px',
                height: '30px',
                display: 'inline-block',
                opacity: '0'
            }
        })
       
        lableDom.appendChild(radioDom)
        boxDom.appendChild(lableDom)
        item.dom = lableDom;
        return item;
    })
    console.log("mmmmn",options)

}
export default (params) => {
    options = [].concat(params.options);
    const boxDom = creatDom({
        tag: 'div',
        style: {
            display: 'inline-block',
        },
    })

    // new Proxy(boxDom,{
    //     set:function(target, key, value){
    //         console.log(value,"jjjjj")
    //     }
    // })
    render(options, boxDom, params)
    return boxDom;
}
