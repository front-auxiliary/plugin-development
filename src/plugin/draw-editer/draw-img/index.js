import { creatDom } from '../../../utils';
import data from './data';
class drawImg {
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
    let titleDom = null;
    // let formDom = 
    let itemDom = null;
    if(params.type == 'img'){
       titleDom = creatDom.call(this, { tag: 'div', child: params.title,style:{'lineHeight':'60px',paddingLeft:'34px'} })
       itemDom = creatDom.call(this, { tag: 'img',attr:{src:params.img}, on: params.on,style:{width:'50%',height:'100px',float:'left'}});
    }else{
      titleDom =creatDom.call(this, {tag:'span'});
      itemDom = creatDom.call(this, { tag: 'span',style:{display:'inline-block',width:'49%',height:'35px',float:'right',border:'1px solid #eee',margin:'5px 0 10px 0'}, on: params.on,child:params.title});
    }
    domBox.appendChild(titleDom);
    domBox.appendChild(itemDom)
    return domBox;

  }
}

export default drawImg;