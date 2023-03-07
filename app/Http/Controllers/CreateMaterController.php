<?php

namespace App\Http\Controllers;

use App\Models\News;
use Illuminate\Http\Request;

class CreateMaterController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        $result = News::create($request->all());
        return response()->json($result);
    }
}
