<template>
  <div class="about">
    <h1>This is an about page</h1>
    <v-card
    class="mx-auto"
    max-width="344"
    outlined
  >
    <v-list-item three-line>
      <v-list-item-content>
        <div class="overline mb-4">
          OVERLINE
        </div>
        <v-list-item-title class="headline mb-1">
          Headline 5
        </v-list-item-title>
        <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-avatar
        tile
        size="80"
        color="grey"
      ></v-list-item-avatar>
    </v-list-item>

    <v-card-actions>
      <v-btn
        outlined
        rounded
        text
      >
        Button
      </v-btn>
    </v-card-actions>
  </v-card>
  <div class="test">exdi</div>
  <monitoreo-comp-test-slot :data="gridData" :columns="columns">
    <template slot="name" slot-scope="props">
      <span :class="{selected:props.item.selected}">{{props.item.name}}</span>
    </template>
    <template slot="selected" slot-scope="props">
      <input type="checkbox" v-model="props.item.selected">
    </template>
  </monitoreo-comp-test-slot>
   <v-container>
    <p>valid={{valid}}</p>
    <v-form ref="form" v-model="valid">
      <v-jsf v-model="model" :schema="schema" :options="options" />
    </v-form>
    <v-layout row class="mt-2">
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="$refs.form.validate()">Validate</v-btn>
    </v-layout>
  </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import { Utils } from '@/mixins/utils'

// get Store
import { getModule } from 'vuex-module-decorators'
import ExampleModule from '@/store/modules/example_module'

// Prueba de lodash
// import camelCase from 'lodash/camelCase'

// Prueba moment
import 'moment/locale/es'

@Component
export default class ContactButton extends Mixins(Utils) {
    exampleInstance = getModule(ExampleModule, this.$store)
    moment = require('moment');

    options = {}
    series = [44, 55, 41, 17, 15]
    gridData = [
      { name: 'Chuck Norris', power: 6000, selected: true },
      { name: 'Bruce Lee', power: 9000, selected: false },
      { name: 'Jackie Chan', power: 7000, selected: false },
      { name: 'Jet Li', power: 8000, selected: false }]

    columns = {
      name: 'Name',
      power: 'Power',
      selected: ''
    }

    valid = false

    model = {
      stringProp: 'initial value'
    }

    schema = {
      type: 'object',
      properties: {
        stringProp: {
          type: 'string',
          title: 'I\'m a string',
          description: 'This description is used as a help message.'
        }
      }
    }
}

</script>

<style lang="stylus">
.test
  color red

.selected
  background yellow

td, th
  text-align left
  background black
  padding 5px 10px
</style>
