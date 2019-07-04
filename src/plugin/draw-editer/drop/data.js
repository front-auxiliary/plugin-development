export default {
    elem:{
        tag: 'div',
        style:{
          display: 'inline-block',
          position: 'absolute',
          border: '1px solid #fff',
          cursor: 'move',
          transformOrigin: 'center',
          transform: 'rotate(0deg)'},
        
       
        on: {
          mousedown: (event) => {
            event.stopPropagation();
            this.onmousedown(event, dropDom, canvas)
            if (this.elemClick) {
              this.elemClick(event)
            }
          }
        }
    }
}