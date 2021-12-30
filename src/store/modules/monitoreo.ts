import { Module, VuexModule, Mutation, Action, MutationAction } from 'vuex-module-decorators'

interface TableIncidents {
  [index: number]: {
    createAt: string;
    client: number;
    descriptionIncident: number;
    reportingUser: number;
    cantEvidence: number;
  }
}

@Module({
  namespaced: true,
  name: 'MonitoreoModule',
  stateFactory: true
})
export default class MonitoreoModule extends VuexModule {
  component = ''
  example = false
  public email!: string;
  tableIncidentes: TableIncidents = []
  loadingTableIncidentes = true

  tableIncidentesPrueba = [
    {
      createAt: 'Frozen Yogurt',
      client: 159,
      descriptionIncident: 6.0,
      reportingUser: 24,
      cantEvidence: 4.0
    },
    {
      createAt: 'Ice cream sandwich',
      client: 237,
      descriptionIncident: 9.0,
      reportingUser: 37,
      cantEvidence: 4.3
    },
    {
      createAt: 'Eclair',
      client: 262,
      descriptionIncident: 16.0,
      reportingUser: 23,
      cantEvidence: 6.0
    },
    {
      createAt: 'Cupcake',
      client: 305,
      descriptionIncident: 3.7,
      reportingUser: 67,
      cantEvidence: 4.3
    },
    {
      createAt: 'Gingerbread',
      client: 356,
      descriptionIncident: 16.0,
      reportingUser: 49,
      cantEvidence: 3.9
    },
    {
      createAt: 'Jelly bean',
      client: 375,
      descriptionIncident: 0.0,
      reportingUser: 94,
      cantEvidence: 0.0
    },
    {
      createAt: 'Lollipop',
      client: 392,
      descriptionIncident: 0.2,
      reportingUser: 98,
      cantEvidence: 0
    },
    {
      createAt: 'Honeycomb',
      client: 408,
      descriptionIncident: 3.2,
      reportingUser: 87,
      cantEvidence: 6.5
    },
    {
      createAt: 'Donut',
      client: 452,
      descriptionIncident: 25.0,
      reportingUser: 51,
      cantEvidence: 4.9
    },
    {
      createAt: 'KitKat',
      client: 518,
      descriptionIncident: 26.0,
      reportingUser: 65,
      cantEvidence: 7
    }
  ]

  get dataTableIncidentes (): TableIncidents {
    return this.tableIncidentes
  }

  @Mutation
  setTableIncidentes (payload: []): void {
    this.tableIncidentes = payload
  }

  @Mutation
  setLoadingTableIncidentes (payload: boolean): void {
    this.loadingTableIncidentes = payload
  }

  @Action
  loadTable (): void {
    this.context.commit('setTableIncidentes', this.tableIncidentesPrueba)
    this.context.commit('setLoadingTableIncidentes', false)
  }

  @Action
  defaultData (): void {
    this.context.commit('setTableIncidentes', [])
    this.context.commit('setLoadingTableIncidentes', true)
  }

  get liveComponent (): string {
    return this.component
  }

  @Mutation
  setComponent (payload: string): void {
    this.component = payload
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
