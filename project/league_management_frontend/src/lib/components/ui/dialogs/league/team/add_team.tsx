'use client';

import React from "react";
import { Separator } from "@/lib/components/shadcn/separator";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogOverlay, DialogPortal, DialogTitle } from "@/lib/components/shadcn/dialog";
import { useDialog } from "@/lib/components/providers/dialog_provider";
import { Team } from "@/lib/types/league/team";
import TeamForm from "./team_form";

interface AddEditTeamDialogProps {
    leagueId: number;
    teamId?: number;
    isEdit?: boolean;
    onSave?: (updatedTeam: Team) => void;
    onClose?: () => void; // Add this prop
}

/* 
A dialog component for adding or editing a team in a league.

@Author: IFD
@Date: 2025-04-01
*/
const AddEditTeamDialog: React.FC<AddEditTeamDialogProps> = ({ leagueId, isEdit, teamId, onSave, onClose }) => {
    const { dialogState, closeDialog } = useDialog();

    // If it's an edit dialog, use dialogState, otherwise assume it's always open (controlled by parent)
    const isOpen = isEdit ? dialogState["editTeam"] : true;

    const handleSave = (updatedTeam: Team) => {

        if (onSave) {
            onSave(updatedTeam); // Call the onSave callback
        }

        if (isEdit) {
            closeDialog("editTeam");
        }
    };

    return (
        <Dialog
            open={isOpen}
            onOpenChange={(open) => {
                if (!open) {
                    if (isEdit) {
                        closeDialog("editTeam");
                    } else if (onClose) {
                        onClose(); // Call onClose for add dialog
                    }
                }
            }}
        >
            <DialogPortal>
                <DialogOverlay onClick={() => closeDialog(isEdit ? "editTeam" : "addTeam")} className="fixed inset-0 bg-black/30 backdrop-blur-none" />
                <DialogContent onFocusOutside={() => closeDialog(isEdit ? "editTeam" : "addTeam")} className="w-full max-w-[300px] md:max-w-[500px] bg-popover">
                    <DialogHeader>
                        <DialogTitle>{isEdit ? "Edit Team" : "Add Team"}</DialogTitle>
                        <DialogDescription>
                            {isEdit ? "Edit " : "Add "} the following info for the team.
                        </DialogDescription>
                    </DialogHeader>
                    <Separator />
                    <TeamForm
                        leagueId={leagueId}
                        isEdit={isEdit}
                        teamId={teamId}
                        onSave={handleSave}
                    />
                </DialogContent>
            </DialogPortal>
        </Dialog>
    );
};

export default AddEditTeamDialog;