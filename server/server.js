const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, "../")));
app.use("/assets", express.static(path.join(__dirname, "../assets")));
app.use("/CSS", express.static(path.join(__dirname, "../CSS")));
app.use("/js", express.static(path.join(__dirname, "../js")));

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
			res.status(200).send("Email sent successfully");
		}
	});
});

// Start server
app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
