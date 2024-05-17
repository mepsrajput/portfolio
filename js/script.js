document.addEventListener("DOMContentLoaded", function () {
	const form = document.getElementById("contact-form");

	form.addEventListener("submit", function (event) {
		const nameInput = document.getElementById("name");
		const emailInput = document.getElementById("email");
		const messageInput = document.getElementById("message");
		const nameError = document.getElementById("name-error");
		const emailError = document.getElementById("email-error");
		const messageError = document.getElementById("message-error");

		nameError.textContent = "";
		emailError.textContent = "";
		messageError.textContent = "";

		if (nameInput.value.length < 3 || nameInput.value.length > 50) {
			nameError.textContent = "Please enter a valid name.";
			event.preventDefault();
			return;
		}

		if (!isValidEmail(emailInput.value)) {
			emailError.textContent = "Please enter a valid email address.";
			event.preventDefault();
			return;
		}

		if (messageInput.value.length < 10 || messageInput.value.length > 500) {
			messageError.textContent =
				"Message must be between 10 and 500 characters.";
			event.preventDefault();
			return;
		}
	});

	function isValidEmail(email) {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	}
});
