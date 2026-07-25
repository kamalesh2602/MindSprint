import { useState } from "react";
import {
    View,
    Text,
    Pressable,
    StyleSheet,
    ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { THEME } from "../constants/theme";

type Category =
    | "addition"
    | "subtraction"
    | "multiplication"
    | "division"
    | "squares"
    | "squareRoots"
    | "cubes"
    | "cubeRoots"
    | "hcf"
    | "lcm"
    | "percentage"
    | "average"
    | "powers";

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
    hcf: boolean;
    lcm: boolean;
    percentage: boolean;
    average: boolean;
    powers: boolean;
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
    "hcf",
    "lcm",
    "percentage",
    "average",
    "powers",
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
        hcf: false,
        lcm: false,
        percentage: false,
        average: false,
        powers: false,
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
        hcf: "HCF",
        lcm: "LCM",
        percentage: "Percentage",
        average: "Average",
        powers: "Powers",
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: THEME.colors.background }}>
            <ScrollView
                style={styles.screenBg}
                contentContainerStyle={styles.container}
            >
                <Text style={styles.title}>🧠 MIND // SPRINT</Text>

                <Text style={styles.heading}>// CATEGORIES</Text>

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
                                {categoryLabels[item]}
                            </Text>
                        </Pressable>
                    ))}
                </View>

                <Text style={styles.heading}>// DIFFICULTY</Text>

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

                <Text style={styles.heading}>// QUESTIONS</Text>

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
                        !hasCategory && styles.disabledStart,
                    ]}
                    disabled={!hasCategory}
                    onPress={startWorkout}
                >
                    <Text style={styles.startText}>
                        {hasCategory ? "EXECUTE PROTOCOL" : "SELECT CATEGORY"}
                    </Text>
                </Pressable>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screenBg: {
        flex: 1,
        backgroundColor: THEME.colors.background,
    },

    container: {
        flexGrow: 1,
        justifyContent: "center",
        padding: 24,
    },

    title: {
        fontFamily: THEME.typography.fontFamily,
        fontSize: 30,
        textAlign: "center",
        marginBottom: 30,
        color: THEME.colors.primary,
        letterSpacing: 2,
        textShadowColor: THEME.colors.secondary,
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 1,
    },

    heading: {
        fontFamily: THEME.typography.fontFamily,
        fontSize: 14,
        marginBottom: 12,
        marginTop: 24,
        color: THEME.colors.accent,
        letterSpacing: 2,
    },

    wrap: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
    },

    chip: {
        borderWidth: 1.5,
        borderColor: THEME.colors.primary,
        borderRadius: 0,
        backgroundColor: THEME.colors.cardBg,
        paddingVertical: 10,
        paddingHorizontal: 18,
    },

    selected: {
        backgroundColor: THEME.colors.primary,
        borderColor: THEME.colors.primary,
    },

    chipText: {
        fontFamily: THEME.typography.fontFamily,
        color: THEME.colors.primary,
        letterSpacing: 1,
    },

    selectedText: {
        color: THEME.colors.background,
    },

    start: {
        marginTop: 40,
        backgroundColor: THEME.colors.secondary,
        padding: 18,
        borderRadius: 0,
        borderWidth: 1,
        borderColor: THEME.colors.accent,
    },

    disabledStart: {
        backgroundColor: "#2a2b3d",
        borderColor: "#5a5b7d",
    },

    startText: {
        fontFamily: THEME.typography.fontFamily,
        color: "#ffffff",
        textAlign: "center",
        fontSize: 16,
        letterSpacing: 2,
    },
});