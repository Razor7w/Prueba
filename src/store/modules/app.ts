import { Module, VuexModule, Mutation } from 'vuex-module-decorators'

@Module({
  namespaced: true,
  name: 'AppModule',
  stateFactory: true
})
export default class AppModule extends VuexModule {
  drawer = false
  color = 'success'
  image = ''
  test = process.env.VUE_APP_TEST_MODE

  get isTest (): boolean {
    return this.test
  }

  @Mutation
  setDrawer (payload: boolean): void {
    this.drawer = payload
  }

  @Mutation
  toggleDrawer (): void {
    this.drawer = !this.drawer
  }
}
