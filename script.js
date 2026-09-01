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