import drop from './drop'
export default class drawEditer {
  constructor(canvas) {
    this.canvas = canvas;
    this.canvas.style.position = 'relative';
    this.elements = [];
    this.id = 0;
    drop.init(canvas)
    // return this;
  }
  create(){

  }
  add (type){
    this.id++;
    // this.elements.push()
    this.canvas.appendChild(drop.create({
      name:type+this.id,
      id:this.id,
      text:'',
      url:'',
      style:{
        width:80+'px',
        height:100+'px',
        left:'50%',
        top:'40%',
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