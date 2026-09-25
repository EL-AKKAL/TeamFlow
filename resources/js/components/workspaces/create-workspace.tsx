import {
    SidebarGroup,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar/sidebar";
import type { NavAction, NavItem } from "@/types";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { CreateWorkspaceForm } from "./create-workspace-form";
import { Button } from "../ui/button";

export function CreateWorkspace({
    item,
    variant = "default",
}: {
    item: NavItem | NavAction;
    variant?: "default" | "outline";
}) {
    if (variant === "default") {
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
    return (
        <Dialog>
            <DialogTrigger
                asChild
                className=" flex items-center justify-center px-5 border"
            >
                <Button>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <CreateWorkspaceForm />
            </DialogContent>
        </Dialog>
    );
}
