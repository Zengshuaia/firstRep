import axios from "axios";
import { getToken } from '../src/utils/setToken.js';
// import { Message } from "element-ui";


const service=axios.create({
    baseURL:'/api',
    timeout:3000//如果请求超过这个时间就会中断请求
})

//添加请求拦截器
service.interceptors.request.use((config)=>{
    //在请求前做的事情 获取并设置token
    config.headers['token']=getToken('token');//获取token
    return config
},(error)=>{
    return Promise.reject(error);
})

//添加响应拦截器
service.interceptors.response.use((response)=>{
    //对响应的数据做什么
    // let {state,message}=response.data;
    // if(state!==200){
    //     // Message({message:message || 'error',type:'warning'})
    // }
    return response;
},(error)=>{
    return Promise.reject(error);
}

)

export default service