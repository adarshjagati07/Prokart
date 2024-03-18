import path from "path";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import cookieParser from "cookie-parser";
import uploadRoutes from "./routes/uploadRoutes.js";

const port = process.env.PORT || 5000;

connectDB(); // Connection to Database MongoDB
const app = express();

//Cookie Parser middleware
app.use(cookieParser());

//Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/config/paypal", (req, res) => res.send({ clientId: process.env.PAYPAL_CLIENT_ID }));

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

const __dirname = path.resolve(); // set dirname to current directory
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV === "production") {
	//set static folder
	app.use(express.static(path.join(__dirname, "/frontend/build")));

	//another router that are not api will be redirected to index.html
	app.get("*", (req, res) => res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html")));
} else {
	app.get("/", (req, res) => {
		res.send("Running Api...");
	});
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on Port: ${port}`));
