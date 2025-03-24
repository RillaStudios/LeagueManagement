'use client'

import { Division } from "@/lib/types/league/division";
import { DivisionCard } from "./division_card";
import { useDialog } from "@/lib/components/providers/dialog_provider";
import AddEditDivisionDialog from "../../dialogs/league/division/add_division";
import React, { useState } from "react";
import { deleteDivision } from "@/lib/service/league/division_service";

interface DivisionCardListProps {
    divisions: Division[];
}

const DivisionCardList: React.FC<DivisionCardListProps> = ({ divisions: initialDivisions }) => {
    const { dialogState, openDialog, closeDialog } = useDialog();
    const [divisions, setDivisions] = useState<Division[]>(initialDivisions);
    const [activeDivisionId, setActiveDivisionId] = useState<number | null>(null);

    const handleEdit = (divisionId: number) => {
        setActiveDivisionId(divisionId); // Set the active division ID
        openDialog("editDivision"); // Open the dialog
    };

    const handleDelete = (divisionId: number) => {
        const division = divisions.find((div) => div.id === divisionId);

        // Remove the division from the list
        setDivisions(divisions.filter((division) => division.id !== divisionId));

        if (division) {
            deleteDivision(division.leagueId, divisionId); // Delete the division
        }
    };

    const handleUpdate = (updatedDivision: Division) => {
        // Update the division in the list
        setDivisions(divisions.map((division) =>
            division.id === updatedDivision.id ? updatedDivision : division
        ));

        closeDialog("editDivision"); // Close the dialog
    };

    return (
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
    );
}

export default DivisionCardList;