/**
 * Component: Back to Home Button
 */

import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

// Component styles
import { Container } from './styles';

const GoBackButton: React.FC = () => {
    // Navigation
    const history = useHistory();

    return (
      <Container onClick={() => history.goBack()}>
        <FiArrowLeft size={50} />
      </Container>
    );
}

export default GoBackButton;