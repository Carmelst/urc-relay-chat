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
    const response = await fetch("/api/messageWithoutMedia",
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

export async function sendMessageWithMedia(file: File, token: string) {
    if (!file) {
        console.error("No file provided");
        return;
    }
    //const formData = new FormData();
    //formData.append('file', file); // Add the file to FormData

    const response = await fetch(`/api/messageWithMedia?filename=${file.name}`, {
        method: "POST",
        headers: {
            "Authentication": `Bearer ${token}`,
        },
        body: file,
    });

    if (response.ok) {
        const result = await response.json();
        return result.fileUrl; // Return the URL of the uploaded file
    } else {
        return await response.json() as CustomError; // Return the error response if not ok
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
    const response = await fetch("/api/clear-redis",
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