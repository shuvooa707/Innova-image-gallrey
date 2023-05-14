<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Media>
 */
class MediaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
	    $postids = User::pluck("id")->toArray();
        return [
            "path" => random_int(1,5) . ".jpg",
	        "type" => "image",
	        "post_id" => $postids[rand(0, count($postids)-1)]
        ];
    }
}
