/* 
A type for the AuthContext. This is the context that will be used to manage the authentication state of the application.

@Author: IFD
@Date: 2025-03-26
*/
export default interface AuthContextType {
    accessToken: string | null;
    login: (email: string, password: string) => Promise<void>;
    signup: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    isAuthenticated: boolean;
    formOpen: boolean;
    defaultTab: "login" | "register";
    openAuthForm: (tab?: "login" | "register") => void;
    closeAuthForm: () => void;
}