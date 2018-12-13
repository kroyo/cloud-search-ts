import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const routes = [
  {
    path: '/',
    name: 'home',
    meta : {
      requireAuth : true
    },
    component : () => import('@/views/Home.vue')
  },
];

export default new Router({
  routes
});
