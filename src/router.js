import Vue from "vue"

import VueRouter from "vue-router"
Vue.use(VueRouter)

import app from "./app.vue"

let routes = [
    {
        path:"/",
        redirect:"/app"
    },
    {
        path:"/app",
        name:"app",
        component:app,
        // redirect:"/"
    }
]

let router = new VueRouter({
    mode:"history",
    routes
})


export default router;