import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/auth.route";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRoute);

app.listen(3000, () => {
  console.log("Server is runing");
});
