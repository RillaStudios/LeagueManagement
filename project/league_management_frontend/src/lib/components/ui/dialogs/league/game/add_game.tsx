'use client';

import React from "react";
import { Separator } from "@/lib/components/shadcn/separator";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogOverlay, DialogPortal, DialogTitle } from "@/lib/components/shadcn/dialog";
import { useDialog } from "@/lib/components/providers/dialog_provider";
import { Game } from "@/lib/types/league/game";
import GameForm from "./game_form";

interface AddEditGameDialogProps {
    leagueId: number;
    gameId?: number;
    seasonId?: number;
    isEdit?: boolean;
    onSave?: (updatedGame: Game) => void;
}

/* 
A dialog component for adding or editing a game in a league.

@Author: IFD
@Date: 2025-04-01
*/
const AddEditGameDialog: React.FC<AddEditGameDialogProps> = ({ leagueId, isEdit, gameId, seasonId, onSave }) => {
    const { dialogState, closeDialog } = useDialog();
    const isOpen = isEdit ? dialogState["editGame"] : dialogState["addGame"];

    const handleSave = (updatedGame: Game) => {
        if (onSave) {
            onSave(updatedGame); // Call the onSave callback
        }
        closeDialog(isEdit ? "editGame" : "addGame"); // Close the dialog
    };

    return (
        <Dialog open={isOpen} onOpenChange={() => closeDialog(isEdit ? "editGame" : "addGame")}>
            <DialogPortal>
                <DialogOverlay onClick={() => closeDialog(isEdit ? "editGame" : "addGame")} className="fixed inset-0 bg-black/30 backdrop-blur-none" />
                <DialogContent onFocusOutside={() => closeDialog(isEdit ? "editGame" : "addGame")} className="w-full max-w-[300px] md:max-w-[500px] bg-popover">
                    <DialogHeader>
                        <DialogTitle>{isEdit ? "Edit Game" : "Add Game"}</DialogTitle>
                        <DialogDescription>
                            {isEdit ? "Edit " : "Add "} the following info for the game.
                        </DialogDescription>
                    </DialogHeader>
                    <Separator />
                    <GameForm
                        leagueId={leagueId}
                        isEdit={isEdit}
                        gameId={gameId}
                        seasonId={seasonId}
                        onSave={handleSave}
                    />
                </DialogContent>
            </DialogPortal>
        </Dialog>
    );
};

export default AddEditGameDialog;