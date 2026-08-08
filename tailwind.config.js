/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./*.html", "./js/**/*.js"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "inverse-surface": "#213145",
        "on-secondary-container": "#fffbff",
        "surface-tint": "#0053db",
        "on-surface-variant": "#434655",
        "primary-fixed": "#dbe1ff",
        "secondary-fixed": "#dceefe",
        "surface-container-high": "#dce9ff",
        "on-tertiary-container": "#eef0ff",
        "primary": "#004ac6",
        "on-secondary-fixed-variant": "#075985",
        "on-primary": "#ffffff",
        "secondary-fixed-dim": "#7dd3fc",
        "error": "#ba1a1a",
        "on-primary-fixed-variant": "#003ea8",
        "tertiary-fixed": "#dae2fd",
        "on-surface": "#0b1c30",
        "on-background": "#0b1c30",
        "background": "#f8f9ff",
        /* secondary + secondary-container darkened from #0284c7 / #0ea5e9
           so white text/icons placed on top reach the WCAG AA 4.5:1
           contrast minimum (PageSpeed accessibility flag) */
        "surface-container": "#e5eeff",
        "on-secondary": "#ffffff",
        "surface-bright": "#f8f9ff",
        "primary-fixed-dim": "#b4c5ff",
        "surface-variant": "#d3e4fe",
        "on-primary-container": "#eeefff",
        "outline-variant": "#c3c6d7",
        "outline": "#737686",
        "secondary-container": "#0369a1",
        "on-tertiary": "#ffffff",
        "surface-container-lowest": "#ffffff",
        "inverse-on-surface": "#eaf1ff",
        "surface": "#f8f9ff",
        "on-error": "#ffffff",
        "surface-dim": "#cbdbf5",
        "primary-container": "#2563eb",
        "tertiary-container": "#656d84",
        "error-container": "#ffdad6",
        "on-primary-fixed": "#00174b",
        "inverse-primary": "#b4c5ff",
        "surface-container-low": "#eff4ff",
        "surface-container-highest": "#d3e4fe",
        "on-tertiary-fixed": "#131b2e",
        "on-error-container": "#93000a",
        "tertiary": "#4d556b",
        "on-tertiary-fixed-variant": "#3f465c",
        "tertiary-fixed-dim": "#bec6e0",
        "secondary": "#0369a1",
        "on-secondary-fixed": "#0c4a6e"
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px"
      },
      spacing: {
        sm: "8px",
        lg: "24px",
        unit: "4px",
        gutter: "24px",
        md: "16px",
        "2xl": "48px",
        "container-max": "1280px",
        xl: "32px",
        xs: "4px",
        "3xl": "64px"
      },
      fontFamily: {
        "body-sm": ["Inter"],
        "display-lg-mobile": ["Hanken Grotesk"],
        "body-lg": ["Inter"],
        "display-lg": ["Hanken Grotesk"],
        "body-md": ["Inter"],
        "headline-sm": ["Hanken Grotesk"],
        "headline-md": ["Hanken Grotesk"],
        "label-caps": ["JetBrains Mono"]
      },
      fontSize: {
        "body-sm": ["14px", { lineHeight: "20px", fontWeight: "400" }],
        "display-lg-mobile": ["36px", { lineHeight: "44px", letterSpacing: "-0.02em", fontWeight: "700" }],
        "body-lg": ["18px", { lineHeight: "28px", fontWeight: "400" }],
        "display-lg": ["48px", { lineHeight: "56px", letterSpacing: "-0.02em", fontWeight: "700" }],
        "body-md": ["16px", { lineHeight: "24px", fontWeight: "400" }],
        "headline-sm": ["24px", { lineHeight: "32px", fontWeight: "600" }],
        "headline-md": ["32px", { lineHeight: "40px", letterSpacing: "-0.01em", fontWeight: "600" }],
        "label-caps": ["12px", { lineHeight: "16px", letterSpacing: "0.05em", fontWeight: "500" }]
      }
    }
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/container-queries")]
};