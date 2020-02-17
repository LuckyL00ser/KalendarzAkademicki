<template>


        <course-list :availableCourses="allCourses" >
            <template v-slot:header>

                <h2 >Przeglądarka kursów</h2>
                <NewCourse />

            </template>
        </course-list>

</template>

<script>
    import {mapState} from 'vuex';
    import NewCourse from "../components/NewCourse";
    import CourseList from "../components/CourseList";
    export default {
        name: "AllCourses",
        components: {CourseList, NewCourse},
        computed: {
            ...mapState('courses', ['allCourses']),
        },
        mounted(){
            this.$store.dispatch('courses/getAllCourses');
        }

    }
</script>

<style scoped>

</style>
