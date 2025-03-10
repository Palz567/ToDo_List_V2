const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    if(inputBox.value === ''){
        alert("You must write something!");
    }    
    else{ 
        let li= document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span= document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
}

listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
    }
    else if (e.target.tagName === "SPAN") {
        e.target.parentElement.classList.add("removing"); // Add animation class
        setTimeout(() => {
            e.target.parentElement.remove();
            saveData();
        }, 300); // Delay removal for smooth animation
    }
    
}, false);

function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}
function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask();

// This is little complicated code for me 
function clearCompleted() {
    let completedTasks = document.querySelectorAll("#list-container li.checked"); // Select all checked tasks
    
    completedTasks.forEach((task) => {
        task.classList.add("removing"); // Add animation class
    });

    setTimeout(() => {
        completedTasks.forEach((task) => task.remove()); // Remove after animation
        saveData(); // Save the updated list
    }, 300); // Wait for 300ms before removing tasks (same as CSS animation)
}

inputBox.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});


