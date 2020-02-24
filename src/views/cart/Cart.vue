<template>
<div class="cart">
<nav-bar class="nav-bar">
  <div slot="center">购物车({{length}})</div>
</nav-bar>
<cart-list></cart-list>
<cart-bottom-bar @calcClick="cClick" ></cart-bottom-bar>
<toast :show="show" :message="message"></toast>
</div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import CartList from './childComps/CartList'
import CartBottomBar from './childComps/CartBottomBar'
import Toast from '../../components/common/toast/Toast'
// mapgetters 映射到局部的计算属性
// 把getter中的内容应用到这个组件的计算属性中
import {mapGetters} from 'vuex'
export default {
  name:'Cart',
  data(){
    return{
      show:false,
      message:''
    }
  },
  components:{
    NavBar,
    CartList,
    CartBottomBar,
    Toast
  },
  computed:{
    // 语法一 写数组 一一对应
    // ...mapGetters(['cartLength','cartList'])
    // 语法二 写对象 名称可以自定义(本次使用)
    ...mapGetters({
      // 可以将getters中的计算属映射到组件的computer上来
      // length映射到getters.js的cartlength
      length:'cartLength',
    })
  },
  methods:{
     
    cClick(){
console.log('111')
                this.show = true
                this.message = '请添加商品'

                setTimeout(() => {
                    this.show = false
                    this.message = ''
                },1500)   
  }
  }
}
</script>

<style scoped>
.cart{
  height: 100vh;
}
.nav-bar{
  background-color: var(--color-tint);
  color: #fff;
}
</style>