<template>
  <div class="tab-bar-item" @click="itemClick">
      <div v-if="!isActive"><slot   name="item-icon"></slot></div>
      <div v-else><slot name="item-icon-active"></slot></div>
      
      <!-- 给文字加class属性 需包裹一个div -->
      <!-- 实现字体颜色完全封装 绑定style -->
     <div :style="activeStyle" >
    <slot name="item-text"></slot>

     </div>
  </div>
</template>

<script>
export default {
    name:'TabBarItem',
    props:{
        path:String,
        activeColor:{
            type:String,
            default:'#d81e06'
        }
    },
    data(){
        return {
            // isActive:false
        }
    },
    computed:{
isActive(){
    // indexOf:判断后面的包不包含于前面 ==-1说明没有找到
    return this.$route.path.indexOf(this.path) !== -1
},
// 因为绑定的style有点复杂 所以写到计算属性里面
activeStyle(){
    // 是否为激活状态?是:传过来的颜色 否:不改变
    return this.isActive ? {color:this.activeColor}:{}
}
    },
    methods:{
        itemClick(){
          this.$router.replace(this.path)
        }
    }
}
</script>

<style>

.tab-bar-item{
  /* 均分 */
  flex:1;
  text-align: center;
  /* 开发一般高度:49 */
  height: 49px;
  font-size: 14px;
}
.tab-bar-item img{
  width:24px;
  height: 24px;
   vertical-align: middle;
 margin-top:5px;
}
/* .active{
color:#d81e06;
} */
</style>