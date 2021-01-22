/**
 * Test: Button
 */

import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';

import Button from '../../../components/InputAndButtons/Button';

describe('Component: Button', () => {
    it('should be able to render component', async () => {
        // Render component
        const { getByText } = render(<Button
          buttonName="Button Example"
        />);

        // Gettin element
        const button = getByText('Button Example');

        // Run default action
        fireEvent.click(button);

        // Expect component exists
        await waitFor(() => {
            expect(button).toBeTruthy();
        });
    });

    it('should be able to run button action', async () => {
        // Button action
        const buttonAction = jest.fn();

        // Render component
        const { getByText } = render(<Button
          buttonName="Button Example"
          buttonAction={buttonAction}
        />);

        // Getting button element
        const button = getByText('Button Example');

        // Click in button
        fireEvent.click(button);

        // Expect action has called
        await waitFor(() => {
            expect(buttonAction).toHaveBeenCalled();
        });
    });
});