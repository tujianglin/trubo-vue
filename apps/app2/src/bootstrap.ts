import { createApp } from 'vue';
import '@wm/styles';
import App from './App.vue';

async function bootstrap() {
  const app = createApp(App);

  app.mount('#app');
}

export { bootstrap };
