<template>
    <div class=" border rounded new-period p-1" :style="`background-color:${newPeriod.color}`">
        <h4>Nowy okres</h4>
        <div class="form-inline d-flex flex-nowrap">
            <input type="text" class="form-control  flex-sm-grow-1" v-model="newPeriod.name" placeholder="Nazwa"/>
            <input type="color" class="form-control p-0 " @change="myColor($event)" value="white" placeholder="Kolor"/>
            <button class="btn btn-success  " @click="addPeriod">
                        <span class="d-none d-sm-inline">
                             Dodaj
                        </span>
                <i class="fas fa-plus"></i>
            </button>
        </div>
<!--        <div  class="pl-4">-->
<!--            <h6 class="my-1">Dodaj daty dla nowego okresu:</h6>-->
<!--            <div class=" form-inline d-flex justify-content-between my-1" v-for="part in newPeriod.parts">-->
<!--                <flat-pickr v-if="part.single" :value="part.start_date" :config="configDay" disabled class="form-control " placeholder="Wybierz dzień"></flat-pickr>-->
<!--                <div v-else class="d-flex">-->
<!--                    <flat-pickr v-model="part.start_date" :config="configDay" class="form-control" placeholder="Wybierz rozpoczęcia"></flat-pickr>-->
<!--                    <flat-pickr v-model="part.end_date" :config="configDay" class="form-control ml-2" placeholder="Wybierz zakończenia"></flat-pickr>-->
<!--                </div>-->
<!--                <button class="btn btn-danger rounded-circle">-->
<!--                    <i class="fas fa-minus"></i>-->
<!--                </button>-->
<!--            </div>-->
<!--            <div class="form-inline d-flex justify-content-between my-1">-->
<!--                <div class="form-check">-->
<!--                    <input class="form-check-input" type="checkbox" v-model.trim="newPart.single">-->
<!--                    <label class="form-check-label">-->
<!--                        Pojedynczy dzień-->
<!--                    </label>-->
<!--                </div>-->
<!--                <flat-pickr v-if="newPart.single" :config="configDay" v-model="newPart.start_date" class="form-control " placeholder="Wybierz dzień"></flat-pickr>-->
<!--                <div v-else class="d-flex align-items-center">-->
<!--                    Od: <flat-pickr v-model="newPart.start_date" :config="configDay" class="form-control  mr-2" placeholder="Dzień rozpoczęcia"></flat-pickr>-->
<!--                    Do: <flat-pickr v-model="newPart.end_date" :config="configDay" class="form-control  " placeholder="Dzień zakończenia"></flat-pickr>-->
<!--                </div>-->
<!--                <button class="btn btn-success rounded-circle flex-shrink-1 " @click="addPart">-->
<!--                    <i class="fas fa-plus"></i>-->
<!--                </button>-->

<!--            </div>-->
<!--        </div>-->

    </div>
</template>

<script>
    import {Polish} from "flatpickr/dist/l10n/pl";
    import flatPickr from 'vue-flatpickr-component';
    import 'flatpickr/dist/flatpickr.css';

    export default {
        name: "NewPeriod",
        components: { flatPickr},
        data(){
            return {
                newPeriod:{
                    name:'',
                    color: '',
                    parts:[],
                },
                newPart:{
                    single: true,
                    start_date: new Date(),
                    end_date: new Date(),
                },

                configDay: {
                    locale: Polish,
                },
            }
        },
        // validations: {
        //
        //     newPeriod:{
        //         name:{
        //             required,
        //             minLength: minLength(4),
        //             maxLength: maxLength(256),
        //         },
        //         color: {
        //             required,
        //             isColor: value=>value.match(/^#[0-9a-f]{3,6}$/i),
        //         },
        //         parts:{
        //             required,
        //             minLength: minLength(1),
        //         }
        //     },
        //     newPart: {
        //         checkAgainstOther: function(value){
        //               let valid=false;
        //               const dateToCheck = new Date(...value.start_date.split('-'));
        //               const endDateToCheck = this.newPart.single?'':new Date(...value.end_date.split('-'));
        //               this.newPeriod.parts.forEach((element)=>{
        //                     if(value.single && element.single){
        //                         valid = valid || (dateToCheck == (new Date(...element.start_date.split('-'))));
        //                     }else if(value.single && !element.single){
        //                         valid = valid || !(dateToCheck<= (new Date(...element.start_date.split('-')))
        //                                         || dateToCheck >= (new Date(...element.end_date.split('-'))));
        //                     }else if(!value.single && element.single){
        //                         valid = valid || !(dateToCheck >= (new Date(...element.start_date.split('-')))
        //                                         || endDateToCheck <= (new Date(...element.start_date.split('-'))));
        //                     }else{
        //                         valid = valid || !(dateToCheck >= (new Date(...element.start_date.split('-')))
        //                                         || endDateToCheck <= (new Date(...element.start_date.split('-'))))
        //                             || !(dateToCheck >= (new Date(...element.end_date.split('-')))
        //                                 || endDateToCheck <= (new Date(...element.end_date.split('-'))))
        //
        //                     }
        //               });
        //             return valid;
        //         },
        //         start_date: {
        //             required,
        //         },
        //         end_date: {
        //             required: function(value){
        //                 return this.newPart.single? (!!value):false
        //             },
        //             notTooEarly: function(value){
        //                 if(!value || ! this.newPart.start_date)
        //                     return true;
        //                 return new Date(...value.split('-')) >= new Date(...this.newPart.start_date.split('-'))
        //             }
        //         }
        //     }
        // },
        methods:{
            addPeriod(){

                    this.$emit('newPeriod',(Object.assign({}, this.newPeriod)));
                this.newPeriod.start_date= new Date();
                this.newPeriod.end_date = new Date();
                this.newPeriod.name = '';
                this.newPeriod.color = '';
                this.newPeriod.parts = [];



            },
            myColor($event){
                this.newPeriod.color=$event.target.value;
            },

            addPart(){

                    this.newPeriod.parts.push(Object.assign({},this.newPart));
                    this.newPart.single=true;
                    this.newPart.start_date=new Date();
                    this.newPart.end_date= new Date();


            },
        }
    }
</script>

<style scoped>
    input[type=color]{
        width:50px;
    }
    .form-inline>*:not(:first-child){
        margin-left: 8px;
    }
    .flatpickr-input{
        width:120px;
    }
    .new-period{
        background-color: rgba(0,0,0,0.05);
    }
</style>
