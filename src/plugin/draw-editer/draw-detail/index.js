import { creatDom } from '../../../utils';
import data from './data';
import {inputSelect,textarea} from '../components'
class drawDetail {
  constructor(canvas) {
    this.canvas = canvas;
    this.form = null;

  }
  init() {
    let detailBox = creatDom.call(this, {
      tag: 'form',
      style: {
        position: 'absolute',
        width: '300px',
        background: '#FFF',
        margin: '0 -300px 0 0',
        right: '-5px',
        bottom: '0px',
        top: '0px',
        // boxShadow:'0 2px 8px rgba(0,0,0,0.15)',
        
      }
    });
    this.form = detailBox;
    data.map((item, index) => {
      detailBox.appendChild(this.divList(item));
    })
    this.canvas.appendChild(detailBox)
  }
  active(dom){
    
    let type = dom.dataset.elemtype,
    text = dom.innerText,
    fontFamily = dom.style.fontFamily,
    fontSize = dom.style.fontSize,
    lineHeight = dom.style.lineHeight,
    textAlign = dom.style.textAlign,
    fontWeight = dom.style.fontWeight,
    color=dom.style.color;

    // 
    // .text = '3333'
    console.log(this.form,"kkkk")
    
    // if(type == text)
    console.log(type,text,fontFamily,fontSize,lineHeight,textAlign,color)
  }
  divList(params) {
    let domBox = creatDom.call(this, {
      tag:'div',
      style:{
        padding:'5px 10px',
        margin:'8px 5px'
      }
    });
    let titleDom = creatDom.call(this, { tag: 'div', child: params.title,style:{
      margin:'5px 0'
    } })
    // let formDom = 
    let itemDom = null;
    if (params.type == 'textarea') {
      itemDom = textarea({name:params.name})
    }
    if (params.type == 'select') {
      itemDom =  inputSelect()
      // itemDom = creatDom.call(this, { tag: 'select', on: params.on })
      // let optionData = params.options;
      // optionData.map((item) => {
      //   itemDom.appendChild(creatDom.call(this, { tag: 'option', child: item.label }))
      // })
    }
    if (params.type == 'tab') {
      itemDom = creatDom.call(this, { tag: 'div', style: { margin: '5px' } })
      let optionData = params.options;
      optionData.map((item) => {
        itemDom.appendChild(creatDom.call(this, item))
      })
    }
    if(params.type == 'color'){
      itemDom = creatDom.call(this,{
        tag:'input',
        attr:{
          type:'color'
        },

      })
    }
    domBox.appendChild(titleDom);
    domBox.appendChild(itemDom)
    return domBox;

  }
}

export default drawDetail;