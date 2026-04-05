import { db } from "../../config/dbConnection";
import { eq } from "drizzle-orm";
import { usersOtp, users } from "../../db/schema/users";
import { User } from '../../types/user';
import { hashData, generateOtp } from '../../utils/auth';
import { sendOtp } from '../../utils/sendOtpToUser'

const getOtpExpiry = () => new Date(Date.now() + 10 * 60 * 1000);

export const createUser = async (payload: User) => {
    const { name, email, password } = payload;
    const emailLower = email.toLowerCase();

    const existingUser = await db.select()
        .from(users)
        .where(eq(users.email, emailLower))
        .limit(1);

    // If user exists and is already verified, block registration
    if (existingUser.length > 0 && existingUser[0].isVerified) {
        throw new Error('User with this email already exists. Please try to login.');
    }

    // If user exists but is NOT verified, resend OTP
    if (existingUser.length > 0 && !existingUser[0].isVerified) {
        const userId = existingUser[0].id;

        const rawOtp = generateOtp();
        const hashedOtp = await hashData(rawOtp);

        // Update existing OTP record
        await db.update(usersOtp)
            .set({
                hashedOtp,
                otpExpiry: getOtpExpiry(),
                retryAttempts: (existingUser[0].retryAttempts ?? 0) + 1,
            })
            .where(eq(usersOtp.userId, userId));

        await sendOtp(emailLower, rawOtp);
        return { message: 'OTP resent to your email. Please verify your account.' };
    }

    // New user registration
    const hashedPassword = await hashData(password);

    return await db.transaction(async (tx) => {
        const [newUser] = await tx.insert(users).values({
            name,
            email: emailLower,
            password: hashedPassword,
        }).returning();

        const rawOtp = generateOtp();
        const hashedOtp = await hashData(rawOtp);

        await tx.insert(usersOtp).values({
            userId: newUser.id,
            hashedOtp,
            otpExpiry: getOtpExpiry(),
            retryAttempts: 1,
        });

        await sendOtp(emailLower, rawOtp);
        const { password: _, ...safeUser } = newUser;
        return safeUser;
    });
};