/**
 * Component: Logo
 */

import React from 'react';

import LogoImg from "../../assets/images/Logo.png";

// Component styles
import { Container } from './styles';

const Logo: React.FC = () => {
    return (
      <Container>
        <img src={LogoImg} alt="Menue" />
      </Container>
    );
}

export default Logo;