<template>
    <div >
        <div class="">
            <h4 class="border-top py-4">Okresy w semestrze:</h4>
        </div>
        <div class="list-group mb-2">

            <div class="list-group-item list-group-item-action " v-for="(period,index) in periods" :style="`background-color: ${period.color};`" >
                    <div class="d-flex form-inline"   >
                    <h6 class="mb-0 flex-grow-1">{{period.name}}</h6>
                    <button class="btn btn-danger  ml-2 p-1"  @click="$emit('removePeriod',index)">

                        <i class="far fa-trash-alt ml-0"></i>
                    </button>
<!--                                               <button class="btn rounded-circle btn-collapse"  @click="toggleExpansion(index)" title="Pokaż daty">-->
                            <!--                            <i class="fas fa-chevron-down" :class="{'inverted':isExpanded(index)}"></i>-->
                            <!--                        </button>-->

                </div>
<!--                <div class="pl-4 collapse" :class="{'show':isExpanded(index)}">-->
<!--                    <div v-for="part in period.parts">-->
<!--                        {{part.name}}-->
<!--                        <span>{{part.start_date.toLocaleString()}}</span>-->
<!--                        <span v-if="!part.single"> - {{part.end_date.toLocaleString()}}</span>-->
<!--                    </div>-->
<!--                </div>-->
            </div>

        </div>
        <NewPeriod @newPeriod="$emit('newPeriod',$event)"/>
    </div>
</template>

<script>



    import NewPeriod from "./NewPeriod";
    export default {
        name: "SemesterRegions",
        props: ['periods'],
        components: {NewPeriod},
        data(){
            return {


            }
        },
        methods:{
            getRegions(){
                return this.periods;
            }
        }
    }
</script>

<style scoped>
    i{
        transition: all 0.4s ease;
    }
    i.inverted{
        transform: rotateZ(180deg);
    }
</style>
