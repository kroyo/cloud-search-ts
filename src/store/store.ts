import Vue from 'vue'
import Vuex from 'vuex'
import { RootState } from './types'
import user from './modules/user'
import nav from './modules/nav'
import adv from './modules/adv'
import search from './modules/searchData';

Vue.use(Vuex);

const store = {
  modules: {
    user,
    nav,
    adv,
    search
  }
}

export default new Vuex.Store<RootState>(store);
