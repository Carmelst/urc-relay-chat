import {getConnecterUser, triggerNotConnected} from "../lib/session.js";
import { Redis } from '@upstash/redis';
import {pushNotificationToRoom, pushNotificationToUSer} from "../src/app/notification-service.js";

const redis = Redis.fromEnv();


export const generateKey = (id1, id2)  => {
    return [id1, id2].sort().join('-');
};

export default async function handler(request, response) {
    try {
        const user = await getConnecterUser(request);
        if (user === undefined || user === null) {
            console.log("Not connected");
            return triggerNotConnected(response);
        }
        else {
            const {message, selectedRoom} = await request.body;
            const newMessage = JSON.stringify({
                content : message.content,
                senderId: message.senderId,
                receiverId: message.receiverId,
                date: message.date,
                media : message.media,
            });
            console.log(newMessage);
            let result = 0;
            if (selectedRoom === "0") {
                const key = generateKey(message.senderId, message.receiverId);
                result = await redis.lpush(`${key}`, newMessage );
                await pushNotificationToUSer(message.receiverId, user.username, message);
            }
            else{
                result = await redis.lpush(`${message.receiverId}`, newMessage);
                await pushNotificationToRoom(user.username, message);
            }

           response.send({result : result , message : "Message sent"});
        }
    } catch (error) {
        console.log(error);
        response.status(500).json(error);
    }
}
