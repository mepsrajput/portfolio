document.addEventListener("DOMContentLoaded", () => {
	// Toggle mobile menu
	const menuToggle = document.getElementById("mobile-menu");
	const navLinks = document.getElementById("nav-links");

	menuToggle.addEventListener("click", () => {
		menuToggle.classList.toggle("active");
		navLinks.classList.toggle("active");
	});

	// Form validation and submission
	const contactForm = document.getElementById("contact-form");
	const nameInput = document.getElementById("name");
	const emailInput = document.getElementById("email");
	const messageInput = document.getElementById("message");
	const nameError = document.getElementById("name-error");
	const emailError = document.getElementById("email-error");
	const messageError = document.getElementById("message-error");

	let formSubmitted = false;

	contactForm.addEventListener("submit", (event) => {
		event.preventDefault();
		formSubmitted = true;
		if (validateForm()) {
			contactForm.submit();
		}
	});

	function validateForm() {
		let isValid = true;

		// Validate name
		if (!validateName()) {
			isValid = false;
		}

		// Validate email
		if (!validateEmail()) {
			isValid = false;
		}

		// Validate message
		if (!validateMessage()) {
			isValid = false;
		}

		return isValid;
	}

	function validateName() {
		const isValid = nameInput.value.length >= 3 && nameInput.value.length <= 50;
		nameError.textContent = formSubmitted && !isValid ? "Please enter a valid name." : "";
		return isValid;
	}

	function validateEmail() {
		const isValid = isValidEmail(emailInput.value);
		emailError.textContent = formSubmitted && !isValid ? "Please enter a valid email address." : "";
		return isValid;
	}

	function validateMessage() {
		const isValid = messageInput.value.length >= 10 && messageInput.value.length <= 500;
		messageError.textContent = formSubmitted && !isValid ? "Message must be between 10 and 500 characters." : "";
		return isValid;
	}

	function isValidEmail(email) {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	}

	// Blur event listeners for validation after form submission attempt
	nameInput.addEventListener("blur", () => {
		if (formSubmitted) {
			validateName();
		}
	});
	emailInput.addEventListener("blur", () => {
		if (formSubmitted) {
			validateEmail();
		}
	});
	messageInput.addEventListener("blur", () => {
		if (formSubmitted) {
			validateMessage();
		}
	});

	// Input event listeners for real-time error clearing
	nameInput.addEventListener("input", () => {
		if (formSubmitted) {
			validateName();
		}
	});
	emailInput.addEventListener("input", () => {
		if (formSubmitted) {
			validateEmail();
		}
	});
	messageInput.addEventListener("input", () => {
		if (formSubmitted) {
			validateMessage();
		}
	});
});
