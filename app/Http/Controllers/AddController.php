<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\News;
use Illuminate\Http\Request;

class AddController extends Controller
{
    public function index() {
        return view('add');
    }

    public function addNoAjax() {
        return view('add-no-ajax');
    }

    public function getCategory() {
        $categories = Category::all();
        return response()->json($categories);
    }

    public function addNews(Request $request) {

        $validateNews = $this->validate($request, [
            'title' => 'required|string',
            "sub_title" => 'required',
            'category_id' => 'required|exists:categories,id',
            'status' => 'required|in:2,3',
            'author' => 'required',
        ]);

        News::create($validateNews);
        return response()->json(['status' => 'ok']);
    }
}
