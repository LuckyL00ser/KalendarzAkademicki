
const state = {
    semesters: [],
    semestersLoading: false,
};
const mutations = {
    fetchSemesters(state){
        state.semestersLoading=true;
    },
    setSemesters(state,payload){
        state.semesters =  payload;
        state.semestersLoading = false;
    },
    fetchingSemestersFailed(state){
        state.semestersLoading = false;
    },
    addSemester(state,payload){
        state.semesters.push(payload);
    },
    removePeriod(state,payload){
        state.semesters[payload.semester].regions.splice(payload.periodIndex,1);
    },
    newPeriod(state,payload){
        state.semesters[payload.semester].regions.push(payload.period);
    }
};
const getters = {
    getSemester(state){
        return index => index!=null?state.semesters[index]:
            {
            name:'',
            startDate: new Date(),
                endDate: new Date(),
                regions: [],
            };
    }
};
const actions = {
     async getSemesters({dispatch, commit}){
        commit('gettingSemesters');
        try {
           // const response = await semester.fetchSemesters();
            commit('setSemesters', []);
        }catch(error){
            dispatch('alert/error', 'Błędne dane logowania', { root: true });
            commit('fetchingSemestersFailed');
        }
    },
     async addSemester({dispatch,commit},newSemester){
         try {
             // const response = await semester.addSemester();

             commit('addSemester', newSemester);
         }catch(error){
             dispatch('alert/error', 'Błąd podczas dodawania semestru', { root: true });

         }
     },
    async removePeriod({dispatch,commit},payload){
        try {
            // const response = await semester.addSemester();

            commit('removePeriod', payload);
        }catch(error){
            dispatch('alert/error', 'Błąd usuwania okresu', { root: true });

        }
    },
    async newPeriod({dispatch,commit},payload){
        try {
            // const response = await semester.addSemester();

            commit('newPeriod', payload);
        }catch(error){
            dispatch('alert/error', 'Błąd dodawania okresu', { root: true });

        }
    }



};

export const semester = {
    namespaced: true,
    getters,
    state,
    actions,
    mutations,
};
