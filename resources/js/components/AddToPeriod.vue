<template>
    <Modal v-on:done="addToPeriod" ref="modal" @closed="eraseData" :disable-launcher="true">
        <template v-slot:modal-launch ></template>
        <template  v-slot:modal-title>Dodaj do okresu</template>
        <template>
            <div>
                <form  @submit.prevent="addToPeriod" >



                    <div class="row">
                        <div class="form-group col ">
                            <label v-if="single">Dzień: </label>
                            <label v-else>Okres:</label>
                            <flat-pickr ref="datepicker" v-model.trim="$v.period.$model" :config="configDay" class="form-control" placeholder="Okres"></flat-pickr>
                            <div v-if="$v.period.$dirty && submitted">
                                <small class=" text-danger d-block" v-if="!$v.period.required">To pole jest wymagane</small>
                            </div>
                        </div>


                    </div>
                    <div class="form-check px-1" v-for="(region,index) in regions" :style="`background-color:${region.color}`">
                        <input  type="radio" :id="`option${index}`" :value="index"  v-model.trim="$v.selected.$model">
                        <label class="form-check-label" :for="`option${index}`">
                            {{region.name}}
                        </label>
                    </div>
                    <div v-if="$v.selected.$dirty && submitted">
                        <small class=" text-danger d-block" v-if="!$v.selected.required">To pole jest wymagane</small>
                    </div>
                </form>
            </div>

        </template>

    </Modal>
</template>

<script>
    import {Polish} from "flatpickr/dist/l10n/pl";
    import flatPickr from 'vue-flatpickr-component';
    import 'flatpickr/dist/flatpickr.css';
    import Modal from './Modal'
    import {maxLength, minLength, required} from "vuelidate/lib/validators";
    export default {
        name: "AddToPeriod",
        components: {Modal, flatPickr},
        props: {
            min_date:{
                type: Date,
                default: ()=>new Date()
            },
            max_date:{
                type: Date,
                default: ()=>new Date()
            },
            preloadStart:{
                type: Date,
                default: ()=>new Date(2020,1,15)
            },
            preloadEnd:{
                type: Date,
                default: ()=>new Date(2020,1,23)
            },
            regions: {
              type: Array,
              default: ()=> [],
            },
            single: {
                type: Boolean,
                default: false,
            }
        },
        data(){
            return {
                selected:null,
                period: [],
                submitted: false,

            }
        },
        computed: {
          configDay(){
              return {
                    locale: Polish,
                    mode: this.single?'single':'range',
                    minDate: this.min_date,
                    maxDate: this.max_date,
                    dateFormat: "Z",
                    altInput: true,
                    altFormat: 'd-m-Y',
                    defaultDate: this.single?this.preloadStart:[this.preloadStart,this.preloadEnd]
              }
          }
        },
        watch:{
          preloadStart(value){

              this.$refs.datepicker.fp.setDate(this.single?value:[value,this.preloadEnd]);
              this.period = this.single?value:[value,this.preloadEnd];

          },
            preloadEnd(value){
                this.$refs.datepicker.fp.setDate(this.single?this.preloadStart:[this.preloadStart,value]);
                this.period = this.single?this.preloadStart:[this.preloadStart,value];
            }
        },
        validations: {
            period: {
                required,
            },
            selected: {
                required,
            }
        },


        methods:{
            addToPeriod(){
                this.submitted=true;
                this.$v.$touch();
                if(!this.$v.$invalid){
                    this.$emit('addPeriod',{
                        start: Date.parse(this.period.split(' do ')[0]),
                        end:Date.parse(this.period.split(' do ')[1]),
                        period:this.selected
                    });
                    this.$refs.modal.closeModal();
                    this.$v.$reset();
                }
            },
            eraseData(){
                this.start=null;
                    this.end=null;
                    this.selected=null;
                    this.$emit('canceled')
            },
            openModal(){
                this.$refs.modal.showModal();
            }
        }
    }
</script>

<style scoped>
    .form-check label{
        width:calc(100% - 20px);
    }
</style>
