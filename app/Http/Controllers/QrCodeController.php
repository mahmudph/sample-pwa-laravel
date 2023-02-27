<?php

namespace App\Http\Controllers;


class QrCodeController extends Controller
{
    public function index() {
        return view('qr-scanner');
    }

    public function customView() {
        return view('custom-qr-scanner');
    }
}
