'use client';

import Column from "../../layout/column";
import Container from "../../layout/container";
import { useEffect, useState } from "react";
import { getLeague } from "@/lib/service/league/league_service";
import { League } from "@/lib/types/league/league";
import LeagueSelector from "../other/league_selector";
import { Team } from "@/lib/types/league/team";
import { getAllUserTeams, getTeams } from "@/lib/service/league/team_service";
import { useAuth } from "@/lib/hooks/useAuth";
import { TeamCard } from "../cards/team/team_card";

interface TeamListProps {
    accountTeams: boolean;
    alignList?: 'center' | 'start' | 'end';
    cardWidth?: string;
}

/* 
A list of teams for the user.

@Author: IFD
@Date: 2025-04-01
*/
const TeamList: React.FC<TeamListProps> = ({ accountTeams, alignList = "center", cardWidth }) => {

    const [league, setLeague] = useState<League>();
    const [leagueId, setLeagueId] = useState<number | null>(null);
    const { accessToken } = useAuth();

    const [teams, setTeams] = useState<Team[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchTeams = async () => {
            if (leagueId === null && !accountTeams) return;

            setLoading(true);
            try {
                const response = accountTeams
                    ? await getAllUserTeams(accessToken!)
                    : await getTeams(leagueId!);
                setTeams(response || []);
            } catch (error) {
                console.error("Failed to fetch teams:", error);
                setTeams([]);
            } finally {
                setLoading(false);
            }
        };

        fetchTeams();
    }, [leagueId, accountTeams]);


    const handleLeagueChange = (leagueId: string) => {
        setLeagueId(parseInt(leagueId));

    };

    useEffect(() => {
        const fetchStats = async () => {
            if (leagueId === null) return;

            try {
                const league = await getLeague(leagueId);
                setLeague(league!);
            } catch (error) {
                console.error("Failed to fetch stats:", error);
            }
        }

        fetchStats();
    }, [leagueId]);

    return (
        <>
            {!accountTeams && (
                <>
                    <div className="w-1/2 mt-4">
                        <LeagueSelector onLeagueChange={handleLeagueChange} />
                    </div>
                    <div className="my-8"></div>
                </>
            )}
            <Container
                className={`flex ${alignList === 'center' ? 'justify-center' : alignList === 'start' ? 'justify-start' : 'justify-end'}`}
            >
                <Column
                    gap="4"
                    crossAxisAlign={accountTeams ? "start" : "center"}
                    mainAxisAlign={accountTeams ? "start" : "center"}
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

export default TeamList;