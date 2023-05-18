<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
	public function index()
	{
		$profile = User::with([
			"posts" => function($query) {
				$query->with(["user", "comments.user", "likes", "medias"])
					  ->orderBy('created_at', 'DESC');
			}
		])->where("id", Auth::user()->id)->first();
		$posts = $profile->posts;
		if ( Auth::check() ) {
			$posts->each(function ($post){
				$liked_by_me = $post->likes
					->map(function ($like){ return $like->user_id; })
					->toArray();
				$post["liked_by_me"] = in_array(Auth::user()->id, $liked_by_me);
			});
		} else {
			$post["liked_by_me"] = false;
		}
		return [
			"profile" => $profile,
			"posts" => $posts
		];
    }
}
