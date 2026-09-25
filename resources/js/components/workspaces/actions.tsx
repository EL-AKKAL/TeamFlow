import { destroy } from "@/routes/workspaces";
import { index as members } from "@/routes/workspaces/members";
import { Edit3, Trash, Users } from "lucide-react";
import { CreateWorkspaceForm } from "./create-workspace-form";
import type { RowAction, Workspace } from "@/types";

export function getActions(workspace: Workspace): RowAction[] {
    return [
        {
            type: "dialog",
            label: "Edit workspace",
            icon: Edit3,
            content: <CreateWorkspaceForm />,
        },
        {
            type: "link",
            label: "Manage members",
            href: members.url(workspace.id),
            icon: Users,
        },
        { type: "separator" },
        {
            type: "delete",
            label: "Delete workspace",
            icon: Trash,
            route: {
                method: "delete",
                url: destroy.url(workspace.id),
            },
            description:
                "This will permanently delete the workspace and remove all members.",
        },
    ];
}
