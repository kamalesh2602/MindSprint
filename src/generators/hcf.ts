function gcd(a: number, b: number): number {
    while (b !== 0) {
        [a, b] = [b, a % b];
    }

    return a;
}

export function generateHCF(max: number) {
    let baseMax = 10;
    let mulMax = 5;

    if (max === 200) {
        baseMax = 20;
        mulMax = 8;
    } else if (max === 999) {
        baseMax = 40;
        mulMax = 12;
    }

    const factor = Math.floor(Math.random() * baseMax) + 2;

    const a = factor * (Math.floor(Math.random() * mulMax) + 2);
    const b = factor * (Math.floor(Math.random() * mulMax) + 2);

    return {
        question: `HCF(${a}, ${b})`,
        answer: gcd(a, b),
    };
}