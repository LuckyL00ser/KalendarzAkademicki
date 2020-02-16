import * as auth from '../helpers/auth.js';

const userData = auth.getLocalUser();
if(!!userData)
    auth.setAxiosToken(userData.token)
const state = {
    currentUser: userData,
    isLoggedIn: !!userData,
    loading: false,
};
const mutations = {
    login(state){
        state.loading=true;
    },
    loginSuccess(state,payload){

        state.isLoggedIn=true;
        state.loading=false;
        state.currentUser=Object.assign({},payload.user,{token:payload.access_token});

        localStorage.setItem('user',JSON.stringify(state.currentUser));
    },
    loginFailed(state){
        state.loading=false;
    },
    logout(state){
        state.isLoggedIn=false;
        state.currentUser=null;
        localStorage.removeItem('user');
    },
    registering(state){
        state.loading=true;
    },
    registered(state){
        state.loading=false;
    }
}
const getters = {
    isLoading(state){ return state.loading},
    isLoggedIn(state){ return state.isLoggedIn},
    currentUser(state){return state.currentUser},
}
const actions = {
        async login({dispatch, commit}, credentials){

                commit('login');
                try {
                    const response = await auth.login(credentials);
                    commit('loginSuccess', response.data);
                    dispatch('alert/success', 'Zalogowano', { root: true });
                    return;
                }catch(error){
                        dispatch('alert/error', `Błąd logowania: ${error}`, { root: true });
                        commit('loginFailed');
                        throw error;
                }

        },
        logout({commit}){
            commit('logout');
            auth.logout();
        },
        async register({dispatch,commit},userData){
            commit('registering');
            try{
                const response = await auth.register(userData);
                dispatch('alert/success', 'Zarejestrowano', { root: true });
                commit('registered');

            }catch(error){
                    dispatch('alert/error', `Błąd rejestracji: ${error}`, { root: true });
            };
        }


};

export const user = {
	namespaced: true,
	state,
	actions,
	mutations,
    getters,
};
