import Vue from 'vue'
import Vuex from 'vuex'
import { RootState } from './types'
import user from './modules/user'
import nav from './modules/nav'

Vue.use(Vuex);

const store = {
  modules: {
    user,
    nav
  }
}

export default new Vuex.Store<RootState>(store);
