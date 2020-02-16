<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $fillable = [
                'name',
                'start_time',
                'end_time',
                'course_id'
            ];

    public function  course(){
        return $this->belongsTo('App\Course')->with('user');
    }
}
