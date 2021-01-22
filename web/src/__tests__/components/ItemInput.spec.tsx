/**
 * Test: Item Input
 */

import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';

import ItemInput from '../../components/InputAndButtons/ItemInput';

jest.mock('@unform/core', () => {
    return {
        useField: () => ({
            fieldName: '',
            defaultValue: '',
            registerField: jest.fn(),
            error: '',
        }),
    };
});

describe('Component: Item Input', () => {
    it('should be able to render component', () => {
        // Render component
        const { getByPlaceholderText } = render(<ItemInput
          label="Label Example"
          name="Name Example"
          placeholder="Placeholder Example"
        />)

        // Check if component are renderized
        expect(getByPlaceholderText('Placeholder Example')).toBeTruthy();
    });

    it('should be able to format price value on blur', async () => {
        // Render component
        const { getByPlaceholderText } = render(<ItemInput
          label="Label Example"
          name="Name Example"
          placeholder="Placeholder Example"
          defaultValue={9.99}
          type="price"
        />);

        // Getting input element
        const input = getByPlaceholderText('Placeholder Example');

        // Setting input value
        fireEvent.change(input, { target: { value: '10' } });

        // Remove focus (blur)
        fireEvent.blur(input);

        // Expect remove border style
        await waitFor(() => {
            expect(input.value).toEqual('R$ 10.00');
        });
    });
});