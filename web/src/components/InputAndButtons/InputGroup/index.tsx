/**
 * Component: Input Group
 */

import React, { DOMAttributes } from 'react';

// Component styles
import { Container } from './styles';

interface IInputGroupProps extends DOMAttributes<HTMLDivElement> {
    label: string;
}

const InputGroup: React.FC<IInputGroupProps> = ({ label, children }: IInputGroupProps) => {
    return (
      <Container name={label}>
        <legend>{label}</legend>

        {children}
      </Container>
    );
}

export default InputGroup;