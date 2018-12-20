// Date prototype 扩展
class dateExpen extends Date {
  format(fmt: string) {
    interface dateObject {
      [propName: string]: any;
    }
    let dateFormat: dateObject = {
      "M+": this.getMonth() + 1, //月份
      "d+": this.getDate(), //日
      "h+": this.getHours(), //小时
      "m+": this.getMinutes(), //分
      "s+": this.getSeconds(), //秒
      "q+": Math.floor((this.getMonth() + 3) / 3), //季度
      "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (let k in dateFormat)
      if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (dateFormat[k]) : (("00" + dateFormat[k]).substr(("" + dateFormat[k]).length)));
    return fmt;
  }
  showDate() {
    return this.format('yyyy-MM-dd');
  }
  showTime() {
    return this.format('hh:mm:ss')
  }
  toLocaleString() {
    return this.format('yyyy年MM月dd日hh:mm:ss');
  }
}

// 获取url参数方法
function getUrlParam(name: string) {
  let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  let r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]); return null;
}
// 获取cookie参数
function getCookie(name: string) {
  let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg))
    return unescape(arr[2]);
  else
    return null;
}
// 删除cookie
function delCookie(name: string) {
  let exp = new Date();
  exp.setTime(exp.getTime() - 1);
  let cval = getCookie(name);
  if (cval != null)
    document.cookie = name + "=" + cval + ";expires=" + exp.toUTCString();
}

export { dateExpen, getUrlParam, getCookie, delCookie }