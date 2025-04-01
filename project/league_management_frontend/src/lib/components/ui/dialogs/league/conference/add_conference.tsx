'use client';

import React from "react";
import { Separator } from "@/lib/components/shadcn/separator";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogOverlay, DialogPortal, DialogTitle } from "@/lib/components/shadcn/dialog";
import { useDialog } from "@/lib/components/providers/dialog_provider";
import ConferenceForm from "./conference_form";
import { Conference } from "@/lib/types/league/conference";

interface AddEditConferenceDialogProps {
    leagueId: number;
    isEdit?: boolean;
    conferenceId?: number;
    onSave?: (updatedConference: Conference) => void;
    onClose?: () => void; // Add this prop
}

/* 
A dialog component for adding or editing a conference.

@Author: IFD
@Date: 2025-04-01
*/
const AddEditConferenceDialog: React.FC<AddEditConferenceDialogProps> = ({
    leagueId,
    isEdit,
    conferenceId,
    onSave,
    onClose  // Add this prop
}) => {
    const { dialogState, closeDialog } = useDialog();

    // If it's an edit dialog, use dialogState, otherwise assume it's always open (controlled by parent)
    const isOpen = isEdit ? dialogState["editConference"] : true;

    const handleSave = (updatedConference: Conference) => {

        if (onSave) {
            onSave(updatedConference);
        }

        // Only close through dialogState if it's an edit dialog
        if (isEdit) {
            closeDialog("editConference");
        }

    };

    return (
        <Dialog
            open={isOpen}
            onOpenChange={(open) => {
                if (!open) {
                    if (isEdit) {
                        closeDialog("editConference");
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
                            closeDialog("editConference");
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
                        <DialogTitle>{isEdit ? "Edit Conference" : "Add Conference"}</DialogTitle>
                        <DialogDescription>
                            {isEdit ? "Edit " : "Add "} the following info for the conference.
                        </DialogDescription>
                    </DialogHeader>
                    <Separator />
                    <ConferenceForm leagueId={leagueId} isEdit={isEdit || false} onSave={handleSave} conferenceId={conferenceId} />
                </DialogContent>
            </DialogPortal>
        </Dialog>
    );
};

export default AddEditConferenceDialog;