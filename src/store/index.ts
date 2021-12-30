import Vue from 'vue'
import Vuex from 'vuex'
import ExampleModule from './modules/example_module'
import AppModule from '@/store/modules/app'
import LoginModule from '@/store/modules/login'
import SessionModule from '@/store/modules/session'
import MonitoreoModule from '@/store/modules/monitoreo'
import ProductsModule from '@/store/modules/products'
import ClientModule from '@/store/modules/client'
import ComandaModule from '@/store/modules/comanda'
import VuexPersistence from 'vuex-persist'
import AveModule from '@/store/modules/ave'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  modules: ['SessionModule']
})

export default new Vuex.Store({
  modules: {
    ExampleModule,
    AppModule,
    LoginModule,
    SessionModule,
    MonitoreoModule,
    ProductsModule,
    ClientModule,
    ComandaModule,
    AveModule
  },
  plugins: [vuexLocal.plugin]
})
