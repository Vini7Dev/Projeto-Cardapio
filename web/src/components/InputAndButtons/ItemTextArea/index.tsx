/**
 * Component: Text Area
 */

import React, { TextareaHTMLAttributes } from 'react';

// Component styles
import { Container } from './styles';

interface IItemTextArea extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
}

const ItemTextArea: React.FC<IItemTextArea> = ({
    label,
    ...rest
}) => {
    return (
      <Container>
        <strong>{label}</strong>
        <textarea {...rest} />
      </Container>
    );
}

export default ItemTextArea;