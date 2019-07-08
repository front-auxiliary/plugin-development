import drop from '../drop'
import bar from '../draw-bar';
import detail from '../draw-detail';
import imgDetail from '../draw-img';
import data from './data';
import dreawData from '../draw-data';

export default class drawEditer {
  constructor(params) {
    dreawData.setParams({
      canvas:params.canvas.dom,
      unit:params.unit||'px',
      zoom:params.canvas.zoom||1,
      detail:params.detail.dom
    })
    this.canvas = params.canvas.dom;
    
    this.unit = params.unit||'px';
    this.zoom = params.canvas.zoom||1
    this.drawData = data;
    this.canvas.style.position = 'relative';
    this.canvas.style.height = params.canvas.height*this.zoom+this.unit;
    this.canvas.style.width = params.canvas.width*this.zoom+this.unit;
    this.elements = [];
    this.id = 0;
    // console.log(params,"kjjj")
    drop.init(this.canvas,params,this.unit,(dom)=>{
      this.activeElemClick(dom)
    })
    this.bar = new bar(params.bar,this);
    this.detail = new detail(canvas);
    this.imgDetail = new imgDetail(canvas);
    this.bar.init();
    this.detail.init();
    // this.imgDetail.init();
    // return this;
    // console.log((new bar()).init(),"kkkk")
  }
  create(){

  }
  activeElemClick(dom){
    // console.log(this)
    // this.detail.active(dom)
  }
  
 
  elemClick(callback){

    drop.elemClick(callback)
  }
  add (type){
    this.id++;
    // this.elements.push()
    this.canvas.appendChild(drop.create({
      name:type+this.id,
      id:this.id,
      text:'是的发送到',
      url:'',
      style:{
        width:50+'px',
        height:400+'px',
        angle:0,
        top:100,
        left:100,
        color:'#000',
        fontSize:14,
      }
    },this.canvas));
  }
  render(){
    // this.drawDat
    this.drawData.map((item,index)=>{
        this.canvas.appendChild(drop.create(item))
    })
  }
}