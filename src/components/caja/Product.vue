<template>
  <v-row no-gutters>
    <v-col
      v-for="(product, indexProduct) in item"
      :key="indexProduct"
      cols="12"
      sm="4"
      align="center"
    >
      <v-container>
      <v-sheet
        elevation="10"
        rounded="xl"
      >
        <v-sheet class="pa-3 deep-purple accent-4 text-right" rounded="t-xl" />
        <v-card-title>
          <p class="headline text--primary" v-if="product.cant_piezas > 0">
            {{ product.nombre }} · {{ product.cant_piezas }}
          </p>
          <p class="headline text--primary" v-else>
            {{ product.nombre }}
          </p>
          <v-spacer></v-spacer>
          <span class="title">$ {{ product.precio }}</span>
        </v-card-title>
        <v-divider class="mx-4" v-if="product.cant_piezas > 0"></v-divider>

        <v-card-text v-if="product.cortes.length > 0">
          <p v-for="(cortes, index) in product.cortes" :key="index"> {{ cortes.corte}}</p>
        </v-card-text>

        <!-- Protein -->
        <caja-chip-product
          :product="product"
          :proteins="product.proteinas"
        />
        </v-sheet>
      </v-container>
    </v-col>
  </v-row>
</template>

<script lang='ts'>
import { Component, Mixins, Prop } from 'vue-property-decorator'
import { Utils } from '@/mixins/utils'

// get Store
import { getModule } from 'vuex-module-decorators'
import ProductsModule from '@/store/modules/products'
import { Product } from '@/store/products'

@Component
export default class CajaProduct extends Mixins(Utils) {
  @Prop() item!: Array<Product>
  productsInstance = getModule(ProductsModule, this.$store)
  selectedIngredient = { ingredient: '', product: '' }
  selectedProtein = { ingredient: '', product: '' }
  testProtein = []

  selectIngredient (ingredient: string, product: string): void {
    // console.log(ingredient, product)
    if (this.selectedIngredient.ingredient === ingredient && this.selectedIngredient.product === product) {
      this.selectedIngredient = { ingredient: '', product: '' }
    } else {
      this.selectedIngredient = { ingredient: ingredient, product: product }
    }

    // console.log(this.selectedIngredient)
  }
}
</script>

<style scoped lang="stylus" ></style>
