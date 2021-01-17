/**
 * Component: Input
 */

import React, { FocusEvent, InputHTMLAttributes, useCallback, useEffect, useRef, useState } from 'react';
import { useField } from '@unform/core';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';

import formatCNPJ from '../../../utils/formatCNPJ';
import formatTelephone from '../../../utils/formatTelephone';

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
    type,
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

    // Format telephone input value
    useEffect(() => {
        // Getting input element
        const inputElement = document.getElementById(name) as HTMLInputElement;

        // Getting input value
        const inputValue = inputElement.value;

        // If input type is a telephone, format input value
        if(type === 'tel') {
            inputElement.value = formatTelephone(inputValue);
        }
    }, [name, type]);

    // Enable focus in input
    const handleSetIsFocus = useCallback(() => {
        setIsFocus(true);
    }, [setIsFocus]);

    // Desable focus in input
    const handleSetIsBlur = useCallback((e: FocusEvent<HTMLInputElement>) => {
        // Setting the focus to false
        setIsFocus(false);

        // Getting input value
        const inputValue = e.target.value;

        // If input type is a telephone, format input value
        if(type === 'tel' && !inputValue.includes('(')) {
            e.target.value = formatTelephone(inputValue);
        }
        // If input type is a cnpj, format input value
        else if(type === 'cnpj' && !inputValue.includes('.')) {
            e.target.value = formatCNPJ(inputValue);
        }

        // Define whether the input has filled
        setIsFilled(!! e.target.value.length);
    }, [setIsFocus, setIsFilled, type]);

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
          id={name}
          name={name}
          type={type}
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