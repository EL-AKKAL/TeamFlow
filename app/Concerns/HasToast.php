<?php

namespace App\Concerns;

use Inertia\Inertia;

trait HasToast
{
    protected function toast(string $message, string $type = 'success'): void
    {
        Inertia::flash('toast', [
            'type' => $type,
            'message' => $message,
        ]);
    }
}
