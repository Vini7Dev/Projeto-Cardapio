/**
 * Test: Toast
 */

import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';

import Toast from '../../../components/ToastContainer/Toast';

const mockedRemoveToast = jest.fn();

jest.mock('../../../hooks/toast', () => {
    return {
        useToast: () => ({
            removeToast: mockedRemoveToast,
        }),
    };
});

describe('Component: Toast', () => {
    beforeEach(() => {
        mockedRemoveToast.mockClear();
    });

    it('should be able to render component', async () => {
        // Render component
        const { getByText } = render(<Toast
          id="0"
          title="Title Example"
          status="error"
          styles={{}}
        />);

          // Select title
          const toastTitle = getByText('Title Example');

          // Expect element exists
          await waitFor(() => {
              expect(toastTitle).toBeTruthy();
          });
    });

    it('should be able to remove toast on click', async () => {
        // Render component
        const { getByTestId, getByText } = render(<Toast
          id="0"
          title="Title Example"
          status="success"
          styles={{}}
        />);

          // Select toast button and title
          const toastButton = getByTestId('toast-button');

          // Click in toast button
          fireEvent.click(toastButton);

          // Expect remove toast functin has been called
          await waitFor(() => {
              expect(mockedRemoveToast).toHaveBeenCalledWith('0');
          });
    });


    it('should be able to remove toast after 5 seconds', () => {
        // Render component
        const { getByTestId, getByText } = render(<Toast
          id="0"
          title="Title Example"
          status="error"
          styles={{}}
        />);

        // Wait 6 seconds to check
        setInterval(async () => {
            // Expect remove toast functin has been called
            await waitFor(() => {
                expect(mockedRemoveToast).toHaveBeenCalledWith('0');
            });
        }, 6000);
    });
});