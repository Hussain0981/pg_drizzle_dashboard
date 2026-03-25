export function otpTemplate(otp: number): string {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Verification</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">

    <table width="100%" cellpadding="0" cellspacing="0" style="padding: 40px 20px;">
        <tr>
            <td align="center">
                <table width="500" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">

                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); padding: 40px; text-align: center;">
                            <span style="font-size: 28px;">🔐</span>
                            <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700;">
                                Verify Your Identity
                            </h1>
                            <p style="margin: 8px 0 0; color: rgba(255,255,255,0.8); font-size: 14px;">
                                One-Time Password (OTP)
                            </p>
                        </td>
                    </tr>

                    <!-- Body -->
                    <tr>
                        <td style="padding: 40px;">
                            <p style="margin: 0 0 24px; color: #374151; font-size: 15px; line-height: 1.6;">
                                Hello,<br><br>
                                We received a request to verify your identity. Use the OTP code below to continue.
                                <strong>Do not share this code with anyone.</strong>
                            </p>

                            <!-- OTP Box -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="margin: 0 0 24px;">
                                <tr>
                                    <td align="center" style="background: #f8f7ff; border: 2px dashed #6366f1; border-radius: 12px; padding: 28px;">
                                        <p style="margin: 0 0 8px; color: #6b7280; font-size: 12px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase;">
                                            Your OTP Code
                                        </p>
                                        <p style="margin: 0; color: #6366f1; font-size: 42px; font-weight: 800; letter-spacing: 12px;">
                                            ${otp}
                                        </p>
                                    </td>
                                </tr>
                            </table>

                            <!-- Timer Warning -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="margin: 0 0 24px;">
                                <tr>
                                    <td style="background: #fff7ed; border-left: 4px solid #f97316; border-radius: 0 8px 8px 0; padding: 14px 16px;">
                                        <p style="margin: 0; color: #c2410c; font-size: 13px; font-weight: 600;">
                                            ⏱ This code expires in <strong>10 minutes</strong>
                                        </p>
                                    </td>
                                </tr>
                            </table>

                            <!-- Security Tips -->
                            <table width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="background: #f9fafb; border-radius: 10px; padding: 16px 20px;">
                                        <p style="margin: 0 0 10px; color: #374151; font-size: 13px; font-weight: 700;">
                                            🛡️ Security Reminders
                                        </p>
                                        <p style="margin: 0 0 6px; color: #6b7280; font-size: 13px;">✓ Never share this code with anyone</p>
                                        <p style="margin: 0 0 6px; color: #6b7280; font-size: 13px;">✓ Our team will never ask for your OTP</p>
                                        <p style="margin: 0; color: #6b7280; font-size: 13px;">✓ If you did not request this, ignore this email</p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="background: #f9fafb; padding: 24px 40px; border-top: 1px solid #e5e7eb; text-align: center;">
                            <p style="margin: 0 0 6px; color: #9ca3af; font-size: 12px;">
                                This is an automated email, please do not reply.
                            </p>
                            <p style="margin: 0; color: #9ca3af; font-size: 12px;">
                                © 2025 Example Team. All rights reserved.
                            </p>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>
</body>
</html>
    `
}