<template>
  <div>
      <app-bar />
      <app-drawer />
      <app-main />
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import { Utils } from '@/mixins/utils'

@Component({
  name: 'Layout'
})
export default class extends Mixins(Utils) {
  //
}

</script>
