import express, { urlencoded } from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// web api
import userWeb from './router/web/index.js';
// api
import userApi from './router/api/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.get('/public/css/output.css', (req, res) => {
    res.type('text/css');
    res.sendFile(__dirname + '/public/css/output.css');
})


app.use(express.json());
app.use(urlencoded({ extended: true }));

// EJS setup — views inside src
app.set("view engine", "ejs");
app.set("views", join(__dirname, "views"));

// Static files — public outside src
app.use(express.static(join(__dirname, "..", "public")));

// Web routes
app.use("/", userWeb);

// API routes
app.use("/", userApi);

app.listen(3000, () => console.log("Server running on port 3000"));