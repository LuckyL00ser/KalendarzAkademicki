<template>
    <FullCalendar defaultView="timeGridWeek"
                  :events="events"
                  theme-system="bootstrap"
                  :plugins="calendarPlugins"
                  locale="pl"
                  :locales="locales"
                  height="auto"
                  :header="header"
                  :button-icons="buttonIcons"
                  :column-header-format="columnFormat"
                  slot-duration="01:00:00"
                  slot-label-interval="04:00:00"
                  :slot-label-format="slotFormat"
                  :all-day-slot="false"
                  :event-render="renderEvents"
                  :display-event-time="false"
                  event-class-name="hoverable"
                  @eventClick="handleClickDate"/>
</template>

<script>
    import FullCalendar from '@fullcalendar/vue'
    import timeGridPlugin from '@fullcalendar/timegrid'
    import plLocale from '@fullcalendar/core/locales/pl';
    import bootstrapPlugin from '@fullcalendar/bootstrap'
    import interactionlugin from '@fullcalendar/interaction';
    export default {

        name: "Calendar",
        props: {
            events: Array,
            options: {
                type: Object,
                default: function () {
                    return {


                    }
                }
            }
        },
        components: {FullCalendar},
        data(){
            return {
                calendarPlugins: [timeGridPlugin, bootstrapPlugin, interactionlugin],
                slotFormat:{
                    hour: 'numeric',
                    minute: 'numeric',
                    omitZeroMinute:false,

                },
                columnFormat: {
                    weekday:'short'
                },
                header: {
                    left: 'title',
                    center: '',
                    right: 'prev,next'
                },
                buttonIcons:{

                prev: 'left-single-arrow',
                    next: 'right-single-arrow',
                prevYear: 'left-double-arrow',
                nextYear: 'right-double-arrow'

                },
                locales: [plLocale],
            }
        },
        methods: {
            handleClickDate(data){
                this.$emit('eventClicked',data.event._def.publicId);
            },
            renderEvents(info) {
                let courseLabel = document.createElement("b");                 // Create a <li> node
                courseLabel.classList.add('d-block');
                if(info.event.extendedProps.teacher)
                    info.el.classList.add('teacher-event')
                courseLabel.textContent = info.event.extendedProps.course.name;
                info.el.firstChild.appendChild(courseLabel);

                //info.el.firstChild.innerHTML = info.event.extendedProps.course.name;
            }
        },
        computed: {
            eventSources() {
                return {
                    ...this.options,

                    events: this.events,
                }
            }
        }
    }
</script>

<style  lang="scss">
    @import '~@fullcalendar/core/main.css';
    @import '~@fullcalendar/daygrid/main.css';
    @import '~@fullcalendar/timegrid/main.css';
    .hoverable:hover{
        cursor: pointer;
    }
    .fc-event {
        background-color: lightblue;

    }
    .teacher-event{
        background-color: #d2ecb2  !important;
    }
    .fc-view-container{
        overflow-x: scroll;
    }
    .fc-view-container>*{
        min-width:500px;
    }

</style>
