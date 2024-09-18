import { createApp } from 'vue';
import 'uno.css';
import App from './App.vue';

async function bootstrap() {
  const app = createApp(App);

  app.mount('#app');
}

export { bootstrap };
