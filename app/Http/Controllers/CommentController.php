<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateCommentRequest;
use App\Http\Requests\CreateUserRequest;
use App\Http\Requests\DeleteCommentRequest;
use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
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
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateCommentRequest $request)
    {
		$comment = Comment::create([
			"content" => $request->content,
			"post_id" => $request->post_id,
			"user_id" => Auth::user()->id
		]);
		$post = Post::with(["user", "comments.user", "likes", "medias"])->where("id", $request->post_id)->first();
		return [
			"status" => "success",
			"comment" => Comment::with(["user"])->where("id", $comment->id)->first(),
			"post" => $post
		];
    }

    /**
     * Display the specified resource.
     */
    public function show(Comment $comment)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Comment $comment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Comment $comment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DeleteCommentRequest $request)
    {
		$comment = Comment::with(["user"])->where("", $request->comment_id)->first();

    }
}
