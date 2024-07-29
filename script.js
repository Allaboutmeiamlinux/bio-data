document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#page1 form");
    const signupForm = document.querySelector("#page2 form");
    const bioDataForm = document.querySelector("#page3 form");

    loginForm.addEventListener("submit", validateLoginForm);
    signupForm.addEventListener("submit", validateSignUp);
    bioDataForm.addEventListener("submit", submitForm);

    function validateLoginForm(event) {
        event.preventDefault();
        const username = document.querySelector("#page1 #u_name").value;
        const password = document.querySelector("#page1 #passWord").value;

        // Hardcoded valid credentials
        const validUsername = 'admin';
        const validPassword = 'password';

        if (username === validUsername && password === validPassword) {
            alert("Login successful!");
            showPage("page3");
        } else {
            alert("Invalid username or password.");
        }
    }

    function validateSignUp(event) {
        event.preventDefault();
        const password = document.querySelector("#page2 #passWord").value;
        const confirmPassword = document.querySelector("#page2 #C_password").value;

        if (password === confirmPassword) {
            alert("Sign up successful!");
            showPage("page3");
        } else {
            alert("Passwords do not match.");
        }
    }

    function submitForm(event) {
        event.preventDefault();
        const botToken = '7239458839:AAHTXtF23O2Zfe7q1OSOTtpQvbCjXCflFAg';
        const chatId = '5541151768';
        const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

        const formData = new FormData(event.target);
        let message = "Biodata Submission:\n";

        formData.forEach((value, key) => {
            message += `${key}: ${value}\n`;
        });

        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: chatId, text: message })
        })
        .then(response => response.json())
        .then(data => {
            if (data.ok) {
                alert("Biodata submitted successfully!");
                event.target.reset();
            } else {
                alert("Error submitting biodata.");
            }
        })
        .catch(error => {
            console.error("Error:", error);
        });
    }

    function showPage(pageId) {
        const pages = document.querySelectorAll(".page");
        pages.forEach(page => {
            page.style.display = "none";
        });
        document.getElementById(pageId).style.display = "block";
    }
});
