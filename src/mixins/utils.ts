import Vue from 'vue'
import Component from 'vue-class-component'
import { POSITION } from 'vue-toastification'
@Component
export class Utils extends Vue {
  // Utils para el proyecto
  isMobile (): boolean {
    return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
  }

  /**
   * Show Error alert
   * @param msg text in alert
   */
  errorAlert (msg: string): void {
    Vue.$toast.error(msg, {
      position: POSITION.BOTTOM_RIGHT
    })
  }

  /**
   * Show Success alert
   * @param msg text in alert
   */
  successAlert (msg: string): void {
    Vue.$toast.success(msg, {
      position: POSITION.BOTTOM_RIGHT
    })
  }
}
