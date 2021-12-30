<template>
  <div>
    <caja-module-product />
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
  name: 'ViewProductos'
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
