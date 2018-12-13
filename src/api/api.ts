import axios from 'axios'
import store from '../store/store'

// const baseURL = process.env.NODE_ENV === 'development' ? 'https://www.easy-mock.com/mock/5b87537a43440226c7285fdf' : '';
const baseURL = process.env.NODE_ENV === 'development' ? '/ap1' : '';
const baseURL2 = process.env.NODE_ENV === 'development' ? '/ap1' : '';
const Qs = require('qs');


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

