import { creatDom, hsvToRgb, colorHex } from '../../../../utils';
import Cropper  from "../cropper";
export default class model {
  constructor(param) {
    this.creatCropper = null;
    this.boxDom = null;
    this.contentBoxDom = null;
    this.cutDom = null;
    this.imgDom = null;
  }
  init() {


    this.boxDom = creatDom({
      tag: 'div',
      style: {
        dispaly: 'block',
        zIndex: 999,
        background: 'rgba(0,0,0,0.5)',
        position: 'fixed',
        top: '0px',
        left: '0px',
        right: '0px',
        bottom: '0px',
        display:'none'
      }
    })
    this.contentBoxDom = creatDom({
      tag: 'div',
      style: {
        width: '960px',
        height: '600px',
        position:'absolute',
        boxShadow: '0 0 16px 0 rgba(0,0,0,.16)',
        background:"#fff",
        top:'50%',
        left:'50%',
        transform:'translateX(-50%) translateY(-50%)',
      }
    })
    this.imgDom = creatDom({
      tag:'img',
      attr:{
        src:'https://gss2.bdstatic.com/-fo3dSag_xI4khGkpoWK1HF6hhy/baike/s%3D220/sign=652b9cbd6b600c33f479d9ca2a4d5134/4a36acaf2edda3cc7291e78901e93901213f9225.jpg'
      },
      style:{
        display:'none'
      }
    })
    
    this.cutDom = creatDom({
      tag:'div',
      style:{
        width:'620px',
        height:'512px',
        background:"#000",
        overflow:'hidden'
      
      }
    })
   
    this.contentBoxDom.appendChild(this.cutDom);


    this.boxDom.appendChild(this.contentBoxDom);
    this.boxDom.appendChild(this.imgDom);

    this.cropper = new Cropper(this.imgDom, {
      zoomOnTouch:false,
      movable:true,
      crop(event) {
        // console.log(event.detail.x);
        // console.log(event.detail.y);
        // console.log(event.detail.width);
        // console.log(event.detail.height);
        // console.log(event.detail.rotate);
        // console.log(event.detail.scaleX);
        // console.log(event.detail.scaleY);
      },
    });
    return this.boxDom;
  }
  open() {
    
    this.cutDom.appendChild(this.imgDom);
    // console.log(cropper,"kkkkk")
    this.boxDom.style.display="block"
    
  }
  close() {

  }

}