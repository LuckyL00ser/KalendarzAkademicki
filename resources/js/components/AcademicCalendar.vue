<template>
   <div class="calendar ">
       <add-to-period ref="periodAdd"
                      :min_date="start_date"
                      :max_date="end_date"
                      :regions="regions"
                      :preloadStart="dragStartDay"
                      :preloadEnd="dragEndDay"
                      :single="single"
                      @addPeriod="addPeriod"
                      @canceled="finishDrag"/>

       <div class="calendar-container" :style="`grid-template-columns: 50px repeat(${weeks},1fr)`">
           <div class="top-bar  d-flex justify-content-around" >
               <span v-for="month in months" >{{month}}</span>
           </div>

           <div class="week-day-label">pon.</div>
           <div class="week-day-label">wt.</div>
           <div class="week-day-label">śr.</div>
           <div class="week-day-label">czw.</div>
           <div class="week-day-label">pt.</div>
           <div class="week-day-label weekend">sob.</div>
           <div class="week-day-label weekend">nd</div>
           <div v-for="emptyDay in weekDelay"></div>
           <div class="grid-item" v-for="day in days" :class="{
            'even-month':day.getMonth()%2,
            'disabled':day<start_date || day>end_date,
            'drag-over': (day>=dragStartDay && day <=dragEndDay) || (day<=dragStartDay && day>=dragEndDay) && dragging,
            'weekend': day.getDay()==0 || day.getDay()==6
            }"
                :style="`background:${day.color} ` "
               :draggable="(day>=start_date && day <=end_date)"
                @dragstart="dragStart($event,day)"
                @dragend="dragEnd(day)"
                @dragover.prevent="dragOver($event,day)"
                @click="dateClicked(day)"
           >

                {{day.getDate()}}

           </div>

       </div>
   </div>
</template>

<script>
    import AddToPeriod from "../components/AddToPeriod";
    export default {
        name: "AcademicCalendar",
        data(){
            return {
                dragging: false,
                dragStartDay: null,
                dragEndDay: null,
                single: false,
            }
        },
        components: {AddToPeriod},
        props: {
            start_date:{
                type: Date,
                default: ()=>new Date(),
            },
            end_date:{
                type: Date,
                default: ()=>new Date(),
            },
            regions:{
                type: Array,
                default: ()=>[]
            }
        },
        methods: {
          dragStart(event,day){
              this.dragStartDay = day;
              this.single=false;
              this.dragging=true;

          },
            dragOver(event,day){
                this.dragEndDay= day;
            },
            finishDrag(){
                this.dragging=false;
                this.dragEndDay=null;
                this.dragStartDay=null;
            },
            dragEnd(){
                if(this.dragStartDay>this.dragEndDay)
                    {let x = this.dragStartDay;
                    this.dragStartDay = this.dragEndDay;
                    this.dragEndDay = x;
                    this.single=false}

                this.$refs.periodAdd.openModal();

            },
            dateClicked(day){

              if(day>=this.start_date && day<=this.end_date){
                  this.dragStartDay = day;
                  this.single=true;
                  this.$refs.periodAdd.openModal();
              }
            },
            addPeriod(data){
                this.finishDrag();
                // let index = 0;
                // let start = new Date(data.start);
                //
                // while(start.getTime()!=this.days[index].getTime())
                //     index++;
                // if(!isNaN(data.end)){
                //     for(;start<=data.end;start.setDate(start.getDate()+1))
                //     {
                //         this.days[index].color = this.regions[data.period].color;
                //         index++;
                //     }
                // }else
                //     this.days[index].color = this.region[data.period].color;
            },
        },
        computed:{
            today(){
              return new Date().toDateString();
            },
            renderStart(){
                return new Date(this.start_date.getFullYear(),this.start_date.getMonth());
            },
            renderEnd(){
                return new Date(this.end_date.getFullYear(),this.end_date.getMonth()+1,0);
            },
            weeks(){
                return Math.ceil((this.renderEnd-this.renderStart)/(1000*60*60*24*7))+(this.weekDelay.length?1:0);
            },
            days(){
                //generate days for full month(s)
                let x = [];
                let start = new Date(this.renderStart.getTime());
                while(start<=this.renderEnd){
                    x.push(new Date(start.getTime()));
                    start.setDate(start.getDate()+1)
                }
                return x;
            },
            months(){
                let x=[];

                for(let month = new Date(this.renderStart);month<=this.renderEnd;month.setMonth(month.getMonth()+1)) {
                    x.push(month.toLocaleString('default', { month: 'long' }));

                }
                return x;
            },
            weekDelay(){
                let x = [];
                let d = this.renderStart.getDay();
                d=!d?7:d;
                for(let i=1;i<d;i++) x.push(i);
                return x;
            }
        }
    }
</script>

<style scoped>
    .calendar{
        overflow-x: scroll;
        overflow-y: hidden;
    }
    .calendar-container{
        display: grid;
        grid-template-rows: repeat(8,auto);
        grid-auto-flow:column;
        text-align:center;
        gap:2px;
    }
    .grid-item{
        min-width: 40px;
    }
    .grid-item:not(.disabled).drag-over {
        background-color: rgba(255, 92, 0, 0.42) !important;
    }
    .grid-item:not(.disabled):not(.drag-over):hover{
        cursor:pointer;
        z-index:1;
        background-color: lightgray !important;
    }
    .grid-item.disabled {
        color: #787878;
        cursor: default !important;
    }


    .grid-item.disabled:not(.even-month){
        background-color: transparent !important;
    }
    .even-month{
        background-color: #f0f0f0;
    }
    .weekend{
        color: #af1316 ;
    }
    .week-day-label{
        background-color: #acc4d980;
        font-weight: bold;
        margin:-1px;
    }
    .top-bar{
        padding-left: 50px;
        text-align: center;
        margin: 10px 0;
        grid-column: 1 / -1;
    }
</style>
