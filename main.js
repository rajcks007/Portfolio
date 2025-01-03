let canvas = document.getElementById('dotsCanvas');
const ctx = canvas.getContext('2d');
const dots = [];
const totalDots = 100; // Increased number of dots
const blinkInterval = 2000; // Blink interval in milliseconds

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const nav = document.querySelector('nav'); // Parent container for the menu

if (hamburger) {
  // Toggle the menu when the hamburger is clicked
  hamburger.addEventListener('click', (event) => {
    navLinks.classList.toggle('active');
    event.stopPropagation(); // Stop event from bubbling up
  });
}

  // Close the menu if clicking anywhere outside of it
  document.addEventListener('click', (event) => {
    // Check if the clicked area is outside the nav menu
    if (!nav.contains(event.target)) {
      navLinks.classList.remove('active');
    }
  });

  // Close the menu when a link is clicked
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });

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

/****************************************************************************************************/

document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault(); // Prevent the default form submission

  // Get form data
  const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      subject: document.getElementById('subject').value,
      message: document.getElementById('message').value
  };

  // Send data to Google Apps Script using fetch
  fetch('https://script.google.com/macros/s/AKfycbyMDmj9ExNVt_4mfRSVqFRqoEeg68bPpAMSBuf4Nogxi_Qf6B0t4FS3MphJ3tsfU2DKhw/exec', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData) // Convert form data to JSON
  })
  .then(response => {
      if (response.ok) {
          document.getElementById('responseMessage').innerText = "Message sent successfully!";
          document.getElementById('contactForm').reset(); // Clear the form
      } else {
          document.getElementById('responseMessage').innerText = "There was an error sending your message.";
      }
  })
  .catch(error => {
      document.getElementById('responseMessage').innerText = "Network error: Could not send your message.";
      console.error("Error:", error);
  });
});

