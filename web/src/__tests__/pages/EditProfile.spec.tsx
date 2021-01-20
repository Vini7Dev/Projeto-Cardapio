/**
 * Test: Edit Profile
 */

import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';

import EditProfile from '../../pages/EditProfile';

const mockedHistoryPush = jest.fn();
const mockedAddToast = jest.fn();

jest.mock('../../services/api', () => {
    return {
        put: () => ({
            data: {},
        }),
    };
});

jest.mock('react-router-dom', () => {
    return {
        useHistory: () => ({
            push: mockedHistoryPush,
        }),
    };
});

jest.mock('../../hooks/auth', () => {
    return {
        useAuth: () => ({
            updateRestaurant: jest.fn(),
            restaurant: {},
        }),
    };
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
            addToast: mockedAddToast,
        }),
    };
});

describe('Page: Edit Profile', () => {
    beforeEach(() => {
        mockedHistoryPush.mockClear();
    });

    it('should be able to edit restaurant profile data without update password and logo', async () => {
        // Render page
        const { getByPlaceholderText, getByTestId } = render(<EditProfile />);

        // Getting form inputs and submit button
        const tradeInput = getByPlaceholderText('Nome fantasia');
        const telephoneInput = getByPlaceholderText('Telefone para contato');
        const currentPassword = getByPlaceholderText('Senha atual');
        const submitButton = getByTestId('submit-button');

        // Fill form inputs
        fireEvent.change(tradeInput, { target: { value: 'example@mail.com' } });
        fireEvent.change(telephoneInput, { target: { value: '11999999999' } });
        fireEvent.change(currentPassword, { target: { value: 'password123' } });

        // Submit form
        fireEvent.click(submitButton);

        // Expect redirect to menu page
        await waitFor(() => {
            expect(mockedHistoryPush).toHaveBeenCalledWith('/menu');
        });
    });

    it('should be able to edit restaurant profile data with logo', async () => {
        // Skip URL generation
        global.URL.createObjectURL = jest.fn();

        // Render page
        const { getByPlaceholderText, getByTestId } = render(<EditProfile />);

        // Getting form inputs and submit button
        const logoInput = getByTestId('add-logo');
        const tradeInput = getByPlaceholderText('Nome fantasia');
        const telephoneInput = getByPlaceholderText('Telefone para contato');
        const currentPassword = getByPlaceholderText('Senha atual');
        const submitButton = getByTestId('submit-button');

        // Logo file example
        const file = new File(['test'], 'test');

        // Fill form inputs
        fireEvent.change(logoInput, { target: { files: [file] } })
        fireEvent.change(tradeInput, { target: { value: 'example@mail.com' } });
        fireEvent.change(telephoneInput, { target: { value: '11999999999' } });
        fireEvent.change(currentPassword, { target: { value: 'password123' } });

        // Submit form
        fireEvent.click(submitButton);

        // Expect redirect to menu page
        await waitFor(() => {
            expect(mockedHistoryPush).toHaveBeenCalledWith('/menu');
        });
    });

    it('should be able to edit restaurant profile data with new password', async () => {
        // Render page
        const { getByPlaceholderText, getByTestId } = render(<EditProfile />);

        // Getting form inputs and submit button
        const tradeInput = getByPlaceholderText('Nome fantasia');
        const telephoneInput = getByPlaceholderText('Telefone para contato');
        const newPassword = getByPlaceholderText('Nova senha');
        const confirmPassword = getByPlaceholderText('Confirme a senha');
        const currentPassword = getByPlaceholderText('Senha atual');
        const submitButton = getByTestId('submit-button');

        // Fill form inputs
        fireEvent.change(tradeInput, { target: { value: 'example@mail.com' } });
        fireEvent.change(telephoneInput, { target: { value: '11999999999' } });
        fireEvent.change(currentPassword, { target: { value: 'password123' } });
        fireEvent.change(newPassword, { target: { value: 'newPassword123' } });
        fireEvent.change(confirmPassword, { target: { value: 'newPassword123' } });

        // Submit form
        fireEvent.click(submitButton);

        // Expect redirect to menu page
        await waitFor(() => {
            expect(mockedHistoryPush).toHaveBeenCalledWith('/menu');
        });
    });

    it('should not be able to edit restaurant profile data with invalid credentials', async () => {
        // Render page
        const { getByPlaceholderText, getByTestId } = render(<EditProfile />);

        // Getting form inputs and submit button
        const tradeInput = getByPlaceholderText('Nome fantasia');
        const telephoneInput = getByPlaceholderText('Telefone para contato');
        const currentPassword = getByPlaceholderText('Senha atual');
        const submitButton = getByTestId('submit-button');

        // Fill form inputs
        fireEvent.change(tradeInput, { target: { value: 'invalid-email' } });
        fireEvent.change(telephoneInput, { target: { value: 'invalid-telephone' } });
        fireEvent.change(currentPassword, { target: { value: '1' } });

        // Submit form
        fireEvent.click(submitButton);

        // Expect not redirect to menu page
        await waitFor(() => {
            expect(mockedHistoryPush).not.toHaveBeenCalled();
        });
    });

    it('should be able to display a notification error when request to update profile fails', async () => {
        // Setting error
        mockedAddToast.mockImplementationOnce(() => {
            throw new Error('Edit profile error example');
        });

        // Render page
        const { getByPlaceholderText, getByTestId } = render(<EditProfile />);

        // Getting form inputs and submit button
        const tradeInput = getByPlaceholderText('Nome fantasia');
        const telephoneInput = getByPlaceholderText('Telefone para contato');
        const currentPassword = getByPlaceholderText('Senha atual');
        const submitButton = getByTestId('submit-button');

        // Fill form inputs
        fireEvent.change(tradeInput, { target: { value: 'example@mail.com' } });
        fireEvent.change(telephoneInput, { target: { value: '11999999999' } });
        fireEvent.change(currentPassword, { target: { value: 'password123' } });

        // Submit form
        fireEvent.click(submitButton);

        // Expect not redirect to menu page
        await waitFor(() => {
            expect(mockedAddToast).toHaveBeenCalledWith({
                title: 'Falha ao atualizar os dados.',
                description: 'Tente novamente.',
            });
        });
    });
});