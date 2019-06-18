export default function(dom,styles){
    let newDom = {...dom};
    if(typeof styles == 'object'){
        for(let key in styles){
            newDom[key] = styles[key]
        }

    }
    return newDom;
}