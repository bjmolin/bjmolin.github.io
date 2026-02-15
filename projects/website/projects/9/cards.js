//Bryan Molina
//Program 09 
//CPSC 3750
//6 / 15 / 2024

// Define the Card object and printCard function
function printCard() {
    var nameLine = "<strong>Name: </strong>" + this.name + "<br>";
    var emailLine = "<strong>Email: </strong>" + this.email + "<br>";
    var addyLine = "<strong>Address: </strong>" + this.address + "<br>";
    var phoneLine = "<strong>Phone: </strong>" + this.phone + "<br>";
    var birthLine = "<strong>BDay: </strong>" + this.birthdate + "<hr>";
    document.write(nameLine, emailLine, addyLine, phoneLine, birthLine);
}

function Card(name, email, address, phone, birthdate) {
    this.name = name;
    this.email = email;
    this.address = address;
    this.phone = phone;
    this.birthdate = birthdate;
    this.printCard = printCard;
}

var cards = [];

function createCard() {
    // Validate the form before creating a card
    if (!verify()) {
        return;
    }

    // Get values
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var address = document.getElementById('address').value;
    var phone = document.getElementById('phone').value;
    var birthdate = document.getElementById('birthdate').value;
    var newCard = new Card(name, email, address, phone, birthdate);
    cards.push(newCard);

    // Clear user input
    document.getElementById('cardForm').reset();
    showCards();
}

// Function to display all cards
function showCards() {
    var cardsContainer = document.getElementById('cardsContainer');
    cardsContainer.innerHTML = ''; // Clear previous content

    if (cards.length === 0) {
        cardsContainer.textContent = 'No cards created yet.';
    } else {
        cards.forEach(function (card, index) {
            var cardDiv = document.createElement('div');
            cardDiv.classList.add('card');

            var nameLine = "<strong>Name: </strong>" + card.name + "<br>";
            var emailLine = "<strong>Email: </strong>" + card.email + "<br>";
            var addressLine = "<strong>Address: </strong>" + card.address + "<br>";
            var phoneLine = "<strong>Phone: </strong>" + card.phone + "<br>";
            var birthdateLine = "<strong>Birthdate: </strong>" + card.birthdate + "<br>";

            cardDiv.innerHTML = nameLine + emailLine + addressLine + phoneLine + birthdateLine + "<hr>";

            var deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.classList.add('delete-btn');
            deleteBtn.onclick = function () {
                deleteCard(index);
            };
            cardDiv.appendChild(deleteBtn);

            var cardNumber = document.createElement('div');
            cardNumber.classList.add('card-number');
            cardNumber.textContent = 'Card #' + (index + 1);
            cardDiv.appendChild(cardNumber);

            cardsContainer.appendChild(cardDiv);
        });
    }
}

// Function to toggle visibility of cards
var cardsVisible = true;

function switchCardVisibility() {
    var button = document.querySelector('.form-buttons button:nth-child(2)');
    cardsVisible = !cardsVisible;

    if (cardsVisible) {
        button.textContent = 'Hide Cards';
        showCards();
    } else {
        button.textContent = 'Show All Cards';
        document.getElementById('cardsContainer').innerHTML = '';
    }
}

// Function to delete a specific card
function deleteCard(index) {
    cards.splice(index, 1);
    showCards(); // Show updated list of cards
}

// Function to validate form inputs
function verify() {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var address = document.getElementById('address').value;
    var phone = document.getElementById('phone').value;
    var birthdate = document.getElementById('birthdate').value;

    if (!name || !email || !address || !phone || !birthdate) {
        alert('Please fill in all fields.');
        return false;
    }

    // Check if phone field contains letters and alert user
    if (!/^\d*$/.test(phone)) {
        alert('Phone number should contain only digits.');
        return false;
    }

    return true;
}
