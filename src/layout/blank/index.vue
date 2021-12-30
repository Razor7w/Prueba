<template>
   <v-main>
      <v-container fluid>
        <router-view :key="key"></router-view>
    </v-container>
  </v-main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'AppMain'
})
export default class extends Vue {
  get key (): string {
    return this.$route.fullPath
  }
}
</script>
