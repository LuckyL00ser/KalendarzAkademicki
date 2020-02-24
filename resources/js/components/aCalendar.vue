<template>
   <div class="calendar ">

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

    export default {
        props: {
            start_date:{
                type: Date,
                default: ()=>new Date(),
            },
            end_date:{
                type: Date,
                default: ()=>new Date(),
            },
            days: {
                type: Array,
                default: ()=>[],
            }
        },
        methods: {
          dragStart(event,day){
              this.dragging=true;
              this.dragStartDay = day;


          },
            dragOver(event,day){
                this.dragEndDay= day;


            },
            dragEnd(){
              if(this.dragStartDay>this.dragEndDay)
                  this.$emit('dragEnded',{start:this.dragEndDay,end:this.dragStartDay})
                else
                   this.$emit('dragEnded',{start:this.dragStartDay,end:this.dragEndDay})
            },
            finishDrag(){
                this.dragging=false;
                this.dragEndDay=null;
                this.dragStartDay=null;
            },
            dateClicked(day){
              if(day>=this.start_date && day<=this.end_date)
                  this.$emit('dateClicked',{start:day})
            }
        },
        name: "aCalendar",
        data(){
          return {
                dragging: false,
              dragStartDay: null,
              dragEndDay: null,
          }
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
        background-color: #3490dc;
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
