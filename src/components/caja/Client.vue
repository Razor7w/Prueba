<template>
  <v-card
    class="pa-2"
    outlined
    tile
  >
    <!-- <v-card-title>Datos del Cliente</v-card-title> -->
    <v-row no-gutters>
      <v-col
        cols="12"
        sm="6"
      >
       <p class="headline text--primary">
        Datos del Cliente
      </p>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        align="end"
      >
        <v-btn
          rounded
          color="primary"
          :disabled="disableBtnSave"
          @click="saveInfClient">
          <v-icon>
            mdi-content-save
          </v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col
        cols="12"
        sm="6"
        align="center"
        class="mb-2"
      >
        <v-text-field
          label="Número Comanda"
          v-model="comandaNum"
          outlined
          readonly
          hide-details
          ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        align="center"
        class="mb-2"
      >
        <v-text-field
          label="Número Cliente"
          v-model="clientNum"
          maxlength="12"
          outlined
          hide-details
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        align="center"
        class="mb-2"
      >
        <v-text-field
          label="Nombre del Cliente"
          v-model="clientName"
          @keydown="validateSave"
          :disabled="inputInfoClient"
          outlined
          hide-details
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        align="center"
        class="mb-2"
      >
        <v-text-field
          label="Dirección"
          v-model="address"
          @keydown="validateSave"
          :disabled="inputInfoClient"
          outlined
          hide-details
        ></v-text-field>
      </v-col>

    </v-row>
  </v-card>
</template>

<script lang='ts'>
import { Component, Mixins, Watch } from 'vue-property-decorator'
import { Utils } from '@/mixins/utils'

// get Store
import { getModule } from 'vuex-module-decorators'
import ProductsModule from '@/store/modules/products'
import ClientModule from '@/store/modules/client'
import ComandaModule from '@/store/modules/comanda'
import { Client } from '@/store/client'

@Component
export default class CajaClient extends Mixins(Utils) {
  productsInstance = getModule(ProductsModule, this.$store)
  clientInstance = getModule(ClientModule, this.$store)
  comandaInstance = getModule(ComandaModule, this.$store)
  disableBtnSave = true
  inputInfoClient = true
  comandaNum = ''
  clientNum = '+569'
  clientName = ''
  address = ''

  @Watch('clientNum')
  updateClientNum (newVal: string, oldVal: string): void {
    this.disableBtnSave = true
    this.inputInfoClient = true
    const diffString = newVal.length - oldVal.length
    // Solo buscar al cliente cuando le largo de este esa 12 y cuando sea escrito a mano
    if (newVal.length === 12 && diffString === 1) {
      this.clientInstance.validarCliente(newVal)
    }
    if (newVal.length === 12) this.inputInfoClient = false
  }

  @Watch('comandaInstance.comandaActual.num_comanda')
  updateNumComanda (newVal: string): void {
    // Traer lo que viene después del -
    // @ts-expect-error Traerá el guion si o si
    this.comandaNum = (newVal.length > 0) ? newVal.split('-').pop() : ''
  }

  @Watch('comandaInstance.comandaActual.cliente_id')
  updateClientId (newVal: number): void {
    if (newVal > 0) {
      this.clientInstance.clienteById(newVal)
    } else {
      this.clientNum = '+569'
      this.clientName = ''
      this.address = ''
    }
  }

  validateSave ():void {
    this.disableBtnSave = !(this.clientNum.length === 12)
  }

  @Watch('clientInstance.client')
  updateClient (newValue: Client): void {
    // Actualiza la información si es que la trae
    this.clientNum = (newValue.telefono) ? newValue.telefono : '+569'
    this.clientName = (newValue.nombre) ? newValue.nombre : ''
    this.address = (newValue.direccion) ? newValue.direccion : ''
  }

  saveInfClient (): void {
    this.disableBtnSave = true
    const newClient = {
      telefono: this.clientNum,
      nombre: this.clientName,
      direccion: this.address
    }
    this.clientInstance.updateCliente(newClient)
  }
}
</script>
<style scoped lang="stylus" ></style>
