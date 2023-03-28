import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import CheckoutGateway from './infra/gateway/CheckoutGateway'
import AxiosAdapter from './infra/http/AxiosAdapter'
import FetchAdapter from './infra/http/FetchAdapter'

const app = createApp(App);
// const httpClient = new AxiosAdapter();
const httpClient = new FetchAdapter();
app.provide("checkoutGateway", new CheckoutGateway(httpClient, "http://localhost:3000"));
app.mount('#app')
