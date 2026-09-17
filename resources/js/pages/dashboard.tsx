import { Head } from "@inertiajs/react";
import { Plus } from "lucide-react";
import { PlaceholderPattern } from "@/components/ui/placeholder-pattern";
import { dashboard } from "@/routes";
import type { NavItem, Workspace } from "@/types";
import { CreateWorkspace } from "@/components/create-workspace";

const workspaceActionItem: NavItem = {
    title: "New Workspace",
    href: "/workspaces/create",
    icon: Plus,
};

export default function Dashboard({
    workspace,
}: {
    workspace: Workspace | null;
}) {
    if (!workspace) {
        return (
            <>
                <Head title="Dashboard" />
                <div className="flex h-full max-w-xl! w-full mx-auto flex-1 flex-col items-center justify-center gap-4 rounded-xl p-4 text-center">
                    <div>
                        <h2 className="text-lg font-semibold">
                            No workspaces yet
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            Create your first workspace to get started.
                        </p>
                    </div>
                    <CreateWorkspace
                        item={workspaceActionItem}
                        variant="outline"
                    />
                </div>
            </>
        );
    }

    return (
        <>
            <Head title={workspace.name} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                </div>
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: "Dashboard",
            href: dashboard(),
        },
    ],
};
