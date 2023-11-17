<?php

use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\CursoController;
use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/


// Rutas que usarán el middleware 'custom'
Route::get('/', function () {
    return view('welcome');
});

// Rutas de categorías
Route::get('/categoria', [CategoriaController::class, 'index'])->name('categoria.index');
Route::get('/categoria/search', [CategoriaController::class, 'search'])->name('categoria.search');
Route::post('/categoria/create', [CategoriaController::class, 'create'])->name('categoria.create');
Route::delete('/categoria/destroy/{id}', [CategoriaController::class, 'destroy'])->name('categoria.destroy');
Route::put('/categoria/edit/{id}', [CategoriaController::class, 'edit'])->name('categoria.edit');

// Rutas de cursos
Route::get('/curso', [CursoController::class, 'index'])->name('curso.index');
Route::get('/curso/search', [CursoController::class, 'search'])->name('curso.search');
Route::post('/curso/create', [CursoController::class, 'create'])->name('curso.create');
Route::delete('/curso/destroy/{id}', [CursoController::class, 'destroy'])->name('curso.destroy');
Route::put('/curso/edit/{id}', [CursoController::class, 'edit'])->name('curso.edit');
    // Otras rutas de curso...


// Route::resource('/categoria', CategoriaController::class)->names([
//     'index' => 'categoria.index',
//     'store' => 'categoria.store',
//     'show' => 'categoria.show',
//     'edit' => 'categoria.edit',
//     'update' => 'categoria.update'
// ]);
