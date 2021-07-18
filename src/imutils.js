import { PixelBlock } from './pixelBlock.js';

export const constrainImgDims = (img, maxMinDim = 512) => {
  const { width: w, height: h } = img;
  const minDim = min([w, h]);
  if (minDim <= maxMinDim) return;

  let newW;
  let newH;
  if (w < +h) {
    newW = maxMinDim;
    newH = maxMinDim * (h / w);
  } else {
    newH = maxMinDim;
    newW = maxMinDim * (w / h);
  }

  img.resize(newW, newH);
};

export const imgToPixelBlocks = (img, imgScl = 3) => {
  const pixelBlocks = [];

  const newW = int(img.width / imgScl);
  const newH = int(img.height / imgScl);
  img.resize(newW, newH);

  img.loadPixels();
  for (let y = 0; y < img.height; y += 1) {
    for (let x = 0; x < img.width; x += 1) {
      const index = (x + y * img.width) * 4;
      let r = img.pixels[index + 0];
      let g = img.pixels[index + 1];
      let b = img.pixels[index + 2];
      const a = img.pixels[index + 3];

      if (a === 0) {
        // eslint-disable-next-line no-multi-assign
        r = g = b = 0;
      }

      const pb = new PixelBlock(x * imgScl, y * imgScl, imgScl, { r, g, b });
      pixelBlocks.push(pb);
    }
  }

  return pixelBlocks;
};
