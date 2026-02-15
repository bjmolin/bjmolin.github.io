/*
Jared Alvarado
CPSC 3750
07/13/24
Prog12: AJAX & PHP
*/
var t;

function startSearch() { // Starts search.
    if (t) window.clearTimeout(t);
    t = window.setTimeout(liveSearch, 200);
}

function liveSearch() { //Searches php file and prints results.
    var ul = document.getElementById("list");
    var query = document.getElementById("searchlive").value;

    if (query !== "") {
        var filename = "search.php?query=" + encodeURIComponent(query);
        ajaxCallback = displayResults; // Assign function without invoking it
        ajaxRequest(filename);
    } else {
        ul.innerHTML = "<li>[Search results will display here.]</li>";

    }
}

function ajaxRequest(filename) { // Request data from php using get and file name.
    var ajaxreq;
    try {
        ajaxreq = new XMLHttpRequest();
    } catch (error) {
        alert("Your browser doesn't support AJAX!");
        return false;
    }
    ajaxreq.onreadystatechange = function () {
        if (ajaxreq.readyState == 4 && ajaxreq.status == 200) {
            ajaxCallback(ajaxreq);
        }
    };
    ajaxreq.open("GET", filename, true);
    ajaxreq.send(null);
}

function displayResults(ajaxreq) { // Function used to display results.
    var ul = document.getElementById("list");
    var div = document.getElementById("results");
    if (ul) {
        div.removeChild(ul);
    }

    ul = document.createElement("ul");
    ul.id = "list";
    var names = ajaxreq.responseXML.getElementsByTagName("name");
    for (var i = 0; i < names.length; i++) {
        var li = document.createElement("li");
        var name = names[i].firstChild.nodeValue;
        var text = document.createTextNode(name);
        li.appendChild(text);
        ul.appendChild(li);
    }
    if (names.length == 0) {
        var li = document.createElement("li");
        li.appendChild(document.createTextNode("No results"));
        ul.appendChild(li);
    }
    div.appendChild(ul);
}

document.addEventListener('DOMContentLoaded', function () {
    var obj = document.getElementById("searchlive");
    obj.onkeyup = liveSearch; // When key is up the display is updated using the input.
    prevent
});

/*-------------------------------------------------Calculate distance--------------------------------------------------------------------*/
function sendRequest(zipCode1, zipCode2) {
    var xmlReq = new XMLHttpRequest();
    xmlReq.open('POST', 'calculate.php', true);
    xmlReq.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xmlReq.onload = function () {
        if (this.status == 200) {
            document.getElementById('dispayNumbers').innerHTML = "<p>" + this.responseText + "<\p>";
        }
    };
    xmlReq.send('zipCode1=' + zipCode1 + '&zipCode2=' + zipCode2);
}

document.getElementById('numberBTN').addEventListener('click', function () {
    var zipCode1 = document.getElementById('zipcode1').value;
    var zipCode2 = document.getElementById('zipcode2').value;
    sendRequest(zipCode1, zipCode2);
});




document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('form').addEventListener('submit', function (event) {
        event.preventDefault();
    });
});