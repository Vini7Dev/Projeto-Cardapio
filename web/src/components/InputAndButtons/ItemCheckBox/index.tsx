/**
 * Component: Item Check Box
 */

import React from 'react';
import { FiX } from 'react-icons/fi';

// Component styles
import { Container } from './styles';

interface IItemCheckbockProps {
    setIsChecked(): void;
    isChecked: boolean;
}

const ItemCheckbox: React.FC<IItemCheckbockProps> = ({
    setIsChecked,
    isChecked,
}) => {
    return (
      <Container isChecked={isChecked}>
        <strong>
          { isChecked ? 'Habilitado' : 'Desabilitado' }
        </strong>

        <button id="custom-checkbox" onClick={setIsChecked}>
          <FiX />
        </button>
      </Container>
    );
}

export default ItemCheckbox;