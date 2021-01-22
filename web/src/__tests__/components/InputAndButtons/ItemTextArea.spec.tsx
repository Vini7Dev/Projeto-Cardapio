/**
 * Test: Item Text Area
 */

import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';

import ItemTextArea from '../../../components/InputAndButtons/ItemTextArea';

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

describe('Component: Item Text Area', () => {
    it('should be able to render component', () => {
        // Render component
        const { getByPlaceholderText } = render(<ItemTextArea
          label="Label Example"
          name="Name Example"
          placeholder="Placeholder Example"
        />)

        // Check if component are renderized
        expect(getByPlaceholderText('Placeholder Example')).toBeTruthy();
    });
});