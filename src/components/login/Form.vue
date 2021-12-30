<template>
  <div>
    <form
      @submit="login"
    >
      <v-text-field
        v-model="userName"
        label="Usuario"
        outlined
        background-color="secondary"
        required
        hide-details
        class="mb-2"
      ></v-text-field><!-- autofocus if needed -->
      <v-text-field
        v-model="userPass"
        label="Contraseña"
        type="password"
        background-color="secondary"
        outlined
        required
        hide-details
        class="mb-2"
      ></v-text-field>
      <v-btn
        block
        depressed
        x-large
        color="primary"
        type="submit"
        class="text-capitalize"
        :loading="sessionInstance.getBtnLoadingSession"
        >
        Ingresar
      </v-btn>
    </form>
    <!-- <a class="link d-flex justify-center" @click="goForgetPassword">{{$vuetify.lang.t('$vuetify.app.login.forgotPassword') }}</a> -->
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import { Utils } from '@/mixins/utils'

// get Store
import { getModule } from 'vuex-module-decorators'
import LoginModule from '@/store/modules/login'
import SessionModule from '@/store/modules/session'

@Component
export default class LoginForm extends Mixins(Utils) {
    loginInstance = getModule(LoginModule, this.$store)
    sessionInstance = getModule(SessionModule, this.$store)
    userName = ''
    userPass = ''

    mounted (): void {
      //
    }

    login (e: Event): void {
      const obj = {
        user_name: this.userName,
        password: this.userPass
      }
      this.sessionInstance.login(obj)
      e.preventDefault()
    }

    goForgetPassword (): void {
      this.loginInstance.setComponent('login-forget-password')
    }
}
</script>
