import {setStle, setStyle} from '../../../utils';
export default class slicer {
  constructor() {
    this.dropDom = null;
    this.angleIcon = null;
  }

  onmouseup(evt,dom){
    if(this.dropDom){
      this.dropDom.dataset.monusedown = 0;
    }
  }
  onmousemove(evt,dom,canvas){
    if(!this.dropDom){
      return ;
    }
    let monusedown = this.dropDom.dataset.monusedown;
   
    if(monusedown==='1'){
      
      let canvasDetail = canvas.getBoundingClientRect(),
      monuseFromDomTop =  +this.dropDom.dataset.mousetop,
      monuseFromDomLeft = +this.dropDom.dataset.mouseleft,
      
      mousePageX = evt.pageX,
      mousePageY = evt.pageY;
      // console.log(mousePageX - canvasDetail.left - monuseFromDomLeft)
      this.dropDom.style.left = mousePageX - canvasDetail.left-monuseFromDomLeft  +'px';
      this.dropDom.style.top = mousePageY - canvasDetail.top-monuseFromDomTop +'px';
    }
  }
}