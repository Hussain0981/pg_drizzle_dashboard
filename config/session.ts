// config/session.ts
import session from 'express-session';
import pgSession from 'connect-pg-simple';
import { ENV } from './dotenv'

const PgStore = pgSession(session);

export const sessionMiddleware = session({
    store: new PgStore({
        conString: process.env.DATABASE_URL,
        tableName: 'session',     
        createTableIfMissing: true
    }),
    secret: ENV.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 10 * 60 * 1000  // 10 minutes
    }
});