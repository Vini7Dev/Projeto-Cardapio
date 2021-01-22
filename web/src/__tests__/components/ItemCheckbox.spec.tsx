/**
 * Test: Item Checkbox
 */

import React from 'react';
import { render, waitFor } from '@testing-library/react';

import ItemCheckbox from '../../components/InputAndButtons/ItemCheckBox';

const mockedSetIsCheck = jest.fn();

describe('Component: Item Checkbox', () => {
    it('should be able to render component', async () => {
        // Render component
        const { getByText } = render(<ItemCheckbox
          setIsChecked={mockedSetIsCheck}
          isChecked
        />);

        // Render component (no checked)
        render(<ItemCheckbox
          setIsChecked={mockedSetIsCheck}
          isChecked={false}
        />);

        // Gettin element
        const element = getByText('Habilitado');

        // Expect component exists
        await waitFor(() => {
            expect(element).toBeTruthy();
        });
    });
});