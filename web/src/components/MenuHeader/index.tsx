/**
 * Component: Menu Header
 */

import React from 'react';

import DefaultLogo from '../../assets/images/DefaultLogo.png';

// Component styles
import { Container } from './styles';

interface IMenuHeaderProps {
    title: string;
    logo?: string;
    logo_url?: string;
}

const MenuHeader: React.FC<IMenuHeaderProps> = ({
    title,
    logo,
    logo_url
}) => {
    console.log(logo_url);

    return (
      <Container>
        <img
          src={
            logo
                ? logo_url
                : DefaultLogo
          }
          alt="Restaurant Logo"
        />
        <h1>{ title }</h1>
      </Container>
    );
}

export default MenuHeader;