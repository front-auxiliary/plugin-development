import {delUnit,colorHex} from '../../../utils'

let arr = [];
let activeDom = null;
let activeData = {};
let params = {};
let detailDom = null;
let imgDom = null;
let drawEdit  = null;
let imgDetail = {};
let imgDetailDom = null;
let model = null;
export default {
  id:0,
  setModel:(params)=>{
    model = params;
    return model;
  },
  getModel:()=>{
    return model;
  },
  setImgDetailDom:(dom)=>{
    imgDetailDom = dom;
    return imgDetailDom;
  },
  getImgDetailDom(){
    return imgDetailDom;
  },
  setDrawEdit:(draw)=>{
    drawEdit = draw;
    return drawEdit;
  },
  getDrawEdit:()=>{
    return drawEdit;
  },
  add:(item)=>{
      return arr.push(item)
  },
  
  getActiveData:()=>{
   
    const type = activeDom.dataset.elemtype;
    
    const detail = activeDom.getBoundingClientRect();
    const {
      left,top,height,width,
      fontSize,lineHeight,color,textAlign,
      fontWeight,fontStyle,textDecoration

    } =activeDom.style;
    
    if(type == 'text'){
      activeData= {
        text:activeDom.innerText,
        left:delUnit(left,params.unit),
        top:delUnit(top,params.unit),
        width:delUnit(width,params.unit),
        height:delUnit(height,params.unit),
        fontSize:delUnit(fontSize,params.unit),
        lineHeight:delUnit(lineHeight,params.unit),
        color:colorHex(color),
        textAlign:textAlign||'left',
        fontWeight:fontWeight||'normal',
        fontStyle:fontStyle||'normal',
        textDecoration:textDecoration||'none'
        
      }
      // console.log(activeData,"kkkkk")
      return Object.assign({},activeData);
    }
  },
  editorData:(id,item)=>{
    for(let i=0;i<arr.lengthl;i++){
      if(id == arr[i]){
        arr[i] = item;
        return arr;
      }
    }
    return arr;
  },
  setActive(dom){
    activeDom = dom 
    if(activeDom){
      this.getActiveData()
    }
   
  },
  getActive(){
    return activeDom
  },
  setParams(values){
    params = Object.assign({},values)
  },
  getParams(){

    return Object.assign({},params);
  },
  setDetail(dom){
    detailDom = dom;
    return detailDom;
  },
  getDetail(){
    return detailDom;
  },
  setImg(dom){
    imgDom = dom;
    return imgDom;
  },
  getImg(){
    return imgDom;
  },
  setForm(){
    let formArr = this.getActiveData()
    for (let key in formArr) {
      let itemName = detailDom.elements[key];

      if (!itemName) {
        continue;
      }
      if (!itemName.length) {

        if (key == 'fontStyle') {
          if (formArr[key] == 'italic') {
            itemName.checked = true
          } else {
            itemName.checked = false
          }
        }
        if (key == 'fontWeight') {
          if (formArr[key] == 'bold') {
            itemName.checked = true

          } else {
            itemName.checked = false
          }
        }
        if (key == 'textDecoration') {
          if (formArr[key] == 'underline') {
            itemName.checked = true
          } else {
            itemName.checked = false
          }
        }
        itemName.value = formArr[key]

      } else {

        for (let i = 0; i < itemName.length; i++) {
          let item = itemName[i];

          if (item.value == formArr[key]) {
            item.checked = true;
          } else {
            item.checked = false;
          }
        }
      }

    }
  },
  getImgDetail(){
    let elemtype = activeDom.dataset.elemtype;
    let {transform,width,height,top,left} = activeDom.style;
    let activeImg = activeDom.getElementsByTagName('img')[0]

    if(elemtype == 'img'){
      imgDetail.angle = transform.replace('rotate(', '').replace('deg)', '');
      imgDetail.width = delUnit(width,params.unit)
      imgDetail.height = delUnit(height,params.unit)
      imgDetail.top = delUnit(top,params.unit)
      imgDetail.left = delUnit(left,params.unit)
      imgDetail.src = activeImg.src;
    }
    return imgDetail;
  }


}