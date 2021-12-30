<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th>
            Imagen
          </th>
          <th>
            Nombre
          </th>
          <th>
            ¿La ave es prima?
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in aveInstance.ave"
          :key="item.name"
        >
          <td>
            <v-img
              max-height="150"
              max-width="250"
              :src="item.img"
            ></v-img>
          </td>
          <td>{{ item.nombre }}</td>
          <td>{{ (item.prima) ? 'Si' : 'No' }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Ave } from '@/store/ave'
//
import { getModule } from 'vuex-module-decorators'
import AveModule from '@/store/modules/ave'

@Component
export default class HelloWorld extends Vue {
  aveInstance = getModule(AveModule, this.$store)

  aves: Ave[] = []

  mounted (): void {
    this.aveInstance.aveAll()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
h3
  margin 40px 0 0

ul
  list-style-type none
  padding 0

li
  display inline-block
  margin 0 10px

a
  color #42b983
</style>
