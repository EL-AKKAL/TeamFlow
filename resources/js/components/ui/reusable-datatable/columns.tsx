import { createColumnHelper } from "@tanstack/react-table";
import { type DataTableFeatures } from "./data-table-features";
import { type Workspace } from "@/types/index";

// Use `accessor` for data columns and `display` for columns without one.
const columnHelper = createColumnHelper<DataTableFeatures, Workspace>();

export const columns = columnHelper.columns([
    columnHelper.accessor("id", {
        header: "ID",
    }),
    columnHelper.accessor("name", {
        header: "Name",
    }),
]);
