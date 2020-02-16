<template>
    <Modal v-on:done="createNewEvent" ref="modal" >
        <template v-slot:modal-launch>Dodaj nowe zajęcia<i class="far fa-calendar-plus"></i></template>
        <template  v-slot:modal-title>Nowe wydarzenie</template>
        <template>
            <div>
<!--                <FullCalendar id="new-calendar" :height="200" :plugins="calendarPlugins" locale="pl" :selectable="true"  :locales="locales" theme-system="bootstrap" @select="daySelected"/>-->

                <form  @submit.prevent="createNewEvent" >
                    <div class="form-group">
                        <label>Nazwa wydarzenia</label>
                        <input type="text" class="form-control w-100" placeholder="nazwa" v-model="course.name"/>
                    </div>
                    <div class="form-group">
                        <label>Przedmiot:</label>
                        <select class="form-control" v-model="course.id" :disabled="(!coursesAsTeacher.length||preselectedCourse)">

                            <option selected disabled hidden value="">Wybierz przedmiot który prowadzisz</option>
                            <option v-for="course in coursesAsTeacher" :key="course.id" :value="course.id">{{course.name}}</option>
                        </select>
                    </div>

                    <div class="row">
                        <div class="form-group col">
                            <label>Data: </label>
                            <flat-pickr v-model="day" :config="configDay" class="form-control" placeholder="Wybierz dzień"></flat-pickr>
                        </div>
                        <div class="form-group col">
                            <label>Czas rozpoczęcia: </label>
                            <flat-pickr v-model="course.start_time" :config="configHour" class="form-control" placeholder="Wybierz godzinę"></flat-pickr>
                        </div>
                        <div class="form-group col">
                            <label>Czas zakończenia:</label>
                            <flat-pickr v-model="course.end_time" :config="configHour" class="form-control" placeholder="Wybierz godzinę"></flat-pickr>
                        </div>
                    </div>
                    <div class="form-group mt-3">
                        <input type="text" class="form-control w-100" placeholder="Dodatkowe informacje" v-model="course.note"/>
                    </div>

                </form>
            </div>

        </template>

    </Modal>
</template>

<script>
    import Modal from './Modal'


    import {mapState} from "vuex";
    import flatPickr from 'vue-flatpickr-component';
    import 'flatpickr/dist/flatpickr.css';
    import { Polish } from 'flatpickr/dist/l10n/pl.js'
    export default {
        name: "NewCourse",
        components: {Modal, flatPickr},
        props:['preselectedCourse'],
        data(){
            return {

                configDay: {
                    locale: Polish,
                },
                configHour: {
                    locale: Polish,
                    noCalendar: true,
                    enableTime: true,
                    dateFormat: "H:i",
                    time_24hr: true
                },
                day: null,
                course: {
                    name: '',
                    start_time: null,
                    end_time: null,
                    id: null,
                    note: ""
                }

            }
        },
        methods: {
            createNewEvent(){
                this.course.start_time = `${this.day}T${this.course.start_time}:00Z`;
                this.course.end_time = `${this.day}T${this.course.end_time}:00Z`;
                this.$store.dispatch('events/createNewEvent',this.course)
                    .then(()=>
                    {
                            this.$emit('addedEvent');
                            this.eraseData();
                    });
                this.$refs.modal.closeModal();

            },
            eraseData(){
                this.day= null,
                 this.course= {
                    name: '',
                        start_time: null,
                        end_time: null,
                        id: this.preselectedCourse?this.preselectedCourse.id:null,
                        note: ""
                }
            }
        },
        mounted() {
            this.$store.dispatch('courses/getCoursesAsTeacher');
            if(this.preselectedCourse){
                this.course = new Object({
                    id: this.preselectedCourse.id
                });

            }

        },
        computed: {
            ...mapState('courses',['coursesAsTeacher'])
        }


    }
</script>
<style lang="scss" >

    #new-calendar{
        .fc-dayGrid-view .fc-body .fc-row{
            min-height: 0;
        }
        .fc-body *{
            border: none !important;
        }
        .fc-day-top{
            text-align:center;
        }
        .fc-day-top:hover{
            cursor:pointer;
            background: lightblue;
        }
        .fc-day-number{
            float:none;
        }
        .fc-row{
            height: unset !important;
        }
        .fc-content-skeleton{
            padding-bottom:0;
            td{
                border-radius: 1em;
            }
        }
        .alert-info{
            border-radius: 1em;
        }
        .fc-highlight, {
            background: red;
            border-radius:1em;
        }

    }

</style>
