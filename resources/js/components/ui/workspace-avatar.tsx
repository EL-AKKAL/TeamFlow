const AVATAR_COLORS = [
    "bg-red-500",
    "bg-orange-500",
    "bg-amber-500",
    "bg-emerald-500",
    "bg-teal-500",
    "bg-cyan-500",
    "bg-blue-500",
    "bg-indigo-500",
    "bg-violet-500",
    "bg-pink-500",
];

function colorForName(name: string): string {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }

    return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

export function WorkspaceAvatar({ name }: { name: string }) {
    const initial = name.trim().charAt(0).toUpperCase() || "U";

    return (
        <span
            className={`flex size-5 shrink-0 items-center justify-center rounded-sm text-[10px] font-semibold text-white ${colorForName(name)}`}
        >
            {initial}
        </span>
    );
}

export function createWorkspaceIcon(name: string) {
    return function WorkspaceIcon() {
        return <WorkspaceAvatar name={name} />;
    };
}
