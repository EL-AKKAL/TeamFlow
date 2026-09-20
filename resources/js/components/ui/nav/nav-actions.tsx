import {
    SidebarGroup,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar/sidebar";
import type { NavAction } from "@/types";
import { CreateWorkspace } from "@/components/workspace/create-workspace";
import { Link } from "@inertiajs/react";
import { useCurrentUrl } from "@/hooks/use-current-url";

export function NavActions({ items }: { items: NavAction[] }) {
    const { isCurrentUrl, currentUrl } = useCurrentUrl();

    return items.map((item) => {
        if (item.type === "dialog") {
            return <CreateWorkspace key={item.title} item={item} />;
        }

        return (
            <SidebarGroup key={item.title} className="px-2 py-0">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            isActive={
                                item.isActive
                                    ? item.isActive(currentUrl)
                                    : isCurrentUrl(item.href)
                            }
                            tooltip={{ children: item.title }}
                        >
                            <Link
                                href={item.href}
                                data-slot="sidebar-menu-item"
                            >
                                {item.icon && <item.icon />}
                                <span className="group-data-[collapsible=icon]:hidden">
                                    {item.title}
                                </span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarGroup>
        );
    });
}
