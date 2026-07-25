export function generateMultiplication(max: number) {
  let min = 2;

  if (max === 12) {
    min = 2;
  } else if (max === 30) {
    min = 10;
  } else {
    min = 20;
  }

  const a = Math.floor(Math.random() * (max - min + 1)) + min;
  const b = Math.floor(Math.random() * (max - min + 1)) + min;

  return {
    question: `${a} × ${b}`,
    answer: a * b,
  };
}