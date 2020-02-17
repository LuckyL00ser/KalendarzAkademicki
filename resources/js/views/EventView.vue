<template>
    <div class="card">
        <div class="card-header ">
            <h2>Szczegóły wydarzenia</h2>
        </div>
        <div class="card-body">
           <p>Przedmiot: <router-link  :to="`/course/${event.course.id}`">{{event.course.name}}</router-link></p>
            <p>Wydarzenie: <b>{{event.name}}</b></p>
            <p>Prowadzący: <b>{{event.course.user.name}}</b></p>
            <p>Czas trwania: <b>{{processedStartTime}} - {{processedEndTime}}</b> </p>

            <p >Dodatkowe informacje: <span v-if="event.note">{{event.note}}</span><b v-else>brak</b></p>
            <div v-if="$store.state.user.currentUser.id==event.course.user_id" class="mt-2 border-top pt-2">
                <p>Jesteś prowadzącym dla tego przedmiotu</p>
                <button class="btn btn-outline-danger " @click="deleteEvent">Usuń to wydarzenie</button>
            </div>
            <p v-else>Prowadzący: {{event.course.user.name}}</p>

        </div>
    </div>
</template>

<script>
    export default {
        name: "EventView",
        data(){
            return {
                event:{
                    name:'',
                    id: '',
                    start_time: '',
                    end_time: '',
                    note: '',
                    course:{
                        name:'',
                        id: '',
                        user:{
                            name:'',

                        }
                    }
                }
            }
        },
        mounted() {
            this.$store.dispatch('events/getEvent',this.$route.params.id)
            .then(()=>this.event=this.$store.state.events.event)
        },
        methods: {
            deleteEvent(){
                let courseId = this.event.course.id;
                this.$store.dispatch('events/deleteEvent',this.$route.params.id)
                    .then(()=>this.$router.push(`/course/${courseId}`))
            }
        },
        computed:{
            processedStartTime(){
                return (new Date(this.event.start_time)).toLocaleString()
            },
            processedEndTime(){
                return (new Date(this.event.end_time)).toLocaleString()
            }
        }
    }
</script>

<style scoped>

</style>
