import { createColumnHelper } from "@tanstack/react-table";
import { type DataTableFeatures } from "@/components/ui/reusable-datatable/data-table-features";
import { RowAction, type Workspace } from "@/types/index";
import { RowActions } from "@/components/ui/reusable-datatable/datatable-dropdown";
import { CreateWorkspaceForm } from "@/components/workspaces/create-workspace-form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useInitials } from "@/hooks/use-initials";
import { Edit3, Trash, Users } from "lucide-react";
import { index as members } from "@/routes/workspaces/members";
import { destroy } from "@/routes/workspaces";
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
            const workspace = row.original as Workspace;

            const actions: RowAction[] = [
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

            return <RowActions actions={actions} />;
        },
    }),
]);
