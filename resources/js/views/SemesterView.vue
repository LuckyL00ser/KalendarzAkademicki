<template>
   <div>
       <semester-manager @selectedSemesterIndex="selected"/>
       <div :class="{'show-semester':selectedSemesterIndex!=null}" class="card mt-4 semester">
           <div class="card-header">
              <h4 class="mb-0">Edytujesz: {{semester.name}}</h4>
               <p>{{semester.startDate.toLocaleDateString('pl')}} - {{semester.endDate.toLocaleDateString('pl')}}</p>
           </div>
           <div class="card-body">
               <AcademicCalendar  :start_date="semester.startDate" :end_date="semester.endDate" :regions="semester.regions" />
               <semester-regions :periods="semester.regions" @removePeriod="removePeriod" @newPeriod="newPeriod"/>
           </div>
       </div>
   </div>
</template>
<script>
    import SemesterManager from "../components/SemesterManager";
    import AcademicCalendar from "../components/AcademicCalendar";
    import SemesterRegions from "../components/SemesterRegions";


    export default {
        name: "SemesterView",
        components: { SemesterRegions, AcademicCalendar, SemesterManager},
        data(){
            return {
                selectedSemesterIndex: null,
            }
        },
        computed: {
            semester(){
                return this.$store.getters['semester/getSemester'](this.selectedSemesterIndex)
            }
        },
        methods:{
             selected(semesterIndex){
                this.selectedSemesterIndex = semesterIndex;
            },
            removePeriod(periodIndex){
                 this.$store.dispatch('semester/removePeriod',
                     {semester:this.selectedSemesterIndex,
                         periodIndex:periodIndex});
            },
            newPeriod(data){
                this.$store.dispatch('semester/newPeriod',
                    {semester:this.selectedSemesterIndex,
                        period:data});
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
