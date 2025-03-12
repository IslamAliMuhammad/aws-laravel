<?php

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::get('/upload', function () {
    return Inertia::render('Upload');
});

Route::post('/upload', function (Request $request) {
    $request->validate([
        'file' => 'required|file|max:5000',
    ]);

    // Upload file to S3
    $path = $request->file('file')->store('uploads', env('FILESYSTEM_DISK', 'local'));

    // Get file URL
    $url = Storage::disk(env('FILESYSTEM_DISK', 'local'))->url($path);

    return back()->with('url', $url);
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
