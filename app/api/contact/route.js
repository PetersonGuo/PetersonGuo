import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";
import { ServerClient } from "postmark";

export async function POST(req) {
	let data;
	try {
		data = await req.json();
	} catch {
		return NextResponse.json(
			{ success: false, error: "Invalid request body" },
			{ status: 400 }
		);
	}

	if (!data.email || !data.subject || !data.message) {
		return NextResponse.json(
			{ success: false, error: "Missing required fields" },
			{ status: 400 }
		);
	}

	if (!process.env.MAIL_API || !process.env.MAIL_TO) {
		console.error("contact: mail env vars are not configured");
		return NextResponse.json(
			{ success: false, error: "Mail is not configured" },
			{ status: 500 }
		);
	}

	// Log the message first, and treat it as best-effort: a logging outage
	// should never stop the email from going out.
	let logged = true;
	try {
		const sql = neon(process.env.DATABASE_URL);
		await sql`INSERT INTO contact_logging (sent_datetime, email, subject, message) VALUES (${new Date()}, ${data.email}, ${data.subject}, ${data.message})`;
	} catch (e) {
		logged = false;
		console.error("contact: failed to log message:", e);
	}

	try {
		const client = new ServerClient(process.env.MAIL_API);
		const response = await client.sendEmail({
			From: "no-reply@petersonguo.com",
			To: process.env.MAIL_TO,
			Subject: data.subject,
			TextBody: `${data.message}\n\n\nReply to ${data.email}`,
			ReplyTo: data.email,
			MessageStream: "outbound",
		});

		// ErrorCode 0 means success. The old check was `!response.ErrorCode === 0`,
		// which negates first and compares a boolean to 0 -- always false.
		if (response.ErrorCode !== 0) {
			throw new Error(response.Message || `Postmark error ${response.ErrorCode}`);
		}
	} catch (e) {
		console.error("contact: failed to send email:", e);
		return NextResponse.json(
			{
				success: false,
				error: e?.message || "Failed to send email",
				logged,
			},
			{ status: 502 }
		);
	}

	return NextResponse.json({ success: true, logged });
}
