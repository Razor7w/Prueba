<template>
    <div>
      <p class="display-1 text--primary">
        Caja
      </p>
      <v-row no-gutters>
        <v-col
          cols="12"
          sm="4"
        >
         <caja-client />
        </v-col>
        <v-col
          cols="12"
          sm="8"
        >
          <caja-obs-and-actions />
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col
          cols="12"
          sm="4"
        >
          <caja-table-product-buy />
        </v-col>
        <v-col
          cols="12"
          sm="8"
        >
          <caja-module-product />
        </v-col>
      </v-row>
    </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import { Utils } from '@/mixins/utils'

// get Store
import { getModule } from 'vuex-module-decorators'
import ProductsModule from '@/store/modules/products'
import ComandaModule from '@/store/modules/comanda'

@Component({
  name: 'caja'
})
export default class extends Mixins(Utils) {
  productsInstance = getModule(ProductsModule, this.$store)
  comandaInstance = getModule(ComandaModule, this.$store)

  mounted (): void {
    this.productsInstance.getEstadoCuadrarCaja()
    // Si no estoy buscando una comadna en especifico, que recargue la última o cree otra
    if (!this.comandaInstance.getIdComanda) {
      this.comandaInstance.validarComanda()
    } else {
      // console.log('getIdComanda', this.comandaInstance.getIdComanda)
      this.comandaInstance.getComandaById(this.comandaInstance.getIdComanda)
    }
  }

  destroyed (): void {
    this.comandaInstance.changeNumComanda('')
    this.comandaInstance.changeIdComanda(0)
    this.comandaInstance.clearComandaActual()
  }
}
</script>

<style lang="stylus" scoped>
.row.no-gutters
    background #1E1E1E;

</style>
