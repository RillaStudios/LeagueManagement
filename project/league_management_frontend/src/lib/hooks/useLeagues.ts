'use client';

import { useEffect, useState } from "react";
import { League } from "../types/league/league";
import { getAllLeagues, getAllUserLeagues } from "../service/league_service";
import { useAuth } from "./useAuth";

/* 
A hook to fetch all leagues from the API

Returns:
- leagues: The leagues data if the leagues are fetched, otherwise null
- loading: A boolean indicating whether the leagues data is being fetched

@Author: IFD
@Since: 2025-02-27
*/
export function useLeagues() {

    // State to store user data and loading status
    const [leagues, setLeagues] = useState<League[] | null>(null);

    // State to store loading status
    const [loading, setLoading] = useState(true);

    // Fetch user data when the authentication state changes
    useEffect(() => {

        const fetchLeagues = async () => {
            // Set loading status to true
            setLoading(true);

            //Get user data from the API
            getAllLeagues()
                // Set the user data
                .then(function (leagues) {
                    console.log("Fetched leagues data:", leagues);

                    return setLeagues(leagues);
                })
                // Handle errors
                .catch((error) => {
                    console.error("Failed to fetch leagues data:", error);
                    setLeagues(null);
                })
                // Set loading status to false
                .finally(() => setLoading(false));
        };

        // Call the fetchLeagues function
        fetchLeagues();
    }, []);

    // Return the user data and loading status
    return { leagues, loading };
}

/* 
A hook to fetch user owned leagues from the API

Returns:
- leagues: The leagues data if the leagues are fetched, otherwise null
- loading: A boolean indicating whether the leagues data is being fetched

@Author: IFD
@Since: 2025-02-27
*/
export function useUserLeagues() {

    // State to store user data and loading status
    const [leagues, setLeagues] = useState<League[] | null>(null);

    // State to store loading status
    const [loading, setLoading] = useState(true);

    const { accessToken } = useAuth();

    // Fetch user data when the authentication state changes
    useEffect(() => {
        if (!accessToken) {
            return;
        }

        const fetchLeagues = async () => {
            // Set loading status to true
            setLoading(true);

            //Get user data from the API
            getAllUserLeagues(accessToken!)
                // Set the user data
                .then(function (leagues) {
                    return setLeagues(leagues);
                })
                // Handle errors
                .catch(() => {
                    setLeagues(null);
                })
                // Set loading status to false
                .finally(() => setLoading(false));
        };

        // Call the fetchLeagues function
        fetchLeagues();
    }, []);

    // Return the user data and loading status
    return { leagues, loading };
}