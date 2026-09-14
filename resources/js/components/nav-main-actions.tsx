import {
    SidebarGroup,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import type { NavItem } from "@/types";
import { Button } from "./ui/button";
export function NavMainActions({
    items,
}: {
    items: NavItem[];
    title?: string;
}) {
    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarMenu>
                {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                            asChild
                            tooltip={{ children: item.title }}
                        >
                            <Button>
                                {item.icon && <item.icon />}
                                <span className="group-data-[collapsible=icon]:hidden">
                                    {item.title}
                                </span>
                            </Button>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
