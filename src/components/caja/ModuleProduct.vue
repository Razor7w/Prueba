<template>
  <v-card
    outlined
    tile
  >
    <v-toolbar
      dark
      color="primary"
    >
    <v-btn
      icon
      class="hidden-xs-only ml-3"
      @click="homeCategory"
    >
      <v-icon>mdi-home-variant</v-icon>
    </v-btn>
    <v-spacer></v-spacer>
      <v-autocomplete
        :items="productsInstance.getItemsAutoComplete"
        v-model="itemSelectedAutoComplete"
        @change="goItemAutoComplete"
        item-text= "nombre"
        prepend-icon="mdi-magnify"
        class="mt-8 mr-3"
        color="white"
        label="Buscar Producto"
        placeholder="Escribe para buscar un producto"
        return-object
      ></v-autocomplete>
    </v-toolbar>
    <v-card
        class="pa-2"
        outlined
        tile
    >
      <caja-breadcrumb />
      <caja-productos />
    </v-card>
  </v-card>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import { Utils } from '@/mixins/utils'

// get Store
import { getModule } from 'vuex-module-decorators'
import ProductsModule from '@/store/modules/products'
import ComandaModule from '@/store/modules/comanda'
import { Category } from '@/store/products'

@Component({
  name: 'ModuleProduct'
})
export default class extends Mixins(Utils) {
  productsInstance = getModule(ProductsModule, this.$store)
  comandaInstance = getModule(ComandaModule, this.$store)
  itemSelectedAutoComplete: Category = {
    id: 0,
    nombre: '',
    created_at: '',
    updated_at: ''
  }

  homeCategory (): void {
    this.productsInstance.getAllCategories()
    this.productsInstance.setProducts([])
    this.productsInstance.setSubCategory([])
  }

  goItemAutoComplete (): void {
    if (this.itemSelectedAutoComplete.id > 0) {
      this.productsInstance.getProductsAndCategories(this.itemSelectedAutoComplete)
    }
  }
}
</script>
