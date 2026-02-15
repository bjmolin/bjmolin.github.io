alert("Please exit website if you are sensitive to flashing lights such as those with Photosensitive epilepsy");
if (confirm("Are you sure you want to continue?")) {
    const boundaryContainer1 = document.getElementById('boundaryContainer1');
    const boundaryContainer2 = document.getElementById('boundaryContainer2');
    const boundaryContainer3 = document.getElementById('boundaryContainer3');
    const container1 = document.getElementById('buttonContainer1');
    const container2 = document.getElementById('buttonContainer2');
    const container3 = document.getElementById('buttonContainer3');

    document.body.addEventListener('click', function (e) {
        if (e.target.tagName === 'BUTTON') return;

        if (e.target === container1 || boundaryContainer1.contains(e.target)) {
            addDiv(e.clientX - boundaryContainer1.offsetLeft, e.clientY - boundaryContainer1.offsetTop, container1, boundaryContainer1);
        } else if (e.target === container2 || boundaryContainer2.contains(e.target)) {
            addDiv(e.clientX - boundaryContainer2.offsetLeft, e.clientY - boundaryContainer2.offsetTop, container2, boundaryContainer2);
        } else if (e.target === container3 || boundaryContainer3.contains(e.target)) {
            addDiv(e.clientX - boundaryContainer3.offsetLeft, e.clientY - boundaryContainer3.offsetTop, container3, boundaryContainer3);
        }
    });

    var currentColor = "red"; // Variable used to represent the selected color, default button color is red;
    const elementList = []; // Array used to hold all buttons.

    var id = null; // Id will represent the interval timer.
    let isClicked = false; // Bool used to tell state of move button.
    clearInterval(id);

    function myMove() { // Function is in charge of pausing and starting buttons motion.
        const selectElement = document.getElementById("moveBtn"); // Gets moveBtn element.
        if (isClicked == false) { // If button is not clicked then interval is set to 1ms, inner html set to "Pause" and isClicked set to true.
            id = setInterval(frame, 1);
            isClicked = true;
            selectElement.innerHTML = "Pause"
        }
        else if (isClicked == true) { // If button is clicked then interval is cleared to stop movement, isClicked set to true and inner html set to "move"
            clearInterval(id);
            isClicked = false;
            selectElement.innerHTML = "Move"
        }
    }

    function frame() { // This function is responsible for moving the buttons within the boundary.
        for (let i = 0; i < elementList.length; i++) { // For loop iterates through all buttons in element list.
            const boundaryContainer = elementList[i].boundaryContainer;
            const boundaryWidth = boundaryContainer.clientWidth;
            const boundaryHeight = boundaryContainer.clientHeight;

            if (elementList[i].xDirection == true) { // If xDirection is true then the button position will increment. 
                elementList[i].elem.style.left = elementList[i].xPosition + 'px'; // Style used to change button position.
                elementList[i].xPosition++;
            }
            else { // Else the button position will be subtracted by one.
                elementList[i].elem.style.left = elementList[i].xPosition + 'px';
                elementList[i].xPosition--;
            }

            if (elementList[i].yDirection == true) {// If yDirection is true then the button position will increment. 
                elementList[i].elem.style.top = elementList[i].yPosition + 'px';
                elementList[i].yPosition++;
            }
            else { // Else the button position will be subtracted by one.
                elementList[i].elem.style.top = elementList[i].yPosition + 'px';
                elementList[i].yPosition--;
            }

            if (elementList[i].xPosition >= boundaryWidth - 40) { // Bounce off right edge
                elementList[i].xDirection = false;
            }
            if (elementList[i].xPosition <= 0) {  // Bounce off left edge
                elementList[i].xDirection = true;
            }

            if (elementList[i].yPosition >= boundaryHeight - 40) { // Bounce off bottom edge
                elementList[i].yDirection = false;
            }
            if (elementList[i].yPosition <= 0) { // Bounce off top edge
                elementList[i].yDirection = true;
            }

            var randomColor = Math.floor(Math.random() * 16777215).toString(16);
            elementList[i].elem.style.backgroundColor = "#" + randomColor;
        }
    }

    function addDiv(clientX, clientY, container, boundaryContainer) { // This function is responsible for adding buttons to the page.
        var textColor = "white"; // Variable used to represent button text color, default white.

        const newBTN = document.createElement('button'); // New button is created using document create element.
        const tempBTN = {}; // Temp object is created to hold each individual button attributes.

        tempBTN.elem = newBTN; // Elem attribute hold the button element.
        tempBTN.elem.className = 'sty'; // CSS class is added to button element for styling.
        tempBTN.elem.style.backgroundColor = currentColor; // Button background color is set using current color.
        tempBTN.elem.style.color = textColor; // Button text color is set using text color.

        tempBTN.xDirection = Math.floor(Math.random() * 2); // xDirection is used to store button x direction, random direction is set using math random.
        tempBTN.yDirection = Math.floor(Math.random() * 2); // yDirection is used to store button y direction, random direction is set using math random.

        tempBTN.xPosition = clientX; // Set initial x position to the click coordinates
        tempBTN.yPosition = clientY; // Set initial y position to the click coordinates

        tempBTN.boundaryContainer = boundaryContainer; // Set the boundary container

        var letter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
        tempBTN.elem.innerHTML = letter;
        tempBTN.elem.style.position = 'absolute';
        tempBTN.elem.style.left = `${clientX}px`;
        tempBTN.elem.style.top = `${clientY}px`;
        container.appendChild(tempBTN.elem); // Button is appended to the respective container element.
        elementList.push(tempBTN); // Button is added to element list.

        // Add drag functionality
        let offsetX, offsetY;
        tempBTN.elem.addEventListener('mousedown', function (e) {
            offsetX = e.clientX - tempBTN.elem.getBoundingClientRect().left;
            offsetY = e.clientY - tempBTN.elem.getBoundingClientRect().top;
            tempBTN.elem.style.cursor = 'grabbing';

            function mouseMoveHandler(e) {
                tempBTN.elem.style.left = `${e.clientX - offsetX}px`;
                tempBTN.elem.style.top = `${e.clientY - offsetY}px`;
            }

            function mouseUpHandler(e) {
                window.removeEventListener('mousemove', mouseMoveHandler);
                window.removeEventListener('mouseup', mouseUpHandler);
                tempBTN.elem.style.cursor = 'grab';

                // Determine the new boundary container
                if (e.clientX > boundaryContainer1.offsetLeft && e.clientX < boundaryContainer1.offsetLeft + boundaryContainer1.clientWidth &&
                    e.clientY > boundaryContainer1.offsetTop && e.clientY < boundaryContainer1.offsetTop + boundaryContainer1.clientHeight) {
                    tempBTN.boundaryContainer = boundaryContainer1;
                    container1.appendChild(tempBTN.elem);
                } else if (e.clientX > boundaryContainer2.offsetLeft && e.clientX < boundaryContainer2.offsetLeft + boundaryContainer2.clientWidth &&
                    e.clientY > boundaryContainer2.offsetTop && e.clientY < boundaryContainer2.offsetTop + boundaryContainer2.clientHeight) {
                    tempBTN.boundaryContainer = boundaryContainer2;
                    container2.appendChild(tempBTN.elem);
                } else if (e.clientX > boundaryContainer3.offsetLeft && e.clientX < boundaryContainer3.offsetLeft + boundaryContainer3.clientWidth &&
                    e.clientY > boundaryContainer3.offsetTop && e.clientY < boundaryContainer3.offsetTop + boundaryContainer3.clientHeight) {
                    tempBTN.boundaryContainer = boundaryContainer3;
                    container3.appendChild(tempBTN.elem);
                }

                // Update the xPosition and yPosition when the drag ends
                tempBTN.xPosition = e.clientX - tempBTN.boundaryContainer.offsetLeft - offsetX;
                tempBTN.yPosition = e.clientY - tempBTN.boundaryContainer.offsetTop - offsetY;
            }

            window.addEventListener('mousemove', mouseMoveHandler);
            window.addEventListener('mouseup', mouseUpHandler);
        });
    }
} else {
    location.replace("https://www.google.com");
}
