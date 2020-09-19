import Vue from 'vue'
import App from './App.vue'

import BootstrapVue from 'bootstrap-vue'
import chartJSPluginZoom from 'chartjs-plugin-zoom';

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(chartJSPluginZoom)

new Vue({
  render: h => h(App),
}).$mount('#app')
