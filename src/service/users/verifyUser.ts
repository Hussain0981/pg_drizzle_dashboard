import { db } from "../../config/dbConnection";
import { usersOtp } from "../../db/schema/users";
import { compareData } from '../../utils/auth';
import { eq } from "drizzle-orm";

const MAX_ATTEMPTS = 5;
const BLOCK_DURATION_MS = 2 * 60 * 60 * 1000; 

export async function verifyOtp(userId: number, inputOtp: string) {
  const otpRecord = await db.query.usersOtp.findFirst({
    where: eq(usersOtp.userId, userId),
  });

  if (!otpRecord) throw new Error("OTP not fund");

  const now = new Date();

  if (otpRecord.temporaryBlock && otpRecord.blockedUntil) {
    if (now >= otpRecord.blockedUntil) {
      await db.update(usersOtp)
        .set({
          temporaryBlock: false,
          blockedUntil: null,
          retryAttempts: 0,
        })
        .where(eq(usersOtp.userId, userId));
    } else {
      // Abhi bhi block hai
      const minutesLeft = Math.ceil(
        (otpRecord.blockedUntil.getTime() - now.getTime()) / 60000
      );
      throw new Error(`Account block hai. ${minutesLeft} minute baad try karein`);
    }
  }

  // ✅ OTP expiry check
  if (now > otpRecord.otpExpiry) {
    throw new Error("OTP expire ho gaya");
  }

  // ✅ OTP match check (bcrypt use karo)
  const isMatch = await compareData(inputOtp, otpRecord.hashedOtp);

  if (!isMatch) {
    const newAttempts = otpRecord.retryAttempts + 1;

    if (newAttempts >= MAX_ATTEMPTS) {
      await db.update(usersOtp)
        .set({
          temporaryBlock: true,
          blockedUntil: new Date(now.getTime() + BLOCK_DURATION_MS), // 2 ghante baad
          retryAttempts: newAttempts,
        })
        .where(eq(usersOtp.userId, userId));

      throw new Error("You are temporarily blocked due to multiple failed OTP attempts. Please try again later.");
    }

    // counter attempts
    await db.update(usersOtp)
      .set({ retryAttempts: newAttempts })
      .where(eq(usersOtp.userId, userId));

    throw new Error(`Wrong OTP. ${MAX_ATTEMPTS - newAttempts} attempts remaining`);
  }

  // ✅ OTP reset 
  await db.update(usersOtp)
    .set({
      temporaryBlock: false,
      blockedUntil: null,
      retryAttempts: 0,
    })
    .where(eq(usersOtp.userId, userId));

  return { success: true, message: "OTP verified" };
}