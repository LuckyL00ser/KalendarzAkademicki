<template>
    <nav class="navbar navbar-light shadow-sm">
        <router-link class="navbar-brand" to="/">Student
            <a class="text-bold text-primary">
                <i class="fas fa-plus-square"></i>
            </a>
        </router-link>
        <div v-if="$store.state.user.isLoggedIn">
            <a>
                <i class="far fa-user-circle"></i>
                {{$store.state.user.currentUser.name}}
            </a>
            <a @click="logout" class="ml-2" href="#">Wyloguj</a>
        </div>

        <div v-else>
            <router-link to="/login">
                Logowanie
            </router-link>
            <router-link to="/register" class="ml-2">
                Rejestracja
            </router-link>
        </div>
    </nav>
</template>

<script>

    export default {
        name: "Navbar",
        methods:{
            logout(){
                this.$store.dispatch('user/logout')
                this.$router.push('/login');


            }
        }


    }
</script>

<style scoped>

</style>
