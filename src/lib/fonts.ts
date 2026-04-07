import localFont from "next/font/local";

export const headingFont = localFont({
  src: [
    {
      path: "../fonts/Besley/Besley-VariableFont_wght.ttf",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "../fonts/Besley/Besley-Italic-VariableFont_wght.ttf",
      weight: "100 900",
      style: "italic",
    },
  ],
  variable: "--font-heading",
  display: "swap",
});

export const bodyFont = localFont({
  src: [
    {
      path: "../fonts/Plus_Jakarta_Sans/PlusJakartaSans-VariableFont_wght.ttf",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "../fonts/Plus_Jakarta_Sans/PlusJakartaSans-Italic-VariableFont_wght.ttf",
      weight: "100 900",
      style: "italic",
    },
  ],
  variable: "--font-body",
  display: "swap",
});


