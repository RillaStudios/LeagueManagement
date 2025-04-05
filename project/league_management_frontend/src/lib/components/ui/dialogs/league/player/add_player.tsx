'use client';

import React from "react";
import { Separator } from "@/lib/components/shadcn/separator";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogOverlay, DialogPortal, DialogTitle } from "@/lib/components/shadcn/dialog";
import { useDialog } from "@/lib/components/providers/dialog_provider";
import TeamForm from "./player_form";
import { Player } from "@/lib/types/league/player";
import PlayerForm from "./player_form";

interface AddEditPlayerDialogProps {
    leagueId: number;
    playerId?: number;
    isEdit?: boolean;
    onSave?: (updatedPlayer: Player) => void;
    onClose?: () => void; // Add this prop
    coachEdit?: boolean; // Optional prop to indicate if the user is a coach
}

/* 
A dialog component for adding or editing a player in a league.

@Author: IFD
@Date: 2025-04-01
*/
const AddEditPlayerDialog: React.FC<AddEditPlayerDialogProps> = ({ leagueId, isEdit, playerId, onSave, onClose, coachEdit }) => {
    const { dialogState, closeDialog } = useDialog();

    // If it's an edit dialog, use dialogState, otherwise assume it's always open (controlled by parent)
    const isOpen = isEdit ? dialogState["editPlayer"] : true;

    const handleSave = (updatedPlayer: Player) => {

        if (onSave) {
            onSave(updatedPlayer); // Call the onSave callback
        }

        if (isEdit) {
            closeDialog("editPlayer");
        }
    };

    return (
        <Dialog
            open={isOpen}
            onOpenChange={(open) => {
                if (!open) {
                    if (isEdit) {
                        closeDialog("editPlayer");
                    } else if (onClose) {
                        onClose(); // Call onClose for add dialog
                    }
                }
            }}
        >
            <DialogPortal>
                <DialogOverlay onClick={() => closeDialog(isEdit ? "editPlayer" : "addPlayer")} className="fixed inset-0 bg-black/30 backdrop-blur-none" />
                <DialogContent onFocusOutside={() => closeDialog(isEdit ? "editPlayer" : "addPlayer")} className="w-full max-w-[300px] md:max-w-[500px] bg-popover">
                    <DialogHeader>
                        <DialogTitle>{isEdit ? "Edit Player" : "Add Player"}</DialogTitle>
                        <DialogDescription>
                            {isEdit ? "Edit " : "Add "} the following info for the player.
                        </DialogDescription>
                    </DialogHeader>
                    <Separator />
                    <PlayerForm
                        leagueId={leagueId}
                        isEdit={isEdit}
                        playerId={playerId}
                        onSave={handleSave}
                        coachEdit={coachEdit}
                    />
                </DialogContent>
            </DialogPortal>
        </Dialog>
    );
};

export default AddEditPlayerDialog;