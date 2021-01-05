/**
 * Component: Input
 */

import React, { InputHTMLAttributes } from 'react';

// Component styles
import { Container } from './styles';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
    placeholder: string;
    borderTopLeft?: number;
    borderTopRight?: number;
    borderBottomLeft?: number;
    borderBottonRigth?: number;
}

const Input: React.FC<IInputProps> = ({
    placeholder,
    borderTopLeft = 0,
    borderTopRight = 0,
    borderBottomLeft = 0,
    borderBottonRigth = 0,
    children,
    ...rest
}: IInputProps) => {
    return (
      <Container
        borderTL={borderTopLeft}
        borderTR={borderTopRight}
        borderBL={borderBottomLeft}
        borderBR={borderBottonRigth}
      >
        {children}

        <input
          type="text"
          placeholder={placeholder}
          {...rest}
        />
      </Container>
    )
}

export default Input;