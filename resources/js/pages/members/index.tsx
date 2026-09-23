import Heading from "@/components/ui/heading";
import { columns } from "@/components/members/columns";
import { DataTable } from "@/components/ui/reusable-datatable/data-table";
// import { InviteMemberForm } from "@/components/members/invite-member-form";
import type { Member } from "@/types";
import { Head, usePage } from "@inertiajs/react";
import { InviteMemberForm } from "@/components/members/invite-member-form";

export default function MembersIndex() {
    const page = usePage();
    const currentWorkspace = page.props.currentWorkspace as {
        id: number;
        name: string;
    };
    const members = page.props.members as Member[];

    return (
        <div className="container mx-auto p-10">
            <Head title={`Members — ${currentWorkspace.name}`} />

            <div className="flex items-center justify-between">
                <Heading
                    title="Members"
                    description={`Manage who has access to ${currentWorkspace.name}`}
                />
                <InviteMemberForm workspaceId={currentWorkspace.id} />
            </div>

            <DataTable columns={columns(currentWorkspace.id)} data={members} />
        </div>
    );
}
