import { setStle, setStyle } from '../../../utils';
import Cropper from './cropper.common.js';
export default class slicer {
  constructor(canvas,param) {
    this.canvas = canvas;
    this.cropData={};
    this.param=param
  }
  add(img) {
      this.canvas.appendChild(img)
      let _that = this;
      const cropper = new Cropper(img, {
      zoomOnTouch:false,
      movable:true,
      crop(event) {
        console.log(event.detail.x, 'x');
        console.log(event.detail.y, 'y');
        console.log(event.detail.width, 'width');
        console.log(event.detail.height, 'height');
        console.log(event.detail.rotate, 'rotate');
        console.log(event.detail.scaleX, 'scaleX');
        console.log(event.detail.scaleY, 'scaleY');
        _that.cropData.x = event.detail.x;
        _that.cropData.y = event.detail.y;
        _that.cropData.width = event.detail.width;
        _that.cropData.height = event.detail.height;
        _that.cropData.rotate = event.detail.rotate; 
        _that.cropData.scaleX = event.detail.scaleX;
        _that.cropData.scaleY = event.detail.scaleY;
       },
       ready(){
         if(_that.param.data){
          cropper.setData(_that.param.data)
         }
      }
      },
    ) 
  }

  getData(){
    return this.cropData
  }
}