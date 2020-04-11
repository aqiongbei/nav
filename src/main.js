import Vue from 'vue'
import App from './App.vue'
import router from './router'
import utils from './utils/index'
import ViewUI from 'view-design';
import './registerServiceWorker'
import 'view-design/dist/styles/iview.css';

Vue.use(ViewUI);
Vue.use(utils);
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
