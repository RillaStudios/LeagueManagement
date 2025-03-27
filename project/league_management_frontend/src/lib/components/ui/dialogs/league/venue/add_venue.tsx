'use client';

import React from "react";
import { Separator } from "@/lib/components/shadcn/separator";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogOverlay, DialogPortal, DialogTitle } from "@/lib/components/shadcn/dialog";
import { useDialog } from "@/lib/components/providers/dialog_provider";
import { Conference } from "@/lib/types/league/conference";
import VenueForm from "./venue_form";
import { Venue } from "@/lib/types/league/venue";

interface AddEditVenueDialogProps {
    leagueId: number;
    isEdit?: boolean;
    venueId?: number;
    onSave?: (updatedConference: Venue) => void;
}

const AddEditVenueDialog: React.FC<AddEditVenueDialogProps> = ({ leagueId, isEdit, venueId, onSave }) => {
    const { dialogState, closeDialog } = useDialog();
    const isOpen = isEdit ? dialogState["editVenue"] : dialogState["addVenue"];

    const handleSave = (updatedVenue: Venue) => {
        if (onSave) {
            onSave(updatedVenue); // Call the onSave callback
        }
        closeDialog(isEdit ? "editVenue" : "addVenue"); // Close the dialog
    };

    return (
        <Dialog open={isOpen} onOpenChange={() => closeDialog(isEdit ? "editVenue" : "addVenue")}>
            <DialogPortal>
                <DialogOverlay onClick={() => closeDialog(isEdit ? "editVenue" : "addVenue")} className="fixed inset-0 bg-black/30 backdrop-blur-none" />
                <DialogContent onFocusOutside={() => closeDialog(isEdit ? "editVenue" : "addVenue")} className="w-full max-w-[300px] md:max-w-[500px] bg-popover">
                    <DialogHeader>
                        <DialogTitle>{isEdit ? "Edit Venue" : "Add Venue"}</DialogTitle>
                        <DialogDescription>
                            {isEdit ? "Edit " : "Add "} the following info for the venue.
                        </DialogDescription>
                    </DialogHeader>
                    <Separator />
                    <VenueForm leagueId={leagueId} isEdit={isEdit ? isEdit : false} onSave={handleSave} venueId={venueId} />
                </DialogContent>
            </DialogPortal>
        </Dialog>
    );
};

export default AddEditVenueDialog;