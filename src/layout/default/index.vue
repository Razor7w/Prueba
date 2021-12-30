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
import { AppMain, AppBar, AppDrawer } from './components'

@Component({
  name: 'Layout',
  components: {
    AppMain,
    AppBar,
    AppDrawer
  }
})
export default class extends Mixins(Utils) {
  //
}

</script>
