const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const wWidth = window.innerWidth;
const wHeight = window.innerHeight;

canvas.width = wWidth;
canvas.height = wHeight;

function scaleCanvas(
  canvas,
  context,
  width,
  height
) {
  // Handle window for SSR
  if (typeof window === 'undefined') return null
  
  // determine the actual ratio we want to draw at
  const ratio = window.devicePixelRatio || 1

  if (devicePixelRatio !== 1) {
    // set the 'real' canvas size to the higher width/height
    canvas.width = width * ratio
    canvas.height = height * ratio

    // ...then scale it back down with CSS
    canvas.style.width = width + 'px'
    canvas.style.height = height + 'px'
  } else {
    // this is a normal 1:1 device; just scale it simply
    canvas.width = width
    canvas.height = height
    canvas.style.width = ''
    canvas.style.height = ''
  }

  // scale the drawing context so everything will work at the higher ratio
  context.scale(ratio, ratio)
}
scaleCanvas(canvas, ctx, wWidth, wHeight);

class Circle {
  constructor(xPos, yPos, radius = '10', color = 'black', text = '') {
    this.xPos = xPos;
    this.yPos = yPos;
    this.radius = radius;
    this.color = color;
    this.text = text;

    this.dX = 1;
    this.dY = 1;
  }

  draw(ctx) {
    ctx.beginPath();

    // text
    ctx.strokeStyle = this.color;
    ctx.textAlign = 'center';
    ctx.textBaseLine = 'middle';
    ctx.font = '20px Arial';
    ctx.fillText(this.text, this.xPos, this.yPos);

    // circle
    ctx.lineWidth = 5;
    ctx.arc(this.xPos, this.yPos, this.radius, 0, Math.PI * 2, false);
    ctx.stroke();

    ctx.closePath();
  }
  detectCollision() {
    const x = this.xPos + this.radius+10;
    const y = this.yPos + this.radius+10;
    if(x > wWidth) {
      this.dX = -1;
    }
    if(x < 0 + this.radius) {
      this.dX = 1;
    }
    if(y > wHeight) {
      this.dY = -1;
    }
    if(y < 0 + this.radius) {
      this.dY = 1;
    }
  }
  update(ctx) {
    ctx.clearRect(0, 0, wWidth, wHeight);
    this.detectCollision();
    this.xPos+=this.dX;
    this.yPos+=this.dY;
    this.draw(ctx)
  }
}

const circle = new Circle(120, 130, 30, 'red', '1');

const refresh = () => {
  requestAnimationFrame(refresh);
  circle.update(ctx)
}

refresh();

