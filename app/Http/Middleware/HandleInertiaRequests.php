<?php

namespace App\Http\Middleware;

use App\Models\Workspace;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    protected function resolveCurrentWorkspace(Request $request): ?array
    {
        $workspace = $request->route('workspace');

        if (! $workspace instanceof Workspace) {
            return null;
        }

        return [
            'id' => $workspace->id,
            'name' => $workspace->name,
        ];
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'auth' => [
                'user' => $request->user(),
            ],
            'workspaces' => fn () => $request->user()
                ?->workspaces()
                ->select('workspaces.id', 'workspaces.name')
                ->get(),
            'currentWorkspace' => fn () => $this->resolveCurrentWorkspace($request),
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
        ];
    }
}
