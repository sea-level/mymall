<template>
  <div id="details">
      <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
      <scroll class="content"
                 ref="scroll"
                  :probe-type="3"
                   @scroll="contentScroll">
        
          <div>
        <detail-swiper :top-images="topImages"></detail-swiper>
        <detail-base-info :goods="goods"></detail-base-info>
        <detail-shop-info :shop="shop"></detail-shop-info>
        <detail-goods-info :detail-info="detailInfo"  @detailImageLoad="detailImageLoad"></detail-goods-info>
        <detail-param-info ref="param" :param-info="paramInfo"></detail-param-info>
        <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
        <goods-list ref="recommend" :goods="recommends"></goods-list>
          </div>
      </scroll>
      <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
      <back-top @click.native="backTop" v-show="isShowBackTop"></back-top>
        <toast :message="message" :show="show"></toast>
  </div>
  
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from  './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'



import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'
import Toast from '../../components/common/toast/Toast'

import {getDetail,Goods,Shop,GoodsParam,getRecommend } from "network/detail"
import {debounce} from 'components/common/utils'
import {itemListenerMixin,backTopMixin} from 'components/common/mixin'
import {mapActions} from 'vuex'
export default {
name:'Detail',
data(){
    return {
        iid:null,
        topImages:[],
        goods:{},
        shop:{},
        detailInfo:{},
        paramInfo:{},
        commentInfo:{},
        recommends:[],
        themeTopYs:[],
        getThemeTopY:null,
        curentIndex:null,
        message:'',
        show:false
    }
},
components:{
    DetailNavBar,
     DetailSwiper,
     DetailBaseInfo,
     DetailShopInfo,
     Scroll,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
       GoodsList,
       DetailBottomBar,
       Toast
},
mixins:[itemListenerMixin,backTopMixin],
created(){
    // 1 保存传入的iid
    this.iid = this.$route.params.iid
    // 2 根据iid请求详情数据
    getDetail(this.iid).then(res => {
        console.log(res)
        const data = res.data.result
        // 1.获取轮播数据
        this.topImages=res.data.result.itemInfo.topImages
        // 2.获取商品信息
        this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
        // 3.创建店铺信息的对象
        this.shop = new Shop(data.shopInfo)
        // 4.保存商品的详情数据
        this.detailInfo = data.detailInfo
        // 5.获取参数的信息
        this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
        // 6.取出评论信息
        if(data.rate.cRate !== 0){
            this.commentInfo=data.rate.list[0]
        }
        // 1 第一次获取 值不对 
        // 原因:this.$refs.param.$el没渲染
        //  this.themeTopYs=[]
        //     this.themeTopYs.push(0);
        //     this.themeTopYs.push(this.$refs.param.$el.offsetTop)
        //     this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        //     this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        //     console.log(this.themeTopYs)
// 下一帧 所有东西渲染完回调的函数


            // 2 第二次获取 值不对
            // 原因:图片没有计算在内
            // dom渲染完了 但是图片没有加载完
            // offsettop出现问题一般是因为图片
        // this.$nextTick(() => {
            
        //     this.themeTopYs=[]
        //     this.themeTopYs.push(0);
        //     this.themeTopYs.push(this.$refs.param.$el.offsetTop)
        //     this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        //     this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        //     console.log(this.themeTopYs)
        // })
    
    })
    // 3 请求推荐数据
    getRecommend().then(res => {
        console.log(res)
        this.recommends=res.data.data.list
    })
    // 4 给getThemeTopY赋值 (进行防抖 防止打印多次)
    this.getThemeTopY = debounce(() => {
        this.themeTopYs=[]
            this.themeTopYs.push(0);
            this.themeTopYs.push(this.$refs.param.$el.offsetTop - 44)
            this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44)
            this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44)
            this.themeTopYs.push(Number.MAX_VALUE)
            console.log(this.themeTopYs)
    },100)

},
mounted(){
    // detail和home中的mounted都有相同的代码
    // 继承 可以给类减少重复代码
    // class Animal{
    //     run(){

    //     }
    // }
    // class Person extends Animal{
       
    // }
    // class Dog extends Animal{
        
    // }
    // 混入 mixin


},
updated(){
// this.themeTopYs=[]
//     this.themeTopYs.push(0);
// this.themeTopYs.push(this.$refs.param.$el.offsetTop)
// this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
// this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
// console.log(this.themeTopYs)
},
destroyed(){
this.$bus.$on('itemImageLoad',this.itemImgListener)
},
methods:{
    ...mapActions({
        add:'addCart'
    }),
    // imageLoad(){
    //     this.$refs.scroll.refresh()
    // },
    detailImageLoad(){
        this.refresh()
        // this.$refs.scroll.refresh()

        this.getThemeTopY()

    },
    titleClick(index){
        console.log(index)
        this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],200)
    },
    contentScroll(position){
        // 1 获取y值
        const positionY = -position.y
        // 2 与主题中Y四个值进行对比
        // [0,7938,9120,9456]
        // 0-7938 index=0,7938-9120 index=1
        // 9120-9456 index=2,9120... index=3
            let length = this.themeTopYs.length

        // for(let i=0;i<this.themeTopYs.length;i++){
        //     // 这种情况3取不到
        //     // if(positionY > this.themeTopYs[parseInt(i)] && positionY < this.themeTopYs[i+1]){
        //     //     console.log(i)
        //     // }
        //     // this.curentIndex !==i判断是否一致 防止重复打印
        //     if(this.curentIndex !==i && ((i<length - 1 && positionY >= this.themeTopYs[parseInt(i)] && positionY <
        //      this.themeTopYs[i+1]) || (i === length-1 && positionY >= this.themeTopYs[i]) )){
        //         this.curentIndex = i;
        //     //  console.log(this.curentIndex)
        //      this.$refs.nav.currentIndex = this.curentIndex
        //      }

        // 另外一种思路[0,7938,9120,9456,特别大的一个值(Number.MAX_VALUE)]
        for(let i=0;i<length-1;i++){
            if(this.curentIndex !==i && (positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i+1])){
                this.curentIndex = i;
             this.$refs.nav.currentIndex = this.curentIndex
            }
        }
            
        // 是否显示回到顶部
        this.listenShowBackTop(position)
        },
        addToCart(){
            // 1获取购物车需要展示的信息
            const product = {}
            product.image = this.topImages[0]
            product.title = this.goods.title
            product.desc = this.goods.desc
            product.price = this.goods.realPrice
            product.iid = this.iid
            // 2将商品添加到购物车
            // this.$store.commit('addCart',product)
            // this.$store.dispatch('addCart',product).then(res => {
            //     console.log(res)
            // })

            // 用mapactions把方法映射到本地
            this.add(product).then(res => {
                // console.log('111')
                this.show = true;
                this.message = res;

                setTimeout(() => {
                    this.show = false;
                    this.message = ''
                },1500)

                // this.$toast.show(res,20000)
                // console.log(this.$toast)
            })
        }
    }


}

</script>

<style scoped>
#details{
    position: relative;
    z-index:9;
    background-color: #fff;
    height: 100vh;
}
.detail-nav{
    position:relative;
    z-index:9;
    background-color: #fff;
}
.content{
    /* position: absolute; */
    /* top:44px; */
    /* bottom: 60px; */
    left: 0;
    right: 0;
    height: calc(100% - 44px - 58px);
    overflow:hidden;
}
</style>