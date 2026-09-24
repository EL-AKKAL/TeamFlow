<?php

namespace App\Http\Controllers;

use App\Concerns\HasToast;
use App\Enums\RoleEnum;
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
            ->with([
                'members' => fn ($query) => $query
                    ->select('users.id', 'users.name', 'users.avatar')
                    ->limit(3),
            ])
            ->latest()
            ->get();

        return Inertia::render('workspaces/index', [
            'workspacesList' => $workspaces,
        ]);
    }

    public function store(WorkspaceRequest $request): RedirectResponse
    {
        $user = $request->user();
        $workspace = $user->ownedWorkspaces()->create($request->validated());

        $workspace->members()->attach($user->id, [
            'role' => RoleEnum::OWNER->value,
            'joined_at' => now(),
        ]);

        $this->toast('workspace created successfully');

        return to_route('workspaces.dashboard', $workspace);
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

        $this->toast('workspace deleted successfully');

        return to_route('workspaces.index');

    }
}
