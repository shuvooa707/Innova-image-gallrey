<?php

namespace Database\Seeders;

use App\Models\Media;
use App\Models\Post;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Post::factory(1000)->create()->each(function ($post){
			Media::factory(rand(1, 5))->create([
				"post_id" => $post->id
			]);
        });
    }
}
