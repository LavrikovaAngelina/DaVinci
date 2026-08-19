<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Picture;
use App\Models\User;

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
                ];
            });

        return Inertia::render('profile/index', [
            'username' => $user->name,
            'description' => $user->profile_description,
            'cards' => $cards,
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
                ];
            });

        return Inertia::render('profile/index', [
            'username' => $user->name,
            'description' => $user->profile_description,
            'cards' => $cards,
        ]);
    }

    public function edit(request $request)
    {
        $user = Auth::user();

        return Inertia::render('profile/edit/description', [
            'description' => $user->profile_description,
        ]);
    }
}