'use client';

import Column from "../../layout/column";
import Container from "../../layout/container";
import { useEffect, useState } from "react";
import { Team } from "@/lib/types/league/team";
import { getTeams } from "@/lib/service/league/team_service";
import { TeamCard } from "../cards/team/team_card";
import { League } from "@/lib/types/league/league";

interface TeamListProps {
    accountTeams: boolean;
    alignList?: 'center' | 'start' | 'end';
    cardWidth?: string;
    league: League;
}

/* 
A list of teams for the user.

@Author: IFD
@Date: 2025-04-01
*/
const TeamListByLeague: React.FC<TeamListProps> = ({ alignList = "center", cardWidth, league }) => {

    const [teams, setTeams] = useState<Team[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchTeams = async () => {

            setLoading(true);
            try {
                const response =
                    await getTeams(league.id);
                setTeams(response || []);
            } catch (error) {
                console.error("Failed to fetch teams:", error);
                setTeams([]);
            } finally {
                setLoading(false);
            }
        };

        fetchTeams();
    }, []);

    return (
        <>
            <Container
                className={`flex ${alignList === 'center' ? 'justify-center' : alignList === 'start' ? 'justify-start' : 'justify-end'}`}
            >
                <Column
                    gap="4"
                    crossAxisAlign={"center"}
                    mainAxisAlign={"center"}
                    width={cardWidth ? cardWidth : "full md:w-3/4 lg:w-2/5"}
                >
                    {loading && <p>Loading teams...</p>}
                    {teams === null && <p>No teams found</p>}
                    {teams && teams.length === 0 && <p>No teams found</p>}
                    {teams && teams.map((team, index) => (
                        <TeamCard key={index} team={team} leagueOwnerId={league?.createdBy} onEdit={() => { }} onDelete={() => { }} />
                    ))}
                </Column>
            </Container>
        </>
    );
}

export default TeamListByLeague;