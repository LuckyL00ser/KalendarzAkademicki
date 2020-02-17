<template>
    <div>
        <navbar/>
        <div class="container px-0 pt-sm-3 pt-3 pb-3 overflow-hidden">
            <div class="col col-md-10 col-lg-8 col-xl-7 mx-auto px-1 ">
                <router-view />
            </div>
        </div>
        <div class="container col-sm-10 col-lg-6 col-md-8 fixed-bottom"  v-if="show">
            <div :class="[ `alert-${type}`, 'alert mx-2']" role="alert" >
                <div class="row">
                    <div class="col my-auto">{{message}}</div>
                    <div
                        class="btn "
                        @click="$store.dispatch('alert/removeAlert')"
                    >&times;</div>
                </div>
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
