<?php

namespace App\Http\Controllers;

use App\Models\Workspace;
use Illuminate\Auth\Access\Gate;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class WorkspaceController extends Controller
{
    public function index(): Response
    {
        $workspaces = Auth::user()
            ->workspaces()
            ->withCount('members')
            ->with('owner:id,name,avatar')
            ->latest()
            ->get();

        return Inertia::render('Workspaces/Index', [
            'workspaces' => $workspaces,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Workspaces/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:2000'],
        ]);

        $workspace = Auth::user()->ownedWorkspaces()->create($validated);

        // Owner is automatically a member with the 'owner' role.
        $workspace->members()->attach(Auth::id(), [
            'role' => 'owner',
            'joined_at' => now(),
        ]);

        return redirect()
            ->route('workspaces.show', $workspace)
            ->with('success', 'Workspace created.');
    }

    public function show(Workspace $workspace): Response
    {
        // Gate::authorize('view', $workspace);

        $workspace->load([
            'owner:id,name,avatar',
            'members:id,name,avatar',
        ]);

        return Inertia::render('Workspaces/Show', [
            'workspace' => $workspace,
        ]);
    }

    public function edit(Workspace $workspace): Response
    {
        // Gate::authorize('update', $workspace);

        return Inertia::render('Workspaces/Edit', [
            'workspace' => $workspace,
        ]);
    }

    public function update(Request $request, Workspace $workspace): RedirectResponse
    {
        // Gate::authorize('update', $workspace);

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:2000'],
        ]);

        $workspace->update($validated);

        return redirect()
            ->route('workspaces.show', $workspace)
            ->with('success', 'Workspace updated.');
    }

    public function destroy(Workspace $workspace): RedirectResponse
    {
        // Gate::authorize('delete', $workspace);

        $workspace->delete();

        return redirect()
            ->route('workspaces.index')
            ->with('success', 'Workspace deleted.');
    }
}
