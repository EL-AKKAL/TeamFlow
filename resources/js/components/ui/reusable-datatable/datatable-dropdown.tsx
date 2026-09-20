import type { Method } from "@inertiajs/core";
import { Form } from "@inertiajs/react";
import { MoreHorizontal } from "lucide-react";
import type { ReactNode } from "react";
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
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
interface RowActionsProps {
    deleteRoute: {
        method: Method;
        url: string;
    };
    item: string;
    editContent?: ReactNode;
}

export function RowActions({
    deleteRoute,
    item,
    editContent,
}: RowActionsProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>

                {editContent && (
                    <Dialog>
                        <DropdownMenuItem
                            asChild
                            onSelect={(e) => e.preventDefault()}
                        >
                            <DialogTrigger className="w-full text-left">
                                Edit {item}
                            </DialogTrigger>
                        </DropdownMenuItem>
                        <DialogContent>{editContent}</DialogContent>
                    </Dialog>
                )}

                <DropdownMenuSeparator />

                <AlertDialog>
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                        <AlertDialogTrigger className="w-full text-left">
                            Delete {item}
                        </AlertDialogTrigger>
                    </DropdownMenuItem>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will
                                permanently delete the {item}.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <Form
                            action={deleteRoute.url}
                            method={deleteRoute.method}
                        >
                            {({ processing }) => (
                                <AlertDialogFooter>
                                    <AlertDialogCancel>
                                        Cancel
                                    </AlertDialogCancel>
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
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
