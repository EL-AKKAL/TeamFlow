<?php

namespace App\Http\Controllers;

use App\Models\Workspace;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Display the dashboard for the given workspace, redirect to the
     * user's first workspace if none was specified, or render an
     * empty state if they have no workspaces at all.
     */
    public function __invoke(Request $request, ?Workspace $workspace = null): Response|RedirectResponse
    {
        if ($workspace) {
            return Inertia::render('dashboard', [
                'workspace' => $workspace->load('owner:id,name,avatar'),
            ]);
        }

        $firstWorkspace = $request->user()->workspaces()->first();

        if ($firstWorkspace) {
            return to_route('workspaces.dashboard', $firstWorkspace);
        }

        return Inertia::render('dashboard', [
            'workspace' => null,
        ]);
    }
}
