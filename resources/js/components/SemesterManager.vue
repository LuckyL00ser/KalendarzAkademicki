<template>
    <div class="card">
        <div class="card-header border-bottom d-flex justify-content-between flex-column flex-sm-row">
            <h2 >Lista semestrów</h2>
            <NewSemester @createdNewSemester="addSemesterToList"/>
        </div>

        <div class="form-group card-body">
<!--            <loading-component :loading="loading"/>-->

            <select class="form-control" @change="handleSelect" v-model="selected">
                <option  v-for="semester in semesters" :value="semester">{{semester.name}}</option>
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
                semesters: [

                ],
            }
        },
        methods:{
            addSemesterToList(newSemester){
                this.semesters.push(newSemester);
            },
            handleSelect(){
                this.$emit('selectedSemester',this.selected)
            }

        },
    }
</script>

<style scoped>
    .list-group-item-action{
        border-left: none;
        border-right:none;
    }

</style>
