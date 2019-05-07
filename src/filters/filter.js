export function formatDates (date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
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

function padLeftZero (str) {
  return ('00' + str).substr(str.length);
};
//毫秒过滤成分秒
export function formatDate (mss) {
  let minutes = Math.floor((mss % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.round((mss % (1000 * 60)) / 1000);
  let ss=seconds>=10? seconds:"0"+seconds
  return  minutes + ":" +ss;
}
