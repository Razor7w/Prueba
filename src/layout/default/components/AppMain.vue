<template>
  <v-sheet
    id="scrolling-techniques-1"
    class="overflow-y-auto"
    :max-height="Height"
  >
   <v-main>
      <v-container fluid :style="styleHeight">
        <v-tabs  v-if="!$vuetify.breakpoint.mobile && (productsInstance.getValidarCaja || sessionInstance.userData.role === 0) " class="mb-2">
          <v-tab to="/Inicio">
            <v-icon left>mdi-view-dashboard</v-icon>
            Incio
          </v-tab>
          <v-tab to="/Caja" :disabled="!productsInstance.getValidarCaja">
            <v-icon left v-if="!productsInstance.getValidarCaja">
              mdi-lock
            </v-icon>
            <v-icon left v-else>mdi-cash-register</v-icon>
            Caja
          </v-tab>
          <v-tab to="/Comandas">
            <v-icon left>mdi-book-open-page-variant</v-icon>
            Comandas
          </v-tab>
          <v-tab to="/Cuadrar-caja" :disabled="!productsInstance.getValidarCaja">
            <v-icon left v-if="!productsInstance.getValidarCaja">
              mdi-lock
            </v-icon>
            <v-icon left v-else>mdi-clipboard-list</v-icon>
            Cuadrar Caja
          </v-tab>
          <v-tab to="/Productos" v-if="sessionInstance.userData.role === 0">
            <v-icon left>mdi-food-fork-drink</v-icon>
            Productos
          </v-tab>
          <v-tab to="/Usuarios" v-if="sessionInstance.userData.role === 0">
            <v-icon left>mdi-account</v-icon>
            Usuarios
            </v-tab>
        </v-tabs>
        <router-view :key="key"></router-view>
      </v-container>
    </v-main>
  </v-sheet>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'
import ProductsModule from '@/store/modules/products'
import SessionModule from '@/store/modules/session'

@Component({
  name: 'AppMain'
})
export default class extends Vue {
  productsInstance = getModule(ProductsModule, this.$store)
  sessionInstance = getModule(SessionModule, this.$store)
  heightWindow = window.innerHeight

  get styleHeight (): string {
    return `max-height:${this.Height - 70}px;`
  }

  get key (): string {
    return this.$route.fullPath
  }

  get Height (): number {
    return this.heightWindow
  }

  created (): void {
    window.addEventListener('resize', this.resizeWindow)
  }

  destroyed (): void {
    window.addEventListener('resize', this.resizeWindow)
  }

  resizeWindow (): void {
    this.heightWindow = window.innerHeight
  }
}
</script>
