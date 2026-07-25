export function generateAverage(max: number) {
    const a = Math.floor(Math.random() * max) + 1;
    const b = Math.floor(Math.random() * max) + 1;
    const c = Math.floor(Math.random() * max) + 1;

    const sum = a + b + c;
    const remainder = sum % 3;

    const c2 = c + (3 - remainder) % 3;

    return {
        question: `Avg(${a}, ${b}, ${c2})`,
        answer: (a + b + c2) / 3,
    };
}