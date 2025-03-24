'use client'

import { useDialog } from "@/lib/components/providers/dialog_provider";
import React, { useState } from "react";
import { Conference } from "@/lib/types/league/conference";
import AddEditConferenceDialog from "../../dialogs/league/conference/add_conference";
import { deleteConference } from "@/lib/service/league/conference_service";
import { ConferenceCard } from "./conference_card";

interface ConferenceCardListProps {
    conferences: Conference[];
}

const ConferenceCardList: React.FC<ConferenceCardListProps> = ({ conferences: initialConferences }) => {
    const { dialogState, openDialog, closeDialog } = useDialog();
    const [conferences, setConferences] = useState<Conference[]>(initialConferences);
    const [activeConferenceId, setActiveConferenceId] = useState<number | null>(null);

    const handleEdit = (conferenceId: number) => {
        setActiveConferenceId(conferenceId); // Set the active conference ID
        openDialog("editConference"); // Open the dialog
    };

    const handleDelete = (conferenceId: number) => {
        const conference = conferences.find((conf) => conf.id === conferenceId);

        // Remove the conference from the list
        setConferences(conferences.filter((conf) => conf.id !== conferenceId));

        if (conference) {
            deleteConference(conference.leagueId, conferenceId); // Delete the conference
        }
    };

    const handleUpdate = (updatedConference: Conference) => {
        // Update the conference in the list
        setConferences(conferences.map((conference) =>
            conference.id === updatedConference.id ? updatedConference : conference
        ));

        closeDialog("editConference"); // Close the dialog
    };

    return (
        conferences.map((conference: Conference) => (
            <React.Fragment key={conference.id}>
                <ConferenceCard
                    conference={conference}
                    onDelete={() => handleDelete(conference.id)} // Handle delete
                    onEdit={() => handleEdit(conference.id)} // Pass the conference ID to handleEdit
                />
                {dialogState['editConference'] && activeConferenceId === conference.id && (
                    <AddEditConferenceDialog
                        leagueId={conference.leagueId}
                        conferenceId={conference.id}
                        isEdit={true}
                        onSave={handleUpdate}
                    />
                )}
            </React.Fragment>
        ))
    );
}

export default ConferenceCardList;