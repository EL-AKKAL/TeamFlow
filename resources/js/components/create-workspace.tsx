import {
    SidebarGroup,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import type { NavItem } from "@/types";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { CreateWorkspaceForm } from "./create-workspace-form";

export function CreateWorkspace({ item }: { item: NavItem; title?: string }) {
    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarMenu>
                <SidebarMenuItem key={item.title}>
                    <Dialog>
                        <DialogTrigger asChild>
                            <SidebarMenuButton
                                tooltip={{ children: item.title }}
                                variant="outline"
                            >
                                {item.icon && <item.icon />}
                                <span className="group-data-[collapsible=icon]:hidden">
                                    {item.title}
                                </span>
                            </SidebarMenuButton>
                        </DialogTrigger>
                        <DialogContent>
                            <CreateWorkspaceForm />
                        </DialogContent>
                    </Dialog>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarGroup>
    );
}
