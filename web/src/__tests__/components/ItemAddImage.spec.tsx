/**
 * Test: Item Add Image
 */

import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';

import ItemAddImage from '../../components/InputAndButtons/ItemAddImage';

describe('Component: Item Add Image', () => {
    it('should be able to select file', async () => {
        // Skip URL generation
        global.URL.createObjectURL = jest.fn();

        // Render component
        const { getByTestId } = render(<ItemAddImage
          setSelectedImage={jest.fn()}
        />)

        // Getting input
        const input = getByTestId('add-file-input');

        // File example
        const file = new File(['test'], 'test');

        // Select file
        fireEvent.change(input, { target: { files: [ file ] } });

        // Expect try to generate URL
        await waitFor(() => {
            expect(global.URL.createObjectURL).toHaveBeenCalled();
        });
    });

    it('should be able to load a default file', async () => {
        // Skip URL generation
        global.URL.createObjectURL = jest.fn();

        // Render component
        const { getByTestId } = render(<ItemAddImage
          setSelectedImage={jest.fn()}
          defaultFileName="Example"
          defaultFileURL="URL Example"
        />)

        // Getting input
        const input = getByTestId('add-file-input');

        // Expect component exists
        await waitFor(() => {
            expect(input).toBeTruthy();
        });
    });

    it('should not be able to set selected file when target is empty', async () => {
        // Skip URL generation
        global.URL.createObjectURL = jest.fn();

        // Render component
        const { getByTestId } = render(<ItemAddImage
          setSelectedImage={jest.fn()}
        />)

        // Getting input
        const input = getByTestId('add-file-input');

        // Select file
        fireEvent.change(input, { target: { files: false } });

        // Expect try to generate URL
        await waitFor(() => {
            expect(global.URL.createObjectURL).not.toHaveBeenCalled();
        });
    });

    it('should not be able to save selected file when is empty', async () => {
        // Skip URL generation
        global.URL.createObjectURL = jest.fn();

        // Render component
        const { getByTestId } = render(<ItemAddImage
          setSelectedImage={jest.fn()}
        />)

        // Getting input
        const input = getByTestId('add-file-input');

        // Select file
        fireEvent.change(input, undefined);

        // Expect try to generate URL
        await waitFor(() => {
            expect(global.URL.createObjectURL).not.toHaveBeenCalled();
        });
    });
});