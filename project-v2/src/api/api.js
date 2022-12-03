import Service from '../service.js'
import qs from 'qs'

//登录api
export function login(data){
    return Service({
        method:'post',
        url:'/users/login',
        data
    })
}
//查询所有学生表的数据
export function students(params){
    return Service({
        method:'get',
        url:'/users/students',
        params
    })
}
//删除方法
export function Del(id){
    return Service({
        method:'get',
        url:'/users/students/del/'+id,//模板字符串
    })
}

//查询方法
export function Find(name){
    return Service({
        method:'get',
        url:'/users/students/find?name='+name
    })
}

//新增信息方法和修改信息接口
export function AddOrUpdate(type,data){
    data=qs.stringify(data);
    let obj={method:type,url:'/users/students/info',data}
    return Service(obj);
}

//查询信息方法接口
export function Info(){
    return Service({
        method:'get',
        url:'/users/students/info'
    })
}



export function InfoDel(id){
    return Service({
        method:'delete',
        url:'/users/students/info?id='+id,
        id
    })
}

//封装查询图形表的API
export function dataview(type){
    let obj={method:type,url:'/users/dataecharts'};
    return Service(obj);
}
