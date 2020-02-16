<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    protected $table = 'course';
    protected $fillable = ['name','user_id'];

    public function user()
     {
            return $this->belongsTo('App\User');
     }
     public function events()
     {
            return $this->hasMany('App\Event');
     }
     public function participation()
     {
            return $this->hasMany('App\Participation');
     }
}
