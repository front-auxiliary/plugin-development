import { creatDom } from '../../../utils';
import dataFn from './data';
import drawData from '../draw-data';
import {inputSelect,textarea,radioButton} from '../components'
class drawDetail {
  constructor(canvas) {
    this.canvas = canvas;
    this.form = null;
    this.activeDom = null;
    this.data = dataFn.call(this)

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
    this.data.map((item, index) => {
      detailBox.appendChild(this.divList(item));
    })
    this.canvas.appendChild(detailBox)
  }
  active(dom){
    
    // let type = dom.dataset.elemtype,
    // text = dom.innerText,
    // fontFamily = dom.style.fontFamily,
    // fontSize = dom.style.fontSize,
    // lineHeight = dom.style.lineHeight,
    // textAlign = dom.style.textAlign,
    // fontWeight = dom.style.fontWeight,
    // color=dom.style.color;
    this.activeDom = dom;
    let formArr = {text:dom.innerText,
      fontFamily:dom.style.fontFamily,
      fontSize:dom.style.fontSize,
      lineHeight:dom.style.lineHeight,
      textAlign :dom.style.textAlign,
    }
    for(let key in formArr){
      let itemName = this.form.elements[key];
      // console.log("----",itemName)
      if(!itemName.length){
        itemName.value = formArr[key]
      }else{
        for(let i =0;i<itemName.length;i++){
          let item = itemName[i];
          if(item.value ==  formArr[key]){
            item.checked = true;
          }else{
            item.checked = false;
          }
        }
      }
     
    }
    drawData.setActive(dom);
    // 
    // .text = '3333'
    // console.log(this.form,"kkkk")

    // if(type == text)
    // console.log(type,text,fontFamily,fontSize,lineHeight,textAlign,color)
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
      itemDom = textarea({name:params.name,on:params.on})
    }
    if (params.type == 'select') {
      itemDom =  inputSelect({name:params.name})
      // itemDom = creatDom.call(this, { tag: 'select', on: params.on })
      // let optionData = params.options;
      // optionData.map((item) => {
      //   itemDom.appendChild(creatDom.call(this, { tag: 'option', child: item.label }))
      // })
    }
    if (params.type == 'radio-button') {
      itemDom = radioButton({
        name:params.name,
        options:params.options,
        on:params.on
      })
      // itemDom = creatDom.call(this, { tag: 'div', style: { margin: '5px' } })
      // let optionData = params.options;
      // optionData.map((item) => {
      //   itemDom.appendChild(creatDom.call(this, item))
      // })
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