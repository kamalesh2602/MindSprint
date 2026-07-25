# 🧠 MindSprint

A lightweight mental math training app built with **React Native**, **Expo**, and **TypeScript**.

MindSprint helps improve arithmetic speed and accuracy through customizable practice sessions with instant feedback and a distraction-free experience.

## Features

* Practice multiple arithmetic categories:

  * Addition
  * Subtraction
  * Multiplication
  * Division
  * Squares
  * Square Roots
  * Cubes
  * Cube Roots
* Choose from Easy, Medium, and Hard difficulty levels
* Customize workout length (10, 20, or 50 questions)
* Instant answer validation
* Automatic progression to the next question
* Progress tracking during workouts
* Final score, accuracy, and completion time

## Tech Stack

* React Native
* Expo
* TypeScript
* React Navigation

## Project Structure

```text
src/
├── generators/
│   ├── addition.ts
│   ├── subtraction.ts
│   ├── multiplication.ts
│   ├── division.ts
│   ├── squares.ts
│   ├── squareRoots.ts
│   ├── cubes.ts
│   ├── cubeRoots.ts
│   └── index.ts
│
├── screens/
│   ├── HomeScreen.tsx
│   ├── WorkoutScreen.tsx
│   └── ResultScreen.tsx
│
└── types/
```

## Getting Started

Clone the repository:

```bash
git clone https://github.com/kamalesh2602/MindSprint.git
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npx expo start
```

Build an Android APK:

```bash
eas build --platform android --profile preview
```

## Future Improvements

* Daily challenges
* Session history
* Personal best tracking
* Streak system
* Additional practice modes

## Repository

GitHub: https://github.com/kamalesh2602/MindSprint
