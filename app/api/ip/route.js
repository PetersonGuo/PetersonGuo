import { sql } from "@vercel/postgres";
import { NextResponse, userAgent } from 'next/server';

export async function POST(req) {
    try {
        // Parse the incoming request body
        const ipData = await req.json();

        // Fetch geolocation data
        const geoResponse = await fetch(`http://ip-api.com/json/${ipData.ip}`);
        if (!geoResponse.ok) {
            throw new Error(`Failed to fetch geolocation data: ${geoResponse.statusText}`);
        }
        const geoData = await geoResponse.json();

        // Get user agent data
        const user = userAgent(req);

        // Determine table name based on the environment
        const tableName = process.env.ENV === "development" ? "ip_data_clone" : "ip_data";

        // Construct the SQL query string
        const query = `
            INSERT INTO ${tableName} (datetime, ip, data, req, path, additional_json)
            VALUES (NOW(), $1, $2, $3, $4, $5)
        `;

        // Execute the SQL query
        await sql.query(query, [
            ipData.ip,
            JSON.stringify(geoData),
            JSON.stringify(user),
            ipData.path,
            JSON.stringify(ipData.additional_json),
        ]);

        // Return a success response
        return NextResponse.json({ ipData, geoData, user });
    } catch (error) {
        console.error("Error in POST handler:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
