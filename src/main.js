import { createApp } from 'vue';
import VueChartJs from 'vue-chartjs';
import App from './App.vue';
import router from './router';

createApp(App).use(VueChartJs);
createApp(App).use(router).mount('#app');
