import { transporter } from './NodeMailerTransporter'
import { otpTemplate } from './otpTemplate'

export async function sendOtp(email: string, otp: number) {
    try {
        const info = await transporter.sendMail({
            from: '"Example Team" <team@example.com>',
            to: email,
            subject: "Your OTP Verification Code",
            text: `Your OTP code is: ${otp}. This code will expire in 10 minutes.`,
            html: otpTemplate(otp),
        })

        if (info.rejected.length > 0) {
            throw new Error(`Some recipients were rejected:`, { cause: info.rejected })
        }
        console.log(`OTP sent successfully to: ${email}`)

    } catch (err: unknown) {
        const error = err as NodeJS.ErrnoException

        switch (error.code) {
            case "ECONNECTION":
            case "ETIMEDOUT":
                throw new Error("Network error - retry later", { cause: err })

            case "EAUTH":
                throw new Error("Authentication failed - check SMTP credentials", { cause: err })

            case "EENVELOPE":
                throw new Error("Invalid recipient email address", { cause: err })

            default:
                throw new Error("Failed to send mail", { cause: err })
        }
    }
}