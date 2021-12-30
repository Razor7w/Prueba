// import router from '@/router'
import Vue from 'vue'
import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { Client } from '../client'
import { POSITION } from 'vue-toastification'
// import { UserData, UserSubmit } from '../session'
import { api } from './api'
// import router from '@/router'

@Module({
  namespaced: true,
  name: 'ClientModule',
  stateFactory: true
})
export default class ClientModule extends VuexModule {
  client: Client = {
    id: '',
    telefono: '',
    nombre: '',
    direccion: ''
  }

  get getClient (): Client {
    return this.client
  }

  get getIdClient (): string {
    return (this.client.id) ? this.client.id : ''
  }

  @Mutation
  changeClient (payload: Client): void {
    this.client = payload
  }

  @Action
  clienteById (id: number): void {
    api.get(`get-cliente-by-id/${id}`)
      .then(response => {
        const newClient = {
          id: response.data.id,
          telefono: response.data.telefono,
          nombre: response.data.nombre,
          direccion: response.data.direccion
        }
        this.context.commit('changeClient', newClient)
      })
      .catch(() => {
        // if (error.response.status === 401) router.push('/login')
      })
      .finally(() => {
        //
      })
  }

  @Action
  validarCliente (telefono: string): void {
    // Retorna la información del cliente. Si existe crea uno nuevo
    api.post(`validar-cliente/${telefono}`)
      .then(response => {
        const newClient = {
          id: response.data.id,
          telefono: response.data.telefono,
          nombre: response.data.nombre,
          direccion: response.data.direccion
        }
        this.context.commit('changeClient', newClient)
        // Si busca un cliente, este se añade a la comanda
        // Generar el objeto de la comanda
        const newComanda = {
          num_comanda: this.context.rootState.ComandaModule.comandaActual.num_comanda,
          cliente_id: response.data.id,
          estado: this.context.rootState.ComandaModule.comandaActual.estado,
          obs: this.context.rootState.ComandaModule.comandaActual.obs,
          detalle_productos: this.context.rootState.ProductsModule.productBuy,
          total: this.context.rootState.ComandaModule.comandaActual.total,
          metodo_pago: this.context.rootState.ComandaModule.comandaActual.metodo_pago,
          hora_estimada_termino: this.context.rootState.ComandaModule.comandaActual.hora_estimada_termino
        }
        // Guarda la comanda
        this.context.dispatch('ComandaModule/guardarComanda', newComanda, { root: true })
      })
      .catch(() => {
        // if (error.response.status === 401) router.push('/login')
      })
      .finally(() => {
        //
      })
  }

  @Action
  updateCliente (client: Client): void {
    api.put(`update-cliente/${client.telefono}`, {
      nombre: client.nombre,
      direccion: client.direccion
    })
      .then(() => {
        Vue.$toast.success('Cliente Actualizado con éxito', {
          position: POSITION.BOTTOM_RIGHT
        })
      })
      .catch(() => {
        // if (error.response.status === 401) router.push('/login')
      })
      .finally(() => {
        //
      })
  }
}
