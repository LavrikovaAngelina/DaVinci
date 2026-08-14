<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $table = 'tasks';
    protected $primaryKey = 'task_id';
    public $timestamps = false;

    protected $fillable = ['user_id', 'tag_id_1', 'tag_id_2', 'tag_id_3'];

    public function userid()
    {
        return $this->belongTo(Tag::class, 'user_id', 'user_id');
    }

    public function tag1()
    { 
        return $this->belongsTo(Tag::class, 'tag_id_1', 'tag_id'); 
    }

    public function tag2()
    { 
        return $this->belongsTo(Tag::class, 'tag_id_2', 'tag_id'); 
    }

    public function tag3()
    { 
        return $this->belongsTo(Tag::class, 'tag_id_3', 'tag_id'); 
    }
}
