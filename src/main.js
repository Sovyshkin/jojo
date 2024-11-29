import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/router";
import axios from "axios";

axios.defaults.baseURL = "http://192.168.31.128:5010";
// axios.defaults.baseURL = "http://192.168.31.230:5010";

const app = createApp(App);

app.use(router);

app.mount("#app");
