'use client';

import React from "react";
import { Separator } from "@/lib/components/shadcn/separator";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogOverlay, DialogPortal, DialogTitle } from "@/lib/components/shadcn/dialog";
import { useDialog } from "@/lib/components/providers/dialog_provider";
import { Season } from "@/lib/types/league/season";
import SeasonForm from "./season_form";

interface AddEditSeasonnDialogProps {
    leagueId: number;
    isEdit?: boolean;
    seasonId?: number;
    onSave?: (updatedSeason: Season) => void;
}

const AddEditSeasonDialog: React.FC<AddEditSeasonnDialogProps> = ({ leagueId, isEdit, seasonId, onSave }) => {
    const { dialogState, closeDialog } = useDialog();
    const isOpen = isEdit ? dialogState["editSeason"] : dialogState["addSeason"];

    const handleSave = (updatedSeason: Season) => {
        if (onSave) {
            onSave(updatedSeason); // Call the onSave callback
        }
        closeDialog(isEdit ? "editSeason" : "addSeason"); // Close the dialog
    };

    return (
        <Dialog open={isOpen} onOpenChange={() => closeDialog(isEdit ? "editSeason" : "addSeason")}>
            <DialogPortal>
                <DialogOverlay onClick={() => closeDialog(isEdit ? "editSeason" : "addSeason")} className="fixed inset-0 bg-black/30 backdrop-blur-none" />
                <DialogContent onFocusOutside={() => closeDialog(isEdit ? "editSeason" : "addSeason")} className="w-full max-w-[300px] md:max-w-[500px] bg-popover">
                    <DialogHeader>
                        <DialogTitle>{isEdit ? "Edit Season" : "Add Season"}</DialogTitle>
                        <DialogDescription>
                            {isEdit ? "Edit " : "Add "} the following info for the season.
                        </DialogDescription>
                    </DialogHeader>
                    <Separator />
                    <SeasonForm
                        leagueId={leagueId}
                        isEdit={isEdit}
                        seasonId={seasonId}
                        onSave={handleSave}
                    />
                </DialogContent>
            </DialogPortal>
        </Dialog>
    );
};

export default AddEditSeasonDialog;