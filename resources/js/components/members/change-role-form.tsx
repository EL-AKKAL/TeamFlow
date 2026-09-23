import { Button } from "@/components/ui/button";
import {
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/form/label";
import { update } from "@/routes/workspaces/members";
import type { Member } from "@/types";
import { Form } from "@inertiajs/react";

export function ChangeRoleForm({
    workspaceId,
    member,
}: {
    workspaceId: number;
    member: Member;
}) {
    return (
        <Form {...update.form([workspaceId, member.id])} disableWhileProcessing>
            {({ errors }) => (
                <>
                    <DialogHeader>
                        <DialogTitle>Change role for {member.name}</DialogTitle>
                    </DialogHeader>

                    <div className="grid gap-2 py-4">
                        <Label htmlFor="role">Role</Label>
                        <select
                            id="role"
                            name="role"
                            defaultValue={member.role}
                            className="border-input h-9 rounded-md border bg-transparent px-3 text-sm"
                        >
                            <option value="admin">Admin</option>
                            <option value="member">Member</option>
                            <option value="viewer">Viewer</option>
                        </select>
                        {errors.role && (
                            <p className="text-sm text-destructive">
                                {errors.role}
                            </p>
                        )}
                    </div>

                    <DialogFooter>
                        <Button type="submit">Save</Button>
                    </DialogFooter>
                </>
            )}
        </Form>
    );
}
