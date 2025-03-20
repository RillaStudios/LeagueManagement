'use client';

import Container from "@/lib/components/layout/container";
import Row from "@/lib/components/layout/row";
import { useDialog } from "@/lib/components/providers/dialog_provider";
import { Button } from "@/lib/components/shadcn/button";
import AddEditDivisionDialog from "../../dialogs/league/division/add_division";

interface LeagueActionRowProps {
    leagueId: number;
}

const LeagueActionRow: React.FC<LeagueActionRowProps> = ({ leagueId }) => {

    const { openDialog, dialogState } = useDialog();

    return (
        <Container padding="p-4">
            <Row gap="4" mainAxisAlign="end">
                <Button onClick={() => {
                    openDialog("addDivision");
                }}>Add Division</Button>
                <Button onClick={() => {
                    openDialog("editDivision");
                }}>Add Conference</Button>
                <Button variant={"destructive"} onClick={() => {
                    openDialog("deleteLeague");
                }}>Delete League</Button>
            </Row>
            {(dialogState['addDivision'] || dialogState['editDivision']) && (
                <AddEditDivisionDialog
                    leagueId={leagueId}
                    isEdit={dialogState['editDivision']}
                />
            )}
        </Container>
    );

};

export default LeagueActionRow;