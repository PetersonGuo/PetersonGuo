"use server"
import postmark from 'postmark';
import { NextResponse } from 'next/server';

export async function POST(req) {
    const client = new postmark.ServerClient(process.env.MAIL_API);
    client.sendEmail({
        "From": req.body.email,
        "To": process.env.MAIL_TO,
        "Subject": req.body.subject,
        "TextBody": req.body.message
    });
    return NextResponse.redirect("/");
}