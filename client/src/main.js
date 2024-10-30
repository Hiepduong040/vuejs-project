import './assets/main.css'
import '@fortawesome/fontawesome-free/css/all.min.css'; // Corrected import path

import { createApp } from 'vue'
import App from './App.vue'
import  router  from './router/index';
import BootstrapVue3 from 'bootstrap-vue-3';
import store from './store/store';

const app = createApp(App)
app.use(router)
app.use(store)
app.use(BootstrapVue3);
app.mount('#app')
