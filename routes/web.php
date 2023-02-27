<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\AddController;
use App\Http\Controllers\QrCodeController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});


Route::get('/home', [HomeController::class, 'index'])->name('home');
Route::get('/news', [HomeController::class, 'getNews'])->name('get-news');
Route::get('/news/delete/{id}', [HomeController::class, 'destroy'])->name('delete-news');

Route::get('/add-news', [AddController::class, 'index'])->name('add-news');
Route::get('/add-news-no-ajax', [AddController::class, 'index'])->name('add-news-no-ajax');
Route::post('/add-news', [AddController::class, 'addNews'])->name('add-news-action');
Route::get('/categories', [AddController::class, 'getCategory'])->name('categories');
Route::get('/scanner', [QrCodeController::class, 'index'])->name('scanner');
Route::get('/custom-scanner', [QrCodeController::class, 'customView'])->name('custom-scanner');
Route::get('/scan-result', [QrCodeController::class, 'showScanSuccess'])->name('qr-result');
