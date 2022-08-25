/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/*/*.{html,js,vue}",
    "./src/components/ui/*.{html,js,vue}",
    "./src/components/singlePlayer/*.{html,js,vue}",
    "./index.html",
    "./src/App.vue",
    // "**/*.{html,js,vue}"
  ],
  theme: {

    extend: {

      colors: {
        'backgraund': '#0f0f0f',
        "blackOpacity": {
          '10': "rgba(0, 0, 0, 0.10)",
          '25': "rgba(0, 0, 0, 0.25)",
          '50': "rgba(0, 0, 0, 0.50)",
          '75': "rgba(0, 0, 0, 0.75)",
        },
        "whiteOpacity": {
          '10': "rgba(255, 255, 255, 0.10)",
          '25': "rgba(255, 255, 255, 0.25)",
          '50': "rgba(255, 255, 255, 0.50)",
          '75': "rgba(255, 255, 255, 0.75)",
        },
        "neon": 'rgb(0, 215, 255)',
        "neonOpacity": {
          "10": 'rgba(0, 215, 255, 0.10)',
          "25": 'rgba(0, 215, 255, 0.25)',
          "50": 'rgba(0, 215, 255, 0.50)',
          "75": 'rgba(0, 215, 255, 0.75)',

        },

        'redOpacity': 'rgba(239, 68, 68, 0.7);',
        'yellowOpacity': 'rgba(234, 179, 8, 0.7);',
        'greenOpacity': 'rgba(34, 197, 94, 0.7);',


        // fontFamily: {
        //   pixel: ["pixel", "cursive"],
        // },
  
      },

    },
  },
  plugins: [],
}

// npx tailwindcss -i ./src/assets/css/input.css -o ./src/assets/css/output.css --watch