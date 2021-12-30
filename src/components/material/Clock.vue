<template>
    <div class="pr-2 pl-2">
        <div class="v-picker__title primary">
            <div class="v-time-picker-title">
                <div class="v-time-picker-title__time">
                    <div class="v-picker__title__btn">
                        {{ hour }}
                    </div>
                    <span>:</span>
                    <div class="v-picker__title__btn">
                        {{ minute }}
                    </div>
                    <span>:</span>
                    <div class="v-picker__title__btn v-picker__title__btn">
                        {{  second }}
                    </div>
                </div>
                <!-- <div class="v-time-picker-title__ampm v-time-picker-title__ampm--readonly">
                    <div class="v-picker__title__btn v-picker__title__btn--active">
                        {{ extra }}
                    </div>
                </div> -->
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
  picker = ''
  hour = ''
  minute = ''
  second = ''
  // extra = ''

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
    this.hour = this.moment().format('HH')
    this.minute = this.moment().format('mm')
    this.second = this.moment().format('ss')
    // this.extra = this.moment().format('A')
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
