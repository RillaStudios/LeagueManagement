'use client';

import { useEffect, useState } from "react";
import { User } from "@/lib/types/user";
import { useAuth } from "./useAuth";
import { getUserData } from "../service/user_service";

/* 
A custom hook to fetch user data from the API

Returns:
- user: The user data if the user is authenticated, otherwise null
- loading: A boolean indicating whether the user data is being fetched

@Author: IFD
@Since: 2025-02-27
*/
export function useUserData() {

    // Get authentication state
    const { isAuthenticated, accessToken } = useAuth();

    // State to store user data and loading status
    const [user, setUser] = useState<User | null>(null);

    // State to store loading status
    const [loading, setLoading] = useState(true);

    // Fetch user data when the authentication state changes
    useEffect(() => {

        // If the user is authenticated, fetch user data
        if (isAuthenticated) {

            // Set loading status to true
            setLoading(true);

            //Get user data from the API
            getUserData(accessToken!)

                // Set the user data
                .then(setUser)

                // Handle errors
                .catch((error) => {
                    console.error("Failed to fetch user data:", error);
                    setUser(null);
                })

                // Set loading status to false
                .finally(() => setLoading(false));
        } else {

            // If the user is not authenticated, set the user data to null
            setUser(null);

            // Set loading status to false
            setLoading(false);
        }
    }, [isAuthenticated, accessToken]);

    // Return the user data and loading status
    return { user, loading };
}