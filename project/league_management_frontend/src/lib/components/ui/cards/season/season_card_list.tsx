'use client'

import { useDialog } from "@/lib/components/providers/dialog_provider";
import AddEditDivisionDialog from "../../dialogs/league/division/add_division";
import React, { useState } from "react";
import { Season } from "@/lib/types/league/season";
import { deleteSeason } from "@/lib/service/league/season_service";
import { SeasonCard } from "./season_card";
import AddEditSeasonDialog from "../../dialogs/league/season/add_season";

interface SeasonCardListProps {
    seasons: Season[];
}

const SeasonCardList: React.FC<SeasonCardListProps> = ({ seasons: initialSeasons }) => {
    const { dialogState, openDialog, closeDialog } = useDialog();
    const [seasons, setSeasons] = useState<Season[]>(initialSeasons);
    const [activeSeasonId, setActiveSeasonId] = useState<number | null>(null);

    const handleEdit = (seasonId: number) => {
        setActiveSeasonId(seasonId); // Set the active division ID
        openDialog("editSeason"); // Open the dialog
    };

    const handleDelete = (seasonId: number) => {
        const season = seasons.find((season) => season.id === seasonId);

        // Remove the division from the list
        setSeasons(seasons.filter((season) => season.id !== seasonId));

        if (season) {
            deleteSeason(season.leagueId, seasonId); // Delete the division
        }
    };

    const handleUpdate = (updatedSeason: Season) => {
        // Update the division in the list
        setSeasons(seasons.map((season) =>
            season.id === updatedSeason.id ? updatedSeason : season
        ));

        closeDialog("editSeason"); // Close the dialog
    };

    return (
        seasons.map((season: Season) => (
            <React.Fragment key={season.id}>
                <SeasonCard
                    season={season}
                    onDelete={() => handleDelete(season.id)} // Handle delete
                    onEdit={() => handleEdit(season.id)} // Pass the division ID to handleEdit
                />
                {dialogState['editSeason'] && activeSeasonId === season.id && (
                    <AddEditSeasonDialog
                        leagueId={season.leagueId}
                        seasonId={season.id}
                        isEdit={true}
                        onSave={handleUpdate} // Pass the update handler to the dialog
                    />
                )}
            </React.Fragment>
        ))
    );
}

export default SeasonCardList;