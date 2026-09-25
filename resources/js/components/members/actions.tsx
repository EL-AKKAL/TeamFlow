import { destroy } from "@/routes/workspaces/members";
import type { Member, RowAction } from "@/types";
import { ChangeRoleForm } from "./change-role-form";

export function getMemberActions(
    workspaceId: number,
    member: Member,
): RowAction[] {
    return [
        {
            type: "dialog",
            label: "Edit role",
            content: (
                <ChangeRoleForm workspaceId={workspaceId} member={member} />
            ),
        },
        { type: "separator" },
        {
            type: "delete",
            label: "Remove from workspace",
            route: {
                method: "delete",
                url: destroy.url([workspaceId, member.id]),
            },
            description: `${member.name} will lose access to this workspace immediately.`,
        },
    ];
}
