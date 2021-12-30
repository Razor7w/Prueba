<template>
  <v-app-bar
    absolute
    app
    color="primary"
    dark
    flat
    height="70"
    style="z-index:99"
  >
    <div v-if="productsInstance.getValidarCaja || this.sessionInstance.userData.role === 0">
      <v-btn
        v-if="!this.appInstance.drawer"
        text
        icon
        @click.stop="onClick"
        class="ml-2"
      >
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </div>
    <h1 class="ml-2">
      Sistema
      {{ /* title */ }}
    </h1>

    <v-spacer />
    <v-toolbar-items v-if="$route.path != '/login'">
      <v-row
        align="center"
        class="mx-0"
      >
        <!-- <v-text-field
          class="mr-4 purple-input"
          color="purple"
          label="Search..."
          hide-details
        /> -->
        <material-clock v-if="!$vuetify.breakpoint.mobile"/>
        <material-date v-if="!$vuetify.breakpoint.mobile"/>
        <h1 class="pr-2 pl-2">
          {{ sessionInstance.getUserData.name | capitalize}}
        </h1>
        <!-- <v-btn
          icon
          to="/"
        >
          <v-icon color="tertiary">
            mdi-view-dashboard
          </v-icon>
        </v-btn> -->
        <!-- <v-menu
          bottom
          left
          offset-y
          transition="slide-y-transition"
        >
          <template v-slot:activator="{ attrs, on }">
            <v-btn
              class="toolbar-items"
              icon
              to="/notifications"
              v-bind="attrs"
              v-on="on"
            >
              <v-badge
                color="error"
                overlap
              >
                <template slot="badge">
                  {{ notifications.length }}
                </template>
                <v-icon color="tertiary">
                  mdi-bell
                </v-icon>
              </v-badge>
            </v-btn>
          </template>

          <v-card>
            <v-list dense>
              <v-list-item
                v-for="notification in notifications"
                :key="notification"
                @click="onClick"
              >
                <v-list-item-title v-text="notification" />
              </v-list-item>
            </v-list>
          </v-card>
        </v-menu> -->

        <v-btn
          @click="logout"
          icon
        >
          <v-icon color="tertiary">
            mdi-exit-to-app
          </v-icon>
        </v-btn>
      </v-row>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'
import AppModule from '@/store/modules/app'
import SessionModule from '@/store/modules/session'
import ProductsModule from '@/store/modules/products'

interface Route { name: string }
@Component({
  name: 'AppBar'
})
export default class extends Vue {
  appInstance = getModule(AppModule, this.$store)
  sessionInstance = getModule(SessionModule, this.$store)
  productsInstance = getModule(ProductsModule, this.$store)
  responsive = false
  navTitle = 'COMMAND & CONTROL SECURITY CENTER'
  user = 'Sebastián Carroza'
  title = ''
  imageWd = require('@/assets/logo_widefense.png')
  barBg = require('@/assets/bar_bg.png')

  @Watch('$route', { immediate: true, deep: true })
  onChildChanged (val: Route): void {
    this.title = val.name
  }

  onClick (): void {
    this.appInstance.setDrawer(!this.appInstance.drawer)
  }

  logout (): void {
    this.sessionInstance.logout()
  }
}

</script>

<style>
  /* Fix coming in v2.0.8 */
  #core-app-bar {
    width: auto
  }
  .v-toolbar__content {
    padding: 0;
  }
  #core-app-bar a {
    text-decoration: none
  }
</style>
