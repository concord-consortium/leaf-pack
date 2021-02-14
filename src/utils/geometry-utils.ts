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
