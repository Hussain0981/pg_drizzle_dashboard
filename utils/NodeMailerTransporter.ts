import nodemailer from 'nodemailer'
import { ENV } from '../config/dotenv'

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: ENV.NODE_MAILER_USER,
    pass: ENV.NODE_MAILER_PASSWORD,
  },
})