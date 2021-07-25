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
// Vee-validate

import {
  Form, Field, ErrorMessage, defineRule, configure
} from 'vee-validate'
import AllRules from '@vee-validate/rules'
import { localize, setLocale } from '@vee-validate/i18n'
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'

const app = createApp(App)
app.config.globalProperties.$filter = {
  currency,
  date
}

Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule])
})

configure({
  generateMessage: localize({ zh_TW: zhTW }), // 載入繁體中文語系
  validateOnInput: true // 當輸入任何內容直接進行驗證
})
// 設定預設語系
setLocale('zh_TW')

app.use(router)
app.use(VueAxios, axios)
app.component('Loading', Loading)
app.component('Form', Form)
app.component('Field', Field)
app.component('ErrorMessage', ErrorMessage)
app.mount('#app')

// 原形
// import { createApp } from 'vue'
// import App from './App.vue'
// import router from './router'
// createApp(App).use(router).mount('#app')
