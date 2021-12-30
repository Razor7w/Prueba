<template>
    <div>
        <v-card-text>
            <v-form>
            <v-text-field
            v-model="userName"
            label="Usuario"
            outlined
            background-color="secondary"
            required
            dark
          ></v-text-field>
            </v-form>
        </v-card-text>
        <v-flex text-center class="mb-5">
            <v-btn depressed
            x-large
            color="error"
            type="submit"
            class="text-capitalize ml-2" @click="cancel">
                Cancelar
            </v-btn>
            <v-btn
            depressed
            x-large
            color="primary"
            type="submit"
            class="text-capitalize ml-2">
                Aceptar
            </v-btn>
        </v-flex>
    </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import { Utils } from '@/mixins/utils'

// get Store
import { getModule } from 'vuex-module-decorators'
import LoginModule from '@/store/modules/login'

@Component
export default class LoginForm extends Mixins(Utils) {
    loginInstance = getModule(LoginModule, this.$store)
    userName = ''

    cancel (): void {
      this.loginInstance.setComponent('login-form')
    }
}

</script>

<style scoped lang="stylus" >
>>>.v-text-field__details
    display none
</style>
