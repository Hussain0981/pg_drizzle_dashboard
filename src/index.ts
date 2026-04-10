import express, { urlencoded } from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import session from 'express-session';
import pgSession from 'connect-pg-simple';
import { ENV } from './config/dotenv'

// web api
import webRouters from './router/web/index';
// api
import mobileRouter from './router/api/index';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// solve MIME error css
app.get('/public/css/output.css', (req, res) => {
    res.type('text/css');
    res.sendFile(join(__dirname, "..".concat("/public/css/output.css")));
})

app.use(express.json());
app.use(urlencoded({ extended: true }));


const PgStore = pgSession(session);

app.use(session({
    store: new PgStore({
        conString: ENV.DATABASE_URL,
    }),
    secret: ENV.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,  
        secure: false,   
        maxAge: 10 * 60 * 1000 
    }
}));

// ejs setup
app.set("view engine", "ejs");
app.set("views", join(__dirname, "views"));

// public => static files
app.use(express.static(join(__dirname, "..", "public")));

// Web routes
app.use("/", webRouters);

// API routes
app.use("/api", mobileRouter);

app.listen(3000, () => console.log("Server running on port 3000"));