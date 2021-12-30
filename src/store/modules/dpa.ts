// import router from '@/router'
import { Ave } from '../ave'
import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import axios from 'axios'
// import { UserData, UserSubmit } from '../session'
// import { api } from './api'
// import router from '@/router'

@Module({
  namespaced: true,
  name: 'DpaModule',
  stateFactory: true
})
export default class DpaModule extends VuexModule {
  ave: Ave = {
    img: '',
    nombre: '',
    prima: false
  }

  get getAve (): Ave {
    return this.ave
  }

  @Mutation
  changeAve (payload: Ave): void {
    this.ave = payload
  }

  @Action
  async dpaAll (type: string) {
    const content = await Promise.all([
      axios.get('https://apis.digital.gob.cl/dpa/regiones'),
      axios.get('https://apis.digital.gob.cl/dpa/provincias'),
      axios.get('https://apis.digital.gob.cl/dpa/comunas')
    ])
    const [regiones, provincias, comunas] = content

    const newProvincias = provincias.data.map((provincia: any) => {
      const container = {
        codigo: '',
        codigo_padre: '',
        comunas: 0
      }
      container.codigo = provincia.codigo
      container.codigo_padre = provincia.codigo_padre

      comunas.data.forEach((comuna: any) => {
        if (provincia.codigo === comuna.codigo_padre) {
          container.comunas += 1
        }
      })

      return container
    })

    const newRegiones = regiones.data.map((region: any) => {
      const container = {
        region: '',
        provincias: 0,
        comunas: 0
      }
      // Asignación de valores
      container.region = region.nombre

      newProvincias.forEach((provincia: any) => {
        if (provincia.codigo_padre === region.codigo) {
          container.provincias += 1
          container.comunas = provincia.comunas
        }
      })

      return container
    })

    if (type === 'comunas') {
      const result = newRegiones.sort((a: any, b: any) => {
        const numA = a.comunas
        const numB = b.comunas
        return (numA > numB) ? -1 : (numA < numB) ? 1 : 0
      })
      console.log(result)
    } else if (type === 'provincias') {
      const result = newRegiones.sort((a: any, b: any) => {
        const numA = a.provincias
        const numB = b.provincias
        return (numA > numB) ? -1 : (numA < numB) ? 1 : 0
      })
      console.log(result)
    } else {
      console.log('Debe ingresar en la url "comunas" o "provincias"')
    }
  }
}
