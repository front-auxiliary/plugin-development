import { creatDom,hsvToRgb,colorHex } from '../../../utils';
var rangeValue = 0.5
const defaultRgb = hsvToRgb({h:rangeValue*360,s:100,v:100})

const defaultColor = `rgb(${defaultRgb.r},${defaultRgb.g},${defaultRgb.b})`
export default (params)=>{
    let boxDom = null,
          showColor = null,
          selectDom = null,
          showHex = null,
          svSelevt = null,
          gradientBlack = null,
          gradientWhite = null,
          rangeDom = null,
          hSelect = null;

    boxDom = creatDom({
        tag:'div',
        style:{
            position:'relative',
            zIndex:10
        }
        
    })
    showColor =creatDom({
        tag:'div',
        style:{
            width:'50px',
            height:'30px',
            background:defaultColor,
            borderRadius:'4px',
            cursor:'pointer',
            
        },
        on:{
            click:()=>{
                let display =  selectDom.style.display;
                if(display == 'none'){
                    selectDom.style.display = 'block';
                }else{
                    selectDom.style.display = 'none';
                }
            }
        }

    })
    selectDom = creatDom({
        tag:'div',
        style:{
            // height:'200px',
            width:'100%',
            position:'absolute',
            width:'268px',
            display:'none',
            boxShadow:'0 0 0 1px rgba(14,19,24,.07), 0 2px 12px rgba(14,19,24,.2)',
            padding:'5px',
            marginTop:'5px',
            borderRadius:'4px',
            zIndex:999

            // background:'blue'
        }
        
    })
    showHex = creatDom({
        tag:'input',
        attr:{
            value:''
        },
        style:{
            width:'100%',
            width:'268px',
            background: '#fff',
            borderColor: 'rgba(14,19,24,.2)',
            borderRadius: '4px',
            padding: '9px 12px 10px',
            border: '1px solid rgba(14,19,24,.2)',
            cursor: 'text',
            textAlign:'center',
            boxSizing:'border-box',
            outline:'none',
            marginTop:'5px'
        },
        on:{
            input:(event,e)=>{
                let reg = /^[0-9a-zA-Z]*$/g;
                let value = e.value;
                if(reg.test(value)){
                    
                }
               
            }
        }
    })
    svSelevt = creatDom({
        tag:'div',
        style:{
            position:'relative',
            height:'112px',
            width:'268px',
            background:defaultColor,
            marginTop:'4px',
            borderRadius:'4px',
            overflow:'hidden'
        },
        on:{
            click:(event,e)=>{
                
                let svDetail = svSelevt.getBoundingClientRect();
                let saturation = 100*(event.clientX - svDetail.left)/268;
                // console.log()
                let value = 100*(svDetail.bottom - event.clientY)/112;
                console.log(value)
              
                const {r,g,b} = hsvToRgb({h:rangeValue*360,s:saturation,v:value})
                showColor.style.background = `rgb(${r},${g},${b})`
                params.on.change(event,`rgb(${r},${g},${b})`)
                showHex.value = colorHex(`rgb(${r},${g},${b})`)
            }
        }
          
            // height:
    })
    gradientBlack=creatDom({
        tag:'div',
        style:{
            width:'100%',
            height:'100%',
            background:'linear-gradient(180deg,transparent 0,#000)',
            // borderRadius:'4px',
            position:'absolute',
            // borderRadius:'4px',
            top:'0',
            left:'0',
            zIndex:1,
            cursor:'pointer',
            
        }
    })  
    gradientWhite = creatDom({
        tag:'div',
        style:{
            width:'100%',
            height:'100%',
            background:'linear-gradient(270deg,transparent 0,#fff)',
            position:'absolute',
            // borderRadius:'4px',
            top:'0',
            left:'0',
            cursor:'pointer',
            
        }
    })
    rangeDom = creatDom({
        tag:'input',
        attr:{
            type:'range',
            min:0,
            max:0.99,
            step:0.01,
            value:rangeValue,
            defaultValue:rangeValue
        },
        style:{
            display:'block',
            width:'101%',
            height:'10px',
            outline:'none',
            marginLeft:'-1px'
        },
        on:{
            input:(event,e)=>{
                rangeValue = e.value;
                // console.log(rangeValue*360,"jjjj")
                const {r,g,b} = hsvToRgb({h:rangeValue*360,s:100,v:100})
                svSelevt.style.background = `rgb(${r},${g},${b})`
                // console.log()
                
            }
        }

    })
    
    hSelect = creatDom({
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
    // selectDom.appendChild(showHex)
    return boxDom;
}