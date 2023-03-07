<?php

namespace App\Http\Controllers;

use App\Models\Category;

class QrCodeController extends Controller
{
    public function index()
    {
        $category = Category::all();
        return view('qr-scanner', compact('category'));
    }

    public function customView()
    {
        return view('custom-qr-scanner');
    }

    public function showScanSuccess()
    {
        return view('qr-scanner-success');
    }
}
