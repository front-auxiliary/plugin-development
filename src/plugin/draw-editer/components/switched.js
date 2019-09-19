import { creatDom } from '../../../utils';
export default (params) => {
    let boxDom = null,
        inputDom = null;

    boxDom = creatDom({
        tag: 'div',
        data: {
            value: params.value
        },
        style: {
            display: 'inline-block',
            width: '30px',
            height: '30px',
            backgroundImage: `url(${params.url})`,
            backgroundSize: '80%',
            backgroundPosition: 'center',
            borderRadius: '4px',
            backgroundRepeat: 'no-repeat',
            cursor: 'pointer'

        },
        on: {
            click: (event, dom) => {
               
                let value = dom.dataset.value

                if (value == params.value) {
                    boxDom.style.backgroundColor = '#fff';
                    dom.dataset.value = '';
                } else {
                    boxDom.style.backgroundColor = 'rgba(14,19,24,.07)';
                    dom.dataset.value = params.value;
                }
                params.on.change(dom.dataset.value)

            }
        }
    })
    inputDom = creatDom({
        tag: 'input',
        attr: {
            name: params.name
        },
        style: {
            display: 'none'
        },
        on: {
            click: (event, dom) => {
                event.stopPropagation()
                let value = dom.value;
                if (value == params.value) {
                    boxDom.style.backgroundColor = 'rgba(14,19,24,.07)';
                } else {
                    boxDom.style.backgroundColor = '#fff';
                }
            }
        }
    })

    boxDom.appendChild(inputDom);

    return boxDom
}