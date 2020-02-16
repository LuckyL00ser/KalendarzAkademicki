import * as coursesHelper from '../helpers/courses.js';
import * as participations from "../helpers/participations";

const state = {
    coursesLoading: false,
    userCoursesLoading: false,
    coursesAsTeacherLoading: false,
    allCourses: [],
    userCourses: [],
    coursesAsTeacher: [],
};
const mutations = {
   gettingAllCourses(state){
       state.coursesLoading = true;
   },
    gettingAllFailed(state){
       state.coursesLoading = false;
    },

    gettingUserCourses(state){
       state.userCoursesLoading = true;
    },
    gettingUserCoursesFailed(state){
       state.userCoursesLoading = false;
    },
    gettingCoursesAsTeacher(state){
        state.coursesAsTeacherLoading = true;
    },
    gettingCoursesAsTeacherFailed(state){
        state.coursesAsTeacherLoading = false;
    },
    allCoursesGet(state,payload){
       state.coursesLoading = false;
       state.allCourses = payload;
    },
    allUserCoursesGet(state,payload){
       state.userCoursesLoading = false;
       state.userCourses = payload;
    },
    coursesAsTeacherGet(state,payload){
       state.coursesAsTeacher = payload;
       state.coursesAsTeacherLoading = false;
    }
}

const actions = {
    async getAllCourses({dispatch, commit}){

        commit('gettingAllCourses');
        try {
            const response = await coursesHelper.getAllCourses();

            commit('allCoursesGet', response.data.courses);

        }catch(error){
            dispatch('alert/error', `Błąd pobierania danych: ${error}`, { root: true });
            commit('gettingAllFailed');

        }

    },
    async getUserCourses({dispatch, commit}) {

        commit('gettingUserCourses');
        try {
            const response = await coursesHelper.getMyCourses();

            commit('allUserCoursesGet', response.data.participations);

        } catch (error) {
            dispatch('alert/error', `Błąd pobierania danych: ${error}`, {root: true});
            commit('gettingUserCoursesFailed');

        }
    },
    async getCoursesAsTeacher({dispatch, commit}) {

        commit('gettingCoursesAsTeacher');
        try {
            const response = await coursesHelper.getCoursesAsTeacher();

            commit('coursesAsTeacherGet', response.data.courses);

        } catch (error) {
            dispatch('alert/error', `Błąd pobierania danych: ${error}`, {root: true});
            commit('gettingCoursesAsTeacherFailed');

        }
    },
    async createCourse({dispatch},data) {
        try {
            const response =  await coursesHelper.createCourse(data);

            dispatch('alert/info', 'Utworzono nowy kurs', {root: true});
            dispatch('getAllCourses');
        } catch (error) {

            dispatch('alert/error', `Niepowodzenie podczas tworzenia nowego kursu: ${error}`, {root: true});

        }
    },
    async deleteCourse({dispatch},id) {
        try {
            await coursesHelper.deleteCourse(id);
            dispatch('alert/info', 'Usunięto kurs', {root: true});
            dispatch('getAllCourses');
            return;
        } catch (error) {
            dispatch('alert/error', `Niepowodzenie podczas tworzenia nowego kursu: ${error}`, {root: true});
            throw error;
        }
    },
    async participateInCourse({dispatch},id) {
        try {
            await participations.participateInCourse({course_id:id});
            dispatch('alert/success', 'Zapisałeś się na kurs', {root: true});
            dispatch('getUserCourses');
            return;
        } catch (error) {
            dispatch('alert/error', `Niepowodzenie zapisywania się na kurs: ${error}`, {root: true});
            throw error;
        }
    },
    async deleteParticipation({dispatch},id) {
        try {
            await participations.deleteParticipation(id);
            dispatch('alert/success', 'Wypisałeś się z kursu', {root: true});
            dispatch('getUserCourses');
            return;
        } catch (error) {
            dispatch('alert/error', `Niepowodzenie wypisywania się z kursu: ${error}`, {root: true});
            throw error;
        }
    },




};

export const courses = {
    namespaced: true,
    state,
    actions,
    mutations,

};
