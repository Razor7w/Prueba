// import router from '@/router'
import { Ave, AveApi } from '../ave'
import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import axios from 'axios'
// import { UserData, UserSubmit } from '../session'
// import { api } from './api'
// import router from '@/router'

@Module({
  namespaced: true,
  name: 'AveModule',
  stateFactory: true
})
export default class AveModule extends VuexModule {
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
  aveAll (): void {
    axios.get('https://aves.ninjas.cl/api/birds')
      .then(response => {
        const avesApi: AveApi[] = response.data

        const aves = avesApi.map(element => {
          const container = {
            img: '',
            nombre: '',
            prima: false
          }

          container.img = element.images.main
          container.nombre = element.name.spanish

          const nombreSinEspacios = container.nombre.replace(/ /g, '')
          const lengthString = nombreSinEspacios.length

          const esPrimo = (numero: number) => {
            // Casos especiales
            if (numero === 0 || numero === 1 || numero === 4) return false
            for (let x = 2; x < numero / 2; x++) {
              if (numero % x === 0) return false
            }
            // Si no se pudo dividir por ninguno de los de arriba, sí es primo
            return true
          }
          container.prima = esPrimo(lengthString)
          return container
        })

        const sortAves = aves.sort((a, b) => {
          const textA = a.nombre.toUpperCase()
          const textB = b.nombre.toUpperCase()
          return (textA < textB) ? -1 : (textA > textB) ? 1 : 0
        })

        this.context.commit('changeAve', sortAves)
      })
      .catch(() => {
        //
      })
      .finally(() => {
        //
      })
  }
}
