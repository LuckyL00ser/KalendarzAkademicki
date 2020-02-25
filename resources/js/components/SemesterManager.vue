<template>
    <div class="card">
        <div class="card-header border-bottom d-flex justify-content-between flex-column flex-sm-row">
            <h2 >Lista semestrów</h2>
            <NewSemester @newSemesterCreated="addNewSemester"/>
        </div>

        <div class="form-group card-body">
<!--            <loading-component :loading="loading"/>-->

            <select class="form-control" @change="$emit('selectedSemesterIndex',selected)" v-model="selected">
                <option  v-for="(semester,index) in semesters" :value="index">{{semester.name}}</option>
            </select>



        </div>
    </div>
</template>

<script>
    import NewSemester from "./NewSemester";
    export default {
        name: "SemesterManager",
        components: {NewSemester},
        data(){
            return {
                selected: null,
            }
        },
        computed: {
          semesters(){
              return this.$store.state.semester.semesters;
          }
        },
        methods:{
            addNewSemester(newSemester){
                this.$store.dispatch('semester/addSemester',newSemester);
            },

        },
    }
</script>

<style scoped>
    .list-group-item-action{
        border-left: none;
        border-right:none;
    }

</style>
