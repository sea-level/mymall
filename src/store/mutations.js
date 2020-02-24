import {
    ADD_COUNTER,
    ADD_TO_CART
} from './mutation-types'
export default{
    [ADD_COUNTER](state,payLoad){
        payLoad.count++
      },
    [ADD_TO_CART](state,payLoad){
      payLoad.checked = true
        state.cartList.push(payLoad)
      }

       
    // addCart(state,payLoad){
    //    let oldProduct = null
    //   for(let item of state.cartList){
    //     if(item.iid == payLoad.iid){
    //       oldProduct = item
    //     }
    //   }
    //   if(oldProduct){
    //     oldProduct.count +=1
    //   }else{
    //     payLoad.count = 1
    //     state.cartList.push(payLoad)

    //   }// 判断商品是否已添加
     


      // 或者用Indexof
// let index = state.cartList.indexOf(payLoad)
// if(index !== -1){
//   let oldProduct = state.cartList[index]
//   oldProduct.count +=1
// }else{
//   payLoad.count = 1
// }
// state.cartList.push(payLoad)

// 数组常用方法
// push pop unshift shift cort reverse map filter reduce join

// 或者用find函数 find()后为true说明找到了 item会赋给product
// let product = state.cartList.find(function(item){
//   return item.iid === payLoad.iid
// })

// let oldProduct = state.cartList.find(item => {
//   item.iid == payLoad.iid
// })
// if(oldProduct){
//   oldProduct.count += 1
// }else{
//   payLoad.count = 1
//   state.cartList.push(payLoad)
// }
    // }
}