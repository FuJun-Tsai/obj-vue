// 加入 axios
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// axios
import axios from 'axios'
import VueAxios from 'vue-axios'
// Vue Loading Overlay Component
import Loading from 'vue3-loading-overlay'
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css'
// methods
import { currency, date } from './methods/filter'

const app = createApp(App)
app.config.globalProperties.$filter = {
  currency,
  date
}
app.use(router)
app.use(VueAxios, axios)
app.component('Loading', Loading)
app.mount('#app')

// 原形
// import { createApp } from 'vue'
// import App from './App.vue'
// import router from './router'
// createApp(App).use(router).mount('#app')
