<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateUserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AuthController extends Controller
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
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

	public function register(CreateUserRequest $request): array
	{
		// Retrieve the validated input data...
		$validated = $request->safe()->only(['name', 'username', 'email', 'username']);
		$validated["password"] = Hash::make($request->password);
		$imageName = Str::uuid() .".".  $request->file("image")->getClientOriginalExtension();
		$request->file("image")->storeAs($imageName, ['disk' => 'public']);
		$validated["image"] = $imageName;
		$user = User::create($validated);
		if ( $user ) {
			Auth::login($user);
			return [
				"status" => "success"
			];
		}
		return [
			"status" => "success"
		];
	}

	public function login(Request $request)
	{
//		return ($request->all());
		$loggedIn = Auth::attempt([ "email"=>$request->email, "password"=>$request->password ]);
		if ( !$loggedIn ) {
			return [
				"status" => "failed"
			];
		}
		return [
			"status" => "success"
		];
	}

	public function logout()
	{
		Auth::logout();
		return [
			"status" => "success"
		];
	}
}
