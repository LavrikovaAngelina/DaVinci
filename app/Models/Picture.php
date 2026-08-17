<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Picture extends Model
{
    protected $table = 'pictures';
    protected $primaryKey = 'picture_id';
    public $timestamps = false;

    protected $fillable = ['user_id', 'picture_URL', 'task_id', 'pic_name', 'pic_description', 'is_published'];

    protected $appends = ['image_url'];
    protected $casts = ['is_published' => 'boolean'];

    public function user() { return $this->belongsTo(User::class, 'user_id', 'user_id'); }
    public function task() { return $this->belongsTo(Task::class, 'task_id', 'task_id'); }

    public function getImageUrlAttribute(): ?string
    {
        return $this->picture_URL ? Storage::url($this->picture_URL) : null;
    }
}
