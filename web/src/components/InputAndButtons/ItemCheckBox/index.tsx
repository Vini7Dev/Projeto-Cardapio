/**
 * Component: Item Check Box
 */

import React from 'react';
import { FiX } from 'react-icons/fi';

// Component styles
import { Container } from './styles';

const ItemCheckBox: React.FC = () => {
    return (
      <Container>
        <strong>Habilitado</strong>

        <span id="custom-checkbox">
          <FiX />
        </span>
      </Container>
    );
}

export default ItemCheckBox;