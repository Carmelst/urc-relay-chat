import {getConnecterUser, triggerNotConnected} from "../lib/session.js";
import { Redis } from '@upstash/redis';
import {generateKey} from "./message.js";
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
            const key = generateKey(senderId, receiverId);
            const messagesLength =  await redis.llen(key);
            const messagesContent = await redis.lrange(key,0, messagesLength-1);
            messagesContent.reverse();
            const messages = messagesContent.map( (item) => ({
                    content : item.toString().split(',')[0],
                    senderId : senderId,
                    receiverId : receiverId,
                    date : item.toString().split(',')[1]
            }));
            response.json(messages);
        }
    } catch (error) {
        console.log(error);
        response.status(500).json(error);
    }
}
