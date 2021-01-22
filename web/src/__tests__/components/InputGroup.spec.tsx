/**
 * Test: Input Group
 */

import React from 'react';
import { render, waitFor } from '@testing-library/react';

import InputGroup from '../../components/InputAndButtons/InputGroup';

describe('Component: Input Group', () => {
    it('should be able to render component', async () => {
        // Render component
        const { getByText } = render(<InputGroup
          label="Label Example"
        />);

        // Gettin element
        const element = getByText('Label Example');

        // Expect component exists
        await waitFor(() => {
            expect(element).toBeTruthy();
        });
    });
});