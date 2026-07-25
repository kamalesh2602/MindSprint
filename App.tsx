import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  useFonts,
  ShareTechMono_400Regular,
} from "@expo-google-fonts/share-tech-mono";
import { ActivityIndicator, View } from "react-native";

import HomeScreen from "./src/screens/HomeScreen";
import WorkoutScreen from "./src/screens/WorkoutScreen";
import ResultScreen from "./src/screens/ResultScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    ShareTechMono_400Regular,
  });

  // Render a dark loader while the font loads
  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, backgroundColor: "#0a0a0f", justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#00f0ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "MindSprint",
          }}
        />
        <Stack.Screen name="Workout" component={WorkoutScreen} />
        <Stack.Screen name="Result" component={ResultScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}