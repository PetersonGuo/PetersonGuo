import { NextResponse, userAgent } from 'next/server';
import { sql } from "@vercel/postgres";

export async function POST(req) {
    const ipData = await req.json();
    const geo = await fetch(`http://ip-api.com/json/${ipData.ip}`);
    const geoData = await geo.json();
    const user = userAgent(req);
    console.log(ipData.ip);
    console.log(geoData);
    console.log(user);
    console.log(ipData.path);
    console.log(ipData.additional_json);
    const sql_ =
        await sql`INSERT INTO ip_data (datetime, ip, data, req, path, additional_json) VALUES (NOW(), ${ipData.ip}, ${geoData}, ${user}, ${ipData.path}, ${ipData.additional_json})`;
    return NextResponse.json({ ipData: ipData, geoData: geoData, user: user });
}