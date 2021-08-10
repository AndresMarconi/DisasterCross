import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

const myStorage = window.localStorage;
let fontsize = myStorage.getItem('fontsize');

switch (fontsize) {
  case 'MEDIUM': 
    import("@/assets/style_medium.css")
    break;
  case 'LARGE':
    import("@/assets/style_large.css")
    break;
  case 'SMALL':
    import("@/assets/style_small.css")
    break;
  default: 
    import("@/assets/style_small.css")
    break;
}

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

