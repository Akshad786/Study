import { initializeApp } 
from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} 
from "https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js";


const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
let signupMode = false;

window.openLogin = function () {
    document.getElementById("loginModal").style.display = "flex";
};

window.closeLogin = function () {
    document.getElementById("loginModal").style.display = "none";
};

window.showSignup = function () {

    signupMode = true;

    document.getElementById("authTitle").textContent = "📝 Create Account";

    document.getElementById("authText").textContent =
        "Create your StudyHub account";

    document.getElementById("authButton").textContent =
        "Sign Up";

    document.querySelector(".switch-auth").innerHTML =
        `Already have an account?
        <span onclick="showLogin()">Login</span>`;

    document.getElementById("authMessage").textContent = "";
};


window.showLogin = function () {

    signupMode = false;

    document.getElementById("authTitle").textContent = "🔐 Login";

    document.getElementById("authText").textContent =
        "Login to continue to StudyHub";

    document.getElementById("authButton").textContent =
        "Login";

    document.querySelector(".switch-auth").innerHTML =
        `Don't have an account?
        <span onclick="showSignup()">Sign Up</span>`;

    document.getElementById("authMessage").textContent = "";
};


window.loginUser = async function () {

    const email =
        document.getElementById("email").value.trim();

    const password =
        document.getElementById("password").value;

    const message =
        document.getElementById("authMessage");

    if (!email || !password) {
        message.textContent =
            "Please enter email and password.";
        return;
    }

    try {

        if (signupMode) {

            await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            message.textContent =
                "✅ Account created successfully!";

        } else {

            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            message.textContent =
                "✅ Login successful!";

            setTimeout(() => {
                closeLogin();
            }, 1000);
        }

    } catch (error) {

        console.error(error);

        message.textContent =
            "❌ " + error.message;
    }
};
onAuthStateChanged(auth, (user) => {

    const loginButton =
        document.querySelector(".login-btn");

    if (!loginButton) return;

    if (user) {

        loginButton.textContent = "🚪 Logout";

        loginButton.onclick = async () => {

            await signOut(auth);

            alert("Logged out successfully.");

        };

    } else {

        loginButton.textContent = "🔐 Login";

        loginButton.onclick = openLogin;
    }

});


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