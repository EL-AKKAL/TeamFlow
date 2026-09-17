<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\WorkspaceController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', DashboardController::class)->name('dashboard');
    Route::get('workspaces/{workspace}/dashboard', DashboardController::class)
        ->name('workspaces.dashboard');

    Route::resource('workspaces', WorkspaceController::class);
});

require __DIR__.'/settings.php';
