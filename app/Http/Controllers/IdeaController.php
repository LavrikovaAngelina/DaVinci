<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Picture;

class IdeaController extends Controller
{
    public function index(Request $request)
    {
        $ideas = collect(range(1, 6))->map(fn ($i) => [
            'id' => $i,
            'description' => 'Здесь краткое описание автора работы',
            'thumbnail' => null,
            'tags' => ['Кошка', 'Плывет', 'Пластик'],
            'author' => 'Ангелина Л.',
            'likes' => 12,
            'dislikes' => 2,
            'created_at' => '3 дня назад',
        ]);

        return Inertia::render('ideas/index', [
            'ideas'   => $ideas,
            'filters' => $request->only(['animal', 'action', 'material', 'plants']),
            'options' => [
                'animals'   => ['Кошка', 'Собака', 'Птица'],
                'actions'   => ['Плывет', 'Бежит', 'Спит'],
                'materials' => ['Пластик', 'Дерево', 'Металл'],
                'plants' => ['Дуб', 'Ромашка', 'Кактус'],

            ],
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
            'is_published'    => $data['is_published'] ?? false,
            'picture_url'     => $request->file('image')->store('works', 'public'),
        ]);

        return back();
    }


    public function test(Request $request)
    {
        $cards = collect(range(1, 6))->map(fn ($i) => [
            'id' => $i,
            'description' => 'Здесь краткое описание автора работы',
            'thumbnail' => null,
            'tags' => ['Кошка', 'Плывет', 'Пластик'],
            'author' => 'Ангелина Л.',
            'likes' => 12,
            'dislikes' => 2,
            'created_at' => '3 дня назад',
        ]);

        return Inertia::render('ideas/test', [
            'cards'   => $cards,
            'filters' => $request->only(['animal', 'action', 'material']),
            'options' => [
                'animals'   => ['Кошка', 'Собака', 'Птица'],
                'actions'   => ['Плывет', 'Бежит', 'Спит'],
                'materials' => ['Пластик', 'Дерево', 'Металл'],

                #Переделать поиск (придумать как)
            ],
        ]);
    }

}
