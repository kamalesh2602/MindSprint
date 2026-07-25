export function generateDivision(max: number) {
  let divisorMin = 2;
  let divisorMax = 10;
  let answerMin = 2;
  let answerMax = 10;

  if (max === 20) {
    divisorMax = 10;
    answerMax = 10;
  } else if (max === 200) {
    divisorMin = 10;
    divisorMax = 20;
    answerMin = 5;
    answerMax = 20;
  } else {
    divisorMin = 20;
    divisorMax = 50;
    answerMin = 10;
    answerMax = 30;
  }

  const divisor =
    Math.floor(Math.random() * (divisorMax - divisorMin + 1)) + divisorMin;

  const answer =
    Math.floor(Math.random() * (answerMax - answerMin + 1)) + answerMin;

  const dividend = divisor * answer;

  return {
    question: `${dividend} ÷ ${divisor}`,
    answer,
  };
}