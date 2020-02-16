<template>
    <Modal v-on:done="createNewCourse"  ref="modal">
        <template v-slot:modal-launch>Dodaj kurs<i class="fas fa-plus-circle"></i></template>
        <template  v-slot:modal-title>Nowy kurs</template>
        <template>
            <form class="form-group" @submit.prevent="createNewCourse" >
                <input type="text" class="form-control w-100" placeholder="nazwa" v-model="course.name"/>
            </form>
        </template>

    </Modal>

</template>

<script>
    import Modal from './Modal'

    export default {
        name: "NewCourse",
        components: {Modal},
        data(){
            return {
                course: {
                    name: '',
                    user_id: this.$store.state.user.currentUser.id,

                }

            }
        },
        methods: {
            createNewCourse(){
                this.$store.dispatch('courses/createCourse',this.course).then(()=>this.course.name='')
                this.$refs.modal.closeModal();

            },
        },

    }
</script>

<style lang="scss" >

#new-calendar{
    .fc-dayGrid-view .fc-body .fc-row{
        min-height: 0;
    }
    .fc td, .fc th {
        border-style: none !important;

    }
}

</style>
