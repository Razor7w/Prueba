import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import AveModule from '@/store/modules/ave'
import DpaModule from '@/store/modules/dpa'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  modules: ['SessionModule']
})

export default new Vuex.Store({
  modules: {
    AveModule,
    DpaModule
  },
  plugins: [vuexLocal.plugin]
})
