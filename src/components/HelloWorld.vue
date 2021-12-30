<template>
  <div class="text-center">
    <v-sheet
      class="px-7 pt-7 pb-4 mx-auto text-center d-inline-block"
      color="blue-grey darken-3"
      dark
    >
      <div class="grey--text text--lighten-1 text-body-2 mb-4">
        Prueba técnica Polarycs
      </div>

      <v-btn
        class="ma-1"
        color="error"
        plain
        @click="onPrueba1"
      >
        Prueba 1
      </v-btn>

      <v-btn
        class="ma-1"
        color="error"
        plain
        @click="onPrueba2"
      >
        Prueba 2
      </v-btn>
    </v-sheet>
    <prueba-1 v-show="btnPrueba1" class="mt-4"/>
    <p> </p>
    <v-sheet
      v-if="btnPrueba2"
      class="px-7 pt-7 pb-4 mx-auto text-center d-inline-block"
      color="blue-grey darken-3"
      dark
    >
      <div class="grey--text text--lighten-1 text-body-2 mb-4">
        <span>Escribir en la url  "/api/[nombre]"
        Ejemplo: http://localhost:8080/api/comunas</span>
        <p>La salida se encuentra en la consola.</p>
      </div>
    </v-sheet>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
//
import { getModule } from 'vuex-module-decorators'
import AveModule from '@/store/modules/ave'

@Component
export default class HelloWorld extends Vue {
  aveInstance = getModule(AveModule, this.$store)
  btnPrueba1 = false
  btnPrueba2 = false

  mounted (): void {
    this.aveInstance.aveAll()
  }

  onPrueba1 (): void {
    this.btnPrueba1 = true
    this.btnPrueba2 = false
  }

  onPrueba2 (): void {
    this.btnPrueba1 = false
    this.btnPrueba2 = true
  }
}
</script>
