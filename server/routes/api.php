<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\RevenueController;

// // مسار API للمصروفات
// Route::apiResource('expenses', ExpenseController::class);

// // مسار API للإيرادات
// Route::apiResource('revenues', RevenueController::class);


// مسارات المصروفات
Route::get('expenses', [ExpenseController::class, 'index']);       // عرض جميع المصروفات
Route::post('expenses', [ExpenseController::class, 'store']);      // إضافة مصروف جديد
Route::get('expenses/{id}', [ExpenseController::class, 'show']);   // عرض مصروف معين
Route::put('expenses/{id}', [ExpenseController::class, 'update']); // تحديث مصروف معين
Route::delete('expenses/{id}', [ExpenseController::class, 'destroy']); // حذف مصروف معين

// مسارات الإيرادات
Route::get('revenues', [RevenueController::class, 'index']);       // عرض جميع الإيرادات
Route::post('revenues', [RevenueController::class, 'store']);      // إضافة إيراد جديد
Route::get('revenues/{id}', [RevenueController::class, 'show']);   // عرض إيراد معين
Route::put('revenues/{id}', [RevenueController::class, 'update']); // تحديث إيراد معين
Route::delete('revenues/{id}', [RevenueController::class, 'destroy']); // حذف إيراد معين
