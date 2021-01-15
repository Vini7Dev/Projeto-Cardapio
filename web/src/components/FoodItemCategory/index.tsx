/**
 * Component: Food Item Category
 */

import React from 'react';

// Component styles
import { Container } from './styles';

const FoodItemCategory: React.FC = ({ children }) => {
    return (
      <Container>
        <strong className="category-title">Lanches</strong>

        <ul className="category-items-list">
          {children}
        </ul>
      </Container>
    );
}

export default FoodItemCategory;