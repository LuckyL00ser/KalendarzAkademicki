import * as events from '../helpers/events';

const state = {
    eventLoading: false,
    userEventsLoading: false,
    coursesEventsLoading: false,
    event: {},
    userEvents: [],
    coursesEvents: new Map(),  //map
};
const mutations = {
    gettingEventData(state){
        state.eventLoading = true;
    },
    gettingEventFailed(state){
        state.eventLoading = false;
    },
    gettingUserEventsData(state){
        state.userEventsLoading = true;
    },
    gettingUserEventsDataFailed(state){
        state.userEventsLoading = false;
    },
    gettingCourseEventsData(state){
        state.coursesEventsLoading = true;
    },
    gettingCourseEventsDataFailed(state){
        state.coursesEventsLoading = false;
    },

    eventGet(state,payload){
        state.eventLoading = false;
        state.event = payload;
    },
    userEventsGet(state,payload){
        state.userEventsLoading = false;
        state.userEvents = payload;
    },
    coursesEventsGet(state,payload) {
        state.coursesEventsLoading = false;
        state.coursesEvents.set(payload.id, payload.data);
    }
};


const actions = {
    async getEvent({dispatch, commit},eventId){

        commit('gettingEventData');
        try {
            const response = await events.getEvent(eventId);
            commit('eventGet', response.data.event);

        }catch(error){
            dispatch('alert/error', `Błąd pobierania danych: ${error}`, { root: true });
            commit('gettingEventFailed');

        }

    },
    async getUserEvents({dispatch, commit}){

        commit('gettingUserEventsData');
        try {
            const response = await events.getUserEvents();
            commit('userEventsGet', response.data.events);

        }catch(error){
            dispatch('alert/error', `Błąd pobierania danych: ${error}`, { root: true });
            commit('gettingUserEventsDataFailed');

        }

    },
    async getCourseEvents({dispatch, commit},courseId){

        commit('gettingCourseEventsData');

        try {

            const response = await events.getCourseEvents(courseId);

            commit('coursesEventsGet', {data: response.data.events, id: courseId});

        }catch(error){
            dispatch('alert/error', `Błąd pobierania danych: ${error}`, { root: true });
            commit('gettingCourseEventsDataFailed');

        }

    },
    async createNewEvent({dispatch, commit},eventData){


        try {
            const response = await events.createNewEvent(eventData);
          //  commit('coursesEventsGet', {data: response.data.event, id: courseId});
            dispatch('alert/success', 'Dodano nowe wydarzenie', { root: true });

        }catch(error){
            dispatch('alert/error', `Błąd pobierania danych: ${error}`, { root: true });
            commit('gettingCourseEventsDataFailed');

        }

    },
    async deleteEvent({dispatch, commit},eventId){

        try {
            await events.deleteEvent(eventId);
            //  commit('coursesEventsGet', {data: response.data.event, id: courseId});
            dispatch('alert/success', 'Usunięto wydarzenie', { root: true });

        }catch(error){
            dispatch('alert/error', `Błąd pobierania danych: ${error}`, { root: true });
            commit('gettingCourseEventsDataFailed');

        }

    },



};

export default {
    namespaced: true,
    state,
    actions,
    mutations,

};
