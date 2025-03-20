'use client';

import { createContext, useState, useEffect } from "react";
import useLoading from "@/lib/hooks/useLoading";
import AuthForm from "@/lib/components/ui/dialogs/auth/auth_form";
import AuthContextType from "@/lib/types/contexts/auth_context";
import { attemptRefresh, login, logout, signin } from "@/lib/service/auth_service";

// The authentication context
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

/* 
A provider that provides authentication functionality to its children

@param children: the children of the provider

@Author: IFD
@Since: 2025-03-06
*/
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    // The loading state
    const { loading, setLoading } = useLoading();

    // The access token state
    const [accessToken, setAccessToken] = useState<string | null>(null);

    // The form open state
    const [formOpen, setOpen] = useState(false);

    // The default tab state
    const [defaultTab, setDefaultTab] = useState<"login" | "register">("login");

    // Refresh the access token on mount
    // This is done to check if the user is still authenticated
    useEffect(() => {

        // A function to refresh the access token
        const refresh = async () => {
            try {

                // Set the loading state to true
                setLoading(true);

                // Attempt to refresh the access token
                await attemptRefresh(setAccessToken);

            } finally {

                // Set the loading state to false
                setLoading(false);

            }
        };

        // Call the refresh function
        refresh();

    }, []);

    // A function to open the authentication form
    const openAuthForm = (tab: "login" | "register" = "login") => {
        setDefaultTab(tab);
        setOpen(true);
    };

    // A function to close the authentication form
    const closeAuthForm = () => setOpen(false);

    // Return the provider
    return (
        <AuthContext.Provider value={{
            accessToken,
            login: async (email, password) => await login(email, password, setAccessToken, closeAuthForm),
            signup: async (email, password) => await signin(email, password, setAccessToken, closeAuthForm),
            logout: () => logout(setAccessToken),
            isAuthenticated: accessToken !== null,
            defaultTab,
            openAuthForm,
            closeAuthForm,
            formOpen
        }}>
            {!loading && children}
            <AuthForm />
        </AuthContext.Provider>
    );
};
