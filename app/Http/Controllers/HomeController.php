<?php

namespace App\Http\Controllers;

use App\Models\News;
use Illuminate\Http\Request;
use Yajra\DataTables\Facades\DataTables;

class HomeController extends Controller
{
    public function index(Request $request) {
        $news = News::with('category')->get();
        return view('home', compact('news'));
    }

    public function getNews(Request $request) {
        $news = News::with('category')->get()->toQuery();
        return DataTables::eloquent($news)
            ->addIndexColumn()
            ->addColumn('category',function(News $news) {
                return $news->category->name;
            })
        ->toJson();
    }

    public function destroy(Request $request, $id) {
        $news = News::findOrFail($id);
        $news->delete();
        return redirect()->back()->with('success', 'success to delete news');
    }
}
