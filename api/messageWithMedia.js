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
        await upload.single('file')(request, response, async (err) => {
            if (err) {
                return response.status(400).json({ error: 'File upload failed', message: err.message });
            }

            const fileData = request.file?.buffer; // Get the file's binary data
            const filename = request.file?.originalname || 'default_filename.jpeg';

            if (!fileData) {
                return response.status(400).json({ error: 'No file data found.' });
            }

            try {
                // Upload file to Vercel Blob
                const blob = await put(filename, fileData, { access: 'public' });
                const fileUrl = blob.url;
                return response.status(200).json({ fileUrl });
            } catch (error) {
                console.error(error);
                return response.status(500).json({ error: 'Failed to upload the file.' });
            }
        });

    } catch (error) {
        console.log(error);
        response.status(500).json(error);
    }
}
