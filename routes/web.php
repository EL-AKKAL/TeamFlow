<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\WorkspaceController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', DashboardController::class)->name('dashboard');
    Route::get('workspaces/{workspace}/dashboard', DashboardController::class)
        ->name('workspaces.dashboard');

    Route::resource('workspaces', WorkspaceController::class);

    Route::prefix('workspaces/{workspace}/members')
        ->name('workspaces.members.')
        ->group(function () {
            Route::get('/', [MemberController::class, 'index'])->name('index');
            Route::post('/', [MemberController::class, 'store'])->name('store');
            Route::patch('{user}', [MemberController::class, 'update'])->name('update');
            Route::delete('{user}', [MemberController::class, 'destroy'])->name('destroy');
        });
});

require __DIR__.'/settings.php';
