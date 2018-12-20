import axios from 'axios'
import { getCookie } from '../util/tools'

const baseURL = process.env.NODE_ENV === 'development' ? '/ap1' : '';


// 本地开发时使用 调用实际接口数据
if(process.env.NODE_ENV === 'development'){
  axios.interceptors.request.use(
    (config: any) => {
      let token = getCookie('token');
      if (token) { // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
        config.headers.token = `${token}`;
        return config
      }
      window.location.href = 'http://jmportal.kingyea.com.cn:8888/login?returnURL='+window.location.href.replace(window.location.search,'');
    },
    (err: any) => {
      return Promise.reject(err)
    }
  );
}

//api管理
// 用户信息管理
export const userInfo = () => {
  return axios.post(baseURL + '/user/info').then((res) => {
    if (res.status == 200) {
      return res;
    } else if (res.status == 302) {
      window.location.href = res.data.portal;
    }
  }).catch((error) => {
    console.log('出错', error.response.status);
    if (error.response.status == 302) {
      window.location.href = error.response.data.portal;
    }
  });
};
export const homeInfo = () => {
  return axios.post(baseURL + '/categories').then((res) => {
    if (res.status == 200) {
      return res;
    } else if (res.status == 302) {
      window.location.href = res.data.portal;
    }
  }).catch((error) => {
    console.log('出错', error.response.status);
    if (error.response.status == 302) {
      window.location.href = error.response.data.portal;
    }
  });
};