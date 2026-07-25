import { View, Text, Pressable, StyleSheet } from "react-native";
import { THEME } from "../constants/theme";

export default function ResultScreen({ navigation, route }: any) {
  const { score, total, time } = route.params;

  const percentage = Math.round((score / total) * 100);

  let message = "";

  if (percentage === 100) {
    message = "🏆 Perfect!";
  } else if (percentage >= 80) {
    message = "💪 Great Job!";
  } else if (percentage >= 60) {
    message = "👍 Nice Work!";
  } else {
    message = "🚀 Keep Practicing!";
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>WORKOUT // COMPLETE</Text>

      <Text style={styles.message}>{message}</Text>

      <Text style={styles.score}>
        {score} / {total}
      </Text>

      <Text style={styles.percent}>
        {percentage}%
      </Text>

      <Text style={styles.time}>
        ⏱ {time} SEC
      </Text>

      <Pressable
        style={styles.button}
        onPress={() => navigation.popToTop()}
      >
        <Text style={styles.buttonText}>
          RETURN HOME
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: THEME.colors.background,
  },

  title: {
    fontFamily: THEME.typography.fontFamily,
    fontSize: 26,
    marginBottom: 15,
    color: THEME.colors.primary,
    letterSpacing: 2,
    textShadowColor: THEME.colors.secondary,
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
  },

  message: {
    fontFamily: THEME.typography.fontFamily,
    fontSize: 22,
    marginBottom: 25,
    color: THEME.colors.accent,
    letterSpacing: 1,
  },

  score: {
    fontFamily: THEME.typography.fontFamily,
    fontSize: 50,
    color: THEME.colors.primary,
    textShadowColor: THEME.colors.secondary,
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
  },

  percent: {
    fontFamily: THEME.typography.fontFamily,
    fontSize: 28,
    color: THEME.colors.secondary,
    marginTop: 10,
    letterSpacing: 1,
  },

  time: {
    fontFamily: THEME.typography.fontFamily,
    fontSize: 18,
    color: THEME.colors.muted,
    marginTop: 25,
    marginBottom: 40,
    letterSpacing: 1,
  },

  button: {
    backgroundColor: THEME.colors.secondary,
    paddingVertical: 16,
    paddingHorizontal: 35,
    borderRadius: 0,
    borderWidth: 1,
    borderColor: THEME.colors.accent,
  },

  buttonText: {
    fontFamily: THEME.typography.fontFamily,
    color: "#ffffff",
    fontSize: 16,
    letterSpacing: 2,
  },
});