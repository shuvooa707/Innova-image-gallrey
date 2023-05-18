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

		return [
			"profile" => $profile
		];
    }
}
