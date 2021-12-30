<template>
  <v-card
    class="pa-2"
    outlined
    tile
  >
    <!-- <p class="headline text--primary">
      Carro
    </p> -->
    <v-data-table
      :headers="headers"
      :items="productsInstance.getProductBuy"
      :items-per-page="5"
      class="elevation-1"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon
          small
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
    <v-card
      class="pa-2"
      outlined
      tile
    >
    <v-row
        no-gutters justify="space-around"
      >
        <v-col
        >
            <p class="font-weight-light">Total Productos</p>
        </v-col>
        <v-col
        >
          <p class="text-right mr-3">{{ totalProducts }}</p>
        </v-col>
    </v-row>
    <v-row
        no-gutters
      >
        <v-col
        >
            <p class="font-weight-light">Total a Pagar</p>
        </v-col>
        <v-col
        >
          <p class="text-right mr-3">{{ totalSum }}</p>
        </v-col>
    </v-row>
    </v-card>
  </v-card>
</template>

<script lang='ts'>
import { Component, Mixins, Watch } from 'vue-property-decorator'
import { Utils } from '@/mixins/utils'

// get Store
import { getModule } from 'vuex-module-decorators'
import ProductsModule from '@/store/modules/products'
import { ProductBuy } from '@/store/products'
import ClientModule from '@/store/modules/client'
import ComandaModule from '@/store/modules/comanda'

@Component
export default class CajaTableProductBuy extends Mixins(Utils) {
  productsInstance = getModule(ProductsModule, this.$store)
  clientInstance = getModule(ClientModule, this.$store)
  comandaInstance = getModule(ComandaModule, this.$store)
  totalProducts = 0
  totalSum = 0
  itemsProductBuy: ProductBuy[] = []

  private headers = [
    {
      text: 'Cant',
      value: 'cant',
      width: '10%',
      sortable: false
    },
    { text: 'Nombre', value: 'name', width: '70%', sortable: false },
    { text: 'Total', value: 'total', width: '10%', sortable: false },
    { text: 'Acciones', value: 'actions', width: '10%', sortable: false }
  ]

  @Watch('productsInstance.getProductBuy')
  updateProductBuy (): void {
    this.totalProducts = 0
    this.totalSum = 0
    this.productsInstance.getProductBuy.map(item => {
      this.totalProducts += Number(item.cant)
      this.totalSum += Number(item.total)
    })
  }

  @Watch('comandaInstance.comandaActual.detalle_productos')
  updateDetalleProductos (newVal: ProductBuy[]): void {
    this.productsInstance.setProductBuy([])
    this.productsInstance.setProductBuy(newVal || [])
  }

  deleteItem (item: ProductBuy): void {
    this.productsInstance.delProductBuy(item)
    if (this.comandaInstance.comandaActual.num_comanda) {
      let total = 0
      this.productsInstance.getProductBuy.map(item => {
        total += Number(item.total)
      })
      this.comandaInstance.changeTotal(total)
      const newComanda = {
        num_comanda: this.comandaInstance.comandaActual.num_comanda,
        obs: this.comandaInstance.comandaActual.obs,
        cliente_id: this.comandaInstance.comandaActual.cliente_id,
        estado: this.comandaInstance.comandaActual.estado,
        detalle_productos: this.productsInstance.getProductBuy,
        total: total,
        metodo_pago: this.comandaInstance.comandaActual.metodo_pago,
        hora_estimada_termino: this.comandaInstance.comandaActual.hora_estimada_termino
      }
      // console.log('deleteItem', newComanda)
      this.comandaInstance.guardarComanda(newComanda)
    }
  }
}
</script>

<style scoped lang="stylus" ></style>
