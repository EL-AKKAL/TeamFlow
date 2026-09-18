<?php

namespace App\Http\Controllers;

use App\Concerns\HasToast;
use App\Http\Requests\WorkspaceRequest;
use App\Models\Workspace;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class WorkspaceController extends Controller
{
    use HasToast;

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

    public function store(WorkspaceRequest $request): RedirectResponse
    {

        $workspace = Auth::user()->ownedWorkspaces()->create($request->validated());

        $workspace->members()->attach(Auth::id(), [
            'role' => 'owner',
            'joined_at' => now(),
        ]);

        $this->toast('workspace created successfully');

        return to_route('workspaces.dashboard', $workspace);
    }

    public function edit(Workspace $workspace): Response
    {

        return Inertia::render('Workspaces/Edit', [
            'workspace' => $workspace,
        ]);
    }

    public function update(Request $request, Workspace $workspace): RedirectResponse
    {

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

        $workspace->delete();

        return redirect()
            ->route('workspaces.index')
            ->with('success', 'Workspace deleted.');
    }
}
