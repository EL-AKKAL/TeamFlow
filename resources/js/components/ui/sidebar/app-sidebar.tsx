import { Link, usePage } from "@inertiajs/react";
import { BookOpen, FolderGit2, LayoutGrid, Plus } from "lucide-react";
import AppLogo from "@/components/ui/app-logo";
import { NavFooter } from "@/components/ui/nav/nav-footer";
import { NavMain } from "@/components/ui/nav/nav-main";
import { NavUser } from "@/components/ui/nav/nav-user";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar/sidebar";
import { dashboard } from "@/routes";
import { dashboard as workspaceDashboard } from "@/routes/workspaces";
import { createWorkspaceIcon } from "@/components/ui/workspace-avatar";
import { index as workspaces } from "@/routes/workspaces";

import type { NavAction, NavItem, Workspace } from "@/types";
import { NavActions } from "../nav/nav-actions";

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

const navActions: NavAction[] = [
    {
        title: "New Workspace",
        href: "/workspaces/create",
        icon: Plus,
        type: "dialog",
    },
    {
        title: "Manage Workspaces",
        href: workspaces(),
        icon: FolderGit2,
        type: "link",
    },
];

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
                <NavActions items={navActions} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
