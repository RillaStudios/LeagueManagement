'use client';

import React from "react";
import { Separator } from "@/lib/components/shadcn/separator";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogOverlay, DialogPortal, DialogTitle } from "@/lib/components/shadcn/dialog";
import { useDialog } from "@/lib/components/providers/dialog_provider";
import GameResultForm from "./game_result_form";
import { Team } from "@/lib/types/league/team";
import { GameStats } from "@/lib/types/league/game_stats";

interface GameResultDialogProps {
    leagueId: number;
    gameId?: number;
    seasonId?: number;
    homeTeam: Team;
    awayTeam: Team;
    gameStats: GameStats[]; // Optional game stats prop
    onSave?: (updatedGameStats: GameStats[]) => void;
}

/* 
A dialog component for adding or editing game results.

@Author: IFD
@Date: 2025-04-01
*/
const AddEditGameResultDialog: React.FC<GameResultDialogProps> = ({ leagueId, gameId, seasonId, homeTeam, awayTeam, gameStats, onSave }) => {
    const { dialogState, closeDialog } = useDialog();
    const isOpen = dialogState[`editGameScore-${gameId}`];

    const handleSave = (updatedGameStats: GameStats[]) => {
        if (onSave) {
            onSave(updatedGameStats); // Call the onSave callback
        }
        closeDialog(`editGameScore-${gameId}`); // Close the dialog
    };

    return (
        <Dialog open={isOpen} onOpenChange={() => closeDialog(`editGameScore-${gameId}`)}>
            <DialogPortal>
                <DialogOverlay onClick={() => closeDialog(`editGameScore-${gameId}`)} className="fixed inset-0 bg-black/30 backdrop-blur-none" />
                <DialogContent onFocusOutside={() => closeDialog(`editGameScore-${gameId}`)} className="w-full max-w-[300px] md:max-w-[500px] bg-popover">
                    <DialogHeader>
                        <DialogTitle>{"Edit Game Results"}</DialogTitle>
                        <DialogDescription>
                            Add the following info for the game results.
                        </DialogDescription>
                    </DialogHeader>
                    <Separator />
                    <GameResultForm
                        leagueId={leagueId}
                        gameStats={gameStats}
                        gameId={gameId}
                        seasonId={seasonId}
                        homeTeam={homeTeam}
                        awayTeam={awayTeam}
                        onSave={handleSave}
                    />
                </DialogContent>
            </DialogPortal>
        </Dialog>
    );
};

export default AddEditGameResultDialog;