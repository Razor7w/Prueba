import Vue from 'vue'
// @ts-expect-error not types
import VJsf from '@koumoul/vjsf/lib/VJsf.js'
import '@koumoul/vjsf/lib/VJsf.css'
import '@koumoul/vjsf/lib/deps/third-party.js'

Vue.component('VJsf', VJsf)
