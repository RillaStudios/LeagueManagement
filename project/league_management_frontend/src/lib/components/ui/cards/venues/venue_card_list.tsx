'use client'

import { Division } from "@/lib/types/league/division";
import { VenueCard } from "./venue_card";
import { useDialog } from "@/lib/components/providers/dialog_provider";
import AddEditDivisionDialog from "../../dialogs/league/division/add_division";
import React, { useState } from "react";
import { deleteDivision } from "@/lib/service/league/division_service";
import { Venue } from "@/lib/types/league/venue";
import AddEditVenueDialog from "../../dialogs/league/venue/add_venue";
import { deleteVenue } from "@/lib/service/league/venue_service";

interface VenueCardListProps {
    venues: Venue[];
}

const VenueCardList: React.FC<VenueCardListProps> = ({ venues: initialVenues }) => {
    const { dialogState, openDialog, closeDialog } = useDialog();
    const [venues, setVenues] = useState<Venue[]>(initialVenues);
    const [activeVenueId, setActiveVenueId] = useState<number | null>(null);

    const handleEdit = (venueId: number) => {
        setActiveVenueId(venueId); // Set the active division ID
        openDialog("editVenue"); // Open the dialog
    };

    const handleDelete = (venueId: number) => {
        const venue = venues.find((venue) => venueId === venueId);

        // Remove the venue from the list
        setVenues(venues.filter((venue) => venue.venueId !== venueId));

        if (venue) {
            deleteVenue(venue.leagueId, venueId); // Delete the division
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
    );
}

export default VenueCardList;