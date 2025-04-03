'use client'

import { VenueCard } from "./venue_card";
import { useDialog } from "@/lib/components/providers/dialog_provider";
import React, { useEffect, useState } from "react";
import { Venue } from "@/lib/types/league/venue";
import AddEditVenueDialog from "../../dialogs/league/venue/add_venue";
import { deleteVenue, getVenues } from "@/lib/service/league/venue_service";
import { toast } from "@/hooks/use-toast";
import { BodySmall } from "@/lib/components/layout/typography";
import { useAuth } from "@/lib/hooks/useAuth";

interface VenueCardListProps {
    leagueId: number;
}

const VenueCardList: React.FC<VenueCardListProps> = ({ leagueId }) => {
    const { dialogState, openDialog, closeDialog } = useDialog();
    const [venues, setVenues] = useState<Venue[]>([]);
    const [activeVenueId, setActiveVenueId] = useState<number | null>(null);
    const { accessToken } = useAuth();


    const fetchVenues = async () => {
        await getVenues(leagueId).then((response) => {
            setVenues(response); // Set the venues in the state
        }).catch((error) => {
            toast({
                title: "Error",
                description: `Failed to fetch venues: ${error.message}`,
                variant: "destructive",
                duration: 2000,
            });
        });
    };

    useEffect(() => {
        fetchVenues();
    }, [leagueId]);


    const handleEdit = (venueId: number) => {
        setActiveVenueId(venueId); // Set the active division ID
        openDialog("editVenue"); // Open the dialog
    };

    const handleDelete = (venueId: number) => {
        const venue = venues.find((venue) => venueId === venueId);

        if (venue) {
            deleteVenue(venue.leagueId, venueId, accessToken!).then(() => {
                toast({
                    title: "Success",
                    description: `Venue deleted successfully.`,
                    variant: "default",
                    duration: 2000,
                });

                // Remove the venue from the list
                setVenues(venues.filter((venue) => venue.venueId !== venueId));

            }).catch(() => {
                toast({
                    title: "Error",
                    description: `Failed to delete venue: It is possible teams or divisions are still assigned to this venue.`,
                    variant: "destructive",
                    duration: 2000,
                });
            }); // Delete the division
        }
    };

    const handleUpdate = (updatedVenue: Venue) => {
        // Update the division in the list
        setVenues(venues.map((venue) =>
            venue.venueId === updatedVenue.venueId ? updatedVenue : venue
        ));

        closeDialog("editVenue"); // Close the dialog
    };

    return (
        <>
            {
                venues.length === 0 ? (
                    <BodySmall text="No venues found." />
                ) : (
                    venues.map((venue: Venue) => (
                        <React.Fragment key={venue.venueId}>
                            <VenueCard
                                venue={venue}
                                onDelete={() => handleDelete(venue.venueId)} // Handle delete
                                onEdit={() => handleEdit(venue.venueId)} // Pass the division ID to handleEdit
                            />
                            {dialogState['editVenue'] && activeVenueId === venue.venueId && (
                                <AddEditVenueDialog
                                    leagueId={venue.leagueId}
                                    venueId={venue.venueId}
                                    isEdit={true}
                                    onSave={handleUpdate} // Pass the update handler to the dialog
                                />
                            )}
                        </React.Fragment>
                    ))
                )
            }
        </>
    );
}

export default VenueCardList;