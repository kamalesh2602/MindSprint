export function generateSubtraction(max: number) {
  let min = 1;

  if (max === 20) {
    min = 1;
  } else if (max === 200) {
    min = 20;
  } else {
    min = 100;
  }

  let a = Math.floor(Math.random() * (max - min + 1)) + min;
  let b = Math.floor(Math.random() * (max - min + 1)) + min;

  if (b > a) {
    [a, b] = [b, a];
  }

  return {
    question: `${a} - ${b}`,
    answer: a - b,
  };
}