/* ================================= */
/* LOGIN / SIGN UP SYSTEM */
/* ================================= */

let currentUser = null;


/* Open Login */

function openAuth() {

    document.getElementById("authModal").style.display = "flex";

    showLogin();
}


/* Close Login */

function closeAuth() {

    document.getElementById("authModal").style.display = "none";

}


/* Show Login */

function showLogin() {

    document.getElementById("loginForm").style.display = "block";

    document.getElementById("signupForm").style.display = "none";

    document.getElementById("loginMessage").innerHTML = "";

}


/* Show Sign Up */

function showSignup() {

    document.getElementById("loginForm").style.display = "none";

    document.getElementById("signupForm").style.display = "block";

    document.getElementById("signupMessage").innerHTML = "";

}


/* Sign Up */

function signupUser() {

    let name =
        document.getElementById("signupName").value.trim();

    let email =
        document.getElementById("signupEmail").value.trim();

    let password =
        document.getElementById("signupPassword").value;

    let confirmPassword =
        document.getElementById("confirmPassword").value;

    let message =
        document.getElementById("signupMessage");


    if (
        name === "" ||
        email === "" ||
        password === "" ||
        confirmPassword === ""
    ) {

        message.innerHTML =
            "⚠️ Please fill all fields.";

        message.style.color = "red";

        return;
    }


    if (password.length < 6) {

        message.innerHTML =
            "⚠️ Password must be at least 6 characters.";

        message.style.color = "red";

        return;
    }


    if (password !== confirmPassword) {

        message.innerHTML =
            "⚠️ Passwords do not match.";

        message.style.color = "red";

        return;
    }


    /*
       Demo account storage.

       This is only for frontend testing.
    */

    let user = {

        name: name,

        email: email,

        password: password

    };


    localStorage.setItem(
        "studyhubUser",
        JSON.stringify(user)
    );


    message.innerHTML =
        "✅ Account created successfully!";

    message.style.color = "green";


    setTimeout(function () {

        showLogin();

        document.getElementById("loginEmail").value =
            email;

    }, 1000);

}


/* Login */

function loginUser() {

    let email =
        document.getElementById("loginEmail").value.trim();

    let password =
        document.getElementById("loginPassword").value;

    let message =
        document.getElementById("loginMessage");


    if (email === "" || password === "") {

        message.innerHTML =
            "⚠️ Please enter email and password.";

        message.style.color = "red";

        return;
    }


    let savedUser =
        localStorage.getItem("studyhubUser");


    if (savedUser === null) {

        message.innerHTML =
            "❌ Account not found. Please Sign Up.";

        message.style.color = "red";

        return;
    }


    let user =
        JSON.parse(savedUser);


    if (
        email === user.email &&
        password === user.password
    ) {

        currentUser = user;


        localStorage.setItem(
            "studyhubLoggedIn",
            "true"
        );


        message.innerHTML =
            "✅ Login successful!";

        message.style.color = "green";


        setTimeout(function () {

            closeAuth();

            updateLoginButton();

        }, 800);


    } else {

        message.innerHTML =
            "❌ Incorrect email or password.";

        message.style.color = "red";

    }

}


/* Logout */

function logoutUser() {

    currentUser = null;

    localStorage.removeItem(
        "studyhubLoggedIn"
    );

    updateLoginButton();

}


/* Update Navbar Button */

function updateLoginButton() {

    let button =
        document.getElementById("loginBtn");


    if (
        localStorage.getItem("studyhubLoggedIn")
        === "true"
    ) {

        let savedUser =
            localStorage.getItem("studyhubUser");

        if (savedUser) {

            let user =
                JSON.parse(savedUser);

            button.innerHTML =
                "🚪 Logout";

            button.onclick = logoutUser;

            button.title =
                "Logged in as " + user.email;

        }

    } else {

        button.innerHTML =
            "🔐 Login";

        button.onclick =
            openAuth;

    }

}


/* Close Modal When Clicking Outside */

window.addEventListener(
    "click",
    function(event) {

        let modal =
            document.getElementById("authModal");

        if (event.target === modal) {

            closeAuth();

        }

    }
);


/* Check Login On Page Load */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        updateLoginButton();

    }
);


// Dark / Light Mode

const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", function () {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        themeBtn.innerHTML = "☀️";
    } else {
        themeBtn.innerHTML = "🌙";
    }

});


// Subject Button

function showMessage(subject) {

    alert(
        "You selected " +
        subject +
        ". Notes and study material will be available soon!"
    );

}


// Notes Search

function searchNotes() {

    let input =
        document.getElementById("searchBox")
        .value
        .toLowerCase();

    let notes =
        document.querySelectorAll(".note");

    notes.forEach(function(note) {

        let text =
            note.innerText.toLowerCase();

        if (text.includes(input)) {
            note.style.display = "block";
        } else {
            note.style.display = "none";
        }

    });

}


// Read Note

function readNote(noteName) {

    alert(
        "Opening " +
        noteName +
        " notes..."
    );

}


// Quiz

function checkAnswer(answer) {

    let result =
        document.getElementById("quizResult");

    if (answer === "HTML") {

        result.innerHTML =
            "✅ Correct Answer!";

        result.style.color = "green";

    } else {

        result.innerHTML =
            "❌ Wrong Answer. Correct answer is HTML.";

        result.style.color = "red";

    }

}


// AI Assistant

function sendMessage() {

    let input =
        document.getElementById("userInput");

    let message =
        input.value.trim();

    if (message === "") {
        return;
    }


    let chat =
        document.getElementById("chatMessages");


    // User message

    let userMessage =
        document.createElement("div");

    userMessage.className =
        "user-message";

    userMessage.innerText =
        message;

    chat.appendChild(userMessage);


    // Simple AI response

    let response =
        getAIResponse(message);


    setTimeout(function() {

        let botMessage =
            document.createElement("div");

        botMessage.className =
            "bot-message";

        botMessage.innerText =
            response;

        chat.appendChild(botMessage);

        chat.scrollTop =
            chat.scrollHeight;

    }, 500);


    input.value = "";

}


// AI Response Function

function getAIResponse(message) {

    message =
        message.toLowerCase();


    if (message.includes("python")) {

        return "Python is a beginner-friendly programming language. Start with variables, conditions, loops and functions.";

    }


    if (message.includes("html")) {

        return "HTML is used to create the structure of web pages.";

    }


    if (message.includes("css")) {

        return "CSS is used to design and style HTML web pages.";

    }


    if (message.includes("javascript")) {

        return "JavaScript makes websites interactive and dynamic.";

    }


    if (message.includes("dbms")) {

        return "DBMS is software used to store, manage and retrieve data from databases.";

    }


    if (message.includes("network")) {

        return "Computer networking allows devices to communicate and share resources.";

    }


    return "Good question! Try asking me about Python, HTML, CSS, JavaScript, DBMS or Networking.";

}
// Current selected category
let selectedCategory = "all";


// Category Filter
function filterCategory(category) {

    selectedCategory = category;

    // Remove active class
    let buttons =
        document.querySelectorAll(".filter-btn");

    buttons.forEach(function(button) {
        button.classList.remove("active");
    });


    // Add active class to clicked button
    event.target.classList.add("active");


    filterNotes();
}


// Search + Category Filter
function filterNotes() {

    let search =
        document
        .getElementById("searchBox")
        .value
        .toLowerCase();


    let notes =
        document.querySelectorAll(".note");


    notes.forEach(function(note) {

        let category =
            note.getAttribute("data-category");

        let text =
            note.innerText.toLowerCase();


        let categoryMatch =
            selectedCategory === "all" ||
            category === selectedCategory;


        let searchMatch =
            text.includes(search);


        if (categoryMatch && searchMatch) {

            note.classList.remove("hidden");

        } else {

            note.classList.add("hidden");

        }

    });

}
/* =================================
   UPLOAD NOTES SYSTEM
================================= */

function openUploadBox() {

    document.getElementById("uploadBox").style.display = "block";

    document
        .getElementById("uploadBox")
        .scrollIntoView({
            behavior: "smooth"
        });
}


function closeUploadBox() {

    document.getElementById("uploadBox").style.display = "none";

    document.getElementById("uploadStatus").innerHTML = "";
}


/* Upload Note */

function uploadNote() {

    let title =
        document
            .getElementById("noteTitle")
            .value
            .trim();

    let category =
        document
            .getElementById("noteCategory")
            .value;

    let semester =
        document
            .getElementById("noteSemester")
            .value
            .trim();

    let description =
        document
            .getElementById("noteDescription")
            .value
            .trim();

    let file =
        document
            .getElementById("noteFile")
            .files[0];

    let status =
        document.getElementById("uploadStatus");


    /* Validation */

    if (title === "") {

        status.innerHTML =
            "❌ Please enter note title.";

        status.style.color = "red";

        return;
    }


    if (category === "") {

        status.innerHTML =
            "❌ Please select subject.";

        status.style.color = "red";

        return;
    }


    if (file === undefined) {

        status.innerHTML =
            "❌ Please select a PDF file.";

        status.style.color = "red";

        return;
    }


    /* PDF Check */

    if (file.type !== "application/pdf") {

        status.innerHTML =
            "❌ Only PDF files are allowed.";

        status.style.color = "red";

        return;
    }


    /* File Size */

    if (file.size > 10 * 1024 * 1024) {

        status.innerHTML =
            "❌ PDF must be less than 10 MB.";

        status.style.color = "red";

        return;
    }


    /*
       Temporary browser version.

       This creates a local PDF URL.
    */

    let pdfURL =
        URL.createObjectURL(file);


    /* Create note */

    let note =
        document.createElement("div");

    note.className =
        "note uploaded-note";

    note.setAttribute(
        "data-category",
        category
    );


    let categoryName =
        document
            .getElementById("noteCategory")
            .options[
                document
                    .getElementById("noteCategory")
                    .selectedIndex
            ]
            .text;


    note.innerHTML = `

        <span class="category">
            ${categoryName}
        </span>

        <h3>
            📄 ${title}
        </h3>

        <p>
            ${description || "Study notes"}
        </p>

        <span class="semester">
            🎓 ${semester || "Semester not specified"}
        </span>

        <a
            href="${pdfURL}"
            target="_blank"
            class="note-btn"
        >
            📖 Open PDF
        </a>

        <button
            class="delete-note-btn"
            onclick="this.parentElement.remove()"
        >
            🗑️ Delete
        </button>

    `;


    document
        .getElementById("notesList")
        .prepend(note);


    /* Success */

    status.innerHTML =
        "✅ Notes uploaded successfully!";

    status.style.color = "green";


    /* Clear form */

    document.getElementById("noteTitle").value = "";

    document.getElementById("noteCategory").value = "";

    document.getElementById("noteSemester").value = "";

    document.getElementById("noteDescription").value = "";

    document.getElementById("noteFile").value = "";


    /* Reapply filter */

    filterNotes();

}