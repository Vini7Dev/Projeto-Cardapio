/**
 * Test: Update Food
 */

import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';

import UpdateFood from '../../pages/UpdateFood';

const mockedHistoryPush = jest.fn();
const mockedSetLoad = jest.fn();
const mockedApiGet = jest.fn();

jest.mock('../../services/api', () => {
    return {
        get: () => mockedApiGet(),
        put: jest.fn(),
    };
});

jest.mock('react-router-dom', () => {
    return {
        useHistory: () => ({
            push: mockedHistoryPush,
            goBack: jest.fn(),
        }),
        useParams: () => ({
            item_id: 'item id',
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
                trade: '',
                cnpj: '',
                telephone: '',
            }
        }),
    };
});

jest.mock('../../hooks/load', () => {
    return {
        useLoad: () => ({
            setLoad: mockedSetLoad,
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

describe('Page: Update Food', () => {
    beforeEach(() => {
        mockedHistoryPush.mockClear();

        // Set return of item data in get method
        mockedApiGet.mockReturnValue({
            data: {
                enabled: false,
                price: 0,
                discount_price: 0,
                image: '',
                image_url: '',
            },
        });
    });

    it('should be able to get item data to modify', async () => {
        // Render page
        render(<UpdateFood />);

        // Expect finish load
        await waitFor(() => {
            expect(mockedSetLoad).toHaveBeenCalledWith(false);
            expect(mockedApiGet).toHaveReturnedWith({
                data: {
                    enabled: false,
                    price: 0,
                    discount_price: 0,
                    image: '',
                    image_url: '',
                }
            });
        });
    });

    it('should not be able to get item data to modify when an error has occurred', async () => {
        // Clear return of api get data
        mockedApiGet.mockReturnValueOnce(() => {
            throw new Error('Update Food error example');
        });

        // Render page
        render(<UpdateFood />);

        // Expect finish load
        await waitFor(() => {
            expect(mockedSetLoad).toHaveBeenCalledWith(false);
            expect(mockedApiGet).not.toHaveReturnedWith({
                data: {
                    enabled: false,
                    price: 0,
                    discount_price: 0,
                    image: '',
                    image_url: '',
                }
            });
        });
    });

    it('should be able to update item data without image', async () => {
        // Render page
        const { getByPlaceholderText, getByTestId } = render(<UpdateFood />);

        // Getting form inputs and submit button
        const titleInput = getByPlaceholderText('Ex.: X-Burguer');
        const descriptionInput = getByPlaceholderText('Ex.: Pão, hamburguer, ...');
        const priceInput = getByPlaceholderText('Ex.: R$ 15,90');
        const discountPriceInput = getByPlaceholderText('Ex.: R$ 13,50');
        const checkboxInput = getByTestId('enable-checkbox');
        const submitButton = getByTestId('submit-button');

        // Fill form inputs
        fireEvent.change(titleInput, { target: { value: 'Title Example' } });
        fireEvent.change(descriptionInput, { target: { value: 'Description Example' } });
        fireEvent.change(priceInput, { target: { value: 'R$9,99' } });
        fireEvent.change(discountPriceInput, { target: { value: 'R$7,99' } });
        fireEvent.click(checkboxInput);

        // Submit form
        fireEvent.click(submitButton);

        // Expect redirect to menu page
        await waitFor(() => {
            expect(mockedHistoryPush).toHaveBeenCalledWith('/menu');
        });
    });

    it('should be able to update item data with image', async () => {
        // Skip URL generation
        global.URL.createObjectURL = jest.fn();

        // Render page
        const { getByPlaceholderText, getByTestId } = render(<UpdateFood />);

        // Getting form inputs and submit button
        const imageInput = getByTestId('add-image');
        const titleInput = getByPlaceholderText('Ex.: X-Burguer');
        const descriptionInput = getByPlaceholderText('Ex.: Pão, hamburguer, ...');
        const priceInput = getByPlaceholderText('Ex.: R$ 15,90');
        const discountPriceInput = getByPlaceholderText('Ex.: R$ 13,50');
        const checkboxInput = getByTestId('enable-checkbox');
        const submitButton = getByTestId('submit-button');

        // File example
        const file = new File(['test'], 'test');

        // Fill form inputs
        fireEvent.change(imageInput, { target: { files: [ file ] } });
        fireEvent.change(titleInput, { target: { value: 'Title Example' } });
        fireEvent.change(descriptionInput, { target: { value: 'Description Example' } });
        fireEvent.change(priceInput, { target: { value: 'R$9,99' } });
        fireEvent.change(discountPriceInput, { target: { value: 'R$7,99' } });
        fireEvent.click(checkboxInput);

        // Submit form
        fireEvent.click(submitButton);

        // Expect redirect to menu page
        await waitFor(() => {
            expect(mockedHistoryPush).toHaveBeenCalledWith('/menu');
        });
    });

    it('should not be able to update item data with invalid credentials', async () => {
        // Render page
        const { getByPlaceholderText, getByTestId } = render(<UpdateFood />);

        // Getting form inputs and submit button
        const titleInput = getByPlaceholderText('Ex.: X-Burguer');
        const descriptionInput = getByPlaceholderText('Ex.: Pão, hamburguer, ...');
        const priceInput = getByPlaceholderText('Ex.: R$ 15,90');
        const discountPriceInput = getByPlaceholderText('Ex.: R$ 13,50');
        const checkboxInput = getByTestId('enable-checkbox');
        const submitButton = getByTestId('submit-button');

        // Fill form inputs
        fireEvent.change(titleInput, { target: { value: 'Invalid Title - 10101010101010101010100110' } });
        fireEvent.change(descriptionInput, { target: { value: 'Description Example' } });
        fireEvent.change(priceInput, { target: { value: 'R$9,99' } });
        fireEvent.change(discountPriceInput, { target: { value: 'R$7,99' } });
        fireEvent.click(checkboxInput);

        // Submit form
        fireEvent.click(submitButton);

        // Expect redirect to menu page
        await waitFor(() => {
            expect(mockedHistoryPush).not.toHaveBeenCalled();
        });
    });

    it('should be able to display a notification error when request to update food fails', async () => {
        // Cancel alert function
        global.alert = jest.fn();

        // Render page
        const { getByPlaceholderText, getByTestId } = render(<UpdateFood />);

        // Getting form inputs and submit button
        const titleInput = getByPlaceholderText('Ex.: X-Burguer');
        const descriptionInput = getByPlaceholderText('Ex.: Pão, hamburguer, ...');
        const priceInput = getByPlaceholderText('Ex.: R$ 15,90');
        const discountPriceInput = getByPlaceholderText('Ex.: R$ 13,50');
        const checkboxInput = getByTestId('enable-checkbox');
        const submitButton = getByTestId('submit-button');

        // Fill form inputs
        fireEvent.change(titleInput, { target: { value: 'Title Example' } });
        fireEvent.change(descriptionInput, { target: { value: 'Description Example' } });
        fireEvent.change(priceInput, { target: { value: 'R$0,00' } });
        fireEvent.change(discountPriceInput, { target: { value: 'R$7,99' } });
        fireEvent.click(checkboxInput);

        // Submit form
        fireEvent.click(submitButton);

        // Expect redirect to menu page
        await waitFor(() => {
            expect(mockedHistoryPush).not.toHaveBeenCalled();
        });
    });
});