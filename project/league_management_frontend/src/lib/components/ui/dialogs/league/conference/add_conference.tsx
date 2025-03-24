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
}

const AddEditConferenceDialog: React.FC<AddEditConferenceDialogProps> = ({ leagueId, isEdit, conferenceId, onSave }) => {
    const { dialogState, closeDialog } = useDialog();
    const isOpen = isEdit ? dialogState["editConference"] : dialogState["addConference"];

    const handleSave = (updatedConference: Conference) => {
        if (onSave) {
            onSave(updatedConference); // Call the onSave callback
        }
        closeDialog(isEdit ? "editConference" : "addConference"); // Close the dialog
    };

    return (
        <Dialog open={isOpen} onOpenChange={() => closeDialog(isEdit ? "editConference" : "addConference")}>
            <DialogPortal>
                <DialogOverlay onClick={() => closeDialog(isEdit ? "editConference" : "addConference")} className="fixed inset-0 bg-black/30 backdrop-blur-none" />
                <DialogContent onFocusOutside={() => closeDialog(isEdit ? "editConference" : "addConference")} className="w-full max-w-[300px] md:max-w-[500px] bg-popover">
                    <DialogHeader>
                        <DialogTitle>{isEdit ? "Edit Conference" : "Add Conference"}</DialogTitle>
                        <DialogDescription>
                            {isEdit ? "Edit " : "Add "} the following info for the conference.
                        </DialogDescription>
                    </DialogHeader>
                    <Separator />
                    <ConferenceForm leagueId={leagueId} isEdit={isEdit ? isEdit : false} onSave={handleSave} conferenceId={conferenceId} />
                </DialogContent>
            </DialogPortal>
        </Dialog>
    );
};

export default AddEditConferenceDialog;