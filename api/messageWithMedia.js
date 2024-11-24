import { getConnecterUser, triggerNotConnected } from "../lib/session.js";
import multer from 'multer';
import { put } from '@vercel/blob';

const storage = multer.memoryStorage();
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

export default async function handler(request, response) {
    try {
        const user = await getConnecterUser(request);
        if (!user) {
            console.log('user not connected');
            return triggerNotConnected(response);
        }
        const { searchParams } = new URL(request.url);
        const filename = searchParams.get('filename');


        const blob = await put(filename, request.body, {
            access: 'public',
        });
        const fileUrl = blob.url;
        return response.json({ fileUrl})
    } catch (error) {
        console.log(error);
        response.status(500).json(error);
    }
}
