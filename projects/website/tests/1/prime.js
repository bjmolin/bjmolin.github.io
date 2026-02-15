// Bryan Molina
// 06/15/2024
// CPSC 3750
// Program Exam #1
// Version A

// Main function that is triggered by the START button
function makeList() {
    // Const int to ensure no decimals
    const input = parseInt(document.getElementById("numInput").value);

    // Clear the lists of any previous input
    var primeList = document.getElementById("primeList");
    var nonpList = document.getElementById("nonList");
    primeList.innerHTML = "";
    nonpList.innerHTML = "";

    // Determine which number goes where
    for (var i = 1; i < input+1; i++) {
        var entry = document.createElement('li')
        entry.appendChild(document.createTextNode(i));
        
        if (isPrime(i)) {
            primeList.appendChild(entry);
        }
        else {
            nonpList.appendChild(entry);
        }        
    }

    // Change the colors of the div holders for the lists using keyframes
    document.getElementById("primeListFormatting").classList.add('colors1');
    document.getElementById("nonPrimeListFormatting").classList.add('colors2');
}

// Prime function based off of provided link
function isPrime(n) {
    if (n <= 1) {
        return false;
    }

    for (var i = 2; i <= n / 2; i++) {
        if (n % i === 0) {
            return false;
        }
    }

    return true;
}

// Function will add up all numbers in given list
function total(listToAdd, counterLabel) {
    var list = document.getElementById(listToAdd);
    var display = document.getElementById(counterLabel);    
    var total = 0;
    // Clear label to avoid overlapping
    display.innerHTML = "";

    for (var num of list.children) {
        total += parseInt(num.textContent);
    }

    display.appendChild(document.createTextNode(`Total: ${total}`));
}