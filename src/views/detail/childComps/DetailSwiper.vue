<template>
 
     <swiper class="swiper-height">
          <swiper-item v-for="(item,index) in topImages" :key="index">
          <img :src="item">
          </swiper-item>
     </swiper>
  
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper'
// import {SwiperItem} from 'components/common/swiper/SwiperItem'
export default {
    name:'DetailSwiper',
    components:{
    Swiper,
    SwiperItem
    },
props:{
    topImages:{
        type:Array,
        default(){
            return []
        }
    }
}
}
</script>

<style scoped>
.swiper-height{
    height: 300px;
    overflow: hidden;
}
</style>