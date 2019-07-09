import { creatDom } from '../../../utils';
import dataFn from './data';
import drawData from '../draw-data';
import { inputSelect, textarea, radioButton, switched,
  color } from '../components'
class drawDetail {
  constructor(canvas) {
    const { detail } = drawData.getParams()
    this.canvas = detail;
    this.form = null;
    this.activeDom = null;
    this.data = dataFn.call(this),
      this.detailBox = null
  }
  init() {
    if (this.detailBox) {
      this.detailBox.parentNode.removeChild(this.detailBox);
    }
    const { canvas } = drawData.getParams()
    let detailBox = creatDom.call(this, {
      tag: 'form',
      style: {
        position: 'absolute',
        width: '300px',
        minHeight: canvas.style.height,
        background: '#FFF',
        margin: '0 -300px 0 0',
        right: '-5px',
        bottom: '0px',
        top: '0px'
      },

    });

    this.form = detailBox;
    this.data.map((item, index) => {
      detailBox.appendChild(this.divList(item));
    })
    this.detailBox = drawData.setDetail(detailBox);
    this.canvas.appendChild(detailBox)
  }
  active(dom) {
    this.activeDom = dom;
    // this.init();
    // drawData.getDetail().style.display = 'block'
    

    // 
    // .text = '3333'
    // console.log(this.form,"kkkk")

    // if(type == text)
    // console.log(type,text,fontFamily,fontSize,lineHeight,textAlign,color)
  }
  divList(params) {
    // console.log(params.style,"hhh")
    let domBox = creatDom.call(this, {
      tag: 'div',
      style: Object.assign({
        padding: '5px 10px',
        margin: '8px 5px',
        display: params.type == 'switch' ? 'inline-block' : 'block'
      }, params.style)
    });
    let titleDom = creatDom.call(this, {
      tag: 'div', child: params.title, style: {
        margin: '5px 0'
      }
    })
    // let formDom = 
    let itemDom = null;
    if (params.type == 'textarea') {
      itemDom = textarea({ name: params.name, on: params.on })
    }
    if (params.type == 'select') {
      itemDom = inputSelect(params)
      // itemDom = creatDom.call(this, { tag: 'select', on: params.on })
      // let optionData = params.options;
      // optionData.map((item) => {
      //   itemDom.appendChild(creatDom.call(this, { tag: 'option', child: item.label }))
      // })
    }
    if (params.type == 'radio-button') {
      itemDom = radioButton({
        name: params.name,
        options: params.options,
        on: params.on
      })
      // itemDom = creatDom.call(this, { tag: 'div', style: { margin: '5px' } })
      // let optionData = params.options;
      // optionData.map((item) => {
      //   itemDom.appendChild(creatDom.call(this, item))
      // })
    }
    if (params.type == 'switch') {
      itemDom = switched(params)
    }
    if (params.type == 'color') {
      itemDom = color(params);
      // itemDom = creatDom.call(this, {
      //   tag: 'input',
      //   attr: {
      //     name: params.name,
      //     // class: 'jscolor'
      //     type:'color'
      //   },
      //   style: {
      //     width: '100%',
      //     lineHeight: '35px',
      //     borderRadius: '4px',
      //     border: '1px solid #d9d9d9',
      //     boxSizing: 'border-box',
      //     padding: ' 0 10px',
      //   },
      //   on: params.on

      // })
    }
    if (params.type !== 'switch') {
      domBox.appendChild(titleDom);
    }

    domBox.appendChild(itemDom)
    return domBox;

  }
}

export default drawDetail;