import Vue from 'vue'
import Vuex from 'vuex'
import RootState from './types'
import user from './modules/user'

Vue.use(Vuex);

const store = {
  modules: {
    user
  }
}

export default new Vuex.Store<RootState>(store);
