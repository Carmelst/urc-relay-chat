import {getConnecterUser, triggerNotConnected} from "../lib/session.js";
import { Redis } from '@upstash/redis';
import {generateKey} from "./messageWithoutMedia.js";
// const PushNotifications = require("@pusher/push-notifications-server");

const redis = Redis.fromEnv();

export default async function handler(request, response){
    try {
        const user = await getConnecterUser(request);
        if (user === undefined || user === null) {
            console.log("Not connected");
            return triggerNotConnected(response);
        }
        else {
            const {senderId, receiverId, selectedRoom} = await request.body;
            let messagesContent = {}
            if (selectedRoom === "0"){
                const key = generateKey(senderId, receiverId);
                messagesContent = await redis.lrange(key,0, -1);
            }
            else{
                messagesContent = await redis.lrange(receiverId,0, -1);
            }
            if (!messagesContent || messagesContent.length === 0) {
                console.log("No messages");
                return response.status(200).json([]);
            }
            messagesContent.reverse();
            const messages = messagesContent.map((item) => {
                try {
                    if (typeof item === "string"){
                        return JSON.parse(item);
                    }
                    return item;
                }
                catch (err) {
                    console.error("Erreur lors du parsing du message : ", item, err);
                    return null; // Optionnel : Ignorer les messages mal formés
                }
            }).filter((msg) => msg !== null); // Supprimer les messages mal formés
            // Renvoie des messages au format JSON
            return response.status(200).json(messages);
        }
    } catch (error) {
        console.log(error);
        response.status(500).json(error);
    }
}
