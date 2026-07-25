export function generateSubtraction(max: number) {
  let a = Math.floor(Math.random() * max) + 1;
  let b = Math.floor(Math.random() * max) + 1;

  if (b > a) {
    [a, b] = [b, a];
  }

  return {
    question: `${a} - ${b}`,
    answer: a - b,
  };
}