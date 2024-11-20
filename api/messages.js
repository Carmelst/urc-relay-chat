import {getConnecterUser, triggerNotConnected} from "../lib/session.js";
import { Redis } from '@upstash/redis';
import {arrayBufferToBase64, stringToArrayBuffer} from "../lib/base64.js";
// const PushNotifications = require("@pusher/push-notifications-server");

const redis = Redis.fromEnv();

export default async function handler(request, response){
    try {
        const user = await getConnecterUser(request);
        if (user === undefined || user === null) {
            console.log("Not connected");
            triggerNotConnected(response);
        }
        else {
            const {senderId, receiverId} = await request.body;
            const hash = await crypto.subtle.digest('SHA-256', stringToArrayBuffer(senderId + receiverId));
            const hashed64MessageId = arrayBufferToBase64(hash);
            const messagesLength =  await redis.llen(hashed64MessageId);
            const messagesContent = await redis.lrange(hashed64MessageId,0, messagesLength-1);
            const messages = messagesContent.map( (item) => ({
                    content : item.split(',')[0],
                    senderId : senderId,
                    receiverId : receiverId,
                    date : item.split(',')[1]
            }));
            response.json(messages);
        }
    } catch (error) {
        console.log(error);
        response.status(500).json(error);
    }
}
