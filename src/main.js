import './assets/main.css';

import { createApp } from 'vue';
import { createHead } from '@vueuse/head';
import App from './App.vue';
import router from './router';

// Styles & UI libs
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@mdi/font/css/materialdesignicons.min.css';

const app = createApp(App);
const head = createHead();

app.use(router);
app.use(head);

// Kleine Hilfsfunktionen (optional)
app.config.globalProperties.$filters = {
  formatCurrency(value) {
    if (typeof value !== 'number') return value;
    return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(value);
  }
};

app.mount('#app');
