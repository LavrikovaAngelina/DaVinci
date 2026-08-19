<?php

use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;
use App\http\controllers\IdeaController;
use App\http\controllers\GeneratorController;
use App\http\controllers\FavoriteController;
use App\Http\Controllers\PicViewController;
use App\Http\Controllers\ProfileController;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');

    Route::post('/pictures', [IdeaController::class, 'store'])->name('pictures.store');

    Route::get('/generator', [GeneratorController::class, 'index'])->name('generator.index');
    Route::get('/generator/generate', [GeneratorController::class, 'idea'])->name('generator.idea');

    Route::get('/favorites', [FavoriteController::class, 'index'])->name('favorites.index');
    Route::post('/favorites', [FavoriteController::class, 'store'])->name('favorites.create');
    Route::delete('/favorites/{task}', [FavoriteController::class, 'destroy'])->name('favorites.destroy');

    Route::post('/avatar', [ProfileController::class, 'updateAvatar'])->name('profile.updateAvatar');
    Route::get('/picview/{picture}', [PicViewController::class, 'index'])->name('picview.index');

    Route::get('/profile/{id}', [ProfileController::class, 'index'])->name('profile.index');
    Route::get('/profile', [ProfileController::class, 'my_page'])->name('profile.my_page');
});

Route::get('/', [IdeaController::class, 'index'])->name('home');

require __DIR__.'/settings.php';