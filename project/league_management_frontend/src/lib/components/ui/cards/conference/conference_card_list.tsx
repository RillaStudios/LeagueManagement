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

/* 
A list of conference cards for a given league. It fetches the conferences from the server and displays them in a list.
It also handles adding, editing, and deleting conferences.

@Author: IFD
@Date: 2025-03-22
*/
const ConferenceCardList: React.FC<ConferenceCardListProps> = ({ leagueId }) => {
    const { dialogState, openDialog, closeDialog } = useDialog();
    const [conferences, setConferences] = useState<Conference[]>([]);
    const [activeConferenceId, setActiveConferenceId] = useState<number | null>(null);

    const { accessToken } = useAuth();

    // Add local state for add dialog
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

    /* 
    A function to fetch conferences from the server. 
    It uses the leagueId prop to get the conferences for the given league.

    @Author: IFD
    @Date: 2025-03-22
    */
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

    /* 
    A useEffect hook to fetch conferences when the 
    component mounts or when the leagueId changes.
    
    @Author: IFD
    @Date: 2025-03-22
    */
    useEffect(() => {
        fetchConferences();
    }, [leagueId]);

    /* 
    A function to handle editing a conference.

    It sets the active conference id and opens the edit conference dialog.

    @Author: IFD
    @Date: 2025-03-22
    */
    const handleEdit = (conferenceId: number) => {
        setActiveConferenceId(conferenceId);
        openDialog("editConference");
    };

    /* 
    A function to handle deleting a conference.

    @Author: IFD
    @Date: 2025-03-22
    */
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

    /* 
    A function to handle updating a conference.

    @Author: IFD
    @Date: 2025-03-22
    */
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