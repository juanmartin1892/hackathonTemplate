<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Todo extends Model {

    protected $fillable = ['name', 'description', 'completed'];

    public function getCompletedAttribute($value)
    {
        return (boolean) $value;
    }
}
