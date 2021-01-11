/**
 * Component: Toast
 */

import React, { useCallback, useEffect } from 'react';

import { useToast } from '../../hooks/toast';

// Component styles
import { Container } from './styles';

interface IToastProps {
    id: string;
    title: string;
    description?: string;
    status: 'success' | 'error';
}

const Toast: React.FC<IToastProps> = ({
    id,
    title,
    description,
    status
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
      <Container status={status} onClick={handleRemoveToastOnClick}>
        <h1>{title}</h1>
        <p>{description}</p>
      </Container>
    );
}

export default Toast;