<template>
    <div class="pr-2 pl-2">
        <div class="v-picker__title primary">
            <div class="v-time-picker-title">
                <div class="v-time-picker-title__time">
                    <div class="v-picker__title__btn">
                        {{day}}
                    </div>
                    <span>-</span>
                    <div class="v-picker__title__btn">
                        {{month}}
                    </div>
                    <span>-</span>
                    <div class="v-picker__title__btn v-picker__title__btn">
                        {{ year }}
                    </div>
                </div>
            </div>
        </div>
        <v-time-picker
            use-seconds
            style="display:none"
        ></v-time-picker>
    </div>
</template>

<script lang="ts">
// Todo: Crear una validación cuando no se traiga la data en el prop
import { Component, Mixins } from 'vue-property-decorator'
import { Utils } from '@/mixins/utils'

@Component
export default class Clock extends Mixins(Utils) {
  moment = require('moment');
  interval = 0
  day = ''
  month = ''
  year = ''

  mounted (): void {
    this.initTime()
    this.intervalo()
  }

  intervalo (): void {
    clearInterval(this.interval)
    this.interval = setInterval(() => {
      this.initTime()
    }, 1000)
  }

  initTime (): void {
    this.day = this.moment().format('DD')
    this.month = this.moment().format('MM')
    this.year = this.moment().format('yyyy')
  }
}

</script>

<style scoped>
    .v-time-picker-title__time .v-picker__title__btn, .v-time-picker-title__time span {
        font-size: 40px !important;
    }
    .v-time-picker-title__ampm{
        font-size: 10px !important;
    }
    .v-picker__title {
        padding: 0px !important;
    }
</style>
