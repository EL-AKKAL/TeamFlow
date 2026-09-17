import { Link, usePage } from "@inertiajs/react";
import { BookOpen, FolderGit2, LayoutGrid, Plus } from "lucide-react";
import AppLogo from "@/components/app-logo";
import { NavFooter } from "@/components/nav-footer";
import { NavMain } from "@/components/nav-main";
import { CreateWorkspace } from "@/components/create-workspace";
import { NavUser } from "@/components/nav-user";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { dashboard } from "@/routes";
import { dashboard as workspaceDashboard } from "@/routes/workspaces";
import { createWorkspaceIcon } from "@/components/workspace-avatar";

import type { NavItem, Workspace } from "@/types";

const mainNavItems: NavItem[] = [
    {
        title: "Dashboard",
        href: dashboard(),
        icon: LayoutGrid,
        isActive: (url) =>
            url === "/dashboard" ||
            /^\/workspaces\/[^/]+\/dashboard$/.test(url),
    },
];

const footerNavItems: NavItem[] = [
    {
        title: "Repository",
        href: "https://github.com/laravel/react-starter-kit",
        icon: FolderGit2,
    },
    {
        title: "Documentation",
        href: "https://laravel.com/docs/starter-kits#react",
        icon: BookOpen,
    },
];

const workspaceActionItem: NavItem = {
    title: "New Workspace",
    href: "/workspaces/create",
    icon: Plus,
};

export function AppSidebar() {
    const page = usePage();

    const workspaces = page.props.workspaces as Workspace[];

    const workspaceNavItems: NavItem[] = workspaces.map((workspace) => ({
        title: workspace.name,
        href: workspaceDashboard(workspace.id),
        icon: createWorkspaceIcon(workspace.name),
    }));

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
                <NavMain items={workspaceNavItems} title="Workspaces" />
                <CreateWorkspace item={workspaceActionItem} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
