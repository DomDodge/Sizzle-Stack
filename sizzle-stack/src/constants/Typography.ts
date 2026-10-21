import { Platform, TextStyle } from 'react-native';

export type TextRole =
    | 'screenTitle' | 'sectionTitle' | 'itemTitle' 
    | 'body' | 'secondary' | 'caption' | 'button';


export const Fonts = {
    crafty:      'BalsamiqSans-Regular',
    craftyBold:  'BalsamiqSans-Bold',
    regular:   'Inter-Regular',
    medium:    'Inter-Medium',
    semibold:  'Inter-SemiBold',
    bold:      'Inter-Bold',
};

const ios: Record<TextRole, TextStyle> = {
    screenTitle:     { fontSize: 34, fontFamily: Fonts.craftyBold, lineHeight: 41 },
    sectionTitle:    { fontSize: 22, fontFamily: Fonts.craftyBold, lineHeight: 28 },
    itemTitle:       { fontSize: 17, fontFamily: Fonts.semibold, lineHeight: 22 },
    body:            { fontSize: 17, fontFamily: Fonts.regular, lineHeight: 22 },
    secondary:       { fontSize: 15, fontFamily: Fonts.regular, lineHeight: 20 },
    caption:         { fontSize: 12, fontFamily: Fonts.regular, lineHeight: 16 },
    button:          { fontSize: 17, fontFamily: Fonts.semibold, lineHeight: 22 }
};

const android: Record<TextRole, TextStyle> = {
    screenTitle:     { fontSize: 32, fontFamily: Fonts.craftyBold, lineHeight: 40 },
    sectionTitle:    { fontSize: 22, fontFamily: Fonts.craftyBold, lineHeight: 28 },
    itemTitle:       { fontSize: 16, fontFamily: Fonts.semibold, lineHeight: 24, letterSpacing: 0.15 },
    body:            { fontSize: 16, fontFamily: Fonts.regular, lineHeight: 24, letterSpacing: 0.5 },
    secondary:       { fontSize: 14, fontFamily: Fonts.regular, lineHeight: 20, letterSpacing: 0.25 },
    caption:         { fontSize: 12, fontFamily: Fonts.regular, lineHeight: 16, letterSpacing: 0.4 },
    button:          { fontSize: 14, fontFamily: Fonts.semibold, lineHeight: 20, letterSpacing: 0.1 }
};


export const Typography = Platform.select({ ios, default: android});