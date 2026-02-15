// initialize the counter and the array
var numbernames = 0;
var names = [];

function SortNames() {
    // Get the name from the text field
    var thename = document.theform.newname.value.trim();
    // Alert the user to not enter blank
    if (thename === "") return alert("Space must not be blank!");

    // Turn name uppercase
    var newname = thename.toUpperCase();
    // Add the name to the array
    names[numbernames] = newname;
    // Increment the counter
    numbernames++;
    // Sort the array
    names.sort();

    // Iterate and add a number to each name
    var text = "";
    for (var i = 0; i < names.length; i++) {
        text += " " + (i + 1) + ". " + names[i] + "\n";
    }

    document.theform.sorted.value = text; // Display name
    document.theform.newname.value = ""; // Clear the textbox
}

// Listener
var input = document.getElementById("input");
input.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        SortNames();
    }
});