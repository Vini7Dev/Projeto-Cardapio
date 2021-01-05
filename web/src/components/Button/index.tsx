/**
 * Component: Button
 */

import React, { ButtonHTMLAttributes } from 'react';

// Components styles
import { Container } from './styles';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    label?: string;
    buttonName: string;
    color?: 'orange' | 'brown';
    buttonAction?(): void;
}

const Button: React.FC<IButtonProps> = ({
    label = '',
    buttonName,
    color = 'orange',
    buttonAction = () => { return 0 },
}: IButtonProps) => {
    return (
      <Container color={color}>
        <h3>{label}</h3>
        <button onClick={() => buttonAction()}>{buttonName}</button>
      </Container>
    );
}

export default Button;