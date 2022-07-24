import svgIcon from './svg-icon/SvgIcon.vue'
import popUp from './popup/PopUp.vue'

export default {
  install(app) {
    app.component('m-svg-icon', svgIcon)
    app.component('m-popup', popUp)
  }
}
