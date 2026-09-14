import { Link } from "@inertiajs/react";
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useCurrentUrl } from "@/hooks/use-current-url";
import type { NavItem } from "@/types";
import { PlaceholderPattern } from "./ui/placeholder-pattern";
export function NavMain({
    items,
    title,
}: {
    items: NavItem[];
    title?: string;
}) {
    const { isCurrentUrl } = useCurrentUrl();

    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>{title || "Platform"}</SidebarGroupLabel>
            <SidebarMenu>
                {items.length === 0 ? (
                    <div className="relative flex aspect-video w-full! px-2 items-center justify-center overflow-hidden h-fit! rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern />
                        <span className="text-gray-400">
                            No workspaces available. Create a new workspace to
                            get started.
                        </span>
                    </div>
                ) : (
                    items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                                asChild
                                isActive={isCurrentUrl(item.href)}
                                tooltip={{ children: item.title }}
                            >
                                <Link href={item.href} prefetch>
                                    {item.icon && <item.icon />}
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))
                )}
            </SidebarMenu>
        </SidebarGroup>
    );
}
