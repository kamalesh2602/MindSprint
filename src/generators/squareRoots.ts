export function generateSquareRoot(max: number) {
  const a = Math.floor(Math.random() * max) + 1;

  return {
    question: `√${a * a}`,
    answer: a,
  };
}