<template>
  <div>
    <!-- Protein -->
    <v-card-text  v-if="product.cant_proteinas > 0">
      <span class="subheading">Selecciona proteina ({{product.cant_proteinas}})</span>

      <v-chip-group
        active-class="primary"
        multiple
        :max="product.cant_proteinas"
        v-model="selectedProtein"
      >
        <v-chip v-for="(protein, index) in product.proteinas" :key="index" show-arrows>{{ protein.nombre }}</v-chip>
      </v-chip-group>
    </v-card-text>
  <!-- Ingredients -->
    <v-card-text  v-if="product.cant_ingredientes > 0">
      <span class="subheading">Selecciona ingredientes ({{product.cant_ingredientes}})</span>

      <v-chip-group
        active-class="primary"
        multiple
        :max="product.cant_ingredientes"
        v-model="selectedIngredients"
      >
        <v-chip v-for="(ingrediente, index) in product.ingredientes" :key="index" show-arrows>{{ ingrediente.nombre }}</v-chip>
      </v-chip-group>
    </v-card-text>
  <!-- Base -->
    <v-card-text  v-if="product.bases.length > 0">
      <span class="subheading">Selecciona base (1)</span>

      <v-chip-group
        active-class="primary"
        v-model="selectBase"
      >
        <v-chip v-for="(bases, index) in product.bases" :key="index" show-arrows>{{ bases.nombre }}</v-chip>
      </v-chip-group>
    </v-card-text>
    <!-- Salsas especiales Fajitas -->
    <v-card-text  v-if="product.id === 44 && product.nombre === 'Arma Tu Fajita'">
      <span class="subheading">Selecciona Salsa (1)</span>

      <v-chip-group
        active-class="primary"
        v-model="selectSalsasFajitas"
      >
        <v-chip v-for="(salsas, index) in salsasFajitas" :key="index" show-arrows>{{ salsas.nombre }}</v-chip>
      </v-chip-group>
    </v-card-text>
    <v-divider class="mx-4" v-if="arraySelectedProtein.length > 0 || arraySelectedIngredients.length > 0 || arrayselectBase.length > 0 "/>
    <p class="font-weight-thin font-italic" v-if="this.arraySelectedProtein.length > 0 || arraySelectedIngredients.length > 0 || arrayselectBase.length > 0">
      Producto
    </p>
    <v-row justify="center">
      <v-col
        cols="12"
        sm="6"
        v-if="this.arraySelectedProtein.length > 0"
      >
      <!-- Proteina -->
        <p class="font-weight-thin font-italic text-center">
          Proteina
        </p>
        <p class="font-weight-light text-center" v-for="(item, index) in this.arraySelectedProtein" :key="index*2">· {{item.nombre}}</p>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        class="text-center"
        v-if="this.arraySelectedIngredients.length > 0"
      >
        <!-- Ingredientes -->
        <p class="font-weight-thin font-italic text-center">
          Ingredientes
        </p>
        <p class="font-weight-light text-center" v-for="(item, index) in this.arraySelectedIngredients" :key="index+120">· {{item.nombre}}</p>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        v-if="arrayselectBase.length > 0"
      >
        <p class="font-weight-thin font-italic text-center">
          Base
        </p>
        <p class="font-weight-light text-center" v-for="(item, index) in this.arrayselectBase" :key="index+240">· {{item.nombre}}</p>
      </v-col>
    </v-row>

    <v-divider class="ma-4" />

    <v-card-actions class="mt-4">
      <v-row>
      <v-col
        cols="12"
        sm="4"
      >
        <v-text-field
        label="Cantidad"
        type="number"
        outlined
        dense
        v-model="cant"
      ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        sm="4"
      >
        <v-btn
        outlined
        text
        small
        @click="addProduct(product)"
      >
        Agregar al carro
      </v-btn>
      </v-col>
      </v-row>
    </v-card-actions>
  </div>
</template>

<script lang='ts'>
import { Component, Mixins, Prop, Watch } from 'vue-property-decorator'
import { Utils } from '@/mixins/utils'

// get Store
import { getModule } from 'vuex-module-decorators'
import ProductsModule from '@/store/modules/products'
import { Product, SubItem } from '@/store/products'
import ClientModule from '@/store/modules/client'
import ComandaModule from '@/store/modules/comanda'

@Component
export default class CajaChipProduct extends Mixins(Utils) {
  @Prop() product!: Product
  productsInstance = getModule(ProductsModule, this.$store)
  clientInstance = getModule(ClientModule, this.$store)
  comandaInstance = getModule(ComandaModule, this.$store)
  selectedProtein = []
  arraySelectedProtein: SubItem[] = []
  textProtein = ''
  selectedIngredients = []
  arraySelectedIngredients: SubItem[] = []
  textIngredients = ''
  selectBase = -1
  arrayselectBase: SubItem[] = []
  cant = 1
  salsasFajitas = [{ nombre: 'Mayo Casera' }, { nombre: 'Salsa de ajo' }, { nombre: 'Ciboulette' }]
  selectSalsasFajitas = -1

  @Watch('selectedProtein')
  updateSelectedProtein (): void {
    this.arraySelectedProtein = []
    this.textProtein = ''
    for (const indexSelected in this.selectedProtein) {
      const finalArray = this.product.proteinas.filter((protein, index) => {
        return index === this.selectedProtein[indexSelected]
      })
      this.arraySelectedProtein.push(finalArray[0])
      this.textProtein += `${finalArray[0].nombre} `
    }
  }

  @Watch('selectedIngredients')
  updateSelectedIngredients (): void {
    this.arraySelectedIngredients = []
    this.textIngredients = ''
    for (const indexSelected in this.selectedIngredients) {
      const finalArray = this.product.ingredientes.filter((protein, index) => {
        return index === this.selectedIngredients[indexSelected]
      })
      this.arraySelectedIngredients.push(finalArray[0])
      this.textIngredients += `${finalArray[0].nombre} `
    }
  }

  @Watch('selectBase')
  updateSelectBase (): void {
    this.arrayselectBase = []
    if (this.selectBase >= 0) this.arrayselectBase.push(this.product.bases[this.selectBase])
  }

  addProduct (product: Product): void {
    // console.log(this.productsInstance.getSelectedCategory)
    // console.log(this.productsInstance.getSelectedCategory.nombre)
    // console.log(product.nombre)
    // console.log(product.precio)
    let name = `${product.nombre}`
    // Arreglar Problema de quesadillas
    if (this.productsInstance.getSelectedCategory.id === 7) {
      if (this.productsInstance.getSelectedSubCategory.nombre) {
        name = `${this.productsInstance.getSelectedSubCategory.nombre} | ${name}`
      }
      name = `${this.productsInstance.getSelectedCategory.nombre} | ${name}`
    } else {
      if (this.productsInstance.getSelectedSubCategory.nombre && !(product.id === 44)) {
        name = `${this.productsInstance.getSelectedSubCategory.nombre} | ${product.nombre}`
      }
      // Protein
      if (this.product.cant_proteinas > 0) {
        // console.log(this.textProtein)
        name = `${name} | Proteina: ${this.textProtein}`
      }
      // Ingredientes
      if (this.product.cant_ingredientes > 0) {
        // console.log(this.textIngredients)
        name = `${name} | Ingredientes: ${this.textIngredients}`
      }
      // Limpiar Bases
      if (this.arrayselectBase.length > 0) {
        // console.log(this.arrayselectBase)
        name = `${name} | Base: ${this.arrayselectBase[0].nombre}`
      }
      if (product.id === 44 && product.nombre === 'Arma Tu Fajita' && this.selectSalsasFajitas > -1) {
        name = `${name} | Salsa: ${this.salsasFajitas[this.selectSalsasFajitas].nombre}`
      }
    }

    if (this.cant <= 0) this.cant = 1
    const newObj = {
      name: name,
      cant: this.cant,
      total: product.precio * this.cant
    }
    this.productsInstance.addProductBuy(newObj)

    if (this.comandaInstance.comandaActual.num_comanda) {
      let total = 0
      this.productsInstance.getProductBuy.map(item => {
        total += Number(item.total)
      })
      this.comandaInstance.changeTotal(total)
      const newComanda = {
        num_comanda: this.comandaInstance.comandaActual.num_comanda,
        obs: this.comandaInstance.comandaActual.obs,
        cliente_id: this.comandaInstance.comandaActual.cliente_id,
        estado: this.comandaInstance.comandaActual.estado,
        detalle_productos: this.productsInstance.getProductBuy,
        total: total,
        metodo_pago: this.comandaInstance.comandaActual.metodo_pago,
        hora_estimada_termino: this.comandaInstance.comandaActual.hora_estimada_termino
      }
      this.comandaInstance.guardarComanda(newComanda)
    }
  }
}
</script>

<style scoped lang="stylus" ></style>
