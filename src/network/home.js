import {request} from "./request";
// 对整个首页的请求进行管理
export function getHomeMultidata(){
    return request({
        url:'/home/multidata'
    })
}
export function getHomeGoods(type,page){
    return request({
        url:'/home/data',
        params:{
            type,
            page
        }
    })
}