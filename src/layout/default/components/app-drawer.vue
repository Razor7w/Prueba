<template>
  <v-navigation-drawer
    v-model="inputValue"
    app
    color="primary"
    dark
    width="320"
    :src="barBg"
    absolute
    temporary
  >
    <v-list>
      <v-list-item class="px-2">
        <v-btn
          class="ma-2"
          text
          icon
          @click="this.appModule.toggleDrawer"
        >
          <v-icon>
            mdi-menu
          </v-icon>
        </v-btn>
        <v-spacer />
        <h1 class="mr-2"> Menú </h1>
      </v-list-item>
    </v-list>

    <v-divider class="mx-3 mb-3" />
    <v-list>
      <div  v-for="(item, i) in items"
        :key="item.title">
        <div v-if="item.items">
          <!-- TIENE CHILD -->
            <v-list-group
              :key="i"
              v-model="item.active"
              :prepend-icon="item.icon"
              no-action
              active-class="primary white--text"
            >
              <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title v-text="item.title"></v-list-item-title>
                </v-list-item-content>
              </template>

              <v-list-item
                v-for="child in item.items"
                :key="child.title"
                link
                :to="child.to"
                active-class="primary white--text"
              >
                <v-list-item-icon>
                    <v-icon>{{ child.icon}}</v-icon>
                  </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="child.title"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-group>
        </div>
        <!-- NO TIENE CHILD -->
        <div v-else>
          <v-list-item
            v-if="!item.admin || (item.admin && sessionInstance.userData.role === 0)"
            :key="i"
            :to="item.to"
            active-class="primary white--text"
            :disabled="validarTab(item)"
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>

            <v-list-item-title v-text="item.title" />
          </v-list-item>
        </div>

      </div>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
// import Vue from 'vue'
// import Component from 'vue-class-component'
// import { mapState , mapActions } from 'vuex'
import { Component, Prop, Mixins } from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'
import AppModule from '@/store/modules/app'
import { Utils } from '@/mixins/utils'
import SessionModule from '@/store/modules/session'
import ProductsModule from '@/store/modules/products'

@Component({
  name: 'AppDrawer'
})
export default class extends Mixins(Utils) {
  appModule = getModule(AppModule, this.$store)
  sessionInstance = getModule(SessionModule, this.$store)
  productsInstance = getModule(ProductsModule, this.$store)
  @Prop({ default: false }) opened: boolean | undefined
  barBg = require('@/assets/bar_bg.png');
  avatar = ''
  mobile = false
  size = 0
  sizeMobile = 42
  sizeDesktop = 70
  items= [
    {
      title: 'Inicio',
      icon: 'mdi-view-dashboard',
      to: '/Inicio'
    },
    {
      title: 'Caja',
      icon: 'mdi-cash-register',
      to: '/Caja'
    },
    {
      title: 'Comandas',
      icon: 'mdi-book-open-page-variant',
      to: '/Comandas'
    },
    {
      title: 'Cuadrar Caja',
      to: '/Cuadrar-caja',
      icon: 'mdi-clipboard-list'
    },
    {
      title: 'Productos',
      to: '/Productos',
      icon: 'mdi-food-fork-drink',
      admin: true
    },
    {
      title: 'Usuarios',
      to: '/Usuarios',
      icon: 'mdi-account',
      admin: true
    }
  ]

  get inputValue (): boolean {
    return this.appModule.drawer
  }

  set inputValue (val: boolean) {
    this.appModule.setDrawer(val)
  }

  mounted (): void {
    this.reponsive()
    this.detectMobile()
    window.addEventListener('resize', this.detectMobile)
  }

  beforeDestroy (): void {
    window.removeEventListener('resize', this.detectMobile)
  }

  reponsive (): void {
    if (window.innerWidth < 991) {
      // this.inputValue = false
    } else {
      // this.inputValue = true
      // this.inputValue = false
    }
  }

  /* isMobile() {
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      this.mobile = true
      this.size = this.sizeMobile
    } else {
      this.mobile = false
      this.size = this.sizeDesktop
    }
  } */
  detectMobile (): void {
    if (this.isMobile()) {
      this.mobile = true
      this.size = this.sizeMobile
    } else {
      this.mobile = false
      this.size = this.sizeDesktop
    }
  }

  validarTab (item: {title: string}): boolean {
    if ((item.title === 'Caja' || item.title === 'Cuadrar Caja') && this.sessionInstance.userData.role === 0 && !this.productsInstance.getValidarCaja) {
      return true
    }
    return false
  }
}
</script>
