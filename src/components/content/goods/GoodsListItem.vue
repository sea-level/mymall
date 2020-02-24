<template>
  <div class="goods-item" @click="itemClick">
      <img v-lazy="showImage" :key="showImage" @load="imageLoad">
      <div class="goods-info">
          <p>{{goodsItem.title}}</p>
          <span class="price">{{goodsItem.price}}</span>
          <span class="collect">{{goodsItem.cfav}}</span>

      </div>
  </div>
</template>

<script>
// 事件总线
// 组件之间距离太远用到
// 默认情况$bus为空 需要给原型赋值vue实例
// 放射事件this.$bus.$emit('aaa',参数)
// 监听事件this.$bus.$on('aaa',{})
export default {
name:'GoodsListItem',
props:{
    goodsItem:{
        type:Object,
        default(){
            return {}
        }
    }
},
mounted:function(){
// console.log(this.goodsItem)
},
computed:{
    showImage(){
        return this.goodsItem.image || this.goodsItem.show.img || this.goodsItem.img
    }
},
methods:{
    // load监听图片加载完成
    imageLoad(){
        // console.log('imageLoad')
        this.$bus.$emit('itemImageLoad')

// 区分首页和详情页不同来发送不同的图片加载事件
        // if(this.$route.path.indexOf('/home')){
        // this.$bus.$emit('itemImageLoad')

        // }else if (this.$route.path.indexOf('./detail')){
        //     this.$bus.$emit('detailItemImgLoad')
        // }
    },
    itemClick(){
       this.$router.push('/detail/'+this.goodsItem.iid)
       
    }
}
}
</script>

<style scoped>

.goods-item{
    padding-bottom: 40px;
    position: relative;
    width: 48%;
}
.goods-item img {
    width: 100%;
    border-radius: 5px;
}
.goods-info{
font-size: 12px;
position: absolute;
bottom: 5px;
left: 0;
right: 0;
overflow: hidden;
text-align: center
}
.goods-info p{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
}
.goods-info .price{
    color: var(--color-high-text);
    margin-right: 20px;
}
.goods-info .collect{
    position: relative;
}
.goods-info .collect::before{
    content:'';
    position: absolute;
    left: -15px;
    top:-1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>