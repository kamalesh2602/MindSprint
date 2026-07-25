export function generateSquare(max: number) {
  const a = Math.floor(Math.random() * max) + 1;

  return {
    question: `${a}²`,
    answer: a * a,
  };
}