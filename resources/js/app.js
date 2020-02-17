import 'babel-polyfill'
require('./bootstrap');
import Vue from "vue";
import router from "./router";
import MainApp from "./components/MainApp";
import store from './store/store';
import Vuelidate from "vuelidate";

router.beforeEach((to,from,next)=>{
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const currentUser = store.state.user.isLoggedIn;

    if(requiresAuth && !currentUser){
        next('/login')
    }
    else if((to.path =='/login' || to.path=='/register') && currentUser){
        next('/')
    }else{
        next()
    }

});

Vue.use(Vuelidate);

const app = new Vue({
    el: '#app',
    router,
    store,
    render: h=>h(MainApp)
});
axios.interceptors.response.use(null,(error)=>{

    if(error.response.status == 401){
        store.dispatch('user/logout');
        router.push('/login');
        return Promise.resolve();
    }
    return Promise.reject(error)
})
if(store.state.user.isLoggedIn)
    store.dispatch('events/getUserEvents')




