import {getConnecterUser, triggerNotConnected} from "../lib/session.js";

import PushNotifications from "@pusher/push-notifications-server";

export default async (req, res) => {

    const userIDInQueryParam = req.query["user_id"];
    const user = await getConnecterUser(req);
    //console.log("PushToken : " + userIDInQueryParam + " -> " + JSON.stringify(user));
    if (user === undefined || user === null || userIDInQueryParam !== user.externalId) {
        console.log("Not connected");
        return triggerNotConnected(res);
    }
    //console.log("Using push instance : " + process.env.PUSHER_INSTANCE_ID);
    const beamsClient = new PushNotifications({
        instanceId: process.env.PUSHER_INSTANCE_ID,
        secretKey: process.env.PUSHER_SECRET_KEY,
    });

    const beamsToken = beamsClient.generateToken(user.externalId);
    //console.log("token generated : " + beamsToken.token);
    res.send(beamsToken);
};
