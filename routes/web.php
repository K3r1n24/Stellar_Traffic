<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('landing');
})->name('home');
Route::get('/login', [AuthController::class, 'showLogin'])->name('login');

Route::get('/register', function () {
    return view('register');
})->name('register');

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Recuperación y restablecimiento de contraseña
Route::get('/password/forgot', [AuthController::class, 'showForgotPasswordForm'])->name('password.request');
Route::post('/password/email', [AuthController::class, 'sendResetLinkEmail'])->name('password.email');
Route::get('/password/reset/{token}', [AuthController::class, 'showResetForm'])->name('password.reset');
Route::post('/password/reset', [AuthController::class, 'resetPassword'])->name('password.update');

Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth')->name('logout');

Route::get('/dashboard', function () {
    return view('welcome');
})->middleware('auth')->name('dashboard');

Route::get('/dashboard/{any}', function () {
    return view('welcome');
})->middleware('auth')->where('any', '.*');

Route::get('/accidentes', [App\Http\Controllers\AccidenteController::class, 'index']);
Route::post('/accidentes', [App\Http\Controllers\AccidenteController::class, 'store']);

// API: datos del usuario autenticado para el frontend Vue
Route::get('/api/user', function () {
    return response()->json(auth()->user());
})->middleware('auth');

