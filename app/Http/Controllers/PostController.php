<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
		if ( !$request->exists("offset") )
		{
			$offset = 0;
		}
		else
		{
			$offset = $request->offset;
		}
        $posts = Post::with([
			"user",
	        "comments" => function($query){
		        $query->with(["user"]);
            },
	        "medias"])
	        ->skip($offset)
	        ->take(15)
	        ->get();

		if ( Auth::check() ) {
			$posts->each(function ($post){
				$liked_by_me = $post->likes
										->map(function ($like){ return $like->user_id; })
										->search(function ($user_id){
											return Auth::user()->id == $user_id;
										}, $strict = true);
				$post["liked_by_me"] = boolval($liked_by_me);
			});
		} else {
			$post["liked_by_me"] = false;
		}

		return [
			"posts" => $posts
		];
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        //
    }
}
