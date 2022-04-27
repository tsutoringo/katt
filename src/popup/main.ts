import { createApp } from 'vue';
import App from './App.vue';
import { NYobikoKey, useNYobikoProvider } from './provider';
import { localStorage as ls } from '@tsutoringo/vue-utils'

createApp(App)
  .provide(NYobikoKey, useNYobikoProvider())
  .provide(ls.localStorageKey, ls.useLocalStorage())
  .mount('#app');
  