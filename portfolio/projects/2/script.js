// Using the canvas element to implement animated circles
var canv = document.getElementById('myCanvas'),
    c = canv.getContext('2d');

// Circle array and animation vars
var circles = [];
var animationId;
var isMoving = false;
var circleCount = 0; // Label that keeps count

function Circle(x, y, dx, dy, radius, number, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius; 
    this.number = number; // Number text
    this.color = color; // For setting the color

    this.draw = function () {
        // Drawing the circle
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        c.closePath();
        c.fillStyle = this.color; // Set the color
        c.fill();

        // Number inside the circle
        c.fillStyle = 'black';
        c.font = `${this.radius}px Arial`;
        c.color = 'black'; // Circle font color
        c.textAlign = 'center'; // Alignment
        c.textBaseline = 'middle';
        c.fillText(this.number, this.x, this.y); 
    };

    // Updating circle position
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

    // Check if circle is clicked
    this.isClicked = function (mouseX, mouseY) {
        var dx = this.x - mouseX;
        var dy = this.y - mouseY;
        return dx * dx + dy * dy <= this.radius * this.radius;
    };

    // Change circle color
    this.changeColor = function (newColor) {
        this.color = newColor;
    };
}

// Add circle at random location and set moving speed at random
function addCircle() {
    var radius = 20;
    var x = Math.random() * (canv.width - radius * 2) + radius;
    var y = Math.random() * (canv.height - radius * 2) + radius;

    // Set moving speed at random
    var dx = (Math.random() - 0.5) * 4;
    var dy = (Math.random() - 0.5) * 4;

    // Random number btw 1-100
    var number = Math.floor(Math.random() * 100) + 1;

    // Obtains selected color from list
    var color = document.getElementById('colorSelect').value;

    // Set the cricle and add to array
    var circle = new Circle(x, y, dx, dy, radius, number, color);
    circles.push(circle);
    circle.draw();

    if (!isMoving) {
        toggleMovement();
    }
}

// Animation loop
function animate() {
    // Clear canvas and set bg color
    c.clearRect(0, 0, canv.width, canv.height);
    c.fillStyle = 'black';
    c.fillRect(0, 0, canv.width, canv.height);

    // Update and draw the circles
    for (var i = 0; i < circles.length; i++) {
        circles[i].update();
    }

    animationId = requestAnimationFrame(animate);
}

// Start and pause anim
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

// Event listeners
canv.addEventListener('click', function (event) {
    var rect = canv.getBoundingClientRect();
    var mouseX = event.clientX - rect.left;
    var mouseY = event.clientY - rect.top;
    var selectedColor = document.getElementById('colorSelect').value;

    // Find circle that was clicked
    for (var i = 0; i < circles.length; i++) {
        if (circles[i].isClicked(mouseX, mouseY)) {
            circles[i].changeColor(selectedColor);
            circles[i].draw();
            circleCount += circles[i].number; 
            document.getElementById('circleCount').textContent = circleCount; // Update the span element
            break;
        }
    }
});