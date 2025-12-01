"use server";
import { sql } from "@vercel/postgres";
import { NextResponse } from 'next/server';
const postmark = require('postmark');

export async function POST(req) {
    let error = "";
    const data = await req.json();
    if (!data.email || !data.subject || !data.message) {
        return NextResponse.json({ success: false, error: "Missing required fields" });
    }
    const sql_ =
            await sql`INSERT INTO contact_logging (datetime, email, subject, message) VALUES (NOW(), ${data.email}, ${data.subject}, ${data.message})`;
    if (sql_.rowCount !== 1) {
        error += "Database insertion failed";
    }
    const client = new postmark.ServerClient(process.env.MAIL_API);
    const response = await client.sendEmail({
            "From": "no-reply@petersonguo.com",
            "To": process.env.MAIL_TO,
            "Subject": `${data.subject}`,
            "TextBody": `${data.message} \n\n\n Reply to ${data.email}`,
            "MessageStream": "outbound"
        });
    if (!response.ErrorCode === 0) {
        error += "Email sending failed";
    } // Best effort logging
    console.log('Email sent successfully:', response);
    return NextResponse.json({ success: true, error: error });
}