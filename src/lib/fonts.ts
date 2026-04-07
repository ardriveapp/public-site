import localFont from "next/font/local";

export const headingFont = localFont({
  src: [
    {
      path: "../fonts/Wavehaus-Sans-Typeface/Wavehaus-95SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/Wavehaus-Sans-Typeface/Wavehaus-128Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/Wavehaus-Sans-Typeface/Wavehaus-158ExtraBold.woff2",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-heading",
  display: "swap",
});

export const bodyFont = localFont({
  src: [
    {
      path: "../fonts/Wavehaus-Sans-Typeface/Wavehaus-42Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/Wavehaus-Sans-Typeface/Wavehaus-66Book.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Wavehaus-Sans-Typeface/Wavehaus-95SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-body",
  display: "swap",
});


