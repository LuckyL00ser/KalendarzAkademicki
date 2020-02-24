<template>
   <div>
       <semester-manager @selectedSemester="selected"/>

       <div :class="{'show-semester':semester.name}" class="card mt-4 semester">

               <add-to-period ref="periodAdd"
                              :min_date="semester.start_time"
                              :max_date="semester.end_time"
                              :regions="this.semester.regions"
                              :preloadStart="this.periodAddData.start"
                              :preloadEnd="this.periodAddData.end"
                              :single="this.periodAddData.single"
                              @addPeriod="addPeriod"
               @canceled="finishDrag"/>

           <div class="card-header">
              <h4 class="mb-0">Edytujesz: {{semester.name}}</h4>
               <p>{{semester.start_time.toLocaleDateString('pl')}} - {{semester.end_time.toLocaleDateString('pl')}}</p>
           </div>
           <div class="card-body">
               <a-calendar ref="calendar" :start_date="semester.start_time" :end_date="semester.end_time" :days="semester.days" @dragEnded="newCalendarPeriod" @dateClicked="newCalendarPeriod"/>
                <semester-regions ref="regions" :periods="semester.regions"/>
           </div>
       </div>
   </div>
</template>
<script>
    import SemesterManager from "../components/SemesterManager";
    import ACalendar from "../components/aCalendar";
    import SemesterRegions from "../components/SemesterRegions";
    import AddToPeriod from "../components/AddToPeriod";
    export default {
        name: "SemesterVIew",
        components: {AddToPeriod, SemesterRegions, ACalendar, SemesterManager},
        data(){
            return {

                semester: {
                    name: '',
                    start_time:new Date(),
                    end_time:new Date(),
                    regions: [],
                },
                periodAddData:{
                    single: true,
                    start:new Date(),
                    end: new Date(),
                },

            }
        },
        methods:{
            newCalendarPeriod(data){
                    this.$refs.periodAdd.openModal();
                    this.periodAddData.single = !data.end;
                    this.periodAddData.start = data.start;
                    this.periodAddData.end = data.end;
                    this.semester.regions = this.$refs.regions.getRegions();
            },
            addPeriod(data){
                this.$refs.calendar.finishDrag();
                let index = 0;
                let start = new Date(data.start);

                while(start.getTime()!=this.semester.days[index].getTime())
                    index++;

                if(!isNaN(data.end)){
                    for(;start<=data.end;start.setDate(start.getDate()+1))
                    {

                        this.semester.days[index].color = this.semester.regions[data.period].color;
                        index++;
                    }
                }else
                    this.semester.days[index].color = this.semester.region[data.period].color;
            },
            finishDrag(){
                this.$refs.calendar.finishDrag();
            },
             selected(semester){
                this.semester =  {
                    name: '',
                    start_time:new Date(),
                    end_time:new Date(),
                    regions: [],
                };
                this.semester = semester;
            }
        },


    }
</script>

<style scoped>
    .semester{
        opacity: 0;
        transition: 0.4s ease;
        top:20px;
    }
    .show-semester{
        opacity: 1;
        top:0;
    }

</style>
