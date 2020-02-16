<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::group(['prefix' => 'auth'], function ($router) {

    Route::post('login', 'AuthController@login');
    //Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    //Route::post('me', 'AuthController@me');
    Route::post('register', 'AuthController@register');

    Route::group(['middleware' => 'auth:api'], function(){
            Route::get('user', 'AuthController@user');
            Route::post('logout', 'AuthController@logout');
        });

});

Route::group(['middleware' => 'jwt.auth'], function ($router) {

    Route::get('courses','CourseController@all');
    Route::get('course/{id}','CourseController@get');
    Route::get('courses-teacher','CourseController@getCoursesAsTeacher');
    Route::post('course/new','CourseController@new');
    Route::delete('course/{id}','CourseController@remove');


    Route::get('user-participations','ParticipationController@userParticipations');
    Route::get('participation/{courseId}','ParticipationController@getParticipationForCourse');
    Route::post('participate','ParticipationController@addParticipation');
    Route::delete('participation/{id}','ParticipationController@removeParticipation');

    Route::get('event/{id}','EventController@getEvent');
    Route::get('course/{courseId}/events','EventController@getCourseEvents');
    Route::get('event-user','EventController@getUserEvents');
    Route::post('event','EventController@createEvent');
    Route::delete('event/{id}','EventController@removeEvent');
});
