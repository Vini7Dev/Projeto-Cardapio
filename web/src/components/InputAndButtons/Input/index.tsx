/**
 * Component: Input
 */

import React, { FocusEvent, InputHTMLAttributes, useCallback, useEffect, useRef, useState } from 'react';
import { useField } from '@unform/core';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';

// Component styles
import { Container, ErrorAlert } from './styles';

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

    // When a default value exists, set 'isFilled' to true
    useEffect(() => {
        // Getting input element
        const input = document.getElementsByName(name)

        // Getting input value
        const startValue = input[0].getAttribute('value');

        // If value exists, set 'isFilled' to true
        if(startValue && !!startValue.length) {
            setIsFilled(true);
        }
    }, [name]);

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
        isError={!!error}
      >
        { Icon && <Icon size={40} /> }

        <input
          name={name}
          onBlur={handleSetIsBlur}
          onFocus={handleSetIsFocus}
          ref={inputRef}
          defaultValue={defaultValue}
          placeholder={placeholder}
          {...rest}
        />

        {/** Error input message */}
        { !!error && (
        <ErrorAlert>
          <FiAlertCircle size={30} color="#B30000" />

          <span>{error}</span>
        </ErrorAlert>
        )}
      </Container>
    )
}

export default Input;