<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Course;
use Auth;

class CourseController extends Controller
{
    public function all(){
        $courses = Course::all();
        return response()->json([
            "courses"=>$courses
        ],200);
    }
     public function get($id){
         $course = Course::with('user')->whereId($id)->first();


         return response()->json([
             "course"=>$course
         ],200);
     }
     public function getCoursesAsTeacher(){
              $courses = Course::select('id','name')->where('user_id',Auth::user()->id)->get();


              return response()->json([
                  "courses"=>$courses
              ],200);
          }
     public function new(Request $request){
         $course = new Course;
         $course->name = $request->name;
         $course->user_id =  $id = Auth::user()->id;
         $course->save();

        // $course = Course::create($request->only(["name","user_id"]));
          return response()->json([
                "course" => $course
             ],200);
         }
         public function remove($id){
                  $course = Course::whereId($id)->first();

                  if($course->user_id == Auth::user()->id){
                    $course->delete();
                    return response()->json("deleted",200);
                    }
                    else{
                        return response()->json(
                                     "You didn't create this course, you can't delete it"
                                      ,200);
                    }

         }

}
