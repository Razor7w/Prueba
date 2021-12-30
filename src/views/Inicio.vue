<template>
  <v-card class="mx-auto" max-width="344" height="100%" elevation="0">
		<v-img
      class="mx-auto"
      contain
      max-width="200"
      lazy-src='@/assets/logo_fajiroll.png'
      :src="logoFajiroll"
		></v-img>
    <h1 class="ml-2">Bienvenid@ al sistema</h1>
    <v-card
      class="mx-auto"
      max-width="344"
      v-if="!productsInstance.getValidarCaja"
    >
      <v-card-text>
        <p class="title text--primary">
          Registrar Dinero Inicial en Caja
        </p>
        <div class="text--primary">
          <v-text-field
            v-model="valorCaja"
            outlined
            dense
            v-on:keyup.enter="registrarDinero"
          ></v-text-field>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          text
          :loading="productsInstance.getBtnLoadingRegisterBox"
          @click="registrarDinero"
        >
          Registrar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-card>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import { Utils } from '@/mixins/utils'

// get Store
import { getModule } from 'vuex-module-decorators'
import ProductsModule from '@/store/modules/products'
import SessionModule from '@/store/modules/session'

@Component
export default class InicioView extends Mixins(Utils) {
  productsInstance = getModule(ProductsModule, this.$store)
  sessionInstance = getModule(SessionModule, this.$store)
  logoFajiroll = require('@/assets/logo_fajiroll.png')
  valorCaja = 0

  mounted (): void {
    this.productsInstance.getEstadoCuadrarCaja()
  }

  registrarDinero (): void {
    if (this.valorCaja < 0) {
      this.errorAlert('Favor ingresar un valor mayor o igual a 0.')
    } else {
      this.productsInstance.setCuadrarCaja(this.valorCaja)
    }
  }
}
</script>
