<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Collection;
use App\Models\Tag;

class GeneratorController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('gen/index', [
            'categories' => Tag::whereNull('parent_id')->get(['tag_id', 'tag_name']),
        ]);
    }

    public function generate(Request $request)
    {
        $categoryIds = collect($request->input('categories',[]))
            ->filter()
            -> map(fn ($id) => (int) $id)
            ->sort()
            ->values();

        $parts = $categoryIds->map(function (int $categoryId) {
                $category = Tag::find($categoryId);
                $tag =Tag::where('parent_id', $categoryId)->inRandomOrder()->first();

                if (! $category || !$tag) {
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
        
        // $parts = $parts ->sortBy([
        //     [$category->tag_id, asc],
        //     [tag_id, asc],
        // ])
        // ->values();

        return response()->json(['parts' => $parts]);
    }
}
