import { setStyle } from '../../../utils';
class drop {
  constructor() {
    this.dropDom = null;
    this.angleIcon = null;
    this.canvas = null;
    this.leftTopIcon = null;
    this.rightTopIcon = null;
    this.rightBottomIcon = null;
    this.leftBottomIcon = null;
    this.elemClick = null;
    this.canvasDetail = null;
  }
  init(canvas, params) {
    this.canvas = canvas;
    this.canvasDetail = this.canvas.getBoundingClientRect();
    // console.log(this.canvasDetail)
    this.elemClick = params.elemClick;
    document.onmouseup = (event) => {
      this.onmouseup(event, this.canvas)
    }
    document.onmousemove = (event) => {
      this.onmousemove(event, this.canvas)
    }
  }

  create(elem, canvas) {
    const dropDom = document.createElement('div');
    const zoomDoms = this.createZoom();
    const angleDom = this.createAngle();
    const sizes = this.createSize();
    const childs = [angleDom, ...sizes, ...zoomDoms]
    const dropStyle = Object.assign({
      display: 'inline-block',
      position: 'absolute',
      border: '1px solid #fff',
      cursor: 'move',
      transformOrigin: 'center',
      transform: 'rotate(0deg)'
    }, elem.style);
    dropDom.innerText = elem.text;
    dropDom.className = 'box';
    // 添加旋转图标
    dropDom.appendChild(angleDom);
    // 添加缩放图标
    for (let key in childs) {
      dropDom.appendChild(childs[key])
    }
    setStyle(dropDom, dropStyle)

    dropDom.id = elem.name;

    dropDom.onmousedown = (event) => {
      event.stopPropagation();
      this.onmousedown(event, dropDom, canvas)
      if (this.elemClick) {
        this.elemClick(event)
      }


    }
    return dropDom;
  }

  // 生成
  createZoom() {
    // let zoomDoms = [];
    const style = {
      position: 'absolute',
      backgroundColor: '#FFF',
      width: '10px',
      height: '10px',
      borderRadius: '50%',
      boxShadow: '0 0 5px 1px rgba(14,19,24,.15), 0 0 0 1px rgba(14,19,24,.15)',
    }
    const cursorIcon = 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAAXNSR0IArs4c6QAAAOpQTFRFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8PDwAAAAAAAA4uLiAAAA3Nzc3d3dxMTExcXFp6enra2tlZWVjIyMjo6OfHx86Ojo6Ojo0dHRyMjIx8fHwcHB/v7+/f39+vr6/f39/Pz8/Pz8+fn5/Pz8+vr6+vr6/f39////7e3t/v7+7Ozs/v7+////////6Ojo6enpAAAAAwMDBAQEBQUFBgYGBwcHDQ0NKysrLCwsMDAwYGBgYWFhYmJiampqa2trbGxsRsyhyQAAAD50Uk5TAAECAwQFBggKCw0ODxESFxgZGhwhISIjIyQkJissMTI6PD1GWVpjb3F03t/i4+Tl5+nq7PP4+vr7+/v8/f0FqgrYAAAA4ElEQVQoz73Ry0LCMBAF0M6kpQ0pioDyVgEFAVHepQViQEF5/f/vGKIUChtW3O3Z3LmjaZcJABIVBAiC0fNUaqkgIB1+CiHWbw8mBoTYww/Ol+1CJITaKXwPypTACfzMpDzpW4BDWHVGUvpSAG/9bhKapeq/kGzN8IG9FmPxFyXPuYZn7SqgdR+h4WhlK4PWxmPEP9AMEZ1eK1kK1yb7SeQYOo1WxnPOJ3v4awh6+LGz4HzqHIBCkn/fiMn06xgwU3dd13GcLgsAoHkVv0um04kbikfjW8yWYdSA8951bn4B+/Ud1D7TL4MAAAAASUVORK5CYII=) 8 12, auto'
    const flipCursorIcon = 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAAXNSR0IArs4c6QAAAOdQTFRFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8PDwAAAAAAAA4uLiAAAA3Nzc3d3dxMTExcXFp6enra2tlZWVjo6OfHx86Ojo6Ojo0dHRyMjIx8fHwcHB/v7+/f39+vr6/f39+/v7/Pz8+fn5/Pz8+vr6+vr6/f39////7Ozs7e3t/v7+7Ozs/v7+////////6Ojo6enpAAAAAwMDBAQEBQUFBgYGBwcHDQ0NKysrLCwsMDAwYGBgYWFhYmJiampqa2trbGxsSXP2QwAAAD10Uk5TAAECAwQFBggKCw0ODxESFxgZGhwhIiMjJCQmKywxMjo9RllaY29xdN7f4uPk5efp6+z0+Pr6+vv7+/z9/fVNPNwAAADnSURBVCjPvZHZWsIwFIQ5OSltSFEWQVZZy6agbKUFSlBxAXz/5zEFKoQrvGEu5/8y32ROKHRNARDciQCo4L7l7jTUFABEf3jaCiHepowoL0g4Wn5Ze95iaqIahaw++TwDfijQqvRXXycA4E42odWx9Gf9zQnQWjk8+M1K7wiI4T7mayPfbyQT5Q4PAHJ3++znz6xYhEWLRlAXTUespT+3bhnFsP73QQmWnvcxt2KMymGOk+zBd78UoXDoHgD7/XUpfroFVOdDPrBt23GcdvZsJRZPZTLpVPJGJ+qwGuOmFDc0uOxE/9MvTK0dPSS3AqMAAAAASUVORK5CYII=) 8 12, auto'
    const leftTopIcon = document.createElement('div');
    const rightTopIcon = document.createElement('div');
    const rightBottomIcon = document.createElement('div');
    const leftBottomIcon = document.createElement('div');
    const leftTopIconStyle = Object.assign({}, style, { top: '-5px', left: '-5px', cursor: cursorIcon })
    const rightTopIconStyle = Object.assign({}, style, { top: '-5px', left: '100%', marginLeft: '-5px', cursor: flipCursorIcon })
    const rightBottomIconStyle = Object.assign({}, style, { top: '100%', left: '100%', marginLeft: '-5px', marginTop: '-5px', cursor: cursorIcon })
    const leftBottomIconStyle = Object.assign({}, style, { top: '100%', left: '-5px', marginTop: '-5px', cursor: flipCursorIcon })
    setStyle(leftTopIcon, leftTopIconStyle);
    setStyle(rightTopIcon, rightTopIconStyle);
    setStyle(rightBottomIcon, rightBottomIconStyle);
    setStyle(leftBottomIcon, leftBottomIconStyle);

    leftTopIcon.onmousedown = (evt) => {
      this.leftTopIcon = leftTopIcon;
      this.leftTopIcon.dataset.monusedown = 1;
      const parentNode = this.leftTopIcon.parentNode;
      const parentNodeDetail = parentNode.getBoundingClientRect();
      this.leftTopIcon.dataset.parentdetail = JSON.stringify(parentNodeDetail);
      // console.log( JSON.stringify(parentNodeDetail),"kkkkkk")
      evt.stopPropagation()
    }
    rightTopIcon.onmousedown = (evt) => {
      this.rightTopIcon = rightTopIcon;
      const parentNode = this.rightTopIcon.parentNode;
      const parentNodeDetail = parentNode.getBoundingClientRect();
      this.rightTopIcon.dataset.monusedown = 1;
      this.rightTopIcon.dataset.parentdetail = JSON.stringify(parentNodeDetail);

      evt.stopPropagation()
    }
    rightBottomIcon.onmousedown = (evt) => {
      this.rightBottomIcon = rightBottomIcon;
      const parentNode = this.rightBottomIcon.parentNode;
      const parentNodeDetail = parentNode.getBoundingClientRect();
      parentNodeDetail.height = parentNode.style.height.replace('px','')
      parentNodeDetail.width = parentNode.style.width.replace('px','')
      // console.log(parentNodeDetail.height,'------',parentNode.style.height)
      this.rightBottomIcon.dataset.monusedown = 1;
      this.rightBottomIcon.dataset.parentdetail = JSON.stringify(parentNodeDetail);
      evt.stopPropagation()
    }
    leftBottomIcon.onmousedown = (evt) => {
      this.leftBottomIcon = leftBottomIcon;
      const parentNode = this.leftBottomIcon.parentNode;
      const parentNodeDetail = parentNode.getBoundingClientRect();
      this.leftBottomIcon.dataset.monusedown = 1;
      this.leftBottomIcon.dataset.parentdetail = JSON.stringify(parentNodeDetail);
      evt.stopPropagation()
    }
    return [leftTopIcon, rightTopIcon, rightBottomIcon, leftBottomIcon]

  }
  // 修改大小图标
  createSize() {

    const style = {
      position: 'absolute',
      backgroundColor: '#fff',
      boxShadow: '0 0 5px 1px rgba(14,19,24,.15), 0 0 0 1px rgba(14,19,24,.15)',
      borderRadius: '5px'
    }
    const topIcon = document.createElement('div');
    const rightIcon = document.createElement('div');
    const bottomIcon = document.createElement('div');
    const leftIcon = document.createElement('div');
    const topIconStyle = Object.assign({}, style, {
      width: '16px',
      height: '5px',
      top: '-3px',
      left: '50%',
      marginLeft: '-8px'
    })
    const rightIconStyle = Object.assign({}, style, {
      width: '5px',
      height: '16px',
      top: '50%',
      left: '100%',
      marginLeft: '-2px',
      marginTop: '-8px'
    })
    const bottomIconStyle = Object.assign({}, style, {
      width: '16px',
      height: '5px',
      top: '100%',
      left: '50%',
      marginLeft: '-8px',
      marginTop: '-2px'
    })
    const leftIconStyle = Object.assign({}, style, {
      width: '5px',
      height: '16px',
      top: '50%',
      left: '0%',
      marginLeft: '-3px',
      marginTop: '-8px'
    })
    setStyle(topIcon, topIconStyle);
    setStyle(rightIcon, rightIconStyle);
    setStyle(bottomIcon, bottomIconStyle);
    setStyle(leftIcon, leftIconStyle);
    return [topIcon, rightIcon, bottomIcon, leftIcon]
  }
  // 生成旋转icon
  createAngle() {
    const angleIcon = document.createElement('div');
    const style = {
      position: 'absolute',
      backgroundImage: 'url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTYwODQ5OTkzNTAyIiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE5ODQiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMzIiIGhlaWdodD0iMzIiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTUxMS44NzIgODU5LjQ3NzMzM2MtMTg2LjExMiAwLTMzOC4zNDY2NjctMTU1LjY5MDY2Ny0zMzguMzQ2NjY3LTM0NS45ODQgMC0xNi4xMjggMTIuMzczMzMzLTI4Ljg0MjY2NyAyOC4xNi0yOC44NDI2NjYgMTUuNzg2NjY3IDAgMjguMjAyNjY3IDEyLjcxNDY2NyAyOC4yMDI2NjcgMjguODQyNjY2IDAgMTU5LjE0NjY2NyAxMjYuMzM2IDI4OC4zNDEzMzMgMjgyLjAyNjY2NyAyODguMzQxMzM0YTI3OC45MTIgMjc4LjkxMiAwIDAgMCAyMDYuMzc4NjY2LTkyLjI4OCAyNi44OCAyNi44OCAwIDAgMSAzOS40NjY2NjctMS4xNTJjMTEuMjY0IDExLjUyIDEyLjM3MzMzMyAyOC44NDI2NjcgMS4xMDkzMzMgNDAuMzYyNjY2YTMzMi45NzA2NjcgMzMyLjk3MDY2NyAwIDAgMS0yNDYuOTk3MzMzIDExMC43MnogbTMxMC4xODY2NjctMzE3LjE0MTMzM2EyOC4yNDUzMzMgMjguMjQ1MzMzIDAgMCAxLTI4LjIwMjY2Ny0yOC44NDI2NjdjMC0xNTkuMTQ2NjY3LTEyNi4yOTMzMzMtMjg4LjM0MTMzMy0yODEuOTg0LTI4OC4zNDEzMzNhMjc2LjA1MzMzMyAyNzYuMDUzMzMzIDAgMCAwLTIwNC4xNiA4OS45ODQgMjcuODE4NjY3IDI3LjgxODY2NyAwIDAgMS0zOS40NjY2NjcgMS4xNTIgMjkuMzk3MzMzIDI5LjM5NzMzMyAwIDAgMS0xLjEwOTMzMy00MC4zNjI2NjcgMzMxLjQzNDY2NyAzMzEuNDM0NjY3IDAgMCAxIDI0NS44ODgtMTA3LjI2NGMxODYuMDY5MzMzIDAgMzM4LjM0NjY2NyAxNTUuNjkwNjY3IDMzOC4zNDY2NjcgMzQ2LjAyNjY2N2EyOS43ODEzMzMgMjkuNzgxMzMzIDAgMCAxLTI5LjMxMiAyNy42NDh6IiBmaWxsPSIjNDI0QjU0IiBwLWlkPSIxOTg1Ij48L3BhdGg+PHBhdGggZD0iTTEwNi45NjUzMzMgNTEzLjQ5MzMzM2w5NC43Mi0xMjkuMTUyIDk0Ljc2MjY2NyAxMjkuMTUyaC0xODkuNDR6IG04MDkuODEzMzM0IDBsLTk0LjcyIDEyOS4xOTQ2NjctOTQuNzItMTI5LjE5NDY2N2gxODkuNDR6IiBmaWxsPSIjNDI0QjU0IiBwLWlkPSIxOTg2Ij48L3BhdGg+PC9zdmc+)',
      backgroundSize: '100%',
      backgroundColor: '#fff',
      width: '20px',
      height: '20px',
      top: '100%',
      left: '50%',
      marginLeft: '-10px',
      marginTop: '10px',
      borderRadius: '50%',
      boxShadow: '0 0 5px 1px rgba(14,19,24,.15), 0 0 0 1px rgba(14,19,24,.15)',
      cursor: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABpklEQVR4AWIYWmAUjAIAY+SAW0EARdH8X9u24rqrKDcxG6htLGXidAm1bdu2+U7y7Z+czOu79747mWp0aO2gAVd9to67fXx8dL69vXXZQrSO1dXVGGB24OvklmUJzd5/8lNVdcSU6enpcfY3NzcV4vECZnZoln723OKmaQGNATrRQFpa2pm81dn29naj/B1KEJhl14SGxzTDj1vctCwIsiwoKipae319PXt5eRm/vLysPz8/LwNmdmh4bBQE2SoI1heEh4c/yPOX2c3N7VtRlLn+/v6xg4ODOWBmh4YHLxmTgmB7BXyWc3mzczm0npWVdUjIEXjwkiHrqCAIEePCwkLX0tJSz9fX1/XW1tZSW1vbdEFBwX50dPQtMLNDw4OXDFn7n0hXsLa21iJzvBCXk5OTMT09XXFxcdEr/9BNOXYDzOzQ8OAlI9lWRwX+R0dHtfKMFAIFP50xXIgREoVkYGaHhgcvGbJyo45blgVawUsn+AoeOoO7bs8OLRBMfGh48JLR+/7HjpIPYFkfphhHscCMhjGLD4SjmLAWF3BMPkCYMWjAKAAAxlBp/QKMhJEAAAAASUVORK5CYII=) 4 12, auto'
    }
    setStyle(angleIcon, style)
    angleIcon.onmousedown = (evt) => {
      this.angleIcon = angleIcon;
      this.angleIcon.dataset.monusedown = 1;
      evt.stopPropagation();
    }
    return angleIcon;
  }
  onmousedown(evt, dom, canvas) {
    let domDetail = dom.getBoundingClientRect(),
      mousePageX = evt.pageX,
      mousePageY = evt.pageY;
    dom.dataset.monusedown = 1;
    let top = dom.style.top.replace('px', '');
    let left = dom.style.left.replace('px', '');
    dom.dataset.mouseleft = mousePageX - left - this.canvasDetail.left;
    dom.dataset.mousetop = mousePageY - top - this.canvasDetail.top;
    this.dropDom = dom;
  }
  // 获取角度
  getAngle(start, end) {
    var diffX = end.x - start.x,
      diffY = end.y - start.y;
    //返回角度,不是弧度
    return 360 * Math.atan2(diffY, diffX) / (2 * Math.PI) - 90;
  }
  onmouseup(evt) {
    if (this.dropDom) {
      this.dropDom.dataset.monusedown = 0;
    }
    if (this.angleIcon) {
      this.angleIcon.dataset.monusedown = 0;
    }
    if (this.leftTopIcon) {
      this.leftTopIcon.dataset.monusedown = 0;
    }
    if (this.rightTopIcon) {
      this.rightTopIcon.dataset.monusedown = 0;
    }
    if (this.rightBottomIcon) {
      this.rightBottomIcon.dataset.monusedown = 0;
    }
    if (this.leftBottomIcon) {
      this.leftBottomIcon.dataset.monusedown = 0;
    }
    this.dropDom = null;
    this.angleIcon = null;
    this.leftTopIcon = null;
    this.rightTopIcon = null;
    this.rightBottomIcon = null;
    this.leftBottomIcon = null;

  }
  onmousemove(evt) {
    let monusedown = null,
      angleMonusedown = null,
      leftTopDown = null,
      rigthTopDown = null,
      rightBottomDown = null,
      leftBottomDown = null,
      activeElem = null,
      x = 0,
      y = 0,
      width = 0,
      height = 0,
      angle = 0,
      isAngle= true,
      canvasDetail = this.canvasDetail;
    if (this.dropDom) {
      activeElem = this.dropDom;
      monusedown = this.dropDom.dataset.monusedown;
    }
    if (this.angleIcon) {
      activeElem = this.angleIcon.parentNode;
      angleMonusedown = this.angleIcon.dataset.monusedown;
    }
    if (this.leftTopIcon) {
      activeElem = this.leftTopIcon.parentNode;
      leftTopDown = this.leftTopIcon.dataset.monusedown;
    }
    if (this.rightTopIcon) {
      activeElem = this.rightTopIcon.parentNode;
      rigthTopDown = this.rightTopIcon.dataset.monusedown;
    }
    if (this.rightBottomIcon) {
      activeElem = this.rightBottomIcon.parentNode;
      rightBottomDown = this.rightBottomIcon.dataset.monusedown;
    }
    if (this.leftBottomIcon) {
      activeElem = this.leftBottomIcon.parentNode;
      leftBottomDown = this.leftBottomIcon.dataset.monusedown;
    }
    if (activeElem) {
      let transform = activeElem.style.transform;
      let transforms = transform.split(' ')
      if (transform) {
        width = activeElem.style.width;
        height = activeElem.style.height;
        // x = transforms[0].replace('translateX(', '').replace('px)', '');
        // y = transforms[1].replace('translateY(', '').replace('px)', '');
        angle = transform.replace('rotate(', '').replace('deg)', '');
      }
    }
    if (monusedown === '1') {
      let monuseFromDomTop = +activeElem.dataset.mousetop,
        monuseFromDomLeft = +activeElem.dataset.mouseleft,
        mousePageX = evt.pageX,
        mousePageY = evt.pageY;
      x = mousePageX - canvasDetail.left - monuseFromDomLeft
      y = mousePageY - canvasDetail.top - monuseFromDomTop
    }
    if (angleMonusedown === '1') {
      const parentNodeDetail = activeElem.getBoundingClientRect();
      const centerPage = {
        x: parentNodeDetail.x + parentNodeDetail.width / 2,
        y: parentNodeDetail.y + parentNodeDetail.height / 2,
      }
      angle = this.getAngle(centerPage, { x: evt.pageX, y: evt.pageY });
    }
    if (leftTopDown === '1') {
      activeElem = this.leftTopIcon.parentNode;
      
      const parentNodeDetail = JSON.parse(this.leftTopIcon.dataset.parentdetail);
      let distanceX = parentNodeDetail.x - evt.pageX;
      let distanceY = parentNodeDetail.y - evt.pageY;
      if (distanceX > distanceY) {
        distanceY = distanceX * parentNodeDetail.height / parentNodeDetail.width
      } else {
        distanceX = distanceY * parentNodeDetail.width / parentNodeDetail.height
      }
      width = distanceX + parentNodeDetail.width + 'px';
      height = distanceY + parentNodeDetail.height + 'px'
      x = parentNodeDetail.x - distanceX - canvasDetail.x;
      y = parentNodeDetail.y - distanceY - canvasDetail.y;
    }
    if (rigthTopDown === '1') {
      activeElem = this.rightTopIcon.parentNode;
      const parentNodeDetail = JSON.parse(this.rightTopIcon.dataset.parentdetail);
      let distanceX = evt.pageX - parentNodeDetail.right;
      let distanceY = parentNodeDetail.y - evt.pageY;
      if (distanceX > distanceY) {
        distanceY = distanceX * parentNodeDetail.height / parentNodeDetail.width
      } else {
        distanceX = distanceY * parentNodeDetail.width / parentNodeDetail.height
      }
      width = distanceX + parentNodeDetail.width + 'px';
      height = distanceY + parentNodeDetail.height + 'px'
      y = parentNodeDetail.y - distanceY - canvasDetail.y;
    }
    if (rightBottomDown == '1') {
      // console.log(angle,"jjjj")

      activeElem = this.rightBottomIcon.parentNode;
      const parentNodeDetail = JSON.parse(this.rightBottomIcon.dataset.parentdetail);
      let distanceX = evt.pageX - parentNodeDetail.right;
      let distanceY = evt.pageY - parentNodeDetail.bottom;
      // if (distanceX > distanceY) {
      //   distanceY = distanceX * parentNodeDetail.height / parentNodeDetail.width;
      // } else {
      //   distanceX = distanceY * parentNodeDetail.width / parentNodeDetail.height;
      // }
      let aa = Math.abs(Math.cos(angle))
      console.log(aa,"mmmm")
      // isAngle
      // console.log(Math.cos(angle))
      activeElem.style.transformOrigin = 'left top';
      width = distanceX * aa + parentNodeDetail.width  + 'px';
      height = distanceY *aa + parentNodeDetail.height  + 'px'
    }
    if (leftBottomDown == '1') {
      activeElem = this.leftBottomIcon.parentNode;
      const parentNodeDetail = JSON.parse(this.leftBottomIcon.dataset.parentdetail);
      let distanceX = parentNodeDetail.left - evt.pageX;
      let distanceY = evt.pageY - parentNodeDetail.bottom;
      if (distanceX > distanceY) {
        distanceY = distanceX * parentNodeDetail.height / parentNodeDetail.width;
      } else {
        distanceX = distanceY * parentNodeDetail.width / parentNodeDetail.height;
      }
      width = distanceX + parentNodeDetail.width + 'px';
      height = distanceY + parentNodeDetail.height + 'px'
      x = parentNodeDetail.x - distanceX - canvasDetail.x;
    }
    if (activeElem) {
      activeElem.style.transform = `rotate(${angle}deg) `;
      if(y){
        activeElem.style.top = y + 'px';
        activeElem.style.left = x + 'px'
      }
      
      activeElem.style.width = width;
      activeElem.style.height = height;
    }
  }
  deleteDrop() {

  }

}
export default new drop();