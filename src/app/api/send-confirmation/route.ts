// import { NextResponse } from "next/server";
// import { Resend } from "resend";

// const resend = new Resend(process.env.RESEND_API_KEY);

// export async function POST(req: Request) {
//   try {
//     const { to, orderId, status } = await req.json();

//     if (!to || !orderId || !status) {
//       return NextResponse.json(
//         { status: "error", message: "Missing required fields." },
//         { status: 400 }
//       );
//     }

//     const response = await resend.emails.send({
//       from: process.env.EMAIL_FROM!, // e.g., "E-Shop <noreply@yourdomain.com>"
//       to,
//       subject: `Update on your order #${orderId}`,
//       html: `
//         <h1>Order Update</h1>
//         <p>Your order <strong>${orderId}</strong> status has been updated to <strong>${status}</strong>.</p>
//         <p>Thanks for shopping with us!</p>
//       `,
//     });

//     const id = (response as { id?: string }).id;

//     return NextResponse.json({ status: "sent", id }, { status: 200 });
//   } catch (error: any) {
//     console.error("❌ Failed to send update email:", error);
//     return NextResponse.json(
//       {
//         status: "error",
//         message: "Failed to send update email",
//         error: error?.message || error,
//       },
//       { status: 500 }
//     );
//   }
// }
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { to, orderId, status } = await req.json();

    if (!to || !orderId || !status) {
      return NextResponse.json(
        { status: "error", message: "Missing required fields." },
        { status: 400 }
      );
    }

    const from = process.env.EMAIL_FROM!;
    const subject = `Update on your order #${orderId}`;

    const response = await resend.emails.send({
      from: "E-Shop <onboarding@resend.dev>",
      to,
      subject,
      html: `
  <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; line-height: 1.6;">
    <h2 style="color: #ff6600;">🛒 Order Status Update</h2>
    <p>Hello,</p>

    <p>We're writing to let you know that the status of your order <strong>#${orderId}</strong> has been updated.</p>

    <p>
      <strong>Current Status:</strong>
      <span style="color: #007bff;">${status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()}</span>
    </p>

    <p>Thank you for shopping with us. We’ll keep you updated as your order progresses.</p>

    <p>If you have any questions, feel free to reply to this email or contact our support team.</p>

    <p style="margin-top: 30px;">Best regards,<br><strong>The TrendyNest Team</strong></p>
    
    <hr style="margin-top: 40px;" />
    <p style="font-size: 12px; color: #777;">
      This is an automated message. Please do not reply directly to this email.
    </p>
  </div>
`,
    });

    const id = (response as { id?: string }).id;

    // ✅ Log for verification
    console.log("📧 Email sent:");
    console.log("- From:", from);
    console.log("- To:", to);
    console.log("- Subject:", subject);
    console.log("- Email ID:", id);

    return NextResponse.json({ status: "sent", id }, { status: 200 });
  } catch (error: any) {
    console.error("❌ Failed to send update email:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to send update email",
        error: error?.message || error,
      },
      { status: 500 }
    );
  }
}
