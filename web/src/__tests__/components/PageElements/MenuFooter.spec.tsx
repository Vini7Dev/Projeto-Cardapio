/**
 * Test: Menu Footer
 */

import React from 'react';
import { render, waitFor } from '@testing-library/react';

import MenuFooter from '../../../components/PageElements/MenuFooter';

describe('Component: Menu Footer', () => {
    it('should be able to render component', async () => {
        // Render component
        const { getByText } = render(<MenuFooter
          trade="Trade Example"
          cnpj="12345678910234"
          telephone='99912345678'
        />);

        // Select one element from component
        const element = getByText('Restaurante: Trade Example');

        // Expect element exists
        await waitFor(() => {
            expect(element).toBeTruthy();
        });
    });
});