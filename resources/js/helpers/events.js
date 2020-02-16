function getEvent(id){
    return axios.get(`/api/event/${id}`);
}
function getCourseEvents(courseId){
    return axios.get(`/api/course/${courseId}/events`);
}
function getUserEvents(){
    return axios.get('/api/event-user');
}
function createNewEvent(data){
    return axios.post('/api/event',data);
}
function deleteEvent(id){
    return axios.delete(`/api/event/${id}`);
}


export  {getEvent,  getCourseEvents, getUserEvents, deleteEvent, createNewEvent}

