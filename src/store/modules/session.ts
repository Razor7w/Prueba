import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { UserData, UserSubmit } from '../session'
import { api } from './api'
import router from '@/router'
import { POSITION } from 'vue-toastification'
import Vue from 'vue'

@Module({
  namespaced: true,
  name: 'SessionModule',
  stateFactory: true
})
export default class SessionModule extends VuexModule {
  auth = false
  btnLoadingSession = false
  token = ''
  userData: UserData = {
    id: 0,
    name: '',
    email: '',
    email_verified_at: '',
    role: 0,
    created_at: '',
    updated_at: ''
  }

  get getBtnLoadingSession (): boolean {
    return this.btnLoadingSession
  }

  get isAuth (): boolean {
    return this.auth
  }

  get getUserData (): UserData {
    return this.userData
  }

  get getRole (): number {
    return this.userData.role
  }

  @Mutation
  changeBtnLoadingSession (payload: boolean): void {
    this.btnLoadingSession = payload
  }

  @Mutation
  changeAuth (payload: boolean): void {
    this.auth = payload
  }

  @Mutation
  changeUserData (payload: UserData): void {
    this.userData = payload
  }

  @Mutation
  changeToken (payload: string): void {
    this.token = payload
  }

  @Action
  login (user: UserSubmit): void {
    this.context.commit('changeBtnLoadingSession', true)
    api.post('login', user)
      .then(response => {
        // eslint-disable-next-line
        api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
        this.context.commit('changeToken', response.data.token)
        this.context.commit('changeUserData', response.data.user)
        this.context.commit('changeAuth', true)
        router.push('/inicio')
      })
      .catch(error => {
        Vue.$toast.error(error.response.data.message[0], {
          position: POSITION.BOTTOM_RIGHT
        })
      })
      .finally(() => {
        this.context.commit('changeBtnLoadingSession', false)
        // console.log('Finally')
      })
  }

  @Action
  logout (): void {
    const newObj = {
      id: 0,
      name: '',
      email: '',
      email_verified_at: '',
      role: 0,
      created_at: '',
      updated_at: ''
    }
    this.context.commit('changeUserData', newObj)
    this.context.commit('changeAuth', false)
    // eslint-disable-next-line
    api.defaults.headers.common['Authorization'] = ''
    router.push('/login')
  }
}
