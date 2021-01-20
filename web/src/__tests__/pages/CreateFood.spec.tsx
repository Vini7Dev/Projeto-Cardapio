/**
 * Test: Create Food
 */

import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';

import CreateFood from '../../pages/CreateFood';

const mockedHistoryPush = jest.fn();
const mockedAddToast = jest.fn();

jest.mock('../../services/api', () => {
    return {
        post: jest.fn(),
    };
});

jest.mock('react-router-dom', () => {
    return {
        useHistory: () => ({
            push: mockedHistoryPush,
            goBack: jest.fn(),
        }),
    };
});

jest.mock('../../hooks/auth', () => {
    return {
        useAuth: () => ({
            logout: jest.fn(),
            restaurant: {
                logo: '',
                logo_url: '',
                cnpj: '',
                telephone: '',
            },
        }),
    }
});

jest.mock('../../hooks/load', () => {
    return {
        useLoad: () => ({
            setLoad: jest.fn(),
        }),
    };
});

jest.mock('../../hooks/toast', () => {
    return {
        useToast: () => ({
            addToast: jest.fn(),
        }),
    };
});

describe('Page: Create Food', () => {
    beforeEach(() => {
        mockedHistoryPush.mockClear();
    });

    it('should be able to create a new food without image', async () => {
        // Render page
        const { getByPlaceholderText, getByTestId } = render(<CreateFood />);

        // Getting from inputs and submit button
        const titleInput = getByPlaceholderText('Ex.: X-Burguer');
        const descriptionInput = getByPlaceholderText('Ex.: Pão, hamburguer, ...');
        const priceInput = getByPlaceholderText('Ex.: R$ 15,90');
        const discountPriceInput = getByPlaceholderText('Ex.: R$ 13,50');
        const categoryInput = getByPlaceholderText('Ex.: Lanches');
        const enabledInput = getByTestId('enable-checkbox');
        const submitButton = getByTestId('submit-button');

        // Fill inputs
        fireEvent.change(titleInput, { target: { value: 'Title Example' } });
        fireEvent.change(descriptionInput, { target: { value: 'Description Example' } });
        fireEvent.change(priceInput, { target: { value: 'R$ 9,99' } });
        fireEvent.change(discountPriceInput, { target: { value: 'R$ 7,99' } });
        fireEvent.change(categoryInput, { target: { value: 'Category Example' } });
        fireEvent.click(enabledInput);

        // Submit button
        fireEvent.click(submitButton);

        // Expect redirect to menu page
        await waitFor(() => {
            expect(mockedHistoryPush).toHaveBeenCalledWith('/menu');
        });
    });

    it('should be able to create a new food with image', async () => {
        // Skip URL generation
        global.URL.createObjectURL = jest.fn();

        // Render page
        const { getByPlaceholderText, getByTestId } = render(<CreateFood />);

        // Getting from inputs and submit button
        const imageInput = getByTestId('add-image');
        const titleInput = getByPlaceholderText('Ex.: X-Burguer');
        const descriptionInput = getByPlaceholderText('Ex.: Pão, hamburguer, ...');
        const priceInput = getByPlaceholderText('Ex.: R$ 15,90');
        const discountPriceInput = getByPlaceholderText('Ex.: R$ 13,50');
        const categoryInput = getByPlaceholderText('Ex.: Lanches');
        const enabledInput = getByTestId('enable-checkbox');
        const submitButton = getByTestId('submit-button');

        // Image example
        const file = new File(['test'], 'test');

        // Fill inputs
        fireEvent.change(imageInput, { target: { files: [file] } });
        fireEvent.change(titleInput, { target: { value: 'Title Example' } });
        fireEvent.change(descriptionInput, { target: { value: 'Description Example' } });
        fireEvent.change(priceInput, { target: { value: 'R$ 9,99' } });
        fireEvent.change(discountPriceInput, { target: { value: 'R$ 7,99' } });
        fireEvent.change(categoryInput, { target: { value: 'Category Example' } });
        fireEvent.click(enabledInput);

        // Submit button
        fireEvent.click(submitButton);

        // Expect redirect to menu page
        await waitFor(() => {
            expect(mockedHistoryPush).toHaveBeenCalledWith('/menu');
        });
    });

    it('should not be able to create a new food with invalid credentials', async () => {
        // Setting error
        mockedAddToast.mockImplementationOnce(() => {
            throw new Error('Create Food error example');
        });

        // Render page
        const { getByPlaceholderText, getByTestId } = render(<CreateFood />);

        // Getting from inputs and submit button
        const titleInput = getByPlaceholderText('Ex.: X-Burguer');
        const descriptionInput = getByPlaceholderText('Ex.: Pão, hamburguer, ...');
        const priceInput = getByPlaceholderText('Ex.: R$ 15,90');
        const discountPriceInput = getByPlaceholderText('Ex.: R$ 13,50');
        const categoryInput = getByPlaceholderText('Ex.: Lanches');
        const enabledInput = getByTestId('enable-checkbox');
        const submitButton = getByTestId('submit-button');

        // Fill inputs
        fireEvent.change(titleInput, { target: { value: 'Invalid Title - 01010101010101010101010101010101' } });
        fireEvent.change(descriptionInput, { target: { value: 'Description Example' } });
        fireEvent.change(priceInput, { target: { value: 'R$ 9,99' } });
        fireEvent.change(discountPriceInput, { target: { value: 'R$ 7,99' } });
        fireEvent.change(categoryInput, { target: { value: 'Category Example' } });
        fireEvent.click(enabledInput);

        // Submit button
        fireEvent.click(submitButton);

        // Expect not redirect to menu page
        await waitFor(() => {
            expect(mockedHistoryPush).not.toHaveBeenCalled();
        });
    });

    it('should be able to display a notification error when request to update profile fails', async () => {
        // Cancel alert function
        global.alert = jest.fn();

        // Render page
        const { getByPlaceholderText, getByTestId } = render(<CreateFood />);

        // Getting from inputs and submit button
        const titleInput = getByPlaceholderText('Ex.: X-Burguer');
        const descriptionInput = getByPlaceholderText('Ex.: Pão, hamburguer, ...');
        const priceInput = getByPlaceholderText('Ex.: R$ 15,90');
        const discountPriceInput = getByPlaceholderText('Ex.: R$ 13,50');
        const categoryInput = getByPlaceholderText('Ex.: Lanches');
        const enabledInput = getByTestId('enable-checkbox');
        const submitButton = getByTestId('submit-button');

        // Fill inputs
        fireEvent.change(titleInput, { target: { value: 'Title Example' } });
        fireEvent.change(descriptionInput, { target: { value: 'Description Example' } });
        fireEvent.change(priceInput, { target: { value: 'R$ 0,00' } });
        fireEvent.change(discountPriceInput, { target: { value: 'R$ 10,00' } });
        fireEvent.change(categoryInput, { target: { value: 'Category Example' } });
        fireEvent.click(enabledInput);

        // Submit button
        fireEvent.click(submitButton);

        // Expect not redirect to menu page
        await waitFor(() => {
            expect(mockedHistoryPush).not.toHaveBeenCalled();
        });
    });
});