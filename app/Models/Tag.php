<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    protected $table = 'tags';
    protected $primaryKey = 'tag_id';
    public $timestamps = false;

    protected $fillable = ['tag_name', 'parent_id'];

    public function children()
    {
        return $this->hasMany(Tag::class, 'parent_id', 'tag_id');
    }
}
