/* 
A user object that is returned from the API.

@Author: IFD
@Date: 2025-03-26
*/
export interface User {
    id: number;
    email: string;
    firstName: string | null;
    lastName: string | null;
}