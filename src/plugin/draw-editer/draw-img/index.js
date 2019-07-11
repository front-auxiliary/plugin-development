import { creatDom ,getFileDetail} from '../../../utils';
import data from './data';
import drawData from '../draw-data';
import drawEditer from '../main';
export default class drawImg {
  constructor(canvas) {
    const { detail } = drawData.getParams()
    this.canvas = detail;
    this.upFile = null;
    this.img = null;

  }
  init() {
    const { canvas } = drawData.getParams()
    
    this.upFile = creatDom({
      tag: 'input',
      attr: {
        type: 'file',
      },
      on: {
        change: (e) => {
          getFileDetail(e, (file, url) => {
            let active = drawData.getActive();
            let activeImg = active.getElementsByTagName('img')[0]
            activeImg.src = url;
            // const { fileUpload } = dreawData.getParams();
            // fileUpload(file, url)
            this.img.src = url;
          })
        }
      },
      style: {
        display: 'none',
      }
    })

    let detailBox = creatDom.call(this, {
      tag: 'form',
      style: {
        position: 'absolute',
        width: '300px',
        minHeight: canvas.style.height,
        background: '#FFF',
        margin: '0 -300px 0 0',
        right: '-5px',
        bottom: '0px',
        top: '0px',
        display: 'none'
      }
    });
    // 获取 img detail dom 
    drawData.setImg(detailBox)
    data.map((item, index) => {
      detailBox.appendChild(this.divList(item));
    })
    detailBox.appendChild(this.upFile);
    this.canvas.appendChild(detailBox)
  }

  divList(params) {
    let domBox = creatDom.call(this, {});
    let titleDom = null;
    let itemDom = null;
    if (params.type == 'img') {
      titleDom = creatDom({ tag: 'div', child: params.title, style: { 'lineHeight': '60px', paddingLeft: '34px' } })
      itemDom = creatDom({
        tag: 'img',
        attr: { src: params.img },
        on: params.on,
        style: { width: '50%', height: '100px', float: 'left' }
      });
      this.img = itemDom;
      drawData.setImgDetailDom(itemDom);
    } else {
      titleDom = creatDom({ tag: 'span' });
      
      itemDom = creatDom({
        tag: 'span',
        style: {
          display: 'inline-block',
          width: '48%',
          height: '35px',
          lineHeight: '35px',
          textAlign: 'center',
          float: 'right',
          borderRadius: '4px',
          border: '1px solid #eee',
          margin: '5px 0 10px 0',
          cursor:'pointer'
        }, on: {
          click: (e) => {
            if(params.type == 'cut'){
              let model = drawData.getModel();
              let img = drawData.getImgDetailDom()
              model.open({src:img.src})
            }else{
              this.upFile.click();
            }
            
          }
        }, child: params.title
      });
    }
    domBox.appendChild(titleDom);
    domBox.appendChild(itemDom)
    return domBox;

  }
}

