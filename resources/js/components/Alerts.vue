<template>
    <div :class="[ show?'show':'' ,'toast fade fixed-bottom mx-auto mb-2']" >
        <div class="toast-header">
            <strong class="mr-auto">Powiadomienie</strong>
            <small>{{type}}</small>
            <button type="button" class="ml-2 mb-1 close" >
                <span  @click="$store.dispatch('alert/removeAlert')">&times;</span>
            </button>
        </div>
        <div class="toast-body">
            {{message}}
        </div>
    </div>
</template>

<script>
    import {mapState} from "vuex";

    export default {
        name: "Alerts",
        computed: {
            ...mapState('alert', {
                show: state => state.show,
                message: state => state.message,
                type: state => state.type,
            }),
        },
        methods: {
            callToast(){

            }
        }

    }
</script>

<style scoped>

</style>
