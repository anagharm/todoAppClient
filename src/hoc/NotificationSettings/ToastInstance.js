import { toast } from 'react-toastify'

toast.configure()

const ToastInstance = (type,msg) => {
    switch(type){
        case 'Success' :
            toast.success(msg,{position:toast.POSITION.TOP_RIGHT})
            break;
        case 'Error' : 
            toast.error(msg,{position:toast.POSITION.TOP_RIGHT})
            break;
        case 'Warning' : 
            toast.warn(msg,{position:toast.POSITION.TOP_RIGHT})
            break;
        case 'Information' : 
            toast.info(msg,{position:toast.POSITION.TOP_RIGHT})
            break;
        case 'Basic' : 
        default :
            toast(msg,{position:toast.POSITION.TOP_RIGHT})
            break;
    }
    // toast(msg,{position:toast.POSITION.TOP_RIGHT})
}

export default ToastInstance