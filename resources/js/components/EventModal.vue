<template>
    <Modal v-on:done="createNewEvent" ref="modal" @closed="eraseData">
        <template v-slot:modal-launch>Dodaj nowe zajęcia<i class="far fa-calendar-plus"></i></template>
        <template  v-slot:modal-title>Nowe wydarzenie</template>
        <template>
            <div>
                <form  @submit.prevent="createNewEvent" >
                    <div class="form-group">
                        <label>Nazwa wydarzenia</label>
                        <input type="text" class="form-control w-100" placeholder="nazwa" v-model.trim="$v.event.name.$model"/>
                        <div v-if="$v.event.name.$dirty && submitted">
                            <small class=" text-danger" v-if="!$v.event.name.required">To pole jest wymagane</small>
                            <small class=" text-danger" v-if="!$v.event.name.minLength">Zbyt krótkie, minimum 4 znaki</small>
                            <small class=" text-danger" v-if="!$v.event.name.maxLength">Zbyt długie, maximum 30 znaków</small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Przedmiot:</label>
                        <select class="form-control" v-model.trim="$v.event.id.$model" :disabled="(!coursesAsTeacher.length||preselectedCourse)">
                            <option selected disabled hidden value="">Wybierz przedmiot który prowadzisz</option>
                            <option v-for="course in coursesAsTeacher" :key="course.id" :value="course.id">{{course.name}}</option>
                        </select>
                        <div v-if="$v.event.id.$dirty && submitted">
                            <small class=" text-danger" v-if="!$v.event.id.required">To pole jest wymagane</small>
                        </div>
                    </div>

                    <div class="row">
                        <div class="form-group col-12 col-sm-4">
                            <label>Data: </label>
                            <flat-pickr v-model.trim="$v.day.$model" :config="configDay" class="form-control" placeholder="Wybierz dzień"></flat-pickr>
                            <div v-if="$v.day.$dirty && submitted">
                                <small class=" text-danger" v-if="!$v.day.required">To pole jest wymagane</small>
                            </div>
                        </div>
                        <div class="form-group col-6 col-sm-4">
                            <label>Czas rozpoczęcia: </label>
                            <flat-pickr v-model.trim="$v.event.start_time.$model" :config="configHour" class="form-control" placeholder="Wybierz godzinę"></flat-pickr>
                            <div v-if="$v.event.start_time.$dirty && submitted">
                                <small class=" text-danger" v-if="!$v.event.start_time.required">To pole jest wymagane</small>
                            </div>
                        </div>
                        <div class="form-group col-6 col-sm-4">
                            <label>Czas zakończenia:</label>
                            <flat-pickr v-model.trim="$v.event.end_time.$model" :config="configHour" class="form-control" placeholder="Wybierz godzinę"></flat-pickr>
                            <div v-if="$v.event.end_time.$dirty && submitted">
                                <small class=" text-danger" v-if="!$v.event.end_time.required">To pole jest wymagane</small>
                                <small class=" text-danger" v-if="!$v.event.end_time.notTooEarly">Godzina zakończenia nie może być wcześniejsza niż {{event.start_time}}</small>
                            </div>
                        </div>
                    </div>
                    <div class="form-group mt-3">
                        <input type="text" class="form-control w-100" placeholder="Dodatkowe informacje" v-model.trim="$v.event.note.$model"/>
                        <div v-if="$v.event.note.$dirty && submitted">
                            <small class=" text-danger" v-if="!$v.event.note.maxLength">Zbyt długie, maximum 256 znaków</small>

                        </div>
                    </div>

                </form>
            </div>

        </template>

    </Modal>
</template>

<script>
    import Modal from './Modal'
    import {required, minLength,maxLength} from 'vuelidate/lib/validators';
    import {mapState} from "vuex";
    import flatPickr from 'vue-flatpickr-component';
    import 'flatpickr/dist/flatpickr.css';
    import { Polish } from 'flatpickr/dist/l10n/pl.js'

    export default {
        name: "EventModal",
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
                event: {
                    name: '',
                    start_time: null,
                    end_time: null,
                    id: null,
                    note: ''
                },
                submitted: false,
            }
        },
        validations: {
            day: {
                required,
            },
            event: {
                name: {
                    required,
                    minLength: minLength(4),
                    maxLength: maxLength(30),
                },
                id:{
                    required,
                },
                start_time: {
                    required,
                },
                end_time: {
                    required,
                    notTooEarly: function(value){
                        if(!this.event.start_time || !this.event.end_time)
                            return true;
                        const end = value.split(':');

                        const start = this.event.start_time.split(':');
                        if(end.length && start.length){
                            if(end[0]>start[0])
                                return true;
                            else if(end[0]==start[0] && end[1]>start[1])
                                return true;
                            return false;
                        }
                    }
                },
                note: {
                    maxLength: maxLength(256),
                },
            },
        },
        methods: {
            createNewEvent(){
                this.submitted=true;
                this.$v.$touch();
                if (!this.$v.$invalid) {
                    this.event.start_time = `${this.day}T${this.event.start_time}:00Z`;
                    this.event.end_time = `${this.day}T${this.event.end_time}:00Z`;
                     this.$store.dispatch('events/createNewEvent',this.event)
                         .then(()=>
                       {
                            this.$emit('addedEvent');
                            this.eraseData();
                    });
                    this.$refs.modal.closeModal();
                    this.$v.$reset();
                }


            },
            eraseData(){
                this.day= null,
                 this.event= {
                    name: '',
                        start_time: '',
                        end_time: '',
                        id: this.preselectedCourse?this.preselectedCourse.id:null,
                        note: ""
                }
            }
        },
        mounted() {
            this.$store.dispatch('courses/getCoursesAsTeacher');
            if(this.preselectedCourse){
                this.event.id = this.preselectedCourse.id


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
