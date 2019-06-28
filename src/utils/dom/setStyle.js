export default function (dom, styles) {
  if (typeof styles == 'object') {
    for (let key in styles) {
      dom.style[key] = styles[key]
    }
  }
}