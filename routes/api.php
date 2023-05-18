<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/



Route::middleware(['auth:sanctum'])->group(function (){
	Route::get("/profile", [ProfileController::class, "index"]);
	Route::post("/like", [LikeController::class, "create"]);
	Route::post("/unlike", [LikeController::class, "destroy"]);

	// Post routes
	Route::post("/posts/create", [PostController::class, "store"]);
	Route::post("/posts/destroy", [PostController::class, "destroy"]);

	// Comment routes
	Route::post("/comments/create", [CommentController::class, "store"]);
	Route::post("/comments/destroy", [CommentController::class, "destroy"]);
});


Route::get("/posts", [PostController::class, "index"]);
Route::get("/user/{id}", [UserController::class, "show"]);

Route::post('/login', [AuthController::class, "login"]);
Route::post('/register', [AuthController::class, "register"]);
Route::post('/logout', [AuthController::class, "logout"]);
