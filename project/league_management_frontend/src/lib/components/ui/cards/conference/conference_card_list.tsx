'use client'

import { useDialog } from "@/lib/components/providers/dialog_provider";
import React, { useEffect, useState } from "react";
import { Conference } from "@/lib/types/league/conference";
import AddEditConferenceDialog from "../../dialogs/league/conference/add_conference";
import { deleteConference, getConferences } from "@/lib/service/league/conference_service";
import { ConferenceCard } from "./conference_card";
import { toast } from "@/hooks/use-toast";
import { BodySmall } from "@/lib/components/layout/typography";
import { Button } from "@/lib/components/shadcn/button";
import { useAuth } from "@/lib/hooks/useAuth";

interface ConferenceCardListProps {
    leagueId: number;
}

const ConferenceCardList: React.FC<ConferenceCardListProps> = ({ leagueId }) => {
    const { dialogState, openDialog, closeDialog } = useDialog();
    const [conferences, setConferences] = useState<Conference[]>([]);
    const [activeConferenceId, setActiveConferenceId] = useState<number | null>(null);

    const { accessToken } = useAuth();

    // Add local state for add dialog
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

    const fetchConferences = async () => {
        try {
            const response = await getConferences(leagueId);
            setConferences(response);
        } catch (error: any) {
            toast({
                title: "Error",
                description: `Failed to fetch conferences: ${error.message}`,
                variant: "destructive",
                duration: 2000,
            });
        }
    };

    useEffect(() => {
        fetchConferences();
    }, [leagueId]);

    const handleEdit = (conferenceId: number) => {
        setActiveConferenceId(conferenceId);
        openDialog("editConference");
    };

    const handleDelete = (conferenceId: number) => {

        const conference = conferences.find((conf) => conf.id === conferenceId);

        if (conference) {
            deleteConference(conference.leagueId, conferenceId, accessToken!).then(() => {
                setConferences(conferences.filter((conf) => conf.id !== conferenceId));
            }).catch(() => {
                toast({
                    title: "Error",
                    description: `Failed to delete conference: It is possible teams or divisions are still assigned to this conference.`,
                    variant: "destructive",
                    duration: 2000,
                });
            },
            );
        }

    };

    const handleUpdate = (updatedConference: Conference) => {
        setConferences((prevConferences) => {
            const confExists = prevConferences.some((conf) => conf.id === updatedConference.id);
            if (confExists) {
                return prevConferences.map((conf) =>
                    conf.id === updatedConference.id ? updatedConference : conf
                );
            } else {
                return [...prevConferences, updatedConference];
            }
        });

        // Close dialogs based on which one is open
        if (dialogState['editConference']) {
            closeDialog('editConference');
        }
        // Use local state for add dialog
        if (isAddDialogOpen) {
            setIsAddDialogOpen(false);
        }
    };

    return (
        <>
            <Button onClick={() => setIsAddDialogOpen(true)}>
                Add Conference
            </Button>

            {isAddDialogOpen && (
                <AddEditConferenceDialog
                    leagueId={leagueId}
                    isEdit={false}
                    onSave={handleUpdate}
                    onClose={() => setIsAddDialogOpen(false)} // Add this prop
                />
            )}

            {conferences.length === 0 ? (
                <BodySmall text="No conferences found." />
            ) : (
                conferences.map((conference: Conference) => (
                    <React.Fragment key={conference.id}>
                        <ConferenceCard
                            conference={conference}
                            onDelete={() => handleDelete(conference.id)}
                            onEdit={() => handleEdit(conference.id)}
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
            )}
        </>
    );
}

export default ConferenceCardList;