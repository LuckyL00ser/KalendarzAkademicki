<template>
    <div>
        <calendar :events="$store.state.events.userEvents" @eventClicked="goToEventView"/>
        <div class="mt-2">
            <a class="legend-box normal mt-4 d-block d-sm-inline">Kursy na które uczęszczasz</a>
            <a class="legend-box teacher mt-2 d-block d-sm-inline">Kursy które prowadzisz</a>
        </div>
    </div>

</template>

<script>
    import Calendar from "../components/Calendar";

    export default {
        name: "AcademicCalendar",
        components: {Calendar},
        mounted(){

                this.$store.dispatch('events/getUserEvents',this.courseId)
                    .then(()=>{
                        this.courseEvents = this.$store.state.events.coursesEvents.get(this.courseId);
                    })

        },
        methods:{
            goToEventView(eventId){
                this.$router.push(`/event/${eventId}`)
            },
        }
    }
</script>

<style scoped>
    .legend-box{
        padding:4px;
        border: 1px solid lightgray;
        border-radius: 0.25rem;
    }
    .legend-box.teacher{
        background-color: #d2ecb2;
    }
    .legend-box.normal{
        background-color: lightblue;
    }

</style>
