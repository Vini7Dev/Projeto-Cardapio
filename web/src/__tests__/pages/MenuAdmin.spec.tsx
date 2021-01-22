/**
 * Test: Menu Admin
 */

import React from 'react';
import MockAdapter from 'axios-mock-adapter';
import { render, waitFor, act, fireEvent } from '@testing-library/react';

import api from '../../services/api';

import MenuAdmin from '../../pages/MenuAdmin';

const apiMock = new MockAdapter(api);
const mockedHistoryPush = jest.fn();
const mockedAuthLogout = jest.fn();

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
            restaurant: {
                menu: {
                    code: '0',
                },
                trade: '',
                logo: '',
                logo_url: '',
                cnpj: '',
                telephone: '',
            },
            logout: mockedAuthLogout,
        }),
    };
});

describe('Page: Menu Admin', () => {
    beforeEach(() => {
        apiMock.onGet('/menus/0').reply(200, {
            menu: [
                {
                    item: {
                        id: '',
                        title: '',
                        description: '',
                        price: 1,
                        discount_price: 0,
                        image: '',
                        image_url: '',
                        enabled: false,
                        category: {
                            category_name: 'CategoryA',
                        }
                    }
                },
                {
                    item: {
                        id: '',
                        title: '',
                        description: '',
                        price: 1,
                        discount_price: 0,
                        image: '',
                        image_url: '',
                        enabled: false,
                        category: {
                            category_name: 'CategoryB',
                        }
                    }
                },
            ]
        });
    });

    it('should be able to render page', async () => {
        act(async () => {
            // Render page
            const { getByText } = render(<MenuAdmin />);

            // Select one page element
            const element = getByText('+ Adicionar item');

            // Check if element exists
            await waitFor(() => {
                expect(element).toBeTruthy();
            });
        });
    });

    it('should be able to copy menu link', async () => {
        // Remove action to copy command
        global.document.execCommand = jest.fn();

        act(async () => {
            // Render page
            const { getByTestId } = render(<MenuAdmin />);

            // Getting copy link button
            const copyButton = getByTestId('copy-link-url');

            // Click in button
            fireEvent.click(copyButton);

            // Check if function to copy has called
            await waitFor(() => {
                expect(document.execCommand).toHaveBeenCalledWith('copy');
            });
        });
    });

    it('should be able navigate to create food page', async () => {
        act(async () => {
            // Render page
            const { getByText } = render(<MenuAdmin />);

            // Getting add item button
            const addItemButton = getByText('+ Adicionar item');

            // Click in button
            fireEvent.click(addItemButton);

            // Check if navifate to create food page
            await waitFor(() => {
                expect(mockedHistoryPush).toHaveBeenCalledWith('/create-food');
            });
        });
    });

    it('should be able navigate to logout', async () => {
        act(async () => {
            // Render page
            const { getAllByTestId } = render(<MenuAdmin />);

            // Getting option buttons
            const optionButton = getAllByTestId('option-button');

            // Click in button
            fireEvent.click(optionButton[0]);

            // Check if logout function has called
            await waitFor(() => {
                expect(mockedAuthLogout).toHaveBeenCalled();
            });
        });
    });

    it('should be able navigate to edit profile page', async () => {
        act(async () => {
            // Render page
            const { getAllByTestId } = render(<MenuAdmin />);

            // Getting option buttons
            const optionButton = getAllByTestId('option-button');

            // Click in button
            fireEvent.click(optionButton[1]);

            // Check if navifate to edit profile page
            await waitFor(() => {
                expect(mockedHistoryPush).toHaveBeenCalledWith('/profile');
            });
        });
    });
});