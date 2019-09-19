export default (params)=>{
    const {c,m,y,k} = params;
    for(let key in params){
        if(!params[key]){
            throw new Error(`${key}是必填项`);
        }
    }
    return {
        r:255*(100-c)*(100-k)/10000,
        g:255*(100-m)*(100-k)/10000,
        b:255*(100-y)*(100-k)/10000
    }
}