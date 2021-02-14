export const calculateRotatedBoundingBox = (width: number, height: number, angleInDegrees: number) => {
  const angleInRadians = angleInDegrees * Math.PI / 180;
  const corners = [{x: 0, y: 0}, {x: width, y: 0}, {x: width, y: height}, {x: 0, y: height}];
  const rotatedCorners = corners.map((corner) => {
    return (
      {x: corner.x * Math.cos(angleInRadians) - corner.y * Math.sin(angleInRadians),
       y: corner.x * Math.sin(angleInRadians) + corner.y * Math.cos(angleInRadians)}
    );
  });
  const xCorners = rotatedCorners.map((corner) => corner.x);
  const yCorners = rotatedCorners.map((corner) => corner.y);
  const rotatedWidth = Math.max(...xCorners) - Math.min(...xCorners);
  const rotatedHeight = Math.max(...yCorners) - Math.min(...yCorners);
  return {width: rotatedWidth, height: rotatedHeight};
};

export const calculateBoundedPosition = (left: number, top: number, width: number, height: number,
  maxX: number, minX: number, maxY: number, minY: number) => {
  let newLeft = left;
  if ((newLeft + .5 * width) > maxX) {
    newLeft = maxX - .5 * width;
  } else if ((newLeft + .5 * width) < minX) {
    newLeft = minX - .5 * width;
  }
  let newTop = top;
  if ((newTop  + .5 * height) > maxY) {
    newTop = maxY - .5 * height;
  } else if ((newTop  + .5 * height) < minY) {
    newTop = minY - .5 * height;
  }
  return {left: newLeft, top: newTop};
};

export const getRandomInteger = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
};
