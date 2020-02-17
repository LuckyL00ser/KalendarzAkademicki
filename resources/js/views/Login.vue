<template>
    <div class="row justify-content-center p-4">
        <form @submit.prevent="login" class="col-12 col-sm-8 col-md-6 ">
            <div class="form-group row">
                <label for="email">Email: </label>
                <input type="email" v-model="form.email" class="form-control" placeholder="adres email">
            </div>
            <div class="form-group row">
                <label for="password">Hasło: </label>
                <input type="password" v-model="form.password" class="form-control" placeholder="Haslo">
            </div>
            <div class="form-group row">
                 <input type="submit" class="btn btn-success w-100" value="Zaloguj się">
            </div>

        </form>
    </div>
</template>

<script>

    export default {
        name: "Login",
        data(){
            return {
                form: {
                    email: '',
                    password: ''
                },
            }
        },
        methods: {
            login(){
                this.$store.dispatch('user/login',this.form).then(()=>{
                    this.$router.push('/');
                });
            }
        },
    }
</script>

<style scoped>

</style>
