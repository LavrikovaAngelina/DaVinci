<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FavoriteController extends Controller

{
    public function index(Request $request)
    {
        $tasks = Task::with(['tag1', 'tag2', 'tag3'])
            ->where('user_id', $request->user()->id)
            ->orderByDesc('task_id')
            ->get()
            ->map(fn (Task $task) => [
                'task_id' => $task->task_id,
                'tag_ids' => collect([$task->tag_id_1, $task->tag_id_2, $task->tag_id_3])
                    ->filter()->values(),
                'tags'    => collect([$task->tag1, $task->tag2, $task->tag3])
                    ->filter()
                    ->map(fn ($tag) => $tag->tag_name)
                    ->values(),
            ]);

        return Inertia::render('favorite/index', [
            'ideas' => $tasks,
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'tag_ids'   => ['required', 'array', 'min:1', 'max:3'],
            'tag_ids.*' => ['integer', 'exists:tags,tag_id'],
        ]);

        $task = Task::firstOrCreate([
            'user_id' => $request->user()->id,
            ...Task::normalizeTagIds($data['tag_ids']),
        ]);

        return response()->json(['task_id' => $task->task_id]);
    }

    public function destroy(Request $request, int $task)
    {
        Task::where('task_id', $task)
            ->where('user_id', $request->user()->id)
            ->delete();

        return response()->json(['ok' => true]);
    }
}
