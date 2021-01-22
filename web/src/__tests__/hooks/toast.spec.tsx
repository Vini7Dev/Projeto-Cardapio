/**
 * Test: toast
 */

import { renderHook, act } from '@testing-library/react-hooks';

import ToastProvider, { useToast } from '../../hooks/toast';

const mockedUUID = jest.fn();

jest.mock('uuidv4', () => {
    return {
        uuid: () => mockedUUID(),
    }
});

describe('Hook: toast', () => {
    it('should be able to add toast', () => {
        // Render hook
        const { result } = renderHook(() => useToast(), { wrapper: ToastProvider });

        // Add toast
        act(() => {
            result.current.addToast({
                title: 'Title Example'
            });
        });

        // Check if UUID has created
        expect(mockedUUID).toHaveBeenCalled();
    });

    it('should be able to remove toast', () => {
        // Define id return
        mockedUUID.mockImplementationOnce(() => {
            return 'id';
        });

        // Render hook
        const { result } = renderHook(() => useToast(), { wrapper: ToastProvider });

        // Add toast
        act(() => {
            result.current.addToast({
                title: 'Title Example'
            });
        });

        // Remove toast
        act(() => {
            result.current.removeToast('id')
        });

        // Expect no exists toast
        expect(result.current.toasts.length).toEqual(0);
    });
});