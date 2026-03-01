/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                slate: {
                    950: "#0a0a0a",
                    900: "#0f172a",
                    800: "#1e293b",
                    400: "#94a3b8",
                    200: "#e2e8f0",
                },
                blue: {
                    500: "#3b82f6",
                    400: "#60a5fa",
                },
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
        },
    },
    plugins: [],
};