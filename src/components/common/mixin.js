import {debounce} from './utils'
import {POP,NEW,SELL} from './const'
import BackTop from 'components/content/backTop/BackTop'

export const itemListenerMixin = {
    // 两个组件复用代码:用混入
// 会应用在所有导入mixin的mounted中

data(){
    return {
        itemImgListener:null,
        refresh:null
    }
},
    mounted(){
        this.refresh=debounce(this.$refs.scroll.refresh,50)
this.itemImgListener = () => {
this.refresh()
}
this.$bus.$on('itemImageLoad',this.itemImgListener)
// console.log('我是混入中的内容')
    }
}

export const backTopMixin={
    components:{
        BackTop
    },
    data(){
        return {
            isShowBackTop:false

        }
    },
    methods:{
        backTop(){
            this.$refs.scroll.scrollTo(0,0,500)
          },
          listenShowBackTop(position){
            this.isShowBackTop= (-position.y) > 1000

          }
    }
}

export const tabControlMixin = {
    data:function(){
        return {
            currentType:POP
        }
    },
    methods:{
        tabClick(index){
            switch(index){
                case 0:
                    this.currentType = POP
                    break;
                case 1:
                    this.currentType = NEW;
                    break;
                case 2:
                    this.currentType = SELL;
                    break;
            }
            console.log(this.currentType)
        }
    }
}