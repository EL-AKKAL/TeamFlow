import { columns, Payment } from "@/components/ui/reusable-datatable/columns";
import { DataTable } from "@/components/ui/reusable-datatable/data-table";
import { payments } from "@/lib/data";

export default function DemoPage() {
    const data = payments;

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} />
        </div>
    );
}
