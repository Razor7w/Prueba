import { Module, VuexModule, Mutation, Action, MutationAction } from 'vuex-module-decorators'

@Module({
  namespaced: true,
  name: 'ExampleModule',
  stateFactory: true
})
export default class ExampleModule extends VuexModule {
  example = false
  public email!: string;

  get isExample (): boolean {
    return this.example
  }

  @Mutation
  setExample (payload: boolean): void {
    this.example = payload
  }

  @Action({ commit: 'setItem' })
  actionExample (): string | undefined {
    if (this.example) {
      return 'respuesta'
    }
  }

  @MutationAction
  // eslint-disable-next-line
  public async updateEmail (newEmail: string): Promise<object> {
    return { email: newEmail }
  }
}
