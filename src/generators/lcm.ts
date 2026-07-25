function gcd(a: number, b: number): number {
    while (b !== 0) {
        [a, b] = [b, a % b];
    }

    return a;
}

function lcm(a: number, b: number): number {
    return (a * b) / gcd(a, b);
}

export function generateLCM(max: number) {
    let baseMin = 2;
    let baseMax = 10;
    let mulMax = 5;

    if (max === 200) {
        baseMax = 20;
        mulMax = 8;
    } else if (max === 999) {
        baseMax = 40;
        mulMax = 12;
    }

    const factor =
        Math.floor(Math.random() * (baseMax - baseMin + 1)) + baseMin;

    const a = factor * (Math.floor(Math.random() * mulMax) + 2);
    const b = factor * (Math.floor(Math.random() * mulMax) + 2);

    return {
        question: `LCM(${a}, ${b})`,
        answer: lcm(a, b),
    };
}