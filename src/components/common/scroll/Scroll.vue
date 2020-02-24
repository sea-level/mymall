<template>
<!-- ref属性 可以给组件 元素等绑定
组件:this.$refs.refname获取组件对象
元素:this.$refs.refname获取元素对象 -->
<!-- 通过query方式可能会拿到别的组件同class元素 -->
  <div class="wrapper" ref="wrapper">
      <div class="content">
      <slot></slot>

      </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
name:'Scroll',
props:{
    probeType:{
        type:Number,
    default:0
    },
    pullUpLoad:{
        type:Boolean,
        default:false
    },
    data: {
		    type: Array,
        default: () => {
          return []
        }
      }
},
data(){
return {
    scroll:null
   
}

},
mounted(){
    // 1 创建BScroll对象
    this.scroll=new BScroll(this.$refs.wrapper,{
    click:true,
    // 各组件对监听要求不同
    probeType:this.probeType,
    pullUpLoad:this.pullUpLoad
    
    })
    // 2 监听滚动的位置
    if(this.probeType ===2 || this.probeType ===3){
        this.scroll.on('scroll',(position) => {
        // console.log(position)
        this.$emit('scroll',position)
    })
    }
    // console.log(this.scroll)
    // better-scroll根据scrollerHeight属性决定
    // 即根据content高度决定
    // 计算高度时图片未加载
    // 图片加载后高度并未变化
    // 滚动会出现问题(无法滚动)
    // 使用refresh进行每加载一张图片就重新计算高度
    this.scroll.refresh()

    // 3 上拉事件 监听scroll滚动到底部 
   if(this.pullUpLoad){
       this.scroll.on('pullingUp',() => {
        //    console.log('滚动到了底部')
        this.$emit('pullingUp')
       })
   }
    
},
methods:{
    //  scrollTo方法:返回位置
    scrollTo(x,y,time){
        // 为了防止scroll对象为空(没来得及初始化)
        this.scroll && this.scroll.scrollTo(x,y,time)
    },
    refresh(){
        // console.log('lalalal')
        this.scroll && this.scroll.refresh()
    },
    // scroll对象默认只能加载一次
    // 把加载行为完成后才能进行下一次加载
    finishPullUp(){
        this.scroll && this.scroll.finishPullUp()
    },
    getScrollY(){
        return this.scroll ? this.scroll.y : 0
    }
    
}
}
</script>

<style>

</style>