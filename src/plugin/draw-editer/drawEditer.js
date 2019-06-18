import drop from './drop'
export default class drawEditer {
  constructor(canvas) {
    this.canvas = canvas;
    this.canvas.style.position = 'relative';
    this.elements = [];
    this.id = 0;
    // return this;
  }
  create(){

  }
  add (type){
    this.id++;
    this.elements.push({
      name:type+this.id,
      id:this.id,
      text:'',
      url:'',
      style:{
        width:50+'px',
        height:50+'px',
        left:0,
        top:0,
        angle:0,
        color:'#000',
        fontSize:14,
      }
    })
    this.render();
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