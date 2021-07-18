export class PixelBlock {
  constructor(x, y, w, { r, g, b }) {
    this.p = createVector(x, y);
    this.w = w;

    this.rgb = { r, g, b };

    this.maxR = w * 0.25;
    this.minR = 0;

    this.minVal = 0;
    this.maxVal = 240;
  }

  draw() {
    const {
      x, y, grayVal, minVal, maxVal, maxR, minR,
    } = this;

    push();
    translate(x, y);

    const r = map(grayVal, minVal, maxVal, maxR, minR);
    ellipse(0, 0, r * 2, r * 2);

    pop();
  }

  get grayVal() {
    const { r, g, b } = this.rgb;
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }

  get x() {
    return this.p.x;
  }

  set x(x) {
    this.p.x = x;
  }

  get y() {
    return this.p.y;
  }

  set y(y) {
    this.p.y = y;
  }
}
