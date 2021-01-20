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
    ...rest
}) => {
    return (
      <Container
        isChecked={isChecked}
        onClick={setIsChecked}
        type="button"
        {...rest}
      >
        <strong>
          { isChecked ? 'Habilitado' : 'Desabilitado' }
        </strong>

        <div
          id="custom-checkbox"
        >
          <FiX />
        </div>
      </Container>
    );
}

export default ItemCheckbox;