// tailwind.config.js
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,html}'],
    darkMode: 'class',
    theme: {

        extend: {
            backgroundImage: {
                'notice-board': "url('/public/Rectangle.png')",
            }
        },
    },
    plugins: [],
};
