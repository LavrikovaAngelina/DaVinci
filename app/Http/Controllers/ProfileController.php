<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Picture;
use App\Models\User;
use Illuminate\Http\Request;
use App\Models\Task;

class ProfileController extends Controller
{
    public function index(int $id)
    {
        $user = User::findOrFail($id);

        $cards = Picture::where('user_id', $user->id)
            ->orderByDesc('picture_id')
            ->get()
            ->map(function ($picture) use ($user) {
                return [
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
                    'userpic' => $picture->user?->userpic,
                    'author_id' => $picture->user?->id,
                ];
            });

        return Inertia::render('profile/index', [
            'username' => $user->name,
            'description' => $user->profile_description,
            'cards' => $cards,
            'userpic' => $user->userpic,
        ]);
    }

    public function my_page()
    {
        $user = Auth::user();

        $cards = Picture::where('user_id', $user->id)
            ->orderByDesc('picture_id')
            ->get()
            ->map(function ($picture) use ($user) {
                return [
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
                    'userpic' => $picture->user?->userpic,
                    'author_id' => $picture->user?->id,
                ];
            });

        return Inertia::render('profile/index', [
            'username' => $user->name,
            'description' => $user->profile_description,
            'cards' => $cards,
            'userpic' => $user->userpic,
        ]);
    }

    public function edit(request $request)
    {
        $user = Auth::user();

        return Inertia::render('profile/edit/description', [
            'description' => $user->profile_description,
        ]);
    }

    public function update(Request $request, int $picture)
    {
        $data = $request->validate([
            'pic_name' => ['required', 'string', 'max:255'],
            'pic_description' => ['nullable', 'string'],
        ]);

        $picture = Picture::where('picture_id', $picture)
            ->where('user_id', $request->user()->id)
            ->firstOrFail();

        $picture->update([
            'pic_name' => $data['pic_name'],
            'pic_description' => $data['pic_description'] ?? null,
        ]);

        return back();
    }

    public function destroy(Request $request, int $picture)
    {
        $picture = Picture::where('picture_id', $picture)
            ->where('user_id', $request->user()->id)
            ->firstOrFail();

        Task::where('task_id', $picture->task_id)
            ->where('user_id', $request->user()->id)->update(['is_completed' => false]);

        $picture->delete();

        return back();
    }
}