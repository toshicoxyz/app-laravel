<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RegionController;
use App\Http\Controllers\LugarTuristicoController;

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

// Rutas para usuarios
Route::resource('users', UserController::class);

// Rutas para regiones
// Route::resource('regions', RegionController::class);

// Rutas para lugares turísticos
Route::resource('lugar-turisticos', LugarTuristicoController::class);

// Route::resource('/categoria', CategoriaController::class)->names([
//     'index' => 'categoria.index',
//     'store' => 'categoria.store',
//     'show' => 'categoria.show',
//     'edit' => 'categoria.edit',
//     'update' => 'categoria.update'
// ]);
// // Rutas de categorías
Route::get('/regions', [RegionController::class, 'index'])->name('regions.index');
Route::post('/regions/create', [RegionController::class, 'create'])->name('regions.create');
Route::put('/regions/update/{id}', [RegionController::class, 'update'])->name('regions.update');
Route::delete('/regions/destroy/{id}', [RegionController::class, 'destroy'])->name('regions.destroy');

Route::get('/lugar-turisticos', [LugarTuristicoController::class, 'index'])->name('lugar-turisticos.index');
Route::post('/lugar-turisticos/create', [LugarTuristicoController::class, 'create'])->name('lugar-turisticos.create');
Route::put('/lugar-turisticos/update/{id}', [LugarTuristicoController::class, 'update'])->name('lugar-turisticos.update');
Route::delete('/lugar-turisticos/destroy/{id}', [LugarTuristicoController::class, 'destroy'])->name('lugar-turisticos.destroy');

// // Rutas de cursos
// Route::get('/curso', [CursoController::class, 'index'])->name('curso.index');
// Route::get('/curso/search', [CursoController::class, 'search'])->name('curso.search');
// Route::get('/curso/searchHtml', [CursoController::class, 'searchHtml'])->name('curso.searchHtml');
// Route::post('/curso/create', [CursoController::class, 'create'])->name('curso.create');
// Route::delete('/curso/destroy/{id}', [CursoController::class, 'destroy'])->name('curso.destroy');
// Route::put('/curso/edit/{id}', [CursoController::class, 'edit'])->name('curso.edit');
// Otras rutas de curso...// Rutas de categorías

// Route::get('/categoria', [CategoriaController::class, 'index'])->name('categoria.index');
// Route::get('/categoria/search', [CategoriaController::class, 'search'])->name('categoria.search');
// Route::get('/categoria/searchHtml', [CategoriaController::class, 'searchHtml'])->name('categoria.searchHtml');
// Route::post('/categoria/create', [CategoriaController::class, 'create'])->name('categoria.create');
// Route::delete('/categoria/destroy/{id}', [CategoriaController::class, 'destroy'])->name('categoria.destroy');
// Route::put('/categoria/edit/{id}', [CategoriaController::class, 'edit'])->name('categoria.edit');
