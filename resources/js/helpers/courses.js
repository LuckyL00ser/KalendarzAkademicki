function getAllCourses(){
    return axios.get('/api/courses');
}

function getCourse(id){
    return axios.get(`/api/course/${id}`)
}
function getCoursesAsTeacher(){
    return axios.get(`/api/courses-teacher`);
}
function getMyCourses(){
    return axios.get('/api/user-participations');
}
function createCourse(newCourse){
    return axios.post('/api/course/new',newCourse);
}
function deleteCourse(id) {
    return axios.delete(`/api/course/${id}`);
}

export {getCourse,getAllCourses,createCourse,deleteCourse, getMyCourses, getCoursesAsTeacher};
