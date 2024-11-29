import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/router";
import axios from "axios";

axios.defaults.baseURL = "http://103.74.94.235:5050";

const app = createApp(App);

app.use(router);

app.mount("#app");
