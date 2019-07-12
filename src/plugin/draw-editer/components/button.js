import { creatDom } from "../../../utils";

export default (params) => {
  const { type ,style} = params;
  let box = null;
  const publicStyle = {
    display: 'inline-block',
    padding: '5px 20px',
    boxShadow: '0 2px 0 rgba(0,0,0,0.015)',
    borderRadius: '4px',
    cursor: 'pointer',
    transition:'all .3s cubic-bezier(.645, .045, .355, 1)'
  }
  const primaryStyle = Object.assign({
   
    border: '0px solid #d9d9d9',
    fontSize: '14px',
    color: '#fff',
    background: '#1890ff'
  },publicStyle,style) 
  const defaultStyle =Object.assign( {
    
    border: '1px solid #d9d9d9',
    fontSize: '14px',
    color: '#333'
  },publicStyle,style)
  const primaryHover = () => {
    box.style.background = '#40a9ff';
    // box.style.color='#1890ff';
  }
  const defaultHover = () => {
    box.style.borderColor = '#1890ff';
    box.style.color = '#1890ff';
  }

  let initStyle = defaultStyle;
  let hover = defaultHover;
  if (type == 'primary') {
    initStyle = primaryStyle;
    hover = primaryHover;

  }
  box = creatDom({
    tag: 'div',
    child: params.child,
    style: initStyle,
    on: {
      hover,
      ...params.on
    }
  })
  return box;
}