// Brand colors that read well in both light and dark mode.
export const Colors = {
  volsOrange: '#FF8200',      // Primary CTA / Header Accent
  smokeyOrange: '#E65100',    // Secondary / Pressed States
  freshGreen: '#4CAF50',      // Success / Checkmarks
  mintGreen: '#81C784',       // Soft Badges / Highlights
  link: '#0A84FF',            // Text buttons
  danger: '#FF3B30',          // Destructive actions
};

// Colors that change with the theme. Read them with useColors() from context/recipe_context.
export const Palettes = {
  light: {
    background: '#FAFAFA',    // Main Canvas
    surface: '#FFFFFF',       // Card Containers
    text: '#1E1E1E',          // Primary Body & Title Text
    textMuted: '#666666',     // Subtitles / Placeholders
    border: '#E0E0E0',        // Dividers & Card Outlines
    disabled: '#E5E5EA',      // Disabled buttons
  },
  dark: {
    background: '#121212',
    surface: '#1E1E1E',
    text: '#F2F2F2',
    textMuted: '#A0A0A0',
    border: '#3A3A3C',
    disabled: '#3A3A3C',
  },
};
