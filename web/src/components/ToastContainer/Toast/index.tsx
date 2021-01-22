/**
 * Component: Toast
 */

import React, { useCallback, useEffect } from 'react';

import { useToast } from '../../../hooks/toast';

// Component styles
import { Container } from './styles';

interface IToastProps {
    id: string;
    title: string;
    description?: string;
    status: 'success' | 'error';
    styles: object;
}

const Toast: React.FC<IToastProps> = ({
    id,
    title,
    description,
    status,
    styles,
}) => {
    // Use toast functions
    const toast = useToast();

    // Remove toast when time over
    useEffect(() => {
        setInterval(() => toast.removeToast(id), 5000);
    }, [toast, id]);

    // Remove toast when user clicks
    const handleRemoveToastOnClick = useCallback(() => {
        toast.removeToast(id);
    }, [toast, id]);

    return (
      <Container status={status} style={styles}>
        <button onClick={handleRemoveToastOnClick} data-testid="toast-button">
          <h1>{title}</h1>
          <p>{description}</p>
        </button>
      </Container>
    );
}

export default Toast;