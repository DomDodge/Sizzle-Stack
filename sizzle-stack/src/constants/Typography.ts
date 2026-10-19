import { Platform, TextStyle } from 'react-native';

export type TextRole =
    | 'screenTitle' | 'sectionTitle' | 'itemTitle' 
    | 'body' | 'secondary' | 'caption' | 'button';

const Fonts = {
    regular:   'Inter-Regular',
    medium:    'Inter-Medium',
    semibold:  'Inter-SemiBold',
    bold:      'Inter-Bold'
}

const ios: Record<TextRole, TextStyle> = {
    screenTitle:     { fontSize: 34, fontFamily: Fonts.bold, lineHeight: 41, fontWeight: '700' },
    sectionTitle:    { fontSize: 22, fontFamily: Fonts.bold, lineHeight: 28, fontWeight: '700' },
    itemTitle:       { fontSize: 17, fontFamily: Fonts.semibold, lineHeight: 22, fontWeight: '600' },
    body:            { fontSize: 17, fontFamily: Fonts.regular, lineHeight: 22, fontWeight: '400' },
    secondary:       { fontSize: 15, fontFamily: Fonts.regular, lineHeight: 20, fontWeight: '400' },
    caption:         { fontSize: 12, fontFamily: Fonts.regular, lineHeight: 16, fontWeight: '400' },
    button:          { fontSize: 17, fontFamily: Fonts.semibold, lineHeight: 22, fontWeight: '600' }
};

const android: Record<TextRole, TextStyle> = {
    screenTitle:     { fontSize: 32, fontFamily: Fonts.bold, lineHeight: 40, fontWeight: '700' },
    sectionTitle:    { fontSize: 22, fontFamily: Fonts.bold, lineHeight: 28, fontWeight: '700' },
    itemTitle:       { fontSize: 16, fontFamily: Fonts.semibold, lineHeight: 24, fontWeight: '600', letterSpacing: 0.15 },
    body:            { fontSize: 16, fontFamily: Fonts.regular, lineHeight: 24, fontWeight: '400', letterSpacing: 0.5 },
    secondary:       { fontSize: 14, fontFamily: Fonts.regular, lineHeight: 20, fontWeight: '400', letterSpacing: 0.25 },
    caption:         { fontSize: 12, fontFamily: Fonts.regular, lineHeight: 16, fontWeight: '400', letterSpacing: 0.4 },
    button:          { fontSize: 14, fontFamily: Fonts.semibold, lineHeight: 20, fontWeight: '600', letterSpacing: 0.1 }
};


export const Typography = Platform.select({ ios, default: android});