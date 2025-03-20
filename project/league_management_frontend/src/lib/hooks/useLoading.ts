import { useEffect, useState } from "react";

/* 
A hook that returns a boolean value and 
a function to set the value. This is useful
for displaying a loading spinner while data
is being fetched.

@Author: IFD
@Since: 2025-03-01
*/
export default function useLoading() {

    // Create a state variable to store the loading state
    const [loading, setLoading] = useState<boolean>(true);

    // When the loading state changes, set the loading state to false
    useEffect(() => {
        setLoading(false);

    }, [loading, setLoading]);

    // Return the loading state and the function to set the loading state
    return { loading, setLoading };
}