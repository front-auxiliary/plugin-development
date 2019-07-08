export default(str,unit)=>{
    if(str){
        return str.replace(unit,'')
    }
    return str;
}