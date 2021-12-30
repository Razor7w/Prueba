import { Module, VuexModule, Mutation } from 'vuex-module-decorators'

@Module({
  namespaced: true,
  name: 'LoginModule',
  stateFactory: true
})
export default class Login extends VuexModule {
  component = 'login-form'

  get currentComponent (): string {
    return this.component
  }

  @Mutation
  setComponent (payload: string): void {
    this.component = payload
  }
}
