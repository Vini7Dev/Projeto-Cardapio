/**
 * Component: Toast Container
 */

import React from 'react';

import { useTransition } from 'react-spring';

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
    // Transition animation
    const transition = useTransition(toasts, toast => toast.id, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
    });

    return (
      <Container>
        {
            transition.map(toast => (
              <Toast
                styles={toast.props}
                key={toast.key}
                id={toast.item.id}
                title={toast.item.title}
                description={toast.item.description}
                status={toast.item.status || 'error'}
              />
            ))
        }
      </Container>
    );
}

export default ToastContainer;