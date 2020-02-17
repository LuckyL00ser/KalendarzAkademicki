<template>
    <div class="container text-center my-auto">
        <div class="row">
            <router-link tag="div" to="/my-courses" class="col card py-5 m-1 border">
                <h5>
                    <i class="fas fa-clipboard-list mr-2 d-block d-sm-inline"></i>
                    <span class="d-block d-sm-inline">Twoje kursy</span>
                </h5>
            </router-link>
            <router-link tag="div" to="/courses" class="col card py-5 m-1 border">
                <h5>
                <i class="fas fa-search mr-2 d-block d-sm-inline"></i>
                <span class="d-block d-sm-inline">Przeglądarka kursów</span>
                </h5>
            </router-link>

        </div>
        <div class="row">
            <router-link tag="div" to="/academic-calendar" class="col card py-5 m-1 border">
                <h5>
                <i class="far fa-calendar-alt mr-2"></i>Kalendarz zajęć
                </h5>
            </router-link>

        </div>
    </div>
</template>

<script>
    export default {
        name: "Dashboard"
    }
</script>

<style scoped>
.card{
        transition-duration: .5s;

        }
.card:hover{
    background-color: lightgray;
    cursor: pointer;
    color: #3490dc;
}
</style>
