<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {

        $user = User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        $workspaces = $user->ownedWorkspaces()->createMany([
            ['name' => 'Workspace 1'],
            ['name' => 'Workspace 2'],
            ['name' => 'Workspace 3'],
            ['name' => 'Workspace 4'],
            ['name' => 'Workspace 5'],
        ]);

        foreach ($workspaces as $workspace) {
            $workspace->members()->attach($user->id, [
                'role' => 'owner',
                'joined_at' => now(),
            ]);
        }
    }
}
