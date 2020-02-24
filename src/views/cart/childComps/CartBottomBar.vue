<template>
  <div class="bottom-bar">
      <div class="check-content">
      <check-button :isChecked="isSelectAll" 
                    class="check-button"
                    @click.native="checkClick"></check-button>
        <span>全选</span>
        
      </div>
      <div class="price">
          合计: {{totalPrice}}
      </div>
      <div class="calculate" @click="calcClick">
          去计算({{checkLength}})
      </div>
      
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'
import { mapGetters } from 'vuex'
export default {
name:'CartBottomBar',
components:{
    CheckButton
},
computed:{
    ...mapGetters(['cartList']),
    totalPrice(){
        return '¥' + this.cartList.filter(item => {
            return item.checked
        }).reduce((preValue,item) => {
            return preValue + item.price * item.count
        },0).toFixed(2)
    },
    checkLength(){
        return this.cartList.filter(item => item.checked).length
    },
    isSelectAll(){
        // 购物车没有东西 全选显示false
        if(this.cartList.length === 0) return false
        // 1 方法一 使用filter
        // 数字取反为false
        // 若有不被选中的,不选中length不为0 取反为false
        // if(this.cartList.length === 0) return false
        // return !(this.cartList.filter(item => !item.checked).length)
        // 2 方法二 使用find
        // find找到 返回true 若有不被选中的 返回!true=false
        // return !this.cartList.find(item => !item.checked)

        // 3 方法三 普通遍历
        for(let item of this.cartList){
            if(!item.checked){
                return false
            }
        }
        // 没有找到 返回true
        return true
    }
},
methods:{
    checkClick(){
        if(this.isSelectAll){
            // 全部选中变全部不选中
            this.cartList.forEach(item => item.checked = false)
        }else{
            // 部分不选中变全部选中
            this.cartList.forEach(item => item.checked = true)
        }


    },
    calcClick(){
           if(!this.isSelectAll){
            //    this.$toast.show('请选择购买的商品',2000)
            this.$emit('calcClick')
           } 
        }

}
}
</script>

<style scoped>
.bottom-bar{
    height: 40px;
    line-height: 40px;
    background-color: #eee;
    position: relative;
    bottom: 135px;
    display: flex;
    font-size: 14px;
}
.check-content{
    display: flex;
    /* line-height: 40px; */
    align-items: center;
    margin-left: 10px;
    width: 60px;

}
.check-button{
width: 20px;
height: 20px;
line-height: 20px;
margin-right: 5px;
}
.price{
    margin:0 20px;
    flex:1;
}
.calculate{
    width: 80px;
    background-color: red;
    color: #fff;
    text-align: center;
}
</style>