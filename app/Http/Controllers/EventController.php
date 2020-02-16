<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Event;
use Auth;
use App\Course;
use DB;

class EventController extends Controller
{
    public function getEvent($eventId){

            $event = Event::with('course')->whereId($eventId)->first();
            return response()->json([
                "event"=>$event
            ],200);
    }
    public function getCourseEvents($courseId){



               $courseEvents = Event::with('course:id,name')->whereHas('course', function ($query) use ($courseId) {
                                   $query->where('id', '=', $courseId);
                               })->select('id','name as title','start_time as start','end_time as end','course_id')
                               ->get();
                return response()->json([
                    "events"=>$courseEvents
                ],200);
    }
    public function getUserEvents(){
                    $userId = Auth::user()->id;

                    $userEvents = Event::with('course:id,name')->whereHas('course.participation', function ($query) use ($userId){
                                             $query->where('user_id',$userId);
                                         })->select('id','name as title','start_time as start','end_time as end','course_id',DB::raw('FALSE as teacher'));
                    $userTeacherEvents = Event::with('course:id,name')->whereHas('course', function ($query) use ($userId){
                                                     $query->where('user_id',$userId);
                                        })
                                        ->select('id','name as title','start_time as start','end_time as end','course_id',DB::raw('TRUE as teacher'))
                                        ->union($userEvents)->get();

                    return response()->json([
                        "events"=>$userTeacherEvents
                    ],200);
        }
     public function createEvent(Request $request){
                         $userId = Auth::user()->id;
                         $course = Course::whereId($request->id)->first();

                         if( $course->user_id == $userId ){

                                $event = new Event;
                                $event->name = $request->name;
                                $event->start_time = $request->start_time;
                                $event->end_time = $request->end_time;
                                $event->course_id = $request->id;

                                $event->save();
                                 return response()->json([
                                    "created_event"=>$event
                                 ],200);
                         }else{
                                 return response()->json([
                                     "You can't create event for this course"
                                 ],405);
                         }

             }
             public function removeEvent($id){

                         $event = Event::whereId($id)->first();

                         if(Auth::user()->id == $event->course->user_id){

                             $event->delete();

                             return response()->json("deleted",200);
                         }
                         else{
                             return response()->json("You can't delete someone's else event",405);
                         }

                     }

}
