<?php

namespace App\Http\Controllers;

use App\Concerns\HasToast;
use App\Enums\RoleEnum;
use App\Models\User;
use App\Models\Workspace;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class MemberController extends Controller
{
    use HasToast;

    public function index(Workspace $workspace): Response
    {
        $members = $workspace->members()
            ->orderBy('workspace_user.joined_at')
            ->get(['users.id', 'users.name', 'users.email'])
            ->map(fn (User $member) => [
                'id' => $member->id,
                'name' => $member->name,
                'email' => $member->email,
                'role' => $member->pivot->role,
                'joined_at' => $member->pivot->joined_at,
            ]);

        return Inertia::render('members/index', [
            'members' => $members,
        ]);
    }

    public function create() {}

    public function store(Request $request, Workspace $workspace): RedirectResponse
    {
        $validated = $request->validate([
            'email' => ['required', 'email', 'exists:users,email'],
            'role' => ['required', Rule::enum(RoleEnum::class)],
        ]);

        $user = User::where('email', $validated['email'])->first();

        if ($workspace->members()->where('user_id', $user->id)->exists()) {
            return back()->withErrors(['email' => 'This user is already a member.']);
        }

        $workspace->members()->attach($user->id, [
            'role' => $validated['role'],
            'joined_at' => now(),
        ]);

        $this->toast('member invited successfully');

        return back();
    }

    public function show(string $id) {}

    public function edit(string $id) {}

    public function update(Request $request, string $id) {}

    public function destroy(string $id) {}
}
