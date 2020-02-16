<template>
    <div class="row justify-content-center p-4">
        <form @submit.prevent="register" class="col-12 col-sm-8 col-md-6">
            <div class="form-group row">
                <label for="name">Imię i nazwisko: </label>
                <input type="text" v-model="form.name" class="form-control" placeholder="Imię i nazwisko">
            </div>
            <div class="form-group row">
                <label for="email">Email: </label>
                <input type="email" v-model="form.email" class="form-control" placeholder="Email">
            </div>
            <div class="form-group row">
                <label for="password">Hasło: </label>
                <input type="password" v-model="form.password" class="form-control" placeholder="Haslo">
            </div>
            <div class="form-group row">
                <label for="password">Powtórz hasło: </label>
                <input type="password" v-model="passwordRepeat" class="form-control" placeholder="powtorz haslo">
            </div>
            <div class="form-group row">
                <input type="submit" class="btn btn-success w-100" value="Zarejestruj">
            </div>

        </form>
    </div>
</template>

<script>

    export default {
        name: "Register",
        data(){
            return {
                form: {
                    name: '',
                    user: '',
                    password: '',
                },
                passwordRepeat: '',
            }
        },
        methods: {

                register(){
                    this.$store.dispatch('user/register',this.form).then(()=>{
                        this.$router.push('/login');
                    }).catch((err)=>{});

                }

        }
    }
</script>

<style scoped>

</style>
