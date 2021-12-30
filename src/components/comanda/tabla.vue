<template>
  <v-card>
    <v-row>
      <v-col lg="6" sm="8">
        <v-card
          class="pa-2"
          elevation="0"
        >
          <v-card-title>Comandas</v-card-title>
        </v-card>
      </v-col>
      <v-col lg="3" sm="4">
        <v-card
          class="pa-2"
          elevation="0"
        >
          <v-autocomplete v-if="sessionInstance.userData.role === 0"></v-autocomplete>
        </v-card>
      </v-col>
      <v-col lg="3" sm="12">
        <v-card
          class="pa-2"
          elevation="0"
        >
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Buscador"
            single-line
            hide-details
          ></v-text-field>
        </v-card>
      </v-col>
    </v-row>
    <v-data-table
      :headers="headers"
      :items="comandaInstance.getComandas"
      class="elevation-1"
      :search="search"
    >
      <template v-slot:[`item.comanda.num`]="{ item }">
        {{ item.comanda.num }}
      </template>
      <template v-slot:[`item.comanda.check`]="{ item }">
        <v-checkbox
          v-model="item.comanda.check"
          @click="changeCheck(item)"
        ></v-checkbox>
      </template>
      <template v-slot:[`item.comanda.textestado`]="{ item }">
        <v-chip
          :color="getColor(item.comanda.estado)"
          dark
          @contextmenu="show"
          v-on:click.right="selectedComanda(item)"
        >
          {{ item.comanda.textestado }}
        </v-chip>
        <v-menu
          v-model="showMenu"
          :position-x="x"
          :position-y="y"
          absolute
          offset-y
          origin="center center"
          transition="scale-transition"
        >
          <v-list>
            <v-list-item
              v-for="(item, index) in estadosUpdate"
              :key="index"
            >
              <!-- <v-list-item-title>{{ item.title }}</v-list-item-title> -->
              <v-chip :color="item.color"  @click="changeState(item)">
                {{ item.title }}
              </v-chip>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
      <template v-slot:[`item.action`]="{ item }">
        <v-btn
          depressed
          color="primary"
          @click="goComanda(item)"
        >
          Ver Comanda
        </v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>

<script lang='ts'>
import { Component, Mixins } from 'vue-property-decorator'
import { Utils } from '@/mixins/utils'

// get Store
import { getModule } from 'vuex-module-decorators'
import ProductsModule from '@/store/modules/products'
import ClientModule from '@/store/modules/client'
import ComandaModule from '@/store/modules/comanda'
import SessionModule from '@/store/modules/session'
import { GroupComanda } from '@/store/comanda'
import router from '@/router'

@Component
export default class ComandaTabla extends Mixins(Utils) {
  productsInstance = getModule(ProductsModule, this.$store)
  clientInstance = getModule(ClientModule, this.$store)
  comandaInstance = getModule(ComandaModule, this.$store)
  sessionInstance = getModule(SessionModule, this.$store)
  search = ''
  showMenu = false
  x = 0
  y = 0
  comandaSelected!: GroupComanda
  estadosUpdate = [{ title: '', color: '', estado: 0 }]
  estados = [
    // { title: 'En Revisión', color: 'grey', estado: 0 },
    { title: 'En Pausa', color: 'orange', estado: 1 },
    { title: 'En Cocina', color: 'purple', estado: 2 },
    { title: 'En Camino', color: 'blue', estado: 3 },
    { title: 'Finalizado', color: 'teal', estado: 4 },
    { title: 'Cancelado', color: 'red', estado: 5 }
  ]

  headers = [
    {
      text: 'Número de comanda',
      align: 'center',
      value: 'comanda.num'
    },
    { text: 'Número de Cliente', value: 'cliente.telefono', align: 'center' },
    { text: 'Nombre de Cliente', value: 'cliente.nombre', align: 'center' },
    { text: 'Dirección Cliente', value: 'cliente.direccion', align: 'center' },
    { text: 'Hora Estimada', value: 'comanda.hora_estimada_termino', align: 'center' },
    { text: 'Estado Pedido', value: 'comanda.textestado', align: 'center' },
    { text: 'Check', value: 'comanda.check', align: 'center' },
    { text: 'Acciones', value: 'action', align: 'center' }
  ]

  getColor (estado: number): string {
    if (estado === 1) return 'orange'
    else if (estado === 2) return 'purple'
    else if (estado === 3) return 'blue'
    else if (estado === 4) return 'teal'
    else if (estado === 5) return 'red'
    else return 'grey'
  }

  // getText (estado: number): string {
  //   if (estado === 0) return 'En Revisión'
  //   else if (estado === 1) return 'En Pausa'
  //   else if (estado === 2) return 'En Cocina'
  //   else if (estado === 3) return 'En Camino'
  //   else if (estado === 4) return 'Finalizado'
  //   else if (estado === 5) return 'Cancelado'
  //   else return 'Cancelado'
  // }

  getNumComanda (numComanda: string): string | undefined {
    return (numComanda && numComanda.length > 0) ? numComanda.split('-').pop() : ''
  }

  goComanda (Comanda: GroupComanda): void {
    // console.log('goComanda', Comanda.comanda)
    this.comandaInstance.changeIdComanda((Comanda.comanda.id || 0))
    router.push('/Caja')
  }

  mounted (): void {
    // llamar todas las comandas
    this.comandaInstance.getAllComandas()
  }

  destroyed (): void {
    this.comandaInstance.changeComandas([])
  }

  show (e: { preventDefault: () => void; clientX: number; clientY: number }): void {
    e.preventDefault()
    this.showMenu = false
    this.x = e.clientX
    this.y = e.clientY
    this.$nextTick(() => {
      this.showMenu = true
    })
  }

  selectedComanda (item: GroupComanda):void {
    this.comandaSelected = item
    this.estadosUpdate = this.estados
    this.estados.map(estado => {
      if ((item.comanda.estado === estado.estado)) {
        const i = this.estadosUpdate.indexOf(estado)
        this.estadosUpdate.splice(i, 1)
      }
    })
    this.estados = [
      { title: 'En Revisión', color: 'grey', estado: 0 },
      { title: 'En Pausa', color: 'orange', estado: 1 },
      { title: 'En Cocina', color: 'purple', estado: 2 },
      { title: 'En Camino', color: 'blue', estado: 3 },
      { title: 'Finalizado', color: 'teal', estado: 4 },
      { title: 'Cancelado', color: 'red', estado: 5 }
    ]
  }

  changeState (item: { title: string, color: string, estado: number }):void {
    const newComanda = {
      num_comanda: this.comandaSelected.comanda.num_comanda,
      estado: item.estado
    }
    this.comandaInstance.changeStateComandasInComandas(newComanda)
  }

  changeCheck (item: GroupComanda): void {
    const data = {
      num_comanda: item.comanda.num_comanda,
      check: item.comanda.check
    }
    this.comandaInstance.changeCheck(data)
  }
}
</script>

<style scoped lang="stylus" ></style>
