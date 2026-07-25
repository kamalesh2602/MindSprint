export const THEME = {
    colors: {
        background: "#0a0a0f",
        cardBg: "#121124",
        primary: "#00f0ff",     // Cyan
        secondary: "#ff007f",   // Magenta
        accent: "#ffe600",      // Yellow
        text: "#ffffff",
        muted: "#7a7b9e",
        correct: "#00ff66",     // Neon Green
        wrong: "#ff0055",       // <-- Change this hex code to adjust the error text color app-wide
    },
    typography: {
        fontFamily: "ShareTechMono_400Regular",  // Add custom monospace font family here if imported
        letterSpacing: {
            tight: 1,
            medium: 1.5,
            wide: 3,
        },
    },
    borders: {
        width: 2,
        radius: 0,              // 0 for sharp retro edges, 8 for modern rounded
    },
};