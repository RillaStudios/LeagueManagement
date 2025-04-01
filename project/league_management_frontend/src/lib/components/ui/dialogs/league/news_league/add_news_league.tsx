'use client';

import React from "react";
import { Separator } from "@/lib/components/shadcn/separator";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogOverlay, DialogPortal, DialogTitle } from "@/lib/components/shadcn/dialog";
import { useDialog } from "@/lib/components/providers/dialog_provider";
import NewsLeagueForm from "./news_league_form";
import { NewsLeague } from "@/lib/types/league/news_league";

interface AddEditNewsLeagueDialogProps {
    leagueId: number;
    newsId?: number;
    isEdit?: boolean;
    onClose?: () => void; // Add this prop
    onSave?: (updatedNews: NewsLeague) => void;
}

/* 
A dialog component for adding or editing a news post in a league.

@Author: IFD
@Date: 2025-04-01
*/
const AddEditNewsLeagueDialog: React.FC<AddEditNewsLeagueDialogProps> = ({ leagueId, isEdit, newsId, onClose, onSave }) => {
    const { dialogState, closeDialog } = useDialog();
    const isOpen = isEdit ? dialogState["editDivision"] : true;

    const handleSave = (updatedNews: NewsLeague) => {
        if (onSave) {
            onSave(updatedNews); // Call the onSave callback
        }
        closeDialog(isEdit ? "editNewsLeague" : "addNewsLeague"); // Close the dialog
    };

    return (
        <Dialog
            open={isOpen}
            onOpenChange={(open) => {
                if (!open) {
                    if (isEdit) {
                        closeDialog("editNewsLeague");
                    } else if (onClose) {
                        onClose(); // Call onClose for add dialog
                    }
                }
            }}
        >
            <DialogPortal>
                <DialogOverlay onClick={() => closeDialog(isEdit ? "editNewsLeague" : "addNewsLeague")} className="fixed inset-0 bg-black/30 backdrop-blur-none" />
                <DialogContent onFocusOutside={() => closeDialog(isEdit ? "editNewsLeague" : "addNewsLeague")} className="w-full max-w-[300px] md:max-w-[500px] bg-popover">
                    <DialogHeader>
                        <DialogTitle>{isEdit ? "Edit Game" : "Add Game"}</DialogTitle>
                        <DialogDescription>
                            {isEdit ? "Edit " : "Add "} the following news post for the league.
                        </DialogDescription>
                    </DialogHeader>
                    <Separator />
                    <NewsLeagueForm
                        leagueId={leagueId}
                        isEdit={isEdit}
                        onSave={handleSave}
                    />
                </DialogContent>
            </DialogPortal>
        </Dialog>
    );
};

export default AddEditNewsLeagueDialog;