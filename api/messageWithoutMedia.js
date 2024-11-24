import {getConnecterUser, triggerNotConnected} from "../lib/session.js";
import { Redis } from '@upstash/redis';
import PushNotifications from "@pusher/push-notifications-server";

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
            let result = 0;
            if (selectedRoom === "0") {
                const key = generateKey(message.senderId, message.receiverId);
                result = await redis.lpush(`${key}`, newMessage );
            }
            else{
                result = await redis.lpush(`${message.receiverId}`, newMessage);
            }

            const beamsClient = new PushNotifications({
                    instanceId: process.env.PUSHER_INSTANCE_ID,
                    secretKey: process.env.PUSHER_SECRET_KEY,
            });
           await beamsClient.publishToUsers([message.receiverId], {
                    web: {
                        notification: {
                            title: `New Message from ${user.username}`,
                            body: message.content.toString(),
                            ico: "https://www.univ-brest.fr/themes/custom/ubo_parent/favicon.ico",
                        },
                        data: {
                            message: {
                                content : message.content.toString(),
                                senderId: message.senderId,
                                receiverId: message.receiverId,
                                date: message.date.toString(),
                            }
                        }
                    },
           });
           response.send({result : result , message : "Message sent"});
        }
    } catch (error) {
        console.log(error);
        response.status(500).json(error);
    }
}
