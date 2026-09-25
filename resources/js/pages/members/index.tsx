import { columns } from "@/components/members/columns";
import { DataTable } from "@/components/ui/reusable-datatable/data-table";
import type { Member, Workspace } from "@/types";
import { usePage } from "@inertiajs/react";
import { PageLayout } from "@/components/layout/page-layout";
import { getPageDetails } from "@/components/members/page-details";

export default function MembersIndex() {
    const page = usePage();
    const currentWorkspace = page.props.currentWorkspace as Workspace;
    const members = page.props.members as Member[];

    const details = getPageDetails(currentWorkspace);

    return (
        <PageLayout {...details}>
            <DataTable columns={columns(currentWorkspace.id)} data={members} />
        </PageLayout>
    );
}
