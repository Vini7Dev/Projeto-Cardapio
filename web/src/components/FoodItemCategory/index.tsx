/**
 * Component: Food Item Category
 */

import React from 'react';

// Component styles
import { Container } from './styles';

interface IFoodItemCategoryProps {
    title: string;
}

const FoodItemCategory: React.FC<IFoodItemCategoryProps> = ({
    title,
    children
}) => {
    return (
      <Container>
        <strong className="category-title">{title}</strong>

        <ul className="category-items-list">
          {children}
        </ul>
      </Container>
    );
}

export default FoodItemCategory;