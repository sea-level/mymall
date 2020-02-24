<template>
<div id="home">
  
<nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
<!-- 复制一份tabcontrol对象 一开始隐藏 到位置显示 -->
<tab-control class="tab-control" 
            :titles="['流行','新款','精选']"
             @tabClick="tabClick"
             ref="tabControl1"
             v-show="isTabFixed"></tab-control>
<scroll class="wrapper" 
        ref="scroll" 
        :probe-type="3" 
        @scroll="contentScroll"
        :pull-up-load="true"
        @pullingUp="loadMore"> 
  <div class="content">
<home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
<recommend-view :recommends="recommends"></recommend-view>
<feature-view></feature-view>
<tab-control 
            :titles="['流行','新款','精选']"
             @tabClick="tabClick"
             ref="tabControl2"></tab-control>
<goods-list :goods="showGoods"></goods-list>
  </div>
 
</scroll>
<!-- 要给组件添加点击需要.native修饰符 -->
<back-top @click.native="backTop" v-show="isShowBackTop"></back-top>
 
  



</div>
</template>

<script>
// 子组件
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'
// 公共组件
import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'

import {getHomeMultidata,getHomeGoods} from "network/home"
import {debounce} from 'components/common/utils'
import {itemListenerMixin,backTopMixin} from 'components/common/mixin'


export default {
name:'Home',
components:{
  NavBar,
  HomeSwiper,
  RecommendView,
  FeatureView,
  TabControl,
  GoodsList,
  Scroll,
},
mixins:[itemListenerMixin,backTopMixin],
data(){
  // 请求的数据保存在data里就不会被销毁
return {
  banners:[],
  recommends:[],
  // result:null
  goods:{
    'pop':{page:0,list:[]},
    'new':{page:0,list:[]},
    'sell':{page:0,list:[]}
  },
  currentType:'pop',
  tabOffsetTop:0,
  isTabFixed:false,
  saveY:0,
}
},
computed:{
  showGoods(){
    return this.goods[this.currentType].list
  }
},
destroyed(){
// console.log('home destroyed')
},
// 记录页面位置
// 离开时记录页面位置saveY
// 进来时位置设置为saveY
activated(){
  // 进来时把位置恢复
  this.$refs.scroll.scrollTo(0,this.saveY,0)
  // 回来时对scroll进行刷新
  this.$refs.scroll.refresh()
},
deactivated(){
  // 1离开时记录位置
  this.saveY = this.$refs.scroll.getScrollY()
  console.log(this.saveY)
// 2离开时取消全局事件的监听
this.$bus.$off('itemImageLoad',this. itemImgListener)
},
created(){
  // created里只写主要逻辑
  // 具体的在methods里写
  // 请求多个数据
  this.getHomeMultidata()
  // 请求商品数据
  this.getHomeGoods('pop')
  this.getHomeGoods('new')
  this.getHomeGoods('sell')
 
},
mounted(){
  // 1 图片加载完的事件监听
  // 最好在mounted里监听
  // 防止获取的元素没有值
// 监听item中图片加载完成

// 将refresh函数传入到debounce函数 生成新函数 refresh
// const refresh=debounce(this.$refs.scroll.refresh,50)
// this.$bus.$on('itemImageLoad',() => {
  // 调用频繁时使用新函数
  // refresh()//不会很频繁调用 如果下一次执行来的非常快 会将上一次取消掉
  // console.log('-----')
  // 对refresh频繁问题解决:节流

// })
// 2 获取tabControl的offsetTop

  // 所有组件都有一个属性$el 用来获取组建中的元素
  // console.log(this.$refs.tabControl.$el.offsetTop)
// this.itemImgListener=() =>{
  // refresh()
// }
// this.$bus.$on('itemImageLoad',this.itemImgListener)

},
methods:{
// 事件监听的方法


tabClick(index){
  // console.log(index)
  switch(index){
    case 0:
      this.currentType='pop'
      break;
    case 1:
      this.currentType='new'
      break;
    case 2:
      this.currentType='sell'
      break;
  }
  // 解决点击会跳问题
  // 两个tabbar点击的index保持一致
  this.$refs.tabControl1.currentIndex = index
  this.$refs.tabControl2.currentIndex = index

},

contentScroll(position){
  // 1 判断BackTop是否显示
// 滚动值>1000才显示返回顶部
// this.isShowBackTop= (-position.y) > 1000
// 用混入
this.listenShowBackTop(position)
// 2 决定tabControl是否吸顶(position:fixed)
this.isTabFixed=(-position.y) > this.tabOffsetTop
},
loadMore(){
// console.log('加载更多')
this.getHomeGoods(this.currentType)
},
swiperImageLoad(){
this.tabOffsetTop=this.$refs.tabControl2.$el.offsetTop
},



  // 网络请求的方法
  getHomeMultidata(){
    getHomeMultidata().then(res => {
    // console.log(res)
    this.banners=res.data.data.banner.list;
    this.recommends=res.data.data.recommend.list;
    // this.result=res

  })
  },
  getHomeGoods(type){
    //page= 原来的页码+1
    const page=this.goods[type].page + 1
     getHomeGoods(type,page).then(res => {
      //  console.log(res)
       this.goods[type].list.push(...res.data.data.list)
        // 页码加1
        this.goods[type].page += 1
       
      //  完成上拉加载更多
      this.$refs.scroll.finishPullUp()
  })

  }

}
}
// 把一个数组内分内容复制到另一个数组中去
// let totalNums=[]
// const nums1=[20,11,222]
// 1 遍历
// for(let n of nums1){
//   totalNums.push(n)
// }
// 2....解析运算符 可以同时传多个参数以,隔开
// totalNums.push(...nums1)
</script>

<style scoped>
 /* scoped 仅在当前组件有效 */

#home{
  /* width: 100%; */
  /* margin-top:44px; */
  /* vh:视口 100%视口 */
  height: 100vh;
  position: relative;
}
.home-nav{
  background-color: var(--color-tint);
  color:#fff;
  /* position: fixed; */
  /* top:0;
  left:0;
  right:0; */
  /* z-index:9; */
}
.tab-control{
  /* 菜单停留效果 */
  /* position: sticky; 在scroll中无效 */
  /* 根据设置的高度值决定position是static还是fixed */

  /* top:44px; */

  /* 吸顶效果 */
  position: relative;
  z-index: 9;
}
.wrapper{
  /* height: 100%;
  方法1 计算 */
  /* height: calc(100% - 49px);
  方法2 定位 */
  position: absolute;
  top:44px;
  bottom: 49px;
  left:0;
  right: 0;
  overflow: hidden;
}
/* .fixed{
  position: fixed;
  left: 0;
  right: 0;
  top:44px;
} */
</style>