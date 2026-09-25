import { Form, Link } from "@inertiajs/react";
import { MoreHorizontal } from "lucide-react";
import { Fragment } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { RowAction } from "@/types";

export function RowActions({ actions }: { actions: RowAction[] }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>

                {actions.map((action, index) => (
                    <Fragment key={index}>
                        <RowActionItem action={action} />
                    </Fragment>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

function RowActionItem({ action }: { action: RowAction }) {
    if (action.type === "separator") {
        return <DropdownMenuSeparator />;
    }

    if (action.type === "link") {
        return (
            <DropdownMenuItem asChild>
                <Link href={action.href} className="w-full text-left">
                    {action.icon && <action.icon />}
                    {action.label}
                </Link>
            </DropdownMenuItem>
        );
    }

    if (action.type === "dialog") {
        return (
            <Dialog>
                <DropdownMenuItem asChild onSelect={(e) => e.preventDefault()}>
                    <DialogTrigger className="w-full text-left">
                        {action.icon && <action.icon />}
                        {action.label}
                    </DialogTrigger>
                </DropdownMenuItem>
                <DialogContent>{action.content}</DialogContent>
            </Dialog>
        );
    }

    // action.type === "delete"
    return (
        <AlertDialog>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <AlertDialogTrigger className="w-full text-left flex gap-2 items-center">
                    {action.icon && <action.icon />}
                    {action.label}
                </AlertDialogTrigger>
            </DropdownMenuItem>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        {action.title ?? "Are you absolutely sure?"}
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        {action.description ?? "This action cannot be undone."}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <Form action={action.route.url} method={action.route.method}>
                    {({ processing }) => (
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                                type="submit"
                                disabled={processing}
                            >
                                Continue
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    )}
                </Form>
            </AlertDialogContent>
        </AlertDialog>
    );
}
