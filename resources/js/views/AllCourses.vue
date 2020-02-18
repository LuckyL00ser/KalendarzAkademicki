<template>


        <course-list :availableCourses="allCourses" :loading="coursesLoading" >
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
            ...mapState('courses', ['allCourses','coursesLoading']),
        },
        mounted(){
            this.$store.dispatch('courses/getAllCourses');
        }

    }
</script>

<style scoped>

</style>
