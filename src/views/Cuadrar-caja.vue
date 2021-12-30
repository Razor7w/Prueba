<template>
   <v-card class="mx-auto" max-width="344" height="100%" elevation="0">
    <v-card
      class="mx-auto"
      max-width="344"
    >
      <v-card-text>
        <p class="title text--primary">
          Cuadrar Caja
        </p>
        <div class="text--primary">
          <v-text-field
            label="Valor Inicial en Caja"
            v-model="productsInstance.getValorInicialCaja"
            outlined
            dense
            readonly
          ></v-text-field>
          <v-text-field
            label="Valor Final en Caja"
            v-model="valorFinalCaja"
            outlined
            dense
          ></v-text-field>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          text
          @click="setValorFinalCaja"
        >
          Guardar
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

@Component
export default class CuadrarCajaView extends Mixins(Utils) {
  productsInstance = getModule(ProductsModule, this.$store)
  logoFajiroll = require('@/assets/logo_fajiroll.png')
  valorCaja = 0
  valorFinalCaja = 0

  mounted (): void {
    this.productsInstance.getEstadoCuadrarCaja()
    // this.productsInstance.getValorInicialCaja()
    this.productsInstance.getActualValorInicialCaja()
  }

  setValorFinalCaja (): void {
    this.productsInstance.setValorFinalCuadrarCaja(this.valorFinalCaja)
  }
}
</script>
