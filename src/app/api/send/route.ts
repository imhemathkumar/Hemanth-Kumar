import { Resend } from "resend"
import { NextResponse } from "next/server"

// Use an environment variable with a fallback for development
const resendApiKey = process.env.RESEND_API_KEY || "re_KaeExhmG_M4XnuSGccKa7u4BPrhanv7Bo"
const resend = new Resend(resendApiKey)

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const subject = formData.get("subject") as string
    const message = formData.get("message") as string

    // Validate the required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        {
          success: false,
          error: "All fields are required",
        },
        { status: 400 },
      )
    }

    // Check if Resend API key is available
    if (!resendApiKey) {
      console.warn("Resend API key is not set. Email will not be sent.")
      // Return success anyway to not block the UI in production
      return NextResponse.json({
        success: true,
        data: null,
        message: "Email sending is disabled (API key not configured)",
      })
    }

    console.log("Sending email with Resend:", { name, email, subject })

    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: ["hemanthkumartelukuntla143@gmail.com"],
      subject: `New Contact Form Submission`,
      text: `
        Name: ${name}
        Email: ${email}
        Subject: ${subject}
        Message: ${message}
      `,
    })

    if (error) {
      console.error("Error sending email:", error)
      return NextResponse.json(
        {
          success: false,
          error: error.message,
        },
        { status: 500 },
      )
    }

    console.log("Email sent successfully:", data)
    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("Error in contact form API:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "An unexpected error occurred",
      },
      { status: 500 },
    )
  }
}
