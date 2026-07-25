import { View, Text, Pressable, StyleSheet } from "react-native";

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
      <Text style={styles.title}>Workout Complete</Text>

      <Text style={styles.message}>{message}</Text>

      <Text style={styles.score}>
        {score} / {total}
      </Text>

      <Text style={styles.percent}>
        {percentage}%
      </Text>

      <Text style={styles.time}>
        ⏱ {time} sec
      </Text>

      <Pressable
        style={styles.button}
        onPress={() => navigation.popToTop()}
      >
        <Text style={styles.buttonText}>
          Back Home
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
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 15,
  },

  message: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 25,
  },

  score: {
    fontSize: 54,
    fontWeight: "700",
  },

  percent: {
    fontSize: 28,
    color: "#2563EB",
    marginTop: 10,
  },

  time: {
    fontSize: 20,
    color: "#666",
    marginTop: 25,
    marginBottom: 40,
  },

  button: {
    backgroundColor: "#2563EB",
    paddingVertical: 15,
    paddingHorizontal: 35,
    borderRadius: 12,
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
});