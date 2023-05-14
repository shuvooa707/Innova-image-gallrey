<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Like>
 */
class LikeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
	    $userids = User::pluck("id")->toArray();
	    $postids = User::pluck("id")->toArray();
        return [
	        "user_id" => $userids[rand(0, count($userids)-1)],
	        "post_id" => $postids[rand(0, count($postids)-1)]
        ];
    }
}
