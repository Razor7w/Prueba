// import router from '@/router'
// import Vue from 'vue'
import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { Comanda, GroupComanda } from '../comanda'
// import { Client } from '../client'
// import { POSITION } from 'vue-toastification'
// import { UserData, UserSubmit } from '../session'
import { api } from './api'
// import router from '@/router'

@Module({
  namespaced: true,
  name: 'ComandaModule',
  stateFactory: true
})
export default class ComandaModule extends VuexModule {
  fullNumComanda = ''
  idComanda = 0
  estadoComanda = 0
  total = 0
  comandas: GroupComanda[] = []
  comandaActual: Comanda = {
    id: 0,
    num_comanda: '',
    detalle_productos: [],
    fecha: '',
    estado: 0,
    hora: '',
    obs: '',
    total: 0,
    cliente_id: '',
    created_at: '',
    updated_at: '',
    metodo_pago: '',
    hora_estimada_termino: ''
  }

  get getComandas (): GroupComanda[] {
    return this.comandas
  }

  get getComandaActual (): Comanda {
    return this.comandaActual
  }

  get getTotal (): number | undefined {
    return this.comandaActual.total
  }

  get getEstadoComanda (): number {
    return (this.estadoComanda) ? this.estadoComanda : 0
  }

  get getIdComanda (): number {
    return this.idComanda
  }

  get getFullNumComanda (): string {
    return this.fullNumComanda
  }

  @Mutation
  changeTotal (payload: number): void {
    this.comandaActual.total = payload
  }

  @Mutation
  changeEstadoComanda (payload: number): void {
    this.comandaActual.estado = payload
  }

  @Mutation
  setPaymentMethod (payload: string): void {
    this.comandaActual.metodo_pago = payload
  }

  @Mutation
  setTimeComanda (payload: string): void {
    this.comandaActual.hora_estimada_termino = payload
  }

  @Mutation
  changeIdComanda (payload: number): void {
    this.idComanda = payload
  }

  @Mutation
  changeComandas (payload: GroupComanda[]): void {
    this.comandas = payload
  }

  /**
 * Limpiar la comanda actual de la db
 */
  @Mutation
  clearComandaActual (): void {
    this.comandaActual = {
      id: 0,
      num_comanda: '',
      detalle_productos: [],
      fecha: '',
      estado: 0,
      hora: '',
      obs: '',
      total: 0,
      cliente_id: '',
      created_at: '',
      updated_at: '',
      metodo_pago: '',
      hora_estimada_termino: ''
    }
  }

  /**
   * Guarda en la tienda el valor de la comanda actual
   * @param payload Comanda
   */
  @Mutation
  setDataComanda (payload: Comanda): void {
    this.comandaActual = payload
  }

  /**
   * Solo guarda el valor de la nueva comanda
   * @param payload string
   */
  @Mutation
  changeNumComanda (payload: string): void {
    this.comandaActual.num_comanda = payload
  }

  @Action
  validarComanda (): void {
    api.get('validar-comanda')
      .then(response => {
        // Solo trae el número de la comanda
        if (typeof response.data === 'string') this.context.commit('changeNumComanda', response.data)
        // Trae toda la comanda
        if (typeof response.data === 'object') {
          this.context.commit('setDataComanda', response.data)
          // this.context.commit('ProductsModule/setProductBuy', response.data.detalle_productos, { root: true })
          // console.log('validar-comanda', typeof response.data)
          // this.context.commit('changeIdComanda', response.data.id)
          // this.context.commit('changeNumComanda', response.data.num_comanda)
          // this.context.commit('changeEstadoComanda', response.data.estado)
          // this.context.commit('changeDetalleProducto', response.data.detalle_productos)
          // this.context.commit('ProductsModule/setProductBuy', response.data.detalle_productos, { root: true })
          // this.context.commit('changeTotal', response.data.total)
          // this.context.dispatch('ClientModule/clienteById', response.data.cliente_id, { root: true })
        }
        // console.log(response.data.charAt(response.data.length - 1))
        // this.context.dispatch('ClientModule/clienteById', '1', { root: true })
      })
      .catch(() => {
        // if (error.response.status === 401) router.push('/login')
      })
      .finally(() => {
        //
      })
  }

  @Action
  guardarComanda (comanda: Comanda): void {
    // @ts-expect-error se Agrega user_id
    comanda.user_id = this.context.rootState.SessionModule.userData.id
    api.post('guardarComanda', comanda)
      .then(response => {
        // Limpiar de la tienda la data de la comanda actual y guardar la nueva
        this.context.commit('clearComandaActual')
        this.context.commit('setDataComanda', response.data)
        // this.context.commit('ProductsModule/setProductBuy', response.data.detalle_productos, { root: true })
      })
      .catch(() => {
        // if (error.response.status === 401) router.push('/login')
      })
      .finally(() => {
        //
      })
  }

  @Action
  changeStateAndCreateNew (comanda: Comanda): void {
    this.context.commit('clearComandaActual')
    api.post('cambiar-estado-comanda', comanda)
      .then(() => {
        this.context.dispatch('validarComanda')
      })
      .catch(() => {
        // if (error.response.status === 401) router.push('/login')
      })
      .finally(() => {
        //
      })
  }

  @Action
  changeStateComandas (comanda: Comanda): void {
    api.post('cambiar-estado-comanda', comanda)
      .then(() => {
        // console.log(response)
      })
      .catch(() => {
        // if (error.response.status === 401) router.push('/login')
      })
      .finally(() => {
        //
      })
  }

  @Action
  changeStateComandasInComandas (comanda: Comanda): void {
    api.post('cambiar-estado-comanda', comanda)
      .then(() => {
        this.context.dispatch('getAllComandas')
      })
      .catch(() => {
        // if (error.response.status === 401) router.push('/login')
      })
      .finally(() => {
        //
      })
  }

  @Action
  changePaymentMethod (comanda: Comanda): void {
    api.post('cambiar-metodo-pago', comanda)
      .then(() => {
        // console.log(response)
      })
      .catch(() => {
        // if (error.response.status === 401) router.push('/login')
      })
      .finally(() => {
        //
      })
  }

  @Action
  changeEstimatedTimeEnd (comanda: Comanda): void {
    api.post('cambiar-hora-estimada-termino', comanda)
      .then(() => {
        // console.log(response)
      })
      .catch(() => {
        // if (error.response.status === 401) router.push('/login')
      })
      .finally(() => {
        //
      })
  }

  @Action
  getAllComandas (): void {
    api.get('comandas')
      .then(response => {
        const comandas: GroupComanda[] = response.data
        // console.log(comandas)
        const newComanda = comandas.map(item => {
          // console.log(item)
          const container = {
            cliente: {},
            comanda: {}
          }
          container.cliente = item.cliente
          container.comanda = item.comanda
          // @ts-expect-error se agrega nuevo elemento
          container.comanda.num = item.comanda.num_comanda.split('-').pop()
          // @ts-expect-error se agrega nuevo elemento
          if (item.comanda.estado === 0) container.comanda.textestado = 'En Revisión'
          // @ts-expect-error se agrega nuevo elemento
          else if (item.comanda.estado === 1) container.comanda.textestado = 'En Pausa'
          // @ts-expect-error se agrega nuevo elemento
          else if (item.comanda.estado === 2) container.comanda.textestado = 'En Cocina'
          // @ts-expect-error se agrega nuevo elemento
          else if (item.comanda.estado === 3) container.comanda.textestado = 'En Camino'
          // @ts-expect-error se agrega nuevo elemento
          else if (item.comanda.estado === 4) container.comanda.textestado = 'Finalizado'
          // @ts-expect-error se agrega nuevo elemento
          else if (item.comanda.estado === 5) container.comanda.textestado = 'Cancelado'
          return container
        })
        // console.log('newComanda', newComanda)
        this.context.commit('changeComandas', newComanda)
      })
      .catch(() => {
        // if (error.response.status === 401) router.push('/login')
      })
      .finally(() => {
        //
      })
  }

  @Action
  getComandaById (id: number): void {
    api.get(`comanda/${id}`)
      .then(response => {
        // console.log('comanda', response.data[0].comanda)
        this.context.commit('setDataComanda', response.data[0].comanda)
      })
      .catch(() => {
        // if (error.response.status === 401) router.push('/login')
      })
      .finally(() => {
        //
      })
  }

  @Action
  changeCheck (data: Comanda): void {
    api.post('cambiar-check', data)
      .then(() => {
        // console.log('comanda', response)
      })
      .catch(() => {
        // if (error.response.status === 401) router.push('/login')
      })
      .finally(() => {
        //
      })
  }
}
