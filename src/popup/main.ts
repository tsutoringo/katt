import { createApp } from 'vue';
import App from './App.vue';
import { NYobikoKey, useNYobikoProvider } from './provider';

createApp(App)
  .provide(NYobikoKey, useNYobikoProvider())
  .mount('#app');
  