/**
 * Component: Button
 */

import React, { ButtonHTMLAttributes } from 'react';

// Components styles
import { Container } from './styles';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    size?: 'normal' | 'small';
    label?: string;
    buttonName: string;
    color?: 'orange' | 'brown' | 'green';
    buttonAction?(): void;
}

const Button: React.FC<IButtonProps> = ({
    size = 'normal',
    label = '',
    buttonName,
    color = 'orange',
    buttonAction = () => { return 0 },
    ...rest
}: IButtonProps) => {
    return (
      <Container
        color={color}
        size={size}
      >
        <h3>{label}</h3>
        <button
          onClick={() => buttonAction()}
          {...rest}
        >
          {buttonName}
        </button>
      </Container>
    );
}

export default Button;