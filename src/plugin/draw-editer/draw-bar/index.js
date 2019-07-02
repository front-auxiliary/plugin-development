import data from './data';
import { creatDom } from '../../../utils';
class bar {
  constructor(params, draw) {
    this.dom = params.dom;
    this.data = data.concat(params.data || []);
    this.drawObj = draw
  }
  init() {

    this.data.map((item) => {
      let style = {
        display: 'inline-block',
        margin: '5px',
        minWidth: '50px',
        minHeight: '50px',
        padding: '5px',
        textAlign: 'center',
        fontSize: '12px',
        cursor: 'pointer',
        verticalAlign: 'middle',
        boxSizing: 'border-box',
        borderRadius: '4px',
        backgroundColor: '#fff'

      }
      let dombox = creatDom({ tag: 'div', style: style ,on:{hover:(event)=>{
        event.currentTarget.style.backgroundColor = 'rgba(14,19,24,.15)'
      }}});
      let domText = creatDom({ tag: 'span', child: item.text, style: { display: 'block' } })
      let domImg = creatDom({
        tag: 'img', attr: { src: item.img }, style: {
          height: '20px'
        }
      });
      if (item.on) {
        for (let key in item.on) {
          dombox.removeEventListener(key, item.on[key].bind(this, this.drawObj));
          dombox.addEventListener(key, item.on[key].bind(this, this.drawObj));
        }
      }
      dombox.appendChild(domImg);
      dombox.appendChild(domText);
      this.dom.appendChild(dombox);
    })
  }
}
export default bar;