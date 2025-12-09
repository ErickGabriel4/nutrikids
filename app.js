import express from "express";
import path from "path";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import indexRoutes from "./routes/indexRoute.js";
import cardapioRoutes from "./routes/cardapioRoute.js";
import authRoutes from "./routes/authRoute.js";

dotenv.config();
const app = express();
const __dirname = path.resolve();

// EJS config
app.set("view engine", "ejs");
app.set("views","./views");

// Middlewares
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.use("/", indexRoutes);
app.use("/cardapio", cardapioRoutes);
app.use("/auth", authRoutes);

export default app;

