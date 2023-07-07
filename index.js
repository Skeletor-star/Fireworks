const particleCount = 200; 
const colors = ["Pink", "White", "Red", "Yellow","Green","Blue"]; 
const particles = [];

const canvas = document.getElementById('fireworkCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.radius = Math.random() * 2 + 1;
    this.velocity = Math.random() * 2 - 1;
		this.dir = Math.random() * 2*Math.PI - 1;
    this.alpha = 1;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.closePath();
    ctx.fill();
  }

  update() {
    this.x += this.velocity * Math.cos(this.dir);
    this.y += this.velocity * Math.sin(this.dir);
    this.alpha -= 0.01;
    this.radius -= 0.01;
    this.draw();
		this.velocity -= 0.001;
  }
}


function createFirework(x, y) {
  for (let i = 0; i < particleCount; i++) {
    const color = colors[Math.floor(Math.random() * colors.length)];
    const particle = new Particle(x, y, color);
    particles.push(particle);
  }
}


function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

	// The splice below adds a "1" into the particles array if the alpha or radius of the updated particle has gone below 1. 
  for (let i = 0; i < particles.length; i++) {
    particles[i].update()

    if (particles[i].alpha <= 0 || particles[i].radius <= 0) {
      particles.splice(i, 1);
      i--;
    }
  }

  requestAnimationFrame(animate);
}

canvas.addEventListener('click', function(event) {
  const mouseX = event.clientX;
  const mouseY = event.clientY;
  createFirework(mouseX, mouseY);
});


animate();



  