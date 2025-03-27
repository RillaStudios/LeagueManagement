import { NextRequest } from "next/server";

// The API URL
const API_URL = process.env.NEXT_PUBLIC_API_URL;

/* 
A function to refresh the access token using the refresh token,
and return a new access token if the refresh is successful.

Returns:
- The new access token if the refresh is successful, otherwise null

@Author: IFD
@Since: 2025-02-27
*/
export async function attemptRefresh(setAccessToken: (token: string | null) => void) {

    const res = await fetch(`${API_URL}/refresh-token`, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        credentials: "include",
    });

    if (res.status === 204) return;

    // Parse response JSON
    const data = await res.json();

    if (!res.ok) {

        setAccessToken(null);

    }

    setAccessToken(data.accessToken);

}

/* 
A function to login a user

Parameters:
- email: string
- password: string
- setAccessToken: (token: string | null) => void
- closeAuthForm: () => void

Returns:
 - Promise<void>

 @Author: IFD
 @Since: 2025-02-28
*/
export async function login(
    email: string,
    password: string,
    setAccessToken: (token: string | null) => void,
    closeAuthForm: () => void
) {

    // Fetch the access token
    const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password }),
        credentials: "include",
    });

    // Parse response JSON
    const data = await res.json();

    if (!res.ok) {

        throw new Error(data.error || "An unknown error occurred");

    }

    // Set the access token
    setAccessToken(data.accessToken);

    // Close auth form only if login was successful
    if (data.accessToken) closeAuthForm();

}



/* 
A function to logout a user

Parameters:
- setAccessToken: (token: string | null) => void

Returns:
- Promise<void>

@Author: IFD
@Since: 2025-02-28
*/
export async function logout(setAccessToken: (token: string | null) => void) {

    const res = await fetch(`${API_URL}/logout`, {
        method: "POST",
        credentials: "include",
    });

    if (!res.ok) {

        const data = await res.json();

        throw new Error(data.error || "An unknown error occurred");

    }

    setAccessToken(null);

}

/* 
A function to register a user

Parameters:
- email: string
- password: string
- setAccessToken: (token: string | null) => void
- closeAuthForm: () => void

@Author: IFD
@Since: 2025-02-28
*/
export async function signin(
    email: string,
    password: string,
    setAccessToken: (token: string | null) => void,
    closeAuthForm: () => void
) {

    // Fetch the access token via registering a user
    const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password: password }),
        credentials: "include",
    });

    // Parse response JSON
    const data = await res.json();

    // If the response is not ok, throw an error
    if (!res.ok) {

        throw new Error(data.error || "An unknown error occurred");

    }

    // Set the access token
    setAccessToken(data.accessToken);

    // Close auth form only if registration was successful
    if (data.accessToken) closeAuthForm();

}

/* 
A method to get the authentication session

Note that this method is mainly used for middleware,
if the user has a refresh token, we can assume that 
the user is authenticated. However, just be because the
user has a refresh token, it doesn't mean that the user
is authenticated. The user could have a revoked token
or the token could have expired. So, in that case we let
the api handle refreshing the token as the layout of all
the pages will call this method to check if the user is
authenticated (attemptRefresh) method. 


Parameters:
- req: NextRequest

Returns:
- An object containing the authentication session

@Author: IFD
@Since: 2025-02-28
*/
export async function getAuthSession(req: NextRequest) {

    // Get the 'refreshToken' from cookies
    const token = req.cookies.get('refreshToken')?.value;

    // If the token is null, return null
    if (!token) {
        return null;
    }


    // Return the authentication session
    return {
        isAuthenticated: true,
    };

}
