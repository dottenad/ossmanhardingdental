import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const TO_EMAIL = "soundcustomfences@gmail.com";
const FROM_EMAIL = process.env.RESEND_FROM || "Sound Custom Fences <onboarding@resend.dev>";

export interface ContactRequestBody {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    service: string;
    message: string;
    marketingConsent?: boolean;
    textConsent?: boolean;
}

function buildSubmissionHtml(body: ContactRequestBody): string {
    const lines = [
        `Name: ${body.firstName.trim()} ${body.lastName.trim()}`,
        `Email: ${body.email.trim()}`,
        `Phone: ${body.phone.trim()}`,
        body.service?.trim() ? `Service: ${body.service.trim()}` : null,
        body.message?.trim() ? `Message:\n${body.message.trim()}` : null,
        body.marketingConsent ? "Marketing consent: Yes" : null,
        body.textConsent ? "Text consent: Yes" : null,
    ].filter(Boolean);
    const text = lines.join("\n");
    return `<pre style="font-family:sans-serif;white-space:pre-wrap;">${escapeHtml(text)}</pre>`;
}

function escapeHtml(s: string): string {
    return s
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

export async function POST(request: NextRequest) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
        return NextResponse.json(
            { error: "Email is not configured (missing RESEND_API_KEY)." },
            { status: 503 }
        );
    }

    let body: ContactRequestBody;
    try {
        body = await request.json();
    } catch {
        return NextResponse.json(
            { error: "Invalid JSON body." },
            { status: 400 }
        );
    }

    const { firstName, lastName, email, phone, service, message } = body;
    if (!firstName?.trim() || !lastName?.trim() || !email?.trim() || !phone?.trim()) {
        return NextResponse.json(
            { error: "Missing required fields: firstName, lastName, email, phone." },
            { status: 400 }
        );
    }

    const resend = new Resend(apiKey);

    try {
        // 1) Send submission to company
        const { error: err1 } = await resend.emails.send({
            from: FROM_EMAIL,
            to: [TO_EMAIL],
            replyTo: email.trim(),
            subject: `Quote request from ${firstName.trim()} ${lastName.trim()}`,
            html: buildSubmissionHtml(body),
        });

        if (err1) {
            console.error("Resend (to company):", err1);
            return NextResponse.json(
                { error: "Failed to send your message. Please try again or call us." },
                { status: 502 }
            );
        }

        // 2) Send confirmation to the person who submitted
        const { error: err2 } = await resend.emails.send({
            from: FROM_EMAIL,
            to: [email.trim()],
            subject: "We received your request – Sound Custom Fences",
            html: `
                <p>Thank you for your email. We have received your quote request and will reach out to you soon.</p>
                <p>If you have any questions in the meantime, feel free to call us at (253) 448-3434.</p>
                <p>— Sound Custom Fences</p>
            `,
        });

        if (err2) {
            console.error("Resend (confirmation to user):", err2);
            // Submission was already received by company; still return success
        }

        return NextResponse.json({
            success: true,
            message: "Your request has been received. We'll be in touch soon.",
        });
    } catch (err) {
        console.error("Contact API error:", err);
        return NextResponse.json(
            { error: "Something went wrong. Please try again or call us." },
            { status: 500 }
        );
    }
}
