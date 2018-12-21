import { router } from '../router/router'
import store from '../store/store'
import { getUrlParam, getCookie } from './tools'

const baseUrl = 'http://jmportal.kingyea.com.cn:8888/login?returnURL=';

// development
if(process.env.NODE_ENV === 'development'){
  router.beforeEach((to, from, next) => {
    let token = getUrlParam('token');
    if(!token){
      token = getCookie('token');
    }
    if(!token){
      window.location.href = baseUrl + window.location.href.replace(window.location.search,'');
    }else{
      document.cookie = 'token='+ token;
      store.commit('SET_TOKEN',token);
      // 判断当前是否是登录页面
      if (to.path === '/login') {
        next({ path: '/' });
      } else {
        next()
      }
    }
  });
}
