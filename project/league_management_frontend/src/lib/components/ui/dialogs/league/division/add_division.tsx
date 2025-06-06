'use client';

import React from "react";
import { Separator } from "@/lib/components/shadcn/separator";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogOverlay, DialogPortal, DialogTitle } from "@/lib/components/shadcn/dialog";
import { useDialog } from "@/lib/components/providers/dialog_provider";
import DivisionForm from "./division_form";
import { Division } from "@/lib/types/league/division";

interface AddEditDivisionDialogProps {
    leagueId: number;
    divisionId?: number;
    isEdit?: boolean;
    onSave?: (updatedDivision: Division) => void;
    onClose?: () => void; // Add this prop
}

/* 
A dialog component for adding or editing a division in a league.

@Author: IFD
@Date: 2025-04-01
*/
const AddEditDivisionDialog: React.FC<AddEditDivisionDialogProps> = ({ leagueId, isEdit, divisionId, onSave, onClose }) => {
    const { dialogState, closeDialog } = useDialog();
    const isOpen = isEdit ? dialogState["editDivision"] : true;

    const handleSave = (updatedDivision: Division) => {
        if (onSave) {
            onSave(updatedDivision); // Call the onSave callback
        }
        closeDialog("editDivision"); // Close the dialog
    };

    return (
        <Dialog
            open={isOpen}
            onOpenChange={(open) => {
                if (!open) {
                    if (isEdit) {
                        closeDialog("editDivision");
                    } else if (onClose) {
                        onClose(); // Call onClose for add dialog
                    }
                }
            }}
        >
            <DialogPortal>
                <DialogOverlay
                    className="fixed inset-0 bg-black/30 backdrop-blur-none"
                    onClick={(e) => {
                        e.stopPropagation();
                        if (isEdit) {
                            closeDialog("editDivision");
                        } else if (onClose) {
                            onClose(); // Call onClose for add dialog
                        }
                    }}
                />
                <DialogContent
                    className="w-full max-w-[300px] md:max-w-[500px] bg-popover"
                    onFocusOutside={(e) => {
                        e.preventDefault(); // Prevent accidental closing
                    }}
                >
                    <DialogHeader>
                        <DialogTitle>{isEdit ? "Edit Division" : "Add Division"}</DialogTitle>
                        <DialogDescription>
                            {isEdit ? "Edit " : "Add "} the following info for the division.
                        </DialogDescription>
                    </DialogHeader>
                    <Separator />
                    <DivisionForm
                        leagueId={leagueId}
                        isEdit={isEdit}
                        divisionId={divisionId}
                        onSave={handleSave}
                    />
                </DialogContent>
            </DialogPortal>
        </Dialog>
    );
};

export default AddEditDivisionDialog;