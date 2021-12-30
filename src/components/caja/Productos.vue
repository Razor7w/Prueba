<template>
  <div>
    <caja-skeleton-loader v-if="productsInstance.getLoadingBoxes"/>
      <!-- ParentCategory -->
    <caja-category
      v-if="productsInstance.getParentCategory.length > 0 && !productsInstance.getLoadingBoxes"
      :item= "productsInstance.getParentCategory"
      :typeComponent= "1"
    />
    <caja-category
      v-if="productsInstance.getSubCategory.length > 0 && !productsInstance.getLoadingBoxes"
      :item= "productsInstance.getSubCategory"
      :typeComponent= "2"
    />
    <caja-product
      v-if="productsInstance.getProducts.length > 0 && !productsInstance.getLoadingBoxes"
      :item= "productsInstance.getProducts"
    />
    <!-- <v-row no-gutters v-if="productsInstance.getProducts.length > 0">
      <v-col
        v-for="(producto, index) in productsInstance.getProducts"
        :key="index"
        cols="12"
        sm="4"
        align="center"
      >
        <v-card class="ma-2">
          <v-card-title class="justify-center">{{ producto.nombre}}</v-card-title>
          <v-card-text>
            <div class="my-4 subtitle-1">
              $ {{ producto.precio }}
            </div>
            <div>Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.</div>
          </v-card-text>
          <v-divider class="mx-4"></v-divider>
          <v-card-actions>
            <v-spacer />
            <v-btn
              outlined
              text
            >
              Agregar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row> -->
  </div>
</template>

<script lang='ts'>
import { Component, Mixins } from 'vue-property-decorator'
import { Utils } from '@/mixins/utils'

// get Store
import { getModule } from 'vuex-module-decorators'
import ProductsModule from '@/store/modules/products'

@Component
export default class CajaProductos extends Mixins(Utils) {
  productsInstance = getModule(ProductsModule, this.$store)

  mounted (): void {
    this.productsInstance.getAllCategories()
    this.productsInstance.setProducts([])
    this.productsInstance.setSubCategory([])
    this.productsInstance.resetProductBuy()
  }

  // Casos
  // #Cargar vista con todas las categorias -> /categorias [✅]
  // #Click en categorias mandar su id -> categoria/1/productos [✅]
  // ##Productos
  //   Añadir directamente a la lista
  // ##subcategorias
  //   Mandar id de la subcategoria  -> subcategoria/1/productos
  //     Listar productos
}
</script>

<style scoped lang="stylus" ></style>
