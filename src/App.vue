<template>
  <v-app :class="isLogin ? 'fondo' : ''" style="background: #1E1E1E">
    <component :is="layout" />
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class App extends Vue {
  blankLayout = 'blank'
  get layout (): string {
    return (this.$route.meta.layout || this.blankLayout) + '-layout'
  }

  isLogin = false

  created (): void {
    this.$watch(
      () => this.$route,
      (route) => {
        this.isLogin = route.name === 'Login'
      })
  }
}
</script>

<style lang="stylus">
.fondo
  background rgb(61,60,60) !important
  background radial-gradient(circle, rgba(61,60,60,1) 0%, rgba(38,38,38,1) 45%, rgba(0,0,0,1) 100%) !important

form
  margin 0px 35px

.logo
  margin-bottom 30px

.link
  color grey !important
  margin-top 30px
  text-decoration none

  &:hover
    color white !important
    transition 0.3s

.login-icons
  color #ccc
  font-size 24px

  svg
    margin 30px 15px
</style>
