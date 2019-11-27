# Calculate the distance between two elements using the Pythagorean Theorem 

```javascript
// Reference: https://stackoverflow.com/a/17628488/2465549
const getCenterPosition = element => {
  const { top, left, width, height } = element.getBoundingClientRect();

  return {
    x: left + width / 2,
    y: top + height / 2
  };
};

const getDistance = (elementA, elementB) => {
  const elementAPos = getCenterPosition(elementA);
  const elementBPos = getCenterPosition(elementB);

  return Math.hypot(elementAPos.x - elementBPos.y, elementAPos.y - elementBPos.x);
};
```