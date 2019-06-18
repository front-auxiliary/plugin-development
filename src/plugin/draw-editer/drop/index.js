import {setStle, setStyle} from '../../../utils';
class drop {
  constructor() {
    this.dropDom = null;
    this.angleIcon = null;
  }
  create(elem,canvas){
    const  dropDom = document.createElement('div');
    const dropStyle = Object.assign({
      display:'inline-block',
      position:'absolute',
      border:'1px solid #fff',
      cursor:'move',
    },elem.style);
    // dropDom.innerHTML = elem.name;
    dropDom.appendChild(this.createAngle(this));
    dropDom.id = elem.name;
    for(let key in dropStyle){
      dropDom.style[key] = dropStyle[key];
    }
    dropDom.onmousedown  = (event)=>{
      event.stopPropagation();
      this.onmousedown(event,dropDom,canvas)
    }
    canvas.onmouseup  = (event)=>{
      this.onmouseup(event,dropDom,canvas)
    }
    canvas.onmousemove  = (event)=>{
      this.onmousemove(event,dropDom,canvas)
    }
    return dropDom;
  }
  createAngle(that){
    // this = that;
    const angleIcon = document.createElement('img');
    angleIcon.src = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTYwODQ5OTkzNTAyIiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE5ODQiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMzIiIGhlaWdodD0iMzIiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTUxMS44NzIgODU5LjQ3NzMzM2MtMTg2LjExMiAwLTMzOC4zNDY2NjctMTU1LjY5MDY2Ny0zMzguMzQ2NjY3LTM0NS45ODQgMC0xNi4xMjggMTIuMzczMzMzLTI4Ljg0MjY2NyAyOC4xNi0yOC44NDI2NjYgMTUuNzg2NjY3IDAgMjguMjAyNjY3IDEyLjcxNDY2NyAyOC4yMDI2NjcgMjguODQyNjY2IDAgMTU5LjE0NjY2NyAxMjYuMzM2IDI4OC4zNDEzMzMgMjgyLjAyNjY2NyAyODguMzQxMzM0YTI3OC45MTIgMjc4LjkxMiAwIDAgMCAyMDYuMzc4NjY2LTkyLjI4OCAyNi44OCAyNi44OCAwIDAgMSAzOS40NjY2NjctMS4xNTJjMTEuMjY0IDExLjUyIDEyLjM3MzMzMyAyOC44NDI2NjcgMS4xMDkzMzMgNDAuMzYyNjY2YTMzMi45NzA2NjcgMzMyLjk3MDY2NyAwIDAgMS0yNDYuOTk3MzMzIDExMC43MnogbTMxMC4xODY2NjctMzE3LjE0MTMzM2EyOC4yNDUzMzMgMjguMjQ1MzMzIDAgMCAxLTI4LjIwMjY2Ny0yOC44NDI2NjdjMC0xNTkuMTQ2NjY3LTEyNi4yOTMzMzMtMjg4LjM0MTMzMy0yODEuOTg0LTI4OC4zNDEzMzNhMjc2LjA1MzMzMyAyNzYuMDUzMzMzIDAgMCAwLTIwNC4xNiA4OS45ODQgMjcuODE4NjY3IDI3LjgxODY2NyAwIDAgMS0zOS40NjY2NjcgMS4xNTIgMjkuMzk3MzMzIDI5LjM5NzMzMyAwIDAgMS0xLjEwOTMzMy00MC4zNjI2NjcgMzMxLjQzNDY2NyAzMzEuNDM0NjY3IDAgMCAxIDI0NS44ODgtMTA3LjI2NGMxODYuMDY5MzMzIDAgMzM4LjM0NjY2NyAxNTUuNjkwNjY3IDMzOC4zNDY2NjcgMzQ2LjAyNjY2N2EyOS43ODEzMzMgMjkuNzgxMzMzIDAgMCAxLTI5LjMxMiAyNy42NDh6IiBmaWxsPSIjNDI0QjU0IiBwLWlkPSIxOTg1Ij48L3BhdGg+PHBhdGggZD0iTTEwNi45NjUzMzMgNTEzLjQ5MzMzM2w5NC43Mi0xMjkuMTUyIDk0Ljc2MjY2NyAxMjkuMTUyaC0xODkuNDR6IG04MDkuODEzMzM0IDBsLTk0LjcyIDEyOS4xOTQ2NjctOTQuNzItMTI5LjE5NDY2N2gxODkuNDR6IiBmaWxsPSIjNDI0QjU0IiBwLWlkPSIxOTg2Ij48L3BhdGg+PC9zdmc+'
    angleIcon.style.position = 'absolute';
    angleIcon.style.width = '20px';
    angleIcon.style.top = '100%';
    angleIcon.style.marginLeft = '-10px';
    angleIcon.style.marginTop = '10px';
    angleIcon.style.left = '50%';
    angleIcon.style.background = '#fff';
    angleIcon.style.borderRadius = '50%';
    angleIcon.style.cursor = 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABpklEQVR4AWIYWmAUjAIAY+SAW0EARdH8X9u24rqrKDcxG6htLGXidAm1bdu2+U7y7Z+czOu79747mWp0aO2gAVd9to67fXx8dL69vXXZQrSO1dXVGGB24OvklmUJzd5/8lNVdcSU6enpcfY3NzcV4vECZnZoln723OKmaQGNATrRQFpa2pm81dn29naj/B1KEJhl14SGxzTDj1vctCwIsiwoKipae319PXt5eRm/vLysPz8/LwNmdmh4bBQE2SoI1heEh4c/yPOX2c3N7VtRlLn+/v6xg4ODOWBmh4YHLxmTgmB7BXyWc3mzczm0npWVdUjIEXjwkiHrqCAIEePCwkLX0tJSz9fX1/XW1tZSW1vbdEFBwX50dPQtMLNDw4OXDFn7n0hXsLa21iJzvBCXk5OTMT09XXFxcdEr/9BNOXYDzOzQ8OAlI9lWRwX+R0dHtfKMFAIFP50xXIgREoVkYGaHhgcvGbJyo45blgVawUsn+AoeOoO7bs8OLRBMfGh48JLR+/7HjpIPYFkfphhHscCMhjGLD4SjmLAWF3BMPkCYMWjAKAAAxlBp/QKMhJEAAAAASUVORK5CYII=) 4 12, auto'
    angleIcon.onmousedown = function(){
      that.angleMousedown(event,angleIcon)
    }
   
    return angleIcon;
  }
  onmousedown(evt,dom,canvas){
    let domDetail = dom.getBoundingClientRect(),
    mousePageX = evt.pageX,
    mousePageY = evt.pageY;
    dom.dataset.monusedown = 1;
    dom.dataset.mouseleft = mousePageX - domDetail.x;
    dom.dataset.mousetop = mousePageY - domDetail.y;
    this.dropDom = dom;
  }
  angleMousedown(evt,angleIcon){
    this.angleIcon = angleIcon;
    const parentNode = this.angleIcon.parentNode;
    const parentNodeDetail = parentNode.getBoundingClientRect();
    let centerPage = {
      x:parentNodeDetail.x+parentNodeDetail.width/2,
      y:parentNodeDetail.y+parentNodeDetail.height/2,
    }
    console.log(this.getAngle(centerPage,{x:evt.pageX,y:evt.pageY}))
    evt.stopPropagation();
  }
  getAngle(start,end){
    var diffX = end.x - start.x,
        diffY = end.y - start.y;
    //返回角度,不是弧度
    return 360*Math.atan(diffY/diffX)/(2*Math.PI);
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
  deleteDrop(){

  }

}
export default new drop();