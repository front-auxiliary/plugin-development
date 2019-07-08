import { setStyle, creatDom } from '../../../utils';
import iconData from './icon';
import drawData from '../draw-data';
class drop {
  constructor() {
    this.canvas = null;
    // this.elemClick = null;
    this.unit = null;
    this.canvasDetail = null;
    this.activeDom = null;
    this.type == 'text';
    this.isAngleClick = false;
    this.activeElemClick = null
  }
  init(canvas, params, unit, activeElemClick) {
    this.canvas = canvas;
    this.unit = unit;
    this.canvasDetail = this.canvas.getBoundingClientRect();
    // console.log(this.canvasDetail)
    this.elemClick = params.canvas.on.elemClick;
    this.activeElemClick = activeElemClick;
    document.onmouseup = (event) => {
      this.onmouseup(event, this.canvas)
    }
    document.onmousemove = (event) => {
      this.onmousemove(event, this.canvas)
    }
    this.canvas.onmousedown = ()=>{
      drawData.getDetail().style.display = 'none'
    }
  }
  styleFramt(style, elem) {
    let judgeStr = 'width,height,left,top,fontSize,lineHeight';
    let newStyle = {};
    for (let key in style) {

      if (key == 'angle' && style[key]) {
        newStyle.transform = `rotate(${style[key]}deg)`
      } else if ((key == 'width' || key == 'height')) {
        if (key == 'width') {
          newStyle.minWidth = style.width + this.unit;
        }
        if (key == 'height') {
          newStyle.minHeight = style.height + this.unit;
        }
      } else if (judgeStr.indexOf(key) != -1) {
        newStyle[key] = style[key] + this.unit;
      } else {
        newStyle[key] = style[key]
      }
    }
    return Object.assign({}, newStyle);
  }
  creatImg(elem, dropDom) {
    let dom = creatDom({
      tag: 'div',
      style: {
        backgroundImage: `url(${elem.src})`,
        width: '100%',
        height: '100%',
        display: 'block'
      },
    })
    let img = creatDom({
      tag: 'img',
      attr: { src: elem.src },
      style: {
        height: '100%',
        width: '100%',
        display: 'block',
        userSelect: 'none',
        // pointerEvents:'none'
      },
      on: {
        load: (event) => {
          dropDom.style.height = img.height + this.unit;
          dropDom.style.width = img.width + this.unit;
          // console.log(img.width,"kkk")
        }
      }
    })
    return img
  }
  create(elem, canvas) {
    let that = this;
    const dropDom = creatDom.call(this, {
      tag: 'div',
      style: Object.assign({
        display: 'inline-block',
        position: 'absolute',
        border: '1px solid #fff',
        cursor: 'move',
        transformOrigin: 'center',
        transform: 'rotate(0deg)',
        boxSizing: 'border-box',
        // writingMode:'vertical-rl'
      }, this.styleFramt(elem.style, elem)),
      child: elem.text || '',
      attr: {
        id: elem.name,
        tabindex: elem.id,
        class: 'draw-editor-elem'
      },
      data: {

      },
      on: {
        mousedown: (event) => {
          event.stopPropagation();
          this.onmousedown(event, dropDom, this.canvas)
          console.log('-----')
          drawData.setActive(dropDom);
          drawData.setForm();
          if (this.elemClick) {
            this.elemClick(dropDom)
            console.log('-----22')
            this.activeElemClick(dropDom)
          }
        },
        blur: () => {
          // console.log(that.isAngleClick)
          // if(that.isAngleClick){
          //   return ;
          // }
          let zoomArr = dropDom.querySelectorAll('.zoom')
          dropDom.style.borderWidth = 0;
          for (let i = 0; i < zoomArr.length; i++) {
            zoomArr[i].style.display = 'none'
          }

          // console.log("kkkk1111")
        },
        focus: () => {
          let elemType = dropDom.dataset.elemtype;
          // console.log(elemType,"jjjjjj")
          let zoomArr = dropDom.querySelectorAll('.zoom')
          for (let i = 0; i < zoomArr.length; i++) {
            zoomArr[i].style.display = 'block'
          }
        }


      }
    })

    // const dropDom = document.createElement('div');
    const zoomDoms = this.createZoom();
    const angleDom = this.createAngle();
    const sizes = this.createSize();

    let childs = [angleDom, ...zoomDoms]
    if (elem.type == 'img') {
      childs = [...childs, ...sizes]
    }
    dropDom.dataset.elemtype = elem.type;
    // dropDom.innerText = elem.text;
    // 添加旋转图标
    dropDom.appendChild(angleDom);
    // dropDom.appendChild("<h1>8888</h1>")
    // 添加缩放图标
    for (let key in childs) {
      dropDom.appendChild(childs[key])
    }
    // setStyle(dropDom, dropStyle)
    // dropDom.id = elem.name;
    // dropDom.onmousedown = (event) => {
    //   event.stopPropagation();
    //   this.onmousedown(event, dropDom, canvas)
    //   console.log(this,"kkkkk")
    //   if (this.elemClick) {
    //     this.elemClick(event)
    //   }
    // }
    if (elem.type == 'img') {

      dropDom.appendChild(this.creatImg(elem, dropDom))
      dropDom.appendChild(creatDom({ tag: 'div', style: { position: 'absolute', top: '0px', left: '0px', right: '0px', bottom: '0px' } }))
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
      zIndex: 10,
      boxShadow: '0 0 5px 1px rgba(14,19,24,.15), 0 0 0 1px rgba(14,19,24,.15)',
    }
    const { tilt, reverseTilt } = iconData;
    const leftTopIcon = document.createElement('div');
    const rightTopIcon = document.createElement('div');
    const rightBottomIcon = document.createElement('div');
    const leftBottomIcon = document.createElement('div');
    const leftTopIconStyle = Object.assign({}, style, { top: '-5px', left: '-5px', cursor: `url(${tilt}) 8 12, auto` })
    const rightTopIconStyle = Object.assign({}, style, { top: '-5px', left: '100%', marginLeft: '-5px', cursor: `url(${reverseTilt}) 8 12, auto` })
    const rightBottomIconStyle = Object.assign({}, style, { top: '100%', left: '100%', marginLeft: '-5px', marginTop: '-5px', cursor: `url(${tilt}) 8 12, auto` })
    const leftBottomIconStyle = Object.assign({}, style, { top: '100%', left: '-5px', marginTop: '-5px', cursor: `url(${reverseTilt}) 8 12, auto` })
    leftTopIcon.className = 'zoom'
    rightBottomIcon.className = 'zoom'
    leftBottomIcon.className = 'zoom'
    rightTopIcon.className = 'zoom'
    setStyle(leftTopIcon, leftTopIconStyle);
    setStyle(rightTopIcon, rightTopIconStyle);
    setStyle(rightBottomIcon, rightBottomIconStyle);
    setStyle(leftBottomIcon, leftBottomIconStyle);

    leftTopIcon.onmousedown = (evt) => {
      this.activeDom = leftTopIcon;
      this.domSetTag(evt, 'leftTop')

    }
    rightTopIcon.onmousedown = (evt) => {
      this.activeDom = rightTopIcon;
      this.domSetTag(evt, 'rightTop')
    }
    rightBottomIcon.onmousedown = (evt) => {
      this.activeDom = rightBottomIcon;
      this.domSetTag(evt, 'rightBottom')
    }
    leftBottomIcon.onmousedown = (evt) => {
      this.activeDom = leftBottomIcon;
      this.domSetTag(evt, 'leftBottom')
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
    const { vertical, level } = iconData;
    const topIcon = document.createElement('div');
    const rightIcon = document.createElement('div');
    const bottomIcon = document.createElement('div');
    const leftIcon = document.createElement('div');

    const topIconStyle = Object.assign({}, style, { width: '16px', height: '5px', top: '-3px', left: '50%', marginLeft: '-8px', cursor: `url(${vertical}) 8 12, auto` })
    const rightIconStyle = Object.assign({}, style, { width: '5px', height: '16px', top: '50%', left: '100%', marginLeft: '-2px', marginTop: '-8px', cursor: `url(${level}) 8 12, auto` })
    const bottomIconStyle = Object.assign({}, style, { width: '16px', height: '5px', top: '100%', left: '50%', marginLeft: '-8px', marginTop: '-2px', cursor: `url(${vertical}) 8 12, auto` })
    const leftIconStyle = Object.assign({}, style, { width: '5px', height: '16px', top: '50%', left: '0%', marginLeft: '-3px', marginTop: '-8px', cursor: `url(${level}) 8 12, auto` })
    topIcon.className = 'zoom'
    rightIcon.className = 'zoom'
    bottomIcon.className = 'zoom'
    leftIcon.className = 'zoom'

    setStyle(topIcon, topIconStyle);
    setStyle(rightIcon, rightIconStyle);
    setStyle(bottomIcon, bottomIconStyle);
    setStyle(leftIcon, leftIconStyle);
    topIcon.onmousedown = (evt) => {
      this.activeDom = topIcon;
      this.domSetTag(evt, 'top')
    }
    rightIcon.onmousedown = (evt) => {
      this.activeDom = rightIcon;
      this.domSetTag(evt, 'right')
    }
    bottomIcon.onmousedown = (evt) => {
      this.activeDom = bottomIcon;
      this.domSetTag(evt, 'bottom')
    }
    leftIcon.onmousedown = (evt) => {
      this.activeDom = leftIcon;
      this.domSetTag(evt, 'left')
    }
    return [topIcon, rightIcon, bottomIcon, leftIcon]
  }
  // 生成旋转icon
  createAngle() {
    const angleIcon = document.createElement('div');
    const { angle, angleCursor } = iconData;
    const style = {
      position: 'absolute',
      backgroundImage: `url(${angle})`,
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
      cursor: `url(${angleCursor}) 4 12, auto`
    }
    angleIcon.className = 'zoom'
    // angleIcon. = 10;
    angleIcon.tabIndex = 1;
    setStyle(angleIcon, style)
    angleIcon.onblur = () => {
      this.isAngleClick = false;
    }
    angleIcon.onmousedown = (evt) => {
      this.activeDom = angleIcon;
      this.isAngleClick = true;
      // console.log("kkkk222")
      this.domSetTag(evt, 'angle')
    }
    return angleIcon;
  }
  onmousedown(evt, dom) {
    this.activeDom = dom;
    this.domSetTag(evt, 'elem')
  }
  // 获取角度
  getAngle(start, end) {
    var diffX = end.x - start.x,
      diffY = end.y - start.y;
    //返回角度,不是弧度
    return 360 * Math.atan2(diffY, diffX) / (2 * Math.PI) - 90;
  }
  domSetTag(event, type) {
    this.activeDom.dataset.monusedown = 1;
    const parentNode = type == 'elem' ? this.activeDom : this.activeDom.parentNode;
    const detail = parentNode.getBoundingClientRect()
    let width = parentNode.style.width;
    let height = parentNode.style.height;
    let transform = parentNode.style.transform;
    let top = parentNode.style.top.replace('px', '');
    let left = parentNode.style.left.replace('px', '');
    let elemDetail = {
      width: width.replace('px', ''),
      height: height.replace('px', ''),
      centerX: detail.left + detail.width / 2,
      centerY: detail.top + detail.height / 2,
      mouseX: event.pageX - left - this.canvasDetail.left,
      mouseY: event.pageY - top - this.canvasDetail.top,
      pageX: event.pageX,
      pageY: event.pageY,
      angle: transform.replace('rotate(', '').replace('deg)', ''),
      x: left,
      y: top
    }
    this.activeDom.dataset.activeDetail = JSON.stringify(elemDetail);
    this.activeDom.dataset.type = type;
    event.stopPropagation()
  }
  onmouseup(evt) {

    this.activeDom = null;

  }
  onmousemove(evt) {
    let activeElem = null,
      type = null,
      activeDetail = null,
      centerPos = null,
      mouseToPagePos = null,
      activePos = null,
      mousePos = null;
    if (this.activeDom) {
      type = this.activeDom.dataset.type;
      activeElem = this.activeDom.parentNode;
      activeDetail = JSON.parse(this.activeDom.dataset.activeDetail)
      centerPos = {
        x: activeDetail.centerX,
        y: activeDetail.centerY
      };
      mouseToPagePos = {
        x: activeDetail.pageX,
        y: activeDetail.pageY
      }
      activePos = this.getRotatedPoint(mouseToPagePos, centerPos, -activeDetail.angle)
      mousePos = this.getRotatedPoint({
        x: evt.pageX,
        y: evt.pageY
      }, centerPos, -activeDetail.angle)
    }

    if (type === 'elem') {
      activeElem = this.activeDom;
      activeDetail.x = evt.pageX - this.canvasDetail.left - activeDetail.mouseX
      activeDetail.y = evt.pageY - this.canvasDetail.top - activeDetail.mouseY
    }
    if (type === 'angle') {
      activeDetail.angle = this.getAngle(centerPos, { x: evt.pageX, y: evt.pageY });
    }
    if (type == 'top') {
      activeDetail.height = activePos.y - mousePos.y + (+activeDetail.height);
      activeDetail.y = activeDetail.y - (activePos.y - mousePos.y);
    }
    if (type == 'right') {
      activeDetail.width = mousePos.x - activePos.x + (+activeDetail.width);
      // activeDetail.y = activeDetail.y - (activePos.y - mousePos.y);
    }
    if (type == 'left') {
      activeDetail.width = activePos.x - mousePos.x + (+activeDetail.width);
      activeDetail.x = activeDetail.x - (activePos.x - mousePos.x);
    }
    if (type == 'bottom') {
      activeDetail.height = mousePos.y - activePos.y + (+activeDetail.height);

    }

    if (type === 'leftTop') {
      activeDetail.width = activePos.x - mousePos.x + (+activeDetail.width);
      activeDetail.height = activePos.y - mousePos.y + (+activeDetail.height);
      activeDetail.x = activeDetail.x - (activePos.x - mousePos.x);
      activeDetail.y = activeDetail.y - (activePos.y - mousePos.y);
    }
    if (type === 'rightTop') {
      activeDetail.width = mousePos.x - activePos.x + (+activeDetail.width);
      activeDetail.height = activePos.y - mousePos.y + (+activeDetail.height);
      activeDetail.y = activeDetail.y - (activePos.y - mousePos.y);
    }
    if (type === 'rightBottom') {
      activeDetail.width = mousePos.x - activePos.x + (+activeDetail.width);
      activeDetail.height = mousePos.y - activePos.y + (+activeDetail.height);
    }
    if (type === 'leftBottom') {
      activeDetail.width = activePos.x - mousePos.x + (+activeDetail.width);
      activeDetail.height = mousePos.y - activePos.y + (+activeDetail.height);
      activeDetail.x = activeDetail.x - (activePos.x - mousePos.x);
    }
    if (activeElem) {
      activeElem.style.transform = `rotate(${activeDetail.angle}deg) `;
      activeElem.style.left = `${activeDetail.x}px`;
      activeElem.style.top = `${activeDetail.y}px`;
      activeElem.style.width = `${activeDetail.width}px`;
      activeElem.style.height = `${activeDetail.height}px`;
    }
  }
  deleteDrop() {

  }
  getRotatedPoint(curPos, centerPos, angle) {
    return {
      x: Math.floor((curPos.x - centerPos.x) * Math.cos(Math.PI / 180 * angle) - (curPos.y - centerPos.y) * Math.sin(Math.PI / 180 * angle) + centerPos.x),
      y: Math.floor((curPos.x - centerPos.x) * Math.sin(Math.PI / 180 * angle) + (curPos.y - centerPos.y) * Math.cos(Math.PI / 180 * angle) + centerPos.y)
    }
  }

}
export default new drop();