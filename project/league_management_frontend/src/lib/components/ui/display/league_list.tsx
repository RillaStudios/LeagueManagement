'use client';

import { useLeagues, useUserLeagues } from "@/lib/hooks/useLeagues";
import LeagueCard from "../cards/league_card";
import Column from "../../layout/column";
import Container from "../../layout/container";

interface LeagueListProps {
    accountLeagues: boolean;
    alignList?: 'center' | 'start' | 'end';
    cardWidth?: string;
}

const LeagueList: React.FC<LeagueListProps> = ({ accountLeagues, alignList = "center", cardWidth }) => {

    const { leagues, loading } = accountLeagues ? useUserLeagues() : useLeagues();

    return (
        <Container
            className={`flex ${alignList === 'center' ? 'justify-center' : alignList === 'start' ? 'justify-start' : 'justify-end'}`}
        >
            <Column
                gap="4"
                crossAxisAlign={accountLeagues ? "start" : "center"}
                mainAxisAlign={accountLeagues ? "start" : "center"}
                width={cardWidth ? cardWidth : "full md:w-3/4 lg:w-2/5"}
            >
                {loading && <p>Loading leagues...</p>}
                {leagues === null && <p>No leagues found</p>}
                {leagues && leagues.length === 0 && <p>No leagues found</p>}
                {leagues && leagues.map((league, index) => (
                    <LeagueCard key={index} league={league} />
                ))}
            </Column>
        </Container>
    );
}

export default LeagueList;