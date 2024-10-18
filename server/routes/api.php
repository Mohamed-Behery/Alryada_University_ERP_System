<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CashRegisterController;
use App\Http\Controllers\BankController;
use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\RevenueController;
use App\Http\Controllers\AccountController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;

Route::get('expenses', [ExpenseController::class, 'index']);
Route::post('expenses', [ExpenseController::class, 'store']);
Route::get('expenses/{id}', [ExpenseController::class, 'show']);
Route::put('expenses/{id}', [ExpenseController::class, 'update']);
Route::delete('expenses/{id}', [ExpenseController::class, 'destroy']);

Route::get('revenues', [RevenueController::class, 'index']);
Route::post('revenues', [RevenueController::class, 'store']);
Route::get('revenues/{id}', [RevenueController::class, 'show']);
Route::put('revenues/{id}', [RevenueController::class, 'update']);
Route::delete('revenues/{id}', [RevenueController::class, 'destroy']);

Route::get('/accounts', [AccountController::class, 'index']);
Route::post('/accounts', [AccountController::class, 'store']);
Route::get('/accounts/{id}', [AccountController::class, 'show']);
Route::put('/accounts/{id}', [AccountController::class, 'update']);
Route::delete('/accounts/{id}', [AccountController::class, 'destroy']);

Route::get('/users', [UserController::class, 'index']);
Route::post('/users', [UserController::class, 'store']);
Route::get('/users/{id}', [UserController::class, 'show']);
Route::put('/users/{id}', [UserController::class, 'update']);
Route::delete('/users/{id}', [UserController::class, 'destroy']);

Route::post('login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);
Route::post('logout', [AuthController::class, 'logout']);
Route::get('me', [AuthController::class, 'me'])->middleware('auth:api');

Route::get('cash-registers', [CashRegisterController::class, 'index'])->name('cash-registers.index');
Route::get('cash-registers/{id}', [CashRegisterController::class, 'show'])->name('cash-registers.show');
Route::post('cash-registers', [CashRegisterController::class, 'store'])->name('cash-registers.store');
Route::put('cash-registers/{id}', [CashRegisterController::class, 'update'])->name('cash-registers.update');
Route::delete('cash-registers/{id}', [CashRegisterController::class, 'destroy'])->name('cash-registers.destroy');

Route::get('banks', [BankController::class, 'index'])->name('banks.index');
Route::get('banks/{id}', [BankController::class, 'show'])->name('banks.show');
Route::post('banks', [BankController::class, 'store'])->name('banks.store');
Route::put('banks/{id}', [BankController::class, 'update'])->name('banks.update');
Route::delete('banks/{id}', [BankController::class, 'destroy'])->name('banks.destroy');
