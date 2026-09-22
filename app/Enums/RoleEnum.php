<?php

namespace App\Enums;

enum RoleEnum: string
{
    case OWNER = 'owner';
    case ADMIN = 'admin';
    case MEMBER = 'member';
    case VIEWER = 'viewer';

    public function label(): string
    {
        return match ($this) {
            self::OWNER => 'Owner',
            self::ADMIN => 'Admin',
            self::MEMBER => 'Member',
            self::VIEWER => 'Viewer',
        };
    }

    public function canManageMembers(): bool
    {
        return match ($this) {
            self::OWNER, self::ADMIN => true,
            self::MEMBER, self::VIEWER => false,
        };
    }

    public function canManageWorkspace(): bool
    {
        return match ($this) {
            self::OWNER, self::ADMIN => true,
            self::MEMBER, self::VIEWER => false,
        };
    }

    public function isOwner(): bool
    {
        return $this === self::OWNER;
    }

    public function isReadOnly(): bool
    {
        return $this === self::VIEWER;
    }
}
