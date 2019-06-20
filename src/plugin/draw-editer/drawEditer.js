import drop from './drop'
export default class drawEditer {
  constructor(canvas,params) {

    this.canvas = canvas;
    this.canvas.style.position = 'relative';
    this.elements = [];
    this.id = 0;
    console.log(params,"kjjj")
    drop.init(canvas,params)
    // return this;
  }
  create(){

  }
  getData(){
    var arr = [];
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
        width:80+'px',
        height:100+'px',
        angle:0,
        color:'#000',
        fontSize:14,
      }
    },this.canvas));
    // this.render();
  }
  
  render(){
    const elements =  this.elements;
    this.canvas.innerHTML = '';
    const htmls = elements.map((item,index)=>{
     this.canvas.appendChild(drop.create(item,this.canvas));
    })
    // this.canvas.appendChild(htmls);
    // let 
  }
}