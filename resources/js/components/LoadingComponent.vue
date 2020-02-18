<template>
    <div class="spinner-container" :class="loadingClasses">
        <div class="spinner-border text-info mx-auto my-auto" >
            <span class="sr-only"></span>
        </div>
    </div>

</template>

<script>
    export default {
        props: ['loading'],
        name: "LoadingComponent",
        data(){
            return {
                loadingClasses: 'd-none',
            }
        },
        watch:{
            loading(newVal){
                if(newVal)
                    this.loadingClasses = 'show-loading';
                else{
                    this.loadingClasses='';
                    setTimeout(()=>this.loadingClasses='d-none',500);
                }

            }
        }
    }
</script>

<style scoped>
    .spinner-container{
        background-color: rgba(0, 0, 0, 0.8);
        transition-duration: 0.5s;
        opacity: 0;
        position: absolute;
        width:100%;
        height: 100%;
        left:0;
        top:0;
        display: flex;
        z-index:1000;
        border-radius: 0.25em;

    }
    .show-loading{
        opacity: 1;
    }
</style>
