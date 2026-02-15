var canv = document.getElementById('myCanvas'),
    c = canv.getContext('2d');

var circles = [];
var animationId;
var isMoving = false;

var circleCount = 0; // Define a variable to keep track of the count

function Circle(x, y, dx, dy, radius, number, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.number = number;
    this.color = color;

    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        c.closePath();
        c.fillStyle = this.color;  // Set the circle color
        c.fill();

        // Draw the number inside the circle
        c.fillStyle = 'black';
        c.font = `${this.radius}px Arial`;
        c.color = 'black';
        c.textAlign = 'center';
        c.textBaseline = 'middle';
        c.fillText(this.number, this.x, this.y);
    };

    this.update = function () {
        if (this.x + this.radius > canv.width || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > canv.height || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;

        this.draw();
    };

    this.isClicked = function (mouseX, mouseY) {
        var dx = this.x - mouseX;
        var dy = this.y - mouseY;
        return dx * dx + dy * dy <= this.radius * this.radius;
    };

    this.changeColor = function (newColor) {
        this.color = newColor;
    };
}

function addCircle() {
    var radius = 20;
    var x = Math.random() * (canv.width - radius * 2) + radius;
    var y = Math.random() * (canv.height - radius * 2) + radius;
    var dx = (Math.random() - 0.5) * 4;  // Random horizontal speed
    var dy = (Math.random() - 0.5) * 4;  // Random vertical speed
    var number = Math.floor(Math.random() * 100) + 1;  // Random number between 1 and 100
    var color = document.getElementById('colorSelect').value;

    var circle = new Circle(x, y, dx, dy, radius, number, color);
    circles.push(circle);
    circle.draw(); // Draw the circle immediately after adding it

    if (!isMoving) {
        toggleMovement();
    }
}

function animate() {
    c.clearRect(0, 0, canv.width, canv.height);
    c.fillStyle = 'black';
    c.fillRect(0, 0, canv.width, canv.height);
    for (var i = 0; i < circles.length; i++) {
        circles[i].update();
    }

    animationId = requestAnimationFrame(animate);
}

function toggleMovement() {
    if (isMoving) {
        cancelAnimationFrame(animationId);
        isMoving = false;
        document.getElementById('moveButton').textContent = "Move";
    } else {
        animate();
        isMoving = true;
        document.getElementById('moveButton').textContent = "Pause";
    }
}

function pauseMovement() {
    cancelAnimationFrame(animationId);
    isMoving = false;
    document.getElementById('moveButton').textContent = "Move";
}

function resetCounter() {
    circleCount = 0;
    document.getElementById('circleCount').textContent = circleCount;
}

canv.addEventListener('click', function (event) {
    var rect = canv.getBoundingClientRect();
    var mouseX = event.clientX - rect.left;
    var mouseY = event.clientY - rect.top;
    var selectedColor = document.getElementById('colorSelect').value;

    for (var i = 0; i < circles.length; i++) {
        if (circles[i].isClicked(mouseX, mouseY)) {
            circles[i].changeColor(selectedColor);
            circles[i].draw();
            break;
        }
    }


    // Inside the click event listener for circles
    for (var i = 0; i < circles.length; i++) {
        if (circles[i].isClicked(mouseX, mouseY)) {
            circles[i].changeColor(selectedColor);
            circles[i].draw();
            circleCount += circles[i].number; // Add the number of the clicked circle to the count
            document.getElementById('circleCount').textContent = circleCount; // Update the span element
            break;
        }
    }
});
