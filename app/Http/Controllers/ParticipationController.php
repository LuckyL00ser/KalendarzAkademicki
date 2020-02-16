<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Participation;
use Auth;
use App\Course;

class ParticipationController extends Controller
{
    public function userParticipations(){
        $userId = Auth::user()->id;

      $userCourses = DB::table('participations')//->select(['participations.user_id','course.user_id','course.id','name'])
                    ->leftJoin('course', 'participations.course_id', '=', 'course.id')
                    ->where('participations.user_id',$userId)
                  ->get(['name','participations.id AS participation_id','course.id','participations.user_id AS user_participate_id']);


        return response()->json([
            "participations"=>$userCourses
        ],200);
    }

    public function getParticipationForCourse($courseId){
        $userId = Auth::user()->id;
        $participation = Participation::where(['course_id' => $courseId, 'user_id' => $userId])->first();
        return response()->json(["participation"=>$participation],200);

    }

    public function addParticipation(Request $request){
            $userId = Auth::user()->id;
            $participation = new Participation;
            $participation->user_id = $userId;
            $participation->course_id = $request->course_id;


            $course = Course::whereId($request->course_id)->first();

            if( $course->user_id != $userId ){
                $participation->save();
                 return response()->json([
                                "participation"=>$participation
                 ],200);
            }else{
                return response()->json([
                                    "You can't participate in your own course!"
                ],405);
            }
    }
    public function removeParticipation($courseId){
            $userId = Auth::user()->id;
            $participation = Participation::where(['course_id' => $courseId, 'user_id' => $userId])->first();

            if(Auth::user()->id==$participation->user_id){

                $participation->delete();

                return response()->json("deleted",200);
            }
            else{
                return response()->json("You can't delete someone's else participation",200);
            }

        }



}
