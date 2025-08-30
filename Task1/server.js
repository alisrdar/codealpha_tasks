import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import shortid from "shortid";
import connectDB from "./config/dbCon.js";
import Url from "./models/Url.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
// Needed to resolve __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(cors({
    origin: process.env.CLIENT_URL || '*',
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// Connect to DB
await connectDB();

// API route
app.post("/shorten", async (req, res) => {
    const { originalUrl } = req.body;
    const shortCode = shortid.generate();

    const newUrl = new Url({ shortCode, originalUrl });
    await newUrl.save();

    console.log(`Shortened URL: ${process.env.BASE_URL}/${shortCode}`);
    res.json({ shortUrl: `${process.env.BASE_URL}/${shortCode}` });

});

// Redirect route
app.get("/:code", async (req, res) => {
    const { code } = req.params;
    const url = await Url.findOne({ shortCode: code });

    if (url) {
        console.log(`Redirecting to: ${url.originalUrl}`);
        return res.redirect(url.originalUrl);

    } else {
        console.log(`URL not found for code: ${code}`);
        return res.status(404).json({ error: "URL not found" });

    }
});
app.use(express.static(path.join(__dirname, "public")));
// Use env PORT, fallback to 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));