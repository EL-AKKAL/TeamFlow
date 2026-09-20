import { createColumnHelper } from "@tanstack/react-table";
import { type DataTableFeatures } from "./data-table-features";
import { type Workspace } from "@/types/index";
import { RowActions } from "./datatable-dropdown";
import { CreateWorkspaceForm } from "@/components/workspace/create-workspace-form";

// Use `accessor` for data columns and `display` for columns without one.
const columnHelper = createColumnHelper<DataTableFeatures, Workspace>();

export const columns = columnHelper.columns([
    columnHelper.accessor("id", {
        header: "ID",
    }),
    columnHelper.accessor("name", {
        header: "Name",
    }),
    columnHelper.display({
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
            <RowActions
                item="workspace"
                deleteRoute={{
                    method: "delete",
                    url: `/workspaces/${row.original.id}`,
                }}
                editContent={<CreateWorkspaceForm />}
            />
        ),
    }),
]);
