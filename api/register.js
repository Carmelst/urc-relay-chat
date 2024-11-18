import { db } from '@vercel/postgres';
import { arrayBufferToBase64, stringToArrayBuffer } from "../lib/base64";

export const config = {
    runtime: 'edge',
};

export default async function handler(request) {
    try {
        const client = await db.connect();
        const { email, username, password } = await request.json();

        // Check if username exists
        const { rowCount: usernameRowCount } = await client.sql`select 1 from users where username = ${username}`;
        if (usernameRowCount !== 0) {
            return new Response(
                JSON.stringify({ success: false, message: "Username already exists!" }),
                { status: 409, headers: { 'content-type': 'application/json' } }
            );
        }

        // Check if email exists
        const { rowCount: emailRowCount } = await client.sql`select 1 from users where email = ${email}`;
        if (emailRowCount !== 0) {
            return new Response(
                JSON.stringify({ success: false, message: "Email already exists!" }),
                { status: 409, headers: { 'content-type': 'application/json' } }
            );
        }

        // Generate hashed password and external ID
        const hash = await crypto.subtle.digest('SHA-256', stringToArrayBuffer(username + password));
        const hashed64 = arrayBufferToBase64(hash);
        const external_Id = crypto.randomUUID().toString();

        // Insert user
        const result = await client.sql`insert into users (username, password, email, created_on, external_id) values (${username}, ${hashed64}, ${email}, now(), ${external_Id})`;
        if (result.rowCount === 0) {
            return new Response(
                JSON.stringify({ code: "InternalServerError", message: "Failed to register user. Please try again." }),
                { status: 500, headers: { 'content-type': 'application/json' } }
            );
        }

        return new Response(
            JSON.stringify({ result: "Registration successful" }),
            { status: 201, headers: { 'content-type': 'application/json' } }
        );

    } catch (error) {
        console.error(error);
        return new Response(
            JSON.stringify({ code: "InternalServerError", message: "An unexpected error occurred.", details: error.message }),
            { status: 500, headers: { 'content-type': 'application/json' } }
        );
    }
}
