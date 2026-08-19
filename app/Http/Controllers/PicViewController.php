<?php

namespace App\Http\Controllers;

use App\Models\Picture;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Task;

class PicViewController extends Controller
{
    public function index(Request $request,int $picture)
    {
        $picture = Picture::with([
            'user',
            'task.tag1',
            'task.tag2',
            'task.tag3',
        ])
            ->where('picture_id', $picture)
            ->firstOrFail();

        $tagIds = collect([
            $picture->task?->tag_id_1,
            $picture->task?->tag_id_2,
            $picture->task?->tag_id_3,
            ])
            ->filter()
            ->values()
            ->all();

        $favoriteTask = Task::where('user_id', $request->user()->id)
                ->where('tag_id_1', $tagIds[0] ?? null)
                ->where('tag_id_2', $tagIds[1] ?? null)
                ->where('tag_id_3', $tagIds[2] ?? null)
            ->first();
        
        if ($favoriteTask != null && $favoriteTask->is_completed != null){
                $is_done = $favoriteTask?->is_completed;
            }
            else{
                $is_done = false;
            }

        $data = [
            'id' => $picture->picture_id,
            'name' => $picture->pic_name,
            'description' => $picture->pic_description,
            'image' => $picture->image_url,
            'author' => $picture->user?->name ?? 'Неизвестный пользователь',
            'author_id' => $picture->user?->id,

            'tags' => collect([
                $picture->task?->tag1,
                $picture->task?->tag2,
                $picture->task?->tag3,
            ])
                ->filter()
                ->map(fn ($tag) => $tag->tag_name)
                ->values()
                ->all(),
            
            'tag_ids' => $tagIds,
            'favorite_task_id' => $favoriteTask?->task_id,
            'is_completed' => $is_done,
            
        ];

        // echo $picture->task?->tag_id_1;
        // echo $tagIds[0] ?? null;
        // echo $normalizedTagIds[0] ?? null;


        return Inertia::render('picview/index', [
            'picture' => $data,
        ]);
    }
}