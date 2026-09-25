import { columns } from "@/components/workspaces/columns";
import { DataTable } from "@/components/ui/reusable-datatable/data-table";
import { Workspace } from "@/types";
import { usePage } from "@inertiajs/react";
import { PageLayout } from "@/components/layout/page-layout";
import { getPageDetails } from "@/components/workspaces/page-details";

export default function DemoPage() {
    const page = usePage();
    const data = page.props.workspacesList as Workspace[];
    const details = getPageDetails();

    return (
        <PageLayout {...details}>
            <DataTable columns={columns} data={data} />
        </PageLayout>
    );
}
