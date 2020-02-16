require('./bootstrap');
import Vue from "vue";
import router from "./router";
import MainApp from "./components/MainApp";
import store from './store/store';


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

    }
    return Promise.reject(error)
})

router.beforeEach((to,from,next)=>{
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

    const currentUser = store.state.user.currentUser;

    if(requiresAuth && !currentUser){
        next('/login')
    }
    else if(to.path =='/login' && currentUser){
        next('/')
    }else{
        next();
    }
})
