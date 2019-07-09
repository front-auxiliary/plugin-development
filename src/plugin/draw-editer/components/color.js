import { creatDom,hsvToRgb } from '../../../utils';
var rangeValue = 0
export default (params)=>{
    const boxDom = creatDom({
        tag:'div',
        
    })
    const showColor =creatDom({
        tag:'div',
        style:{
            width:'100%',
            height:'30px',
            background:'red',
            borderRadius:'4px',
            cursor:'pointer',
            
        }

    })
    const selectDom = creatDom({
        tag:'div',
        style:{
            // height:'200px',
            width:'100%',
            // background:'blue'
        }
        
    })
    const svSelevt = creatDom({
        tag:'div',
        style:{
            position:'relative',
            height:'112px',
            width:'268px',
            // background:'blue',
            marginTop:'4px',
            borderRadius:'4px',
            overflow:'hidden'
        },
        on:{
            click:(event,e)=>{
                
                let svDetail = svSelevt.getBoundingClientRect();
                let saturation = event.pageX - svDetail.left;
                let value = svDetail.bottom - event.pageY;
                const {r,g,b} = hsvToRgb({h:rangeValue*360,s:saturation,v:value})
                showColor.style.background = `rgb(${r},${g},${b})`
                params.on.change(event,`rgb(${r},${g},${b})`)
            }
        }
          
            // height:
    })
    const gradientBlack=creatDom({
        tag:'div',
        style:{
            width:'100%',
            height:'100%',
            background:'linear-gradient(180deg,transparent 0,#000)',
            borderRadius:'4px',
            position:'absolute',
            borderRadius:'4px',
            top:'0',
            left:'0',
            zIndex:1,
            cursor:'pointer',
            
        }
    })  
    const gradientWhite = creatDom({
        tag:'div',
        style:{
            width:'100%',
            height:'100%',
            background:'linear-gradient(270deg,transparent 0,#fff)',
            position:'absolute',
            borderRadius:'4px',
            top:'0',
            left:'0',
            cursor:'pointer',
            
        }
    })
    const rangeDom = creatDom({
        tag:'input',
        attr:{
            type:'range',
            min:0,
            max:1,
            step:0.05,
            value:rangeValue
        },
        style:{
            display:'block',
            width:'100%',
            height:'10px'
        },
        on:{
            change:(event,e)=>{
                rangeValue = e.value;
                const {r,g,b} = hsvToRgb({h:e.value*360,s:100,v:100})
                svSelevt.style.background = `rgb(${r},${g},${b})`
                // console.log()
                
            }
        }

    })

    const hSelect = creatDom({
        tag:'div',
        style:{
            height:'10px',
            borderRadius:'10px',
            marginTop:'10px',
            background:'linear-gradient(90deg,red,#ff2b00,#f50,#ff8000,#fa0,#ffd500,#ff0,#d4ff00,#af0,#80ff00,#5f0,#2bff00,#0f0,#00ff2b,#0f5,#00ff80,#0fa,#00ffd5,#0ff,#00d4ff,#0af,#007fff,#05f,#002bff,#00f,#2a00ff,#50f,#7f00ff,#a0f,#d400ff,#f0f,#ff00d4,#f0a,#ff0080,#f05,#ff002b)'
        }
    })
   svSelevt.appendChild(gradientBlack);
   svSelevt.appendChild(gradientWhite);
    hSelect.appendChild(rangeDom);
    selectDom.appendChild(hSelect)
    selectDom.appendChild(svSelevt)
    boxDom.appendChild(showColor)
    boxDom.appendChild(selectDom)
    return boxDom;
}