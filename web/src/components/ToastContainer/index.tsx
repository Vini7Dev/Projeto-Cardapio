/**
 * Component: Toast Container
 */

import React from 'react';

import Toast from '../Toast';

// Component styles
import { Container } from './styles';

interface IToastData {
    id: string;
    title: string;
    description?: string;
    status?: 'success' | 'error';
}

interface IToastContainerProps {
    toasts: IToastData[];
}

const ToastContainer: React.FC<IToastContainerProps> = ({ toasts }) => {
    return (
      <Container>
        {
            toasts.map(toast => (
              <Toast
                id={toast.id}
                title={toast.title}
                description={toast.description}
                status={toast.status || 'error'}
              />
            ))
        }
      </Container>
    );
}

export default ToastContainer;