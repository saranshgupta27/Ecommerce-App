import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const generateSpacing = (spacer = 4) => {
  const GENERATE_UPTO = 50;
  const values = {};

  for (let i = 0; i <= GENERATE_UPTO; ) {
    values[i] = `${spacer * i}px`;

    if (i < 3) i += 0.25;
    else if (i < 5) i += 0.5;
    else i += 1;
  }

  return values;
};


export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
    },
    spacing:{
      px: "1px",
      ...generateSpacing(),
    },
  },
  plugins: [],
} satisfies Config;
