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
export default [
  {
    title: "图片",
    name: 'img',
    type: 'img',
    style:{},
    img:'https://tse3-mm.cn.bing.net/th?id=OIP.rJNHO8sYJpEhccdXGlN27gHaFj&w=277&h=207&c=7&o=5&dpr=2&pid=1.7'
  },
  {
    title: "更换图片",
    name: 'text',
    type: 'div',
    style:{},
    img:'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTYxOTY1NTYxODQyIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjI3NjgiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMzIiIGhlaWdodD0iMzIiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTEwNy4wMDggMTA3LjI2NGg4MDkuODU2YzIzLjIzMiAwIDQxLjkyIDE4LjY4OCA0MS45MiA0MS45MnYzMzAuMzY4Yy00MS45Mi0zMi42NC0xMjAuOTYtODMuNzc2LTE4MS41NjgtODMuNzc2LTg4LjQ0OCAwLTE2Ny41NTIgMjA0LjgtMjY1LjI4IDIwNC44QzQzNy40NCA1OTUuODQgMzM1LjEwNCA1MTIgMjE4LjY4OCA1MjYuMDE2Yy00Ni41MjggOS4yOC0xMTEuNjggODMuODQtMTUzLjYgMTM5LjY0OHYtNTE2LjQ4YzAtMjMuMzYgMTguNjg4LTQxLjkyIDQxLjkyLTQxLjkyeiBtMTk1LjUyIDMzNS4xMDRjLTM3LjI0OCAwLTY5LjgyNC0xMy45NTItOTMuMDU2LTM3LjE4NHMtMzcuMjQ4LTYwLjU0NC0zNy4yNDgtOTMuMDU2YzAtMzIuNjQgMTQuMDE2LTY5Ljc2IDM3LjI0OC05My4wNTZhMTI5Ljk4NCAxMjkuOTg0IDAgMCAxIDkzLjA1Ni0zNy4xODRjMzIuNjQgMCA2NS4wODggMTMuOTUyIDkyLjk5MiAzNy4xODQgMjMuMjMyIDIzLjIzMiAzNy4yNDggNjAuNTQ0IDM3LjI0OCA5My4wNTYgMCAzMi42NC0xNC4wMTYgNjkuODI0LTM3LjI0OCA5My4wNTYtMjcuOTA0IDIzLjIzMi02MC40MTYgMzcuMTg0LTkyLjk5MiAzNy4xODR6TTk0MC4wOTYgNDYuNzJIODMuODRDMzcuMTg0IDQ2LjcyIDAgODMuOTA0IDAgMTMwLjQ5NnY3NjMuMjY0YzAgNDYuNTkyIDM3LjE4NCA4My44NCA4My43NzYgODMuODRoODU2LjQ0OGM0Ni41OTIgMCA4My43NzYtMzcuMjQ4IDgzLjc3Ni04My44NFYxMzAuNTZBODMuNTIgODMuNTIgMCAwIDAgOTQwLjE2IDQ2LjcyeiIgcC1pZD0iMjc2OSI+PC9wYXRoPjwvc3ZnPg==',
    on: {
      click: (evt) => {
         
        console.log('更换图片', evt)
      }
    }
  },
  {
    title: "裁剪图片",
    name: 'text',
    type: 'div',
    img:'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTYxOTY1NTYxODQyIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjI3NjgiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMzIiIGhlaWdodD0iMzIiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTEwNy4wMDggMTA3LjI2NGg4MDkuODU2YzIzLjIzMiAwIDQxLjkyIDE4LjY4OCA0MS45MiA0MS45MnYzMzAuMzY4Yy00MS45Mi0zMi42NC0xMjAuOTYtODMuNzc2LTE4MS41NjgtODMuNzc2LTg4LjQ0OCAwLTE2Ny41NTIgMjA0LjgtMjY1LjI4IDIwNC44QzQzNy40NCA1OTUuODQgMzM1LjEwNCA1MTIgMjE4LjY4OCA1MjYuMDE2Yy00Ni41MjggOS4yOC0xMTEuNjggODMuODQtMTUzLjYgMTM5LjY0OHYtNTE2LjQ4YzAtMjMuMzYgMTguNjg4LTQxLjkyIDQxLjkyLTQxLjkyeiBtMTk1LjUyIDMzNS4xMDRjLTM3LjI0OCAwLTY5LjgyNC0xMy45NTItOTMuMDU2LTM3LjE4NHMtMzcuMjQ4LTYwLjU0NC0zNy4yNDgtOTMuMDU2YzAtMzIuNjQgMTQuMDE2LTY5Ljc2IDM3LjI0OC05My4wNTZhMTI5Ljk4NCAxMjkuOTg0IDAgMCAxIDkzLjA1Ni0zNy4xODRjMzIuNjQgMCA2NS4wODggMTMuOTUyIDkyLjk5MiAzNy4xODQgMjMuMjMyIDIzLjIzMiAzNy4yNDggNjAuNTQ0IDM3LjI0OCA5My4wNTYgMCAzMi42NC0xNC4wMTYgNjkuODI0LTM3LjI0OCA5My4wNTYtMjcuOTA0IDIzLjIzMi02MC40MTYgMzcuMTg0LTkyLjk5MiAzNy4xODR6TTk0MC4wOTYgNDYuNzJIODMuODRDMzcuMTg0IDQ2LjcyIDAgODMuOTA0IDAgMTMwLjQ5NnY3NjMuMjY0YzAgNDYuNTkyIDM3LjE4NCA4My44NCA4My43NzYgODMuODRoODU2LjQ0OGM0Ni41OTIgMCA4My43NzYtMzcuMjQ4IDgzLjc3Ni04My44NFYxMzAuNTZBODMuNTIgODMuNTIgMCAwIDAgOTQwLjE2IDQ2LjcyeiIgcC1pZD0iMjc2OSI+PC9wYXRoPjwvc3ZnPg==',
    style:{},
    on: {
      click: (evt) => {
        console.log('裁剪图片', evt)
      }
    }
  },
]