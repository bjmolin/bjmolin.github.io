/*Bryan Molina
Program 10
CPSC 3750
6/29/2024*/

// Load the navbar
fetch('../../navbar.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('navi').innerHTML = data;
    });

function displayKey(e) {
    // Which key was pressed?
    if (e.keyCode) {
        var keycode = e.keyCode;
    } else {
        var keycode = e.which;
    }
    char = String.fromCharCode(keycode);
    
    // Find the object for the destination paragraph
    var keysParagraph = document.getElementById('keys');
    var bgColor = document.getElementById('change-bg');

    // Change the element color when R, G, or B are pressed
    if (colorCheck(char)) {
        document.getElementById('change-bg').style.backgroundColor = colorCheck(char);
        document.getElementById('change-color').style.color = 'white';
        document.getElementById('head1').style.color = 'yellow';
    }
        
    // If a vowel is pressed, it is always uppercase
    if (vowelCheck(char)) {
        // add the character to the paragraph
        keysParagraph.innerHTML += char.toUpperCase();
    } else {
        keysParagraph.innerHTML += char;
    }
}

function vowelCheck(char) {
    const vowelList = [ 'a', 'e', 'i', 'o', 'u' ];
    return vowelList.includes(char.toLowerCase());
}

function colorCheck(char) {
    switch (char.toLowerCase()) {
        case 'r':
            return 'red';
        case 'g':
            return 'green';
        case 'b':
            return 'blue';
        default:
            return null;
    }
}