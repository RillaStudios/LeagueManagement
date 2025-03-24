'use client';

import Container from "@/lib/components/layout/container";
import Row from "@/lib/components/layout/row";
import { useDialog } from "@/lib/components/providers/dialog_provider";
import { Button } from "@/lib/components/shadcn/button";
import AddEditDivisionDialog from "../../dialogs/league/division/add_division";
import AddEditConferenceDialog from "../../dialogs/league/conference/add_conference";
import AddEditTeamDialog from "../../dialogs/league/team/add_team";

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
                    openDialog("addConference");
                }}>Add Conference</Button>
                <Button onClick={() => {
                    openDialog("addTeam");
                }}>Add Team</Button>
                <Button variant={"destructive"} onClick={() => {
                    openDialog("deleteLeague");
                }}>Delete League</Button>
            </Row>
            {(dialogState['addDivision'] &&
                <AddEditDivisionDialog
                    leagueId={leagueId}
                />)}
            {(dialogState['addConference'] &&
                <AddEditConferenceDialog
                    leagueId={leagueId}
                />)}
            {(dialogState['addTeam'] &&
                <AddEditTeamDialog
                    leagueId={leagueId}
                />)}
        </Container>
    );

};

export default LeagueActionRow;