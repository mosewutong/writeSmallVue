console.log("test");

import Vue from 'vue';
import App from "./app.vue";

import router from "./router.js";

import 'babel-polyfill';

new Vue({
    el:"#app",
    router,
    components:{App},
    template:"<App/>"
})
