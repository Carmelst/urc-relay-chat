import {CustomError} from "../model/CustomError";
import {Account, User} from "../model/common";

export async function getUsers(token: string) {

    const response = await fetch("/api/users",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authentication": `Bearer ${token}`,
            },
        });
    if (response.ok) {
        return await response.json();
    } else {
        return await response.json() as CustomError;
    }
}

export async function saveUser(newUser: Account) {
    const response = await fetch("/api/register",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
        });
    if (response.ok) {
        return await response.json();
    } else {
        return await response.json() as CustomError;
    }
}