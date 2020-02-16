<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Participation extends Model
{
    protected $table = 'participations';
        protected $fillable = [
            'course_id',
            'user_id',
        ];

        public function course(){
            return $this->hasOne("App\Course",'id','course_id');
        }

}
