/** @type {import('tailwindcss').Config} */
import typograyphy from "@tailwindcss/typography";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,mdx}"],

  theme: {
    extend: {
      fontFamily: {
        Dongle: ['"Dongle"', "sans-serif"],
        Poppins: ['"Poppins"', "sans-serif"],
        NanumMyeongjo: ['"Nanum Myeongjo"', "sans-serif"],
      },
      boxShadow: {
        cus: "0px 7px 29px 0px rgba(100,100,111,0.2)",
      },
    },
  },
  plugins: [typograyphy],
};
