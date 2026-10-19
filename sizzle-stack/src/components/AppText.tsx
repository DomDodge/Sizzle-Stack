import { TextRole, Typography } from '@/constants/Typography';
import { Text, TextProps } from 'react-native';

type Props = TextProps & { variant?: TextRole };

export function AppText({ variant = 'body', style, ...rest }: Props) {
    return <Text style={[Typography[variant], style]} {...rest} />;
}
