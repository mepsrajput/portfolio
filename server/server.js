const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const path = require("path");
const rateLimit = require("express-rate-limit");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use("/assets", express.static(path.join(__dirname, "../assets")));
app.use("/CSS", express.static(path.join(__dirname, "../CSS")));
app.use("/js", express.static(path.join(__dirname, "../js")));

// Rate limiting middleware
const limiter = rateLimit({
	windowMs: 60 * 60 * 1000, // 1 hour
	max: 5, // limit each IP to 5 requests per windowMs
	message: "Too many requests from this IP, please try again later",
});

// Custom middleware to log the number of requests from the current IP
let requestsFromIP = {};

app.use((req, res, next) => {
	const clientIP = req.ip;
	requestsFromIP[clientIP] = (requestsFromIP[clientIP] || 0) + 1;
	console.log(`Requests from ${clientIP}: ${requestsFromIP[clientIP]}`);
	next();
});

app.use("/send-email", limiter);

// Route to handle form submission
app.post("/send-email", (req, res) => {
	const { name, email, message } = req.body;

	console.log("Form data received:", { name, email, message });

	// Create a Nodemailer transporter
	const transporter = nodemailer.createTransport({
		service: "Gmail",
		auth: {
			user: process.env.GMAIL_USER,
			pass: process.env.GMAIL_PASS,
		},
	});

	// Email message options
	const mailOptions = {
		from: email,
		to: process.env.RECIPIENT_EMAIL,
		subject: "New contact form submission",
		text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
	};

	console.log("Attempting to send email with options:", mailOptions);

	// Send email
	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.error("Error sending email:", error);
			res.status(500).send("Failed to send email");
		} else {
			console.log("Email sent successfully:", info.response);
			res.sendFile(path.join(__dirname, "../mail-success.html"));
		}
	});
});

// Serve index.html for root path
app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "../index.html"));
});

// Start server
app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
