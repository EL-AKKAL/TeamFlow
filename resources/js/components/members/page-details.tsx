import { Workspace } from "@/types";
import { InviteMemberForm } from "./invite-member-form";

export function getPageDetails(workspace: Workspace) {
    return {
        title: "Members",
        description: `Manage who has access to ${workspace.name}`,
        headTitle: `Members — ${workspace.name}`,
        action: <InviteMemberForm workspaceId={workspace.id} />,
    };
}
