<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreatePostRequest;
use App\Http\Requests\DeletePostRequest;
use App\Models\Media;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Intervention\Image\Facades\Image;

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
        $posts = Post::with(["user", "comments.user", "medias"])
	        ->skip($offset)
	        ->take(15)
	        ->orderBy('created_at', 'DESC')
	        ->get();

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
    public function store(CreatePostRequest $request)
    {
		if ( strlen($request->content) > 0 ) {
			$post = Post::create([
				"content" => $request->content,
				"user_id" => Auth::user()->id
			]);
		} else {
			$post = Post::create([
				"user_id" => Auth::user()->id
			]);
		}
		for($i=1; $i<=5; $i++)
		{
			if ( $img = $request->file("img" . $i) )
			{
				$mediaName = Str::uuid() .".". $img->getClientOriginalExtension();
				$image = Image::make($img);

				// Calculate the desired width based on the ratio
				$width = (int)($image->height() * (6 / 13));

				// Resize the image while maintaining the ratio
				$image->fit($width, $image->height(), function ($constraint) {
					$constraint->upsize();
				});

				$image->save("img/post/" . $mediaName, 10);
				Media::create([
					"path" => $mediaName,
					"type" => explode("/", $image->mime())[0],
					"post_id" => $post->id
				]);
			}
        }
		return [
			"status" => "success",
			"post" => $post
		];
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
     *
     * Remove the specified resource from storage.
     *
     */
    public function destroy(DeletePostRequest $request)
    {
        if ( $post = Post::find($request->post_id) )
		{
			if ( $post->user_id == Auth::user()->id )
			{
				$post->delete();
			}
			else
			{
				return [
					"status" => "failed",
					"message" => "unauthorized"
				];
			}
        }
	    $profile = User::with([
		    "posts" => function($query) {
			    $query->with(["user", "comments.user", "likes", "medias"])->orderBy('created_at', 'DESC');
		    }
	    ])->where("id", Auth::user()->id)->first();
		return [
			"status" => "success",
			"profile" => $profile
		];
    }
}
