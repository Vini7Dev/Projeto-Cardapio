/**
 * Component: Text Area
 */

import React, { TextareaHTMLAttributes, useEffect, useRef } from 'react';
import { useField } from '@unform/core';
import { FiAlertCircle } from 'react-icons/fi';

// Component styles
import {
    Container,
    ErrorAlert,
} from './styles';

interface IItemTextArea extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    name: string;
}

const ItemTextArea: React.FC<IItemTextArea> = ({
    name,
    label,
    ...rest
}) => {
    // Input reference in form
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const { fieldName, registerField, defaultValue, error } = useField(name);

    // Register field
    useEffect(() => {
        registerField({
            name: fieldName,
            ref: textAreaRef.current,
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
        <textarea
          name={name}
          ref={textAreaRef}
          defaultValue={defaultValue}
          {...rest}
        />
      </Container>
    );
}

export default ItemTextArea;