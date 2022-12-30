const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const wWidth = window.innerWidth;
const wHeight = window.innerHeight;

canvas.width = wWidth;
canvas.height = wHeight;

class Circle {
  constructor(xPos, yPos, radius = '10', color = 'black', text = '') {
    this.xPos = xPos;
    this.yPos = yPos;
    this.radius = radius;
    this.color = color;
    this.text = text;
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
}

const circle = new Circle(120, 130, 30, 'red', '1');

circle.draw(ctx);

