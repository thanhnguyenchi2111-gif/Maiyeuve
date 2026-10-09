const canvas = document.getElementById('space-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let stars = [];
const numStars = 200;

function resizeCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Star {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.size = Math.random() * 2 + 0.5;
    this.speed = Math.random() * 3 + 1;
    this.length = Math.random() * 15 + 5;
    this.opacity = Math.random() * 0.8 + 0.2;
  }

  update() {
    this.x += this.speed * 1.5;
    this.y += this.speed;

    if (this.x > width || this.y > height) {
      if (Math.random() > 0.5) {
        this.x = Math.random() * width;
        this.y = -10;
      } else {
        this.x = -10;
        this.y = Math.random() * height;
      }
      this.speed = Math.random() * 3 + 1;
    }
  }

  draw() {
    ctx.beginPath();
    ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity})`;
    ctx.lineWidth = this.size;
    ctx.lineCap = 'round';
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x - this.length * 1.2, this.y - this.length);
    ctx.stroke();
  }
}

for (let i = 0; i < numStars; i++) {
  stars.push(new Star());
}

function animate() {
  ctx.fillStyle = 'rgba(3, 7, 18, 0.3)';
  ctx.fillRect(0, 0, width, height);

  stars.forEach(star => {
    star.update();
    star.draw();
  });

  requestAnimationFrame(animate);
}

animate();
