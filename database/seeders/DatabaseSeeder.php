<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Like;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

	    $this->call(UserSeeder::class);
	    $this->call(PostSeeder::class);
	    $this->call(CommentSeeder::class);
	    $this->call(MediaSeeder::class);
	    $this->call(LikeSeeder::class);
    }
}
