import drawData from '../draw-data';
const publicStyle = {
  width: '30px',
  height: '30px',
  cursor: 'pointer',
  display: 'inline-block',
  backgroundSize: '25px',
  backgroundColor: '#fff',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  borderRadius: '4px',
  verticalAlign: 'middle',
  margin: '2px'
}
const hover = (event) => {
  event.currentTarget.style.backgroundColor = 'rgba(14,19,24,.15)'
}

const setActive = (event) => {
  let active = +event.dataset.active;
  if (!active) {
    event.dataset.active = 1;
    event.style.backgroundColor = 'rgba(14,19,24,0.15)';
  } else {
    event.dataset.active = 0;
    event.style.backgroundColor = '#fff';
  }
}
export default function () {
  return [
    {
      title: "文字内容",
      name: 'text',
      type: 'textarea',
      on: {
        input: function (event,e) {
          let activeDom = drawData.getActive();
          // console.log(event,e)
         activeDom.innerText = e.value;
        }
      }
    },
    {
      title: "字体",
      name: 'fontFamily',
      type: 'select',
      options: [{
        label: 'Apple',
        value: 'Apple'
      }, {
        label: 'Orange',
        value: 'Orange'
      }],
      on: {
        change: (evt) => {
          console.log('ppppp', evt.value)
        }
      }
    },
    {
      title: "字号",
      name: 'fontSize',
      type: 'select',
      options: [{
        label: '14',
        value: '14'
      }, {
        label: '16',
        value: '16'
      }],
      on: {
        change: (evt) => {
          console.log('ppppp', evt.value)
        }
      }
    },
    {
      title: "行高",
      name: 'lineHeight',
      type: 'select',
      options: [{
        label: '14',
        value: '14'
      }, {
        label: '16',
        value: '16'
      }],
      on: {
        change: (evt) => {
          console.log('ppppp', evt.value)
        }
      }
    },
    {
      title: "颜色",
      name: 'color',
      type: 'color',
      on: {

      }

    },
    {
      title: "",
      name: 'textAlign',
      type: 'radio-button',
      on:{
        change:()=>{}
      },
      options: [{
        value:'left',
        label:'',
        url:'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTYxOTg1NDM1MzM0IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEyNzggMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE3ODYiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjQ5LjYwOTM3NSIgaGVpZ2h0PSIyMDAiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTI2NC44MDg0OTY0NCA3MzMuNDcwMTg3NjdoNjY5LjAxNDY2OTU1djY3LjA1MzU3NTU1SDI2NC44MDg0OTY0NHpNMjYzLjQ3NjIzNjc3IDQ5OC40Nzg0NTczNmg1MzEuNDY2NzIyMDl2NjcuMDUzNTc1NTVIMjYzLjQ3NjIzNjc3ek0yNjQuODA4NDk2NDQgMjYzLjQ3NjIzNjc3aDY2OS4wMTQ2Njk1NXY2Ny4wNTM1NzU1NEgyNjQuODA4NDk2NDR6IiBmaWxsPSIjNjY2NjY2IiBwLWlkPSIxNzg3Ij48L3BhdGg+PC9zdmc+'
      }, {
        value:'center',
        label:'',
        url:'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTYxOTg1Mzk5ODM2IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEyNzUgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE0MTMiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjQ5LjAyMzQzNzUiIGhlaWdodD0iMjAwIj48ZGVmcz48c3R5bGUgdHlwZT0idGV4dC9jc3MiPjwvc3R5bGU+PC9kZWZzPjxwYXRoIGQ9Ik0yODMuNDc2MjM2NzcgNzEzLjQ3MDE4NzY3aDY2OS4wMTQ2Njk1NXY2Ny4wNTM1NzU1NUgyODMuNDc2MjM2Nzd6TTM1Mi4yNTAyMTA1MSA0NzguNDc4NDU3MzZoNTMxLjQ2NjcyMjA2djY3LjA1MzU3NTU1SDM1Mi4yNTAyMTA1MXpNMjgzLjQ3NjIzNjc3IDI0My40NzYyMzY3OGg2NjkuMDE0NjY5NTV2NjcuMDUzNTc1NTRIMjgzLjQ3NjIzNjc3eiIgZmlsbD0iIzY2NjY2NiIgcC1pZD0iMTQxNCI+PC9wYXRoPjwvc3ZnPg==',
      },
      {
        value:'right',
        label:'',
        url:'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTYxOTg1NDI2NDExIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEyNzggMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE2MzMiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjQ5LjYwOTM3NSIgaGVpZ2h0PSIyMDAiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTI2My40NzYyMzY3NyA3MzMuNDcwMTg3NjdoNjY5LjAxNDY2OTU1djY3LjA1MzU3NTU1SDI2My40NzYyMzY3N3pNNDAyLjc4NjU0MzQ1IDQ5OC40Nzg0NTczNmg1MzEuNDY2NzIyMDl2NjcuMDUzNTc1NTVINDAyLjc4NjU0MzQ1ek0yNjMuNDc2MjM2NzcgMjYzLjQ3NjIzNjc3aDY2OS4wMTQ2Njk1NXY2Ny4wNTM1NzU1NEgyNjMuNDc2MjM2Nzd6IiBmaWxsPSIjNjY2NjY2IiBwLWlkPSIxNjM0Ij48L3BhdGg+PC9zdmc+',
      }, {
        tag: 'div',
        style: {
          display: 'inline-block',
          height: '15px',
          width: '1px',
          backgroundColor: '#666',
          verticalAlign: 'middle',
          margin: '0 5px'

        }
      }],


    }
  ]
}

/**
 *   {
        tag: 'div',
        style: Object.assign({}, publicStyle, {
          backgroundSize: '17px',
          backgroundImage: 'url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTYxOTg4NzA4NjM2IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE5MzkiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNMjczLjUyMjA3MTA1IDg1OS42MTQyODgzM1YxNjQuNDE4NTA0MTloMjA1LjQ5ODEyNTE5cTkyLjEzNTMwMjkgMCAxNDcuMjI2Mjg5NCA0My43MjMwMDUzdDU1LjA5MDk4NzE2IDExNS45OTcxMzI5N3EwIDU3LjQ1MjAyODktMzIuNzkyMjU0MzEgMTAxLjQzNzM3MjMydC05MC4wNDc1Mjk0NiA2Mi40MTQ1OTAxOXYxLjc5MjY0MjhxNzEuMzU1OTQ0NTkgOC4wNzc4MjU1MyAxMTQuMDI5NTk4MDggNTMuNjM3MTk2OTl0NDIuNjI5OTMwMTQgMTE1LjU3MDgzMzYxcTAgODkuNzc0MjYwNS02NC44MDg0MjQ0NCAxNDUuMTkzMTcwMTV0LTE2NS45MTc4NzQ5NCA1NS40Mjk4Mzk4MXpNMzYzLjg0Mjg2OTQ3IDI0Mi45MzQwOTA1NFY0NjAuNjA5MDcyOTVoODIuMTk5MjUwMjFxNjUuNDc1MjAwMjMgMCAxMDIuNzQ5MDYyMjUtMzEuNjQ0NTI1NjJ0MzcuMjYyOTMxMTgtODcuNzQxMTQwNTZxMC05OC4yODkzMTYyMi0xMzEuODY4NTg0MjMtOTguMjg5MzE2MjR6IG0wIDI5NS43NzUyMDAyNHYyNDIuMzM0NzU3MDFoMTA4LjM4OTMzMDE2cTcwLjg5Njg1MzM4IDAgMTA5LjUxNTE5Nzg2LTMyLjU0MDg0NjM3dDM4LjYxODM0Mzc5LTkwLjQ0MTAzNjk3cTAtMTE5LjM4NTY2NjE5LTE2My4wMzIxNTU2MS0xMTkuMzg1NjY1NTF6IiBmaWxsPSIjNjY2NjY2IiBwLWlkPSIxOTQwIj48L3BhdGg+PC9zdmc+)',
        }),
        on: {
          click: (event, dom) => {
            console.log("-------", event)
            setActive(dom)
            // console.log("ppppppp",elemDom)
          },
          // hover: hover,
        }
      }, {
        tag: 'div',
        style: Object.assign({}, publicStyle, {
          backgroundSize: '17px',
          backgroundImage: 'url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTYxOTg4NzM0Njc1IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjIyNDUiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNNDQ2LjEwOTMyNzgyIDkwMi43ODg1NzQyMkgzNjkuMDAxMjQ5NzVMNTc3Ljg5MDY3MjE4IDE2MS4yMTE0MjU3OGg3Ny4xMDgwNzgwN0w0NDYuMTA5MzI3ODIgOTAyLjc4ODU3NDIyeiIgZmlsbD0iIzY2NjY2NiIgcC1pZD0iMjI0NiI+PC9wYXRoPjwvc3ZnPg==)',
        }),
        on: {
          click: (event, dom) => {
            // console.log("ppppppp")
            setActive(dom)
          },
          // hover: hover,
        }
      }, {
        tag: 'div',
        style: Object.assign({}, publicStyle, {
          backgroundSize: '17px',
          backgroundImage: 'url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTYxOTg4NzI4NDA5IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjIwOTIiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNMjQ0LjgwMzkxMTk2IDkzMC4yNjMzNjgwNXYtNTMuMzA4MzAzNDNsNTM0LjM5MjE3NjA4LTQuODQ5MDY1NjF2NTMuMjk3ODMwMjNMMjQ0LjgwMzkxMTk2IDkzMC4yNjMzNjgwNXpNNzUzLjc5ODcxMzc4IDUyMS40MTI3Njk2NXEwIDI3My41MDYxNTcxOS0yNDguMTA4NzgyOTEgMjczLjUwNjE1Nzk3LTIzNy43NDAzNzAyNSAwLTIzNy43NDAzNzAyNy0yNjMuOTIzMjMwNzhWMTM5LjMwMDEwODQ0aDgzLjI2MTQ5NTE0djM4Ny45MzU3Mjk2OXEwIDE5My41NzUxMjIxMSAxNjIuMzMzNzMyODggMTkzLjU3NTEyMjEgMTU2Ljk0MDA2Mzg1IDAgMTU2Ljk0MDA2Mzg2LTE4Ny4zMzMxMjgyVjEzOS4yNDc3NDMwNUg3NTMuNzk4NzEzNzh6IiBmaWxsPSIjNjY2NjY2IiBwLWlkPSIyMDkzIj48L3BhdGg+PC9zdmc+)',
        }),
        on: {
          click: (event, dom) => {
            // console.log("ppppppp")
            setActive(dom)
          },
          // hover: hover,
        }
      }*/
