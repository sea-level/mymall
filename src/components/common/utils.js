 // 防抖动函数debounce
// 在时间间隔内等一会一起执行
export function debounce(func,delay){
let timer = null
return function(...args){
  if(timer) clearInterval(timer)
  timer = setTimeout(() => {
    func.apply(this,args)
    // settimeout中函数会加载到下一次循环的尾部 即延迟执行
  },delay)
}
}

export function formatDate(date, fmt) {
  // 获取年份
  if (/(y+)/.test(fmt)) {
    // RegExp.$1就是匹配到的东西 即'yyyy'
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    // 正则表达式 匹配字符串
    // y+:一个或多个y
    // y*:0个或多个y
    // y?:0个或1个y
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

// 不足两位前一位补0
function padLeftZero (str) {
  return ('00' + str).substr(str.length);
};

