let arr = [];
let activeDom = null;
export default {
  add:(item)=>{
      return arr.push(item)
  },
  getData:(id)=>{
    if(id){
      return arr;
    }else{
      for(let i=0;i<arr.length;i++){
        if(id == arr[i].id){
          return arr[i]
        }
      }
    }
    
  },
  editorData:(id,item)=>{
    for(let i=0;i<arr.lengthl;i++){
      if(id == arr[i]){
        arr[i] = item;
        return arr;
      }
    }
    return arr;
  },
  setActive(dom){
    activeDom = dom 
  },
  getActive(){
    return activeDom
  }

}