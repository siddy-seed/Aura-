/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                aura: {
                    sage: '#A3B18A',
                    blush: '#F4E4E4',
                    cream: '#FEFAE0',
                    lavender: '#E6E6F0',
                    dark: '#2C3E50',
                    text: '#333333',
                    lightText: '#666666'
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                serif: ['Playfair Display', 'serif'],
            }
        },
    },
    plugins: [],
}
