<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Picture extends Model
{
    protected $table = 'pictures';
    protected $primaryKey = 'picture_id';
    public $timestamps = false;

    protected $fillable = ['user_id', 'picture_url', 'task_id', 'pic_name', 'pic_description'];

    protected $appends = ['image_url'];

    public function user() { return $this->belongsTo(User::class, 'user_id', 'id'); }
    public function task() { return $this->belongsTo(Task::class, 'task_id', 'task_id'); }

    public function getImageUrlAttribute(): ?string
    {
        return $this->picture_url ? Storage::url($this->picture_url) : null;
    }
}