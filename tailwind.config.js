/** @type {import("tailwindcss").Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            fontFamily: {
                montserrat: ["Montserrat", "sans-serif"],
                roboto: ["Roboto", "sans-serif"],
            },
        },
    },
    daisyui: {
        themes: [
            {
                mytheme: {
                    "primary": "#8B5CF6", // violet-500
                    "secondary": "#EC4899", // pink-500
                    "accent": "#84cc16", // lime-500
                    "neutral": "#242b33", // gray-800
                    "base-100": "#191e25", // gray-900
                    "info": "#3abff8",
                    "success": "#36d399",
                    "warning": "#fbbd23",
                    "error": "#f87272",
                },
            },
        ],
    },
    plugins: [
        require("daisyui"),
        require("tailwind-scrollbar-hide"),
    ],
};
