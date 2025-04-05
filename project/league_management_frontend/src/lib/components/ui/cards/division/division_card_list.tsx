'use client'

import { Division } from "@/lib/types/league/division";
import { DivisionCard } from "./division_card";
import { useDialog } from "@/lib/components/providers/dialog_provider";
import AddEditDivisionDialog from "../../dialogs/league/division/add_division";
import React, { useEffect, useState } from "react";
import { deleteDivision, getDivisions } from "@/lib/service/league/division_service";
import { toast } from "@/hooks/use-toast";
import { BodySmall } from "@/lib/components/layout/typography";
import { Button } from "@/lib/components/shadcn/button";
import { useAuth } from "@/lib/hooks/useAuth";

interface DivisionCardListProps {
    leagueId: number;
}

/* 
A list of division cards for a given league. It fetches the 
divisions from the server and displays them in a list.

@Author: IFD
@Date: 2025-03-22
*/
const DivisionCardList: React.FC<DivisionCardListProps> = ({ leagueId }) => {

    const { dialogState, openDialog, closeDialog } = useDialog();
    const [divisions, setDivisions] = useState<Division[]>([]); // State to hold the divisions
    const [activeDivisionId, setActiveDivisionId] = useState<number | null>(null);
    const { accessToken } = useAuth(); // Get the access token from the auth context

    // Add local state for add dialog
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

    /* 
    A function to fetch divisions from the server.

    @Author: IFD
    @Date: 2025-03-22
    */
    const fetchDivisions = async () => {
        await getDivisions(leagueId).then((response) => {
            setDivisions(response); // Set the conferences in the state
        }
        ).catch((error) => {

            toast({
                title: "Error",
                description: `Failed to fetch divisions: ${error.message}`,
                variant: "destructive",
                duration: 2000,
            });

        }
        );
    };

    /* 
    A useEffect hook to fetch divisions when the
    component mounts or when the leagueId changes.

    @Author: IFD
    @Date: 2025-03-22
    */
    useEffect(() => {
        fetchDivisions();
    }, [leagueId]);

    /* 
    A function to handle editing a division.

    @Author: IFD
    @Date: 2025-03-22
    */
    const handleEdit = (divisionId: number) => {
        setActiveDivisionId(divisionId); // Set the active division ID
        openDialog("editDivision"); // Open the dialog
    };

    /* 
    A function to handle deleting a division.

    @Author: IFD
    @Date: 2025-03-22
    */
    const handleDelete = (divisionId: number) => {
        const division = divisions.find((div) => div.id === divisionId);

        if (division) {
            deleteDivision(division.leagueId, divisionId, accessToken!).then((res) => {
                // Successfully deleted the division
                toast({
                    title: "Success",
                    description: "Division deleted successfully.",
                    variant: "default",
                    duration: 2000,
                });

                // Remove the division from the list
                setDivisions(divisions.filter((division) => division.id !== divisionId));
            }).catch(() => {
                toast({
                    title: "Error",
                    description: `Failed to delete division: It is possible teams are still assigned to this division.`,
                    variant: "destructive",
                    duration: 2000,
                });
            }); // Delete the division
        }
    };

    /* 
    A function to handle updating a division.

    @Author: IFD
    @Date: 2025-03-22
    */
    const handleUpdate = (updatedDivision: Division) => {

        setDivisions((prevDivisions) => {
            const divExists = prevDivisions.some((div) => div.id === updatedDivision.id);
            if (divExists) {
                return prevDivisions.map((div) =>
                    div.id === updatedDivision.id ? updatedDivision : div
                );
            } else {
                return [...prevDivisions, updatedDivision];
            }
        });

        // Close dialogs based on which one is open
        if (dialogState['editDivision']) {
            closeDialog('editDivision');
        }
        // Use local state for add dialog
        if (isAddDialogOpen) {
            setIsAddDialogOpen(false);
        }
    };

    return (
        <>
            <Button onClick={() => setIsAddDialogOpen(true)}>
                Add Division
            </Button>

            {isAddDialogOpen && (
                <AddEditDivisionDialog
                    leagueId={leagueId}
                    isEdit={false}
                    onSave={handleUpdate} // Pass the update handler to the dialog
                    onClose={() => setIsAddDialogOpen(false)}
                />
            )}

            {divisions.length === 0 ? (
                <BodySmall text="No divisions found." />
            ) : (
                divisions.map((division: Division) => (
                    <React.Fragment key={division.id}>
                        <DivisionCard
                            division={division}
                            onDelete={() => handleDelete(division.id)} // Handle delete
                            onEdit={() => handleEdit(division.id)} // Pass the division ID to handleEdit
                        />
                        {dialogState['editDivision'] && activeDivisionId === division.id && (
                            <AddEditDivisionDialog
                                leagueId={division.leagueId}
                                divisionId={division.id}
                                isEdit={true}
                                onSave={handleUpdate} // Pass the update handler to the dialog
                            />
                        )}
                    </React.Fragment>
                ))
            )}
        </>
    );
}

export default DivisionCardList;