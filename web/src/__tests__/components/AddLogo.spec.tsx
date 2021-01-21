/**
 * Test: Add Logo
 */

import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';

import AddLogo from '../../components/InputAndButtons/AddLogo';

describe('Component: AddLogo', () => {
    it('should be able to select file', async () => {
        // Skip URL generation
        global.URL.createObjectURL = jest.fn();

        // Render component
        const { getByTestId } = render(<AddLogo
          setSelectedFile={jest.fn()}
        />)

        // Getting add logo input
        const addLogoInput = getByTestId('file-input');

        // File example
        const file = new File(['test'], 'test');

        // Select file
        fireEvent.change(addLogoInput, { target: { files: [ file ] } });

        // Expect try to generate URL
        await waitFor(() => {
            expect(global.URL.createObjectURL).toHaveBeenCalled();
        });
    });

    it('should be able to load a default file', async () => {
        // Skip URL generation
        global.URL.createObjectURL = jest.fn();

        // Render component
        const { getByTestId } = render(<AddLogo
          setSelectedFile={jest.fn()}
          defaultFileName="Example"
          defaultFileURL="URL Example"
        />)
    });

    it('should not be able to set selected file when target is empty', async () => {
        // Skip URL generation
        global.URL.createObjectURL = jest.fn();

        // Render component
        const { getByTestId } = render(<AddLogo
          setSelectedFile={jest.fn()}
        />)

        // Getting add logo input
        const addLogoInput = getByTestId('file-input');

        // Select file
        fireEvent.change(addLogoInput, { target: { files: false } });

        // Expect try to generate URL
        await waitFor(() => {
            expect(global.URL.createObjectURL).not.toHaveBeenCalled();
        });
    });

    it('should not be able to save selected file when is empty', async () => {
        // Skip URL generation
        global.URL.createObjectURL = jest.fn();

        // Render component
        const { getByTestId } = render(<AddLogo
          setSelectedFile={jest.fn()}
        />)

        // Getting add logo input
        const addLogoInput = getByTestId('file-input');

        // Select file
        fireEvent.change(addLogoInput, { target: undefined });

        // Expect try to generate URL
        await waitFor(() => {
            expect(global.URL.createObjectURL).not.toHaveBeenCalled();
        });
    });
});