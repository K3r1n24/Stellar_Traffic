<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('landing');
});

Route::get('/login', function () {
    return view('login');
})->name('login');

Route::get('/register', function () {
    return view('register');
})->name('register');

// Rutas de autenticación
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

Route::get('/dashboard', function () {
    return view('welcome');
})->middleware('auth')->name('dashboard');

// Catch-all para todas las rutas manejadas por Vue Router
Route::get('/{any}', function () {
    return view('welcome');
})->middleware('auth')->where('any', '^(?!api|login|register|logout|accidentes).*$');

Route::get('/accidentes', [App\Http\Controllers\AccidenteController::class, 'index']);
Route::post('/accidentes', [App\Http\Controllers\AccidenteController::class, 'store']);
