
let selectedMood = "";

const moodButtons = document.querySelectorAll(".mood");
const saveBtn = document.getElementById("saveBtn");
const noteInput = document.getElementById("note");
const historyList = document.getElementById("history");

// Select mood
moodButtons.forEach(button => {
    button.addEventListener("click", () => {
        moodButtons.forEach(btn => btn.classList.remove("selected"));
        button.classList.add("selected");
        selectedMood = button.dataset.mood;
    });
});

// Load saved moods
window.onload = loadMoods;

// Save mood
saveBtn.addEventListener("click", () => {
    if (selectedMood === "") {
        alert("Please select a mood!");
        return;
    }

    const note = noteInput.value;
    const date = new Date().toLocaleString();

    const moodData = {
        mood: selectedMood,
        note: note,
        date: date
    };

    let moods = JSON.parse(localStorage.getItem("moods")) || [];
    moods.push(moodData);
    localStorage.setItem("moods", JSON.stringify(moods));

    noteInput.value = "";
    selectedMood = "";
    moodButtons.forEach(btn => btn.classList.remove("selected"));

    loadMoods();
});

// Load moods function
function loadMoods() {
    historyList.innerHTML = "";
    let moods = JSON.parse(localStorage.getItem("moods")) || [];

    moods.forEach((item, index) => {
        const li = document.createElement("li");
        li.className = "history-item";
        li.innerHTML = `
            <span>${item.mood} - ${item.note} <br><small>${item.date}</small></span>
            <button class="delete-btn" onclick="deleteMood(${index})">X</button>
        `;
        historyList.appendChild(li);
    });
}

// Delete mood
function deleteMood(index) {
    let moods = JSON.parse(localStorage.getItem("moods"));
    moods.splice(index, 1);
    localStorage.setItem("moods", JSON.stringify(moods));
    loadMoods();
}