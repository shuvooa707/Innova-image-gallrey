<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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
		$posts = $user->posts;
		if ( Auth::check() ) {
			$posts->each(function ($post) {
				$liked_by_me = $post->likes
					->map(function ($like){ return $like->user_id; })
					->toArray();
				$post["liked_by_me"] = in_array(Auth::user()->id, $liked_by_me);
			});
		} else {
			$post["liked_by_me"] = false;
		}

		$user->posts = $posts;
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
