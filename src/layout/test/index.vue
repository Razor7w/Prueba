<template>
  <v-card class="overflow-hidden">
    <v-app-bar
      app
      elevate-on-scroll
      scroll-target="#scrolling-techniques-7"
      height="60"
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Title</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>
    <v-sheet
      id="scrolling-techniques-7"
      class="overflow-y-auto"
      :max-height="Height"
    >
      <v-container>
        <router-view :key="key"></router-view>
      </v-container>
    </v-sheet>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'AppMain'
})
export default class extends Vue {
  heightWindow = window.innerHeight
  get key (): string {
    return this.$route.fullPath
  }

  get Height (): number {
    return this.heightWindow
  }

  created (): void {
    window.addEventListener('resize', this.myEventHandler)
  }

  destroyed (): void {
    window.addEventListener('resize', this.myEventHandler)
  }

  myEventHandler (): void {
    this.heightWindow = window.innerHeight
  }
}
</script>

<style lang="stylus">
html
  overflow-y auto
</style>
