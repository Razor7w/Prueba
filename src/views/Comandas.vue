<template>
  <comanda-tabla />
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import { Utils } from '@/mixins/utils'

// get Store
import { getModule } from 'vuex-module-decorators'
import ProductsModule from '@/store/modules/products'

@Component({
  name: 'comandas'
})
export default class extends Mixins(Utils) {
  productsInstance = getModule(ProductsModule, this.$store)
  mounted (): void {
    this.productsInstance.getEstadoCuadrarCaja()
  }
}
</script>
