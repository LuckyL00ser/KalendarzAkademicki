<template>
    <div>
        <navbar/>
        <div class="container pt-2">
            <div class="col-12 col-md-10 col-lg-8  mx-auto">
                <router-view />
            </div>

        </div>

        <div :class="[ `alert-${type}`, 'alert container col-sm-10 col-lg-6 col-md-8 fixed-bottom' ]" role="alert" v-if="show">
                <div class="row">
                    <div class="col my-auto">{{message}}</div>
                    <div
                        class="btn flex-shrink"
                        @click="$store.dispatch('alert/removeAlert')"
                    >&times;</div>
                </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import Navbar from "./Navbar";


    export default {
        name: "MainApp",
        components: {Navbar},
        computed: {
            ...mapState('alert', {
                show: state => state.show,
                message: state => state.message,
                type: state => state.type,
            }),
        }

    }
</script>

<style >
    .btn i{
        margin-left:4px;
    }

</style>
