export function generateDivision() {
  const b = Math.floor(Math.random() * 10) + 1;
  const ans = Math.floor(Math.random() * 10) + 1;
  const a = b * ans;

  return {
    question: `${a} ÷ ${b}`,
    answer: ans,
  };
}