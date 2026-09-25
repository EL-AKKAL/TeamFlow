import { Head } from "@inertiajs/react";
import Heading from "@/components/ui/heading";
import { PageLayoutProps } from "@/types";

export function PageLayout({
    title,
    description,
    headTitle = title,
    action,
    children,
}: PageLayoutProps) {
    return (
        <div className="container mx-auto p-10">
            <Head title={headTitle} />

            <div className="flex items-center justify-between">
                <Heading title={title} description={description} />

                {action}
            </div>

            {children}
        </div>
    );
}
