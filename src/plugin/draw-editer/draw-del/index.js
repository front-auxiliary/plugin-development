import drawData from '../draw-data';
export default ()=>{
    
    document.onkeydown = function(e){
        const {getActive,setActive} = drawData;
        let active = getActive();
        if(event.keyCode == 8 && active){
            active.parentNode.removeChild(active);
            setActive(null);
        }
        // console.log( event.keyCode,"kkkkk")
        
    }
}