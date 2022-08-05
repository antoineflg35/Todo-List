<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::get('/categories', [CategoryController::class, 'list']);

Route::get('/categories/{id}', [CategoryController::class, 'item']);

Route::get('/tasks', [TaskController::class, 'list']);

Route::post('/tasks', [TaskController::class, 'store']);

Route::get('/tasks/{id}', [TaskController::class, 'item']);

Route::put('/tasks/{id}', [TaskController::class, 'editTask']);

Route::patch('/tasks/{id}', [TaskController::class, 'editTask']);

Route::delete('/tasks/{id}', [TaskController::class, 'delete']);
