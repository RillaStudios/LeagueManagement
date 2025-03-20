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