<template>

        <course-list :availableCourses="userCourses" >
            <template v-slot:header>
                <h2>Twoje kursy</h2>
            </template>
            <template v-slot:no-courses>

                <p>Nie jesteś zapisany na żaden kurs</p>
                <router-link to="/courses">Znajdź coś dla siebie</router-link>

            </template>
        </course-list>

</template>

<script>
    import CourseList from "../components/CourseList";

    import {mapState} from "vuex";

    export default {
        name: "MyCourses",
        components: {CourseList},
        computed: {...mapState('courses', ['userCourses']),},
        mounted(){
            this.$store.dispatch('courses/getUserCourses');
        }

    }
</script>

<style scoped>

</style>
