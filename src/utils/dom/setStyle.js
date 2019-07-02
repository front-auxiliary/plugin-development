export default function (dom, styles) {
  if (typeof styles == 'object') {
    for (let key in styles) {
      if(styles[key]){
        dom.style[key] = styles[key]
      }
    }
  }
}