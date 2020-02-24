<template>
  <div v-if="Object.keys(detailInfo).length !== 0" class="goods-info">
      <div class="info-desc clear-fix">
          <div class="start"></div>
          <div class="desc">{{detailInfo.desc}}</div>
          <div class="end"></div>
      </div>
      <div class="info-key">{{detailInfo.detailImage[0].key}}</div>
      <div class="info-list">
          <img v-for="(item,index) in detailInfo.detailImage[0].list" :key="index" :src="item" @load="imgLoad">
      </div>
  </div>
</template>

<script>
export default {
name:'DetailGoodsInfo',
props:{
    detailInfo:{
        type:Object,
        default(){
            return {}
        }
    }
},
data(){
    return {
         counter:0,
        imagesLength:0
    }
},
methods:{
    imgLoad(){
        // 一个判断
// 计数器计算图片数目 加载完一个图片+1
        // 当所有图片加载完成(和图片长度保持一致)
        // 完成一次回调
        // if(++this.counter === this.imagesLength){
        //     this.$emit('imageLoad')
        // }
        // 方法2
        this.$emit('detailImageLoad')
    }
},
watch:{
    // 监听属性的变化 一旦变化赋予新的值
    detailInfo(){
        this.imagesLength = this.detailInfo.detailImage[0].list.length
    }
}
}
</script>

<style scoped>
  .goods-info {
    padding: 20px 0;
    border-bottom: 5px solid #f2f5f8;
  }

  .info-desc {
    padding: 0 15px;
  }

  .info-desc .start, .info-desc .end {
    width: 90px;
    height: 1px;
    background-color: #a3a3a5;
    position: relative;
  }

  .info-desc .start {
    float: left;
  }

  .info-desc .end {
    float: right;
  }

  .info-desc .start::before, .info-desc .end::after {
    content: '';
    position: absolute;
    width: 5px;
    height: 5px;
    background-color: #333;
    bottom: 0;
  }

  .info-desc .end::after {
    right: 0;
  }

  .info-desc .desc {
    padding: 15px 0;
    font-size: 14px;
  }

  .info-key {
    margin: 10px 0 10px 15px;
    color: #333;
    font-size: 15px;
  }

  .info-list img {
    width: 100%;
  }
</style>
