/**
 * Test: Menu Header
 */

import { render, waitFor } from '@testing-library/react';
import React from 'react';

import MenuHeader from '../../../components/PageElements/MenuHeader';

describe('Component: Menu Header', () => {
    it('should be able to render component with default logo', async () => {
        // Render component
        const { getByAltText } = render(<MenuHeader
          title="Title Example"
        />);

        // Select one element from component
        const element = getByAltText('Restaurant Logo');

        // Expect element exists
        await waitFor(() => {
            expect(element).toBeTruthy();
        });
    });

    it('should be able to render component with example logo', async () => {
        // Render component
        const { getByAltText } = render(<MenuHeader
          title="Title Example"
          logo="Logo Example"
          logo_url="Logo URL Example"
        />);

        // Select one element from component
        const element = getByAltText('Restaurant Logo');

        // Expect element exists
        await waitFor(() => {
            expect(element).toBeTruthy();
        });
    });
});