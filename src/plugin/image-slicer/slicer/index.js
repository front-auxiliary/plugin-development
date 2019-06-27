import { setStle, setStyle } from '../../../utils';
import Cropper from './cropper.common.js';
export default class slicer {
  constructor(canvas) {
    this.canvas = canvas;
  }
  add(img) {
    img.style.maxWidth = 50 %
      this.canvas.appendChild(img)
    const cropper = new Cropper(img, {
      aspectRatio: 16 / 9,
      crop(event) {
        console.log(event.detail.x, 'x');
        console.log(event.detail.y, 'y');
        console.log(event.detail.width, 'width');
        console.log(event.detail.height, 'height');
        console.log(event.detail.rotate, 'rotate');
        console.log(event.detail.scaleX, 'scaleX');
        console.log(event.detail.scaleY, 'scaleY');
      },
      ready() {
        // Allows chain composition
        console.log(cropper,'cropperready')
        this.cropper.rotateTo(45);
      },
    },
    )
    
    
  }

}