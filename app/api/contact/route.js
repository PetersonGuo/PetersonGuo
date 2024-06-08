"use server";
import { NextResponse } from 'next/server';
const postmark = require('postmark');

export async function POST(req) {
    try {
        const data = await req.json();
        console.log(data);
        const client = new postmark.ServerClient(process.env.MAIL_API);

        const response = await client.sendEmail({
            "From": "no-reply@petersonguo.com",
            "To": process.env.MAIL_TO,
            "Subject": `${data.subject} - ${data.email}`,
            "TextBody": data.message,
            "MessageStream": "outbound"
        });

        console.log('Email sent successfully:', response);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json({ success: false, error: error.message });
    }
}