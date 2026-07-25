export function generatePowers(max: number) {
    let baseMax = 10;
    let exponent = 2;

    if (max === 200) {
        baseMax = 15;
        exponent = Math.random() < 0.5 ? 2 : 3;
    }

    if (max === 999) {
        baseMax = 20;
        exponent = Math.random() < 0.5 ? 2 : 3;
    }

    const base = Math.floor(Math.random() * baseMax) + 2;

    return {
        question: `${base}^${exponent}`,
        answer: Math.pow(base, exponent),
    };
}