'use client';

import React from "react";
import { Separator } from "@/lib/components/shadcn/separator";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogOverlay, DialogPortal, DialogTitle } from "@/lib/components/shadcn/dialog";
import { useDialog } from "@/lib/components/providers/dialog_provider";
import NewsLeagueForm from "./news_team_form";
import { TeamNews } from "@/lib/types/league/team_news";

interface AddEditNewsTeamDialogProps {
    teamId: number;
    newsId?: number;
    isEdit?: boolean;
    onClose?: () => void; // Add this prop
    onSave?: (updatedNews: TeamNews) => void;
}

/* 
A dialog component for adding or editing a news post in a team.

@Author: IFD
@Date: 2025-04-01
*/
const AddEditNewsTeamDialog: React.FC<AddEditNewsTeamDialogProps> = ({ teamId, isEdit, newsId, onClose, onSave }) => {
    const { dialogState, closeDialog } = useDialog();
    const isOpen = isEdit ? dialogState["editNewsTeam"] : true;

    const handleSave = (updatedNews: TeamNews) => {
        if (onSave) {
            onSave(updatedNews); // Call the onSave callback
        }

        // Only close through dialogState if it's an edit dialog
        if (isEdit) {
            closeDialog("editNewsTeam");
        }
    };

    return (
        <Dialog
            open={isOpen}
            onOpenChange={(open) => {
                if (!open) {
                    if (isEdit) {
                        closeDialog("editNewsTeam");
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
                            closeDialog("editNewsTeam");
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
                        <DialogTitle>{isEdit ? "Edit News" : "Add News"}</DialogTitle>
                        <DialogDescription>
                            {isEdit ? "Edit " : "Add "} the following news post for the team.
                        </DialogDescription>
                    </DialogHeader>
                    <Separator />
                    <NewsLeagueForm
                        teamId={teamId}
                        newsId={newsId}
                        isEdit={isEdit}
                        onSave={handleSave}
                    />
                </DialogContent>
            </DialogPortal>
        </Dialog>
    );
};

export default AddEditNewsTeamDialog;