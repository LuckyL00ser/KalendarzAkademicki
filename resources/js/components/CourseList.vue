<template>
    <div class="card">
        <div class="card-header border-bottom d-flex justify-content-between flex-column flex-sm-row">
            <slot name="header"></slot>
        </div>
        <form class="card-body form-inline " @submit.prevent="">
            <div class="form-group flex-grow-1 mr-2 mb-0">
                <input type="text" v-model="searchBar" class="form-control w-100" placeholder="Wyszukaj kurs">
            </div>
            <div type="button" class="btn btn-primary"  @click="searchBar=''">
                <span class="d-none d-sm-inline">Wyszyść</span>
                <i class="fas fa-backspace"></i>
            </div>
        </form>
        <div class="position-relative">
            <loading-component :loading="loading"/>
            <p v-if="!showCourses.length" class="text-center">
                <slot name="no-courses">
                    Brak kursów w systemie
                </slot>
            </p>
            <div v-else class="list-group">
                <router-link  v-for="course in showCourses" :key="course.id" class="list-group-item list-group-item-action d-flex" :to="`course/${course.id}`">
                    <span class="flex-grow-1 align-self-center">{{course.name}}</span>
                    <div v-if="course.user_id===myId">
                        <span class="badge badge-light my-auto" >prowadzący</span>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import * as courses from "../helpers/courses";
    import LoadingComponent from "./LoadingComponent";


    export default {
        name: "CourseList",
        components: {LoadingComponent},
        props: {
            loading: Boolean,
            availableCourses: {
                type: Array,
                default: [],
            }
        },
        data(){
        return {
            showCourses: [],
            searchBar: '',
        }
    },
    computed:{
        myId(){
            return this.$store.state.user.currentUser.id;
        }
    },
    watch: {
        searchBar:  function (val) {
            if(val==="")
                this.showCourses=this.availableCourses;
            else{
                let regexp = new RegExp(val,'i');
                this.showCourses = this.availableCourses.filter(course => course.name.match(regexp))
            }
        },
        availableCourses: function(val){
            this.showCourses = this.availableCourses;
        }
    },

    }
</script>
<style>
    .list-group-item-action{
        border-left: none;
        border-right:none;
    }
</style>

