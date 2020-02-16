function participateInCourse(data){
    return axios.post('/api/participate',data);
}

function getParticipationForCourse(courseId){
    return axios.get(`/api/participation/${courseId}`);
}
function deleteParticipation(courseId){
    return axios.delete(`/api/participation/${courseId}`)
}

export  {participateInCourse,  getParticipationForCourse, deleteParticipation}

