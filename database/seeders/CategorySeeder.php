<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $category = [
            ['name' => 'Politik', 'code' => 'plt'],
            ['name' => 'Family', 'code' => 'family'],
            ['name' => 'Tecknology', 'code' => 'tecnoloy'],
            ['name' => 'Food', 'code' => 'food'],
        ];

        foreach($category as $item) {
            Category::create($item);
        }
    }
}
