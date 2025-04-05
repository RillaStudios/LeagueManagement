'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../shadcn/card";
import { Button } from "../../../shadcn/button";
import { Team } from "@/lib/types/league/team";
import { useUserData } from "@/lib/hooks/useUserData";
import { useEffect, useState } from "react";
import { getLeague } from "@/lib/service/league/league_service";
import { redirect } from "next/navigation";

/* 
A component that displays a card for a team in a league.

@Author: IFD
@Date: 2025-03-22
*/
export function TeamCard({ team, onDelete, onEdit, leagueOwnerId, disableActions }: { team: Team, onDelete?: () => void, onEdit?: () => void, leagueOwnerId?: number, disableActions?: boolean }) {

    const [leagueOwnerIdState, setLeagueOwnerIdState] = useState<number>(leagueOwnerId || 0);

    const { user } = useUserData();

    useEffect(() => {

        const handleLeagueOwnerId = async (team: Team): Promise<number> => {
            if (team.leagueId) {
                const leagueData = await getLeague(team.leagueId);

                if (!leagueData) {
                    return 0;
                }

                return leagueData.createdBy;
            }
            return 0;
        }

        const fetchLeagueOwnerId = async () => {
            const leagueOwnerId = await handleLeagueOwnerId(team);
            setLeagueOwnerIdState(leagueOwnerId);
        };

        fetchLeagueOwnerId().catch((error) => {
        });

    }, [user]);

    return (
        <Card className="w-full mb-4">
            <CardHeader>
                <CardTitle>{team.teamName}</CardTitle>
                <CardDescription>ID: #{team.teamId}</CardDescription>
            </CardHeader>
            <CardContent>
                <div>Location: {team.location ? (typeof team.location === 'string' ? team.location : team.location) : "N/A"}</div>
                <div>Conference: {team.conferenceName ? (typeof team.conferenceName === 'string' ? team.conferenceName : team.conferenceName) : "N/A"}</div>
                <div>Division: {team.divisionName ? (typeof team.divisionName === 'string' ? team.divisionName : team.divisionName) : "N/A"}</div>
                <div>Owner: {team.teamOwnerName ? (typeof team.teamOwnerName === 'string' ? team.teamOwnerName : team.teamOwnerName) : "N/A"}</div>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button variant={"default"} onClick={() => redirect(`/teams/${team.teamId}`)}>View Team</Button>
                {(user && !disableActions) && (
                    <>
                        <div>
                            {(user.id === team.ownerId || user.id === leagueOwnerIdState) && (
                                <div className="gap-4 flex">
                                    <Button variant={"default"} onClick={() => onEdit!()}>Edit</Button>
                                    <Button variant={"default"} onClick={() => {
                                        redirect(`/account/teams/${team.teamId}/news`);
                                    }}>Manage News</Button>
                                </div>
                            )}
                        </div>
                        <div>
                            {user.id === leagueOwnerIdState && (
                                <Button variant="destructive" onClick={() => onDelete!()}>Delete</Button>
                            )}
                        </div>
                    </>
                )}
            </CardFooter>
        </Card>
    );
}