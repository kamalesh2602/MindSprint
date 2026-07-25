export function generatePercentage(max: number) {
    const percents = [5, 10, 20, 25, 50, 75];

    const percent =
        percents[Math.floor(Math.random() * percents.length)];

    let multiplier = 1;

    if (max === 200) multiplier = 2;
    if (max === 999) multiplier = 5;

    const base =
        (Math.floor(Math.random() * 20) + 1) * 20 * multiplier;

    return {
        question: `${percent}% of ${base}`,
        answer: (percent * base) / 100,
    };
}