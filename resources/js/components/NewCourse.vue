<template>
    <Modal v-on:done="createNewCourse"  ref="modal">
        <template v-slot:modal-launch>Dodaj kurs<i class="fas fa-plus-circle"></i></template>
        <template  v-slot:modal-title >Nowy kurs</template>
        <template>
            <form class="form-group" @submit.prevent="createNewCourse" >
                <input type="text" class="form-control w-100" placeholder="nazwa" v-model.trim="$v.course.name.$model"/>
                <div v-if="$v.course.name.$dirty && submitted">
                    <small class=" text-danger" v-if="!$v.course.name.required">To pole jest wymagane</small>
                    <small class=" text-danger" v-if="!$v.course.name.minLength">Zbyt krótkie, minimum 4 znaki</small>
                    <small class=" text-danger" v-if="!$v.course.name.maxLength">Zbyt długie, maximum 30 znaków</small>
                </div>
            </form>
        </template>

    </Modal>

</template>

<script>
    import {required, minLength,maxLength} from 'vuelidate/lib/validators';
    import Modal from './Modal'

    export default {
        name: "NewCourse",
        components: {Modal},
        data(){
            return {
                course: {
                    name: '',
                    user_id: this.$store.state.user.currentUser.id,

                },
                submitted: false,

            }
        },
        validations: {
            course: {
                name: {
                    required,
                    minLength: minLength(4),
                    maxLength: maxLength(30),
                },
            },
        },
        methods: {
            createNewCourse(){
                this.submitted=true;
                this.$v.$touch();
                if (!this.$v.$invalid) {
                    this.$store.dispatch('courses/createCourse',this.course).then(()=>this.course.name='')
                    this.$refs.modal.closeModal();
                    this.$v.$reset();
                }

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
