import fontData from './font-data';
// return ;
var FontFaceObserver = require('fontfaceobserver');

var exampleFontData = []

fontData.map((item,index)=>{
   
    let newFont = new FontFace("MyWebFont", `url('MyWebFont.woff2') format('woff2')`);
    exampleFontData.push(newFont);
})
var key = 0;
function fontLoad(){
    if( exampleFontData[key]){
        exampleFontData[key].load().then(()=>{
            key++;
            fontLoad();
            console.log(key)
         });
    }
    
}
fontLoad();



// Promise.all(exampleFontData).then(function () {
//   console.log('Family A & B have loaded');
// });