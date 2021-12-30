<template>
  <div>
    <v-chip
      class="ma-2"
      color="primary"
      @click="goHome"
    >
      Carta
    </v-chip>
    <div class="bread" v-if="productsInstance.getSelectedCategory.nombre">
      /
      <v-chip
        class="ma-2"
        :color="color"
        @click="goCategory(productsInstance.getSelectedCategory)"
      >
        {{ productsInstance.getSelectedCategory.nombre }}
      </v-chip>
    </div>
    <div class="bread" v-if="productsInstance.getSelectedSubCategory.nombre">
      /
      <v-chip
        class="ma-2"
      >
        {{ productsInstance.getSelectedSubCategory.nombre }}
      </v-chip>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Mixins, Watch } from 'vue-property-decorator'
import { Utils } from '@/mixins/utils'

// get Store
import { getModule } from 'vuex-module-decorators'
import ProductsModule from '@/store/modules/products'
import { Category } from '@/store/products'

@Component
export default class CajaBreadcrumb extends Mixins(Utils) {
  productsInstance = getModule(ProductsModule, this.$store)
  color = ''

  @Watch('productsInstance.getSelectedSubCategory.nombre')
  changeGetSelectedSubCategoryName (newVal: string): void {
    if (newVal) this.color = 'primary'
  }

  goHome (): void {
    this.productsInstance.getAllCategories()
    this.productsInstance.setProducts([])
    this.productsInstance.setSubCategory([])
    this.color = ''
  }

  goCategory (category: Category): void {
    this.productsInstance.getProductsAndCategories(category)
    // this.productsInstance.setSelectedSubCategory({ name: '', id: 0 })
  }
}
</script>

<style scoped lang="stylus" >
.bread
  display inline-block
</style>
