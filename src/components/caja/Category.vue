<template>
  <v-row no-gutters>
    <v-col
      v-for="(category, index) in item"
      :key="index"
      cols="12"
      sm="4"
      align="center"
    >
      <v-container>
      <v-sheet
        elevation="10"
        rounded="xl"
      >
        <v-sheet class="pa-3 primary text-right" rounded="t-xl" />
          <v-card-title class="justify-center">
            <span class="headline text--primary">
              {{ category.nombre }}
            </span>
            <!-- <v-spacer />
            <span class="title">$44.50</span> -->
          </v-card-title>
          <v-card-actions>
          <v-spacer />
          <v-btn
            outlined
            text
            @click="next(category)"
          >
            Siguiente
          </v-btn>
        </v-card-actions>
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
import { Category } from '@/store/products'

@Component
export default class CajaCategory extends Mixins(Utils) {
  @Prop() item!: Array<Category>
  // 1: Categorya
  // 2: Subcategoria
  @Prop() typeComponent!: number
  productsInstance = getModule(ProductsModule, this.$store)

  next (category: Category): void {
    if (this.typeComponent === 1) {
      this.productsInstance.getProductsAndCategories(category)
    } else {
      this.productsInstance.getProductsInSubCategory(category)
    }
  }
}
</script>

<style scoped lang="stylus" ></style>
