import { creatDom } from '../../../utils';
import data from './data';
class drawDetail {
  constructor(canvas) {
    this.canvas = canvas;

  }
  init() {
    let detailBox = creatDom.call(this, {
      tag: 'form',
      style: {
        position: 'absolute',
        width: '300px',
        background: '#FFF',
        margin: '0 -300px 0 0',
        right: '0px',
        bottom: '0px',
        top: '0px',
        boxShadow: '1px 1px 1px 1px rgba(14,19,24,.15)'
      }
    });
    data.map((item, index) => {
      detailBox.appendChild(this.divList(item));
    })
    this.canvas.appendChild(detailBox)
  }
  divList(params) {
    let domBox = creatDom.call(this, {});
    let titleDom = creatDom.call(this, { tag: 'div', child: params.title })
    // let formDom = 
    let itemDom = null;
    if (params.type == 'textarea') {
      itemDom = creatDom.call(this, { tag: 'textarea' });
    }
    if (params.type == 'select') {
      itemDom = creatDom.call(this, { tag: 'select', on: params.on })
      let optionData = params.options;
      optionData.map((item) => {
        itemDom.appendChild(creatDom.call(this, { tag: 'option', child: item.label }))
      })
    }
    if (params.type == 'tab') {
      itemDom = creatDom.call(this, { tag: 'div', style: { margin: '5px' } })
      let optionData = params.options;
      optionData.map((item) => {
        itemDom.appendChild(creatDom.call(this, item))
      })
    }
    domBox.appendChild(titleDom);
    domBox.appendChild(itemDom)
    return domBox;

  }
}

export default drawDetail;