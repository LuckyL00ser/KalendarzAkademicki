import Vue from 'vue';
import Vuex from 'vuex';
import {user} from './user.store'
import {alert} from './alert.store'
import {courses} from "./courses.store";
import events from "./events.store";

Vue.use(Vuex);


export default new Vuex.Store({
    modules: {
        alert,
        user,
        courses,
        events
    },
});

