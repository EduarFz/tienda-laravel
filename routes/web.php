<?php

use App\Http\Controllers\Admin\AdminController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Admin\CruduserController;
use App\Http\Controllers\Admin\CruddispositivosController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\DispositivoController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DetalleController;




Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/login', function () {
    return Inertia::render('login');
})->name('login');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::get('/ed', function () {
    return Inertia::render('ed');
})->name('ed');

Route::get('admin', [AdminController::class, 'create'])
    ->name('admin');

Route::get('cruduser', [CruduserController::class, 'create'])
    ->name('cruduser');

Route::get('cruddispositivos', [CruddispositivosController::class, 'create'])
    ->name('cruddispositivos');

// Ruta para mostrar la lista de dispositivos y el formulario
Route::get('/cruddispositivos', [DispositivoController::class, 'index'])->name('cruddispositivos.index');

// Ruta para manejar la creación de dispositivos
Route::post('/dispositivos', [DispositivoController::class, 'store'])->name('dispositivos.store');

// Ruta para manejar la eliminación de dispositivos
Route::delete('/dispositivos/{id}', [DispositivoController::class, 'destroy'])->name('dispositivos.destroy');







// Ruta para mostrar el formulario de edición
Route::get('/dispositivos/{id}/edit', [DispositivoController::class, 'edit'])->name('dispositivos.edit');

// Ruta para manejar la actualización del dispositivo
Route::put('/dispositivos/{id}', [DispositivoController::class, 'update'])->name('dispositivos.update');

Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');








Route::get('/user', [UserController::class, 'index']);

Route::get('/users', [UserController::class, 'index'])->name('users.index');

Route::delete('/users/{id}', [UserController::class, 'destroy'])->name('users.destroy');
Route::post('/users', [UserController::class, 'store'])->name('users.store');


// Ruta para mostrar el formulario de edición
Route::get('/users/{id}/edit', [UserController::class, 'edit'])->name('users.edit');

// Ruta para manejar la actualización del usuario
Route::put('/users/{id}', [UserController::class, 'update'])->name('users.update');


Route::get('/detalles/{id}', [DetalleController::class, 'show'])->name('detalles.show');

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
