/**
 * Component: Add Item Input
 */

import React, { InputHTMLAttributes } from 'react';

// Component styles
import { Container } from './styles';

interface IItemInput extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

const ItemInput: React.FC<IItemInput> = ({
    label,
    ...rest
}) => {
    return (
      <Container>
        <strong>{label}</strong>
        <input {...rest} />
      </Container>
    );
}

export default ItemInput;