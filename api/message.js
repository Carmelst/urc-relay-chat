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
            const {content, senderId, receiverId, date} = await request.body;
            const key = generateKey(senderId, receiverId);
            const result = await redis.lpush(`${key}`, [senderId, receiverId, date, content] );

            const beamsClient = new PushNotifications({
                    instanceId: process.env.PUSHER_INSTANCE_ID,
                    secretKey: process.env.PUSHER_SECRET_KEY,
            });
           await beamsClient.publishToUsers([receiverId], {
                    web: {
                        notification: {
                            title: `New Message from ${user.username}`,
                            body: content.toString(),
                            ico: "https://www.univ-brest.fr/themes/custom/ubo_parent/favicon.ico",
                        },
                        data: {
                            message: {
                                content : content.toString(),
                                senderId: senderId,
                                receiverId: receiverId,
                                date: date.toString(),
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
