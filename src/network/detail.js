import {request} from './request'
export function getDetail(iid){
    return request({
        url:'./detail',
        params:{
            iid
        }
    })
}    


export function getRecommend(){
    return request({
        url:'./recommend'
    })
}
// es6创建类
export class Goods {
    constructor(itemInfo,columns,services){
        this.title = itemInfo.title
        this.desc = itemInfo.desc
        this.newPrice = itemInfo.price
        this.oldPrice = itemInfo.oldPrice
        this.discount = itemInfo.discountDesc
        this.columns = columns
        this.services = services
        this.realPrice = itemInfo.lowNowPrice
    }
}          

// class Person{
//     constructor(name,age){
//         this.name=name;
//         this.age=age;
//     }
// }
// const p =new Person('why',18)
export class Shop{
    constructor(shopInfo) {
        this.logo = shopInfo.shopLogo;
        this.name = shopInfo.name;
        this.fans = shopInfo.cFans;
        this.sells = shopInfo.cSells;
        this.score = shopInfo.score;
        this.goodsCount = shopInfo.cGoods
    }
}

export class GoodsParam {
    constructor(info,rule){
        // image可能没有值
        this.image = info.images? info.images[0]:'';
        this.infos = info.set;
        this.sizes = rule.tables;
    }
}
