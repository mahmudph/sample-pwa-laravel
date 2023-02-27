<?php

namespace Database\Seeders;

use App\Models\News;
use Illuminate\Database\Seeder;
use Faker\Factory;



class NewsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $faker = Factory::create();
        for($i = 0; $i <= 10; $i++) {
            News::create([
                'title' => $faker->text(10),
                'sub_title' => $faker->text,
                'status' => random_int(2,3),
                'category_id' => random_int(1, 3),
                'author' => $faker->name(),
            ]);
        }
    }
}
