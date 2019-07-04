import drop from '../drop'
import bar from '../draw-bar';
import detail from '../draw-detail';
import imgDetail from '../draw-img';
import data from './data';

export default class drawEditer {
  constructor(params) {

    this.canvas = params.canvas.dom;
    this.unit = params.unit||'px';
    this.drawData = data;
    this.canvas.style.position = 'relative';
    this.elements = [];
    this.id = 0;
    // console.log(params,"kjjj")
    drop.init(this.canvas,params,this.unit)
    this.bar = new bar(params.bar,this);
    this.detail = new detail(canvas);
    this.imgDetail = new imgDetail(canvas);
    this.bar.init();
    this.detail.init();
    this.imgDetail.init();
    // return this;
    // console.log((new bar()).init(),"kkkk")
  }
  create(){

  }
 
  getData(){
   
    var doms = this.canvas.querySelectorAll('.box')
    console.log(doms,"kkkkk")
    for(let key in doms){
      let style = doms[key].style;
      console.log(style,"kkkk")
      // arr.push({

      // })
    }
    // doms.map((item,index)=>{
    //   let style = item.style;
    //   console.log(style,"kkkk")
    // })
    
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
        top:0,
        left:0,
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