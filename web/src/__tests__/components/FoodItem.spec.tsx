/**
 * Test: Food Item
 */

import React from 'react';
import MockAdapter from 'axios-mock-adapter';
import { fireEvent, render, waitFor } from '@testing-library/react';

import api from '../../services/api';

import FoodItem from '../../components/FoodItemCategory/FoodItem';

const apiMock = new MockAdapter(api);

const mockedHistoryPush = jest.fn();
const mockedAddToast = jest.fn();

jest.mock('react-router-dom', () => {
    return {
        useHistory: () => ({
            push: mockedHistoryPush,
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

describe('Component: Food Item', () => {
    beforeEach(() => {
        apiMock.onDelete('/items/0').reply(200);
    });

    it('should be able to delete item', async () => {
        // Accept delete item confirmation
        global.confirm = () => true;

        // Render component
        const { getByTestId } = render(<FoodItem
          id="0"
          title="Title Example"
          description="Description Example"
          price={10}
          discount_price={5}
          enabled
          admin_mode
        />);

        // Getting delete button
        const deleteButton = getByTestId('delete-button');

        // Click in delete button
        fireEvent.click(deleteButton);

        // Expect reload menu page
        await waitFor(() => {
            expect(mockedHistoryPush).toHaveBeenCalledWith('/');
        });
    });

    it('should not be able to delete item when deny confirmation', async () => {
        // Deny delete item confirmation
        global.confirm = () => false;

        // Render component
        const { getByTestId } = render(<FoodItem
          id="0"
          title="Title Example"
          description="Description Example"
          price={10}
          discount_price={5}
          enabled
          admin_mode
        />);

        // Getting delete button
        const deleteButton = getByTestId('delete-button');

        // Click in delete button
        fireEvent.click(deleteButton);

        // Expect reload menu page
        await waitFor(() => {
            expect(mockedHistoryPush).not.toHaveBeenCalled();
        });
    });

    it('should be able to display a notification error when delete item fails', async () => {
        // Create error example
        global.confirm = () => {
            throw new Error('Delete item error example')
        };

        // Render component
        const { getByTestId } = render(<FoodItem
          id="0"
          title="Title Example"
          description="Description Example"
          price={0}
          discount_price={5}
          enabled
          admin_mode
        />);

        // Getting delete button
        const deleteButton = getByTestId('delete-button');

        // Click in delete button
        fireEvent.click(deleteButton);

        // Expect reload menu page
        await waitFor(() => {
            expect(mockedAddToast).toHaveBeenCalledWith({
                title: 'Falha ao apagar o item.',
                description: 'Tente novamente.',
            });
        });
    });

    it('should be able to edit item', async () => {
        // Render component
        const { getByTestId } = render(<FoodItem
          id="0"
          title="Title Example"
          description="Description Example"
          price={10}
          discount_price={5}
          admin_mode
        />);

        // Getting edit button
        const editButton = getByTestId('edit-button');

        // Click in edit button
        fireEvent.click(editButton);

        // Expect reload menu page
        await waitFor(() => {
            expect(mockedHistoryPush).toHaveBeenCalledWith('/update-food/0');
        });
    });
});