import Heading from "@/components/ui/heading";
import { columns } from "@/components/ui/reusable-datatable/columns";
import { DataTable } from "@/components/ui/reusable-datatable/data-table";
import { Workspace } from "@/types";
import { Head, usePage } from "@inertiajs/react";

export default function DemoPage() {
    const page = usePage();
    const data = page.props.workspaces as Workspace[];

    return (
        <div className="container mx-auto p-10">
            <Head title="Manange Workspaces" />
            <Heading
                title="Manange Workspaces"
                description="Manage your workspaces"
            />
            <DataTable columns={columns} data={data} />
        </div>
    );
}
