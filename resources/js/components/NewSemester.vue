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
                        <flat-pickr v-model.trim="$v.semester.startDate.$model" :config="configDay" class="form-control" placeholder="Dzień rozpoczęcia"></flat-pickr>

                        <div v-if="$v.semester.startDate.$dirty && submitted">
                            <small class=" text-danger d-block" v-if="!$v.semester.startDate.required">To pole jest wymagane</small>
                        </div>
                    </div>
                    <div class="form-group col-6 ">
                        <label>Dzień zakończenia:</label>
                        <flat-pickr v-model.trim="$v.semester.endDate.$model" :config="configDay" class="form-control" placeholder="Dzień zakończenia"></flat-pickr>

                        <div v-if="$v.semester.endDate.$dirty && submitted">
                            <small class=" text-danger d-block" v-if="!$v.semester.endDate.required">To pole jest wymagane</small>
                            <small class=" text-danger d-block" v-if="!$v.semester.endDate.notTooEarly">
                                Dzień zakończenia nie może być wcześniejszy niż {{semester.startDate}}</small>
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
    import {defaultSemesterRegions} from "../helpers/semester";

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
                    startDate: null,
                    endDate: null,
                    regions: [
                       ...defaultSemesterRegions
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
                startDate: {
                    required,
                },
                endDate: {
                    required,
                    notTooEarly: function(value){
                        if(!value || ! this.semester.startDate)
                            return true;
                        return new Date(...value.split('-')) >= new Date(...this.semester.startDate.split('-'))
                    }
                },
            },
        },
        methods: {
            createNewSemester(){
                this.submitted=true;
                this.$v.$touch();

                if (!this.$v.$invalid) {
                    this.semester.name = `${this.semester.name} ${this.semester.startDate.split('-')[0]}/${this.semester.endDate.split('-')[0]}`
                    this.semester.startDate = new Date(...this.semester.startDate.split('-'));
                    this.semester.startDate.setMonth(this.semester.startDate.getMonth()-1)
                    this.semester.endDate = new Date(...this.semester.endDate.split('-'));
                    this.semester.endDate.setMonth(this.semester.endDate.getMonth()-1)

                    this.$emit('newSemesterCreated',this.semester);

                    this.$refs.modal.closeModal();
                    this.submitted=false;
                    this.$v.$reset();
                }
            },
            eraseData(){
                    this.submitted=false;
                    this.semester= {
                        name: '',
                        startDate: null,
                        endDate: null,
                        regions: [
                            ...defaultSemesterRegions
                        ],
                    }
            }
        },
    }
</script>

<style scoped>

</style>
