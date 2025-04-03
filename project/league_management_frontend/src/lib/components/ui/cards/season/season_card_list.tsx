'use client'

import { useDialog } from "@/lib/components/providers/dialog_provider";
import React, { useEffect, useState } from "react";
import { Season } from "@/lib/types/league/season";
import { deleteSeason, getSeasons } from "@/lib/service/league/season_service";
import { SeasonCard } from "./season_card";
import AddEditSeasonDialog from "../../dialogs/league/season/add_season";
import { toast } from "@/hooks/use-toast";
import { BodySmall } from "@/lib/components/layout/typography";
import { useAuth } from "@/lib/hooks/useAuth";

interface SeasonCardListProps {
    leagueId: number;
}

const SeasonCardList: React.FC<SeasonCardListProps> = ({ leagueId }) => {

    const { dialogState, openDialog, closeDialog } = useDialog();
    const [seasons, setSeasons] = useState<Season[]>([]); // State to hold the seasons
    const [activeSeasonId, setActiveSeasonId] = useState<number | null>(null);
    const { accessToken } = useAuth(); // Get the access token from the auth context

    const fetchSeasons = async () => {
        await getSeasons(leagueId).then((response) => {
            setSeasons(response); // Set the seasons in the state
        }).catch((error) => {

            toast({
                title: "Error",
                description: `Failed to fetch seasons: ${error.message}`,
                variant: "destructive",
                duration: 2000,
            });

        });
    };

    useEffect(() => {
        fetchSeasons();
    }, [leagueId]);

    const handleEdit = (seasonId: number) => {
        setActiveSeasonId(seasonId); // Set the active season ID
        openDialog("editSeason"); // Open the dialog
    };

    const handleDelete = (seasonId: number) => {
        const season = seasons.find((div) => div.id === seasonId);

        // Remove the season from the list
        setSeasons(seasons.filter((season) => season.id !== seasonId));

        if (season) {
            deleteSeason(leagueId, season.id, accessToken!).then(() => {
                // Successfully deleted the season
                toast({
                    title: "Success",
                    description: "Season deleted successfully.",
                    variant: "default",
                    duration: 2000,
                });
            }).catch(() => {
                toast({
                    title: "Error",
                    description: `Failed to delete season: It is possible teams or divisions are still assigned to this season.`,
                    variant: "destructive",
                    duration: 2000,
                });
            });
        }
    };

    const handleUpdate = () => {
        fetchSeasons();

        closeDialog("editSeason"); // Close the dialog
    };

    return (
        <>
            {seasons.length === 0 ? (
                <BodySmall text="No seasons found." />
            ) : (
                seasons.map((season: Season) => (
                    <React.Fragment key={season.id}>
                        <SeasonCard
                            season={season}
                            onDelete={() => handleDelete(season.id)}
                            onEdit={() => handleEdit(season.id)}
                        />
                        {dialogState['editSeason'] && activeSeasonId === season.id && (
                            <AddEditSeasonDialog
                                leagueId={season.leagueId}
                                seasonId={season.id}
                                isEdit={true}
                                onSave={handleUpdate}
                            />
                        )}
                    </React.Fragment>
                ))
            )}
        </>
    );
}

export default SeasonCardList;