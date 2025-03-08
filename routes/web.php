<?php

use App\Http\Controllers\Admin\AdminController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Admin\CruduserController;
use App\Http\Controllers\Admin\CruddispositivosController;



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

        

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
