<template>
    <div class="row justify-content-center p-4">
        <form @submit.prevent="register" class="col-12 col-sm-8 col-md-6">
            <div class="form-group row" >
                <label for="name" >Imię i nazwisko: </label>
                <input type="text" v-model.trim="$v.form.name.$model" class="form-control "  placeholder="Imię i nazwisko">
                <div v-if="$v.form.name.$dirty && submitted">
                    <small class=" text-danger" v-if="!$v.form.name.required">To pole jest wymagane</small>
                    <small class=" text-danger" v-if="!$v.form.name.minLength">Zbyt krótkie, minimum 4 znaki</small>
                    <small class=" text-danger" v-if="!$v.form.name.maxLength">Zbyt długie, maximum 30 znaków</small>
                </div>
            </div>

            <div class="form-group row" >
                <label for="email" >Email: </label>
                <input  v-model.trim="$v.form.email.$model" class="form-control "  placeholder="Email">
                <div v-if="$v.form.email.$dirty && submitted">
                    <small class=" text-danger" v-if="!$v.form.email.required">To pole jest wymagane</small>
                    <small class=" text-danger" v-if="!$v.form.email.email">Proszę podać prawidłowy email</small>
                    <small class=" text-danger" v-if="!$v.form.email.minLength">Zbyt krótkie, minimum 6 znaków</small>
                    <small class=" text-danger" v-if="!$v.form.email.maxLength">Zbyt długie, maximum 30 znaków</small>
                </div>
            </div>

            <div class="form-group row" >
                <label for="password" >Hasło: </label>
                <input type="password" v-model.trim="$v.form.password.$model" class="form-control "  placeholder="Hasło">
                <div v-if="$v.form.password.$dirty && submitted">
                    <small class=" text-danger" v-if="!$v.form.password.required">To pole jest wymagane</small>
                    <small class=" text-danger" v-if="!$v.form.password.minLength">Zbyt krótkie, minimum 6 znaków</small>
                    <small class=" text-danger" v-if="!$v.form.password.maxLength">Zbyt długie, maximum 30 znaków</small>
                </div>
            </div>

            <div class="form-group row" >
                <label for="password" >Powtórz hasło: </label>
                <input type="password" v-model.trim="$v.passwordRepeat.$model" class="form-control " placeholder="Powtórz hasło">
                <div v-if="$v.passwordRepeat.$dirty">
                    <small class=" text-danger" v-if="!$v.passwordRepeat.sameAs">Podane hasła różnią się</small>
                </div>

            </div>

            <div class="form-group row">
                <input type="submit" class="btn btn-success w-100" value="Zarejestruj">
            </div>

        </form>
    </div>
</template>

<script>
    import {required, minLength,maxLength, sameAs, email} from 'vuelidate/lib/validators';
    export default {
        name: "Register",
        data(){
            return {
                form: {
                    name: '',
                    email: '',
                    password: '',
                },
                passwordRepeat: '',
                submitted: false,
            }
        },
        validations:{
            form: {
                name: {
                    required,
                    minLength: minLength(4),
                    maxLength: maxLength(30),
                },
                password: {
                    required,
                    minLength: minLength(6),
                    maxLength: maxLength(60),
                },
                email: {
                    required,
                    minLength: minLength(6),
                    maxLength: maxLength(60),
                    email,
                }
            },
            passwordRepeat: {
                sameAs: sameAs(function(){return this.form.password})
            }
        },
        methods: {
                register(){
                    this.submitted=true;
                    this.$v.$touch();
                    if (!this.$v.$invalid) {
                        this.$store.dispatch('user/register',this.form).then(()=>{
                            this.$router.push('/login');
                        }).catch((err)=>{});
                        console.log('ok')
                        this.$v.$reset();
                    }
                }
        }
    }
</script>

<style >

</style>
