import { Button } from "@/components/ui/button";
import {
    DialogClose,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { store } from "@/routes/workspaces";
import { Form } from "@inertiajs/react";
import { useRef } from "react";

export function CreateWorkspaceForm() {
    const closeRef = useRef<HTMLButtonElement>(null);

    return (
        <Form
            {...store.form()}
            resetOnSuccess={["name", "description"]}
            disableWhileProcessing
            onSuccess={() => closeRef.current?.click()}
        >
            <DialogHeader>
                <DialogTitle>New Workspace</DialogTitle>
            </DialogHeader>

            <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                    <Label htmlFor="name">Title</Label>
                    <Input id="name" name="name" autoFocus />
                </div>
            </div>

            <DialogFooter>
                <DialogClose ref={closeRef} asChild>
                    <Button type="button" variant="outline">
                        Cancel
                    </Button>
                </DialogClose>
                <Button type="submit">Create</Button>
            </DialogFooter>
        </Form>
    );
}
