<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory(100)->create();
		User::create([
			"name" => "a",
			"email" => "a@a.a",
			"username" => "a",
			"password" => Hash::make("a"),
			"image" => "aveter.png"
		]);
    }
}
