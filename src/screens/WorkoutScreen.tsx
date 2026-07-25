import { useEffect, useMemo, useRef, useState } from "react";
import {
    View,
    Text,
    TextInput,
    Pressable,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
} from "react-native";

import {
    generateAddition,
    generateSubtraction,
    generateMultiplication,
    generateDivision,
    generateSquare,
    generateSquareRoot,
    generateCube,
    generateCubeRoot,
} from "../generators";

type Operation =
    | "+"
    | "-"
    | "*"
    | "/"
    | "sq"
    | "sqrt"
    | "cube"
    | "cuberoot";

function rand(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRange(diff: string) {
    switch (diff) {
        case "Easy":
            return 20;
        case "Medium":
            return 100;
        case "Hard":
            return 1000;
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
                        ? 10
                        : settings.difficulty === "Medium"
                            ? 20
                            : 50
                );

            case "/":
                return generateDivision();

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
            style={{ flex: 1 }}
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
                    Question {current + 1} of {questions.length}
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
                    onChangeText={setAnswer}
                    onSubmitEditing={submitAnswer}
                />

                {submitted &&
                    (isCorrect ? (
                        <Text style={styles.correct}>
                            ✅ Correct
                        </Text>
                    ) : (
                        <View style={styles.feedback}>
                            <Text style={styles.wrong}>
                                ❌ Incorrect
                            </Text>

                            <Text style={styles.feedbackText}>
                                Correct Answer: {q.answer}
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
        backgroundColor: "#fff",
    },

    progressBar: {
        width: "100%",
        height: 8,
        backgroundColor: "#E5E7EB",
        borderRadius: 10,
        overflow: "hidden",
        marginBottom: 18,
    },

    progressFill: {
        height: "100%",
        backgroundColor: "#2563EB",
    },

    counter: {
        textAlign: "center",
        fontSize: 18,
        color: "#666",
        marginBottom: 20,
    },

    question: {
        textAlign: "center",
        fontSize: 42,
        fontWeight: "700",
        marginBottom: 35,
    },

    input: {
        borderWidth: 1,
        borderColor: "#D1D5DB",
        borderRadius: 12,
        padding: 16,
        fontSize: 28,
        textAlign: "center",
        marginBottom: 25,
    },

    correct: {
        color: "#16A34A",
        fontSize: 28,
        fontWeight: "700",
        textAlign: "center",
        marginTop: 20,
    },

    wrong: {
        color: "#DC2626",
        fontSize: 28,
        fontWeight: "700",
        textAlign: "center",
    },

    feedback: {
        alignItems: "center",
        marginTop: 20,
    },

    feedbackText: {
        marginTop: 10,
        fontSize: 20,
        color: "#444",
    },
});