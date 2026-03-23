import { db } from "../../config/dbConnection";
import { users } from "../../db/schema/users";
import { UserLogin } from '../../types/user';
import { compareData } from '../../utils/auth';
import { eq } from "drizzle-orm";

export const login = async (payload: UserLogin) => {
    const { email, password } = payload;
    const user = await db.query.users.findFirst({
        where: eq(users.email, email.toLowerCase()),
    });

    if (!user || !(await compareData(password, user.password))) {
        throw new Error('Invalid email or password');
    }

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
};
