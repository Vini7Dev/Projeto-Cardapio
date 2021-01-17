/**
 * Component: Item Text
 */

import React, { InputHTMLAttributes, useCallback, useEffect, useRef, FocusEvent } from 'react';
import { useField } from '@unform/core';
import { FiAlertCircle } from 'react-icons/fi';

import formatPrice from '../../../utils/formatPrice';

// Component styles
import {
    Container,
    ErrorAlert,
} from './styles';

interface IItemInput extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    name: string;
}

const ItemInput: React.FC<IItemInput> = ({
    label,
    name,
    type,
    ...rest
}) => {
    // Input reference in form
    const inputRef = useRef<HTMLInputElement>(null);
    const { fieldName, registerField, error, defaultValue } = useField(name);

    // Register field
    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value',
        });
    }, [fieldName, registerField]);

    // Start price input example
    useEffect(() => {
        // Check if input type is price
        if(type === 'price') {
            // Getting input element
            const inputElement = document.getElementById(name) as HTMLInputElement;

            // Set input default value
            inputElement.value = formatPrice(defaultValue || 0);
        }
    }, [type, name, defaultValue]);

    // Format input value when input is blur
    const handleSetIsBlur = useCallback((e: FocusEvent<HTMLInputElement>) => {
        // Getting input value
        const inputValue = e.target.value;

        // If input type is price, format value
        if(type === 'price' && !inputValue.includes('$')) {
            e.target.value = formatPrice(Number(e.target.value.replace(',', '.')));
        }
    }, [type]);

    return (
      <Container isError={!!error}>
        <strong>
          {
              error && (
                <ErrorAlert>
                  <FiAlertCircle />

                  <span>{error}</span>
                </ErrorAlert>
              )
          }

          {label}
        </strong>
        <input
          id={name}
          name={name}
          type={type}
          ref={inputRef}
          defaultValue={defaultValue}
          onBlur={handleSetIsBlur}
          {...rest}
        />
      </Container>
    );
}

export default ItemInput;