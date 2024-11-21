import {CustomError} from "../model/CustomError";
import {Account, Message} from "../model/common";

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

export async function sendMessage(message: Message, token: string) {
    const response = await fetch("/api/message",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authentication": `Bearer ${token}`,
            },
            body: JSON.stringify(message)
        });
    if (response.ok) {
        return await response.json();
    }
    else {
        return await response.json() as CustomError;
    }
}

export async function getMessages(senderId: string, receiverId: string, token: string) {
    const response = await fetch("/api/messages",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authentication": `Bearer ${token}`,
            },
            body: JSON.stringify({senderId, receiverId}),
        });
    if (response.ok) {
        return await response.json();
    }
    else {
        return await response.json() as CustomError;
    }
}

export async function clearRedis() {
    const response = await fetch("/api/vercel",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        });
    if (response.ok) {
        return await response.json();
    }
    else {
        return await response.json() as CustomError;
    }
}