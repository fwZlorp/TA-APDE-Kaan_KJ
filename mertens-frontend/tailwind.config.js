module.exports = {
  darkMode: "class", // WICHTIG!
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        black: "#000000",
        white: "#FFFFFF",
        grayLight: "#CECDCD",
        greenPrimary: "#B5F0C4",
        grayMedium: "#D9D9D9",
        grayBorder: "#DEDEDE",
        redError: "#E20000",
        greenSuccess: "#00A82B",
        blueHighlight: "#61D0FF",
        redDanger: "#D60000",
        yellowWarning: "#FAE34F",

        // Dark Mode Farben:
        darkBg: "#121212", // Hintergrund in Dark Mode
        darkGray: "#1E1E1E", // Dunkleres Grau für Elemente
        darkText: "#EAEAEA", // Heller Text im Dark Mode
      },
    },
  },
  plugins: [],
};





