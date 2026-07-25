export function generateMultiplication(max: number) {
  const a = Math.floor(Math.random() * max) + 1;
  const b = Math.floor(Math.random() * max) + 1;

  return {
    question: `${a} × ${b}`,
    answer: a * b,
  };
}