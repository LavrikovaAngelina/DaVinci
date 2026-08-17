<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tag;
use App\Models\Task;
use Inertia\Inertia;

class GeneratorController extends Controller
{
    public function index()
    {
        return Inertia::render('gen/index', [
            'categories' => Tag::whereNull('parent_id')->get(['tag_id', 'tag_name']),
        ]);
    }

    public function idea(Request $request)
    {
        $categoryIds = collect($request->input('categories', []))
            ->filter()
            ->map(fn ($id) => (int) $id);

        $parts = $categoryIds->map(function (int $categoryId) {
            $category = Tag::find($categoryId);
            $tag = Tag::where('parent_id', $categoryId)->inRandomOrder()->first();

            if (! $category ||! $tag) {
                return null;
            }

            return [
                'tag_id'   => $tag->tag_id,
                'tag_name' => $tag->tag_name,
                'category' => $category->tag_name,
            ];
        })
        ->filter()
        ->values();

        $task = Task::where('user_id', $request->user()->id)
        ->where(Task::normalizeTagIds($parts->pluck('tag_id')->all()))
        ->first();

        return response()->json(['parts' => $parts, 'task_id' => $task?->task_id,]);
    }

}
