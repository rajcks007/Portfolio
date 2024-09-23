// const canvas = document.getElementById('dotsCanvas');
// const ctx = canvas.getContext('2d');

// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;

// function drawDots() {
//     for (let i = 0; i < 100; i++) {
//         const x = Math.random() * canvas.width;
//         const y = Math.random() * canvas.height;
//         const size = Math.random() * 3;
//         ctx.beginPath();
//         ctx.arc(x, y, size, 0, Math.PI * 2);
//         ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'; // White dots with transparency
//         ctx.fill();
//     }
// }

// drawDots();
// drawDots();
// drawDots();

// window.addEventListener('resize', () => {
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;
//     ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear previous dots
//     drawDots(); // Redraw dots
// });

let canvas = document.getElementById('dotsCanvas');
const ctx = canvas.getContext('2d');
const dots = [];
const totalDots = 200; // Increased number of dots
const blinkInterval = 2000; // Blink interval in milliseconds

const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    createDots();
    drawDots();
};

const createDots = () => {
    dots.length = 0; // Clear previous dots
    for (let index = 0; index < totalDots; index++) {
        dots.push({
            x: Math.floor(Math.random() * canvas.width),
            y: Math.floor(Math.random() * canvas.height),
            size: Math.random() * 2 + 1, // Small size for star-like appearance
            visible: true // To control visibility for blinking
        });
    }
};

const drawDots = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dots.forEach(dot => {
        if (dot.visible) {
            ctx.fillStyle = '#ffffff'; // White color for star-like appearance
            ctx.beginPath();
            ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
            ctx.fill();
        }
    });
};

const handleMouseMove = (event) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawDots();
    let mouse = {
        x: event.clientX,
        y: event.clientY
    };
    dots.forEach(dot => {
        let distance = Math.sqrt((mouse.x - dot.x) ** 2 + (mouse.y - dot.y) ** 2);
        if (distance < 100) {
            ctx.strokeStyle = '#ffffff'; // White color for interaction lines
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(dot.x, dot.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
        }
    });
};

// // Blinking effect
// setInterval(() => {
//     dots.forEach(dot => {
//         dot.visible = Math.random() > 0.5; // Randomly show or hide the dot
//     });
//     drawDots();
// }, blinkInterval);

// Set canvas size and draw initial dots
resizeCanvas();
window.addEventListener('resize', resizeCanvas);
window.addEventListener('mousemove', handleMouseMove);



