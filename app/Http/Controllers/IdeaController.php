<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Picture;
use App\Models\Task;

class IdeaController extends Controller
{
    public function index(Request $request)
    {
        $cards = Picture::with([
            'user',
            'task.tag1',
            'task.tag2',
            'task.tag3',
        ])
            ->orderByDesc('picture_id')
            ->get()
            ->map(fn (Picture $picture) => [
                'id' => $picture->picture_id,
                'description' => $picture->pic_name,
                'thumbnail' => $picture->image_url,
                'tags' => collect([
                    $picture->task?->tag1,
                    $picture->task?->tag2,
                    $picture->task?->tag3,
                ])
                    ->filter()
                    ->map(fn ($tag) => $tag->tag_name)
                    ->values()
                    ->all(),

                'author' => $picture->user?->name ?? 'Неизвестный пользователь',
            ]);

        return Inertia::render('ideas/index', [
            'cards' => $cards,
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'task_id'         => ['required', 'integer', 'exists:tasks,task_id'],
            'pic_name'        => ['required', 'string', 'max:255'],
            'pic_description' => ['nullable', 'string'],
            'image'           => ['required', 'image', 'mimes:jpeg,png,webp', 'max:5120'],
        ]);

        Picture::create([
            'user_id'         => $request->user()->id,
            'task_id'         => $data['task_id'],
            'pic_name'        => $data['pic_name'],
            'pic_description' => $data['pic_description'] ?? null,
            'picture_url'     => $request->file('image')->store('works', 'public'),
        ]);

        Task::where('task_id', $data['task_id'])
        ->where('user_id', $request->user()->id)
        ->update(['is_completed' => true]);

        return back();
    }
}
