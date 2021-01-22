/**
 * Test: Food Item Category
 */

import React from 'react';
import { render, waitFor } from '@testing-library/react';

import FoodItemCategory from '../../components/FoodItemCategory';

describe('Component: Food Item Category', () => {
    it('should be able to render component', async () => {
        // Render component
        const { getByTestId } = render(<FoodItemCategory
          title="Title Example"
        />);

        // Gettin element
        const element = getByTestId('food-item-category');

        // Expect component exists
        await waitFor(() => {
            expect(element).toBeTruthy();
        });
    });
});