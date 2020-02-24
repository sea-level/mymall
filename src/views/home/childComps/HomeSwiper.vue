<template>
  <swiper>
  <swiper-item v-for="item in banners">
    <a :href="item.link">
      <img :src="item.image" @load="imageLoad">
    </a>
  </swiper-item>
</swiper>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper'
export default {
name:'HomeSwiper',
props:{
    banners:{
        type:Array,
        default(){
            return []
        }
    }
},
data(){
return {
  isLoad:false
}
},
components:{
    Swiper,
    SwiperItem
},
methods:{
  imageLoad(){
    // console.log('-----')
    // 变量记录有没有发出过事件
    // 控制只需发出一次事件
    if(!this.isLoad){
      this.$emit('swiperImageLoad')
      this.isLoad = true
    }
  }
}
}
</script>

<style>

</style>