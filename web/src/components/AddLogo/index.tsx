/**
 * Component: Add Photo
 */

import React from 'react';
import { FiPlus } from 'react-icons/fi';

// Component styles
import { Container } from './styles';

const AddLogo: React.FC = () => {
    return (
      <Container>
        <div />

        <button>
          <FiPlus size={40} color="#FFFFFF" />
        </button>
      </Container>
    );
}

export default AddLogo;