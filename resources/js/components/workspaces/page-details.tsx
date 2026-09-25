import { CreateWorkspace } from "./create-workspace";
import { Plus } from "lucide-react";
import { store } from "@/routes/workspaces";

export function getPageDetails() {
    const item = {
        title: "New Workspace",
        href: store.url(),
        icon: Plus,
        type: "dialog",
    };
    return {
        title: "Workspaces",
        description: `Manage your workspaces and their members`,
        headTitle: `Manange Workspaces`,
        action: <CreateWorkspace item={item} variant="outline" />,
    };
}
