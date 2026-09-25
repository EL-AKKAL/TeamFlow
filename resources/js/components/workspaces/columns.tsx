import { createColumnHelper } from "@tanstack/react-table";
import { type DataTableFeatures } from "@/components/ui/reusable-datatable/data-table-features";
import { type Workspace } from "@/types/index";
import { RowActions } from "@/components/ui/reusable-datatable/datatable-dropdown";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useInitials } from "@/hooks/use-initials";
import { getActions } from "./actions";

// Use `accessor` for data columns and `display` for columns without one.
const columnHelper = createColumnHelper<DataTableFeatures, Workspace>();

export const columns = columnHelper.columns([
    columnHelper.accessor("id", {
        header: "ID",
    }),
    columnHelper.accessor("name", {
        header: "Name",
    }),
    columnHelper.accessor("members", {
        id: "members",
        header: "Members",
        cell: ({ row }) => {
            const workspace = row.original;
            const getInitials = useInitials();
            return (
                <div className="flex -space-x-2">
                    {workspace.members?.map((member) => (
                        <Avatar
                            key={member.id}
                            className="border-2 border-background"
                        >
                            <AvatarImage
                                src={member.avatar_url}
                                alt={member.name}
                            />
                            <AvatarFallback>
                                {getInitials(member.name)}
                            </AvatarFallback>
                        </Avatar>
                    ))}

                    {workspace.members_count && workspace.members_count > 3 && (
                        <Avatar className="border-2 border-background">
                            <AvatarFallback>
                                +{workspace.members_count - 3}
                            </AvatarFallback>
                        </Avatar>
                    )}
                </div>
            );
        },
    }),
    columnHelper.display({
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            return (
                <RowActions actions={getActions(row.original as Workspace)} />
            );
        },
    }),
]);
