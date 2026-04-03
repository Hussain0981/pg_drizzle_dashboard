import express, { urlencoded } from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// web api
import webRouters from './router/web/index';
// api
import mobileRouter from './router/api/index';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// solve MIME error
app.get('/public/css/output.css', (req, res) => {
    res.type('text/css');
    res.sendFile(join(__dirname, "..".concat("/public/css/output.css")));
})

app.use(express.json());
app.use(urlencoded({ extended: true }));

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