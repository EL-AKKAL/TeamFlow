import { createColumnHelper } from "@tanstack/react-table";
import { type DataTableFeatures } from "@/components/ui/reusable-datatable/data-table-features";
import { RowActions } from "@/components/ui/reusable-datatable/datatable-dropdown";
import { DialogContent } from "@/components/ui/dialog";
// import { ChangeRoleForm } from "./change-role-form";
import type { Member } from "@/types";

export function columns(workspaceId: number) {
    const columnHelper = createColumnHelper<DataTableFeatures, Member>();

    return columnHelper.columns([
        columnHelper.accessor("name", { header: "Name" }),
        columnHelper.accessor("email", { header: "Email" }),
        columnHelper.accessor("role", {
            header: "Role",
            cell: ({ getValue }) => (
                <span className="capitalize">{getValue()}</span>
            ),
        }),
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
                            {/* <ChangeRoleForm
                                workspaceId={workspaceId}
                                member={row.original}
                            /> */}
                            <span>whatever</span>
                        </DialogContent>
                    }
                />
            ),
        }),
    ]);
}
