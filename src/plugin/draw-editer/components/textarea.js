import { creatDom } from '../../../utils';
export default (params)=>{
    let textareaDom =  creatDom.call(this, { 
        tag: 'textarea',
        style:{
            display:'block',
            width:'100%',
            height:'100px',
            borderRadius:'4px',
            border:'1px solid #d9d9d9',
           
        },
        attr:{
            name:params.name
        },
        on:params.on
    });
    return textareaDom;
}