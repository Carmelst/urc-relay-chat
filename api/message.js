import {getConnecterUser, triggerNotConnected} from "../lib/session.js";
import { Redis } from '@upstash/redis';
import {arrayBufferToBase64, stringToArrayBuffer} from "../lib/base64.js";
// const PushNotifications = require("@pusher/push-notifications-server");

const redis = Redis.fromEnv();

export default async function handler(request, response) {
    try {
        const user = await getConnecterUser(request);
        if (user === undefined || user === null) {
            console.log("Not connected");
            triggerNotConnected(response);
        }
        else {
            const {content, senderId, receiverId, date} = await request.body;
            const hash = await crypto.subtle.digest('SHA-256', stringToArrayBuffer(senderId + receiverId));
            const hashed64MessageId = arrayBufferToBase64(hash);
            const result = await redis.lpush(`${hashed64MessageId}`, [content, date] );
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
};
