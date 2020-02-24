<template>
    <Modal v-on:done="createNewSemester" ref="modal" @closed="eraseData">
    <template v-slot:modal-launch>Dodaj nowy semestr<i class="far fa-calendar-plus"></i></template>
    <template  v-slot:modal-title>Nowy semestr</template>
    <template>
        <div>
            <form  @submit.prevent="createNewSemester" >

                <div class="form-group">
                    <label>Który semestr:</label>
                    <select class="form-control" v-model.trim="$v.semester.name.$model" >
                        <option selected disabled hidden value="">Wybierz semestr</option>
                        <option   value="Zimowy">Zimowy</option>
                        <option   value="Letni">Letni</option>
                    </select>
                    <div v-if="$v.semester.name.$dirty && submitted">
                        <small class=" text-danger d-block" v-if="!$v.semester.name.required">To pole jest wymagane</small>
                    </div>
                </div>

                <div class="row">
                    <div class="form-group col-6 ">
                        <label>Dzień rozpoczęcia: </label>
                        <flat-pickr v-model.trim="$v.semester.start_time.$model" :config="configDay" class="form-control" placeholder="Dzień rozpoczęcia"></flat-pickr>

                        <div v-if="$v.semester.start_time.$dirty && submitted">
                            <small class=" text-danger d-block" v-if="!$v.semester.start_time.required">To pole jest wymagane</small>
                        </div>
                    </div>
                    <div class="form-group col-6 ">
                        <label>Dzień zakończenia:</label>
                        <flat-pickr v-model.trim="$v.semester.end_time.$model" :config="configDay" class="form-control" placeholder="Dzień zakończenia"></flat-pickr>

                        <div v-if="$v.semester.end_time.$dirty && submitted">
                            <small class=" text-danger d-block" v-if="!$v.semester.end_time.required">To pole jest wymagane</small>
                            <small class=" text-danger d-block" v-if="!$v.semester.end_time.notTooEarly">
                                Dzień zakończenia nie może być wcześniejszy niż {{semester.start_time}}</small>
                        </div>
                    </div>
                </div>
            </form>
        </div>

    </template>

</Modal>
</template>

<script>
    import Modal from './Modal'
    import { required} from "vuelidate/lib/validators";
    import {Polish} from "flatpickr/dist/l10n/pl";
    import flatPickr from 'vue-flatpickr-component';
    import 'flatpickr/dist/flatpickr.css';

    export default {
        name: "NewSemester",
        components: {Modal, flatPickr},
        data(){
            return {
                configDay: {
                    locale: Polish,
                },
                semester: {
                    name: '',
                    start_time: null,
                    end_time: null,
                    regions: [
                        {
                            name: 'Zajęcia odbywają się normalnie',
                            color:'#5ba80e',
                        },
                        {
                            name: 'Ferie',
                            color:'#8be8e8',
                        },
                        {
                            name: 'Przerwa świąteczna',
                            color:'#fc9a2c',
                        },
                    ],

                },
                submitted: false,
            }
        },
        validations: {

            semester: {
                name: {
                    required,
                },
                start_time: {
                    required,
                },
                end_time: {
                    required,
                    notTooEarly: function(value){
                        if(!value || ! this.semester.start_time)
                            return true;
                        return new Date(...value.split('-')) >= new Date(...this.semester.start_time.split('-'))
                    }
                },
            },
        },
        methods: {
            createNewSemester(){
                this.submitted=true;
                this.$v.$touch();

                if (!this.$v.$invalid) {
                    this.semester.name = `${this.semester.name} ${this.semester.start_time.split('-')[0]}/${this.semester.end_time.split('-')[0]}`
                    this.semester.start_time = new Date(...this.semester.start_time.split('-'));
                    this.semester.start_time.setMonth(this.semester.start_time.getMonth()-1)
                    this.semester.end_time = new Date(...this.semester.end_time.split('-'));
                    this.semester.end_time.setMonth(this.semester.end_time.getMonth()-1)
                    let x = [];
                    let start = new Date(this.semester.start_time.getFullYear(),this.semester.start_time.getMonth());
                    let end = new Date(this.semester.end_time.getFullYear(),this.semester.end_time.getMonth()+1,0)
                    while(start<=end){
                         x.push(new Date(start.getTime()));
                         start.setDate(start.getDate()+1)
                    }
                    this.semester.days = [...x]
                    this.$emit('createdNewSemester',this.semester)


                    this.$refs.modal.closeModal();
                    this.submitted=false;
                    this.$v.$reset();
                }


            },
            eraseData(){
                    this.submitted=false;
                    this.semester= {
                        name: '',
                        start_time: '',
                        end_time: '',
                        days: [],
                        regions: [
                            {
                                name: 'Zajęcia odbywają się normalnie',
                                color:'#5ba80e',
                            },
                            {
                                name: 'Ferie',
                                color:'#8be8e8',
                            },
                            {
                                name: 'Przerwa świąteczna',
                                color:'#fc9a2c',
                            },
                        ],
                    }
            }
        },
    }
</script>

<style scoped>

</style>
