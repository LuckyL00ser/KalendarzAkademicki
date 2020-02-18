<template>
        <div>
            <div class="card position-relative">
                <loading-component :loading="loading"/>
                <div class="card-header ">
                    <h2>{{course.name}}</h2>
                </div>
                <div class="card-body">
                    <p>Prowadzący: {{course.user.name}}</p>
                    <p>Email:
                        <a :href="`mailto: ${course.user.email}`">
                            {{course.user.email}}
                        </a>
                    </p>
                    <div v-if="$store.state.user.currentUser.id==course.user.id" class="mt-2 border-top pt-2">
                        <p class=" ">Jesteś prowadzącym dla tego przedmiotu</p>
                        <button class="btn btn-outline-danger d-inline" @click="delCourse">Usuń kurs<i class="far fa-trash-alt"></i></button>
                        <event-modal class="d-inline" :preselected-course="course" @addedEvent="fetchCourseEvents"/>

                    </div>
                    <div v-else class="border-top pt-2">
                        <div v-if="participate">
                            Uczestniczysz w tych zajęciach<br>
                            <button  @click="signOut" class="btn btn-outline-danger">Wypisz się<i class="fas fa-sign-out-alt"></i></button>
                        </div>
                        <div  v-else>
                            Nie jesteś uczestnikiem tych zajęć<br>
                            <button @click="signIn" class="btn btn-outline-success">Zapisz się<i class="fas fa-sign-in-alt"></i></button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card mt-4">
                <h2 class="card-header">Zajęcia dla przedmiotu:</h2>
                <div class="card-body position-relative">
                    <loading-component :loading="$store.state.events.coursesEventsLoading"/>
                    <calendar :events="courseEvents" @eventClicked="goToEventView" />
                </div>
            </div>
        </div>

</template>

<script>
    import {getCourse} from "../helpers/courses";

    import {getParticipationForCourse} from "../helpers/participations";
    import Calendar from "../components/Calendar";
    import EventModal from "../components/EventModal";
    import LoadingComponent from "../components/LoadingComponent";

    export default {
        name: "CourseView",
        components: {LoadingComponent, EventModal, Calendar},
        data(){
            return {
                participate: false,
                courseId: this.$route.params.id,
                courseEvents: [],
                loading: false,
                course: {
                    name: "",
                    user: {
                        name: "",
                        email: "",
                        id: "",
                    }
                }
            }
        },
        methods:{

            async delCourse(){
                await this.$store.dispatch('courses/deleteCourse',this.courseId);
                this.$router.push('/courses');
            },
            async signIn(){
               await this.$store.dispatch('courses/participateInCourse',this.courseId);
                this.getParticipation();
            },
            goToEventView(eventId){

                this.$router.push(`/event/${eventId}`)
            },
            signOut(){
                this.$store.dispatch('courses/deleteParticipation',this.courseId);
                this.getParticipation();
            },
            getParticipation(){
                getParticipationForCourse(this.courseId)
                    .then(response=>this.participate = !!response.data.participation)
                    .catch(error=>this.$store.dispatch('alert/error',error));
            },
            fetchCourseEvents(){
                this.$store.dispatch('events/getCourseEvents',this.courseId)
                    .then(()=>{
                        this.courseEvents = this.$store.state.events.coursesEvents.get(this.courseId);
                    })
            }
        },

        mounted() {
            this.loading=true;
            getCourse(this.courseId)
            .then(response=>this.course=response.data.course)
            .catch(error=>this.$store.dispatch('alert/error',error))
            .finally(()=>this.loading=false)

            this.getParticipation();
            this.fetchCourseEvents();
        },


    }
</script>

<style scoped>

</style>
