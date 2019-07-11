import { creatDom, hsvToRgb, colorHex } from '../../../../utils';
import Cropper from "../cropper";
import './index.less'
import botton from '../button';
const closeIcon = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTYyODE1MDIxNDU4IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE5NzciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTUyMS42OTM4NjcgNDQ5LjI5NzA2N0wxMTEuNDExMiAzOS4wMTQ0YTUxLjIgNTEuMiAwIDEgMC03Mi40MzA5MzMgNzIuMzYyNjY3bDQxMC4yODI2NjYgNDEwLjMxNjgtNDEwLjI4MjY2NiA0MTAuMzE2OGE1MS4yIDUxLjIgMCAxIDAgNzIuMzk2OCA3Mi4zOTY4bDQxMC4zMTY4LTQxMC4yODI2NjcgNDEwLjMxNjggNDEwLjI4MjY2N2E1MS4yIDUxLjIgMCAxIDAgNzIuMzk2OC03Mi4zNjI2NjdsLTQxMC4yODI2NjctNDEwLjM1MDkzMyA0MTAuMjgyNjY3LTQxMC4yODI2NjdhNTEuMiA1MS4yIDAgMSAwLTcyLjM5NjgtNzIuMzk2OGwtNDEwLjI4MjY2NyA0MTAuMjgyNjY3eiIgZmlsbD0iIzAwMDAwMCIgcC1pZD0iMTk3OCI+PC9wYXRoPjwvc3ZnPg==';
const imgIccn = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTYyODI4Nzc1MjcxIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE5OTQiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMzIiIGhlaWdodD0iMzIiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTQyMC41NzE0MjkgMjQ2Ljg1NzE0M20tOTEuNDI4NTcyIDBhOTEuNDI4NTcxIDkxLjQyODU3MSAwIDEgMCAxODIuODU3MTQzIDAgOTEuNDI4NTcxIDkxLjQyODU3MSAwIDEgMC0xODIuODU3MTQzIDBaIiBmaWxsPSIjRTlFREYyIiBwLWlkPSIxOTk1Ij48L3BhdGg+PHBhdGggZD0iTTEwMDIuMDU3MTQzIDgzOS4zMTQyODZsLTI5Mi41NzE0MjktNDM4Ljg1NzE0M2MtMy42NTcxNDMtNS40ODU3MTQtOS4xNDI4NTctNy4zMTQyODYtMTQuNjI4NTcxLTcuMzE0Mjg2LTUuNDg1NzE0IDAtMTAuOTcxNDI5IDEuODI4NTcxLTE0LjYyODU3MiA1LjQ4NTcxNGwtMTc1LjU0Mjg1NyAyMDQuOCA4MC40NTcxNDMgMTI4LTI4My40Mjg1NzEtMjI0LjkxNDI4NWMtMy42NTcxNDMtMy42NTcxNDMtOS4xNDI4NTctMy42NTcxNDMtMTIuOC0zLjY1NzE0My01LjQ4NTcxNCAwLTkuMTQyODU3IDMuNjU3MTQzLTEyLjggNy4zMTQyODZsLTI1NiAzMjkuMTQyODU3Yy0zLjY1NzE0MyA1LjQ4NTcxNC01LjQ4NTcxNCAxMi44LTEuODI4NTcyIDIwLjExNDI4NSAzLjY1NzE0MyA1LjQ4NTcxNCA5LjE0Mjg1NyAxMC45NzE0MjkgMTYuNDU3MTQzIDEwLjk3MTQyOWg5NTAuODU3MTQzYzcuMzE0Mjg2IDAgMTIuOC0zLjY1NzE0MyAxNi40NTcxNDMtOS4xNDI4NTcgNS40ODU3MTQtOS4xNDI4NTcgMy42NTcxNDMtMTQuNjI4NTcxIDAtMjEuOTQyODU3eiIgZmlsbD0iI0U5RURGMiIgcC1pZD0iMTk5NiI+PC9wYXRoPjwvc3ZnPg==';

export default class model {
  constructor(param) {
    this.creatCropper = null;
    this.boxDom = null;
    this.contentBoxDom = null;
    this.cutDom = null;
    this.imgDom = null;
    this.widthDom = null;
    this.heightDom = null;
    this.xDom = null;
    this.yDom = null;
    this.cropperData = {};
    this.formDom = null;
  }
  renderForm() {
    const inputFn = (event, dom) => {
      let value = dom.value;
      console.log(dom.name)
      if (!isNaN(value) && value) {

        const data = Object.assign(this.cropperData, {
          [dom.name]: +value,
        });
        this.cropper.setData(data)
      }
    }
    const arr = [
      {
        text: '宽:',
        name: 'width',
        on: {
          input: inputFn
        }

      }, {
        text: '高:',
        name: 'height',
        on: {
          input: inputFn
        }
      },
      {
        text: 'x :',
        name: 'x',
        on: {
          input: inputFn
        }
      },
      {
        text: 'y :',
        name: 'y',
        on: {
          input: inputFn
        }
      }
    ]
    this.formDom = creatDom({
      tag: 'form',
      style: {
        // background:'red',
        // height:'400px',
        top: '80px',
        bottom: '90px',
        right: '30px',
        left: '0px',
        position: 'absolute'
      }
    })
    arr.map((item) => {
      this.formDom.appendChild(this.rednerItem(item));
    })
    return this.formDom;
  }
  rednerItem(params) {
    const boxDom = creatDom({
      tag: 'div',

    })
    const textDom = creatDom({
      tag: 'span',
      child: params.text,
      style: {
        display: 'inline-block',
        width: '30px',
        textAlign: 'center'
      }


    })
    const inputDom = creatDom({
      tag: 'input',
      attr: {
        name: params.name
      },
      style: {
        display: 'inline-block',
        width: '200px',
        margin: '10px',
        lineHeight: '35px',
        borderRadius: '4px',
        border: '1px solid #d9d9d9',
        boxSizing: 'border-box',
        padding: ' 0 10px',

      },
      on: params.on
    })

    boxDom.appendChild(textDom)
    boxDom.appendChild(inputDom)
    return boxDom;
  }
  renderRight() {

    const rightBox = creatDom({
      tag: 'div',
      style: {
        display: 'inline-block',
        width: '305px',
        height: '100%',
        verticalAlign: 'middle',
        position: 'relative',
      }
    })
    const close = creatDom({
      tag: 'div',
      style: {
        dispaly: 'inline-block',
        width: '30px',
        height: '30px',
        backgroundImage: `url(${closeIcon})`,
        backgroundSize: '20px',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        position: 'absolute',
        top: '20px',
        right: '20px',
        cursor: 'pointer'
      },
      on: {
        click: () => {
          this.boxDom.style.display = 'none'
        }
      }
    })
    rightBox.appendChild(close);
    rightBox.appendChild(this.renderBtn())

    rightBox.appendChild(this.renderForm());

    return rightBox;
  }
  // 左侧渲染
  renderLeft() {
    const leftBox = creatDom({
      tag: 'div',
      style: {
        padding: '0px 30px 30px 30px',
        boxSizing: 'border-box',
        width: '650px',
        verticalAlign: 'middle',
        display: 'inline-block'
      }
    })
    const title = creatDom({
      tag: 'div',
      child: '图片剪切',
      style: {
        lineHeight: '60px',
        fontSize: '20px',
        fontWeight: 'bold'
      }

    })

    this.cutDom = creatDom({
      tag: 'div',
      style: {
        width: '100%',
        height: '512px',
        background: "rgba(0,0,0,0.5)",
        overflow: 'hidden',
        backgroundImage: `url(${imgIccn})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '80%',
        backgroundPosition: 'center',
        borderRadius: '4px'

      }
    })
    leftBox.appendChild(title);
    leftBox.appendChild(this.cutDom);

    return leftBox;
  }
  renderBtn() {
    const btnBox = creatDom({
      tag: 'div',
      style: {
        position: 'absolute',
        bottom: '30px'
      }

    })
    btnBox.appendChild(botton({
      child: '取消',
      style: {
        margin: '0 30px'
      },
      on: {
        click: () => {
          this.boxDom.style.display = 'none'
        }
      }
    }));
    btnBox.appendChild(botton({
      type: 'primary',
      child: '确定',
      style: {
        margin: '0 30px'
      },
      on: {
        click: () => {
          this.cropper.getData();
          console.log( this.cropper.getData())
          return ;
          this.boxDom.style.display = 'none'
        }
      }
    }));
    return btnBox;
  }
  setCropperData(params) {
    this.cropperData = { ...params };
    for (let key in params) {
      let item = this.formDom.elements[key]
      if (item) {
        item.value = params[key].toFixed(0)
      }

    }
  }
  init() {
    this.boxDom = creatDom({
      tag: 'div',
      style: {
        dispaly: 'block',
        zIndex: 999,
        background: 'rgba(0,0,0,0.5)',
        position: 'fixed',
        top: '0px',
        left: '0px',
        right: '0px',
        bottom: '0px',
        // display: 'none'
      }
    })
    this.contentBoxDom = creatDom({
      tag: 'div',
      style: {
        width: '960px',
        height: '600px',
        position: 'absolute',
        boxShadow: '0 0 16px 0 rgba(0,0,0,.16)',
        background: "#fff",
        top: '50%',
        left: '50%',
        transform: 'translateX(-50%) translateY(-50%)',
      }
    })
    this.imgDom = creatDom({
      tag: 'img',
      attr: {
        src: 'https://gss2.bdstatic.com/-fo3dSag_xI4khGkpoWK1HF6hhy/baike/s%3D220/sign=652b9cbd6b600c33f479d9ca2a4d5134/4a36acaf2edda3cc7291e78901e93901213f9225.jpg'
      },
      style: {
        display: 'none'
      }
    })
    this.contentBoxDom.appendChild(this.renderLeft());
    this.contentBoxDom.appendChild(this.renderRight());
    this.boxDom.appendChild(this.contentBoxDom);
    this.cutDom.appendChild(this.imgDom);
    this.cropper = new Cropper(this.imgDom, {
      zoomOnTouch: false,
      movable: true,
      crop: (event) => {
        this.setCropperData(event.detail)
      },

    });


    return this.boxDom;
  }
  open(params) {
    if (params.src) {
      this.imgDom.src = params.src;
    }
    this.cropper.destroy()
    this.cropper = new Cropper(this.imgDom, {
      zoomOnTouch: false,
      movable: true,
      crop: (event) => {
        this.setCropperData(event.detail)
      },
      ready:()=>{
        this.cropper.setData(params)
      }
    });
    this.boxDom.style.display = "block"

  }
  close() {

  }

}