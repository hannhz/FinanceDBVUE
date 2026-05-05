import { createApp } from 'vue'
import './styles/global.css'
import './styles/layout.css'
import './styles/components.css'
import './styles/devextreme-overrides.css'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')
