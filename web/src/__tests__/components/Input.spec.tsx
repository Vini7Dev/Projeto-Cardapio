/**
 * Test: Input
 */

import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';

import Input from '../../components/InputAndButtons/Input';

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

describe('Component: Input', () => {
    it('should be able to render component', () => {
        // Render component
        const { getByPlaceholderText } = render(<Input
          name="Name Example"
          placeholder="Placeholder Example"
          defaultValue="Default Example"
          type="tel"
        />)

        // Check if component are renderized
        expect(getByPlaceholderText('Placeholder Example')).toBeTruthy();
    });

    it('should be able to set a border when input focus and remove in blur', async () => {
        // Render component
        const { getByPlaceholderText, getByTestId } = render(<Input
          name="Name Example"
          placeholder="Placeholder Example"
        />);

        // Getting input element
        const input = getByPlaceholderText('Placeholder Example');
        const container = getByTestId('input-container');

        // Setting focus
        fireEvent.focus(input);

        // Expect has set border styled
        await waitFor(() => {
            expect(container).toHaveStyle('border: 3px solid #FF5C00');
        });

        // Remove focus (blur)
        fireEvent.blur(input);

        // Expect remove border style
        await waitFor(() => {
            expect(container).not.toHaveStyle('border: 3px solid #FF5C00');
        });
    });

    it('should be able to format a telephone value', async () => {
        // Render component
        const { getByPlaceholderText, getByTestId } = render(<Input
          name="Name Example"
          placeholder="Placeholder Example"
          type="tel"
        />);

        // Getting input element
        const input = getByPlaceholderText('Placeholder Example');

        // Setting input value
        fireEvent.change(input, { target: { value: '99912345678' } });

        // Remove focus (blur)
        fireEvent.blur(input);

        // Expect remove border style
        await waitFor(() => {
            expect(input.value).toEqual('(99) 91234-5678');
        });
    });

    it('should be able to format a CNPJ value', async () => {
        // Render component
        const { getByPlaceholderText, getByTestId } = render(<Input
          name="Name Example"
          placeholder="Placeholder Example"
          type="cnpj"
        />);

        // Getting input element
        const input = getByPlaceholderText('Placeholder Example');

        // Setting input value
        fireEvent.change(input, { target: { value: '12345678910234' } });

        // Remove focus (blur)
        fireEvent.blur(input);

        // Expect remove border style
        await waitFor(() => {
            expect(input.value).toEqual('12.345.678/9102-34');
        });
    });
});