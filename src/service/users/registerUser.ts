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

    const existingUser = await db.query.users.findFirst({
        where: eq(users.email, emailLower),
    });

    if (existingUser) throw new Error('User with this email already exists Please try to login');

    const hashedPassword = await hashData(password);

    return await db.transaction(async (tx) => {
        const [newUser] = await tx.insert(users).values({
            name,
            email: emailLower,
            password: hashedPassword,
        }).returning();

        // generate OTP
        const rawOtp = generateOtp();
        const hashedOtp = await hashData(rawOtp);

        // save users Data
        await tx.insert(usersOtp).values({
            userId: newUser.id,
            hashedOtp: hashedOtp,
            otpExpiry: getOtpExpiry(),
        });

        await sendOtp(email, rawOtp)

        console.log(`OTP for ${emailLower}: ${rawOtp}`); 

        return newUser;
    });
};