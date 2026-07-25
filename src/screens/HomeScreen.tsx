import { useState } from "react";
import {
    View,
    Text,
    Pressable,
    StyleSheet,
    ScrollView,
} from "react-native";

type Category =
    | "addition"
    | "subtraction"
    | "multiplication"
    | "division"
    | "squares"
    | "squareRoots"
    | "cubes"
    | "cubeRoots";

interface Settings {
    addition: boolean;
    subtraction: boolean;
    multiplication: boolean;
    division: boolean;
    difficulty: "Easy" | "Medium" | "Hard";
    count: 10 | 20 | 50;
    squares: boolean;
    squareRoots: boolean;
    cubes: boolean;
    cubeRoots: boolean;
}

const categories: Category[] = [
    "addition",
    "subtraction",
    "multiplication",
    "division",
    "squares",
    "squareRoots",
    "cubes",
    "cubeRoots",
];

export default function HomeScreen({ navigation }: any) {
    const [settings, setSettings] = useState<Settings>({
        addition: true,
        subtraction: false,
        multiplication: false,
        division: false,
        squares: false,
        squareRoots: false,
        cubes: false,
        cubeRoots: false,
        difficulty: "Easy",
        count: 10,
    });

    function toggle(key: Category) {
        setSettings((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    }
    const hasCategory = categories.some((c) => settings[c]);

    function startWorkout() {
        navigation.navigate("Workout", { settings });
    }
    const categoryLabels: Record<Category, string> = {
        addition: "Addition",
        subtraction: "Subtraction",
        multiplication: "Multiplication",
        division: "Division",
        squares: "Squares",
        squareRoots: "Square Roots",
        cubes: "Cubes",
        cubeRoots: "Cube Roots",
    };
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>🧠 MindSprint</Text>

            <Text style={styles.heading}>Categories</Text>

            <View style={styles.wrap}>
                {categories.map((item) => (
                    <Pressable
                        key={item}
                        style={[
                            styles.chip,
                            settings[item] && styles.selected,
                        ]}
                        onPress={() => toggle(item)}
                    >
                        <Text
                            style={[
                                styles.chipText,
                                settings[item] && styles.selectedText,
                            ]}
                        >
                            {
                                categoryLabels[item]
                            }
                        </Text>
                    </Pressable>
                ))}
            </View>

            <Text style={styles.heading}>Difficulty</Text>

            <View style={styles.wrap}>
                {(["Easy", "Medium", "Hard"] as const).map((d) => (
                    <Pressable
                        key={d}
                        style={[
                            styles.chip,
                            settings.difficulty === d && styles.selected,
                        ]}
                        onPress={() =>
                            setSettings((prev) => ({
                                ...prev,
                                difficulty: d,
                            }))
                        }
                    >
                        <Text
                            style={[
                                styles.chipText,
                                settings.difficulty === d && styles.selectedText,
                            ]}
                        >
                            {d}
                        </Text>
                    </Pressable>
                ))}
            </View>

            <Text style={styles.heading}>Questions</Text>

            <View style={styles.wrap}>
                {[10, 20, 50].map((n) => (
                    <Pressable
                        key={n}
                        style={[
                            styles.chip,
                            settings.count === n && styles.selected,
                        ]}
                        onPress={() =>
                            setSettings((prev) => ({
                                ...prev,
                                count: n as 10 | 20 | 50,
                            }))
                        }
                    >
                        <Text
                            style={[
                                styles.chipText,
                                settings.count === n && styles.selectedText,
                            ]}
                        >
                            {n}
                        </Text>
                    </Pressable>
                ))}
            </View>

            <Pressable
                style={[
                    styles.start,
                    !hasCategory && { backgroundColor: "#9CA3AF" },
                ]}
                disabled={!hasCategory}
                onPress={startWorkout}
            >
                <Text style={styles.startText}>Start Workout</Text>
            </Pressable>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: "center",
        padding: 24,
    },

    title: {
        fontSize: 34,
        fontWeight: "700",
        textAlign: "center",
        marginBottom: 40,
    },

    heading: {
        fontSize: 20,
        fontWeight: "600",
        marginBottom: 10,
        marginTop: 20,
    },

    wrap: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
    },

    chip: {
        borderWidth: 1,
        borderColor: "#2563EB",
        borderRadius: 12,
        paddingVertical: 10,
        paddingHorizontal: 18,
    },

    selected: {
        backgroundColor: "#2563EB",
    },

    chipText: {
        color: "#2563EB",
        fontWeight: "600",
    },

    selectedText: {
        color: "white",
    },

    start: {
        marginTop: 50,
        backgroundColor: "#2563EB",
        padding: 16,
        borderRadius: 12,
    },

    startText: {
        color: "white",
        textAlign: "center",
        fontSize: 18,
        fontWeight: "700",
    },
});