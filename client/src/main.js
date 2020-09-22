import Vue from 'vue'
import App from './App.vue'
import bus from './bus'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import mdiIcons from './plugins/mdi-icons'
import Vue2PerfectScrollbar from 'vue2-perfect-scrollbar'
//import EventBus from './bus'

import Flex from '@/components/Utils/Flex';
import FlexItem from '@/components/Utils/FlexItem';

import DatetimePicker from 'vuetify-datetime-picker'

// Styles
import './assets/scss/index.scss'
import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css'

// PWA
import './registerServiceWorker'

Vue.prototype.$mdi = mdiIcons
Vue.prototype.$bus = bus

// Use
Vue.use(Vue2PerfectScrollbar)
Vue.use(DatetimePicker)

Vue.component('d-flex', Flex);
Vue.component('flex-item', FlexItem);


Vue.config.productionTip = false

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')
