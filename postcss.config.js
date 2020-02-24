module.exports = {
    plugins:{
        autoprefixer:{},
        "postcss-px-to-viewport":{
            // 设计稿的宽高
            viewportWidth:375,
            viewportHeight:667,
            // 小数位数
            unitPrecision:5,
            // 需要转换成的视窗单位
            viewportUnit:'vw',
            // 不需要转换的类
            selectorBlackList:['ignore','tab-bar','tab-bar-item'],
            // 最小转换单位
            minPixelValue:1,
            // 是否允许在媒体查询中转换
            mediaQuery:false,
            // exclude中存放的元素必须是正则表达式
            // exclude:[/TabBar/]
        }
    }
}
// px转em或vm
// 安装插件:postcss-px-to-viewport
// 在js中使用正则:/.../
// ^abc 以abc开头
// abc$ 以abc结尾