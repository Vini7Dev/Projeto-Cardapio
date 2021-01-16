/**
 * Component: Item Text
 */

import React, { InputHTMLAttributes, useEffect, useRef } from 'react';
import { useField } from '@unform/core';
import { FiAlertCircle } from 'react-icons/fi';

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
          name={name}
          ref={inputRef}
          defaultValue={defaultValue}
          {...rest}
        />
      </Container>
    );
}

export default ItemInput;