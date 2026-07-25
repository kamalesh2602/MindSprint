export function generateAddition(max: number) {
  let min = 1;

  if (max === 20) {
    min = 1;
  } else if (max === 200) {
    min = 20;
  } else {
    min = 100;
  }

  const a = Math.floor(Math.random() * (max - min + 1)) + min;
  const b = Math.floor(Math.random() * (max - min + 1)) + min;

  return {
    question: `${a} + ${b}`,
    answer: a + b,
  };
}