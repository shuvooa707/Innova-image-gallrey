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
				$query->with(["comments", "likes", "medias"]);
			}
		])->where("id", Auth::user()->id)->first();

		return [
			"profile" => $profile
		];
    }
}
