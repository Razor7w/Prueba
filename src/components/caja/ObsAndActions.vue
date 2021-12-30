<template>
  <v-card
    class="pa-2"
    outlined
    tile
  >
    <v-row no-gutters>
      <v-col
        cols="12"
        sm="7"
      >
        <v-row no-gutters>
          <v-col
            cols="12"
            sm="6"
          >
          <p class="headline text--primary">
            Observaciones:
          </p>
          </v-col>
          <v-col
            cols="12"
            sm="6"
            align="end"
          >
            <v-btn
              rounded
              color="primary"
              class="mr-5"
              :disabled="disableBtnSave"
              @click="addObs">
              <v-icon>
                mdi-content-save
              </v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-textarea
          v-model="inputObs"
          rows="5"
        ></v-textarea>
      </v-col>
      <v-col
        cols="12"
        sm="5"
      >
        <v-card
          class="ma-auto"
          outlined
        >
          <v-row no-gutters class="ma-1" justify="end">
            <v-col
              cols="12"
              sm="6"
              align="end"
              class="mr-2 mt-1"
            >
              <v-chip
                :color="getColor()"
              >
                {{ textChip }}
              </v-chip>
            </v-col>
            <v-col sm="auto" align="end">
              <v-btn
                v-if="disableDataBuy"
                color="primary"
                fab
                small
                disabled
              >
                <v-icon>
                  mdi-printer
                </v-icon>
              </v-btn>
              <v-speed-dial
                v-else
                v-model="printActionsFAB"
                direction="top"
                transition="scale-transition"
              >
                <template v-slot:activator>
                  <v-btn
                    v-model="printActionsFAB"
                    color="primary"
                    fab
                    small
                  >
                    <v-icon v-if="printActionsFAB">
                      mdi-close
                    </v-icon>
                    <v-icon v-else>
                      mdi-printer
                    </v-icon>
                  </v-btn>
                </template>
                <v-btn
                  fab
                  dark
                  small
                  color="primary"
                  :disabled="disableDataBuy"
                  @click="emitirComanda"
                >
                  <v-icon>mdi-note-text-outline</v-icon>
                </v-btn>
                <v-btn
                  fab
                  dark
                  small
                  color="primary"
                  :disabled="disableDataBuy"
                  @click="emitirDelivery"
                >
                  <v-icon>mdi-motorbike</v-icon>
                </v-btn>
              </v-speed-dial>
            </v-col>
          </v-row>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                align="center"
              >
                <v-btn
                  v-if="disableDataBuy"
                  depressed
                  disabled
                  block
                >
                  {{ inputPaymentMethod }}
                </v-btn>
                <v-speed-dial
                  v-else
                  v-model="paymentMethodFAB"
                  direction="top"
                  transition="scale-transition"
                >
                  <template v-slot:activator>
                    <v-btn
                      v-model="paymentMethodFAB"
                      depressed
                      :disabled="disableDataBuy"
                      block
                    >
                      {{ inputPaymentMethod }}
                    </v-btn>
                  </template>
                  <v-btn
                    depressed
                    color="primary"
                    @click="selectPaymentMethod('Efectivo')"
                  >
                    Efectivo
                  </v-btn>
                  <v-btn
                    depressed
                    color="primary"
                    @click="selectPaymentMethod('Transferencia')"
                  >
                    Transferencia
                  </v-btn>
                  <v-btn
                    depressed
                    color="primary"
                    @click="selectPaymentMethod('Transbank')"
                  >
                    Transbank
                  </v-btn>
                </v-speed-dial>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                align="center"
              >
                <v-btn depressed @click="nuevoPedido" :disabled="disableNuevoPedidoBtn" block>
                  Nuevo Pedido
                </v-btn>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                align="center"
              >
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="time"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn depressed  :disabled="disableDataBuy" block v-bind="attrs" v-on="on">
                      {{ timeText }}
                    </v-btn>
                  </template>
                  <v-time-picker
                    v-if="menu"
                    v-model="time"
                    full-width
                    format="24hr"
                    @change="changeTimeComanda"
                    @click:minute="$refs.menu.save(time)"
                  ></v-time-picker>
                </v-menu>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                align="center"
              >
                <v-btn depressed @click="anularPedido" :disabled="disableNuevoPedidoBtn" block>
                  Anular Pedido
                </v-btn>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                align="center"
              >
                <v-dialog
                  v-model="dialog"
                  persistent
                  max-width="600px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      depressed
                      v-bind="attrs"
                      v-on="on"
                      :disabled="disableDataBuy"
                      block
                    >
                      Calcular Vuelto
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="headline">Calcular Vuelto</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col
                            cols="12"
                            sm="6"
                            md="4"
                          >
                            <v-text-field
                              label="Total"
                              readonly
                              v-model="comandaInstance.comandaActual.total"
                            ></v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                            md="4"
                          >
                            <v-text-field
                              label="Pagado con"
                              v-model="dineroResta"
                              type="number"
                            ></v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                            md="4"
                          >
                            <v-text-field
                              label="Vuelto"
                              v-model="resultado"
                              readonly
                              required
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="dialog = false"
                      >
                        Cerrar
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                align="center"
              >
                <v-btn depressed @click="pedidoFinalizado" :disabled="disableNuevoPedidoBtn" block small>
                  Pedido Finalizado
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang='ts'>
import { Component, Mixins, Watch } from 'vue-property-decorator'
import { Utils } from '@/mixins/utils'

// get Store
import { getModule } from 'vuex-module-decorators'
import ProductsModule from '@/store/modules/products'
import ClientModule from '@/store/modules/client'
import ComandaModule from '@/store/modules/comanda'
import { ProductBuy } from '@/store/products'

@Component
export default class CajaObsAndActions extends Mixins(Utils) {
  moment = require('moment');
  productsInstance = getModule(ProductsModule, this.$store)
  clientInstance = getModule(ClientModule, this.$store)
  comandaInstance = getModule(ComandaModule, this.$store)
  disableBtnSave = true
  inputObs = ''
  textChip = ''
  disableNuevoPedidoBtn = true
  disableDataBuy = true
  dialog = false
  dineroResta = 0
  resultado = 0
  srcComanda = ''
  printActionsFAB = false
  paymentMethodFAB = false
  inputPaymentMethod = 'Metodo de pago'
  time = this.moment().format('HH:mm')
  timeText = 'Ingresar Hora'
  menu = false

  @Watch('dineroResta')
  updateDineroResta (newVal: number): void {
    const total = (this.comandaInstance.comandaActual.total || 0)
    this.resultado = 0
    if (total < newVal) this.resultado = Number(newVal) - Number(total)
  }

  @Watch('inputObs')
  updateInputObs (newVal: string, oldVal: string):void {
    const old = (oldVal) || ''
    const newD = (newVal) || ''
    const diff = newD.length - old.length
    this.disableBtnSave = !(newD.length > 0 && (diff === 1 || diff === -1))
  }

  @Watch('productsInstance.productBuy')
  updateDataBuy (newVal: ProductBuy[]): void {
    this.disableDataBuy = !(newVal.length > 0)
  }

  @Watch('comandaInstance.comandaActual.obs')
  updateObsComanda (newVal: string): void {
    this.inputObs = newVal
  }

  @Watch('comandaInstance.comandaActual.id')
  updateIdComanda (newVal: string):void {
    this.disableNuevoPedidoBtn = !(newVal)
  }

  @Watch('comandaInstance.comandaActual.metodo_pago')
  updateMetodoPago (newVal: string):void {
    this.inputPaymentMethod = (newVal || 'Metodo de pago')
  }

  @Watch('comandaInstance.comandaActual.hora_estimada_termino')
  updateHoraEstimadaTermino (newVal: string):void {
    this.timeText = (newVal || 'Ingresar Hora')
  }

  addObs (): void {
    // console.log(this.inputObs)
    // console.log(this.comandaInstance.getFullNumComanda)
    this.disableBtnSave = true
    const newComanda = {
      num_comanda: this.comandaInstance.comandaActual.num_comanda,
      obs: this.inputObs,
      cliente_id: this.comandaInstance.comandaActual.cliente_id,
      estado: this.comandaInstance.comandaActual.estado,
      detalle_productos: this.productsInstance.getProductBuy,
      total: this.comandaInstance.comandaActual.total,
      metodo_pago: this.comandaInstance.comandaActual.metodo_pago,
      hora_estimada_termino: this.comandaInstance.comandaActual.hora_estimada_termino
    }
    // console.log(newComanda)
    this.comandaInstance.guardarComanda(newComanda)
  }

  getColor (): string {
    switch (this.comandaInstance.comandaActual.estado) {
      case 0:
        this.textChip = 'En Revisión'
        return 'grey'
      case 1:
        this.textChip = 'En Pausa'
        return 'orange'
      case 2:
        this.textChip = 'En Cocina'
        return 'purple'
      case 3:
        this.textChip = 'En Camino'
        return 'blue'
      case 4:
        this.textChip = 'Finalizado'
        return 'teal'
      case 5:
        this.textChip = 'Cancelado'
        return 'red'
      default:
        return 'grey'
    }
  }

  nuevoPedido (): void {
    const estado = (this.comandaInstance.comandaActual.estado === 0) ? 1 : this.comandaInstance.comandaActual.estado
    const newComanda = {
      num_comanda: this.comandaInstance.comandaActual.num_comanda,
      estado: estado
    }
    this.comandaInstance.changeStateAndCreateNew(newComanda)
  }

  emitirComanda (): void {
    this.changeStateComanda(2)
    window.open(`${process.env.VUE_APP_API_URL}imprimir-comanda/${this.comandaInstance.comandaActual.id}`, '_blank')
  }

  emitirDelivery (): void {
    this.changeStateComanda(3)
    window.open(`${process.env.VUE_APP_API_URL}imprimir-comanda-delivery/${this.comandaInstance.comandaActual.id}`, '_blank')
  }

  pedidoFinalizado (): void {
    this.changeStateComanda(4)
  }

  anularPedido (): void {
    this.changeStateComanda(5)
  }

  changeStateComanda (estado: number):void {
    this.comandaInstance.changeEstadoComanda(estado)
    const newComanda = {
      num_comanda: this.comandaInstance.comandaActual.num_comanda,
      estado: estado
    }
    this.comandaInstance.changeStateComandas(newComanda)
  }

  selectPaymentMethod (text: string): void {
    this.inputPaymentMethod = text
    this.comandaInstance.setPaymentMethod(text)
    const newComanda = {
      num_comanda: this.comandaInstance.comandaActual.num_comanda,
      metodo_pago: text
    }
    this.comandaInstance.changePaymentMethod(newComanda)
  }

  @Watch('time')
  updateTime (newVal: string): void {
    this.timeText = newVal
  }

  changeTimeComanda (): void {
    this.comandaInstance.setTimeComanda(this.timeText)
    const newComanda = {
      num_comanda: this.comandaInstance.comandaActual.num_comanda,
      hora_estimada_termino: this.timeText
    }
    this.comandaInstance.changeEstimatedTimeEnd(newComanda)
  }
}
</script>

<style scoped lang="stylus" ></style>
