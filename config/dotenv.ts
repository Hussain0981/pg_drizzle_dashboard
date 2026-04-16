import dotenv from 'dotenv'

const mode = process.env.NODE_ENV || 'development'

dotenv.config({ path: `.env.${mode}.local` })

export const ENV = {
    DATABASE_URL: process.env.DATABASE_URL as string,
    NODE_MAILER_USER: process.env.NODE_MAILER_USER as string,
    NODE_MAILER_PASSWORD: process.env.NODE_MAILER_PASSWORD as string,
    SESSION_SECRET: process.env.SESSION_SECRET as string,
    BASE_URL: process.env.BASE_URL as string,
    SUPER_ADMIN_PASSWORD: process.env.SUPER_ADMIN_PASSWORD as string,
    SUPER_ADMIN_EMAIL: process.env.SUPER_ADMIN_EMAIL as string,
    JWT_SECRET: process.env.JWT_SECRET as string
}       