import { TextRole, Typography } from '@/constants/Typography';
import { useColors } from '@/context/recipe_context';
import { Text, TextProps } from 'react-native';

type Props = TextProps & { variant?: TextRole };

export function AppText({ variant = 'body', style, ...rest }: Props) {
    return <Text style={[{ color: useColors().text }, Typography[variant], style]} {...rest} />;
}
