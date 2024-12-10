import { createApp } from 'vue'
import './style.css'
import router from './router/router.js'
import 'bootstrap/dist/css/bootstrap.css'
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.js'
import App from './App.vue'
import store from './store/index.js';

const app = createApp(App);
app.use(router);
app.use(store)
app.mount('#app');




// createApp(App)
//   .use(store) // Sử dụng store toàn cục
//   .mount('#app');