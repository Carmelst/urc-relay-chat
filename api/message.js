import {getConnecterUser, triggerNotConnected} from "../lib/session.js";
import { Redis } from '@upstash/redis';
// const PushNotifications = require("@pusher/push-notifications-server");

const redis = Redis.fromEnv();

export const generateKey = (id1, id2)  => {
    return [id1, id2].sort().join('-');
};

export default async function handler(request, response) {
    try {
        const user = await getConnecterUser(request);
        if (user === undefined || user === null) {
            console.log("Not connected");
            triggerNotConnected(response);
        }
        else {
            const {content, senderId, receiverId, date} = await request.body;
            const key = generateKey(senderId, receiverId);
            const result = await redis.lpush(`${key}`, [senderId, receiverId, date, content] );
            if ( result < 1) {
                response.send({result : result , message : "Message not sent"});
            }
            else{
                response.send({result : result , message : "Message sent"});
            }
        }
    } catch (error) {
        console.log(error);
        response.status(500).json(error);
    }
}
