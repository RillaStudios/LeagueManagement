'use client';

import { useEffect, useState } from "react";
import { League } from "../types/league/league";
import { getAllLeagues, getAllUserLeagues } from "../service/league/league_service";
import { useAuth } from "./useAuth";
import { Team } from "../types/league/team";
import { getAllUserTeams, getTeams } from "../service/league/team_service";

/* 
A hook to fetch all leagues from the API

Returns:
- leagues: The leagues data if the leagues are fetched, otherwise null
- loading: A boolean indicating whether the leagues data is being fetched

@Author: IFD
@Since: 2025-02-27
*/
export function useTeams(leagueId: number) {

    // State to store user data and loading status
    const [teams, setTeams] = useState<Team[] | null>(null);

    // State to store loading status
    const [loading, setLoading] = useState(true);

    // Fetch user data when the authentication state changes
    useEffect(() => {

        const fetchTeams = async () => {
            // Set loading status to true
            setLoading(true);

            //Get user data from the API
            getTeams(leagueId)
                // Set the user data
                .then(function (teams) {

                    return setTeams(teams);
                })
                // Handle errors
                .catch((error) => {
                    console.error("Failed to fetch teams data:", error);
                    setTeams(null);
                })
                // Set loading status to false
                .finally(() => setLoading(false));
        };

        // Call the fetchLeagues function
        fetchTeams();
    }, []);

    // Return the user data and loading status
    return { teams, loading };
}

/* 
A hook to fetch user owned leagues from the API

Returns:
- leagues: The leagues data if the leagues are fetched, otherwise null
- loading: A boolean indicating whether the leagues data is being fetched

@Author: IFD
@Since: 2025-02-27
*/
export function useUserTeams() {

    // State to store user data and loading status
    const [teams, setTeams] = useState<Team[] | null>(null);

    // State to store loading status
    const [loading, setLoading] = useState(true);

    const { accessToken } = useAuth();

    // Fetch user data when the authentication state changes
    useEffect(() => {
        if (!accessToken) {
            return;
        }

        const fetchTeams = async () => {
            // Set loading status to true
            setLoading(true);

            //Get user data from the API
            getAllUserTeams(accessToken!)
                // Set the user data
                .then(function (teams) {
                    return setTeams(teams);
                })
                // Handle errors
                .catch(() => {
                    setTeams(null);
                })
                // Set loading status to false
                .finally(() => setLoading(false));
        };

        // Call the fetchLeagues function
        fetchTeams();
    }, []);

    // Return the user data and loading status
    return { teams, loading };
}