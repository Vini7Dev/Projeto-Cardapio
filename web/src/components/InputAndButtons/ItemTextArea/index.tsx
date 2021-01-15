/**
 * Component: Text Area
 */

import React, { TextareaHTMLAttributes, useEffect, useRef } from 'react';
import { useField } from '@unform/core';

// Component styles
import { Container } from './styles';

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
    const inputRef = useRef<HTMLInputElement>(null);
    const { fieldName, registerField, defaultValue, error } = useField(name);

    // Register field
    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value',
        });
    }, [fieldName, registerField]);

    return (
      <Container>
        <strong>{label}</strong>
        <textarea
          name={name}
          defaultValue={defaultValue}
          {...rest}
        />
      </Container>
    );
}

export default ItemTextArea;