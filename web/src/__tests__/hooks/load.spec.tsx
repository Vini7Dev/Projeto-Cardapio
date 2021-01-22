/**
 * Test: load
 */

import { renderHook, act } from '@testing-library/react-hooks';

import LoadProvider, { useLoad } from '../../hooks/load';

describe('Hook: load', () => {
    it('should be able to set load screen', () => {
        // Render hook
        const { result } = renderHook(() => useLoad(), { wrapper: LoadProvider });

        // Set loading
        act(() => {
            result.current.setLoad(true);
        });

        // Expect are loading
        expect(result.current.isLoading).toEqual(true);
    });
});