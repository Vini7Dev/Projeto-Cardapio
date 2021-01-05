/**
 * Component: Input
 */

import React, { InputHTMLAttributes, useEffect, useRef } from 'react';
import { useField } from '@unform/core';

// Component styles
import { Container } from './styles';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string,
    placeholder: string;
    borderTopLeft?: number;
    borderTopRight?: number;
    borderBottomLeft?: number;
    borderBottonRigth?: number;
}

const Input: React.FC<IInputProps> = ({
    name,
    placeholder,
    borderTopLeft = 0,
    borderTopRight = 0,
    borderBottomLeft = 0,
    borderBottonRigth = 0,
    children,
    ...rest
}: IInputProps) => {
    // Input reference in form
    const inputRef = useRef<HTMLInputElement>(null);
    const { fieldName, defaultValue, registerField, error } = useField(name);

    // Register field
    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value'
        });
    }, [fieldName, registerField]);

    return (
      <Container
        borderTL={borderTopLeft}
        borderTR={borderTopRight}
        borderBL={borderBottomLeft}
        borderBR={borderBottonRigth}
      >
        {children}

        <input
          ref={inputRef}
          defaultValue={defaultValue}
          placeholder={placeholder}
          {...rest}
        />
      </Container>
    )
}

export default Input;