/**
 * Component: Input
 */

import React, { FocusEvent, InputHTMLAttributes, useCallback, useEffect, useRef, useState } from 'react';
import { useField } from '@unform/core';
import { IconBaseProps } from 'react-icons';

// Component styles
import { Container } from './styles';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    placeholder: string;
    icon?: React.ComponentType<IconBaseProps>;
    borderTopLeft?: number;
    borderTopRight?: number;
    borderBottomLeft?: number;
    borderBottonRigth?: number;
}

const Input: React.FC<IInputProps> = ({
    name,
    placeholder,
    icon: Icon,
    borderTopLeft = 0,
    borderTopRight = 0,
    borderBottomLeft = 0,
    borderBottonRigth = 0,
    ...rest
}: IInputProps) => {
    // Input states (blur and focus)
    const [ isFocus, setIsFocus ] = useState(false);
    const [ isFilled, setIsFilled ] = useState(false);

    // Input reference in form
    const inputRef = useRef<HTMLInputElement>(null);
    const { fieldName, defaultValue, registerField, error } = useField(name);

    // Register field
    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value',
        });
    }, [fieldName, registerField]);

    // Enable focus in input
    const handleSetIsFocus = useCallback(() => {
        setIsFocus(true);
    }, [setIsFocus]);

    // Desable focus in input
    const handleSetIsBlur = useCallback((e: FocusEvent<HTMLInputElement>) => {
        // Setting the focus to false
        setIsFocus(false);

        // Define whether the input has filled
        setIsFilled(!! e.target.value.length);
    }, [setIsFocus, setIsFilled]);

    return (
      <Container
        borderTL={borderTopLeft}
        borderTR={borderTopRight}
        borderBL={borderBottomLeft}
        borderBR={borderBottonRigth}
        isFocus={isFocus}
        isFilled={isFilled}
      >
        { Icon && <Icon size={40} /> }

        <input
          onBlur={handleSetIsBlur}
          onFocus={handleSetIsFocus}
          ref={inputRef}
          defaultValue={defaultValue}
          placeholder={placeholder}
          {...rest}
        />
      </Container>
    )
}

export default Input;