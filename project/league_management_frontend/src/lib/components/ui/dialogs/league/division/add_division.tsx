'use client';

import React from "react";
import { Separator } from "@/lib/components/shadcn/separator";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogOverlay, DialogPortal, DialogTitle } from "@/lib/components/shadcn/dialog";
import { useDialog } from "@/lib/components/providers/dialog_provider";
import DivisionForm from "./division_form";

interface AddEditDivisionDialogProps {
    leagueId: number;
    isEdit?: boolean;
}

const AddEditDivisionDialog: React.FC<AddEditDivisionDialogProps> = ({ leagueId, isEdit }) => {
    const { dialogState, closeDialog } = useDialog();
    const isOpen = isEdit ? dialogState["editDivision"] : dialogState["addDivision"];

    return (
        <Dialog open={isOpen} onOpenChange={() => closeDialog(isEdit ? "editDivision" : "addDivision")}>
            <DialogPortal>
                <DialogOverlay onClick={() => closeDialog(isEdit ? "editDivision" : "addDivision")} className="fixed inset-0 bg-black/30 backdrop-blur-none" />
                <DialogContent onFocusOutside={() => closeDialog(isEdit ? "editDivision" : "addDivision")} className="w-full max-w-[300px] md:max-w-[500px] bg-popover">
                    <DialogHeader>
                        <DialogTitle>{isEdit ? "Edit Division" : "Add Division"}</DialogTitle>
                        <DialogDescription>
                            {isEdit ? "Edit " : "Add "} the following info for the division.
                        </DialogDescription>
                    </DialogHeader>
                    <Separator />
                    <DivisionForm leagueId={leagueId} isEdit={isEdit ? isEdit : false} />
                </DialogContent>
            </DialogPortal>
        </Dialog>
    );
};

export default AddEditDivisionDialog;