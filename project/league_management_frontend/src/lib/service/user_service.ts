import { User } from "@/lib/types/user";

// The URL of the API
const API_URL = process.env.NEXT_PUBLIC_API_URL;

/* 
A function that sends a request to the server to get user data

Parameters:
- accessToken: string - token for user authentication

Returns:
- Promise<User> - user data

Throws:
- Error - if the server returns an error

@Author: IFD
@Since: 2025-02-25
*/
export async function getUserData(accessToken: string): Promise<User> {

    // Send a request to the server to get user data
    const res = await fetch(`${API_URL}/account/`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        credentials: "include",
        cache: "no-store",
    });

    // Check if the server returned an error
    if (!res.ok) {

        // If an error occurred, output the error to the console
        const errorText = await res.text();
        console.warn("Failed to get user data:", res.status, errorText);

        if (errorText) {

            const error = JSON.parse(errorText);

            throw new Error(error.error);
        }

        throw new Error(`HTTP error. Status: ${res.status}`);

    }

    // Return the user data
    return res.json() as Promise<User>;
}

/* 
A function that sends a request to the 
server to change the user's password

@Author: IFD
@Since: 2025-02-25
*/
export async function changePassword(accessToken: string, oldPassword: string, newPassword: string, confirmNewPassword: string,): Promise<void> {

    // Send a request to the server to change the user's password
    const res = await fetch(`${API_URL}/account/change-password`, {
        method: "PATCH",
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        credentials: "include",
        cache: "no-store",
        body: JSON.stringify({
            currentPassword: oldPassword,
            newPassword: newPassword,
            confirmationPassword: newPassword
        }),
    });

    // Check if the server returned an error
    if (!res.ok) {

        // If an error occurred, output the error to the console
        const errorText = await res.text();
        console.warn("Failed to change password:", res.status, errorText);

        if (errorText) {

            const error = JSON.parse(errorText);

            throw new Error(error.error);
        }

        throw new Error(`HTTP error. Status: ${res.status}`);

    }

}

/* 
A function that sends a request to the
server to update user data

@Author: IFD
@Since: 2025-02-25
*/
export async function updateUserData(accessToken: string, data: Partial<User>): Promise<void> {

    // Send a request to the server to update user data
    const res = await fetch(`${API_URL}/account/`, {
        method: "PATCH",
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        credentials: "include",
        cache: "no-store",
        body: JSON.stringify({ firstName: data.firstName, lastName: data.lastName }),
    });

    // Check if the server returned an error
    if (!res.ok) {

        // If an error occurred, output the error to the console
        const errorText = await res.text();
        console.warn("Failed to update user data:", res.status, errorText);

        if (errorText) {

            const error = JSON.parse(errorText);

            throw new Error(error.error);
        }

        throw new Error(`HTTP error. Status: ${res.status}`);

    }
}

export async function getAllUsers(): Promise<User[]> {

    const res = await fetch(`${API_URL}/account/users`, {
        method: "GET",
        credentials: "include",
        cache: "no-store",
    });

    if (!res.ok) {

        const errorText = await res.text();
        console.warn("Failed to get all users:", res.status, errorText);

        if (errorText) {

            const error = JSON.parse(errorText);

            throw new Error(error.error);
        }

        throw new Error(`HTTP error. Status: ${res.status}`);

    }

    const text = await res.text();

    const users: User[] = text ? JSON.parse(text) : [];

    console.log(users);

    return users;
}
