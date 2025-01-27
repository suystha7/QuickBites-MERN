import express from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import { connectDB } from "./cofig/db.js";
import "dotenv/config";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import sendEmail from "./middleware/sendEmail.js";

// app config
const app = express();
const port = 4000;

// middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev")); // Use Morgan for logging
app.use(bodyParser.json());

// db connection
connectDB();

// api endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
  res.send("API Working");
});

app.post("/send", sendEmail);

app.listen(port, () => {
  console.log(`Server Started on http://localhost:${port}`);
});
