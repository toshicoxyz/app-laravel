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

Route::get('/', function () {
    return view('welcome');
});

Route::get('/categoria', [CategoriaController::class, 'index'])->name('categoria.index');

Route::get('/categoria/search', [CategoriaController::class, 'search'])->name('categoria.search');

Route::post('/categoria/create',  [CategoriaController::class, 'create'])->name('categoria.create');

Route::delete('/categoria/destroy/{id}', [CategoriaController::class, 'destroy'])->name('categoria.destroy');

Route::put('/categoria/edit/{id}', [CategoriaController::class, 'edit'])->name('categoria.edit');

Route::get('/curso', [CursoController::class, 'index'])->name('curso.index');


// Route::resource('/categoria', CategoriaController::class)->names([
//     'index' => 'categoria.index',
//     'store' => 'categoria.store',
//     'show' => 'categoria.show',
//     'edit' => 'categoria.edit',
//     'update' => 'categoria.update'
// ]);
