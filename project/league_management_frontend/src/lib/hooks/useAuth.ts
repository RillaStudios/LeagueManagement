import { useContext } from "react";
import { AuthContext } from "../components/providers/auth_provider";

/* 
A custom hook that returns the current value of the AuthContext.

@Author: IFD
@Since: 2025-03-01
*/
export function useAuth() {

    // Get the current value of the AuthContext
    const context = useContext(AuthContext);

    // If the context is null, throw an error
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    // Return the context
    return context;
}
