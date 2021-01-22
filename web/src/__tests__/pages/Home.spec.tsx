/**
 * Test: Home
 */

import React from 'react';
import { render, waitFor } from '@testing-library/react';

import Home from '../../pages/Home';

jest.mock('react-router-dom', () => {
    return {
        Link: ({ children }: { children: React.ReactNode }) => children,
    };
});

describe('Page: Home', () => {
    it('should be able to render page', async () => {
        // Render page
        const { getByText } = render(<Home />)

        // Getting one page element
        const element = getByText('Você deseja:');

        // Expect element exists
        await waitFor(() => {
            expect(element).toBeTruthy();
        });
    });
});