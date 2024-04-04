"use server"
import { NextResponse } from 'next/server';

const postmark = require('postmark');

export async function POST(req) {
    const data = await req.json();
    console.log(data);
    const client = new postmark.ServerClient(process.env.MAIL_API);
    client.sendEmail({
        "From": process.env.MAIL_TO,
        "To": process.env.MAIL_TO,
        "Subject": data.subject,
        "TextBody": data.message,
        "MessageStream": "outbound"
    });
    return NextResponse.json({ success: true });
}