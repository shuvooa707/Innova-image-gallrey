<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
	    $userids = User::pluck("id")->toArray();
        return [
            "content" => fake()->text(),
	        "user_id" => $userids[rand(0, count($userids)-1)]
        ];
    }
}
