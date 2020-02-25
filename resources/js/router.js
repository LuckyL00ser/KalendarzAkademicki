import Vue from 'vue'
import VueRouter from 'vue-router'
import Page404 from "./views/Page404";
import Login from "./views/Login";
import Register from "./views/Register";
import Dashboard from "./views/Dashboard";
import AllCourses from "./views/AllCourses";
import CourseView from "./views/CourseView";
import MyCourses from "./views/MyCourses";
import AcademicCalendar from "./views/LessonsCalendar";
import EventView from "./views/EventView";
import SemesterVIew from "./views/SemesterView";

Vue.use(VueRouter)

const router =  new VueRouter({
    mode: 'history',
    routes: [

        {
            path: '/',
            component: Dashboard,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/courses',
            component: AllCourses,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/my-courses',
            component: MyCourses,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/academic-calendar',
            component: AcademicCalendar,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/course/:id',
            component: CourseView,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/event/:id',
            component: EventView,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/register',
            component: Register
        },
        {
            path:'/semester',
            component: SemesterVIew,
        },
        {
            path: '/*',
            component: Page404,
        }
    ]
});
export default router;
