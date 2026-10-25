import { Platform, TextStyle } from 'react-native';

export type TextRole =
    | 'screenTitle' | 'sectionTitle' | 'itemTitle' 
    | 'body' | 'secondary' | 'caption' | 'button';


// Bebas Neue is all caps and narrow, with empty room above and below the letters,
// so it's set larger with a line height close to its size to look balanced next to Roboto.
export const Fonts = {
    display:   'BebasNeue-Regular', // Bebas Neue only ships one weight
    regular:   'Roboto-Regular',
    medium:    'Roboto-Medium',
    semibold:  'Roboto-SemiBold',
    bold:      'Roboto-Bold',
};

const ios: Record<TextRole, TextStyle> = {
    screenTitle:     { fontSize: 42, fontFamily: Fonts.display, lineHeight: 44 },
    sectionTitle:    { fontSize: 30, fontFamily: Fonts.display, lineHeight: 32 },
    itemTitle:       { fontSize: 17, fontFamily: Fonts.semibold, lineHeight: 22 },
    body:            { fontSize: 17, fontFamily: Fonts.regular, lineHeight: 22 },
    secondary:       { fontSize: 15, fontFamily: Fonts.regular, lineHeight: 20 },
    caption:         { fontSize: 12, fontFamily: Fonts.regular, lineHeight: 16 },
    button:          { fontSize: 17, fontFamily: Fonts.semibold, lineHeight: 22 }
};

const android: Record<TextRole, TextStyle> = {
    screenTitle:     { fontSize: 40, fontFamily: Fonts.display, lineHeight: 42, includeFontPadding: false },
    sectionTitle:    { fontSize: 30, fontFamily: Fonts.display, lineHeight: 32, includeFontPadding: false },
    itemTitle:       { fontSize: 16, fontFamily: Fonts.semibold, lineHeight: 24, letterSpacing: 0.15 },
    body:            { fontSize: 16, fontFamily: Fonts.regular, lineHeight: 24, letterSpacing: 0.5 },
    secondary:       { fontSize: 14, fontFamily: Fonts.regular, lineHeight: 20, letterSpacing: 0.25 },
    caption:         { fontSize: 12, fontFamily: Fonts.regular, lineHeight: 16, letterSpacing: 0.4 },
    button:          { fontSize: 14, fontFamily: Fonts.semibold, lineHeight: 20, letterSpacing: 0.1 }
};


export const Typography = Platform.select({ ios, default: android});

// Title style for navigation headers.
export const headerTitleStyle = { fontFamily: Fonts.display, fontSize: 26 };
