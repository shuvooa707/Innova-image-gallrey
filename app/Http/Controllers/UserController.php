<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
	public function show()
	{
		$user = User::with([
			"posts" => function($query) {
				$query->with(["user", "comments.user", "likes", "medias"]);
			}
		])->where("id",\request("id"))->first();
		$comment_count = $user->posts->reduce(function ($total, $post){
			return $total + $post->comments->count();
		});
		$like_count = $user->posts->reduce(function ($total, $post){
			return $total + $post->likes->count();
		});
		if ( !$user ) {
			return [
				"status" => "failed",
				"message" => "user not found"
			];
		}
		return [
			"status" => "success",
			"user" => $user,
			"comment_count" => $comment_count,
			"like_count" => $like_count
		];
    }
}
