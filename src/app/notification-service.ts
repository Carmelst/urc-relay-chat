import PushNotifications from "@pusher/push-notifications-server";
import {Message} from "../model/common";



export const pushNotificationToUSer = async (externalId : string, senderName: string, message : Message) => {
    const beamsClient = new PushNotifications({
        instanceId: process.env.PUSHER_INSTANCE_ID || '',
        secretKey: process.env.PUSHER_SECRET_KEY || '',
    });
    await beamsClient.publishToUsers([externalId], {
        web: {
            notification: {
                title: `New Message from ${senderName}`,
                body: message.content.toString(),
                icon: "https://www.univ-brest.fr/themes/custom/ubo_parent/favicon.ico",
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
}

export const pushNotificationToRoom = async (senderName: string, message : Message) => {
    const beamsClient = new PushNotifications({
        instanceId: process.env.PUSHER_INSTANCE_ID || '',
        secretKey: process.env.PUSHER_SECRET_KEY || '',
    });
    await beamsClient.publishToInterests(['global'], {
        web: {
            notification: {
                title: `New Message from ${senderName}`,
                body: message.content.toString(),
                icon: "https://www.univ-brest.fr/themes/custom/ubo_parent/favicon.ico",
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
}