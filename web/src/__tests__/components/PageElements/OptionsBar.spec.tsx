/**
 * Test: Options Bar
 */

import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { FiX } from 'react-icons/fi';

import OptionsBar from '../../../components/PageElements/OptionsBar';

describe('Component: Options Bar', () => {
    it('should be able to render component with default logo', async () => {
        // Render component
        const { getAllByTestId } = render(<OptionsBar
          buttonsArray={[
            { text: 'Text1 Example', action: jest.fn(), icon: FiX },
            { text: 'Text2 Example', action: jest.fn() }
          ]}
        />);

        // Select buttons elements
        const buttons = getAllByTestId('option-button');

        // Expect element exists
        await waitFor(() => {
            expect(buttons.length).toEqual(2);
        });
    });
});