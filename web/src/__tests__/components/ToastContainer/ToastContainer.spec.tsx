/**
 * Test: Toast Container
 */

import React from 'react';
import { render, waitFor } from '@testing-library/react';

import ToastContainer from '../../../components/ToastContainer';

describe('Component: Toast Container', () => {
    it('should be able to render component', async () => {
        // Render component
        const { getByText } = render(<ToastContainer
          toasts={[ { id: '0', title: 'Title Example' } ]}
        />);

          // Select one toast element from component
          const toast = getByText('Title Example');

          // Expect element exists
          await waitFor(() => {
              expect(toast).toBeTruthy();
          });
    });
});