import { createColumnHelper } from "@tanstack/react-table";
import { type DataTableFeatures } from "@/components/ui/reusable-datatable/data-table-features";
import { RowActions } from "@/components/ui/reusable-datatable/datatable-dropdown";
import { DialogContent } from "@/components/ui/dialog";
import { ChangeRoleForm } from "./change-role-form";
import type { Member } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useInitials } from "@/hooks/use-initials";

export function columns(workspaceId: number) {
    const columnHelper = createColumnHelper<DataTableFeatures, Member>();

    return columnHelper.columns([
        columnHelper.accessor("name", {
            header: "User",
            cell: ({ row }) => {
                const member = row.original;
                const getInitials = useInitials();

                return (
                    <div className="flex items-center gap-2">
                        <Avatar className="size-8">
                            <AvatarImage
                                src={member.avatar_url}
                                alt={member.name}
                            />
                            <AvatarFallback>
                                {getInitials(member.name)}
                            </AvatarFallback>
                        </Avatar>

                        <span>{member.name}</span>
                    </div>
                );
            },
        }),
        columnHelper.accessor("email", { header: "Email" }),

        columnHelper.display({
            id: "actions",
            header: "Actions",
            cell: ({ row }) => (
                <RowActions
                    item="member"
                    deleteRoute={{
                        method: "delete",
                        url: `/workspaces/${workspaceId}/members/${row.original.id}`,
                    }}
                    editContent={
                        <DialogContent>
                            <ChangeRoleForm
                                workspaceId={workspaceId}
                                member={row.original}
                            />
                        </DialogContent>
                    }
                />
            ),
        }),
    ]);
}
