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

export default dateExpen;