import { useEffect, useMemo, useRef, useState } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { THEME } from "../constants/theme";

import {
    generateAddition,
    generateSubtraction,
    generateMultiplication,
    generateDivision,
    generateSquare,
    generateSquareRoot,
    generateCube,
    generateCubeRoot,
    generateHCF,
    generateLCM,
    generatePercentage,
    generateAverage,
    generatePowers,
} from "../generators";

type Operation =
    | "+"
    | "-"
    | "*"
    | "/"
    | "sq"
    | "sqrt"
    | "cube"
    | "cuberoot"
    | "hcf"
    | "lcm"
    | "percentage"
    | "average"
    | "powers";

function rand(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRange(diff: string) {
    switch (diff) {
        case "Easy":
            return 20;

        case "Medium":
            return 200;

        case "Hard":
            return 999;

        default:
            return 20;
    }
}

function generateQuestions(settings: any) {
    const list: Operation[] = [];

    if (settings.addition) list.push("+");
    if (settings.subtraction) list.push("-");
    if (settings.multiplication) list.push("*");
    if (settings.division) list.push("/");
    if (settings.squares) list.push("sq");
    if (settings.squareRoots) list.push("sqrt");
    if (settings.cubes) list.push("cube");
    if (settings.cubeRoots) list.push("cuberoot");
    if (settings.hcf) list.push("hcf");
    if (settings.lcm) list.push("lcm");
    if (settings.percentage) list.push("percentage");
    if (settings.average) list.push("average");
    if (settings.powers) list.push("powers");

    if (list.length === 0) list.push("+");

    const max = getRange(settings.difficulty);

    return Array.from({ length: settings.count }, () => {
        const op = list[rand(0, list.length - 1)];

        switch (op) {
            case "+":
                return generateAddition(max);

            case "-":
                return generateSubtraction(max);

            case "*":
                return generateMultiplication(
                    settings.difficulty === "Easy"
                        ? 12
                        : settings.difficulty === "Medium"
                            ? 30
                            : 99
                );

            case "/":
                return generateDivision(max);

            case "sq":
                return generateSquare(
                    settings.difficulty === "Easy"
                        ? 15
                        : settings.difficulty === "Medium"
                            ? 25
                            : 50
                );

            case "sqrt":
                return generateSquareRoot(
                    settings.difficulty === "Easy"
                        ? 15
                        : settings.difficulty === "Medium"
                            ? 25
                            : 50
                );

            case "cube":
                return generateCube(
                    settings.difficulty === "Easy"
                        ? 8
                        : settings.difficulty === "Medium"
                            ? 12
                            : 20
                );

            case "cuberoot":
                return generateCubeRoot(
                    settings.difficulty === "Easy"
                        ? 8
                        : settings.difficulty === "Medium"
                            ? 12
                            : 20
                );
            case "hcf":
                return generateHCF(max);

            case "lcm":
                return generateLCM(max);

            case "percentage":
                return generatePercentage(max);

            case "average":
                return generateAverage(max);

            case "powers":
                return generatePowers(max);
            default:
                return generateAddition(max);
        }
    });
}

export default function WorkoutScreen({ navigation, route }: any) {
    const settings = route.params.settings;

    const questions = useMemo(
        () => generateQuestions(settings),
        [settings]
    );

    const [current, setCurrent] = useState(0);
    const [answer, setAnswer] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(0);

    const startTime = useRef(Date.now());
    const inputRef = useRef<TextInput>(null);

    const q = questions[current];

    const isCorrect = Number(answer.trim()) === q.answer;

    useEffect(() => {
        const timer = setTimeout(() => {
            inputRef.current?.focus();
        }, 200);

        return () => clearTimeout(timer);
    }, []);

    function nextQuestion(correct: boolean) {
        const newScore = correct ? score + 1 : score;

        if (current === questions.length - 1) {
            navigation.replace("Result", {
                score: newScore,
                total: questions.length,
                time: Math.floor(
                    (Date.now() - startTime.current) / 1000
                ),
            });

            return;
        }

        setScore(newScore);
        setCurrent((c) => c + 1);
        setAnswer("");
        setSubmitted(false);

        setTimeout(() => {
            inputRef.current?.focus();
        }, 100);
    }

    function submitAnswer() {
        if (submitted) return;

        const userAnswer = Number(answer.trim());

        if (answer.trim() === "" || Number.isNaN(userAnswer))
            return;

        const correct = userAnswer === q.answer;

        setSubmitted(true);

        const delay = correct ? 800 : 1800;

        setTimeout(() => {
            nextQuestion(correct);
        }, delay);
    }

    const percentage =
        ((current + 1) / questions.length) * 100;

    return (
        <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: THEME.colors.background }}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <View style={styles.container}>
                <View style={styles.progressBar}>
                    <View
                        style={[
                            styles.progressFill,
                            {
                                width: `${percentage}%`,
                            },
                        ]}
                    />
                </View>

                <Text style={styles.counter}>
                    // QUESTION {current + 1} OF {questions.length}
                </Text>

                <Text style={styles.question}>
                    {q.question} = ?
                </Text>

                <TextInput
                    ref={inputRef}
                    style={styles.input}
                    value={answer}
                    autoFocus
                    blurOnSubmit={false}
                    returnKeyType="done"
                    editable={!submitted}
                    keyboardType="numeric"
                    placeholderTextColor="#5a5b7d"
                    placeholder="Answer"
                    onChangeText={setAnswer}
                    onSubmitEditing={submitAnswer}
                />

                {submitted &&
                    (isCorrect ? (
                        <Text style={styles.correct}>
                            ✅ CORRECT
                        </Text>
                    ) : (
                        <View style={styles.feedback}>
                            <Text style={styles.wrong}>
                                ❌ INCORRECT
                            </Text>

                            <Text style={styles.feedbackText}>
                                CORRECT ANSWER: {q.answer}
                            </Text>
                        </View>
                    ))}
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        justifyContent: "center",
        backgroundColor: THEME.colors.background,
    },

    progressBar: {
        width: "100%",
        height: 6,
        backgroundColor: THEME.colors.cardBg,
        borderRadius: 0,
        borderColor: THEME.colors.primary,
        borderWidth: 1,
        overflow: "hidden",
        marginBottom: 20,
    },

    progressFill: {
        height: "100%",
        backgroundColor: THEME.colors.primary,
    },

    counter: {
        fontFamily: THEME.typography.fontFamily,
        textAlign: "center",
        fontSize: 14,
        color: THEME.colors.accent,
        letterSpacing: 2,
        marginBottom: 20,
    },

    question: {
        fontFamily: THEME.typography.fontFamily,
        textAlign: "center",
        fontSize: 38,
        color: "#ffffff",
        letterSpacing: 2,
        marginBottom: 35,
        textShadowColor: THEME.colors.secondary,
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 1,
    },

    input: {
        fontFamily: THEME.typography.fontFamily,
        borderWidth: 2,
        borderColor: THEME.colors.primary,
        borderRadius: 0,
        backgroundColor: THEME.colors.cardBg,
        padding: 16,
        fontSize: 28,
        color: THEME.colors.primary,
        textAlign: "center",
        marginBottom: 25,
    },

    correct: {
        fontFamily: THEME.typography.fontFamily,
        color: THEME.colors.correct,
        fontSize: 22,
        letterSpacing: 2,
        textAlign: "center",
        marginTop: 20,
    },

    wrong: {
        fontFamily: THEME.typography.fontFamily,
        color: THEME.colors.wrong,
        fontSize: 22,
        letterSpacing: 2,
        textAlign: "center",
    },

    feedback: {
        alignItems: "center",
        marginTop: 20,
    },

    feedbackText: {
        fontFamily: THEME.typography.fontFamily,
        marginTop: 10,
        fontSize: 16,
        color: THEME.colors.accent,
        letterSpacing: 1.5,
    },
});