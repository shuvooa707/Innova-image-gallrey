<?php

namespace App\Http\Controllers;

use App\Http\Requests\LikePostRequest;
use App\Models\Like;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LikeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(LikePostRequest $request)
    {
		$validated = $request->validated();
		$like = Like::firstOrCreate([
			"user_id" => Auth::user()->id,
			"post_id" => $validated["post_id"]
		]);
		if ( !$like ) {
			return [
				"status" => "failed"
			];
		}

	    $post = Post::with(["comments.user", "likes", "medias", "user"])->where("id",$request->post_id)->first();

	    $liked_by_me = $post->likes
		    ->map(function ($like){ return $like->user_id; })
		    ->toArray();
	    $post["liked_by_me"] = in_array(Auth::user()->id, $liked_by_me);

	    return [
			"status" => "success",
	        "post" => $post
        ];
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
    public function show(Like $like)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Like $like)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Like $like)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $like = Like::where([
			"user_id" => Auth::user()->id,
			"post_id" => $request->post_id,
        ])->get()->first();

		if ( $like ) {
			$like->delete();
		}

	    $post = Post::with(["comments" => function($query){
		    $query->with(["user"]);
	    }, "likes", "medias", "user"])->where("id", $request->post_id)->first();

	    $liked_by_me = $post->likes
		    ->map(function ($like){ return $like->user_id; })
		    ->toArray();
	    $post["liked_by_me"] = in_array(Auth::user()->id, $liked_by_me);


	    return [
			"status" => "success",
			"post" => $post
		];
    }
}
