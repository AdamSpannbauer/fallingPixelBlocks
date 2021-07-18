/* globals SVG */
import { constrainImgDims, imgToPixelBlocks } from './src/imutils.js';

let img;
const imgPath = './sonofman.jpg';

const imgScl = 5;
let pixelBlocks;

window.preload = () => {
  img = loadImage(imgPath);
};

window.setup = () => {
  constrainImgDims(img);
  createCanvas(img.width, img.height, SVG);

  noFill();
  stroke(0);
  strokeWeight(2);

  pixelBlocks = imgToPixelBlocks(img, imgScl);
};

window.draw = () => {
  clear();
  pixelBlocks.forEach((pb) => pb.draw());
  noLoop();
};
