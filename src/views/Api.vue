<template>
  <div class="home">
    {{ $route.params.type }}
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import { getModule } from 'vuex-module-decorators'
import DpaModule from '@/store/modules/dpa'

@Component
export default class Home extends Vue {
  dpaInstance = getModule(DpaModule, this.$store)

  mounted (): void {
    // TODO: Falta validar parametro
    this.dpaInstance.dpaAll(this.$route.params.type)
  }
}
</script>
