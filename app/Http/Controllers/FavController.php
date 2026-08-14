<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class FavController extends Controller
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

        return Inertia::render('fav/index', [
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

}
