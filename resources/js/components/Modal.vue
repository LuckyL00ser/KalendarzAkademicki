<template>
    <div @keyup.esc="closeModal">
        <button type="button" class="btn btn-outline-primary" @click="showModal" v-if="!disableLauncher">
            <slot name="modal-launch"></slot>
        </button>
        <div :class="[ show?'display-modal ':'', 'modal fade show' ]" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">
                            <slot name="modal-title"></slot>
                        </h5>
                        <button type="button" class="close"  @click="closeModal">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <slot></slot>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-dismiss="modal" @click="closeModal">
                            <slot name="modal-dismiss">Anuluj<i class="fas fa-ban"></i></slot>
                        </button>
                        <button type="button" class="btn btn-primary" @click="$emit('done')">
                            <slot name="modal-accept">Gotowe<i class="far fa-check-circle"></i></slot>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>


</template>

<script>
    export default {
        name: "Modal",
        props: {
            disableLauncher: {
                type: Boolean,
                default: false,
            }
        },
        data(){
            return{
                show: false,
            }
        },
        methods: {
            showModal(){
                this.show=true;
            },
            closeModal(){
                this.show=false;
                this.$emit('closed');
            }
        }
    }
</script>

<style scoped>
.display-modal{
    display: block;
    background-color: rgba(0, 0, 0, 0.29);
}
</style>
