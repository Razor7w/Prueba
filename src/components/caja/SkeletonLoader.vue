<template>
  <v-row no-gutters>
    <v-col
      v-for="n in 3"
      :key="n"
      cols="12"
      sm="4"
    >
      <v-skeleton-loader
        class="mx-auto"
        max-width="300"
        type="paragraph, actions"
      ></v-skeleton-loader>
    </v-col>
  </v-row>
</template>

<script lang='ts'>
import { Component, Mixins } from 'vue-property-decorator'
import { Utils } from '@/mixins/utils'

// get Store
import { getModule } from 'vuex-module-decorators'
import ProductsModule from '@/store/modules/products'

@Component
export default class CajaSkeletonLoader extends Mixins(Utils) {
  productsInstance = getModule(ProductsModule, this.$store)
}
</script>

<style scoped lang="stylus" ></style>
